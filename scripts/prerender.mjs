#!/usr/bin/env node
/**
 * Static prerender pass.
 *
 * Reads the built client `dist/index.html` template, renders each app route
 * through the SSR bundle at `dist-server/entry-server.js`, injects the
 * per-route Helmet head and React HTML into the template, and writes one
 * fully-formed HTML file per route.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const serverDir = join(root, "dist-server");
const blogDir = join(root, "src/content/blog");

const template = readFileSync(join(distDir, "index.html"), "utf8");

const { render } = await import(
  pathToFileURL(join(serverDir, "entry-server.js")).href
);

const slugs = readdirSync(blogDir)
  .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
  .map((f) => matter(readFileSync(join(blogDir, f), "utf8")).data.slug)
  .filter(Boolean);

// Route -> output file (relative to dist/)
const routes = [
  { url: "/", out: "index.html" },
  { url: "/blog", out: "blog/index.html" },
  ...slugs.map((slug) => ({
    url: `/blog/${slug}`,
    out: `blog/${slug}/index.html`,
  })),
  { url: "/404", out: "404.html" },
];

function inject(tpl, { head, html }) {
  return tpl
    .replace("<!--ssr-head-->", head)
    .replace("<!--ssr-outlet-->", html);
}

for (const route of routes) {
  const { html, head } = render(route.url);
  const page = inject(template, { html, head });
  const outPath = join(distDir, route.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);
  console.log(`prerendered ${route.url} -> dist/${route.out}`);
}

// The SSR bundle is only needed at build time.
rmSync(serverDir, { recursive: true, force: true });

console.log(`prerendered ${routes.length} routes`);
