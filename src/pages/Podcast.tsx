import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import EpisodeCard from "@/components/podcast/EpisodeCard";
import { episodes } from "@/lib/episodes";
import { SITE_URL } from "@/lib/posts";

const Podcast = () => {
  // Seeded from ?q= so the SearchAction advertised in the homepage schema
  // actually works when a search engine sends someone here.
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const setQuery = (value: string) => {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return episodes;
    return episodes.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.guest.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
  }, [query]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "Human Endurance Podcast",
    url: `${SITE_URL}/podcast`,
    description:
      "Every episode of the Human Endurance Podcast — conversations with coaches, sports scientists, and athletes on endurance training, racing, and performance.",
    webFeed: "https://anchor.fm/s/fd7296f8/podcast/rss",
    image: `${SITE_URL}/og-image.png`,
    hasPart: episodes.map((e) => ({
      "@type": "PodcastEpisode",
      name: e.title,
      url: `${SITE_URL}/podcast/${e.slug}`,
      datePublished: e.date,
    })),
  };

  return (
    <>
      <SEO
        title="All Episodes | Human Endurance Podcast"
        description="Every episode of the Human Endurance Podcast — conversations with coaches, sports scientists, and endurance athletes on training, racing, and performance."
        canonical={`${SITE_URL}/podcast`}
        jsonLd={jsonLd}
      />

      <main className="relative min-h-screen">
        <Navbar />

        <section className="pt-32 pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4 text-primary">
              The Podcast
            </p>
            <h1 className="text-5xl md:text-7xl mb-6">All Episodes</h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              {episodes.length} conversations with coaches, sports scientists,
              and athletes on what actually makes endurance performance work —
              hosted by Bruna and Fabi.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8">
          <div className="max-w-3xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search episodes or guests…"
              aria-label="Search episodes"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </section>

        <section className="px-6 pb-24" aria-label="Episodes">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">
                No episodes match “{query}”.
              </p>
            ) : (
              filtered.map((e, i) => (
                <EpisodeCard key={e.slug} episode={e} index={i} />
              ))
            )}
          </div>
        </section>

        <Footer />

        <noscript>
          <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Human Endurance Podcast — All Episodes</h1>
            <ul>
              {episodes.map((e) => (
                <li key={e.slug}>
                  <a href={`/podcast/${e.slug}`}>{e.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </noscript>
      </main>
    </>
  );
};

export default Podcast;
