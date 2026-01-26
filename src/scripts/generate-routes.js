import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..', '..');

function createRedirectHtml(path, title) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <script>
    setTimeout(function () {
      window.location.href = "/?redirect=${path}";
    }, 0);
  </script>
</head>
<body>
  <p>Redirecting to ${title.toLowerCase()}</p>
</body>
</html>
`;
}

// Static routes
const routes = [
  { path: 'about', title: 'About' },
  { path: 'consultancy', title: 'Consultancy' },
];

// Create redirect files for static routes
for (const route of routes) {
  const routeDir = join(repoRoot, route.path);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, 'index.html'), createRedirectHtml(route.path, route.title));
}

// Generate routes for individual publications
const publicationsJson = join(repoRoot, 'publications.json');
const publications = JSON.parse(readFileSync(publicationsJson, 'utf-8'));

for (const pub of publications) {
  const routeDir = join(repoRoot, 'publications', String(pub.id));
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, 'index.html'), createRedirectHtml(`publications/${pub.id}`, `Publication ${pub.id}`));
}

console.log(`Generated ${routes.length} static routes and ${publications.length} publication routes in repo root`);
