"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: 12,  suffix: "",  title: "Conference Brands", desc: "Active across various academic and tech disciplines globally." },
  { value: 100,  suffix: "+",  title: "Countries Reached", desc: "A truly international presence connecting diverse institutions." },
  { value: 500, suffix: "+",  title: "Research Papers",   desc: "High-quality academic publications and impactful journals." },
  { value: 12,  suffix: "K+", title: "Global Members",    desc: "A rapidly growing community of dedicated researchers." },
];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const duration = 2000;
    const steps    = 80;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-120px" });

  // Parallax on image
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-20 lg:py-20 bg-white overflow-hidden border-t border-gray-100"
    >
      {/* Subtle bg glow — fades in */}
      <motion.div
        className="absolute -left-48 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(82,3,128,0.04) 0%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-16 lg:gap-20">

          {/* ── LEFT — Header + Image ── */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between">

            <div className="mb-12">
              {/* Badge — drops from top */}
              <motion.span
                initial={{ opacity: 0, y: -16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.05 }}
                className="text-[#520380] font-bold tracking-[0.12em] uppercase text-[11px] mb-4 flex items-center gap-2"
              >
                <span className="text-[#520380] text-xs">♦</span>
                Let numbers say instead of us
              </motion.span>

              {/* Heading — staggered slide-up with skew */}
              <div className="mb-6 overflow-hidden">
                {["High-quality research ", "from global academic ", "communities."].map((word, i) => (
                  <div key={word} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%", skewY: 6, opacity: 0 }}
                      animate={isInView ? { y: "0%", skewY: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.12 }}
                      className="text-3xl md:text-3xl lg:text-[2.70rem] font-extrabold text-[#111111] leading-[1.15] tracking-tight"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {word}
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Description — clip-path curtain */}
              <motion.p
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={isInView ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : {}}
                transition={{ duration: 0.9, ease, delay: 0.4 }}
                className="text-[#2e2f2f] text-base leading-[1.8] max-w-[480px]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
              >
                For over 10+ years, we've established a global legacy, empowering researchers, academicians, and institutions with world-class conferences and publications.
              </motion.p>
            </div>

            {/* Image — parallax + fade+scale in */}
            <motion.div
              className="relative w-full h-[300px] sm:h-[400px] lg:h-auto lg:flex-1 rounded-[4px] overflow-hidden"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
              style={{ y: imageY }}
            >
              <img
                src="/ourgrowingnetwork.jpg"
                alt="Conference Audience"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle shimmer overlay on load */}
              <motion.div
                className="absolute inset-0 bg-white pointer-events-none"
                initial={{ opacity: 0.3 }}
                animate={isInView ? { opacity: 0 } : {}}
                transition={{ duration: 1.2, ease, delay: 0.3 }}
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
                else if (index === 2) borderClasses += " border-b sm:border-b-0 sm:border-r";

                // Each stat cell: slides from its quadrant direction
                const directions = [
                  { x: -30, y: -30 }, // top-left
                  { x:  30, y: -30 }, // top-right
                  { x: -30, y:  30 }, // bottom-left
                  { x:  30, y:  30 }, // bottom-right
                ];
                const dir = directions[index];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: dir.x, y: dir.y }}
                    animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.2 + index * 0.12 }}
                    className={`py-12 sm:p-10 lg:p-12 flex flex-col justify-center border ${borderClasses}`}
                  >
                    {/* Counter — flip up from below */}
                    <div className="overflow-hidden mb-3">
                      <motion.div
                        className="text-[3.5rem] font-extrabold text-[#111111] leading-none tracking-tighter"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        initial={{ y: "80%", opacity: 0, rotateX: 45 }}
                        animate={isInView ? { y: "0%", opacity: 1, rotateX: 0 } : {}}
                        transition={{ duration: 0.65, ease, delay: 0.25 + index * 0.14 }}
                      >
                        <Counter target={stat.value} suffix={stat.suffix} inView={isInView} />
                      </motion.div>
                    </div>

                    {/* Orange underline draws in */}
                    <motion.div
                      className="h-[2px] bg-[#520380] rounded-full mb-3"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: 32 } : {}}
                      transition={{ duration: 0.6, ease, delay: 0.5 + index * 0.12 }}
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
