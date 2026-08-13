#!/usr/bin/env node
/**
 * Writes the two files that describe the site to machines:
 *   public/feed.xml  - Atom feed of blog posts
 *   public/llms.txt  - the whole site as a plain-text index, for AI crawlers
 *
 * Both are generated from the same sources as the sitemap, so they can't drift.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const blogDir = join(root, "src/content/blog");
const SITE = "https://humanendurancepodcast.com";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const posts = readdirSync(blogDir)
  .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
  .map((f) => matter(readFileSync(join(blogDir, f), "utf8")).data)
  .filter((d) => d.slug)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const episodesFile = join(root, "src/content/episodes.json");
const episodes = existsSync(episodesFile)
  ? JSON.parse(readFileSync(episodesFile, "utf8"))
  : [];

// ------------------------------------------------------------------ feed.xml

const updated = posts[0]
  ? new Date(posts[0].date).toISOString()
  : new Date(0).toISOString();

const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Human Endurance Podcast — Blog</title>
  <subtitle>Endurance training insights, race reports, and interviews.</subtitle>
  <link href="${SITE}/feed.xml" rel="self"/>
  <link href="${SITE}/blog"/>
  <id>${SITE}/blog</id>
  <updated>${updated}</updated>
${posts
  .map(
    (p) => `  <entry>
    <title>${esc(p.title)}</title>
    <link href="${SITE}/blog/${p.slug}"/>
    <id>${SITE}/blog/${p.slug}</id>
    <updated>${new Date(p.date).toISOString()}</updated>
    <summary>${esc(p.description)}</summary>
    <author><name>${esc(p.author)}</name></author>
  </entry>`
  )
  .join("\n")}
</feed>
`;

writeFileSync(join(root, "public/feed.xml"), atom);

// ------------------------------------------------------------------ llms.txt

const llms = `# Human Endurance Podcast

> Endurance sports podcast hosted by Bruna and Fabi, exploring the science and stories behind human performance in running, triathlon, and ultra-endurance sports.

The Human Endurance Podcast features two series: an Expert Series with specialists in sports science, nutrition, physiology, and coaching, and a Guest Series sharing real stories from everyday athletes balancing full-time lives with extraordinary endurance pursuits like ultras and Ironmans. Hosted by Bruna (runner, coach, NCAA track athlete, co-founder of Augo Training) and Fabi (triathlete, coach, Ironman finisher, co-founder of Augo Training).

## Pages

- [Home](/): Podcast overview, hosts, series, featured episodes, and where to listen.
- [Episodes](/podcast): All ${episodes.length} episodes with show notes and guests.
- [Blog](/blog): Long-form articles on endurance training, race reports, and interviews.

## Blog posts

${posts
  .map((p) => `- [${p.title}](/blog/${p.slug}): ${p.description}`)
  .join("\n")}

## Episodes

${episodes
  .map(
    (e) =>
      `- [${e.topic}](/podcast/${e.slug})${e.guest ? ` — with ${e.guest}` : ""} (${e.date})`
  )
  .join("\n")}

## Listen

- [Spotify](https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb): Full episode catalog on Spotify.
- [Apple Podcasts](https://podcasts.apple.com/us/podcast/human-endurance/id1729061731): Full episode catalog on Apple Podcasts.
- [YouTube](https://www.youtube.com/@HumanEndurance): Video episodes on YouTube.
- [RSS](https://anchor.fm/s/fd7296f8/podcast/rss): Podcast feed.
- [Blog feed](/feed.xml): Atom feed of blog posts.

## Optional

- [Substack](https://justbrunathings.substack.com/): Email subscription mirror of selected blog posts.
- [Augo Training](https://www.augotraining.com): Coaching company co-founded by the hosts.
`;

writeFileSync(join(root, "public/llms.txt"), llms);

console.log(
  `Wrote public/feed.xml (${posts.length} entries) and public/llms.txt ` +
    `(${posts.length} posts, ${episodes.length} episodes)`
);
