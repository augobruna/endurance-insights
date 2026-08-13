import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SITE = "https://humanendurancepodcast.com";

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description:
    "Fetch a single blog post from humanendurancepodcast.com/blog/<slug>. Returns title, description, and readable text.",
  inputSchema: {
    slug: z
      .string()
      .min(1)
      .describe("The blog post slug, e.g. 'pascal-rueger-100km-swiss-record'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ slug }) => {
    const safe = slug.replace(/[^a-z0-9-]/gi, "");
    const url = `${SITE}/blog/${safe}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        return {
          content: [{ type: "text", text: `HTTP ${res.status} for ${url}` }],
          isError: true,
        };
      }
      const html = await res.text();
      const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? "";
      const description =
        html
          .match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i)?.[1]
          ?.trim() ?? "";
      const main = html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? html;
      const text = stripHtml(main).slice(0, 8000);
      const post = { slug: safe, url, title, description, text };
      return {
        content: [{ type: "text", text: JSON.stringify(post, null, 2) }],
        structuredContent: post,
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Error: ${(err as Error).message}` }],
        isError: true,
      };
    }
  },
});
