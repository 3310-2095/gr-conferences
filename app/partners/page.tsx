import PartnersHero from "./sections/PartnersHero";
import BecomePartnerCTA from "./sections/BecomePartnerCTA";
import PartnersSection from "../components/PartnersSection";

export default function PartnersPage() {
  return (
    <main>
      <PartnersHero />
      <PartnersSection />
      <BecomePartnerCTA />
    </main>
  );
}
