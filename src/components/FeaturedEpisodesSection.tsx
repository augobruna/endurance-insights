import { motion } from "framer-motion";

const episodes = [
  { episodeId: "4mcOg8WWjLRHgBvBh5Bydw", title: "Featured Episode 1" },
  { episodeId: "065AbRqiNiBQdM1NdrQ1Lu", title: "Featured Episode 2" },
  { episodeId: "05JE2TWyNExFYDiFl5Ytno", title: "Featured Episode 3" },
  { episodeId: "676zVWIygiGTxEi5p6ThDT", title: "Featured Episode 4" },
  { episodeId: "2O1S5tjfN8MmNp7BmzlQgS", title: "Featured Episode 5" },
  { episodeId: "6x70jiH6339mrQByB7mDtF", title: "Featured Episode 6" },
];

const FeaturedEpisodesSection = () => {
  return (
    <section id="episodes" className="py-28 px-6" aria-label="Featured episodes">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4 text-primary">
            Listen
          </p>
          <h2 className="text-5xl md:text-6xl">Featured Episodes</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-light">
            Dive into some of our favorite conversations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {episodes.map((ep, i) => (
            <motion.div
              key={ep.episodeId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.15 }}
            >
              <iframe
                src={`https://open.spotify.com/embed/episode/${ep.episodeId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
                title={`Human Endurance Podcast — ${ep.title}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEpisodesSection;
