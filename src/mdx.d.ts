declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const frontmatter: {
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
  };
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
