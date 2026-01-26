import { cpSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// Static routes
const routes = ['about', 'publications', 'consultancy'];

// Create directories and copy index.html for static routes
for (const route of routes) {
  const routeDir = join(distDir, route);
  mkdirSync(routeDir, { recursive: true });
  cpSync(join(distDir, 'index.html'), join(routeDir, 'index.html'));
}

// Generate routes for individual publications
const publicationsJson = join(__dirname, '..', '..', 'publications.json');
const publications = JSON.parse(readFileSync(publicationsJson, 'utf-8'));

for (const pub of publications) {
  const routeDir = join(distDir, 'publications', String(pub.id));
  mkdirSync(routeDir, { recursive: true });
  cpSync(join(distDir, 'index.html'), join(routeDir, 'index.html'));
}

console.log(`Generated ${routes.length} static routes and ${publications.length} publication routes`);
