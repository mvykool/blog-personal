// services/blog.ts
import { marked } from "marked";
import { token, type BlogPost, type GitHubFile } from "../types";
import { processObsidianContent } from "../utils";

// Configure marked

export async function getCollection(collection: string): Promise<BlogPost[]> {
  if (collection !== "blog") {
    return [];
  }

  marked.setOptions({
    gfm: true, // Enable GitHub Flavored Markdown
    breaks: true, // Treat line breaks as <br>
  });

  try {
    const response = await fetch(
      "https://api.github.com/repos/mvykool/obsidian/contents/blog",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch blog files: ${response.status}`);
    }

    const files: GitHubFile[] = await response.json();

    const posts = await Promise.all(
      files.map(async (file): Promise<BlogPost | null> => {
        try {
          const contentResponse = await fetch(file.download_url);
          if (!contentResponse.ok) {
            console.error(
              `Failed to fetch content for ${file.name}: ${contentResponse.status}`,
            );
            return null;
          }

          const content = await contentResponse.text();

          const commitsResponse = await fetch(
            `https://api.github.com/repos/mvykool/obsidian/commits?path=blog/${file.name}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
              },
            },
          );

          let gitHubDate = new Date();
          if (commitsResponse.ok) {
            const commits = await commitsResponse.json();
            if (commits.length > 0) {
              gitHubDate = new Date(
                commits[commits.length - 1].commit.author.date,
              );
            }
          }

          const frontmatterMatch = content.match(
            /^---\n([\s\S]*?)\n---\n([\s\S]*)$/,
          );
          let frontmatter: Record<string, any> = {};
          let markdown = content;

          if (frontmatterMatch) {
            try {
              const frontmatterText = frontmatterMatch[1];
              frontmatterText.split("\n").forEach((line) => {
                if (!line.trim()) return;
                const separatorIndex = line.indexOf(":");
                if (separatorIndex > 0) {
                  const key = line.substring(0, separatorIndex).trim();
                  const value = line.substring(separatorIndex + 1).trim();
                  frontmatter[key] = value;
                }
              });
              markdown = frontmatterMatch[2];
            } catch (e) {
              console.error("Error parsing frontmatter:", e);
            }
          }

          const slug = file.name
            .replace(/\.md$/, "")
            .toLowerCase()
            .replace(/\s+/g, "-");
          const id = slug;

          const processedMarkdown = processObsidianContent(markdown);

          return {
            id,
            slug,
            data: {
              title: frontmatter.title || file.name.replace(/\.md$/, ""),
              description: frontmatter.description || "",
              pubDate: frontmatter.pubDate
                ? new Date(frontmatter.pubDate)
                : gitHubDate,
              updatedDate: frontmatter.updatedDate
                ? new Date(frontmatter.updatedDate)
                : undefined,
              heroImage: frontmatter.heroImage,
              tags: frontmatter.tags
                ? frontmatter.tags.split(",").map((tag: string) => tag.trim())
                : [],
            },
            body: processedMarkdown,
            render: async () => {
              const htmlContent = marked(processedMarkdown); // Parse Markdown to HTML
              const lexer = marked.lexer(processedMarkdown);
              const headings = lexer
                .filter((token: any) => token.type === "heading")
                .map((h: any) => ({
                  depth: h.depth,
                  text: h.text,
                  slug: h.text
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, ""),
                }));

              return {
                Content: htmlContent, // Return parsed HTML
                headings,
              };
            },
          };
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          return null;
        }
      }),
    );

    return posts.filter((post): post is BlogPost => post !== null);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getEntry(
  collection: string,
  slug: string,
): Promise<BlogPost | undefined> {
  const posts = await getCollection(collection);
  return posts.find((post) => post.slug === slug || post.id === slug);
}
