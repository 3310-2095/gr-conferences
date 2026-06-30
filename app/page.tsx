import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ConferencesSection from "./components/ConferencesSection";
import CommunitySection from "./components/CommunitySection";
import StatsSection from "./components/StatsSection";
import WhySection from "./components/WhySection";
import PartnersSection from "./components/PartnersSection";
import ParticipatingInstitutions from "./components/ParticipatingInstitutions";
import TestimonialsSection from "./components/TestimonialsSection";
import NewsletterStrip from "./components/NewsletterStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero — conference visuals, global stats, CTA buttons */}
        <HeroSection />

        <AboutSection />

        {/* 2. Featured Upcoming Conferences */}
        <ConferencesSection />

      
        {/* 4. Conference Brands / Focus Areas / Disciplines */}
        <CommunitySection />



        {/* 6. Global Impact counters */}
        <StatsSection />

        {/* 6. Why GR Conferences */}
        <WhySection />

        {/* 7. Institutional Partner logos */}
        <PartnersSection />

        {/* 8. Author logos */}
        <ParticipatingInstitutions />

        {/* 9. Testimonials */}
        <TestimonialsSection />
      </main>
      <NewsletterStrip />
    </>
  );
}
