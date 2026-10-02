import {
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { execFileSync } from "child_process";
import fm from "front-matter";
import { sortByDateDesc } from "../src/utils/dateUtils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const distDir = join(__dirname, "..", "dist");
const baseHtml = readFileSync(join(distDir, "index.html"), "utf-8");

const BASE_URL = "https://darrelllong.github.io";

// Each page is rendered to HTML here, with the data it shows, so that what a
// crawler fetches is the page and not an empty shell; the browser hydrates
// it (src/entry-server.jsx, src/preloaded.js).
const { render } = await import(
  pathToFileURL(join(__dirname, "..", "dist-ssr", "entry-server.js")).href
);

const portrait = JSON.parse(
  readFileSync(join(__dirname, "../src/portrait.json"), "utf-8"),
);
const previewImageUrl = `${BASE_URL}${portrait.src}`;

// The day of the last commit that touched any of the paths. A sitemap's
// lastmod that is always the day of the deployment says nothing, and Google
// ignores it.
function lastModified(...paths) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", ...paths],
      { cwd: repoRoot, encoding: "utf-8" },
    ).trim();
    if (out) return out;
  } catch {
    // not a repository, or git is not there
  }
  return new Date().toISOString().split("T")[0];
}
const latest = (...dates) => dates.sort().at(-1);

function truncate(str, max = 160) {
  if (!str) return "";
  str = str.replace(/\s+/g, " ").trim();
  return str.length <= max ? str : str.slice(0, max - 1) + "…";
}

function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(html, { title, description, canonicalUrl }) {
  const fullTitle = title
    ? `${title} | Dr. Darrell Long`
    : "Dr. Darrell D. E. Long";
  const desc = truncate(description);
  const injection = [
    `<title>${escapeAttr(fullTitle)}</title>`,
    `  <meta name="description" content="${escapeAttr(desc)}">`,
    `  <link rel="canonical" href="${canonicalUrl}">`,
    `  <meta property="og:title" content="${escapeAttr(fullTitle)}">`,
    `  <meta property="og:description" content="${escapeAttr(desc)}">`,
    `  <meta property="og:url" content="${canonicalUrl}">`,
    `  <meta property="og:type" content="website">`,
    `  <meta property="og:image" content="${previewImageUrl}">`,
    `  <meta property="og:image:type" content="${portrait.type}">`,
    `  <meta property="og:image:width" content="${portrait.width}">`,
    `  <meta property="og:image:height" content="${portrait.height}">`,
    `  <meta property="og:image:alt" content="${escapeAttr(portrait.alt)}">`,
    `  <meta name="twitter:card" content="summary">`,
    `  <meta name="twitter:title" content="${escapeAttr(fullTitle)}">`,
    `  <meta name="twitter:description" content="${escapeAttr(desc)}">`,
    `  <meta name="twitter:image" content="${previewImageUrl}">`,
    `  <meta name="twitter:image:alt" content="${escapeAttr(portrait.alt)}">`,
  ].join("\n  ");
  return html.replace("<title>Dr. Darrell Long</title>", injection);
}

