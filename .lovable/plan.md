

## Fix Google Indexing: Remove noindex Exclusion

### The Problem

Google Search Console shows 2 pages "Excluded by 'noindex' tag." Your HTML already has `<meta name="robots" content="index, follow" />`, your `robots.txt` allows all crawlers, and your `sitemap.xml` exists -- so your code looks correct.

The most likely cause is that the Lovable hosting platform injects a `noindex` header or meta tag on the `*.lovable.app` subdomain. To fix this, you need to connect your **custom domain** (`humanendurancepodcast.com`) to your Lovable project. Once a custom domain is connected, the noindex restriction is typically removed.

### What We'll Do (Code Side)

Even though your files are mostly correct, we'll tighten everything up:

**1. Verify `index.html` meta tag** -- already has `content="index, follow"` (no changes needed)

**2. Update `public/robots.txt`** -- already correct, but we'll ensure it's clean:
   - Allow all user agents
   - Reference the sitemap at your custom domain

**3. Update `public/sitemap.xml`**
   - Update `<lastmod>` to today's date (`2026-02-13`)
   - Keep the canonical URL pointing to `humanendurancepodcast.com`

**4. Add a `<noscript>` fallback in `index.html`** for crawlers that don't execute JavaScript, containing a basic text summary of the page content -- this helps ensure crawlers can see content even without running React.

### What You Need to Do (Outside Lovable)

After we publish these changes, you should:

1. **Connect your custom domain** (`humanendurancepodcast.com`) to your Lovable project if not already done -- this is the most likely fix for the noindex issue
2. In Google Search Console, go to **URL Inspection** and request re-indexing for your homepage
3. Under **Sitemaps**, re-submit `https://humanendurancepodcast.com/sitemap.xml`
4. Click **Validate Fix** on the "Excluded by noindex tag" issue to start Google's re-crawl

### Files to Edit
- `public/sitemap.xml` -- update lastmod date
- `index.html` -- add noscript fallback for SEO crawlers

