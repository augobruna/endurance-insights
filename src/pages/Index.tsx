import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import SeriesSection from "@/components/SeriesSection";
import HostsSection from "@/components/HostsSection";
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
      <HostsSection />
      <SectionDivider />
      <ListenSection />
      <Footer />
    </main>
  );
};

export default Index;
