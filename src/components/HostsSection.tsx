import { motion } from "framer-motion";
import { User } from "lucide-react";
import hostFabi from "@/assets/host-fabi.jpg";

const hosts = [
  {
    name: "Bruna",
    role: "Co-founder of augo · Coach at Jornada Endurance",
    bio: "Passionate about endurance and sports science, Bruna brings her experience as a coach and entrepreneur to explore the limits of human performance.",
    image: null,
  },
  {
    name: "Fabi",
    role: null,
    roleJsx: true,
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
                  {host.image ? (
                    <img src={host.image} alt={host.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-20 w-20 text-muted-foreground" />
                  )}
                </div>
              </div>
              <h3 className="text-3xl mb-1">{host.name}</h3>
              {host.roleJsx ? (
                <p className="text-primary text-sm mb-4">
                  Triathlete · Coach · Co-founder of{" "}
                  <a href="https://www.augotraining.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">augo</a>
                </p>
              ) : (
                <p className="text-primary text-sm mb-4">{host.role}</p>
              )}
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
