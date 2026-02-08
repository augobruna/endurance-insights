const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Human Endurance Podcast. Todos os direitos reservados.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/humanendurancepodcast/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://humanendurancepodcast.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Website
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
