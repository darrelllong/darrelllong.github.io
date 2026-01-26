# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Dr. Darrell D.E. Long (Distinguished Professor Emeritus, UC Santa Cruz). Uses a **hybrid Jekyll + React SPA architecture**.

## Prerequisites

- **Node.js** - ES modules required (Node 14+), Vite 5.2 used
- **Ruby** - For Jekyll; uses `github-pages` gem
- **Python 3** - For publication scripts (requires `tkinter`, `psycopg2`)
- **PostgreSQL access** - Only needed for `add_publication.py` and `update_publications.py` (requires campus network/VPN to reach `darrell.soe.ucsc.edu`)

## Build Commands

### React SPA (primary development)
```bash
cd src
npm install          # Install dependencies
npm run dev          # Development server with HMR
npm run build        # Production build (outputs to dist/)
npm run lint         # ESLint checking
npm run preview      # Preview production build
npm run deploy       # Build and copy to repo root
```

### Jekyll (legacy pages)
```bash
bundle install       # Install Ruby dependencies
jekyll serve         # Local development server
jekyll build         # Build static site
```

## Linting

ESLint configured in `src/.eslintrc.cjs`:
- Extends: `eslint:recommended`, `plugin:react/recommended`
- Plugins: `react`, `react-hooks`, `react-refresh`
- Run: `cd src && npm run lint`
- Strict mode: `--max-warnings 0` (no warnings allowed)

## Deployment

**No CI/CD pipeline** - deployment is manual. Site is served from master branch root.

React SPA deployment:
```bash
cd src
npm run deploy    # Builds and copies dist/* to repo root
cd ..
git add -A && git commit -m "Deploy" && git push
```

The build outputs to `src/dist/`, then gets copied to the repo root. Pushing to master deploys the site.

## Local Development Without Database

The React app fetches publications from `/publications.json` at runtime. For local development:
1. The existing `publications.json` in the repo root contains all publication data
2. Run `cd src && npm run dev` - works without any database connection
3. Database access is only needed when adding/updating publications via Python scripts

## Architecture

### Two-Layer System

1. **React SPA** (`src/` directory) - Modern interactive frontend
   - Vite build system
   - React 18 + React Router
   - Outputs compiled assets to `assets/` directory
   - Main entry: `index.html` at root serves the React app

2. **Jekyll Static Site** (root directory) - Legacy pages
   - Publications at `/old/*` paths
   - Templates in `_layouts/`, includes in `_includes/`
   - SASS in `_sass/`

### Publications Data Flow

```
PostgreSQL Database (darrell.soe.ucsc.edu/website)
         ↓
update_publications.py  →  _publications/*.md (Jekyll)
         ↓
publications.json  →  React components fetch this
```

**Python scripts require database access:**
- `add_publication.py` - GUI form for adding publications to database
- `update_publications.py` - Syncs database to markdown files and JSON

### React Component Hierarchy

```
App.jsx
├── ContextProvider.jsx (global state: publications data)
├── Header.jsx (navigation + hamburger menu)
├── Main.jsx (routing)
│   ├── About.jsx
│   ├── Publications.jsx (list with search/pagination)
│   ├── Publication.jsx (detail view with BibTeX)
│   └── Consultancy.jsx
└── Footer.jsx
```

### Routes
- `/` - Home/Menu
- `/about` - About page
- `/publications` - Publications list (search, pagination)
- `/publications/:id` - Publication detail
- `/consultancy` - Consulting services

## Key Files

- `_config.yml` - Jekyll configuration, navigation, site metadata
- `src/package.json` - React dependencies and scripts
- `publications.json` - Publication data consumed by React
- `pentexoire.json` - Consultancy team data

## Adding Publications

1. Add to PostgreSQL database via `add_publication.py`
2. Run `update_publications.py` to sync to markdown/JSON
3. React app automatically picks up changes from `publications.json`

## Styling

- React styles: `src/src/assets/css/` (SCSS files per component)
- Jekyll styles: `_sass/` (uses Solarized themes)
- CSS variables defined in `src/src/assets/css/variables.scss`
- Responsive breakpoint at 968px
