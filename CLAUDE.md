# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Dr. Darrell D.E. Long (Distinguished Professor Emeritus, UC Santa Cruz). **Pure React SPA** served on GitHub Pages with `.nojekyll`.

## Prerequisites

- **Node.js** - ES modules required (Node 14+), Vite used
- **Python 3** - For publication helper scripts (`add_abstracts.py`, `fix_abstracts.py`)

## Build Commands

```bash
cd src
npm install          # Install dependencies
npm run dev          # Development server with HMR
npm run build        # Production build (outputs to dist/)
npm run lint         # ESLint checking
npm run preview      # Preview production build
npm run deploy       # Build and copy to repo root
```

## Linting

ESLint configured in `src/.eslintrc.cjs`:
- Extends: `eslint:recommended`, `plugin:react/recommended`
- Plugins: `react`, `react-hooks`, `react-refresh`
- Run: `cd src && npm run lint`
- Strict mode: `--max-warnings 0` (no warnings allowed)

## Deployment

**No CI/CD pipeline** - deployment is manual. Site is served from master branch root.

```bash
cd src
npm run deploy    # Builds and copies dist/* to repo root
cd ..
git add -A && git commit -m "Deploy" && git push
```

The build outputs to `src/dist/`, then gets copied to the repo root. Pushing to master deploys the site. The `.nojekyll` file tells GitHub Pages to skip Jekyll processing.

## Architecture

### React SPA (`src/` directory)

- Vite build system
- React 18 + React Router
- Outputs compiled assets to `assets/` directory
- Main entry: `index.html` at root serves the React app

### Publications Data Flow

```
publications.json  →  React components fetch this at runtime
```

**Python helper scripts** (edit `publications.json` directly):
- `add_abstracts.py` - Add abstracts to publications
- `fix_abstracts.py` - Fix abstract formatting

### Blog System

Blog posts are markdown files in `posts/` (repo root) with YAML frontmatter:

```markdown
---
title: "Post Title"
date: "2026-02-06"
tags: ["research", "storage"]
excerpt: "Short description for listing page."
---

Markdown content here.
```

Posts are fetched at runtime (not bundled). The manifest `posts/index.json` lists all posts with their metadata. The slug is the filename without `.md` (e.g., `2026-02-06-my-post.md` → slug `2026-02-06-my-post`).

To add a new blog post:
1. Create a `.md` file in `posts/` with date-prefixed filename and frontmatter
2. Add an entry to `posts/index.json` (slug, title, date, tags, excerpt)
3. `git add && git commit && git push` — no build step needed

### React Component Hierarchy

```
App.jsx
├── ContextProvider.jsx (global state: publications data)
├── Header.jsx (navigation + hamburger menu)
├── Main.jsx (routing)
│   ├── About.jsx
│   ├── Publications.jsx (list with search/pagination)
│   ├── Publication.jsx (detail view with BibTeX)
│   ├── Patents.jsx (list with search/pagination)
│   ├── Patent.jsx (detail view)
│   ├── Blog.jsx (list with search/tags/pagination)
│   ├── BlogPost.jsx (markdown rendering)
│   └── Consultancy.jsx
└── Footer.jsx
```

### Routes
- `/` - Home/Menu
- `/about` - About page
- `/publications` - Publications list (search, pagination)
- `/publications/:id` - Publication detail
- `/patents` - Patents list (search, pagination)
- `/patents/:id` - Patent detail
- `/blog` - Blog listing (search, tag filtering, pagination)
- `/blog/:slug` - Individual blog post
- `/consultancy` - Consulting services

## Key Files

- `src/package.json` - React dependencies and scripts
- `publications.json` - Publication data consumed by React
- `patents.json` - Patent data consumed by React
- `pentexoire.json` - Consultancy team data
- `.nojekyll` - Tells GitHub Pages to skip Jekyll
- `posts/index.json` - Blog post manifest (add entries here for new posts)
- `posts/*.md` - Blog post markdown files
- `src/src/utils/blogLoader.js` - Blog post loading (fetches at runtime)
- `src/scripts/generate-routes.js` - Generates route directories for GitHub Pages SPA

## Styling

- Styles: `src/src/assets/css/` (SCSS files per component)
- CSS variables defined in `src/src/assets/css/variables.scss`
- Responsive breakpoint at 968px
