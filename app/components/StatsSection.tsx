"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ParticlesBackground from "./ParticlesBackground";
import { fadeUp, staggerContainer, staggerFast, viewport } from "../lib/animations";

const stats = [
  { value: 10, suffix: "+", title: "Years of Legacy", label: "Conference Excellence" },
  { value: 12, suffix: "+", title: "Conference Brands", label: "Conferences Held" },
  { value: 50, suffix: "+", title: "Countries", label: "Reached Worldwide" },
  { value: 500, suffix: "+", title: "Research Papers", label: "Papers Presented" },
  { value: 12000, suffix: "+", title: "Members", label: "Growing Community" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="relative py-20 bg-[#0a0b18] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(157,120,226,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wave opacity-20 pointer-events-none" />

      {/* Particles effect */}
      <ParticlesBackground id="stats-particles" density={40} linkOpacity={0.1} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center">
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport} className="flex flex-col items-center">
          <motion.span variants={fadeUp} className="text-[#9d78e2] text-sm font-bold tracking-widest uppercase mb-4 block">
            Global Impact
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-white mb-20 uppercase tracking-wider">
            Our Growing Network
          </motion.h2>
        </motion.div>

        {/* Numbers Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 w-full"
          variants={staggerFast} initial="hidden" whileInView="show" viewport={viewport}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeUp} className="flex flex-col items-center text-center">
              <div className="text-5xl md:text-6xl font-extrabold text-[#9d78e2] mb-3 font-serif">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white text-base font-bold uppercase tracking-wider mb-1">{stat.title}</div>
              <div className="text-[#b3b0cb] text-xs uppercase tracking-widest font-semibold">{stat.label}</div>
              <div className="w-8 h-0.5 bg-[#9d78e2]/50 mt-5 rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}