# House Party Collab

Satirical LinkedIn clone where Marxist philosophers roast tech bro posts. Static site built with Astro v5.

## Commands

- `npm run dev` — start dev server (localhost:4321)
- `npm run build` — build static site to `dist/`
- `npm run preview` — preview built site

## Astro v5 Conventions

- Use `type Props = { ... }` in .astro frontmatter, NOT `export interface Props`. Astro v5's compiler emits frontmatter inside a `createComponent()` callback — `export interface` is illegal in that context.
- Content entry IDs include file extensions (e.g., `grind-mindset.md` not `grind-mindset`). Strip the extension when matching against frontmatter slug fields.
- `slug` is a reserved auto-generated field in Content Collections. Do not define it in frontmatter schemas.
- Virtual module imports (`astro:content`, `astro/config`) resolve at build time, not via the TS language server. Editor diagnostics for these are false positives.

## Content Architecture

- Posts: `src/content/posts/{slug}.md`
- Comments: `src/content/comments/{post-slug}/{author}-{n}.md`
- Schemas defined in `src/content.config.ts`
- Comments link to posts via `postSlug` frontmatter field
- Reply nesting via `parentComment` field (null for top-level, two levels max)
