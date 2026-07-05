"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerFast, scaleIn, viewport } from "../../lib/animations";

/* ── Institution data ─────────────────────────────────────────── */
const institutions = [
  { file: "birlainstitute.png",            name: "BITS Pilani Dubai",              region: "Asia" },
  { file: "buffalouniversity.png",         name: "Buffalo University",             region: "North America" },
  { file: "californiastate.png",           name: "California State University",    region: "North America" },
  { file: "chiangmai.png",                 name: "Chiang Mai University",          region: "Asia" },
  { file: "drexeluniversity.png",          name: "Drexel University",              region: "North America" },
  { file: "iimkozhikode.jpg",              name: "IIM Kozhikode",                  region: "Asia" },
  { file: "iitguwahati.png",               name: "IIT Guwahati",                   region: "Asia" },
  { file: "iitkanpur.png",                 name: "IIT Kanpur",                     region: "Asia" },
  { file: "roorkee.png",                   name: "IIT Roorkee",                    region: "Asia" },
  { file: "kingsaud.png",                  name: "King Saud University",           region: "Middle East" },
  { file: "nitwarangal.jpg",               name: "NIT Warangal",                   region: "Asia" },
  { file: "qataruniversity.png",           name: "Qatar University",               region: "Middle East" },
  { file: "thammasatuniversity.jpg",       name: "Thammasat University",           region: "Asia" },
  { file: "univwaterloo.png",              name: "University of Waterloo",         region: "North America" },
  { file: "universitikl.webp",             name: "Universiti Kuala Lumpur",        region: "Asia" },
  { file: "universityofchicago.svg",       name: "University of Chicago",          region: "North America" },
  { file: "universityofflorida.png",       name: "University of Florida",          region: "North America" },
  { file: "universityofjohannesburg.svg",  name: "University of Johannesburg",     region: "Africa" },
  { file: "universityofliverpool.svg",     name: "University of Liverpool",        region: "Europe" },
  { file: "universityofreading.png",       name: "University of Reading",          region: "Europe" },
  { file: "universityoftoronto.webp",      name: "University of Toronto",          region: "North America" },
  { file: "virginiatech.svg",              name: "Virginia Tech",                  region: "North America" },
  { file: "washingtonstateuniversity.svg", name: "Washington State University",    region: "North America" },
];

const regions = ["All", "Asia", "North America", "Europe", "Middle East", "Africa"];

/* ── Stats ────────────────────────────────────────────────────── */
const stats = [
  { value: "5,000+",   label: "Institutions" },
  { value: "125+",     label: "Countries" },
  { value: "23",       label: "Featured Partners" },
  { value: "350,000+", label: "Researchers" },
];

/* ── Logo Card ───────────────────────────────────────────────── */
function LogoCard({ file, name, index }: { file: string; name: string; index: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl cursor-default select-none"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "28px 20px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(82,3,128,0.45)";
        el.style.boxShadow = "0 8px 32px rgba(82,3,128,0.18), 0 0 0 1px rgba(82,3,128,0.12)";
        el.style.background = "rgba(82,3,128,0.06)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.boxShadow = "none";
        el.style.background = "rgba(255,255,255,0.03)";
      }}
    >
      {/* Purple corner accent */}
      <div
        className="absolute top-0 right-0 w-12 h-12 rounded-bl-2xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(82,3,128,0.4), rgba(124,58,237,0.2))" }}
      />

      {/* Logo */}
      <div className="relative flex items-center justify-center w-full" style={{ height: 60 }}>
        {failed ? (
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/30 text-center leading-tight px-2">
            {name}
          </span>
        ) : (
          <img
            src={`/conf logo/${file}`}
            alt={name}
            draggable={false}
            onError={() => setFailed(true)}
            className="object-contain opacity-60 group-hover:opacity-90 transition-opacity duration-300"
            style={{ maxHeight: 56, maxWidth: "100%", width: "auto", filter: "brightness(0) invert(1)" }}
          />
        )}
      </div>

      {/* Institution name */}
      <p className="text-white/40 group-hover:text-white/70 text-[11px] font-semibold uppercase tracking-[0.1em] text-center leading-tight transition-colors duration-300">
        {name}
      </p>
    </motion.div>
  );
}

