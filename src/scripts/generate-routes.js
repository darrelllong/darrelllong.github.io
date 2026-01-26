import { cpSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..', '..');
const indexHtml = join(repoRoot, 'index.html');

// Static routes
const routes = ['about', 'consultancy', 'publications'];

for (const route of routes) {
  const routeDir = join(repoRoot, route);
  mkdirSync(routeDir, { recursive: true });
  cpSync(indexHtml, join(routeDir, 'index.html'));
}

// Generate routes for individual publications
const publicationsJson = join(repoRoot, 'publications.json');
const publications = JSON.parse(readFileSync(publicationsJson, 'utf-8'));

for (const pub of publications) {
  const routeDir = join(repoRoot, 'publications', String(pub.id));
  mkdirSync(routeDir, { recursive: true });
  cpSync(indexHtml, join(routeDir, 'index.html'));
}

console.log(`Generated ${routes.length} static routes and ${publications.length} publication routes`);
