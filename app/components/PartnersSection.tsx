"use client";
import { motion } from "framer-motion";
import {
  SiIeee, SiElsevier, SiScopus,
  SiUpwork, SiShopify,
} from "react-icons/si";
import { FaWindows, FaArrowRight } from "react-icons/fa6";
import { fadeUp, staggerContainer, viewport } from "../lib/animations";

const partners = [
  "Oxford University", "MIT", "Stanford University", "Cambridge",
  "Harvard University", "Springer", "Elsevier", "IEEE",
  "ACM Digital", "Nature Publishing", "Scopus", "Clarivate", "DBLP", "PubMed",
];

const institutions: { name: string; icon: React.ReactNode; color: string }[] = [
  { name: "upwork",    icon: <SiUpwork size={20} />,   color: "#14A800" },
  { name: "Microsoft", icon: <FaWindows size={18} />,  color: "#00A4EF" },
  { name: "Shopify",   icon: <SiShopify size={20} />,  color: "#95BF47" },
  { name: "Google",    icon: null,                      color: "#4285F4" },
  { name: "IEEE",      icon: <SiIeee size={22} />,     color: "#00629B" },
  { name: "Springer",  icon: null,                      color: "#FF6600" },
  { name: "Elsevier",  icon: <SiElsevier size={20} />, color: "#FF6600" },
  { name: "Scopus",    icon: <SiScopus size={20} />,   color: "#E9711C" },
];

const maskStyle: React.CSSProperties = {
  maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
};

function PartnerPill({ name, index }: { name: string; index: number }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 mx-2.5 shrink-0 bg-white/[0.04] border border-white/[0.08] hover:bg-[#FF5E3A]/10 hover:border-[#FF5E3A]/40 transition-all duration-300 group cursor-default">
      <span className="text-[10px] font-black text-[#FF5E3A]/60 group-hover:text-[#FF5E3A] transition-colors tabular-nums w-5">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="w-px h-3 bg-white/10" />
      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function InstitutionPill({ name, icon, color }: { name: string; icon: React.ReactNode; color: string }) {
  const isGoogle = name === "Google";
  const isSpringer = name === "Springer";
  return (
    <div
      className="flex items-center gap-3 px-6 py-3.5 mx-3 shrink-0 border border-white/[0.08] hover:border-[#FF5E3A]/40 transition-all duration-300 cursor-default group"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <span style={{ color }} className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        {isGoogle ? (
          <span className="text-lg font-black flex">
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
          </span>
        ) : isSpringer ? (
          <span className="text-lg font-black" style={{ color: "#FF6600" }}>S</span>
        ) : icon}
      </span>
      {!isGoogle && (
        <span className="text-white/70 text-sm font-semibold group-hover:text-white transition-colors whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section id="partners" className="relative bg-[#111111] overflow-hidden">

      {/* Top edge */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF5E3A]/30 to-transparent" />

      <div className="flex flex-col lg:flex-row">

        {/* ── Left: Editorial header ── */}
        <motion.div
          className="relative lg:w-[400px] xl:w-[450px] flex-shrink-0 flex flex-col justify-between pl-8 lg:pl-14 pr-0 py-16 lg:py-20 border-b lg:border-b-0  border-white/[0.07]"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
        >
          {/* Glow blob */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF5E3A]/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <motion.span variants={fadeUp} className="text-[#FF5E3A] font-bold tracking-[0.14em] uppercase text-[11px] mb-5 block">
              Partners & Institutions
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Trusted By The<br />
              <span className="text-[#FF5E3A]">World's Best</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm leading-relaxed mb-10 max-w-xs">
              Partnering with leading universities, publishers, research bodies and global institutions worldwide.
            </motion.p>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="flex items-center gap-8 mb-10">
              <div>
                <p className="text-white text-3xl font-extrabold tracking-tight leading-none mb-1">50+</p>
                <p className="text-white/35 text-xs uppercase tracking-widest">Countries</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-white text-3xl font-extrabold tracking-tight leading-none mb-1">120+</p>
                <p className="text-white/35 text-xs uppercase tracking-widest">Institutions</p>
              </div>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#community"
              className="group relative inline-flex items-center gap-3 overflow-hidden font-bold text-white"
              style={{
                padding:       "16px 36px",
                fontSize:      15,
                letterSpacing: "0.01em",
                background:    "linear-gradient(135deg, #FF5E3A 0%, #e04020 100%)",
                borderRadius:  10,
                boxShadow:     "0 4px 24px rgba(255,94,58,0.30), inset 0 1px 0 rgba(255,255,255,0.15)",
                transition:    "box-shadow 0.3s ease, transform 0.3s ease",
              }}
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 0 0 3px rgba(255,94,58,0.25), 0 14px 48px rgba(255,94,58,0.55), inset 0 1px 0 rgba(255,255,255,0.15)";
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 4px 24px rgba(255,94,58,0.30), inset 0 1px 0 rgba(255,255,255,0.15)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Shimmer sweep */}
              <motion.span
                aria-hidden
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{
                  width:      "40%",
                  left:       "-40%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                }}
                variants={{
                  hover: { x: "360%", transition: { duration: 0.55, ease: "easeInOut" } },
                }}
              />

              {/* Pulsing ring on hover */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-[10px] pointer-events-none"
                style={{ border: "2px solid rgba(255,255,255,0.0)" }}
                variants={{
                  hover: {
                    borderColor: "rgba(255,255,255,0.2)",
                    scale: 1.06,
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
              />

              {/* Label — slides up slightly */}
              <motion.span
                className="relative z-10"
                variants={{
                  hover: { y: -1, transition: { duration: 0.2 } },
                }}
              >
                Become a Partner
              </motion.span>

              {/* Arrow — bounces right */}
              <motion.span
                className="relative z-10 flex items-center"
                variants={{
                  hover: {
                    x: [0, 6, 3],
                    transition: { duration: 0.35, ease: "easeOut" },
                  },
                }}
              >
                <FaArrowRight size={14} />
              </motion.span>
            </motion.a>
          </div>

      
        </motion.div>

        {/* ── Right: Marquee tracks ── */}
        <div className="flex-1 flex flex-col justify-center py-14 lg:py-20 gap-3 overflow-hidden">

          {/* Track label */}
          <div className="px-8 lg:px-10 mb-2 flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">Institutional Partners</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Row 1 — partners scroll left */}
          <div style={maskStyle}>
            <div className="flex w-max marquee-left">
              {[...partners, ...partners].map((name, i) => (
                <PartnerPill key={i} name={name} index={i % partners.length} />
              ))}
            </div>
          </div>

          {/* Spacer + label */}
          <div className="px-8 lg:px-10 mt-6 mb-2 flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">Participating Institutions</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Row 2 — institutions scroll right */}
          <div style={maskStyle}>
            <div className="flex w-max marquee-right">
              {[...institutions, ...institutions].map((inst, i) => (
                <InstitutionPill key={i} name={inst.name} icon={inst.icon} color={inst.color} />
              ))}
            </div>
          </div>

          {/* Row 3 — partners scroll left (slower, offset) */}
          <div style={{ ...maskStyle, opacity: 0.4 }} className="mt-3">
            <div className="flex w-max" style={{ animation: "marquee-left 42s linear infinite" }}>
              {[...partners].reverse().concat([...partners].reverse()).map((name, i) => (
                <PartnerPill key={i} name={name} index={(partners.length - 1 - i) % partners.length} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
