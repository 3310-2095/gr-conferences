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

export default function GalleryHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "70svh", paddingTop: 72 }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/banner.jpeg"
          alt=""
          className="w-full h-full object-cover object-center scale-105"
          style={{ filter: "brightness(0.4) saturate(1.1)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(30,5,60,0.85) 0%, rgba(10,2,30,0.68) 50%, rgba(60,10,100,0.58) 100%)",
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
          className="flex flex-col max-w-3xl py-20 lg:py-28"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-7">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/60">
              Gallery
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-white leading-[1.06] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.2vw, 4rem)", fontFamily: "'Playfair Display', serif" }}
          >
            Moments That
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa 0%, #7c3aed 50%, #520380 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Inspire
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
            className="text-[#D1D5DB] text-base lg:text-lg leading-[1.85] max-w-xl"
          >
            Discover the people, places, and experiences that define GR Conferences. From iconic
            host cities to memorable conference moments around the world.
          </motion.p>
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
