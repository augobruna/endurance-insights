import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import SeriesSection from "@/components/SeriesSection";
import FeaturedEpisodesSection from "@/components/FeaturedEpisodesSection";
import HostsSection from "@/components/HostsSection";
import BlogSection from "@/components/BlogSection";
import ListenSection from "@/components/ListenSection";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <main className="relative">
      <FloatingParticles />
      <Navbar />
      <HeroSection />
      <StorySection />
      <SectionDivider />
      <SeriesSection />
      <SectionDivider />
      <FeaturedEpisodesSection />
      <SectionDivider />
      <HostsSection />
      <SectionDivider />
      <BlogSection />
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
          <h2>Endurance Sports Blog</h2>
          <p>Read in-depth articles on endurance training, race reports, and coaching insights on the <a href="https://justbrunathings.substack.com/">Human Endurance Blog</a>.</p>
          <h2>Listen</h2>
          <ul>
            <li><a href="https://open.spotify.com/show/4JR5cvFpYmuvaQxbx2D9nb">Spotify</a></li>
            <li><a href="https://podcasts.apple.com/us/podcast/human-endurance/id1729061731">Apple Podcasts</a></li>
            <li><a href="https://www.youtube.com/@HumanEndurance">YouTube</a></li>
          </ul>
        </div>
      </noscript>
    </main>
  );
};

export default Index;
