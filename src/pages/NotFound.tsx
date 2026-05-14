import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found — Human Endurance Podcast";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    const setMeta = (selector: string, attr: string, name: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const desc = "The page you're looking for doesn't exist. Head back to the Human Endurance Podcast homepage.";
    setMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");
    setMeta('meta[name="description"]', "name", "description", desc);
    setMeta('meta[property="og:title"]', "property", "og:title", "Page Not Found — Human Endurance Podcast");
    setMeta('meta[property="og:description"]', "property", "og:description", desc);

    return () => {
      const robots = document.head.querySelector('meta[name="robots"]');
      if (robots) robots.setAttribute("content", "index, follow");
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
