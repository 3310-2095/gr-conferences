"use client";
import { motion } from "framer-motion";
import {
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineTrophy,
} from "react-icons/hi2";
import { fadeUp, staggerContainer, staggerFast, viewport } from "../lib/animations";

const features = [
  {
    icon: HiOutlineGlobeAlt,
    title: "Global Research Exposure",
    desc: "Present your work to an international audience spanning 50+ countries and leading institutions.",
    accent: "#9d78e2",
    glow: "rgba(157,120,226,0.22)",
    number: "01",
    wide: true,
  },
  {
    icon: HiOutlineUserGroup,
    title: "International Collaboration",
    desc: "Connect with researchers, reviewers and academics from across the globe.",
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.22)",
    number: "02",
    wide: false,
  },
  {
    icon: HiOutlineBookOpen,
    title: "Publication Opportunities",
    desc: "Publish in leading indexed academic databases and peer-reviewed journals.",
    accent: "#4ade80",
    glow: "rgba(74,222,128,0.22)",
    number: "03",
    wide: false,
  },
  {
    icon: HiOutlineBriefcase,
    title: "Industry Connections",
    desc: "Bridge the gap between academia and industry through curated networking.",
    accent: "#fb923c",
    glow: "rgba(251,146,60,0.22)",
    number: "04",
    wide: false,
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Academic Networking",
    desc: "Build lasting professional relationships with peers and thought leaders worldwide.",
    accent: "#f472b6",
    glow: "rgba(244,114,182,0.22)",
    number: "05",
    wide: false,
  },
  {
    icon: HiOutlineTrophy,
    title: "Research Recognition",
    desc: "Gain visibility, awards and recognition for your outstanding contributions.",
    accent: "#fbbf24",
    glow: "rgba(251,191,36,0.22)",
    number: "06",
    wide: true,
  },
];

export default function WhySection() {
  return (
    <section id="why" className="relative py-16 lg:py-20 bg-[#F2EBF2] overflow-hidden">

      {/* top border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9d78e2]/30 to-transparent" />

      {/* ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] bg-[#9d78e2]/5 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] bg-[#38bdf8]/5 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* header */}
        <motion.div
          className="text-center mb-10"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
        >
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-[#9d78e2] text-xs font-bold tracking-[0.18em] uppercase mb-5 bg-[#9d78e2]/10 border border-[#9d78e2]/25 rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9d78e2] animate-pulse inline-block" />
            Why Participate
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
            More Than{" "}
            <span className="bg-gradient-to-r from-[#9d78e2] via-[#b58ffd] to-[#38bdf8] bg-clip-text text-transparent">Conferences</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-base mt-4 max-w-xl mx-auto leading-relaxed">
            A complete ecosystem designed to elevate your research career and global impact.
          </motion.p>
        </motion.div>

        {/* bento grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto"
          variants={staggerFast} initial="hidden" whileInView="show" viewport={viewport}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`why-card group relative rounded-3xl p-5 overflow-hidden cursor-default flex flex-col gap-4 bg-white border border-slate-200 shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-colors duration-300 hover:border-opacity-100 ${ f.wide ? "lg:col-span-2" : "" }`}
              style={{ "--accent": f.accent, "--glow": f.glow } as React.CSSProperties}
            >
              <div className="why-border absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ padding: 1, background: `linear-gradient(135deg, ${f.accent}55, transparent 60%, ${f.accent}33)`, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 0%, ${f.glow} 0%, transparent 65%)` }} />
              <div className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${f.accent}cc, transparent)` }} />
              <div className="flex items-center justify-between">
                <span className="text-[42px] font-black leading-none select-none text-slate-900/[0.04] group-hover:text-slate-900/[0.08] transition-all duration-300" style={{ fontFamily: "'Inter',sans-serif", letterSpacing: "-0.04em" }}>{f.number}</span>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]" style={{ background: f.glow, border: `1px solid ${f.accent}33`, color: f.accent }}>
                  <f.icon size={26} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-900 font-bold text-lg leading-tight tracking-tight" style={{ fontFamily: "'Inter',sans-serif" }}>{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{f.desc}</p>
              </div>
              <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0" style={{ background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)` }} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
