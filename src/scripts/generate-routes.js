import {
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const distDir = join(__dirname, "..", "dist");
const baseHtml = readFileSync(join(distDir, "index.html"), "utf-8");

const BASE_URL = "https://darrelllong.github.io";
const portrait = JSON.parse(
  readFileSync(join(__dirname, "../src/portrait.json"), "utf-8"),
);
const previewImageUrl = `${BASE_URL}${portrait.src}`;

function truncate(str, max = 160) {
  if (!str) return "";
  str = str.replace(/\s+/g, " ").trim();
  return str.length <= max ? str : str.slice(0, max - 1) + "\u2026";
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
    ? `${title} | Darrell Long`
    : "Darrell Long | UC Santa Cruz";
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
  return html.replace("<title>Darrell Long</title>", injection);
}

function writeRoute(routePath, meta) {
  const dir = join(distDir, routePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), injectMeta(baseHtml, meta));
}

const allUrls = [BASE_URL + "/"];

// Static routes
const staticRoutes = [
  {
    path: "about",
    title: "About",
    description:
      "Darrell Long’s biography: education, early lecturing, storage research at UC Santa Cruz, the SSRC and CRSS, and doctoral mentoring.",
  },
  {
    path: "publications",
    title: "Publications",
    description:
      "Research publications by Professor Darrell Long covering storage systems, distributed systems, and computer architecture.",
  },
  {
    path: "patents",
    title: "Patents",
    description:
      "U.S. Patents by Professor Darrell Long and colleagues in storage, networking, and systems research.",
  },
  {
    path: "blog",
    title: "Blog",
    description:
      "Blog posts by Professor Darrell Long on computer science, research, and academic history.",
  },
  {
    path: "consultancy",
    title: "Consultancy",
    description:
      "Technical consulting and expert witness services in computer science from Darrell Long and Pentexoire Consulting.",
  },
];

for (const r of staticRoutes) {
  const url = `${BASE_URL}/${r.path}/`;
  writeRoute(r.path, {
    title: r.title,
    description: r.description,
    canonicalUrl: url,
  });
  allUrls.push(url);
}

// Publications
const publications = JSON.parse(
  readFileSync(join(repoRoot, "publications.json"), "utf-8"),
);
for (const pub of publications) {
  const url = `${BASE_URL}/publications/${pub.id}/`;
  writeRoute(`publications/${pub.id}`, {
    title: pub.title,
    description:
      pub.short_description || pub.full_content?.split("\n")[0] || pub.title,
    canonicalUrl: url,
  });
  allUrls.push(url);
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
<title>Publication moved | Darrell Long</title>
<link rel="canonical" href="${escapeAttr(target)}">
<meta http-equiv="refresh" content="0; url=${escapeAttr(target)}">
</head><body><p>This record has moved. <a href="${escapeAttr(target)}">View the publication</a>.</p></body></html>\n`);
}

// Patents
const patents = JSON.parse(
  readFileSync(join(repoRoot, "patents.json"), "utf-8"),
);
for (const pat of patents) {
  const url = `${BASE_URL}/patents/${pat.id}/`;
  writeRoute(`patents/${pat.id}`, {
    title: pat.title,
    description: pat.short_description || pat.title,
    canonicalUrl: url,
  });
  allUrls.push(url);
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
const blogPosts = JSON.parse(
  readFileSync(join(repoRoot, "posts", "index.json"), "utf-8"),
);
for (const post of blogPosts) {
  const url = `${BASE_URL}/blog/${post.slug}/`;
  writeRoute(`blog/${post.slug}`, {
    title: post.title,
    description: post.excerpt || post.title,
    canonicalUrl: url,
  });
  allUrls.push(url);
}

// sitemap.xml
const today = new Date().toISOString().split("T")[0];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join("\n")}
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
writeFileSync(
  join(distDir, "index.html"),
  injectMeta(baseHtml, {
    title: "",
    description:
      "Darrell D. E. Long, Distinguished Professor of Engineering, emeritus, at UC Santa Cruz. Research in storage, distributed systems, reliability, and security.",
    canonicalUrl: BASE_URL + "/",
  }),
);
