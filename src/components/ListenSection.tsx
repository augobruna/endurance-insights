import { motion } from "framer-motion";
import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/4wMFo25lNcsgjqfMon1oBS",
  },
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/human-endurance-podcast/id1744327876",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@humanendurancepodcast",
  },
];

const ListenSection = () => {
  return (
    <section id="listen" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Headphones className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl mb-4">
            Onde Ouvir
          </h2>
          <p className="text-muted-foreground font-light mb-10 max-w-md mx-auto">
            Escolha sua plataforma favorita e acompanhe todos os episódios.
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
              className="text-base px-8 py-6 rounded-full border-muted-foreground/30 hover:border-primary hover:text-primary transition-all duration-300"
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
