const repoOwner = "mvykool"; // Replace with your GitHub username
const repoName = "obsidian"; // Replace with your repo name
const token = import.meta.env.PUBLIC_TOKEN;

export async function getBlogPosts() {
  const response = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/contents`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  const data = await response.json();
  return data;
}

// export async function getBlogPostBySlug(slug: string) {
//   const response = await fetch(`https://your-api-endpoint.com/posts/${slug}`);
//   const data = await response.json();
//   return data;
// }
