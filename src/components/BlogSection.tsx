import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";

const articles = [
  {
    title: "Learnings from Coaching Elite Triathletes — with Reto Braendli",
    description:
      "Swiss coach Reto Braendli reveals what it takes at the highest level: understanding the person behind the athlete, building foundations over years, and why current fueling trends might be missing the point.",
    url: "https://justbrunathings.substack.com/p/human-endurance-podcast-learnings",
  },
  {
    title: "From Medical Student to IRONMAN 70.3 World Champion — Samuel Studer",
    description:
      "How Samuel Studer balanced 20+ hours of weekly training with medical school, survived a chaotic race day in Marbella, and proved that priorities — not time — determine what's possible.",
    url: "https://justbrunathings.substack.com/p/human-endurance-podcast-from-medical",
  },
  {
    title: "Lessons from 31 Ironmans and 25 Years of Coaching — Coach Joserra",
    description:
      "Coach Joserra's philosophy isn't about training zones — it's about presence, health over performance, and genuine communication. A masterclass in longevity for endurance athletes.",
    url: "https://justbrunathings.substack.com/p/human-endurance-podcat-lessons-from",
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
