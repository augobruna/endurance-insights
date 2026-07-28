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

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "PodcastSeries",
      name: "Human Endurance Podcast",
      description:
        "Endurance sports podcast exploring the science and stories behind human performance. Expert Series with specialists in sports science, nutrition, and coaching. Guest Series with real athletes doing extraordinary things while balancing everyday life.",
      url: SITE_URL,
      webFeed: "https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb",
      image: `${SITE_URL}/og-image.png`,
      author: [
        {
          "@type": "Person",
          name: "Bruna",
          description: "Runner, Coach, and Co-founder of Augo Training",
          url: "https://www.instagram.com/justbrunathings/",
        },
        {
          "@type": "Person",
          name: "Fabi",
          description: "Triathlete, Coach, and Co-founder of Augo Training",
          url: "https://www.instagram.com/endurance_fabi/",
        },
      ],
      sameAs: [
        "https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb",
        "https://podcasts.apple.com/us/podcast/human-endurance/id1729061731",
        "https://www.youtube.com/@HumanEndurance",
        "https://www.instagram.com/humanendurancepodcast/",
        "https://justbrunathings.substack.com/",
      ],
    },
    {
      "@type": "WebSite",
      name: "Human Endurance Podcast",
      url: SITE_URL,
    },
    {
      "@type": "Organization",
      name: "Human Endurance Podcast",
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
      sameAs: [
        "https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb",
        "https://podcasts.apple.com/us/podcast/human-endurance/id1729061731",
        "https://www.youtube.com/@HumanEndurance",
        "https://justbrunathings.substack.com/",
      ],
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
