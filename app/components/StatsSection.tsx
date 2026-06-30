"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: 12,  suffix: "+",   title: "Conference Brands", desc: "Active across various academic and tech disciplines globally." },
  { value: 125, suffix: "+",  title: "Countries Reached", desc: "A truly international presence connecting diverse institutions." },
  { value: 25, suffix: "K+",  title: "Research Papers",   desc: "High-quality academic publications and impactful journals." },
  { value: 100,  suffix: "K+", title: "Community Members",    desc: "A rapidly growing community of dedicated researchers." },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease, delay },
  };
}

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

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-20 bg-white overflow-hidden border-t border-gray-100"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-stretch gap-16 lg:gap-20">

          {/* ── LEFT — Header + Image ── */}
          <div className="w-full lg:w-[45%] flex flex-col">

            <div className="mb-10">
              <motion.span
                {...fadeUp(0.05)}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="text-[#520380] font-bold tracking-[0.12em] uppercase text-[11px] mb-4 flex items-center gap-2"
              >
                <span className="text-xs">♦</span>
                Let numbers say instead of us
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.1 }}
                className="text-3xl lg:text-[2.6rem] font-extrabold text-[#111111] leading-[1.2] tracking-tight mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                High-quality research<br />
                from global academic<br />
                communities.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.2 }}
                className="text-[#6B7280] text-base leading-[1.8] max-w-[480px]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
              >
                For over 10+ years, we've established a global legacy, empowering researchers, academicians, and institutions with world-class conferences and publications.
              </motion.p>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease, delay: 0.25 }}
              className="relative w-full rounded-[6px] overflow-hidden flex-1"
              style={{ minHeight: 280 }}
            >
              <img
                src="/ourgrowingnetwork.jpg"
                alt="Conference Audience"
                className="w-full h-full object-cover object-center"
                style={{ display: "block", minHeight: 280 }}
              />
            </motion.div>
          </div>

          {/* ── RIGHT — 2×2 Stats Grid ── */}
          <div className="w-full lg:w-[55%] flex items-center">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2">
              {stats.map((stat, index) => {
                let borderClasses = "border-gray-100";
                if (index === 0) borderClasses += " border-b sm:border-r";
                else if (index === 1) borderClasses += " border-b";
                else if (index === 2) borderClasses += " sm:border-r";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, ease, delay: 0.15 + index * 0.1 }}
                    className={`py-12 sm:p-10 lg:p-12 flex flex-col justify-center border ${borderClasses}`}
                  >
                    <div className="text-[3.5rem] font-extrabold text-[#111111] leading-none tracking-tighter mb-3"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      <Counter target={stat.value} suffix={stat.suffix} inView={isInView} />
                    </div>

                    <motion.div
                      className="h-[2px] bg-[#520380] rounded-full mb-3"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: 32 } : {}}
                      transition={{ duration: 0.5, ease, delay: 0.4 + index * 0.1 }}
                    />

                    <h3 className="text-[#111111] text-lg font-bold mb-2">{stat.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed max-w-[250px]">{stat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
