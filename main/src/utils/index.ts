// Function to process Obsidian-specific syntax

export function processObsidianContent(content: string): string {
  // Convert [[WikiLinks]] to regular markdown links
  let processed = content.replace(/\[\[(.*?)\]\]/g, (match, linkText) => {
    const displayName = linkText.includes("|")
      ? linkText.split("|")[1]
      : linkText;
    const linkTarget = linkText.includes("|")
      ? linkText.split("|")[0]
      : linkText;
    const slug = linkTarget.toLowerCase().replace(/\s+/g, "-");
    return `[${displayName}](/fragments/${slug})`;
  });

  // Process ![[embedded images]]
  processed = processed.replace(/!\[\[(.*?)\]\]/g, (match, imagePath) => {
    return `![](${imagePath})`;
  });

  return processed;
}
