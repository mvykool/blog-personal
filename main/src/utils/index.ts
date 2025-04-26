// utils.ts
export function processObsidianContent(content: string): string {
  let processed = content;

  // Convert [[WikiLinks]] to regular Markdown links
  processed = processed.replace(/\[\[(.*?)\]\]/g, (match, linkText) => {
    const [linkTarget, displayName] = linkText.includes("|")
      ? linkText.split("|")
      : [linkText, linkText];
    const slug = linkTarget
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return `[${displayName}](/blog/${slug})`; // Adjust path as needed
  });

  // Convert ![[embedded images]] to Markdown images
  processed = processed.replace(/!\[\[(.*?)\]\]/g, (match, imagePath) => {
    // Adjust image path based on your setup (e.g., GitHub raw URL or local assets)
    const imageUrl = `/images/${imagePath}`; // Example: Update based on your asset hosting
    return `![${imagePath}](${imageUrl})`;
  });

  // Convert Obsidian callouts to HTML (or Markdown approximations)
  processed = processed.replace(
    /> \[!(\w+)\](.*?)\n((?:>.*?\n)*)/g,
    (match, type, title, content) => {
      const cleanedContent = content.replace(/^>\s*/gm, "").trim();
      return `<div class="callout callout-${type.toLowerCase()}">
                <p class="callout-title">${title.trim()}</p>
                <div class="callout-content">${cleanedContent}</div>
              </div>`;
    },
  );

  // Convert inline #tags to links or styled tags
  processed = processed.replace(/#([\w-]+)/g, (match, tag) => {
    return `<a href="/tags/${tag}" class="tag">#${tag}</a>`;
  });

  return processed;
}
