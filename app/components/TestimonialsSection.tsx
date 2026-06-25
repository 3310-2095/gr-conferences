"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { staggerContainer, viewport } from "../lib/animations";

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote: "GR Conferences provided the perfect platform to present my research on AI ethics to a global audience. The connections I made were invaluable — truly a world-class experience.",
    name: "Dr. Priya Sharma",
    role: "Professor of CS, IIT Delhi",
    avatar: "https://i.pravatar.cc/300?img=47",
    tag: "AI & Ethics",
    rating: 5,
  },
  {
    quote: "The diversity of research presented and the quality of peer reviews was outstanding. GR Conferences sets a truly international standard for academics worldwide.",
    name: "Prof. James Whitfield",
    role: "Head of Research, UoM",
    avatar: "https://i.pravatar.cc/300?img=12",
    tag: "Peer Review",
    rating: 5,
  },
  {
    quote: "A landmark event for researchers. The commitment to sustainable practices stood out. It's an ecosystem that truly cares about growth and long-term academic impact.",
    name: "Dr. Nattapong Krisada",
    role: "Associate Professor, CU",
    avatar: "https://i.pravatar.cc/300?img=33",
    tag: "Sustainability",
    rating: 5,
  },
  
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-20 lg:py-28 bg-[#F9F9F9] overflow-hidden border-t border-gray-100">

      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `radial-gradient(#111 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
        >
          <div>
            <motion.span
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
              className="text-[#520380] font-bold tracking-[0.12em] uppercase text-[11px] mb-3 flex items-center gap-2"
            >
              <span className="text-[#520380] text-xs">♦</span>
              Testimonials
            </motion.span>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Voices From Our<br />
              <span className="text-[#520380]">Global Community</span>
            </motion.h2>
          </div>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.15 } } }}
            className="text-[#6B7280] text-base leading-relaxed max-w-sm lg:text-right"
          >
            Thousands of researchers trust GR Conferences to amplify their work and build lasting global connections.
          </motion.p>
        </motion.div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease } }}
              className="group relative bg-white border border-gray-200 p-7 flex flex-col gap-5 hover:border-[#520380]/30 hover:shadow-[0_16px_48px_rgba(82,3,128,0.10)] transition-all duration-300"
            >
              {/* Top accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#520380] to-[#3A025B] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              {/* Quote icon + tag */}
              <div className="flex items-center justify-between">
                <HiOutlineChatBubbleBottomCenterText className="text-[#520380]/30 group-hover:text-[#520380]/60 transition-colors duration-300" size={28} />
                <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#520380] bg-[#520380]/8 border border-[#520380]/20 px-2.5 py-1 rounded-full">
                  {t.tag}
                </span>
              </div>

             

              {/* Quote */}
              <p className="text-[#374151] text-[15px] leading-[1.75] flex-1">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#520380]/20 group-hover:ring-[#520380]/50 transition-all duration-300"
                />
                <div>
                  <p className="text-[#111111] font-bold text-sm">{t.name}</p>
                  <p className="text-[#9CA3AF] text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
