#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const blogDir = join(root, "src/content/blog");
const outFile = join(root, "public/sitemap.xml");
const SITE = "https://humanendurancepodcast.com";

const today = new Date().toISOString().slice(0, 10);

const posts = readdirSync(blogDir)
  .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
  .map((f) => {
    const raw = readFileSync(join(blogDir, f), "utf8");
    const { data } = matter(raw);
    return data;
  })
  .filter((d) => d.slug)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const urls = [
  { loc: `${SITE}/`, lastmod: today, changefreq: "weekly", priority: "1.0" },
  {
    loc: `${SITE}/blog`,
    lastmod: posts[0]?.date ?? today,
    changefreq: "weekly",
    priority: "0.9",
  },
  ...posts.map((p) => ({
    loc: `${SITE}/blog/${p.slug}`,
    lastmod: p.date,
    changefreq: "monthly",
    priority: "0.8",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(outFile, xml);
console.log(`Wrote ${urls.length} URLs to ${outFile}`);
