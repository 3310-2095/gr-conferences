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
    desc: "Our quarterly flagship magazine highlighting GR's vision, research ecosystem, conferences, innovations, and global impact — distributed digitally and in print.",
  },
];

export default function Ecosystem() {
  return (
    <section
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #F9F7FF 50%, #F3F4F6 100%)" }}
    >
      {/* Soft bg blobs */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(82,3,128,0.05) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
        >
          <div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-[#520380] text-xs">♦</span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#520380]">
                One Foundation. Many Platforms.
              </span>
            </motion.div>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
              className="text-3xl md:text-4xl lg:text-[3rem] font-extrabold leading-[1.08] tracking-tight text-[#111111]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The{" "}
              <span style={{ color: "#520380" }}>GR Ecosystem</span>
            </motion.h2>
          </div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="text-[#6B7280] text-base leading-relaxed max-w-md lg:text-right"
          >
            Beyond conferences — a complete suite of platforms supporting researchers
            at every stage of their academic journey.
          </motion.p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: i * 0.07 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -5, transition: { duration: 0.25, ease } }}
              className="group relative flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(82,3,128,0.1)",
                boxShadow: "0 2px 12px rgba(82,3,128,0.05)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(82,3,128,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(82,3,128,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(82,3,128,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(82,3,128,0.1)";
              }}
            >
              <div className="flex flex-col flex-1 p-7">
                {/* Icon + tag row */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(82,3,128,0.08)", border: "1px solid rgba(82,3,128,0.15)" }}
                  >
                    <p.Icon size={22} color="#520380" />
                  </div>
                  {/* <span
                    className="text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
                    style={{ background: "rgba(82,3,128,0.07)", color: "#520380", border: "1px solid rgba(82,3,128,0.15)" }}
                  >
                    {p.tag}
                  </span> */}
                </div>

                {/* Title */}
                <h3
                  className="font-extrabold text-xl leading-tight tracking-tight mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#111111" }}
                >
                  {p.title}
                </h3>

                {/* Desc */}
                <p className="text-[#6B7280] text-sm leading-[1.85]">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

  

      </div>
    </section>
  );
}
