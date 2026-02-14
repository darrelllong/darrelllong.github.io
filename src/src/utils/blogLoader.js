import fm from "front-matter";

let postsCache = null;
let postsPromise = null;

async function loadPosts() {
  if (postsCache) return postsCache;
  if (postsPromise) return postsPromise;

  postsPromise = (async () => {
    const res = await fetch("/posts/index.json");
    const index = await res.json();
    postsCache = index.sort((a, b) => b.date.localeCompare(a.date));
    return postsCache;
  })();

  return postsPromise;
}

export async function getAllPosts() {
  return loadPosts();
}

export async function getPostBySlug(slug) {
  const posts = await loadPosts();
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) return null;

  const res = await fetch(`/posts/${slug}.md`);
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
