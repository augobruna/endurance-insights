import type { PostFrontmatter } from "@/lib/posts";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const PostMeta = ({ post }: { post: PostFrontmatter }) => {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>•</span>
      <span>{post.author}</span>
      {post.tags && post.tags.length > 0 && (
        <>
          <span aria-hidden>•</span>
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="text-xs uppercase tracking-widest text-primary"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PostMeta;