// The page's HTML, with the data it was rendered from in a script that the
// browser reads before its first render, so that the two agree.
async function pageHtml(meta, data) {
  const path = new URL(meta.canonicalUrl).pathname;
  const body = await render(path, data);
  // "</script" inside the JSON would end the script element
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return injectMeta(baseHtml, meta).replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div>\n  <script id="preloaded" type="application/json">${json}</script>`,
  );
}

async function writeRoute(routePath, meta, data = {}) {
  const dir = join(distDir, routePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), await pageHtml(meta, data));
}

// A record and its neighbours in the order the site shows: what its page
// needs for its previous and next links
function withNeighbours(sorted, index) {
  const n = sorted.length;
  const around = [
    sorted[(index - 1 + n) % n],
    sorted[index],
    sorted[(index + 1) % n],
  ];
  return [...new Set(around)];
}

const allUrls = [];
const addUrl = (url, lastmod) => allUrls.push({ url, lastmod });

// Data, in the order the site shows it
const publications = sortByDateDesc(
  JSON.parse(readFileSync(join(repoRoot, "publications.json"), "utf-8")),
);
const patents = sortByDateDesc(
  JSON.parse(readFileSync(join(repoRoot, "patents.json"), "utf-8")),
);
const blogPosts = JSON.parse(
  readFileSync(join(repoRoot, "posts", "index.json"), "utf-8"),
).sort((a, b) => b.date.localeCompare(a.date));
const postBody = (slug) =>
  fm(readFileSync(join(repoRoot, "posts", `${slug}.md`), "utf-8")).body;
const publicationsModified = lastModified("publications.json");
const patentsModified = lastModified("patents.json");
const postsModified = lastModified("posts");

// Static routes
const staticRoutes = [
  {
    path: "about",
    title: "About",
    description:
      "Biography of Dr. Darrell Long: education, storage research, SSRC and CRSS, teaching, doctoral students, and national service.",
    data: {},
    lastmod: lastModified("src/src/components/About.jsx"),
  },
  {
    path: "publications",
    title: "Publications",
    description:
      "Research publications by Dr. Darrell Long covering storage systems, distributed systems, and computer architecture.",
    data: { publications, complete: ["publications"] },
    lastmod: publicationsModified,
  },
  {
    path: "patents",
    title: "Patents",
    description:
      "U.S. Patents by Dr. Darrell Long and colleagues in storage, networking, and systems research.",
    data: { patents, complete: ["patents"] },
    lastmod: patentsModified,
  },
  {
    path: "blog",
    title: "Blog",
    description:
      "Blog posts by Dr. Darrell Long on computer science, research, and academic history.",
    data: { posts: blogPosts },
    lastmod: postsModified,
  },
  {
    path: "consultancy",
    title: "Consultancy",
    description:
      "Technical consulting and expert witness services in computer science from Dr. Darrell Long and Pentexoire Consulting.",
    data: {},
    lastmod: latest(
      lastModified("src/src/components/Consultancy.jsx"),
      lastModified("pentexoire.json"),
    ),
  },
];

for (const r of staticRoutes) {
  const url = `${BASE_URL}/${r.path}/`;
  await writeRoute(
    r.path,
    { title: r.title, description: r.description, canonicalUrl: url },
    r.data,
  );
  addUrl(url, r.lastmod);
}

// Publications
for (const [index, pub] of publications.entries()) {
  const url = `${BASE_URL}/publications/${pub.id}/`;
  await writeRoute(
    `publications/${pub.id}`,
    {
      title: pub.title,
      description:
        pub.short_description || pub.full_content?.split("\n")[0] || pub.title,
      canonicalUrl: url,
    },
    { publications: withNeighbours(publications, index) },
  );
  addUrl(url, publicationsModified);
}

// Keep previously published numeric URLs working even if their catalog record
// was removed. These shells show the app's not-found state and are not indexed.
const publicationIds = new Set(
  publications.map((publication) => String(publication.id)),
);
const publicationRedirects = JSON.parse(
  readFileSync(join(__dirname, "../src/publicationRedirects.json"), "utf-8"),
);
for (const entry of readdirSync(join(repoRoot, "publications"), {
  withFileTypes: true,
})) {
  if (
    !entry.isDirectory() ||
    !/^\d+$/.test(entry.name) ||
    publicationIds.has(entry.name) ||
    publicationRedirects[entry.name]
  )
    continue;
  const directory = join(distDir, "publications", entry.name);
  mkdirSync(directory, { recursive: true });
  writeFileSync(
    join(directory, "index.html"),
    injectMeta(baseHtml, {
      title: "Publication not found",
      description:
        "This publication is no longer in the catalog. Browse the publication archive for current records.",
      canonicalUrl: `${BASE_URL}/publications/${entry.name}/`,
    }).replace("</head>", '<meta name="robots" content="noindex">\n</head>'),
  );
}

for (const [id, destination] of Object.entries(publicationRedirects)) {
  const target = destination.startsWith("/") ? `${BASE_URL}${destination}` : destination;
  const directory = join(distDir, "publications", id);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "index.html"), `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>Publication moved | Dr. Darrell Long</title>
<link rel="canonical" href="${escapeAttr(target)}">
<meta http-equiv="refresh" content="0; url=${escapeAttr(target)}">
</head><body><p>This record has moved. <a href="${escapeAttr(target)}">View the publication</a>.</p></body></html>\n`);
}

// Patents
for (const [index, pat] of patents.entries()) {
  const url = `${BASE_URL}/patents/${pat.id}/`;
  await writeRoute(
    `patents/${pat.id}`,
    {
      title: pat.title,
      description: pat.short_description || pat.title,
      canonicalUrl: url,
    },
    { patents: withNeighbours(patents, index) },
  );
  addUrl(url, patentsModified);
}

// Legacy slug-based publication URLs (pre-React/Jekyll era) that Google still
// has indexed. Redirect each to its current numeric publication page so old
// links resolve instead of 404ing. Map: old slug -> current numeric id.
const legacyPublicationRedirects = {
  "ICDCS-1987-Long": 235,
  "CMU-1987-Long": 255,
  "CC-Burns-2001": 24,
  "ICJS-Golding-1991": 178,
};
for (const [slug, id] of Object.entries(legacyPublicationRedirects)) {
  const target = `${BASE_URL}/publications/${id}/`;
  const dir = join(distDir, "publications", slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "index.html"),
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting...</title>
  <link rel="canonical" href="${target}">
  <meta http-equiv="refresh" content="0; url=${target}">
  <script>window.location.replace('${target}');</script>
</head>
<body>
  <p>Redirecting to <a href="${target}">the publication page</a>...</p>
</body>
</html>
`,
  );
}

