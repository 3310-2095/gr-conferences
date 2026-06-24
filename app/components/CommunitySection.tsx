"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlineMicrophone,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineBuildingOffice2,
  HiArrowUpRight,
} from "react-icons/hi2";

const ease = [0.22, 1, 0.36, 1] as const;


const cards = [
  { icon: HiOutlineDocumentText,    label: "Submit Your Paper",     sub: "Present your research to a global audience. We connect your work with peer reviewers and readers across 50+ countries.", tag: "Authors"  },
  { icon: HiOutlineMagnifyingGlass, label: "Join as Reviewer",      sub: "Shape academic quality by reviewing submissions in your discipline.",                                                     tag: "Reviewers" },
  { icon: HiOutlineMicrophone,      label: "Speak at a Conference",  sub: "Deliver a keynote or workshop at one of our flagship global events.",                                                    tag: "Speakers"  },
  { icon: HiOutlineUserGroup,       label: "Chair a Session",        sub: "Lead and moderate high-impact research discussions across disciplines.",                                                  tag: "Chairs"    },
  { icon: HiOutlineAcademicCap,     label: "Advisory Board",         sub: "Guide our direction and shape the future of academic conferencing.",                                                     tag: "Advisors"  },
];

/* Card style tokens — change these two lines to retheme all cards */
const CARD_BG     = "bg-[#EEECEA]";      /* warm light gray */
const CARD_BORDER = "border-[#DEDAD6]";  /* slightly darker border */

export default function CommunitySection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="community"
      className="bg-white py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-end mb-14 lg:mb-16">

          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="block w-5 h-px bg-[#FF5E3A]" />
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF5E3A]">
                Join the network
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight leading-[0.93] text-[#111]"
            >
              Built by researchers.
              <br />
              <span className="text-[#CCCAC7]">For researchers.</span>
            </motion.h2>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="flex lg:flex-col gap-8 lg:gap-5 pb-1"
          >
        
          </motion.div>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* Featured card — col-span-2 */}
          <motion.a
            href="#join"
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer md:col-span-2 lg:col-span-2 ${CARD_BG} border ${CARD_BORDER} p-8 lg:p-10 flex flex-col justify-between min-h-[280px] lg:min-h-[300px] hover:border-[#FF5E3A]/40 hover:shadow-[0_8px_40px_rgba(255,94,58,0.10)] transition-all duration-500`}
          >
            {/* Halftone dot field */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #FF5E3A 1.2px, transparent 1.2px)",
                backgroundSize: "22px 22px",
                opacity: 0.05,
              }}
            />
            {/* Left sweep */}
            <span aria-hidden="true" className="absolute left-0 top-0 w-[3px] h-0 bg-[#FF5E3A] group-hover:h-full transition-all duration-500 rounded-sm" />

            <div className="relative z-10 flex items-start justify-between mb-auto">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#FF5E3A]/10 border border-[#FF5E3A]/25 group-hover:bg-[#FF5E3A]/20 transition-colors duration-300">
                <HiOutlineDocumentText className="text-[#FF5E3A] text-xl" />
              </div>
              <span className={`text-[10px] font-bold tracking-[0.12em] uppercase text-[#B8B5B2] border ${CARD_BORDER} px-2.5 py-1 rounded-full`}>
                Authors
              </span>
            </div>

            <div className="relative z-10 mt-8">
              <h3 className="text-2xl lg:text-[28px] font-black text-[#111] mb-2.5 tracking-tight leading-tight">
                Submit Your Paper
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed max-w-md">
                Present your research to a global audience. We connect your work with peer reviewers and readers across 50+ countries.
              </p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#111]/25 group-hover:text-[#FF5E3A] transition-colors duration-300">
                Get started
                <HiArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.a>

          {/* 4 normal cards */}
          {cards.slice(1).map((card, i) => (
            <motion.a
              href="#join"
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.35 + i * 0.07 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${CARD_BG} border ${CARD_BORDER} p-7 flex flex-col justify-between min-h-[210px] hover:border-[#FF5E3A]/35 hover:shadow-[0_8px_32px_rgba(255,94,58,0.08)] transition-all duration-500`}
            >
              <span aria-hidden="true" className="absolute left-0 top-0 w-[3px] h-0 bg-[#FF5E3A] group-hover:h-full transition-all duration-500 rounded-sm" />

              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/60 border ${CARD_BORDER} group-hover:border-[#FF5E3A]/30 group-hover:bg-[#FF5E3A]/10 transition-all duration-300`}>
                  <card.icon className="text-[#FF5E3A] text-lg" />
                </div>
                <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-[#C0BDB9]">
                  {card.tag}
                </span>
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-[#111] mb-1.5 tracking-tight leading-snug">
                  {card.label}
                </h3>
                <p className="text-[#9CA3AF] text-xs leading-relaxed">
                  {card.sub}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-[#111]/20 group-hover:text-[#FF5E3A] transition-colors duration-300">
                  Get started
                  <HiArrowUpRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}

          {/* Partner strip — full width */}
          <motion.a
            href="#join"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.65 }}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer col-span-1 md:col-span-2 lg:col-span-3 ${CARD_BG} border ${CARD_BORDER} px-8 py-5 flex items-center justify-between gap-6 hover:border-[#FF5E3A]/35 hover:shadow-[0_8px_32px_rgba(255,94,58,0.08)] transition-all duration-500`}
          >
            <span aria-hidden="true" className="absolute left-0 top-0 w-[3px] h-0 bg-[#FF5E3A] group-hover:h-full transition-all duration-500 rounded-sm" />

            <div className="flex items-center gap-5 relative z-10">
              <div className={`w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center bg-white/60 border ${CARD_BORDER} group-hover:border-[#FF5E3A]/30 group-hover:bg-[#FF5E3A]/10 transition-all duration-300`}>
                <HiOutlineBuildingOffice2 className="text-[#FF5E3A] text-xl" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#111] tracking-tight">Partner with Us</h3>
                <p className="text-[#9CA3AF] text-xs mt-0.5">
                  Institutional and corporate partnerships with our growing global research network.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2.5 text-xs font-bold text-[#111]/20 group-hover:text-[#FF5E3A] transition-colors duration-300 relative z-10">
              <span className="hidden sm:inline">Enquire</span>
              <div className={`w-9 h-9 rounded-full border ${CARD_BORDER} flex items-center justify-center group-hover:border-[#FF5E3A]/40 group-hover:bg-[#FF5E3A]/10 transition-all duration-300`}>
                <HiArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
