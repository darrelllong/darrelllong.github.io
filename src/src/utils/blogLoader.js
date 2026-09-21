import fm from "front-matter";

let postsCache = null;
let postsPromise = null;

async function loadPosts() {
  if (postsCache) return postsCache;
  if (postsPromise) return postsPromise;

  postsPromise = (async () => {
    // Revalidate the archive after a deployment; a cached index can hide
    // a new post even when its generated page is already available.
    const res = await fetch("/posts/index.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("Unable to load the blog archive.");
    const index = await res.json();
    postsCache = index.sort((a, b) => b.date.localeCompare(a.date));
    return postsCache;
  })();

  try {
    return await postsPromise;
  } finally {
    postsPromise = null;
  }
}

export async function getAllPosts() {
  return loadPosts();
}

export async function getPostBySlug(slug) {
  const posts = await loadPosts();
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) return null;

  const res = await fetch(`/posts/${slug}.md`, { cache: "no-cache" });
  if (!res.ok) return null;

  const raw = await res.text();
  const { body } = fm(raw);

  return { ...meta, body };
}

export async function getAllTags() {
  const posts = await loadPosts();
  const tagSet = new Set();
  for (const post of posts) {
    for (const tag of post.tags || []) {
      tagSet.add(tag);
    }
  }
  return [...tagSet].sort();
}

export async function getPostSlugs() {
  const posts = await loadPosts();
  return posts.map((p) => p.slug);
}
