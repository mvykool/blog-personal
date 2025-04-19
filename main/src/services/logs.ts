import { token, type GitHubFile } from "../types";
import { processObsidianContent } from "../utils";

export async function getLogs(collection: string): Promise<any | undefined> {
  if (collection !== "logs") {
    return;
  }

  try {
    // Fetch the list of files from the GitHub API

    const response = await fetch(
      "https://api.github.com/repos/mvykool/obsidian/contents/logs.md",
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

    const file: GitHubFile = await response.json();
    const contentResponse = await fetch(file.download_url);
    if (!contentResponse.ok) {
      console.error(
        `Failed to fetch content for ${file.name}: ${contentResponse.status}`,
      );
      return undefined;
    }

    const content = await contentResponse.text();

    // Extract frontmatter if it exists
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
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

    // Create a slug from the filename
    const slug = file.name
      .replace(/\.md$/, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
    const id = slug;

    // Create a BlogPost object that matches Astro's CollectionEntry format
    return {
      body: processObsidianContent(markdown),
      render: async () => {
        return {
          Content: markdown,
          headings: [],
        };
      },
    };
  } catch (err) {
    console.log("error", err);
  }
}
