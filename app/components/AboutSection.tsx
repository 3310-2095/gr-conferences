"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./Map/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-[#520380]/20 border-t-[#520380] animate-spin" />
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

// ─── 3 scroll phases, each ≈ 33 % of total pinned scroll ──────────────────
// Phase 1 : 0.00 → 0.33  — map flies to fullscreen
// Phase 2 : 0.33 → 0.67  — all pins shown (map stays fullscreen)
// Phase 3 : 0.67 → 1.00  — map returns to right side
const TOTAL_PINS = 16;

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

export default function AboutSection() {
  const sectionRef        = useRef<HTMLElement>(null);
  const leftContentRef    = useRef<HTMLDivElement>(null);
  const mapWrapperRef     = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null); // for border-radius animation

  const [visiblePins, setVisiblePins] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | undefined;
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;

    async function initGSAP() {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Bail out if the component unmounted (e.g. fast route change away
      // and back) while the dynamic import above was still in flight —
      // otherwise this would create a trigger nothing will ever clean up.
      if (cancelled) return;

      const section = sectionRef.current;
      if (!section) return;
      if (isMobile()) return;

      // gsap.context() scopes every tween/ScrollTrigger created inside it to
      // `section`. On cleanup, ctx.revert() synchronously kills them and
      // undoes pin-spacers / inline styles — this is what makes remounting
      // the section (e.g. navigating away and back) start from a clean slate
      // instead of racing with an async re-import in the cleanup function.
      ctx = gsap.context(() => {
        const leftContent    = leftContentRef.current;
        const mapWrapper     = mapWrapperRef.current;
        const innerContainer = innerContainerRef.current;
        if (!leftContent || !mapWrapper || !innerContainer) return;

        // ── Metrics: measured once at natural (untransformed) position ────
        const getMetrics = () => {
          const rect     = mapWrapper.getBoundingClientRect();
          const vpCx     = window.innerWidth  / 2;
          const vpCy     = window.innerHeight / 2;
          const elCx     = rect.left + rect.width  / 2;
          const elCy     = rect.top  + rect.height / 2;
          const scaleX   = window.innerWidth  / rect.width;
          const scaleY   = window.innerHeight / rect.height;
          const fillScale = Math.min(scaleX, scaleY) * 0.95; // contain mode
          return { dx: vpCx - elCx, dy: vpCy - elCy, fillScale };
        };

        // ── Master timeline (progress 0 → 1 driven by scrub) ───────────────
        const tl = gsap.timeline({ paused: true });

        // PHASE 1 (0.00 → 0.33) — map flies to fullscreen, text fades out
        tl.to(leftContent, {
          opacity: 0,
          y: -40,
          duration: 0.33,
          ease: "power2.inOut",
        }, 0);

        tl.to(mapWrapper, {
          x: () => getMetrics().dx,
          y: () => getMetrics().dy,
          scale: () => getMetrics().fillScale,
          duration: 0.33,
          ease: "power3.inOut",
        }, 0);

        tl.to(innerContainer, {
          borderRadius: 0,
          duration: 0.33,
          ease: "power2.inOut",
        }, 0);

        // PHASE 2 (0.33 → 0.67) — pins shown via React state; map stays fullscreen
        // No GSAP tweens needed here — the map holds its fullscreen position.

        // PHASE 3 (0.67 → 1.00) — map returns to card, text fades back in
        tl.to(mapWrapper, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.33,
          ease: "power3.inOut",
        }, 0.67);

        tl.to(innerContainer, {
          borderRadius: 0,
          duration: 0.33,
          ease: "power2.inOut",
        }, 0.67);

        tl.to(leftContent, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        }, 0.75);

        // ── ScrollTrigger ───────────────────────────────────────────────────
        ScrollTrigger.create({
          id: "about-pin",
          trigger: section,
          start: "bottom bottom",   // pin once the full section is in view
          end: "+=300%",            // 3 viewport heights of scroll travel
          pin: true,
          anticipatePin: 1,
          scrub: 1.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Drive the timeline
            tl.progress(p);

            // Elevate map above sibling sections during animation
            if (mapWrapperRef.current) {
              mapWrapperRef.current.style.zIndex =
                p > 0.03 && p < 0.97 ? "50" : "10";
            }

            // Pins — all 8 appear at once during phase 2 (map stays fullscreen)
            setVisiblePins(p >= 0.33 && p < 0.67 ? TOTAL_PINS : 0);
          },
          onLeaveBack: () => {
            tl.progress(0);
            setVisiblePins(0);
            if (mapWrapperRef.current) mapWrapperRef.current.style.zIndex = "10";
          },
        });
      }, section);

      // Re-measure against the freshly mounted layout. Without this, a
      // section remounted after client-side navigation (e.g. going to
      // /archives and back) can keep whatever pin start/end was cached from
      // before, which is what produced the janky/incorrect pin behavior.
      refreshTimer = setTimeout(() => {
        if (!cancelled) ScrollTrigger.refresh();
      }, 150);
    }

    initGSAP();

    return () => {
      cancelled = true;
      if (refreshTimer) clearTimeout(refreshTimer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 lg:py-20 bg-white"
      style={{ overflow: "visible" }}
    >
      {/* Subtle right glow — matches original */}
      <motion.div
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(82,3,128,0.05) 0%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />

      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* ── LEFT — text content ───────────────────────────────────── */}
          <div ref={leftContentRef} className="w-full lg:w-[55%]">
            <motion.div
              className="flex flex-col gap-7"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
              }}
            >
              {/* Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.7, rotate: -4 },
                  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease } },
                }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.75 text-[11px] font-bold tracking-[0.12em] uppercase text-[#520380] rounded-full border border-[#520380]/20 bg-[#520380]/6"
                >
                  <span className="text-[#520380] text-xs">♦</span>
                  About Us
                </span>
              </motion.div>

              {/* Heading */}
              <div className="overflow-hidden">
                <motion.h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold leading-[1.18] tracking-tight">
                  <motion.span
                    initial={{ x: -60, opacity: 0, skewX: -8 }}
                    whileInView={{ x: 0, opacity: 1, skewX: 0 }}
                    transition={{ duration: 0.65, ease, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-[#9CA3AF] font-medium block mb-2"
                  >
                    We&apos;re more than just a conference platform.
                  </motion.span>
                  <motion.span
                    initial={{ x: -60, opacity: 0, skewX: -8 }}
                    whileInView={{ x: 0, opacity: 1, skewX: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.22 }}
                    viewport={{ once: true }}
                    className="text-[#111111] block"
                  >
                    We bring together researchers, academicians, institutions,
                    and industry leaders to create meaningful connections and
                    opportunities across 125+ countries.
                  </motion.span>
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{ duration: 0.9, ease, delay: 0.35 }}
                viewport={{ once: true }}
                className="text-[#2e2f2f] text-base leading-[1.8] max-w-120"
              >
              	We empower researchers, institutions, and professionals worldwide through cutting-edge networking solutions, connecting visionaries and thought leaders.
              </motion.p>

              {/* Divider */}
              <motion.div
                className="h-0.75 rounded-full bg-[#520380]"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 64, opacity: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.4 }}
                viewport={{ once: true }}
              />

              {/* CTA — Learn More */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="#conferences"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm"
                  style={{
                    background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)",
                    boxShadow: "0 6px 24px rgba(82,3,128,0.35)",
                  }}
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
          </div>

          {/* ── RIGHT — World Map ─────────────────────────────────────── */}
          <motion.div
            className="w-full lg:w-[45%] flex items-center justify-center"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/*
              mapWrapperRef — GSAP animates this element:
                Phase 1: x/y shift + scale to fill viewport (contain mode)
                Phase 2: ±6 % scale pulse on wrapper only (SVG globe not zoomed)
                Phase 4: returns to x:0 y:0 scale:1

              innerContainerRef — GSAP animates borderRadius in sync with wrapper
                so corners are sharp in fullscreen and rounded at rest.

              overflow: visible on wrapper so pins (taller than the card) show.
              overflow: hidden on inner keeps SVG clipped to the card shape at rest.
            */}
            <div
              ref={mapWrapperRef}
              className="relative w-full max-w-[520px]"
              style={{
                transformOrigin: "center center",
                willChange: "transform",
                overflow: "visible",
                zIndex: 10,
              }}
            >
              <div
                ref={innerContainerRef}
                style={{
                  aspectRatio: "8/5",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <WorldMap visiblePins={visiblePins} interactive={visiblePins > 0} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
