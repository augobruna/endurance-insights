import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import SeriesSection from "@/components/SeriesSection";
import HostsSection from "@/components/HostsSection";
import ListenSection from "@/components/ListenSection";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";

const Index = () => {
  return (
    <main className="relative">
      <FloatingParticles />
      <Navbar />
      <HeroSection />
      <StorySection />
      <SeriesSection />
      <HostsSection />
      <ListenSection />
      <Footer />
    </main>
  );
};

export default Index;
