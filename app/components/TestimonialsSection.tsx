"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { fadeUp, staggerContainer, staggerFast, scaleIn, viewport } from "../lib/animations";

const testimonials = [
  {
    rating: "5.0",
    title: "A Game Changer for Research",
    desc: "GR Conferences provided the perfect platform to present my research on AI ethics to a global audience. The connections I made were invaluable.",
    name: "Dr. Priya Sharma",
    role: "Professor of CS, IIT Delhi",
    avatar: "https://i.pravatar.cc/300?img=47",
  },
  {
    rating: "5.0",
    title: "Seamless and Outstanding",
    desc: "The diversity of research presented and the quality of peer reviews was outstanding. Truly an international standard for academics.",
    name: "Prof. James Whitfield",
    role: "Head of Research, UoM",
    avatar: "https://i.pravatar.cc/300?img=12",
  },
  {
    rating: "4.8",
    title: "Boosted Our Collaboration",
    desc: "A landmark event for researchers. The commitment to sustainable practices stood out. It's an ecosystem that truly cares about growth.",
    name: "Dr. Nattapong",
    role: "Associate Professor",
    avatar: "https://i.pravatar.cc/300?img=33",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-12 bg-[#080710] overflow-hidden">
      
      {/* Ambient background orbs for the glass effect to refract */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#9d78e2]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#38bdf8]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-8 relative"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
        >
          <motion.span variants={fadeUp} className="text-[#9d78e2] text-sm font-bold tracking-widest uppercase mb-4 block">
            Testimonials
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider drop-shadow-lg">
            Voices from our community
          </motion.h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerFast} initial="hidden" whileInView="show" viewport={viewport}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              className="group relative rounded-[12px] p-5 flex flex-col justify-between overflow-hidden cursor-default bg-white/[0.02] backdrop-blur-[40px] border border-white/[0.08] shadow-2xl hover:bg-white/[0.04] hover:border-white/[0.15] transition-colors duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.25] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-white font-extrabold text-xl">{t.rating}</span>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="text-[#facc15] drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]" size={18} />)}
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl mb-3 tracking-wide leading-tight drop-shadow-sm">{t.title}</h3>
                <p className="text-[#9492a8] text-sm leading-relaxed mb-6 group-hover:text-[#a5a3b8] transition-colors">{t.desc}</p>
                </div>
              <div className="flex items-center gap-4 mt-auto relative z-10">
                <div className="relative">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-0 rounded-full border border-white/[0.15]"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold tracking-wide">{t.name}</span>
                  <span className="text-[#64627a] text-sm font-medium">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
