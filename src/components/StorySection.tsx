import { motion } from "framer-motion";

const StorySection = () => {
  return (
    <section id="story" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4 gradient-text">
            Our Story
          </p>
          <h2 className="text-5xl md:text-6xl">
            How It Started
          </h2>
        </motion.div>

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground font-light leading-relaxed text-lg text-center"
          >
            Bruna and Fabi are a married couple united by their love for endurance sports — Bruna as a runner, Fabi as a triathlete. In early 2024, they launched the Human Endurance Podcast driven by a simple idea: meet more people in the space and share the incredible stories of everyday athletes, not just professionals.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-light leading-relaxed text-lg text-center"
          >
            What started as conversations with inspiring guests has grown into two dedicated series. The <span className="text-foreground font-medium">Guest Series</span> continues to spotlight athletes with remarkable stories, while the <span className="text-foreground font-medium">Expert Series</span> brings in specialists from fields like sports science, nutrition, and coaching to go deeper into the "how" behind endurance performance.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-light leading-relaxed text-lg text-center"
          >
            Their mission remains at the heart of everything they do: <span className="gradient-text font-medium">share knowledge with the endurance community</span> and make the sport more accessible to everyone.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
