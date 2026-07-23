import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SITE = "https://humanendurancepodcast.com";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List published blog posts on humanendurancepodcast.com (title, URL, publish date). Sourced from the live sitemap.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async () => {
    try {
      const res = await fetch(`${SITE}/sitemap.xml`, {
        headers: { Accept: "application/xml,text/xml" },
      });
      if (!res.ok) {
        return {
          content: [
            { type: "text", text: `Failed to fetch sitemap: HTTP ${res.status}` },
          ],
          isError: true,
        };
      }
      const xml = await res.text();
      const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
      const posts = urlBlocks
        .map((block) => {
          const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
          const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
          return { url: loc, lastmod };
        })
        .filter((entry) => /\/blog\/[^/]+$/.test(entry.url))
        .map((entry) => {
          const slug = entry.url.split("/blog/")[1] ?? "";
          const title = slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          return { slug, title, url: entry.url, lastmod: entry.lastmod };
        });
      return {
        content: [
          { type: "text", text: JSON.stringify({ count: posts.length, posts }, null, 2) },
        ],
        structuredContent: { count: posts.length, posts },
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Error: ${(err as Error).message}` }],
        isError: true,
      };
    }
  },
});
