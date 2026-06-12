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
  { name: "TIBS Conf", domain: "Business", year: "2025", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=70" },
  { name: "ICT4SD", domain: "Sustainability", year: "2025", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=70" },
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
            Our Brands
          </motion.h2>
          <motion.button variants={fadeUp} className="flex items-center gap-2 text-sm font-bold text-[#b3b0cb] hover:text-white transition-colors mt-6 md:mt-0 uppercase tracking-widest">
            Read More <HiArrowRight size={16} />
          </motion.button>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerFast} initial="hidden" whileInView="show" viewport={viewport}
        >
          {conferences.map((conf) => (
            <motion.div
              key={conf.name}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              className="group bg-[#14122b] rounded-3xl overflow-hidden border border-white/5 hover:border-[#9d78e2]/50 transition-colors cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={conf.img} alt={conf.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14122b] via-transparent to-transparent" />
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">{conf.domain}</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-4 group-hover:text-[#9d78e2] transition-colors">{conf.name}</h3>
                <div className="flex items-center gap-2 text-sm text-[#b3b0cb] font-semibold uppercase tracking-widest">
                  <span>Year {conf.year}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9d78e2]"></div>
                  <span className="group-hover:text-white transition-colors flex items-center gap-1">Read More <HiArrowRight size={12}/></span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
