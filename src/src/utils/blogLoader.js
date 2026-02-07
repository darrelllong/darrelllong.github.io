import fm from "front-matter";

const modules = import.meta.glob("../posts/*.md", {
  query: "?raw",
  eager: true,
});

function slugFromFilename(filename) {
  // "2026-02-06-welcome.md" -> "2026-02-06-welcome"
  return filename.replace(/\.md$/, "");
}

function parsePost(filepath, raw) {
  const filename = filepath.split("/").pop();
  const { attributes, body } = fm(raw);
  const slug = slugFromFilename(filename);

  return {
    slug,
    title: attributes.title || "Untitled",
    date: attributes.date || "",
    tags: attributes.tags || [],
    excerpt:
      attributes.excerpt || body.replace(/[#*_`>[\]]/g, "").slice(0, 150).trim() + "...",
    body,
  };
}

const posts = Object.entries(modules)
  .map(([filepath, mod]) => parsePost(filepath, mod.default))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
}

export function getAllTags() {
  const tagSet = new Set();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return [...tagSet].sort();
}

export function getPostSlugs() {
  return posts.map((p) => p.slug);
}
