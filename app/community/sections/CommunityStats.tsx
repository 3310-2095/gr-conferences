"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HiMapPin } from "react-icons/hi2";
import {
  HiOutlinePencilSquare, HiOutlineDocumentMagnifyingGlass, HiOutlineMicrophone,
  HiOutlineUserGroup, HiOutlineGlobeAlt, HiOutlineUsers,
} from "react-icons/hi2";
import { IconType } from "react-icons";
import { featuredMembers } from "../../lib/communityMembers";

const ease = [0.22, 1, 0.36, 1] as const;

const stats: { value: number; suffix: string; label: string; Icon: IconType }[] = [
  { value: 100000, suffix: "+", label: "Authors",         Icon: HiOutlinePencilSquare },
  { value: 4200,   suffix: "+", label: "Reviewers",       Icon: HiOutlineDocumentMagnifyingGlass },
  { value: 200,    suffix: "+", label: "Speakers",        Icon: HiOutlineMicrophone },
  { value: 950,    suffix: "+", label: "Session Chairs",  Icon: HiOutlineUserGroup },
  { value: 150,    suffix: "+", label: "Countries",       Icon: HiOutlineGlobeAlt },
  { value: 350000, suffix: "+", label: "Total Community", Icon: HiOutlineUsers },
];

const members = featuredMembers;

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export default function CommunityStats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          
          <motion.span
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
            
            className="inline-block  text-[#520380] text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-5"
          >

               One Community. Many Opportunities.
          </motion.span>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111111] mb-4"
          >
            
            Meet Our <span className="text-[#520380]">Global Community</span>
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="text-gray-500 text-base max-w-xl"
          >
            A worldwide network of researchers, academics, and professionals driving innovation together.
          </motion.p>
        </motion.div>

        {/* ── Stat Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="relative rounded-[24px] lg:rounded-[28px] overflow-hidden mb-12"
          style={{
            background: "linear-gradient(120deg, #3A025B 0%, #520380 55%, #6B04A8 100%)",
            boxShadow: "0 24px 64px rgba(82,3,128,0.28), 0 4px 16px rgba(0,0,0,0.12)",
          }}
        >
          {/* Decorative glows */}
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -right-16 w-80 h-80 rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat, i) => {
              const brBase = i % 2 !== 1;
              const brSm   = i % 3 !== 2;
              const brLg   = i !== 5;
              const bbBase = i < 4;
              const bbSm   = i < 3;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, ease, delay: 0.15 + i * 0.08 }}
                  className={[
                    "group flex flex-col items-center text-center px-4 py-9 lg:py-11 transition-colors duration-300 hover:bg-white/[0.05]",
                    brBase ? "border-r border-white/10" : "",
                    bbBase ? "border-b border-white/10" : "",
                    brSm ? "sm:border-r" : "sm:border-r-0",
                    bbSm ? "sm:border-b" : "sm:border-b-0",
                    brLg ? "lg:border-r" : "lg:border-r-0",
                    "lg:border-b-0",
                  ].join(" ")}
                >
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4 group-hover:bg-white/20 transition-colors duration-300">
                    <stat.Icon size={20} />
                  </div>

                  {/* Number */}
                  <span
                    className="text-[1.6rem] lg:text-[2rem] font-extrabold text-white leading-none tracking-tight mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    <Counter target={stat.value} suffix={stat.suffix} inView={isInView} />
                  </span>

                  {/* Label */}
                  <span className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.1em] leading-snug">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Members Header ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: "#520380", fontSize: 12 }}>♦</span>
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#520380]">Our People</p>
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-[#111111] tracking-tight">
              Featured Members
            </h3>
          </div>
          <span className="hidden sm:block text-[13px] text-gray-400 font-medium">
            {members.length} members featured
          </span>
        </div>

        {/* ── Member Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: i * 0.05 }}
              viewport={{ once: true, margin: "-40px" }}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(82,3,128,0.08)",
                boxShadow: "0 2px 12px rgba(82,3,128,0.04)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 16px 40px rgba(82,3,128,0.13)";
                el.style.borderColor = "rgba(82,3,128,0.22)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 2px 12px rgba(82,3,128,0.04)";
                el.style.borderColor = "rgba(82,3,128,0.08)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/4] overflow-hidden bg-[#f3eeff]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="px-5 py-4 flex flex-col gap-1">
                <span className="text-[9.5px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(82,3,128,0.5)" }}>
                  {member.tag}
                </span>
                <h3 className="text-[15px] font-semibold leading-snug text-[#111] transition-colors duration-200 group-hover:text-[#520380]">
                  {member.name}
                </h3>
                <p className="text-[12px] text-gray-400 leading-snug">{member.institution}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                  <HiMapPin className="w-3 h-3" /> {member.country}
                </div>
                <div
                  className="mt-2 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-8"
                  style={{ background: "linear-gradient(90deg, #520380, #8b3dff)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
