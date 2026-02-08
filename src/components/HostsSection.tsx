import { motion } from "framer-motion";
import hostFabi from "@/assets/host-fabi.jpg";
import hostBruna from "@/assets/host-bruna.jpg";

const hosts = [
  {
    name: "Bruna",
    roleJsx: true,
    roleText: "Runner · Coach · Co-founder of",
    bio: "Bruna has been an athlete her whole life. She played tennis competitively throughout her childhood and teenage years, which earned her a spot at Emory University in Atlanta. There, she made a bold switch — going from NCAA tennis to running track and cross-country — and fell in love with running ever since.\n\nWith over 10 years of marathon experience and coaching runners since 2021, the marathon remains her favorite distance. Her passion for endurance sports runs so deep that she left her corporate job to co-found augo, setting a new standard for endurance sports coaching.",
    image: hostBruna,
  },
  {
    name: "Fabi",
    roleJsx: true,
    roleText: "Triathlete · Coach · Co-founder of",
    bio: "Fabienne discovered triathlon in her late 20s, and within 3 years, she went from not being able to swim 25 meters to completing a half-distance triathlon and her first full-distance triathlon.\n\nShe has been coaching triathlete beginners since 2023, helping them get started in the sport and successfully cross the finish line. Together with Bruna, she decided to start augo to work in an industry she truly loves.",
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
