import { motion } from "framer-motion";
import hostBruna from "@/assets/host-bruna.jpg";
import hostFabi from "@/assets/host-fabi.jpg";

const hosts = [
  {
    name: "Bruna",
    role: "Co-fundadora da augo · Coach na Jornada Endurance",
    image: hostBruna,
    bio: "Apaixonada por endurance e ciência do esporte, Bruna traz sua experiência como coach e empreendedora para explorar os limites da performance humana.",
  },
  {
    name: "Fabi",
    role: "Co-fundadora da augo · Coach na Jornada Endurance",
    image: hostFabi,
    bio: "Com uma abordagem prática e empática, Fabi conecta ciência e experiência real para ajudar atletas a encontrarem seu potencial máximo.",
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
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Apresentadoras
          </p>
          <h2 className="text-5xl md:text-6xl">
            Conheça as Hosts
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
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-primary/20">
                <img
                  src={host.image}
                  alt={`${host.name} - Host do Human Endurance Podcast`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
