import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer aria-label="Site footer" className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Human Endurance Podcast. All rights reserved.
        </p>
        <div className="flex gap-6 flex-wrap justify-center">
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
          <a href="https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb?si=48af90b3b0cc4b2f" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Spotify</a>
          <a href="https://podcasts.apple.com/us/podcast/human-endurance/id1729061731" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Apple Podcasts</a>
          <a href="https://www.youtube.com/@HumanEndurance" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
