## Goal

Build a proper blog hosted on `humanendurancepodcast.com/blog` that's optimized for SEO. Posts authored as MDX in the repo, rendered as static-feeling React pages with full metadata, JSON-LD, and a feed-style index with search.

## Why MDX + on-site first

Google indexes what's in the HTML at load. Vite SSR'd MDX gets compiled into the JS bundle and the post body lives in the source, so crawlers (and Google's renderer) see the full text on `/blog/:slug`. Publish here first, then syndicate to Substack with a `rel="canonical"` link pointing back to your site so Google credits this domain as the original.

## Pages & routes

```text
/blog              → Blog index (feed layout, search)
/blog/:slug        → Individual post page
```

Both added to React Router in `src/App.tsx` above the catch-all. Both added to `public/sitemap.xml` (auto-generated at build time from the posts list).

## Content model

Each post = one MDX file in `src/content/blog/<slug>.mdx` with frontmatter:

```yaml
---
title: "From Medical Student to IRONMAN 70.3 World Champion"
slug: "samuel-studer-ironman-medical-student"
description: "How Samuel Studer balanced 20+ hours of training with med school."
date: "2025-11-15"
author: "Bruna Maia"
cover: "/blog/samuel-studer.jpg"
coverAlt: "Samuel Studer crossing the finish line in Marbella"
tags: ["interviews", "triathlon"]
canonical: "https://humanendurancepodcast.com/blog/samuel-studer-ironman-medical-student"
substackUrl: "https://justbrunathings.substack.com/p/..."  # optional
---

# Post body in Markdown...
```

Images: drop into `public/blog/<filename>` and reference via `/blog/<filename>`.

## Blog index (/blog) — Feed layout

- Page header: "Blog" + short tagline
- Search bar (client-side filter over title + description + tags, instant)
- Vertical chronological feed: each row = large cover image left, title + date + excerpt + tags right (stacks on mobile)
- Empty state when search has no matches

## Post page (/blog/:slug)

- Cover image hero
- Title (H1), date, author, tags
- MDX body with branded prose styles (Roca One headings, Inter body, Pink links/accents)
- "Listen to the podcast" CTA at bottom linking to `/#listen`
- "Back to blog" link
- Sibling nav: previous / next post

## SEO per post

- `<title>` = post title + " | Human Endurance Podcast"
- `<meta name="description">` = frontmatter description
- `<link rel="canonical">` = post canonical URL
- Open Graph + Twitter Card tags with cover image
- JSON-LD `BlogPosting` (headline, datePublished, author, image, mainEntityOfPage)
- Managed via `react-helmet-async` (installed once, wraps `<App>`)
- `/blog` index: JSON-LD `Blog` + list of posts
- `noscript` fallback on each post page with the full text content (mirrors what we already do on home)

## Sitemap & robots

- Build-time script (`scripts/generate-sitemap.mjs`) reads all MDX frontmatter and writes `public/sitemap.xml` with `/`, `/blog`, and every `/blog/:slug` + `lastmod = date`
- Hooked into `vite.config.ts` via a pre-build step (or as an npm `prebuild` script)
- `public/llms.txt` updated to list `/blog` and link to it

## Home page changes

- Remove `<BlogSection />` and its `<SectionDivider />` from `src/pages/Index.tsx`
- Delete `src/components/BlogSection.tsx`
- Add "Blog" link in `Navbar.tsx` pointing to `/blog` (internal route, not Substack anymore)
- Update `Footer.tsx` "Blog" link to `/blog`

## Initial seed content

The Substack URL you sent (`/p-197356894`) resolves to a profile-shaped page, not a post — I couldn't extract the body. **I'll proceed by scaffolding the system with one placeholder MDX post**, then in a follow-up message you can either:
- Paste the post's full text + a working public URL, or
- List the Substack post URLs you want imported and I'll fetch each one

Either way the blog is live and you can drop new `.mdx` files in at any time.

## Technical details

**New deps:** `@mdx-js/rollup`, `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter`, `gray-matter` (build script), `react-helmet-async`, `@tailwindcss/typography` (for `prose` classes themed to brand).

**Vite config:** add `@mdx-js/rollup` plugin with `remark-frontmatter` + `remark-mdx-frontmatter` so each MDX module exports `default` (component) + `frontmatter` (object). Use `import.meta.glob('/src/content/blog/*.mdx', { eager: true })` to build the posts index at compile time — no runtime fetching, fully crawlable.

**Files added:**
- `src/content/blog/_template.mdx` (reference)
- `src/content/blog/welcome.mdx` (placeholder seed)
- `src/lib/posts.ts` (glob loader, sort by date, slug map, prev/next helpers)
- `src/pages/Blog.tsx` (index, feed + search)
- `src/pages/BlogPost.tsx` (renders MDX by slug, 404s on miss)
- `src/components/blog/PostCard.tsx`
- `src/components/blog/PostMeta.tsx` (date + author + tags)
- `src/components/SEO.tsx` (shared helmet wrapper)
- `scripts/generate-sitemap.mjs`
- `mdx.d.ts` (types for MDX modules)

**Files edited:** `src/App.tsx`, `src/pages/Index.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/main.tsx` (HelmetProvider), `vite.config.ts`, `tailwind.config.ts` (typography plugin + brand prose theme), `package.json` (prebuild script), `public/llms.txt`, `public/sitemap.xml` (will be auto-generated going forward).

**Files deleted:** `src/components/BlogSection.tsx`.

## Out of scope (ask if you want any of these)

- CMS / admin UI for writing posts in-browser
- Comments
- RSS feed at `/feed.xml` (easy add later if you want subscribers)
- Auto-syndicate to Substack
- Tag landing pages (`/blog/tag/:tag`)
