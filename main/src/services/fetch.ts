const repoOwner = "mvykool"; // Replace with your GitHub username
const repoName = "obsidian"; // Replace with your repo name
const token = import.meta.env.PUBLIC_TOKEN;

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

interface BlogPostFrontmatter {
  title?: string;
  description?: string;
  date?: string;
  updated?: string;
  tags?: string;
  image?: string;
  [key: string]: any; // Allow for additional frontmatter fields
}

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  heroImage?: string;
  content: string;
  path: string;
  html_url: string;
  download_url: string;
  sha: string;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // Fetch the list of files from the GitHub API
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

    // Fetch the content of each file
    const posts = await Promise.all(
      files.map(async (file): Promise<BlogPost | null> => {
        try {
          // Use the download_url to get the raw content
          const contentResponse = await fetch(file.download_url);

          if (!contentResponse.ok) {
            console.error(
              `Failed to fetch content for ${file.name}: ${contentResponse.status}`,
            );
            return null;
          }

          const content = await contentResponse.text();

          // Extract frontmatter if it exists
          const frontmatterMatch = content.match(
            /^---\n([\s\S]*?)\n---\n([\s\S]*)$/,
          );
          let frontmatter: BlogPostFrontmatter = {};
          let markdown = content;

          if (frontmatterMatch) {
            // Parse frontmatter
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

          // Create a slug from the filename
          const slug = file.name
            .replace(/\.md$/, "")
            .toLowerCase()
            .replace(/\s+/g, "-");

          return {
            slug,
            title: frontmatter.title || file.name.replace(/\.md$/, ""),
            description: frontmatter.description || "",
            pubDate: frontmatter.date ? new Date(frontmatter.date) : new Date(),
            updatedDate: frontmatter.updated
              ? new Date(frontmatter.updated)
              : undefined,
            tags: frontmatter.tags
              ? frontmatter.tags.split(",").map((tag) => tag.trim())
              : [],
            heroImage: frontmatter.image,
            content: markdown,
            path: file.path,
            html_url: file.html_url,
            download_url: file.download_url,
            sha: file.sha,
          };
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          return null;
        }
      }),
    );

    // Filter out any null values (failed fetches)
    return posts.filter((post): post is BlogPost => post !== null);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
// export async function getBlogPostBySlug(slug: string) {
//   const response = await fetch(`https://your-api-endpoint.com/posts/${slug}`);
//   const data = await response.json();
//   return data;
// }
