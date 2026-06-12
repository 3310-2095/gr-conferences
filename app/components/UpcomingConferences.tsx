"use client";
import { motion } from "framer-motion";
import { HiOutlineCalendarDays, HiOutlineMapPin, HiArrowRight, HiOutlineTag } from "react-icons/hi2";
import { fadeUp, fadeIn, staggerContainer, staggerFast, viewport } from "../lib/animations";

const upcoming = [
  { 
    name: "ICTIS Thailand 2025", 
    location: "Bangkok, Thailand", 
    date: "March 14-15, 2025", 
    theme: "ICT & Information Systems",
    status: "Open"
  },
  { 
    name: "ICTCS India 2025", 
    location: "New Delhi, India", 
    date: "April 5-6, 2025", 
    theme: "Computing & Security",
    status: "Open"
  },
  { 
    name: "ICICT UK 2025", 
    location: "London, UK", 
    date: "May 20-21, 2025", 
    theme: "ICT Innovation",
    status: "Upcoming"
  },
  { 
    name: "ICTIS USA 2025", 
    location: "New York, USA", 
    date: "June 12-13, 2025", 
    theme: "ICT & Smart Systems",
    status: "Upcoming"
  },
];

export default function UpcomingConferences() {
  return (
    <section id="calendar" className="relative py-12 bg-[#0a0b18] overflow-hidden">
      <div className="absolute inset-0 bg-wave opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9d78e2]/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-3xl font-extrabold text-white uppercase tracking-wider">
            Join Our Next Events
          </motion.h2>
          <motion.button variants={fadeIn} className="flex items-center gap-2 text-sm font-bold text-[#b3b0cb] hover:text-white transition-colors mt-6 md:mt-0 uppercase tracking-widest">
            View Full Calendar <HiArrowRight size={16} />
          </motion.button>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-4 gap-8"
          variants={staggerFast} initial="hidden" whileInView="show" viewport={viewport}
        >
          {upcoming.map((event, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              className="bg-[#14122b] border border-white/5 p-6 rounded-[32px] group hover:border-[#9d78e2]/50 hover:bg-[#1e193e] transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide group-hover:text-[#9d78e2] transition-colors pr-4">{event.name}</h3>
                  <span className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${event.status === 'Open' ? 'bg-[#9d78e2]/20 text-[#b58ffd]' : 'bg-white/10 text-white/70'}`}>{event.status}</span>
                </div>
                <div className="flex flex-col gap-3 mb-5">
                  <div className="flex items-center gap-3 text-sm font-semibold text-[#b3b0cb]"><div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><HiOutlineMapPin className="text-[#9d78e2]" size={16} /></div>{event.location}</div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-[#b3b0cb]"><div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><HiOutlineCalendarDays className="text-[#9d78e2]" size={16} /></div>{event.date}</div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-[#b3b0cb]"><div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><HiOutlineTag className="text-[#9d78e2]" size={16} /></div>{event.theme}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#9d78e2]/50 text-white font-bold tracking-wide hover:bg-[#9d78e2] transition-all text-sm">Visit Conference<HiArrowRight size={14} /></button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
