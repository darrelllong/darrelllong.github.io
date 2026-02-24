import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..', '..');
const distDir = join(__dirname, '..', 'dist');
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

const BASE_URL = 'https://darrelllong.github.io';

function truncate(str, max = 160) {
  if (!str) return '';
  str = str.replace(/\s+/g, ' ').trim();
  return str.length <= max ? str : str.slice(0, max - 1) + '\u2026';
}

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectMeta(html, { title, description, canonicalUrl }) {
  const fullTitle = `${title} | Darrell Long`;
  const desc = truncate(description);
  const injection = [
    `<title>${escapeAttr(fullTitle)}</title>`,
    `  <meta name="description" content="${escapeAttr(desc)}">`,
    `  <link rel="canonical" href="${canonicalUrl}">`,
    `  <meta property="og:title" content="${escapeAttr(fullTitle)}">`,
    `  <meta property="og:description" content="${escapeAttr(desc)}">`,
    `  <meta property="og:url" content="${canonicalUrl}">`,
    `  <meta property="og:type" content="website">`,
  ].join('\n  ');
  return html.replace('<title>Darrell Long</title>', injection);
}

function writeRoute(routePath, meta) {
  const dir = join(repoRoot, routePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), injectMeta(baseHtml, meta));
}

const allUrls = [BASE_URL + '/'];

// Static routes
const staticRoutes = [
  {
    path: 'about',
    title: 'About',
    description: 'About Professor Darrell D.E. Long, Distinguished Professor Emeritus of Computer Science and Engineering at UC Santa Cruz.',
  },
  {
    path: 'publications',
    title: 'Publications',
    description: 'Research publications by Professor Darrell Long covering storage systems, distributed systems, and computer architecture.',
  },
  {
    path: 'patents',
    title: 'Patents',
    description: 'U.S. Patents by Professor Darrell Long and colleagues in storage, networking, and systems research.',
  },
  {
    path: 'blog',
    title: 'Blog',
    description: 'Blog posts by Professor Darrell Long on computer science, research, and academic history.',
  },
  {
    path: 'consultancy',
    title: 'Consultancy',
    description: 'Expert consulting services by Professor Darrell Long and the Pentexoire team.',
  },
];

for (const r of staticRoutes) {
  const url = `${BASE_URL}/${r.path}`;
  writeRoute(r.path, { title: r.title, description: r.description, canonicalUrl: url });
  allUrls.push(url);
}

// Publications
const publications = JSON.parse(readFileSync(join(repoRoot, 'publications.json'), 'utf-8'));
for (const pub of publications) {
  const url = `${BASE_URL}/publications/${pub.id}`;
  writeRoute(`publications/${pub.id}`, {
    title: pub.title,
    description: pub.short_description || pub.full_content?.split('\n')[0] || pub.title,
    canonicalUrl: url,
  });
  allUrls.push(url);
}

// Patents
const patents = JSON.parse(readFileSync(join(repoRoot, 'patents.json'), 'utf-8'));
for (const pat of patents) {
  const url = `${BASE_URL}/patents/${pat.id}`;
  writeRoute(`patents/${pat.id}`, {
    title: pat.title,
    description: pat.short_description || pat.title,
    canonicalUrl: url,
  });
  allUrls.push(url);
}

// Blog posts
const blogPosts = JSON.parse(readFileSync(join(repoRoot, 'posts', 'index.json'), 'utf-8'));
for (const post of blogPosts) {
  const url = `${BASE_URL}/blog/${post.slug}`;
  writeRoute(`blog/${post.slug}`, {
    title: post.title,
    description: post.excerpt || post.title,
    canonicalUrl: url,
  });
  allUrls.push(url);
}

// sitemap.xml
const today = new Date().toISOString().split('T')[0];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>`;
writeFileSync(join(repoRoot, 'sitemap.xml'), sitemap);

// robots.txt
const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`;
writeFileSync(join(repoRoot, 'robots.txt'), robotsTxt);

console.log(`Generated ${staticRoutes.length} static routes, ${publications.length} publication routes, ${patents.length} patent routes, ${blogPosts.length} blog routes.`);
console.log(`Generated sitemap.xml with ${allUrls.length} URLs.`);
console.log(`Generated robots.txt.`);
