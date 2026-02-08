import { motion } from "framer-motion";
import { Mic2, Users } from "lucide-react";

const series = [
  {
    icon: Mic2,
    title: "Expert Series",
    description:
      "In-depth interviews with specialists in sports science, nutrition, physiology, and training. Technical content made accessible for anyone pursuing performance and health.",
    tag: "Knowledge",
  },
  {
    icon: Users,
    title: "Guest Series",
    description:
      "Real stories from amateur and professional athletes who live endurance every day. Inspiration, challenges, and the journey of those who decided to test their own limits.",
    tag: "Inspiration",
  },
];

const SeriesSection = () => {
  return (
    <section id="series" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4 text-primary">
            Two Series
          </p>
          <h2 className="text-5xl md:text-6xl">
            Science & Stories
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-light">
            Two complementary perspectives on the world of endurance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {series.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative rounded-2xl bg-card border border-border p-10 hover:border-primary/40 transition-colors duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center">
                    <s.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-3xl mb-4">{s.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeriesSection;
