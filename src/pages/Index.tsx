import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import SeriesSection from "@/components/SeriesSection";
import HostsSection from "@/components/HostsSection";
import ListenSection from "@/components/ListenSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
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
