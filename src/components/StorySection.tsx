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
          <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4 text-primary">
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
            When Bruna & Fabi launched the show in early 2024, the married couple had a simple goal: talk about what they loved, meet fascinating people, and fill a gap they saw in the endurance world.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-light leading-relaxed text-lg text-center"
          >
            Most endurance content celebrates elites. But what about the full-time lawyer training for her first 100-miler? The parent balancing early morning runs with school drop-offs while chasing a Boston qualifier? These are the stories that fascinated Bruna and Fabi — athletes proving that incredible feats don't require sponsorships or endless free time, just determination, smart training, and consistency.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-light leading-relaxed text-lg text-center"
          >
            What started as conversations with inspiring everyday athletes has evolved into two series. The Guest Series continues to spotlight remarkable athletes and their stories, while the Expert Series brings in specialists from sports science, nutrition, and coaching to go deeper into the "how" — practical knowledge to help you actually improve.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground font-light leading-relaxed text-lg text-center"
          >
            At the heart of it all: lowering the barrier to entry. Fabi herself once believed you had to be a lifelong athlete to do endurance sports. The podcast exists to prove that wrong — to show that with the right approach, what looks impossible from the outside is absolutely within reach.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
