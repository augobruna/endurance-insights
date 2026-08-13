import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { episodes, formatDuration } from "@/lib/episodes";

/**
 * Hand-picked, in display order. Edit this list to change what the homepage
 * leads with; anything that no longer matches an episode slug is skipped.
 */
const FEATURED = [
  "how-to-coach-beyond-data-bevan-mckinnon",
  "breaking-the-swiss-100km-record-3-47-km-pace-pascal-rueger",
  "marginal-gains-for-competitive-age-groupers-mikael-eriksson",
  "beyond-the-hrv-hype-how-can-hrv-actually-be-marco-altini",
  "mental-training-secrets-from-an-olympic-stu-holliday",
  "from-devastating-back-injury-at-17-to-going-nina-derron",
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short" });

const FeaturedEpisodesSection = () => {
  const featured = FEATURED.map((slug) =>
    episodes.find((e) => e.slug === slug)
  ).filter((e): e is (typeof episodes)[number] => Boolean(e));

  if (featured.length === 0) return null;

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
            Six conversations worth starting with.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((ep, i) => {
            const duration = formatDuration(ep.durationSeconds);
            return (
              <motion.article
                key={ep.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group"
              >
                <Link
                  to={`/podcast/${ep.slug}`}
                  className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-colors duration-300"
                >
                  {ep.image && (
                    <img
                      src={ep.image}
                      alt={`Artwork for the episode ${ep.topic}`}
                      loading="lazy"
                      width={400}
                      height={400}
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                  )}
                  <div className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <time dateTime={ep.date}>{formatDate(ep.date)}</time>
                    {duration && (
                      <>
                        <span aria-hidden>•</span>
                        <span>{duration}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl leading-tight group-hover:text-primary transition-colors">
                    {ep.topic}
                  </h3>
                  {ep.guest && (
                    <p className="text-sm text-primary -mt-2">with {ep.guest}</p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Episode details
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/podcast"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-sm font-medium"
          >
            All {episodes.length} episodes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEpisodesSection;
