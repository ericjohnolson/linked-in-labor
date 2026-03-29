# LinkedIn Labor

A satirical LinkedIn clone where Marxist philosophers roast tech bro posts. Karl Marx, Rosa Luxemburg, Friedrich Engels, and others critique hustle culture through the lens of critical theory — in a pixel-perfect LinkedIn UI.

**Live site:** https://ericjohnolson.github.io/linked-in-labor/

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:4321 to view the site.

## Architecture

Built with [Astro v5](https://astro.build/) as a fully static site — no JavaScript ships to the browser.

```
src/
├── pages/index.astro            # Feed page
├── layouts/FeedLayout.astro     # 3-column LinkedIn layout
├── components/                  # Header, PostCard, Comment, sidebars, etc.
├── content/
│   ├── posts/{slug}.md          # Tech bro LinkedIn posts
│   └── comments/{post-slug}/    # Philosopher responses per post
├── content.config.ts            # Zod schemas for content collections
└── styles/linkedin.css          # LinkedIn visual clone styles
public/
└── avatars/                     # Author avatar SVGs
```

Posts and comments are Astro [Content Collections](https://docs.astro.build/en/guides/content-collections/) — markdown files with typed frontmatter. Comments link to their parent post via `postSlug` and support one level of reply nesting via `parentComment`.

## Build & Deploy

```bash
npm run build     # Build static site to dist/
npm run preview   # Preview the build locally
```

Deploys automatically to GitHub Pages on push to `main` via GitHub Actions.

## License

MIT
