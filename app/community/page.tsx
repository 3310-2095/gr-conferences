import CommunityHero from "./sections/CommunityHero";
import CommunityStats from "./sections/CommunityStats";
import CommunityDirectory from "./sections/CommunityDirectory";
import CommunityBenefits from "./sections/CommunityBenefits";
import CommunityCTA from "./sections/CommunityCTA";
import CommunitySection from "../components/CommunitySection";

export default function CommunityPage() {
  return (
    <main>
      <CommunityHero />
      <CommunityStats />
      <CommunityDirectory />
      <div id="choose-role">
        <CommunitySection />
      </div>
      <CommunityBenefits />
      <CommunityCTA />
    </main>
  );
}
