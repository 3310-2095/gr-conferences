"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChatBubbleBottomCenterText, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { fadeUp, staggerContainer, viewport } from "../lib/animations";

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
  {
    quote: "I connected with researchers from 20+ countries in just two days. The platform is well-organized and the sessions are highly relevant to cutting-edge research.",
    name: "Dr. Amina Osei",
    role: "Researcher, University of Ghana",
    avatar: "https://i.pravatar.cc/300?img=25",
    tag: "Networking",
    rating: 5,
  },
  {
    quote: "GR Conferences didn't just give me a stage — it gave me a community. The caliber of research and depth of discussions made this the most impactful event of my career.",
    name: "Prof. Lena Müller",
    role: "Director of Research, Heidelberg University",
    avatar: "https://i.pravatar.cc/300?img=5",
    tag: "Community",
    rating: 5,
  },
];

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.3 } }),
};

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  function go(dir: number) {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }

  const t = testimonials[index];

  return (
    <section id="testimonials" className="relative py-20 lg:py-28 bg-white overflow-hidden border-t border-gray-100">

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
            <motion.span variants={fadeUp} className="text-[#FF5E3A] font-bold tracking-[0.12em] uppercase text-[11px] mb-3 block">
              Testimonials
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Voices From Our<br />
              <span className="text-[#FF5E3A]">Global Community</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-[#6B7280] text-base leading-relaxed max-w-sm lg:text-right">
            Thousands of researchers trust GR Conferences to amplify their work and build lasting global connections.
          </motion.p>
        </motion.div>

        {/* Carousel Block */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
          className="relative bg-[#111111] rounded-[4px] overflow-hidden"
        >
          {/* Left accent line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5E3A]" />
          {/* Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#FF5E3A]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 p-8 lg:p-12">

            {/* Slide content */}
            <div className="min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  {/* Icon + Tag */}
                  <div className="flex items-center justify-between">
                    <HiOutlineChatBubbleBottomCenterText className="text-[#FF5E3A]" size={32} />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF5E3A] border border-[#FF5E3A]/30 px-3 py-1 rounded-full">
                      {t.tag}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-white text-lg lg:text-xl leading-relaxed font-light">
                    "{t.quote}"
                  </p>

                  {/* Author + Stars */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FF5E3A]/40" />
                      <div>
                        <p className="text-white font-bold">{t.name}</p>
                        <p className="text-[#6B7280] text-sm">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <FaStar key={i} className="text-[#FF5E3A]" size={14} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation row */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    className={`rounded-full transition-all duration-300 ${i === index ? "w-6 h-2 bg-[#FF5E3A]" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                  />
                ))}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => go(-1)}
                  className="w-10 h-10 flex items-center justify-center border border-white/15 text-white hover:border-[#FF5E3A] hover:text-[#FF5E3A] transition-colors duration-200"
                >
                  <HiChevronLeft size={20} />
                </button>
                <button
                  onClick={() => go(1)}
                  className="w-10 h-10 flex items-center justify-center border border-white/15 text-white hover:border-[#FF5E3A] hover:text-[#FF5E3A] transition-colors duration-200"
                >
                  <HiChevronRight size={20} />
                </button>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
