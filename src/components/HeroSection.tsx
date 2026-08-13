import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import behindTheScenes from "@/assets/behind-the-scenes.jpg";

const HeroSection = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* LCP element. No preload link is needed — it's in the prerendered HTML,
          so the parser finds it immediately; fetchpriority is what moves it
          ahead of the other requests. */}
      <img
        src={behindTheScenes}
        alt="Bruna and Fabi recording the Human Endurance podcast"
        // React 18 wants the lowercase DOM attribute name here.
        {...{ fetchpriority: "high" }}
        decoding="async"
        width={1179}
        height={852}
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

        {/* One continuous heading: the previous markup put a <br> between the
            words, so the text content read as "HumanEndurance" and carried no
            topic words at all. The line break is now presentational. */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="block text-6xl md:text-8xl lg:text-9xl leading-none">
            Human <span className="text-primary">Endurance</span>
          </span>
          {/* Adjacent block elements concatenate with no whitespace when the
              text is extracted, so the separator is spelled out for readers
              that see text rather than layout. */}
          <span className="sr-only"> — </span>
          <span className="mt-4 block text-base md:text-xl font-light tracking-[0.2em] uppercase text-muted-foreground">
            the endurance sports podcast
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Conversations with coaches, sports scientists and athletes on
          training, racing and what actually makes endurance performance work.
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
            <a href="https://tr.ee/w9Uhc9ddA_" target="_blank" rel="noopener noreferrer">
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
            <Link to="/podcast">Explore Episodes</Link>
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
