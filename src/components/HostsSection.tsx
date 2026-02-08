import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import hostFabi from "@/assets/host-fabi.jpg";
import hostBruna from "@/assets/host-bruna.jpg";

const hosts = [
  {
    name: "Bruna",
    roleText: "Runner · Coach · Co-founder of",
    bio: "I've been an athlete my whole life — tennis through my teens, then NCAA track and cross country at Emory, where I fell in love with running. For me, running is where I find peace, where I recharge. There's no feeling better than a really great marathon. I started coaching in 2021 because I wanted to share what running has given me: structure, determination, mental clarity, and a sense of what's possible.\n\nI also bring a personal perspective to conversations about injuries and overtraining. After struggling with injuries for three years, I was diagnosed with RED-S (Relative Energy Deficiency in Sport). It completely changed how I approach training and coaching, and it's something I'm passionate about discussing openly because too many athletes are dealing with this without knowing it.",
    image: hostBruna,
    instagram: "https://www.instagram.com/justbrunathings/",
    instagramHandle: "@justbrunathings",
  },
  {
    name: "Fabi",
    roleText: "Triathlete · Coach · Co-founder of",
    bio: "I discovered triathlon in my late 20s, convinced it wasn't for me. I believed you had to be a lifelong athlete to do endurance sports — that if you didn't grow up swimming and biking, you'd missed your window. Within three years, I went from barely swimming 25 meters to completing my first full Ironman. That race was the moment I realized: I actually am an endurance athlete.\n\nNow I coach beginner triathletes, helping them get started and cross their first finish lines. What I love most is feeling the progress — seeing tangible proof that consistency pays off. On the podcast, I explore the mindset side: how we push through doubt, trust the process, and redefine what we thought was possible.",
    image: hostFabi,
    instagram: "https://www.instagram.com/endurance_fabi/",
    instagramHandle: "@endurance_fabi",
  },
];

const HostsSection = () => {
  return (
    <section id="hosts" className="py-28 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4 text-primary">
            Hosts
          </p>
          <h2 className="text-5xl md:text-6xl">
            Meet the Hosts
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {hosts.map((host, i) => (
            <motion.div
              key={host.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden p-[2px] gradient-bg">
                <div className="w-full h-full rounded-full overflow-hidden bg-card flex items-center justify-center">
                  <img src={host.image} alt={host.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <h3 className="text-3xl mb-1">{host.name}</h3>
              <p className="text-primary text-sm mb-4">
                {host.roleText}{" "}
                <a href="https://www.augotraining.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">augo</a>
              </p>
              <p className="text-muted-foreground font-light leading-relaxed whitespace-pre-line">
                {host.bio}
              </p>
              <a
                href={host.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
                {host.instagramHandle}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostsSection;
