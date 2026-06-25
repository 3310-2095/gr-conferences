"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ── Animation variants ─────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const badgeAnim = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1,   transition: { duration: 0.55, ease } },
};

const dividerAnim = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease, delay: 0.15 },
  },
};

const statsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ── Data ───────────────────────────────────────────────────── */

const stats = [
  { value: "50+",  label: "Countries Reached" },
  { value: "13+",  label: "Conference Brands" },
  { value: "10K+", label: "Researchers Connected" },
];

/* ── Component ──────────────────────────────────────────────── */

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center overflow-hidden"
      style={{
        minHeight: "100svh",
        paddingTop: 72, /* navbar height */
      }}
    >
      {/* Background Image + overlays — all fade in together */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Actual image — loads instantly with priority */}
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Black overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.65)" }} />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(82,3,128,0.15) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </motion.div>

      {/* Top-centre radial glow */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset:      "0 0 auto 0",
          height:     "70vh",
          background: "radial-gradient(ellipse 75% 55% at 50% -5%, rgba(82,3,128,0.15) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      {/* ── Content ── */}
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10 py-20 lg:py-28 flex items-center justify-between gap-12">

        {/* Stats — left side */}
        <motion.div
          className="flex flex-col items-start gap-8"
          variants={statsContainer}
          initial="hidden"
          animate="show"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-start"
            >
              <span
                className="font-bold leading-none mb-1"
                style={{ color: "#FFFFFF", fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)", letterSpacing: "-0.03em" }}
              >
                {s.value}
              </span>
              <span
                className="text-xs font-medium tracking-wide"
                style={{ color: "#949A9A" }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Right content */}
        <motion.div
          className="flex flex-col items-end text-right"
          style={{ maxWidth: "560px", width: "100%" }}
          variants={container}
          initial="hidden"
          animate="show"
        >

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            style={{
              color:          "#FFFFFF",
              fontSize:       "clamp(2.2rem, 4vw, 3.75rem)",
              fontWeight:     800,
              lineHeight:     1.07,
              letterSpacing:  "-0.03em",
              marginBottom:   "1.5rem",
            }}
          >
            Connecting Global<br />
            <span style={{ color: "#520380" }}>Research Communities</span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            variants={fadeUp}
            style={{
              color:         "#C0C5C5",
              fontSize:      "clamp(0.95rem, 1.2vw, 1.05rem)",
              lineHeight:    1.75,
              marginBottom:  "2.25rem",
            }}
          >
            One platform connecting researchers, reviewers, speakers, institutions
            and innovators through a growing ecosystem of international academic
            conferences across 50+ countries.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-row items-center justify-end gap-3 mb-14"
          >
            <PrimaryBtn href="#conferences">Submit Paper →</PrimaryBtn>
            <OutlineBtn href="#about">Explore Conferences</OutlineBtn>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={dividerAnim}
            className="w-full mb-10"
            style={{
              height:          1,
              background:      "linear-gradient(90deg, transparent, #333333)",
              transformOrigin: "right",
            }}
          />

        </motion.div>
      </div>

      {/* Bottom edge fade */}
      <motion.div
        aria-hidden
        initial="hidden"
        animate="show"
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
      />
    </section>
  );
}

/* ── Button helpers ─────────────────────────────────────────── */

function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
      style={{
        background:  "linear-gradient(135deg, #520380 0%, #3A025B 100%)",
        boxShadow:   "0 4px 24px rgba(82,3,128,0.40), inset 0 1px 0 rgba(255,255,255,0.15)",
        letterSpacing: "0.01em",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 8px 32px rgba(82,3,128,0.55), inset 0 1px 0 rgba(255,255,255,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 24px rgba(82,3,128,0.40), inset 0 1px 0 rgba(255,255,255,0.15)";
      }}
    >
      {children}
    </a>
  );
}

function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
      style={{
        border:        "1.5px solid rgba(255,255,255,0.18)",
        color:         "#FFFFFF",
        background:    "rgba(255,255,255,0.06)",
        backdropFilter:"blur(8px)",
        letterSpacing: "0.01em",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(82,3,128,0.5)";
        el.style.background  = "rgba(82,3,128,0.08)";
        el.style.transform   = "translateY(-2px)";
        el.style.color       = "#520380";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.18)";
        el.style.background  = "rgba(255,255,255,0.06)";
        el.style.transform   = "translateY(0)";
        el.style.color       = "#FFFFFF";
      }}
    >
      {children}
    </a>
  );
}
