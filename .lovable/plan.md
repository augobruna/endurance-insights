

# SEO Bulletproof Plan for Human Endurance Podcast

## Why This Matters

Your site is a React SPA — meaning all content is loaded via JavaScript. Google can usually handle this, but ChatGPT, Bing, and social media crawlers often cannot. This plan addresses both **technical SEO** and **content SEO** to maximize discoverability.

---

## 1. Enhanced Meta Tags (index.html)

Update `index.html` with comprehensive meta tags:

- **Title**: Keep current, it's good
- **Canonical URL**: Add `<link rel="canonical" href="https://YOUR-DOMAIN.com/" />`
- **Open Graph tags**: Update `og:url`, `og:image` to point to your actual domain and logo
- **Twitter Card**: Update image to your logo
- **Additional meta**: Add `robots`, `language`, `theme-color`
- **Favicon**: Ensure proper favicon setup with multiple sizes

## 2. Structured Data (JSON-LD)

Add Schema.org structured data directly in `index.html` for:

- **Podcast** schema — tells Google this is a podcast with name, description, hosts, and platform links
- **Organization** schema — connects the podcast to its social profiles
- **WebSite** schema — basic site identity

This is what makes your podcast appear as a rich result in Google and helps ChatGPT understand your content.

## 3. Semantic HTML Improvements

Update components to use proper HTML semantics:

- **HeroSection**: Wrap in `<header>` with proper `<h1>` (already good)
- **StorySection**: Use `<article>` tag
- **SeriesSection**: Use `<article>` tags for each series card
- **HostsSection**: Use `<article>` for each host bio
- **FeaturedEpisodesSection**: Add `aria-label` attributes to iframes with episode context
- **Footer**: Add `aria-label="Site footer"`
- **Navbar**: Add `aria-label="Main navigation"`

## 4. Sitemap and Robots.txt

- **robots.txt**: Update to include sitemap reference
- **sitemap.xml**: Create a static sitemap pointing to the homepage (since it's a single-page site)

## 5. Performance and Accessibility

- Add `loading="lazy"` to host images
- Add proper `alt` text review (already mostly good)
- Ensure all links have descriptive text (already good)

## 6. Pre-rendering with react-snap

Install `react-snap` to generate a static HTML snapshot of the page at build time. This means crawlers (Google, ChatGPT, Bing) will see fully rendered HTML instead of an empty `<div id="root">`. This is the single most impactful SEO change.

---

## Technical Details

### Files to create:
- `public/sitemap.xml` — static sitemap

### Files to modify:
- `index.html` — add canonical, structured data (JSON-LD), updated OG tags, theme-color
- `public/robots.txt` — add sitemap reference
- `src/components/Navbar.tsx` — add `aria-label`
- `src/components/HeroSection.tsx` — minor semantic tweaks
- `src/components/StorySection.tsx` — wrap in `<article>`
- `src/components/SeriesSection.tsx` — semantic markup
- `src/components/HostsSection.tsx` — semantic markup
- `src/components/FeaturedEpisodesSection.tsx` — better iframe titles/labels
- `src/components/Footer.tsx` — add `aria-label`
- `src/pages/Index.tsx` — add `<noscript>` fallback content with key text for crawlers that don't run JS

### JSON-LD Structured Data (added to index.html):
```json
{
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "Human Endurance Podcast",
  "description": "Endurance sports podcast with Bruna and Fabi...",
  "url": "https://YOUR-DOMAIN.com",
  "webFeed": "https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb",
  "author": [
    { "@type": "Person", "name": "Bruna" },
    { "@type": "Person", "name": "Fabi" }
  ]
}
```

### Noscript Fallback (added to Index.tsx):
A hidden `<noscript>` block containing the key textual content (podcast name, description, host bios, series descriptions) so non-JS crawlers can index the content.

---

## What This Won't Do

- This won't guarantee #1 rankings — that requires backlinks, content marketing, and time
- Domain authority builds over months, not days
- You should also submit your sitemap to Google Search Console once the domain is live

## Recommended Next Steps (After Implementation)

1. Connect your custom domain in Lovable Settings > Domains
2. Submit sitemap to Google Search Console
3. Verify your podcast on Google Podcasts Manager

