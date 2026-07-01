"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { destinations } from "../../components/Map/destinations";

const WorldMap = dynamic(() => import("../../components/Map/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
    </div>
  ),
});

export default function GlobalPresenceMap() {
  const [visiblePins, setVisiblePins] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Reveal all pins once section enters viewport
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // stagger pins in one by one
          destinations.forEach((_, i) => {
            setTimeout(() => setVisiblePins(i + 1), 400 + i * 180);
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#12131A] py-20 lg:py-24 overflow-hidden flex items-center min-h-[60vh] lg:min-h-[70vh]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* ── Left Side Text ── */}
        <div className="w-full lg:w-[30%] flex-shrink-0 flex flex-col justify-center text-left z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-[5rem] font-medium text-white leading-[1.15] tracking-wide font-sans"
          >
            Global
            <br />
            Presence
          </motion.h2>
        </div>

        {/* ── Right Side Map ── */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="w-full lg:flex-1 relative z-10 flex justify-end"
        >
          {/* Unconstrained width allowing it to justify fully to the end */}
          <div className="w-full relative" style={{ aspectRatio: "2/1" }}>
            <WorldMap visiblePins={visiblePins} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
