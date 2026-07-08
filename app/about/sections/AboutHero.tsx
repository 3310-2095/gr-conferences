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

export default function AboutHero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden scroll-mt-24"
      style={{ minHeight: "100svh", paddingTop: 72 }}
    >
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ourgrowingnetwork.jpg"
          alt=""
          className="w-full h-full object-cover object-center scale-105"
          style={{ filter: "brightness(0.45) saturate(1.1)" }}
        />
        {/* Deep purple-tinted gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(30,5,60,0.82) 0%, rgba(10,2,30,0.65) 50%, rgba(60,10,100,0.55) 100%)",
          }}
        />
        {/* Bottom fade to next section bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #121212 0%, transparent 40%)",
          }}
        />
        {/* Dot grid on top of image */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
       
        />
      </div>

      {/* ── Ambient colour glows ── */}
 
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(124,58,237,0.25) 0%, transparent 65%)" }}
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16 lg:py-24 items-center">

          {/* ── LEFT — Text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-7">
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/60">
                About GR Conferences
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="font-extrabold text-white leading-[1.06] tracking-tight mb-6"
              style={{
                fontSize: "clamp(2.2rem, 4.2vw, 4rem)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              More than a decade of
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #a78bfa 0%, #7c3aed 50%, #520380 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Connecting Researchers
              </span>
              <br />
              Across Borders.
            </motion.h1>

            {/* Divider */}
            <motion.div
              variants={{
                hidden: { width: 0, opacity: 0 },
                show: { width: 56, opacity: 1, transition: { duration: 0.8, ease, delay: 0.1 } },
              }}
              className="h-[3px] bg-[#520380] rounded-full mb-7"
            />

            {/* Body */}
            <motion.p
              variants={fadeUp}
              className="text-[#D1D5DB] text-base lg:text-lg leading-[1.85] max-w-lg mb-10"
            >
              What started as a single conference in 2014 has grown into a global
              ecosystem spanning multiple disciplines, countries, and research
              communities  bringing together researchers, institutions, and experts
              through impactful academic events worldwide.
            </motion.p>

            

          
          </motion.div>

         

          {/* Mobile — single image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="lg:hidden relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src="/ourgrowingnetwork.jpg"
              alt="GR Conferences"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(82,3,128,0.25) 0%, transparent 60%)" }}
            />
          </motion.div>

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, #121212, transparent)" }}
      />
    </section>
  );
}
