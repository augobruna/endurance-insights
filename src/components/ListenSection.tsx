import { motion } from "framer-motion";
import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb?si=48af90b3b0cc4b2f",
  },
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/human-endurance/id1729061731",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@HumanEndurance",
  },
];

const ListenSection = () => {
  return (
    <section id="listen" className="py-28 px-6" aria-label="Where to listen">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="h-16 w-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
            <Headphones className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-5xl md:text-6xl mb-4">
            Where to Listen
          </h2>
          <p className="text-muted-foreground font-light mb-10 max-w-md mx-auto">
            Pick your favorite platform and follow all episodes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {platforms.map((p) => (
            <Button
              key={p.name}
              variant="outline"
              size="lg"
              className="text-base font-medium px-8 py-6 rounded-full border-foreground/20 text-foreground hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
              asChild
            >
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>
            </Button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ListenSection;
