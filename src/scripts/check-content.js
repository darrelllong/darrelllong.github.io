// Check the catalog and post invariants that can be verified locally. Facts and
// external sources still require editorial review; see docs/correctness-audit.md.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import frontMatter from "front-matter";

const root = fileURLToPath(new URL("../../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const json = (path) => JSON.parse(read(path));
const publications = json("publications.json");
const patents = json("patents.json");
const posts = json("posts/index.json");
const redirects = json("src/src/publicationRedirects.json");
const unique = (values, label) => assert.equal(new Set(values).size, values.length, `Duplicate ${label}`);
const publicationIds = new Set(publications.map((p) => p.id));
const patentIds = new Set(patents.map((p) => p.id));
const slugs = new Set(posts.map((p) => p.slug));
unique([...publications.map((p) => p.id)], "publication ID");
unique([...patents.map((p) => p.id)], "patent ID");
unique(posts.map((p) => p.slug), "post slug");
const keys = [];
for (const p of publications) {
  const b = p.bibTeX;
  assert(p.title && p.author?.length && b?.author && b.title, `Incomplete publication ${p.id}`);
  const types = Object.keys(b).filter((k) => k.startsWith("@"));
  assert.equal(types.length, 1, `Ambiguous BibTeX type for ${p.id}`);
  keys.push(b[types[0]]);
  assert(Number.isInteger(Number(b.year)) && Number(b.year) >= 1900, `Invalid year for ${p.id}`);
  if (b.month) assert(/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/.test(b.month), `Invalid month for ${p.id}`);
  assert(!/scholar\.google\.[^/]+\/(?:scholar|citations)/i.test(p.url || ""), `Publication ${p.id} links to a search/profile`);
  if (p.full_content) {
    assert(/[.!?]$/.test(p.full_content.trim()), `Possibly truncated abstract for ${p.id}`);
    assert(!/<\/?(?:sup|ETX)\b|xmlns:/.test(p.full_content), `Unconverted markup in abstract for ${p.id}`);
  }
  if (p.url?.startsWith("/")) {
    const file = join(root, p.url.slice(1));
    assert(existsSync(file), `Missing publication download ${p.url}`);
    if (p.url.endsWith(".pdf")) assert.equal(readFileSync(file).subarray(0, 5).toString(), "%PDF-", `Not a PDF: ${p.url}`);
  }
}
unique(keys, "BibTeX key");

function checkInternal(url, source) {
  const path = url.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (["/", "/about", "/publications", "/patents", "/blog", "/consultancy"].includes(path)) return;
  const pub = path.match(/^\/publications\/(\d+)$/);
  if (pub) return assert(publicationIds.has(Number(pub[1])) || redirects[pub[1]], `${source}: missing ${url}`);
  const patent = path.match(/^\/patents\/(\d+)$/);
  if (patent) return assert(patentIds.has(Number(patent[1])), `${source}: missing ${url}`);
  const post = path.match(/^\/blog\/([^/]+)$/);
  if (post) return assert(slugs.has(post[1]), `${source}: missing ${url}`);
  assert(existsSync(join(root, path.slice(1))), `${source}: missing ${url}`);
}

for (const [id, target] of Object.entries(redirects)) {
  assert(!publicationIds.has(Number(id)), `Redirect shadows publication ${id}`);
  if (target.startsWith("/")) {
    assert(publicationIds.has(Number(target.split("/")[2])), `Redirect ${id} must lead directly to an existing publication`);
  } else assert(target.startsWith("https://"), `Invalid redirect ${id}`);
}

assert.equal(readdirSync(join(root, "posts")).filter((p) => p.endsWith(".md")).length, posts.length, "Unlisted or missing post");
for (const post of posts) {
  const source = `posts/${post.slug}.md`;
  const text = read(source);
  const { attributes } = frontMatter(text);
  for (const key of ["title", "date", "tags", "excerpt"]) {
    assert.deepEqual(post[key], attributes[key], `${source}: index ${key} disagrees with front matter`);
  }
  for (const match of text.matchAll(/\]\((\/[^\s)]*)\)/g)) checkInternal(match[1], source);
}

// Enforce the owner's explicit instruction across runtime content and page source.
const content = [JSON.stringify(publications), JSON.stringify(patents), JSON.stringify(json("pentexoire.json")), ...posts.map((p) => read(`posts/${p.slug}.md`))];
for (const name of readdirSync(join(root, "src/src/components"))) {
  if (name.endsWith(".jsx")) content.push(read(`src/src/components/${name}`));
}
assert(!/https?:\/\/(?:www\.)?pentexoire\.com/i.test(content.join("\n")), "Unwanted Pentexoire external link");
console.log(`Content checks passed: ${publications.length} publications, ${patents.length} patents, ${posts.length} posts, ${Object.keys(redirects).length} publication redirects.`);
