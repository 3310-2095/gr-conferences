"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ── Typewriter ──────────────────────────────────────────────────────────────
const LINE1 = "Connecting Global";
const WORDS = ["Research Communities", "Academic Networks",  "Scientific Excellence"];

const TYPE_MS   = 85;
const DELETE_MS = 42;
const HOLD_MS   = 1400;
const GAP_MS    = 380;
const LINE1_GAP = 320; // pause between line1 finishing and line2 starting

type Phase = "wait" | "type1" | "gap1" | "type2" | "hold" | "delete" | "gap2";

function useHeadingTyped() {
  const [line1,    setLine1]   = useState("");
  const [line2,    setLine2]   = useState("");
  const [line1Done, setL1Done] = useState(false);
  const [phase,    setPhase]   = useState<Phase>("wait");
  const [wIdx,     setWIdx]    = useState(0);
  const [cursor,   setCursor]  = useState(true);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    switch (phase) {
      case "wait":
        t = setTimeout(() => setPhase("type1"), 600);
        break;
      case "type1":
        if (line1.length < LINE1.length) {
          t = setTimeout(() => setLine1(LINE1.slice(0, line1.length + 1)), TYPE_MS);
        } else {
          setL1Done(true);
          setPhase("gap1");
        }
        break;
      case "gap1":
        t = setTimeout(() => setPhase("type2"), LINE1_GAP);
        break;
      case "type2": {
        const word = WORDS[wIdx];
        if (line2.length < word.length) {
          t = setTimeout(() => setLine2(word.slice(0, line2.length + 1)), TYPE_MS);
        } else {
          setPhase("hold");
        }
        break;
      }
      case "hold":
        t = setTimeout(() => setPhase("delete"), HOLD_MS);
        break;
      case "delete": {
        const word = WORDS[wIdx];
        if (line2.length > 0) {
          t = setTimeout(() => setLine2(word.slice(0, line2.length - 1)), DELETE_MS);
        } else {
          setPhase("gap2");
        }
        break;
      }
      case "gap2":
        t = setTimeout(() => {
          setWIdx((i) => (i + 1) % WORDS.length);
          setPhase("type2");
        }, GAP_MS);
        break;
    }
    return () => clearTimeout(t);
  }, [line1, line2, phase, wIdx]);

  useEffect(() => {
    const id = setInterval(() => setCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return { line1, line2, line1Done, cursor, activeLine: line1Done ? "line2" : "line1" };
}
// ────────────────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.4 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const lineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 1, ease, delay: 0.2 } },
};

export default function HeroSection() {
  const { line1, line2, line1Done, cursor, activeLine } = useHeadingTyped();

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: 72 }}
    >
      {/* ── Background ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/banner.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Deep dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(5,0,15,0.72)" }} />

        {/* Bottom vignette for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(5,0,15,0.85) 0%, rgba(5,0,15,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `radial-gradient(rgba(82,3,128,0.35) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </motion.div>

      {/* Purple glow — bottom centre */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(82,3,128,0.35) 0%, transparent 65%)",
        }}
      />

      {/* ── Content ── */}
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >

          {/* Top label with lines */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <motion.div
              className="h-px w-12 bg-[#520380] origin-right"
              variants={lineReveal}
            />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/50">
              Global Research Network
            </span>
            <motion.div
              className="h-px w-12 bg-[#520380] origin-left"
              variants={lineReveal}
            />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-white leading-[1.05] tracking-tight mb-6"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 4px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Line 1 — types in once, then stays */}
            {line1}
            {activeLine === "line1" && (
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: "3px",
                  marginLeft: "3px",
                  verticalAlign: "baseline",
                  background: "#ffffff",
                  borderRadius: "2px",
                  opacity: cursor ? 1 : 0,
                  transition: "opacity 0.1s",
                  height: "0.85em",
                  transform: "translateY(0.08em)",
                }}
              />
            )}
            {line1Done && <br />}

            {/* Line 2 — gradient text, cycles through words */}
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa, #7c3aed, #520380)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {line2}
            </span>
            {/* Cursor outside gradient span — WebkitTextFillColor:transparent hides it inside */}
            {activeLine === "line2" && (
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: "3px",
                  marginLeft: "4px",
                  verticalAlign: "baseline",
                  background: "linear-gradient(180deg, #a78bfa, #7c3aed)",
                  borderRadius: "2px",
                  opacity: cursor ? 1 : 0,
                  transition: "opacity 0.1s",
                  height: "0.85em",
                  transform: "translateY(0.08em)",
                }}
              />
            )}
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="w-16 h-[2px] bg-[#520380] mb-7 rounded-full"
          />

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-base lg:text-lg leading-relaxed max-w-2xl"
          >
            One platform connecting researchers, reviewers, speakers and institutions
            through a growing ecosystem of international academic conferences across 50+ countries.
          </motion.p>

        </motion.div>
      </div>

      {/* Bottom edge fade */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
      />
    </section>
  );
}
