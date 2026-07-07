"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function PartnersHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: 72 }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Partners  Banner.jpg"
          alt=""
          className="w-full h-full object-cover object-center scale-105"
          style={{ filter: "brightness(0.92) saturate(1.1)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(30,5,60,0.55) 0%, rgba(10,2,30,0.38) 50%, rgba(60,10,100,0.32) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #121212 0%, transparent 40%)" }}
        />
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(124,58,237,0.25) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col max-w-3xl py-16 lg:py-24"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-7">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/60">
              Partners &amp; Institutions
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-white leading-[1.06] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.2vw, 4rem)", fontFamily: "'Playfair Display', serif" }}
          >
            Building
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa 0%, #7c3aed 50%, #520380 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Global Partnerships
            </span>
          </motion.h1>

          <motion.div
            variants={{
              hidden: { width: 0, opacity: 0 },
              show: { width: 56, opacity: 1, transition: { duration: 0.8, ease, delay: 0.1 } },
            }}
            className="h-[3px] bg-[#520380] rounded-full mb-7"
          />

          <motion.p
            variants={fadeUp}
            className="text-[#D1D5DB] text-base lg:text-lg leading-[1.85] max-w-xl mb-10"
          >
            GR Conferences collaborates with universities, publishers, research organizations,
            professional associations, and industry partners to advance research and global
            knowledge exchange.
          </motion.p>

          <motion.div variants={fadeUp}>
            <a
              href="#become-partner"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-sm font-bold text-white transition-all duration-200"
              style={{ background: "#520380" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#6B04A8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#520380"; }}
            >
              Become a Partner
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, #121212, transparent)" }}
      />
    </section>
  );
}
