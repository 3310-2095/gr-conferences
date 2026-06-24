"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineTrophy,
} from "react-icons/hi2";
import { fadeUp, staggerContainer, viewport } from "../lib/animations";

const features = [
  {
    icon: HiOutlineGlobeAlt,
    number: "01",
    title: "Global Research Exposure",
    desc: "Present your work to an international audience spanning 50+ countries and leading institutions worldwide.",
  },
  {
    icon: HiOutlineUserGroup,
    number: "02",
    title: "International Collaboration",
    desc: "Connect with researchers, reviewers and academics from across the globe and build lasting partnerships.",
  },
  {
    icon: HiOutlineBookOpen,
    number: "03",
    title: "Publication Opportunities",
    desc: "Publish in leading indexed academic databases and peer-reviewed journals with global readership.",
  },
  {
    icon: HiOutlineBriefcase,
    number: "04",
    title: "Industry Connections",
    desc: "Bridge the gap between academia and industry through curated networking sessions and workshops.",
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    number: "05",
    title: "Academic Networking",
    desc: "Build lasting professional relationships with peers and thought leaders from every corner of the world.",
  },
  {
    icon: HiOutlineTrophy,
    number: "06",
    title: "Research Recognition",
    desc: "Gain visibility, awards and recognition for your outstanding contributions to global academia.",
  },
];

export default function WhySection() {
  const [active, setActive] = useState(0);

  return (
    <section id="why" className="relative overflow-hidden border-t border-gray-100">

      <div className="flex flex-col lg:flex-row">

        {/* ── Left column: accordion ── */}
        <div className="flex-1 bg-white flex flex-col py-20 lg:py-28 px-6 lg:px-14">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              onClick={() => setActive(i)}
              className={`group relative flex flex-col cursor-pointer border-b transition-all duration-300 ${
                active === i
                  ? "bg-[#111111] border-[#FF5E3A]/30"
                  : "bg-transparent border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Active left bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF5E3A]"
                initial={false}
                animate={{ scaleY: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top" }}
              />

              <div className="flex items-center gap-5 px-6 py-6">
                {/* Number */}
                <span className={`text-[11px] font-black tabular-nums tracking-widest transition-colors duration-300 w-6 ${
                  active === i ? "text-[#FF5E3A]" : "text-gray-300"
                }`}>
                  {f.number}
                </span>

                {/* Icon box */}
                <motion.div
                  animate={{
                    background: active === i ? "#FF5E3A" : "#f3f4f6",
                    borderColor: active === i ? "#FF5E3A" : "#e5e7eb",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-11 h-11 flex-shrink-0 flex items-center justify-center border"
                >
                  <motion.span
                    animate={{ color: active === i ? "#ffffff" : "#9CA3AF" }}
                    transition={{ duration: 0.3 }}
                  >
                    <f.icon size={20} />
                  </motion.span>
                </motion.div>

                {/* Title */}
                <h3 className={`flex-1 font-bold text-[15px] tracking-tight transition-colors duration-300 ${
                  active === i ? "text-white" : "text-[#374151]"
                }`}>
                  {f.title}
                </h3>

                {/* Toggle indicator */}
                <motion.div
                  animate={{ rotate: active === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`w-5 h-5 flex-shrink-0 flex items-center justify-center border transition-colors duration-300 ${
                    active === i ? "border-[#FF5E3A] bg-[#FF5E3A]/10" : "border-gray-200"
                  }`}
                >
                  <span className={`text-xs leading-none transition-colors duration-300 ${
                    active === i ? "text-[#FF5E3A]" : "text-gray-400"
                  }`}>+</span>
                </motion.div>
              </div>

              {/* Expandable description */}
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-[#1a1a1a] border-l-[3px] border-[#FF5E3A]"
                  >
                    <p className="text-[#9CA3AF] text-sm leading-relaxed px-6 pb-6 pt-3 pl-[72px]">
                      {f.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* ── Right column: editorial header ── */}
        <motion.div
          className="lg:w-[420px] xl:w-[480px] flex-shrink-0 flex flex-col justify-center py-20 lg:py-28 px-8 lg:px-14 bg-white border-l border-gray-100"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
        >
          {/* Badge — drop from top */}
          <motion.span
            variants={{ hidden: { opacity: 0, y: -16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] as const } } }}
            className="text-[#FF5E3A] font-bold tracking-[0.14em] uppercase text-[11px] mb-4 block"
          >
            Why Participate
          </motion.span>

          {/* Heading — blur+scale reveal */}
          <motion.h2
            variants={{ hidden: { opacity: 0, filter: "blur(10px)", scale: 1.05 }, show: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.7, ease: [0.22,1,0.36,1] as const } } }}
            className="text-4xl xl:text-5xl font-extrabold text-[#111111] tracking-tight leading-[1.1] mb-6"
          >
            More Than<br />
            <span className="text-[#FF5E3A]">Conferences</span>
          </motion.h2>

          {/* Description — clip-path curtain */}
          <motion.p
            variants={{ hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, show: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 0.8, ease: [0.22,1,0.36,1] as const } } }}
            className="text-[#6B7280] text-base leading-relaxed mb-12 max-w-sm"
          >
            A complete ecosystem designed to elevate your research career, visibility and global academic impact.
          </motion.p>

          {/* CTA — scale up */}
          <motion.a
            variants={{ hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22,1,0.36,1] as const } } }}
            href="#community"
            className="group inline-flex items-center gap-3 bg-[#111111] text-white text-sm font-bold px-7 py-4 hover:bg-[#FF5E3A] transition-colors duration-300 self-start"
          >
            Start Participating
            <span className="w-5 h-px bg-white group-hover:w-8 transition-all duration-300" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
