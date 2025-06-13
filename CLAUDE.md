# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This repository contains two separate web applications:

1. **Jekyll Site (Root)**: Academic website built with Jekyll/Ruby for publications and CV
2. **React App (src/ directory)**: Modern SPA built with React/Vite for portfolio

## Development Commands

### Jekyll Site (Root)
```bash
# Install dependencies
bundle install

# Run development server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### React App (src/ directory)
```bash
cd src/

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

## Architecture Overview

### Jekyll Site Structure
- **Publications**: Stored in `_publications/` as markdown files with frontmatter
- **Layouts**: Custom layouts in `_layouts/` for different content types
- **Assets**: Static files in `assets/` directory
- **Configuration**: Site settings in `_config.yml`

### React App Structure
- **Components**: Reusable UI components in `src/components/`
- **Styling**: SCSS modules in `src/assets/css/`
- **Data**: JSON files for publications and profile data
- **Routing**: React Router for SPA navigation

## Publication Management

- Publications are managed via PostgreSQL database
- `add_publication.py`: GUI tool for adding new publications to database
- `update_publications.py`: Generates markdown files from database for Jekyll site
- Publications appear in both Jekyll site (`_publications/`) and React app (`src/public/publications.json`)

## Key Files

- `_config.yml`: Jekyll site configuration including navigation
- `src/package.json`: React app dependencies and build scripts
- `publications.json`: Shared publication data for React app
- `pentexoire.json`: Profile/contact information for React app