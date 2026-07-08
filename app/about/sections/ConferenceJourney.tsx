"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "2014",
    heading: "The Beginning",
    points: [
      "Launched our first conference initiative, creating a platform for global research exchange.",
    ],
    color: "#D4AF37", // Bright Purple
  },
  {
    year: "2016",
    heading: "Growing Globally",
    points: [
      "Expanded our international conference footprint and global research community.",
    ],
    color: "#3b82f6",
  },
  {
    year: "2019",
    heading: "Growing Global Community",
    points: [
      "Expanded participation and collaborations with researchers and academic institutions worldwide.",
    ],
    color: "#10b981", // Bright Emerald
  },
  {
    year: "2020",
    heading: "Embracing Hybrid Innovation",
    points: [
      "Introduced hybrid conference formats, enabling global participation through physical and virtual platforms.",
    ],
    color: "#ec4899",
  },
  {
    year: "2022",
    heading: "A New Age of Conference Convergence",
    points: [
      "Redefined conference experiences with flexible, globally connected participation.",
    ],
    color: "#f59e0b",
  },
  {
    year: "2024",
    heading: "Global Conference Portfolio",
    points: [
      "Expanded our international presence with multiple flagship conferences across countries.",
    ],
    color: "#8b5cf6",
  },
  {
    year: "2026",
    heading: "Strengthening Our Network and Domains",
    points: [
      "Expanded into new research domains while strengthening our global academic network.",
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
      <div className="w-full max-w-2xl mx-auto space-y-6 md:space-y-8 transition-opacity duration-700" style={{ opacity: isActive ? 1 : 0.4 }}>

        {/* Content Section */}
        <div className="space-y-6 md:space-y-8">
          <h3
            className="text-2xl md:text-3xl lg:text-[2rem] font-medium tracking-tight"
            style={{ color: "white" }}
          >
            {milestone.heading}
          </h3>

          <div className="space-y-5 md:space-y-6">
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
