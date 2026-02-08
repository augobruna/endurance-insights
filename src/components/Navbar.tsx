import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          Human <span className="text-primary">Endurance</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Séries", "Hosts", "Ouvir"].map((item) => (
            <a
              key={item}
              href={`#${item === "Séries" ? "series" : item === "Hosts" ? "hosts" : "listen"}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
