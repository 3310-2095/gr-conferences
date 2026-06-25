"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { HiArrowRight, HiMapPin, HiCalendarDays } from "react-icons/hi2";

const ease = [0.22, 1, 0.36, 1] as const;

const conferences = [
  { name: "ICTIS Thailand", subtitle: "GLOBAL NETWORKING",    year: "2025", location: "Bangkok, Thailand",  img: "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?w=800&q=80" },
  { name: "ICTIS USA",      subtitle: "RESEARCH EVENTS",      year: "2025", location: "New York, USA",      img: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&q=80" },
  { name: "ICTCS India",    subtitle: "ACADEMIC CONFERENCES", year: "2025", location: "New Delhi, India",   img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80" },
  { name: "ICICT UK",       subtitle: "TECHNOLOGY SUMMIT",    year: "2025", location: "London, UK",         img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
];

const CARD_WIDTH = 260;
const GAP        = 16;
const STEP       = CARD_WIDTH + GAP;

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.7, ease } },
};

export default function ConferencesSection() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" });
  const total      = conferences.length;

  // Card-by-card auto scroll — starts only after section is in view
  useEffect(() => {
    if (!isInView) return;

    let index = 0;

    const tick = () => {
      index++;
      if (!trackRef.current) return;

      if (index >= total) {
        animate(trackRef.current, { x: -(total * STEP) }, { duration: 0.7, ease }).then(() => {
          if (trackRef.current) animate(trackRef.current, { x: 0 }, { duration: 0 });
        });
        index = 0;
      } else {
        animate(trackRef.current, { x: -(index * STEP) }, { duration: 0.7, ease });
      }
    };

    const timer = setInterval(tick, 2700);
    return () => clearInterval(timer);
  }, [isInView, total]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f7f7f7] py-16 lg:py-28" style={{ boxShadow: "0 -12px 32px 0 rgba(0,0,0,0.12)" }}>

      {/* ── New Events bg text — slides in from right when section enters view ── */}
      <motion.h2
        initial={{ x: "80vw", opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease }}
        className="absolute bottom-[-20px] left-0 text-[11.25rem] leading-[11.25rem] font-bold tracking-[-0.06em] text-black/[0.04] whitespace-nowrap pointer-events-none select-none"
      >
        New Events
      </motion.h2>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative z-10 grid lg:grid-cols-[340px_1fr] gap-2 items-center">

          {/* ── LEFT CONTENT ── */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
          >
            {/* Badge — fade down from top */}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: -20 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.1em] uppercase text-[#111] mb-6 self-start"
              style={{ background: "linear-gradient(to top, #520380 42%, transparent 32%)" }}
            >
              Conferences 2025
            </motion.span>

            {/* Heading — blur + scale reveal per word */}
            <div className="overflow-hidden mb-6">
              {["Global", "Research", "Events"].map((word, i) => (
                <motion.div
                  key={word}
                  variants={{
                    hidden: { opacity: 0, filter: "blur(12px)", scale: 1.08 },
                    show:   { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.7, ease, delay: i * 0.12 } },
                  }}
                  className="text-[42px] lg:text-[52px] leading-[1.05] font-black tracking-tight text-[#111]"
                >
                  {word}
                </motion.div>
              ))}
            </div>

            {/* Description — fade up with blur */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease } },
              }}
              className="text-[#6B7280] text-base leading-relaxed max-w-[320px] mb-10"
            >
              Discover world-class academic conferences, networking events, workshops and global research opportunities.
            </motion.p>

            {/* CTA — scale up from small */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
              }}
            >
              <motion.a
                href="#conferences"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm self-start"
                style={{ background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)", boxShadow: "0 6px 24px rgba(82,3,128,0.35)" }}
                whileHover={{ y: -2, boxShadow: "0 10px 32px rgba(82,3,128,0.50)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                View All Conferences
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HiArrowRight size={15} />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Cards ── */}
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
              {[...conferences, conferences[0]].map((conf, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease, delay: 0.4 + index * 0.1 }}
                  className="group relative w-[260px] h-[360px] overflow-hidden rounded-[20px] flex-shrink-0 cursor-pointer select-none"
                >
                  <img
                    src={conf.img}
                    alt={conf.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex items-center gap-2 mb-1 text-xs opacity-90">
                      <HiMapPin size={12} /> {conf.location}
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-xs opacity-90">
                      <HiCalendarDays size={12} /> {conf.year}
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{conf.name}</h3>
                    <p className="uppercase tracking-widest text-white/70 text-[10px] font-semibold">{conf.subtitle}</p>
                    <div className="mt-3 flex items-center gap-2 text-[#520380] font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-300">
                      Learn More <HiArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
