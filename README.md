# Darrell Long — Academic Website

Personal academic website for [Darrell D.E. Long](https://www.soe.ucsc.edu/people/darrell),
Distinguished Professor Emeritus, UC Santa Cruz.

**Live site:** https://darrelllong.github.io

## Stack

React 18 + Vite + React Router, served as a static SPA on GitHub Pages (no Jekyll).

## Development

```bash
cd src
npm install
npm run dev      # development server with HMR
npm run build    # production build → src/dist/
npm run deploy   # build + copy to repo root (required before pushing)
```

## Deployment

Manual. The site is served from the repo root on the `master` branch.

```bash
cd src && npm run deploy
cd ..
git add -A && git commit -m "Deploy" && git push
```

## Content

| File | Purpose |
|------|---------|
| `publications.json` | All publications (title, authors, BibTeX, abstract) |
| `patents.json` | Patent records |
| `posts/*.md` | Blog posts (Markdown with YAML frontmatter) |
| `posts/index.json` | Blog post manifest — add entries here for new posts |
| `pentexoire.json` | Consultancy team data |

## Blog posts

Create `posts/YYYY-MM-DD-slug.md` with frontmatter, add an entry to `posts/index.json`,
then commit and push — no build step needed for blog content.
