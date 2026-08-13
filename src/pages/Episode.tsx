import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import EpisodeMeta from "@/components/podcast/EpisodeMeta";
import { getEpisodeBySlug, getAdjacentEpisodes } from "@/lib/episodes";
import { SITE_URL } from "@/lib/posts";

const LISTEN_LINKS = [
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/human-endurance/id1729061731",
  },
  { label: "YouTube", href: "https://www.youtube.com/@HumanEndurance" },
];

const Episode = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/podcast" replace />;

  const episode = getEpisodeBySlug(slug);
  if (!episode) return <Navigate to="/podcast" replace />;

  const { prev, next } = getAdjacentEpisodes(slug);
  const canonical = `${SITE_URL}/podcast/${episode.slug}`;
  const image = episode.image ?? `${SITE_URL}/og-image.png`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "PodcastEpisode",
      name: episode.title,
      description: episode.description,
      url: canonical,
      datePublished: episode.date,
      image: [image],
      ...(episode.duration ? { timeRequired: episode.duration } : {}),
      ...(episode.season ? { seasonNumber: episode.season } : {}),
      ...(episode.episode ? { episodeNumber: episode.episode } : {}),
      partOfSeries: {
        "@type": "PodcastSeries",
        name: "Human Endurance Podcast",
        url: `${SITE_URL}/podcast`,
      },
      ...(episode.audio
        ? {
            associatedMedia: {
              "@type": "MediaObject",
              contentUrl: episode.audio,
              encodingFormat: "audio/mpeg",
            },
          }
        : {}),
      ...(episode.guest
        ? { actor: { "@type": "Person", name: episode.guest } }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Podcast",
          item: `${SITE_URL}/podcast`,
        },
        { "@type": "ListItem", position: 3, name: episode.topic, item: canonical },
      ],
    },
  ];

  return (
    <>
      <SEO
        title={`${episode.topic}${episode.guest ? ` — ${episode.guest}` : ""} | Human Endurance Podcast`}
        description={episode.description}
        canonical={canonical}
        image={image}
        type="article"
        publishedTime={episode.date}
        author="Bruna Maia & Fabienne Maia"
        jsonLd={jsonLd}
      />

      <main className="relative">
        <Navbar />

        <article className="pt-28 pb-24">
          <header className="px-6 max-w-3xl mx-auto">
            <Link
              to="/podcast"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              All episodes
            </Link>
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">
              {episode.topic}
            </h1>
            {episode.guest && (
              <p className="text-xl text-muted-foreground font-light mb-4">
                with {episode.guest}
              </p>
            )}
            <EpisodeMeta episode={episode} />
          </header>

          <div className="px-6 max-w-3xl mx-auto">
            {episode.audio && (
              <div className="mt-10 rounded-2xl border border-border bg-card p-5">
                <p className="text-sm font-medium mb-3">Listen to this episode</p>
                <audio
                  controls
                  preload="none"
                  src={episode.audio}
                  className="w-full"
                >
                  Your browser doesn’t support audio playback.{" "}
                  <a href={episode.audio}>Download the episode</a>.
                </audio>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm">
                  {episode.spotifyUrl && (
                    <a
                      href={episode.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Spotify <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {LISTEN_LINKS.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      {l.label} <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-2xl mt-14 mb-4">Episode notes</h2>
            {/* Show notes come from our own RSS feed and are reduced at build
                time to p/ul/li/a/strong/em by scripts/fetch-episodes.mjs. */}
            <div
              className="prose prose-invert prose-lg max-w-none prose-headings:font-[Roca_One] prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: episode.notesHtml }}
            />

            {(prev || next) && (
              <nav
                aria-label="More episodes"
                className="mt-12 grid sm:grid-cols-2 gap-4"
              >
                {prev ? (
                  <Link
                    to={`/podcast/${prev.slug}`}
                    className="group rounded-xl border border-border p-5 hover:border-primary/50 transition-colors"
                  >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 inline-flex items-center gap-1">
                      <ArrowLeft className="h-3 w-3" /> Previous
                    </p>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {prev.topic}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    to={`/podcast/${next.slug}`}
                    className="group rounded-xl border border-border p-5 hover:border-primary/50 transition-colors sm:text-right"
                  >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 inline-flex items-center gap-1 sm:justify-end w-full">
                      Next <ArrowRight className="h-3 w-3" />
                    </p>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {next.topic}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
};

export default Episode;
