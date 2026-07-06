import PartnersHero from "./sections/PartnersHero";
import BecomePartnerCTA from "./sections/BecomePartnerCTA";
import PartnersSection from "../components/PartnersSection";
import TrustedInstitutions from "./sections/TrustedInstitutions";

export default function PartnersPage() {
  return (
    <main>
      <PartnersHero />
<TrustedInstitutions />
      <BecomePartnerCTA />
    </main>
  );
}
