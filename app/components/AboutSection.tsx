"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};



export default function AboutSection() {
  const sectionRef = useRef(null);

  // Parallax on globe image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const globeY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 lg:py-20 bg-[#F4F5F7] overflow-hidden"
    >
      {/* Subtle bg glow */}
      <motion.div
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(82,3,128,0.05) 0%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* ── LEFT — Text content ── */}
          <motion.div
            className="w-full lg:w-[55%] flex flex-col gap-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } } }}
          >
            {/* Badge — scale + rotate pop */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.7, rotate: -4 },
                show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease } },
              }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-[7px]  text-[11px] font-bold tracking-[0.12em] uppercase  text-[#520380]">
                <span className="text-[#520380] text-xs">♦</span>
                About Us
              </span>
            </motion.div>

            {/* Heading — each line slides from left with skew */}
            <div className="overflow-hidden">
              <motion.h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold leading-[1.18] tracking-tight">
                <motion.span
                  initial={{ x: -60, opacity: 0, skewX: -8 }}
                  whileInView={{ x: 0, opacity: 1, skewX: 0 }}
                  transition={{ duration: 0.65, ease, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-[#9CA3AF] font-medium block mb-2"
                >
                  We're more than just a conference platform.
                </motion.span>
                <motion.span
                  initial={{ x: -60, opacity: 0, skewX: -8 }}
                  whileInView={{ x: 0, opacity: 1, skewX: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.22 }}
                  viewport={{ once: true }}
                  className="text-[#111111] block"
                >
                  We bring together researchers, academicians, institutions, and industry leaders to create meaningful connections and opportunities across 50+ countries.
                </motion.span>
              </motion.h2>
            </div>

            {/* Description — clip-path curtain reveal */}
            <motion.p
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.35 }}
              viewport={{ once: true }}
              className="text-[#2e2f2f] text-base leading-[1.8] max-w-[480px]"
            >
              We empower researchers, institutions, and professionals worldwide through cutting-edge networking solutions — connecting visionaries and thought leaders across 50+ countries.
            </motion.p>

            {/* Divider — draws from left */}
            <motion.div
              className="h-[3px] rounded-full bg-[#520380]"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 64, opacity: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
              viewport={{ once: true }}
            />

            {/* CTA — fade from left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#conferences"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)", boxShadow: "0 6px 24px rgba(82,3,128,0.35)" }}
                whileHover={{ y: -2, boxShadow: "0 10px 32px rgba(82,3,128,0.50)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                Learn More
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HiArrowRight size={15} />
                </motion.span>
              </motion.a>
            </motion.div>

          </motion.div>

          {/* ── RIGHT — Globe image with parallax ── */}
          <motion.div
            className="w-full lg:w-[45%] flex items-center justify-center"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              className="relative w-full max-w-[520px] aspect-square"
              style={{ y: globeY }}
            >
              <Image
                src="/globle.webp"
                alt="Global Reach"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
