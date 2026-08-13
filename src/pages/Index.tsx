import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import SeriesSection from "@/components/SeriesSection";
import FeaturedEpisodesSection from "@/components/FeaturedEpisodesSection";
import HostsSection from "@/components/HostsSection";
import ListenSection from "@/components/ListenSection";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import SectionDivider from "@/components/SectionDivider";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/posts";

const LISTEN_LINKS = [
  "https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb",
  "https://podcasts.apple.com/us/podcast/human-endurance/id1729061731",
  "https://www.youtube.com/@HumanEndurance",
  "https://www.instagram.com/humanendurancepodcast/",
  "https://justbrunathings.substack.com/",
];

// Hosts are declared as full entities with stable @ids so the podcast,
// organisation and articles can all point at the same person rather than
// repeating a bare name string.
const BRUNA = {
  "@type": "Person",
  "@id": `${SITE_URL}/#bruna`,
  name: "Bruna Maia",
  jobTitle: "Endurance coach and podcast host",
  description:
    "Runner, coach, and co-founder of Augo Training. Co-host of the Human Endurance Podcast.",
  url: SITE_URL,
  sameAs: [
    "https://www.instagram.com/justbrunathings/",
    "https://justbrunathings.substack.com/",
    "https://www.augotraining.com",
  ],
};

const FABI = {
  "@type": "Person",
  "@id": `${SITE_URL}/#fabi`,
  name: "Fabienne Maia",
  jobTitle: "Triathlon coach and podcast host",
  description:
    "Triathlete, coach, Ironman finisher, and co-founder of Augo Training. Co-host of the Human Endurance Podcast.",
  url: SITE_URL,
  sameAs: [
    "https://www.instagram.com/endurance_fabi/",
    "https://www.augotraining.com",
  ],
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "PodcastSeries",
      "@id": `${SITE_URL}/#podcast`,
      name: "Human Endurance Podcast",
      description:
        "Endurance sports podcast exploring the science and stories behind human performance. Expert Series with specialists in sports science, nutrition, and coaching. Guest Series with real athletes doing extraordinary things while balancing everyday life.",
      url: `${SITE_URL}/podcast`,
      // The actual RSS feed — this previously pointed at the Spotify page,
      // which is a listing rather than a feed.
      webFeed: "https://anchor.fm/s/fd7296f8/podcast/rss",
      image: `${SITE_URL}/og-image.png`,
      author: [{ "@id": BRUNA["@id"] }, { "@id": FABI["@id"] }],
      sameAs: LISTEN_LINKS,
    },
    BRUNA,
    FABI,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Human Endurance Podcast",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/podcast?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Human Endurance Podcast",
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
      founder: [{ "@id": BRUNA["@id"] }, { "@id": FABI["@id"] }],
      sameAs: LISTEN_LINKS,
    },
  ],
};

const Index = () => {
  return (
    <>
      <SEO
        title="Human Endurance Podcast | Redefining Limits"
        description="Endurance sports podcast with Bruna and Fabi. Sports science and inspiring athlete stories."
        canonical={`${SITE_URL}/`}
        jsonLd={homeJsonLd}
      />
      <main className="relative">
        <FloatingParticles />
        <Navbar />
        <HeroSection />
        <HostsSection />
        <SectionDivider />
        <FeaturedEpisodesSection />
        <SectionDivider />
        <SeriesSection />
        <SectionDivider />
        <StorySection />
        <SectionDivider />
        <ListenSection />
        <Footer />

        <noscript>
          <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Human Endurance Podcast</h1>
            <p>Redefining human boundaries through endurance sports. Hosted by Bruna and Fabi.</p>
            <h2>Expert Series</h2>
            <p>In-depth conversations with specialists in sports science, nutrition, physiology, and coaching. Practical, actionable insights to help you train smarter.</p>
            <h2>Guest Series</h2>
            <p>Real stories from everyday athletes doing extraordinary things. Full-time jobs, families, responsibilities — and still chasing ultras, ironmans, and personal bests.</p>
            <h2>Meet the Hosts</h2>
            <p>Bruna — Runner, Coach, and Co-founder of Augo Training.</p>
            <p>Fabi — Triathlete, Coach, and Co-founder of Augo Training.</p>
            <h2>Blog</h2>
            <p>Read in-depth articles on endurance training, race reports, and coaching insights on the <a href="/blog">Human Endurance Blog</a>.</p>
            <h2>Listen</h2>
            <ul>
              <li><a href="https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb">Spotify</a></li>
              <li><a href="https://podcasts.apple.com/us/podcast/human-endurance/id1729061731">Apple Podcasts</a></li>
              <li><a href="https://www.youtube.com/@HumanEndurance">YouTube</a></li>
            </ul>
          </div>
        </noscript>
      </main>
    </>
  );
};

export default Index;
