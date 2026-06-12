import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CommunitySection from "./components/CommunitySection";
import AboutSection from "./components/AboutSection";
import ConferencesSection from "./components/ConferencesSection";
import StatsSection from "./components/StatsSection";
import UpcomingConferences from "./components/UpcomingConferences";
import WhySection from "./components/WhySection";
import PartnersSection from "./components/PartnersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CommunitySection />
        <AboutSection />
        <ConferencesSection />
        <StatsSection />
        <UpcomingConferences />
        <WhySection />
        <PartnersSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
