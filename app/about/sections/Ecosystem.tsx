"use client";

import { motion } from "framer-motion";
import { MdGroups } from "react-icons/md";
import { PiBookOpenTextBold } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { TbNetwork } from "react-icons/tb";
import { RiBarChartBoxLine } from "react-icons/ri";
import { LuNewspaper } from "react-icons/lu";
import { IconType } from "react-icons";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars: { tag: string; Icon: IconType; title: string; desc: string }[] = [
  {
    tag: "Conferences",
    Icon: MdGroups,
    title: "GR Conferences",
    desc: "International conferences bringing together researchers, academics, and industry professionals to exchange ideas, present findings, and build collaborations that extend well beyond the event itself.",
  },
  {
    tag: "Journals",
    Icon: PiBookOpenTextBold,
    title: "GR Journals",
    desc: "Five rigorously peer-reviewed journals covering AI, data science, ICT, smart sensors, and sustainability. Built for discoverability and long-term archiving.",
  },
  {
    tag: "Author Services",
    Icon: HiOutlinePencilSquare,
    title: "GR Author Services",
    desc: "From manuscript editing and plagiarism checks to formatting and graphical design — built to help you publish with confidence, clarity, and speed.",
  },
  {
    tag: "Connect",
    Icon: TbNetwork,
    title: "GR Connect",
    desc: "A global research networking platform connecting researchers, academics, students, and industry experts through chat, messaging, and video consultations.",
  },
  {
    tag: "Quotient",
    Icon: RiBarChartBoxLine,
    title: "GR Quotient",
    desc: "A smart academic credibility and impact scoring system evaluating researchers through publications, citations, peer reviews, and real-world influence.",
  },
  {
    tag: "Chronicle",
    Icon: LuNewspaper,
    title: "GR Chronicle",
    desc: "Our quarterly magazine covering ecosystem news, conference updates, interviews, research highlights, and milestones from across the GR network.",
  },
];

export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="relative w-full py-24 lg:py-32 overflow-hidden bg-white scroll-mt-24"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-[#520380] text-xs">♦</span>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#520380]">
              One Foundation. Many Platforms.
            </span>
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] font-light leading-[1.12] tracking-tight text-[#111111]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The <span className="text-[#520380]">GR Ecosystem</span>
          </motion.h2>
        </motion.div>

        {/* ── Pillars Grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden"
          style={{ border: "1px solid rgba(82,3,128,0.1)" }}
        >
          {pillars.map((p, i) => {
            const isOdd = i % 2 === 0;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}
                viewport={{ once: true, margin: "-40px" }}
                className="pillar-card group relative flex flex-col p-10 lg:p-11 cursor-default"
                style={{
                  borderRight: "1px solid rgba(82,3,128,0.1)",
                  borderBottom: "1px solid rgba(82,3,128,0.1)",
                  transition: "background 0.25s ease, box-shadow 0.25s ease",
                }}
                data-odd={isOdd ? "true" : "false"}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (isOdd) {
                    el.style.background = "rgba(82,3,128,0.04)";
                    el.style.boxShadow = "inset 0 3px 0 0 #520380";
                  } else {
                    el.style.background = "#1a0a2e";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "";
                  el.style.boxShadow = "";
                }}
              >
                {/* Tag */}
                <span
                  className="pillar-tag text-[10px] font-semibold uppercase tracking-[0.16em] mb-4 transition-colors duration-200"
                  style={{ color: "rgba(82,3,128,0.45)" }}
                >
                  {p.tag}
                </span>

                {/* Icon */}
                <div className="mb-5">
                  <p.Icon size={28} className="pillar-icon transition-colors duration-200" style={{ color: "#520380" }} />
                </div>

                {/* Title */}
                <h3
                  className="pillar-title text-[22px] font-light leading-snug tracking-tight mb-4 transition-colors duration-200"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#111111" }}
                >
                  {p.title}
                </h3>

                {/* Desc */}
                <p
                  className="pillar-desc text-[13.5px] leading-[1.85] transition-colors duration-200"
                  style={{ color: "#6B7280" }}
                >
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pillar-card:hover .pillar-tag { color: rgba(82,3,128,0.55) !important; }
        .pillar-card[data-odd="false"]:hover .pillar-tag { color: rgba(255,255,255,0.4) !important; }
        .pillar-card[data-odd="false"]:hover .pillar-icon { color: #c084fc !important; }
        .pillar-card[data-odd="false"]:hover .pillar-title { color: #ffffff !important; }
        .pillar-card[data-odd="false"]:hover .pillar-desc { color: rgba(255,255,255,0.45) !important; }
        .pillar-card[data-odd="true"]:hover .pillar-title { color: #520380 !important; }
        .pillar-card[data-odd="true"]:hover .pillar-desc { color: #374151 !important; }
      `}</style>
    </section>
  );
}
