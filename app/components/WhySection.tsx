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

const features = [
  {
    icon: HiOutlineGlobeAlt,
    title: "Global Research Exposure",
    desc: "Present your work to an international audience spanning 50+ countries and leading institutions worldwide. Our platform connects researchers with the right peers, publishers, and academic bodies.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "International Collaboration",
    desc: "Connect with researchers, reviewers and academics from across the globe and build lasting partnerships that transcend borders and disciplines.",
  },
  {
    icon: HiOutlineBookOpen,
    title: "Publication Opportunities",
    desc: "Publish in leading indexed academic databases and peer-reviewed journals with global readership and high citation impact.",
  },
  {
    icon: HiOutlineBriefcase,
    title: "Industry Connections",
    desc: "Bridge the gap between academia and industry through curated networking sessions, workshops, and collaborative research opportunities.",
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Academic Networking",
    desc: "Build lasting professional relationships with peers and thought leaders from every corner of the world through structured and informal networking events.",
  },
  {
    icon: HiOutlineTrophy,
    title: "Research Recognition",
    desc: "Gain visibility, awards and recognition for your outstanding contributions to global academia and be celebrated among the world's best researchers.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhySection() {
  const [active, setActive] = useState<number | null>(null);
  const toggle = (i: number) => setActive(active === i ? null : i);

  return (
    <section id="why" className="relative bg-white border-t border-gray-100">

      <div className="container-custom py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* ── Left: dummy image — sticky so it stays visible as accordion expands ── */}
          <div className="w-full lg:w-[46%] flex-shrink-0 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease }}
              viewport={{ once: true }}
              className="relative w-full aspect-[4/5] rounded-sm overflow-hidden shadow-xl"
            >
              <img
                src="/why.avif"
                alt="Conference networking"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Floating badge */}
             
            </motion.div>
          </div>

          {/* ── Right: title + accordion ── */}
          <div className="flex-1 min-w-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="text-[#520380] text-xs">♦</span>
              <span className="text-xs font-semibold text-[#6B7280] tracking-[0.15em] uppercase">
                Why Participate 
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              viewport={{ once: true }}
              className="text-4xl xl:text-[2.75rem] font-extrabold text-[#111111] tracking-tight leading-[1.12] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
             One Network. {" "}
              <span className="text-[#520380]"> Multiple Conferences.</span>
              <br />Global Impact.
            </motion.h2>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#6B7280] text-base leading-relaxed mb-10 max-w-md"
            >
              A complete ecosystem designed to elevate your research career,
              visibility and global academic impact.
            </motion.p>

            {/* Accordion list */}
            <div>
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease }}
                  viewport={{ once: true }}
                  className="border-b border-gray-100"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <motion.span
                        animate={{ color: active === i ? "#520380" : "#9CA3AF" }}
                        transition={{ duration: 0.25 }}
                        className="flex-shrink-0"
                      >
                        <f.icon size={22} />
                      </motion.span>
                      <span
                        className={`text-[17px] font-semibold transition-colors duration-300 ${
                          active === i
                            ? "text-[#111111]"
                            : "text-[#374151] group-hover:text-[#111111]"
                        }`}
                      >
                        {f.title}
                      </span>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      animate={{
                        rotate: active === i ? 45 : 0,
                        color: active === i ? "#520380" : "#9CA3AF",
                      }}
                      transition={{ duration: 0.3, ease }}
                      className="flex-shrink-0 ml-4"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 7.5H13M13 7.5L8.5 3M13 7.5L8.5 12"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 pb-6 pl-[38px]">
                          <div className="flex-shrink-0 w-[2px] bg-[#520380]/40 self-stretch rounded-full" />
                          <p className="text-[#6B7280] text-[15px] leading-[1.8]">
                            {f.desc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

     

          </div>
        </div>
      </div>
    </section>
  );
}
