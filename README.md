# Darrell Long — Academic Website

Personal academic website for [Darrell D.E. Long](https://www.soe.ucsc.edu/people/darrell),
Distinguished Professor Emeritus, UC Santa Cruz.

**Live site:** https://darrelllong.github.io

## Stack

React 19 + Vite + React Router 7, served as a static SPA on GitHub Pages (no Jekyll).

## Development

```bash
cd src
npm install
npm run dev      # development server with HMR (runtime content served from repo root)
npm run build    # complete, standalone production build → src/dist/
npm run preview  # preview production output, including content and deep links
npm run lint     # check source code
npm run deploy   # build + copy to repo root (required before pushing)
```

## Deployment

Builds and previews stay in `src/dist/`; they do not change the published files.
`npm run deploy` copies the finished build to the repository root and removes obsolete
generated assets. It does not commit or push.

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
