import { motion } from "framer-motion";
import { User } from "lucide-react";

const hosts = [
  {
    name: "Bruna",
    role: "Co-founder of augo · Coach at Jornada Endurance",
    bio: "Passionate about endurance and sports science, Bruna brings her experience as a coach and entrepreneur to explore the limits of human performance.",
  },
  {
    name: "Fabi",
    role: "Co-founder of augo · Coach at Jornada Endurance",
    bio: "With a practical and empathetic approach, Fabi connects science and real-world experience to help athletes reach their maximum potential.",
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
                  <User className="h-20 w-20 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-3xl mb-1">{host.name}</h3>
              <p className="text-primary text-sm mb-4">{host.role}</p>
              <p className="text-muted-foreground font-light leading-relaxed">
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
