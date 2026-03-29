# House Party Collab

Satirical LinkedIn clone where Marxist philosophers roast tech bro posts. Static site built with Astro v5, deployed to GitHub Pages.

**Live site:** https://ericjohnolson.github.io/linked-in-labor/
**Repo:** https://github.com/ericjohnolson/linked-in-labor

## Commands

- `npm run dev` — start dev server (localhost:4321)
- `npm run build` — build static site to `dist/`
- `npm run preview` — preview built site

## Project Structure

```
src/
├── pages/index.astro          # Feed page (renders all posts with comments)
├── layouts/FeedLayout.astro   # LinkedIn-style 3-column layout
├── components/
│   ├── Header.astro           # LinkedIn-style nav bar
│   ├── LeftSidebar.astro      # Profile card sidebar
│   ├── RightSidebar.astro     # "People also viewed" sidebar
│   ├── PostCard.astro         # Individual post with author info
│   ├── CommentThread.astro    # Comment list per post
│   ├── Comment.astro          # Single comment (supports nesting)
│   └── ReactionBar.astro      # Likes/reposts/comments bar
├── content/
│   ├── posts/{slug}.md        # Tech bro posts
│   └── comments/{post-slug}/  # Philosopher roasts per post
├── content.config.ts          # Zod schemas for posts and comments
└── styles/linkedin.css        # LinkedIn visual clone styles
public/
├── avatars/{name}.svg         # Author avatar SVGs
└── favicon.svg
```

## Astro v5 Conventions

- Use `type Props = { ... }` in .astro frontmatter, NOT `export interface Props`. Astro v5's compiler emits frontmatter inside a `createComponent()` callback — `export interface` is illegal in that context.
- Content entry IDs include file extensions (e.g., `grind-mindset.md` not `grind-mindset`). Strip the extension when matching against frontmatter slug fields.
- `slug` is a reserved auto-generated field in Content Collections. Do not define it in frontmatter schemas.
- Virtual module imports (`astro:content`, `astro/config`) resolve at build time, not via the TS language server. Editor diagnostics for these are false positives.

## Content Architecture

### Posts

Location: `src/content/posts/{slug}.md`

Frontmatter schema:

```yaml
---
author: "Elon Musk"                    # Display name
authorTitle: "CEO of Everything"       # LinkedIn-style headline
authorAvatar: /avatars/elon.svg        # Path to SVG in public/
authorFollowers: 180000000             # Follower count
timestamp: "2024-03-15T09:00:00Z"      # ISO 8601
likes: 420000                          # Number
reposts: 88000                         # Number
image: /images/post-image.png          # Optional post image
---

Post body in markdown. Write in the voice of a tech bro LinkedIn poster —
hustle culture, thought leadership, inspirational cringe.
```

### Comments

Location: `src/content/comments/{post-slug}/{author}-{n}.md`

- `{post-slug}` matches the post's filename (without `.md`)
- `{author}` is the philosopher's last name, lowercase
- `{n}` is a sequence number (e.g., `01`, `02`) for multiple comments by the same author

Frontmatter schema:

```yaml
---
postSlug: grind-mindset                # Must match the post filename (no .md)
commentId: marx-01                     # Unique ID, matches the filename (no .md)
author: "Karl Marx"                    # Philosopher's display name
authorTitle: 'Author, "Das Kapital"'   # Satirical LinkedIn headline
authorAvatar: /avatars/marx.svg        # Path to SVG in public/
timestamp: "2024-03-15T09:04:00Z"      # Should be after the post timestamp
likes: 31415                           # Number
parentComment: null                    # null = top-level, or commentId of parent
order: 1                               # Display order within the post
---

Comment body in markdown. Write in the philosopher's authentic voice and
theoretical framework, applying their ideas to critique the post.
```

### Comment Nesting

- `parentComment: null` — top-level comment on the post
- `parentComment: marx-01` — reply to Marx's comment
- Two levels max (comment → reply, no reply-to-reply)
- `order` field controls display sequence (1, 2, 3...)

## Adding New Content

### Adding a New Post

1. Create `src/content/posts/{slug}.md` with the frontmatter above
2. Write the post body as a cringey tech bro LinkedIn post
3. Add comments in `src/content/comments/{slug}/`

### Adding Comments to a Post

1. Create `src/content/comments/{post-slug}/{author}-01.md`
2. If the philosopher is new, add their avatar SVG to `public/avatars/{name}.svg`
3. Set `order` to the next number in sequence
4. For replies, set `parentComment` to the `commentId` of the comment being replied to

### Adding a New Philosopher

1. Create their avatar SVG in `public/avatars/{lastname}.svg`
2. Give them a satirical `authorTitle` that parodies LinkedIn headlines
3. Write comments in their authentic theoretical voice — reference their actual works and ideas

### Current Philosophers

| Name | Avatar | Known For |
|------|--------|-----------|
| Karl Marx | marx.svg | Surplus value, alienation, class struggle |
| Friedrich Engels | engels.svg | Working class conditions, wit, funding Marx |
| Rosa Luxemburg | luxemburg.svg | Anti-reformism, accumulation of capital |
| Antonio Gramsci | gramsci.svg | Cultural hegemony, prison notebooks |
| Vladimir Lenin | lenin.svg | Imperialism, vanguard party theory |
| Guy Debord | debord.svg | Society of the spectacle, situationism |

## Deployment

- GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- Deploys automatically on push to `main`
- Base path: `/linked-in-labor`
- Astro config sets `site` and `base` for correct asset paths

## Tone Guide

- **Posts** should sound like real (but exaggerated) LinkedIn hustle culture posts
- **Comments** should apply genuine Marxist/critical theory to dismantle the post, but written with personality — dry wit, academic condescension, historical references
- The humor comes from the collision of sincere philosophical critique with the absurdity of LinkedIn culture