// Blog posts
for (const post of blogPosts) {
  const url = `${BASE_URL}/blog/${post.slug}/`;
  await writeRoute(
    `blog/${post.slug}`,
    {
      title: post.title,
      description: post.excerpt || post.title,
      canonicalUrl: url,
    },
    { posts: blogPosts, postBodies: { [post.slug]: postBody(post.slug) } },
  );
  addUrl(url, lastModified(`posts/${post.slug}.md`));
}

// The home page shows the three latest publications and posts
const homeMeta = {
  title: "",
  description:
    "Dr. Darrell D. E. Long, Distinguished Professor of Engineering, emeritus, at UC Santa Cruz. Research in storage, distributed systems, reliability, and security.",
  canonicalUrl: BASE_URL + "/",
};
const homeData = { publications: publications.slice(0, 3), posts: blogPosts };
allUrls.unshift({
  url: BASE_URL + "/",
  lastmod: latest(
    publicationsModified,
    postsModified,
    lastModified("src/src/components/Home.jsx"),
  ),
});

// sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod }) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")}
</urlset>`;
writeFileSync(join(distDir, "sitemap.xml"), sitemap);

// robots.txt
const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`;
writeFileSync(join(distDir, "robots.txt"), robotsTxt);

console.log(
  `Generated ${staticRoutes.length} static routes, ${publications.length} publication routes, ${patents.length} patent routes, ${blogPosts.length} blog routes.`,
);
console.log(`Generated sitemap.xml with ${allUrls.length} URLs.`);
console.log(`Generated robots.txt.`);

// A complete, self-contained preview, including runtime content and downloads.
for (const path of [
  "publications.json",
  "patents.json",
  "pentexoire.json",
  "posts",
  "pdfs",
  "images",
  "favicon.ico",
  "404.html",
  "not-found.jpg",
  ".nojekyll",
]) {
  cpSync(join(repoRoot, path), join(distDir, path), { recursive: true });
}

writeFileSync(join(distDir, "index.html"), await pageHtml(homeMeta, homeData));
