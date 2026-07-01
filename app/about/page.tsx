"use client";

import AboutHero from "./sections/AboutHero";
// import OurStory from "./sections/OurStory";
import VisionMission from "./sections/VisionMission";
import GlobalPresenceMap from "./sections/GlobalPresenceMap";
import ConferenceJourney from "./sections/ConferenceJourney";
import Ecosystem from "./sections/Ecosystem";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      {/* <OurStory /> */}
      <VisionMission />
      <GlobalPresenceMap />
      <ConferenceJourney />
      <Ecosystem />
    </main>
  );
}
