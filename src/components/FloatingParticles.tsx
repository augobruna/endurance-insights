import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
}

const colors = [
  "hsl(348, 91%, 59%)",   // brand pink
  "hsl(207, 100%, 33%)",  // brand blue
  "hsl(37, 100%, 50%)",   // brand orange
  "hsl(24, 76%, 91%)",    // brand cream
];

const FloatingParticles = () => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * -30,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            filter: `blur(${p.size > 6 ? 2 : 1}px)`,
          }}
          animate={{
            y: [0, -80, 20, -40, 0],
            x: [0, 30, -20, 40, 0],
            opacity: [0.25, 0.6, 0.3, 0.5, 0.25],
            scale: [1, 1.3, 0.9, 1.15, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Soft gradient orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          left: "10%",
          top: "20%",
          background: "radial-gradient(circle, hsl(348, 91%, 59%) 0%, transparent 70%)",
          opacity: 0.06,
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 350,
          height: 350,
          right: "15%",
          top: "60%",
          background: "radial-gradient(circle, hsl(207, 100%, 33%) 0%, transparent 70%)",
          opacity: 0.05,
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: -10 }}
      />
    </div>
  );
};

export default FloatingParticles;