/* ── Main Section ─────────────────────────────────────────────── */
export default function TrustedInstitutions() {
  const [activeRegion, setActiveRegion] = useState("All");

  const filtered =
    activeRegion === "All"
      ? institutions
      : institutions.filter((inst) => inst.region === activeRegion);

  return (
    <section
      id="trusted-institutions"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #121212 0%, #0e0a18 40%, #120d1f 70%, #121212 100%)",
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
    >
      {/* ── Decorative glows ── */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(82,3,128,0.14) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(82,3,128,0.06) 0%, transparent 65%)" }}
      />

      {/* ── Top edge ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col items-center text-center mb-16"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
            <span
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full"
              style={{
                color: "#a78bfa",
                background: "rgba(82,3,128,0.15)",
                border: "1px solid rgba(82,3,128,0.3)",
              }}
            >
              <span style={{ color: "#520380" }}>♦</span>
              Institutional Partners
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-extrabold text-white leading-tight tracking-tight mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
            }}
          >
            Trusted by Institutions{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa 0%, #7c3aed 55%, #520380 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Worldwide
            </span>
          </motion.h2>

          {/* Divider bar */}
          <motion.div
            variants={{
              hidden: { width: 0, opacity: 0 },
              show: { width: 56, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="h-[3px] rounded-full mb-6"
            style={{ background: "linear-gradient(90deg, #520380, #a78bfa)" }}
          />

          <motion.p
            variants={fadeUp}
            className="text-white/50 text-base lg:text-[17px] leading-relaxed max-w-2xl"
          >
            Leading universities, research bodies, and global institutions rely on GR Conferences
            to advance scholarly collaboration and knowledge exchange across disciplines.
          </motion.p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-16 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <span
                className="font-extrabold leading-none mb-1.5"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </span>
              <span className="text-white/35 text-[11px] font-bold uppercase tracking-[0.18em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Region filter tabs ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className="text-[11px] font-bold uppercase tracking-[0.16em] px-4 py-2 rounded-full transition-all duration-200"
              style={
                activeRegion === region
                  ? {
                      background: "linear-gradient(135deg, #520380, #3a025b)",
                      color: "#ffffff",
                      boxShadow: "0 4px 16px rgba(82,3,128,0.35)",
                      border: "1px solid rgba(82,3,128,0.5)",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.4)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
            >
              {region}
            </button>
          ))}
        </motion.div>

        {/* ── Logo grid ── */}
        <motion.div
          key={activeRegion}
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          {filtered.map((inst, i) => (
            <LogoCard key={inst.file} file={inst.file} name={inst.name} index={i} />
          ))}
        </motion.div>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <p className="text-white/25 text-sm font-medium">No institutions in this region yet.</p>
          </motion.div>
        )}

        {/* ── Bottom CTA strip ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
          style={{
            background: "rgba(82,3,128,0.08)",
            border: "1px solid rgba(82,3,128,0.2)",
          }}
        >
          <div>
            <p className="text-white font-bold text-[15px] mb-1">
              Is your institution not listed?
            </p>
            <p className="text-white/40 text-sm">
              Join our growing network of global research institutions.
            </p>
          </div>
          <a
            href="/join/partner"
            className="shrink-0 inline-flex items-center gap-2.5 font-bold text-white text-[13px] tracking-wide uppercase px-7 py-3.5 rounded-xl transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #520380 0%, #3a025b 100%)",
              boxShadow: "0 4px 20px rgba(82,3,128,0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(82,3,128,0.55)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(82,3,128,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Partner With Us
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>

      {/* ── Bottom edge ── */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
