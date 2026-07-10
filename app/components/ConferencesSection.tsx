"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, animate, useInView } from "framer-motion";
import { HiArrowRight, HiMapPin, HiCalendarDays, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const ease = [0.22, 1, 0.36, 1] as const;

const conferences = [
  {
    name: "BIOCOM",
    subtitle: "BIOTECHNOLOGY & HEALTH",
    year: "9–11 April 2026",
    location: "Bangkok, Thailand",
    img: "https://images.unsplash.com/photo-1731239027673-1a5c6cd61380?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFuZ2tvayUyMHNreWxpbmV8ZW58MHwxfDB8fHww",
    link: "https://ictisthailand.com/biocom.php",
  },
  {
    name: "ICTIS Thailand",
    subtitle: "ICT & INTELLIGENT SYSTEMS",
    year: "9–11 April 2026",
    location: "Bangkok, Thailand",
    img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80",
    link: "https://ictisthailand.com/index.html",
  },
  {
    name: "ICTIS USA",
    subtitle: "ICT & INTELLIGENT SYSTEMS",
    year: "22–23 May 2026",
    location: "New York, USA",
    img: "/newyork.png",
    link: "https://ictisusa.com",
  },
  {
    name: "TIBS",
    subtitle: "TECHNOLOGY & BUSINESS",
    year: "22–24 June 2026",
    location: "Manila, Philippines",
    img: "/Country/manila/manila-1.jpg",
    link: "https://tibsconf.com",
  },
  {
    name: "ICT4SD",
    subtitle: "SUSTAINABILITY & ICT",
    year: "9–11 July 2026",
    location: "Goa, India",
    img: "https://images.pexels.com/photos/14843534/pexels-photo-14843534.jpeg",
    link: "https://ict4sd.org",
  },
  {
    name: "WORLDS4",
    subtitle: "COMPUTING & SECURITY",
    year: "28–30 July 2026",
    location: "United Kingdom",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    link: "https://www.worlds4.co.uk",
  },
  {
    name: "ISBM",
    subtitle: "BUSINESS & INFORMATION SYSTEMS",
    year: "17–19 September 2026",
    location: "Bangkok, Thailand",
    img: "https://images.unsplash.com/photo-1612161330631-9186c513de7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRoYWlsYW5kJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D",
    link: "https://isbmconf.com",
  },
  {
    name: "MCT4SD",
    subtitle: "COMPUTING & SUSTAINABILITY",
    year: "16–17 November 2026",
    location: "Cape Town, South Africa",
    img: "/capetown.jpg",
    link: "https://mct4sdconf.com",
  },
  {
    name: "ICTCS",
    subtitle: "ICT & AI",
    year: "16–19 December 2026",
    location: "Ahmedabad, India",
    img: "https://images.pexels.com/photos/38319033/pexels-photo-38319033.jpeg",
    link: "https://ictcs.in",
  },
  {
    name: "SMARTCOM",
    subtitle: "SMART COMPUTING & COMMUNICATION",
    year: "27–30 January 2027",
    location: "Udaipur, India",
    img: "/SMARTCOM.jpg",
    link: "https://www.smartcomconference.com",
  },
  {
    name: "ICICT",
    subtitle: "ICT & COMPUTING",
    year: "23–26 February 2027",
    location: "London, UK",
    img: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80",
    link: "https://icict.co.uk",
  },
  {
    name: "APME",
    subtitle: "PHYSICS & ENERGY",
    year: "2027",
    location: "Bangkok, Thailand",
    img: "/thailand.jpg",
    link: "https://apmeconf.com",
  },
];

const CARD_WIDTH = 260;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;
// Clone enough cards at each end to fill the visible area — prevents blank space
const CLONE_COUNT = 4;

export default function ConferencesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const total = conferences.length;

  // Real cards sit at indices [CLONE_COUNT .. CLONE_COUNT+total-1]
  const indexRef = useRef(CLONE_COUNT);
  const currentXRef = useRef(-(CLONE_COUNT * STEP));
  const isAnimatingRef = useRef(false);
  const isPausedRef = useRef(false);
  const dragRef = useRef<{ startX: number; startTrackX: number; moved: boolean } | null>(null);
  const lastDragDelta = useRef(0);

  // [last-4 clones] [12 real cards] [first-4 clones]
  const displayItems = [
    ...conferences.slice(-CLONE_COUNT),
    ...conferences,
    ...conferences.slice(0, CLONE_COUNT),
  ];

  const animateTo = useCallback(async (x: number, instant = false): Promise<void> => {
    if (!trackRef.current) return;
    currentXRef.current = x;
    await animate(
      trackRef.current,
      { x },
      instant ? { duration: 0 } : { duration: 0.65, ease }
    );
  }, []);

  // After animation, silently teleport back to the real card if we're inside clone territory
  const checkBounds = useCallback(() => {
    const idx = indexRef.current;
    if (idx >= CLONE_COUNT + total) {
      const newIdx = idx - total;
      indexRef.current = newIdx;
      animateTo(-(newIdx * STEP), true);
    } else if (idx < CLONE_COUNT) {
      const newIdx = idx + total;
      indexRef.current = newIdx;
      animateTo(-(newIdx * STEP), true);
    }
  }, [total, animateTo]);

  const goNext = useCallback(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    indexRef.current += 1;
    await animateTo(-(indexRef.current * STEP));
    checkBounds();
    isAnimatingRef.current = false;
  }, [animateTo, checkBounds]);

  const goPrev = useCallback(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    indexRef.current -= 1;
    await animateTo(-(indexRef.current * STEP));
    checkBounds();
    isAnimatingRef.current = false;
  }, [animateTo, checkBounds]);

  // Set initial track position to first real card (skip start clones)
  useEffect(() => {
    if (trackRef.current) {
      animate(trackRef.current, { x: -(CLONE_COUNT * STEP) }, { duration: 0 });
    }
  }, []);

  // Auto-scroll after section enters viewport
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      if (!isPausedRef.current) goNext();
    }, 2700);
    return () => clearInterval(timer);
  }, [isInView, goNext]);

  // ── Drag / swipe handlers ──────────────────────────────────────────────────
  // Pointer capture is deferred until real drag movement is confirmed — capturing
  // immediately on pointerdown steals the click event from the nested <a> cards,
  // which is why a plain click on a card would silently do nothing.
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isPausedRef.current = true;
    lastDragDelta.current = 0;
    dragRef.current = { startX: e.clientX, startTrackX: currentXRef.current, moved: false };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || !trackRef.current) return;
    const delta = e.clientX - dragRef.current.startX;
    lastDragDelta.current = delta;
    if (Math.abs(delta) > 5 && !dragRef.current.moved) {
      dragRef.current.moved = true;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    }
    if (!dragRef.current.moved) return;
    const newX = dragRef.current.startTrackX + delta;
    currentXRef.current = newX;
    animate(trackRef.current, { x: newX }, { duration: 0 });
  }, []);

  const handlePointerUp = useCallback((_e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const { moved } = dragRef.current;
    const delta = lastDragDelta.current;
    dragRef.current = null;
    isPausedRef.current = false;

    if (moved && Math.abs(delta) > 60) {
      if (delta < 0) goNext();
      else goPrev();
    } else if (moved) {
      // Small drag — snap back to current card
      animateTo(-(indexRef.current * STEP));
    }
  }, [goNext, goPrev, animateTo]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7f7]  py-16 lg:py-28"
      style={{ boxShadow: "0 -12px 32px 0 rgba(0,0,0,0.12)" }}
    >
      {/* ── Background watermark ── */}
      <motion.img
        src="/favicon.png"
        alt=""
        aria-hidden="true"
        initial={{ x: "80vw", opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 0.04 } : {}}
        transition={{ duration: 1.2, ease }}
        className="absolute bottom-0 left-56 h-52 w-auto pointer-events-none select-none brightness-0"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative z-10 grid lg:grid-cols-[340px_1fr] gap-2 items-center">

          {/* ── LEFT CONTENT ── */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: -20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.1em] uppercase text-[#111] mb-6 self-start"
            >
                              <span className="text-[#520380] text-xs">♦</span>

              CONFERENCES 2026
            </motion.span>

            <div className="overflow-hidden mb-6">
              {["Connecting", "Research", "Communities"].map((word, i) => (
                <motion.div
                  key={word}
                  variants={{
                    hidden: { opacity: 0, filter: "blur(12px)", scale: 1.08 },
                    show: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.7, ease, delay: i * 0.12 } },
                  }}
                  className="text-[42px] lg:text-[52px] leading-[1.05] font-black tracking-tight text-[#111]"
                >
                  {word}
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
              }}
              className="text-[#6B7280] text-base leading-relaxed max-w-[320px] mb-10"
            >
              Discover our world-class academic conferences across technology, sustainability, business, and emerging disciplines.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
              }}
            >
              <motion.a
                href="/calendar"
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

          {/* ── RIGHT — Carousel ── */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            {/* Prev / Next navigation */}
            <div className="flex justify-end gap-2 pr-1">
              <motion.button
                onClick={goPrev}
                whileHover={{ scale: 1.08, boxShadow: "0 8px 24px rgba(82,3,128,0.45)" }}
                whileTap={{ scale: 0.93 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)" }}
                aria-label="Previous conference"
              >
                <HiChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={goNext}
                whileHover={{ scale: 1.08, boxShadow: "0 8px 24px rgba(82,3,128,0.45)" }}
                whileTap={{ scale: 0.93 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)" }}
                aria-label="Next conference"
              >
                <HiChevronRight size={18} />
              </motion.button>
            </div>

            {/* Track — drag/swipe to scroll */}
            <div
              className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div
                ref={trackRef}
                className="flex gap-4 w-max will-change-transform"
                style={{ transform: `translateX(${-(CLONE_COUNT * STEP)}px)` }}
              >
                {displayItems.map((conf, idx) => (
                  <a
                    key={idx}
                    href={conf.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    onClick={(e) => {
                      // Prevent navigation when the user was dragging
                      if (Math.abs(lastDragDelta.current) > 5) e.preventDefault();
                    }}
                    className="group relative w-65 h-90 overflow-hidden rounded-[20px] shrink-0"
                  >
                    <img
                      src={conf.img}
                      alt={conf.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <div className="flex items-center gap-2 mb-1 text-xs opacity-90">
                        <HiMapPin size={12} /> {conf.location}
                      </div>
                      <div className="flex items-center gap-2 mb-3 text-xs opacity-90">
                        <HiCalendarDays size={12} /> {conf.year}
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{conf.name}</h3>
                      <p className="uppercase tracking-widest text-white/70 text-[10px] font-semibold">{conf.subtitle}</p>
                      <div className="mt-3 flex items-center gap-2 text-[#c084fc] font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-300">
                        visit conference <HiArrowRight size={14} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
