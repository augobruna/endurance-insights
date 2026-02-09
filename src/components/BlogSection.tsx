import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";

const articles = [
  {
    title: "The Science of Pacing: Why Most Endurance Athletes Get It Wrong",
    description:
      "A deep dive into how smart pacing strategies separate finishers from DNFs — and how to dial in yours.",
    url: "https://justbrunathings.substack.com/",
  },
  {
    title: "Fueling for the Long Run: Nutrition Mistakes You're Probably Making",
    description:
      "From carb timing to hydration myths, practical tips backed by sports science to keep you moving stronger, longer.",
    url: "https://justbrunathings.substack.com/",
  },
  {
    title: "Training Through Life: How Everyday Athletes Build Consistency",
    description:
      "Balancing jobs, families, and big goals. Real strategies from real people who make endurance work alongside everything else.",
    url: "https://justbrunathings.substack.com/",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4 text-primary">
            From the Blog
          </p>
          <h2 className="text-5xl md:text-6xl mb-4">Latest Articles</h2>
          <p className="text-muted-foreground font-light max-w-md mx-auto">
            Training insights, race stories, and endurance knowledge — straight from the team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 hover:border-primary/50 transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                {article.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                Read on Substack
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://justbrunathings.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-widest"
          >
            View all articles
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
