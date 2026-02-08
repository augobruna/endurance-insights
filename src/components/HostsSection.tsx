import { motion } from "framer-motion";
import hostFabi from "@/assets/host-fabi.jpg";
import hostBruna from "@/assets/host-bruna.jpg";

const hosts = [
  {
    name: "Bruna",
    roleJsx: true,
    roleText: "Runner · Coach · Co-founder of",
    bio: "Bruna competed in cross-country and track at the collegiate level in the U.S. With over a decade of running experience, she has completed 8 marathons, 1 ultra-marathon, 2 70.3 Ironmans, and numerous half-marathons and 5Ks. Her personal best is 3h14 in the marathon and 18:57 in the 5K.\n\nWith 3 years of coaching experience, Bruna has helped 50+ athletes to achieve their goals and cross the finish line in races ranging from 5Ks to ultra-marathons.",
    image: hostBruna,
  },
  {
    name: "Fabi",
    roleJsx: true,
    roleText: "Triathlete · Coach · Co-founder of",
    bio: "Fabienne discovered triathlon in her late 20s, and within 3 years, she went from not being able to swim 25 meters to completing a half-distance triathlon in 4 hours and 50 minutes, and her first full-distance triathlon in under 12 hours.\n\nShe has been coaching for a year, helping beginners get started in the sport and successfully complete sprint and half-distance triathlon races.",
    image: hostFabi,
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
          <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4 gradient-text">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostsSection;
