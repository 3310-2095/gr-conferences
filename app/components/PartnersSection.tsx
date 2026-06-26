"use client";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { fadeUp, staggerContainer, viewport } from "../lib/animations";

const partnerLogos = [
  "Oxford University", "MIT", "Stanford University", "Cambridge",
  "Harvard University", "Springer", "Elsevier", "IEEE",
  "ACM Digital", "Nature Publishing", "Scopus", "Clarivate", "DBLP", "PubMed",
];

const institutionLogos = [
  "University of Tokyo", "ETH Zurich", "NUS Singapore", "TU Munich",
  "KAIST", "IIT Bombay", "University of Toronto", "EPFL",
  "Peking University", "Seoul National University", "UNSW Sydney", "UCL London",
];

const maskStyle: React.CSSProperties = {
  maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
};

function LogoItem({ name, dim }: { name: string; dim?: boolean }) {
  return (
    <span
      className={`mx-10 shrink-0 text-sm font-bold uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-300 cursor-default ${
        dim ? "text-white/20 hover:text-white/50" : "text-white/30 hover:text-white/70"
      }`}
    >
      {name}
    </span>
  );
}

function Divider() {
  return <span className="mx-6 shrink-0 text-white/10 text-lg select-none">·</span>;
}

export default function PartnersSection() {
  return (
    <section id="partners" className="relative bg-[#111111] overflow-hidden">

      {/* Top edge */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col lg:flex-row">

        {/* ── Left: Editorial header ── */}
        <motion.div
          className="relative lg:w-[400px] xl:w-[450px] flex-shrink-0 flex flex-col justify-between pl-8 lg:pl-14 pr-8 py-16 lg:py-20 border-b lg:border-b-0 border-r border-white/[0.07]"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#520380]/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <motion.span variants={fadeUp} className="text-[#520380] font-bold tracking-[0.14em] uppercase text-[11px] mb-5 flex items-center gap-2">
              <span className="text-[#520380] text-xs">♦</span>
              Partners & Institutions
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Trusted By The<br />
              <span className="text-[#520380]">World's Best</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm leading-relaxed mb-10 max-w-xs">
              Partnering with leading universities, publishers, research bodies and global institutions worldwide.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-8 mb-10">
              <div>
                <p className="text-white text-3xl font-extrabold tracking-tight leading-none mb-1">100+</p>
                <p className="text-white/35 text-xs uppercase tracking-widest">Countries</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-white text-3xl font-extrabold tracking-tight leading-none mb-1">1500+</p>
                <p className="text-white/35 text-xs uppercase tracking-widest">Institutions</p>
              </div>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#community"
              className="group inline-flex items-center gap-3 font-bold text-white transition-all duration-300"
              style={{
                padding: "14px 32px",
                fontSize: 14,
                background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)",
                borderRadius: 10,
                boxShadow: "0 4px 24px rgba(82,3,128,0.30)",
              }}
              whileHover={{ y: -2, boxShadow: "0 10px 36px rgba(82,3,128,0.50)" }}
              whileTap={{ scale: 0.97 }}
            >
              Become a Partner
              <FaArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </motion.div>

        {/* ── Right: Two scrolling rows ── */}
        <div className="flex-1 flex flex-col justify-center py-14 lg:py-20 gap-10 overflow-hidden">

          {/* Row label */}
          <div className="px-8 lg:px-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Institutional Partners</span>
            
          </div>

          {/* Row 1 — scroll left, slower */}
          <div style={maskStyle} className="group/row1">
            <div className="flex w-max" style={{ animation: "scroll-left 35s linear infinite" }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
            >
              {[...partnerLogos, ...partnerLogos].map((name, i) => (
                <span key={i} className="inline-flex items-center">
                  <LogoItem name={name} />
                  <Divider />
                </span>
              ))}
            </div>
          </div>

          {/* Row label */}
          <div className="px-8 lg:px-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Participating Institutions</span>
          </div>

          {/* Row 2 — scroll right, slightly faster */}
          <div style={maskStyle}>
            <div className="flex w-max" style={{ animation: "scroll-right 25s linear infinite" }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
            >
              {[...institutionLogos, ...institutionLogos].map((name, i) => (
                <span key={i} className="inline-flex items-center">
                  <LogoItem name={name} dim />
                  <Divider />
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
