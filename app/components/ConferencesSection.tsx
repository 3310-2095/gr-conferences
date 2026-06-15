"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { fadeUp, staggerContainer, staggerFast, scaleIn, viewport } from "../lib/animations";

const conferences = [
  { name: "ICTIS Thailand", domain: "Technology", year: "2025", img: "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?w=500&q=70" },
  { name: "ICTIS USA", domain: "Technology", year: "2025", img: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=500&q=70" },
  { name: "ICTCS India", domain: "Computing", year: "2025", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&q=70" },
  { name: "ICICT UK", domain: "Technology", year: "2025", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=70" },
];

export default function ConferencesSection() {
  const [active, setActive] = useState("All");

  return (
    <section id="conferences" className="relative py-20 bg-[#0a0b18] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
            Upcoming Conferences
          </motion.h2>
          <motion.button variants={fadeUp} className="flex items-center gap-2 text-sm font-bold text-[#b3b0cb] hover:text-white transition-colors mt-6 md:mt-0 uppercase tracking-widest">
            Read More <HiArrowRight size={16} />
          </motion.button>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerFast} initial="hidden" whileInView="show" viewport={viewport}
        >
          {conferences.map((conf) => (
            <motion.div
              key={conf.name}
              variants={scaleIn}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              className="group bg-[#14122b] rounded-2xl overflow-hidden border border-white/5 hover:border-[#9d78e2]/50 transition-colors cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={conf.img} alt={conf.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14122b] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">{conf.domain}</div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-2 group-hover:text-[#9d78e2] transition-colors leading-tight">{conf.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-[#b3b0cb] font-semibold uppercase tracking-widest">
                  <span>{conf.year}</span>
                  <div className="w-1 h-1 rounded-full bg-[#9d78e2]"></div>
                  <span className="group-hover:text-white transition-colors flex items-center gap-1">More <HiArrowRight size={10}/></span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
