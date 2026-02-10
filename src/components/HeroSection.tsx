import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import behindTheScenes from "@/assets/behind-the-scenes.jpg";

const HeroSection = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={behindTheScenes}
        alt="Bruna and Fabi recording the Human Endurance podcast"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/90" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.3em] text-sm font-medium mb-6 text-primary"
        >
          Podcast
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl leading-none mb-6"
        >
          Human
          <br />
          <span className="text-primary">Endurance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Redefining human boundaries through endurance sports.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full gap-3 border-0 text-white hover:opacity-90 shadow-[0_0_20px_rgba(245,56,97,0.4)]"
            style={{ background: "linear-gradient(135deg, #f53861 0%, #d42f6b 40%, #8a2387 70%, #0060a6 100%)" }}
            asChild
          >
            <a href="https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb?si=48af90b3b0cc4b2f" target="_blank" rel="noopener noreferrer">
              <Play className="h-5 w-5" />
              Listen Now
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 rounded-full border-foreground/40 text-foreground hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
            asChild
          >
            <a href="#series">Explore the Series</a>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </header>
  );
};

export default HeroSection;
