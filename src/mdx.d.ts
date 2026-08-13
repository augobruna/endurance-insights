declare module "*.mdx" {
  import type { ComponentType } from "react";
  // Inline import so this stays an ambient declaration, and so the frontmatter
  // shape has one definition rather than two copies drifting apart.
  export const frontmatter: import("@/lib/posts").PostFrontmatter;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
