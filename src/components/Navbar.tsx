import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-3",
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="Human Endurance Podcast logo" className="h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Series", "Hosts", "Listen"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
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
