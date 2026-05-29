import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

type NavItem = { label: string; href: string; internal?: boolean };

const items: NavItem[] = [
  { label: "Series", href: "/#series" },
  { label: "Hosts", href: "/#hosts" },
  { label: "Blog", href: "/blog", internal: true },
  { label: "Listen", href: "/#listen" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLink = (item: NavItem) => {
    const cls =
      "text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest";

    if (item.internal) {
      return (
        <Link key={item.label} to={item.href} className={cls}>
          {item.label}
        </Link>
      );
    }

    // Hash links — if on home, use anchor; otherwise route home first
    const isHome = location.pathname === "/";
    if (isHome) {
      return (
        <a key={item.label} href={item.href.replace("/", "")} className={cls}>
          {item.label}
        </a>
      );
    }
    return (
      <Link key={item.label} to={item.href} className={cls}>
        {item.label}
      </Link>
    );
  };

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-3",
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Human Endurance Podcast logo" className="h-10 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {items.map(renderLink)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
