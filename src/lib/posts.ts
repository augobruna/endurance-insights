import type { ComponentType } from "react";

export type PostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  cover?: string;
  coverAlt?: string;
  tags?: string[];
  canonical?: string;
  substackUrl?: string;
  /** Slug of the episode this post accompanies, for cross-linking both ways. */
  episodeSlug?: string;
};

export type Post = {
  frontmatter: PostFrontmatter;
  Component: ComponentType;
};

type MDXModule = {
  default: ComponentType;
  frontmatter: PostFrontmatter;
};

const modules = import.meta.glob<MDXModule>("/src/content/blog/*.mdx", {
  eager: true,
});

const allPosts: Post[] = Object.entries(modules)
  // `_`-prefixed files are scaffolding, not posts. The sitemap and prerender
  // scripts skip them the same way.
  .filter(([path]) => !path.split("/").pop()!.startsWith("_"))
  .map(([, mod]) => ({
    frontmatter: mod.frontmatter,
    Component: mod.default,
  }))
  .filter((p) => p.frontmatter && p.frontmatter.slug)
  .sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

export const posts = allPosts;

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.frontmatter.slug === slug);
}

/**
 * Reverse of the `episodeSlug` frontmatter field, so an episode can find its
 * companion article without a second mapping to keep in sync.
 */
export function getPostByEpisodeSlug(episodeSlug: string): Post | undefined {
  return allPosts.find((p) => p.frontmatter.episodeSlug === episodeSlug);
}

export function getAdjacentPosts(slug: string): {
  prev?: Post;
  next?: Post;
} {
  const idx = allPosts.findIndex((p) => p.frontmatter.slug === slug);
  if (idx === -1) return {};
  return {
    next: idx > 0 ? allPosts[idx - 1] : undefined,
    prev: idx < allPosts.length - 1 ? allPosts[idx + 1] : undefined,
  };
}

export const SITE_URL = "https://humanendurancepodcast.com";
