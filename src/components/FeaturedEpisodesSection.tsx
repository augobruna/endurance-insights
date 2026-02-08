import { motion } from "framer-motion";

const episodes = [
  {
    title: "Training Smarter, Not Harder",
    episodeId: "4Xz5KOjjWGmXvDHMRKbknE",
    description: "Expert insights on optimizing your training load.",
  },
  {
    title: "From Couch to Ironman",
    episodeId: "1qxmUVoA2OjJ6AiRsoZKMR",
    description: "A real story of transformation and grit.",
  },
  {
    title: "Fueling for Endurance",
    episodeId: "4nP1JFTVaBnOXMaOVBMOgz",
    description: "What to eat before, during, and after long efforts.",
  },
];

const FeaturedEpisodesSection = () => {
  return (
    <section id="episodes" className="py-28 px-6">
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
              transition={{ delay: i * 0.15 }}
              className="flex flex-col gap-4"
            >
              <iframe
                src={`https://open.spotify.com/embed/episode/${ep.episodeId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
                title={ep.title}
              />
              <p className="text-sm text-muted-foreground font-light text-center">
                {ep.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEpisodesSection;
