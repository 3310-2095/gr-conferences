"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const benefits = [
  {
    img: "/icon/1.png",
    title: "Global Academic Network",
    desc: "Connect with researchers, academics, and professionals from around the world.",
  },
  {
    img: "/icon/2.png",
    title: "International Recognition",
    desc: "Gain global exposure and enhance your academic and professional reputation.",
  },
  {
    img: "/icon/3.png",
    title: "Publication Opportunities",
    desc: "Publish your research in reputed proceedings and indexed platforms.",
  },
  {
    img: "/icon/4.png",
    title: "Research Collaboration",
    desc: "Collaborate on innovative research and interdisciplinary projects.",
  },
  {
    img: "/icon/5.png",
    title: "Leadership Opportunities",
    desc: "Take the stage as a speaker, chair, or organizer and lead with impact.",
  },
  {
    img: "/icon/6.png",
    title: "Professional Visibility",
    desc: "Increase your visibility among peers, institutions, and industry leaders.",
  },
  {
    img: "/icon/7.png",
    title: "Knowledge Exchange",
    desc: "Share ideas, gain insights, and stay updated with the latest research trends.",
  },
  {
    img: "/icon/8.png",
    title: "Cross-disciplinary Connections",
    desc: "Build connections across diverse fields and broaden your research perspectives.",
  },
];

export default function CommunityBenefits() {
  return (
    <section className="relative w-full py-24 lg:py-28 overflow-hidden bg-[#ffff]">
      {/* Decorative dot grids */}
      <div
        aria-hidden
        className="absolute top-10 right-10 grid grid-cols-4 gap-2.5 pointer-events-none opacity-70"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#520380]/20" />
        ))}
      </div>
      <div
        aria-hidden
        className="absolute top-24 left-10 w-24 h-24 rounded-full border border-[#520380]/10 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 left-16 w-4 h-4 rounded-full border-2 border-[#520380]/20 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(82,3,128,0.06) 0%, transparent 65%)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
            className="flex items-center gap-3 mb-5"
          >
                      <span style={{ color: "#520380", fontSize: 12 }}>♦</span>

            <span className="inline-block  text-[#520380] text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full">
              Member Benefits
            </span>
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111111] mb-4"
          >
            Why Join <span className="text-[#520380]">GR Conferences?</span>
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="text-gray-500 text-base max-w-xl"
          >
            Unlock a world of academic opportunities, global connections, and professional growth.
          </motion.p>
        </motion.div>

        {/* Icon cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6 }}
              className="relative flex flex-col items-center text-center bg-white rounded-2xl px-6 pt-9 pb-8 border border-[#520380]/[0.06] shadow-[0_4px_20px_rgba(82,3,128,0.07)] hover:shadow-[0_16px_40px_rgba(82,3,128,0.14)] hover:border-[#520380]/15 transition-shadow duration-300"
            >
              {/* Number badge */}
              <span className="absolute top-4 left-4 text-[22px] font-extrabold text-[#520380]">
                {i + 1}
              </span>

              {/* Icon illustration */}
              <div className="w-28 h-28 mb-5 flex items-center justify-center">
                <img src={b.img} alt={b.title} className="w-full h-full object-contain" />
              </div>

              <h3 className="text-[17px] font-bold text-[#111111] leading-snug mb-2.5">
                {b.title}
              </h3>
         
              <p className="text-[13.5px] text-gray-500 leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
