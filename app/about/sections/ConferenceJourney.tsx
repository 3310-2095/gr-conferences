"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "2014",
    heading: "The Beginning",
    points: [
      "Launched our first international conference, ICTCS 2014, in Ahmedabad, India, bringing together researchers from over 15 countries.",
      "Established the foundational peer-review process and editorial standards that continue to define GR Conferences today.",
      "Partnered with our first indexing body, laying the groundwork for globally recognized publication outputs.",
    ],
    color: "#D4AF37",
  },
  {
    year: "2016",
    heading: "Growing Globally",
    points: [
      "Expanded the conference portfolio to three annual events spanning technology, business, and sustainability domains.",
      "Welcomed delegates from 30+ countries, marking a significant milestone in our international outreach.",
      "Signed our first formal university partnership agreements with institutions across Asia and Europe.",
      "Introduced dedicated tracks for early-career researchers and PhD scholars.",
    ],
    color: "#3b82f6",
  },
  {
    year: "2019",
    heading: "Growing Global Community",
    points: [
      "Surpassed 1,000 cumulative paper submissions across all active conference series.",
      "Launched the GR Community platform, connecting researchers between conference cycles.",
      "Established regional chapters in Southeast Asia, the Middle East, and Sub-Saharan Africa.",
      "Introduced post-conference journal fast-track publication pathways with partner publishers.",
    ],
    color: "#10b981",
  },
  {
    year: "2020",
    heading: "Embracing Hybrid Innovation",
    points: [
      "Rapidly pivoted to fully virtual formats within weeks, ensuring zero conference cancellations during the global pandemic.",
      "Developed a proprietary virtual conference platform supporting live sessions, poster halls, and networking rooms.",
      "Achieved record attendance with 2,500+ participants across virtual editions — a 3× increase over prior years.",
      "Introduced on-demand session recordings, making research accessible to global audiences post-event.",
    ],
    color: "#ec4899",
  },
  {
    year: "2022",
    heading: "A New Age of Conference Convergence",
    points: [
      "Successfully relaunched in-person conferences with a hybrid model, offering both physical and virtual attendance.",
      "Expanded to 8 active conference series across 6 countries including Thailand, India, the UK, and the Philippines.",
      "Onboarded 50+ new institutional partners and indexing collaborations including Scopus and Ei Compendex.",
      "Launched the GR Archives portal, providing open access to proceedings from all past editions.",
    ],
    color: "#f59e0b",
  },
  {
    year: "2024",
    heading: "Global Conference Portfolio",
    points: [
      "Operated 10 flagship conferences across Asia, Europe, Africa, and North America in a single calendar year.",
      "Crossed 500+ institutional affiliations from universities and research bodies in over 80 countries.",
      "Introduced the GR Speaker Bureau, connecting keynote speakers with conference organizers globally.",
      "Launched dedicated tracks for AI, sustainability, and interdisciplinary research across all conference series.",
      "Achieved an average delegate satisfaction score of 4.7 / 5 across all 2024 editions.",
    ],
    color: "#8b5cf6",
  },
  {
    year: "2026",
    heading: "Strengthening Our Network and Domains",
    points: [
      "Expanding into new research domains including quantum computing, green technology, and global health sciences.",
      "Targeting 12 active conference series with events scheduled across 10 countries by year-end.",
      "Deepening partnerships with IEEE, ACM, and Springer Nature for enhanced publication and indexing coverage.",
      "Launching the GR Fellowship Programme to support emerging researchers from developing nations.",
      "Building toward a unified GR Ecosystem connecting conferences, journals, and the research community on a single platform.",
    ],
    color: "#10b981",
  },
];

function MilestoneSection({
  milestone,
  onInView,
  isActive
}: {
  milestone: typeof milestones[0];
  onInView: (year: string) => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView(milestone.year);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [milestone.year, onInView]);

  return (
    <div ref={ref} className="min-h-[55vh] flex flex-col justify-center py-8 px-6 md:px-10 lg:px-16">
      <div className="w-full max-w-4xl mx-auto space-y-6 transition-opacity duration-700" style={{ opacity: isActive ? 1 : 0.4 }}>

        {/* Content Section */}
        <h3
          className="text-2xl md:text-3xl lg:text-[2rem] font-medium tracking-tight"
          style={{ color: "white" }}
        >
          {milestone.heading}
        </h3>

        <div className="space-y-5 md:space-y-6 max-w-3xl">
          {milestone.points.map((point, idx) => (
            <div key={idx} className="flex items-start gap-4 md:gap-5">
              <div
                className="w-6 h-6 md:w-8 md:h-8 rounded-[4px] md:rounded-md flex items-center justify-center flex-shrink-0 mt-1 border shadow-sm transition-colors duration-700"
                style={{
                  backgroundColor: isActive ? `${milestone.color}15` : 'rgba(255,255,255,0.05)',
                  borderColor: isActive ? `${milestone.color}40` : 'rgba(255,255,255,0.1)',
                }}
              >
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-700"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                  style={{ color: isActive ? milestone.color : 'rgba(255,255,255,0.3)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                {point}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function ConferenceJourney() {
  const [activeYear, setActiveYear] = useState(milestones[0].year);
  const activeColor = milestones.find((m) => m.year === activeYear)?.color || "#a855f7";

  return (
    <section className="relative bg-[#12131A] w-full">

      {/* ── Ambient Background Glow (Sticky) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Full-screen color effect behind everything */}
          <div
            className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] md:w-[120vw] md:h-[120vw] rounded-full blur-[180px] opacity-[0.07] md:opacity-10 transition-colors duration-1000 ease-in-out"
            style={{ backgroundColor: activeColor }}
          />
        </div>
      </div>

      {/* ── Inner Container ── */}
      <div className="w-full max-w-[1400px] mx-auto flex relative z-10">

        {/* ── Left Sidebar (Sticky Timeline) ── */}
        <div className="w-[100px] md:w-[280px] flex-shrink-0 relative border-r border-white/5">
          <div className="sticky top-0 h-screen flex flex-col">
            {/* Header */}
            <div className="h-24 md:h-32 flex items-center justify-center border-b border-white/5 shrink-0">
              <span className="text-[9px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/30 text-center">
                Our Timeline
              </span>
            </div>

            {/* Proper Edge-to-Edge Timeline Blocks */}
            <div className="flex-1 flex flex-col">
              {milestones.map((m) => {
                const isActive = activeYear === m.year;
                return (
                  <div
                    key={m.year}
                    className={`flex-1 flex items-center justify-center border-b border-white/5 transition-all duration-700 cursor-default
                       ${isActive ? 'bg-white/10' : 'bg-transparent'}
                     `}
                  >
                    <span
                      className={`transition-all duration-700 font-medium ${isActive ? 'text-2xl md:text-3xl text-white' : 'text-lg md:text-xl text-white/40'}`}
                    >
                      {m.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right Side Content (Scrollable) ── */}
        <div className="flex-1 relative">
          {milestones.map((m) => (
            <MilestoneSection
              key={m.year}
              milestone={m}
              onInView={setActiveYear}
              isActive={activeYear === m.year}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
