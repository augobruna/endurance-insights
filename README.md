# Human Endurance Podcast — website

The website for the Human Endurance Podcast, served at
[humanendurancepodcast.com](https://humanendurancepodcast.com).

It's a static single-page app (Vite + React + TypeScript, Tailwind, shadcn-ui) with an
MDX-based blog. There is no backend — blog posts are plain `.mdx` files compiled into the
site at build time.

## Local development

Requires Node.js 20+ and npm.

```sh
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:8080)
```

## Building

```sh
npm run build    # regenerates the sitemap, then builds into dist/
npm run preview  # serve the production build locally to sanity-check it
```

`npm run build` first runs `scripts/generate-sitemap.mjs`, which reads the blog posts and
writes `public/sitemap.xml`, then runs `vite build`.

## Writing a blog post

1. Add a new `.mdx` file under `src/content/blog/` (use `src/content/blog/_template.mdx` as a
   starting point — files beginning with `_` are ignored).
2. Fill in the frontmatter (`title`, `slug`, `date`, `description`, etc.).
3. Commit and push to `main` — the post, sitemap entry, and SEO metadata are generated
   automatically on deploy.

## Deployment

The site is hosted on **GitHub Pages** and deploys automatically. Any push to the `main`
branch triggers the workflow in `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages.

So the publish workflow is simply: **edit → commit → push to `main`**. A run takes about a
minute; follow it with `gh run watch`.

### Custom domain

The custom domain is configured **on the repository** (Settings → Pages → Custom domain), not
by the `public/CNAME` file. Because this repo deploys via a GitHub Actions workflow rather
than from a branch, GitHub does not read `CNAME` from the build output to set the domain —
the file ships in `dist/` but has no effect on configuration. Changing the domain means
changing the repo setting.

DNS lives at GoDaddy (`ns57`/`ns58.domaincontrol.com`). The apex should point at GitHub's four
Pages IPs (`185.199.108–111.153`) and `www` should be a `CNAME` to `augobruna.github.io`.
