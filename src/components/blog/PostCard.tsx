import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PostFrontmatter } from "@/lib/posts";
import PostMeta from "./PostMeta";

const PostCard = ({
  post,
  index,
}: {
  post: PostFrontmatter;
  index: number;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className="group"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="grid md:grid-cols-[280px_1fr] gap-6 md:gap-8 rounded-2xl border border-border bg-card p-4 md:p-6 hover:border-primary/50 transition-all duration-300"
      >
        {post.cover ? (
          <div className="aspect-[4/3] md:aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] md:aspect-square rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        )}

        <div className="flex flex-col gap-3 justify-center">
          <PostMeta post={post} />
          <h2 className="text-2xl md:text-3xl leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed">
            {post.description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-1">
            Read article
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
