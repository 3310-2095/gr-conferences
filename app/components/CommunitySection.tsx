"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay: i * 0.1 },
  }),
};

const cards = [
  {
    num: "01",
    role: "For Reviewers",
    title: "Shape the quality of global research.",
    desc: "Contribute your expertise in evaluating research and supporting quality academic publications across international conferences.",
    links: [{ label: "Join our Conference Review Committee", href: "/submissions/" }],
  },
  {
    num: "02",
    role: "For Speakers",
    title: "Share your knowledge with the world.",
    desc: "Present your insights, innovations, and research with a global audience of researchers, academicians, and industry professionals.",
    links: [{ label: "Speak at a Conference", href: "/join/reviewer" }],
  },
  {
    num: "03",
    role: "For Session Chairs",
    title: "Lead conversations that inspire change.",
    desc: "Moderate engaging conference sessions, guide discussions, and connect with researchers across diverse fields.",
    links: [{ label: "Chair a Session", href: "/join/editorial-board" }],
  },
  {
    num: "04",
    role: "For Advisory Board",
    title: "Help shape the future of research collaboration.",
    desc: "Bring your expertise and vision to strengthen our conference initiatives and global academic ecosystem.",
    links: [{ label: "Join our Advisory Board", href: "/join/institution" }],
  },
];

export default function CommunitySection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.children[i] as HTMLElement;
    slider.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActive(i);
  };

  const onScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const idx = Math.round(slider.scrollLeft / slider.offsetWidth);
    setActive(idx);
  };

  return (
    <section className="engage-section">
      <div className="engage-shell">

        {/* Label */}
        <motion.p
          className="section-label-engage"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <span style={{ color: "#520380", fontSize: 12 }}>♦</span>
          Join the Community
        </motion.p>

        {/* Intro grid */}
        <motion.div
          className="engage-intro-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.h2 variants={fadeUp} className="engage-heading">
            To Become part of <br />a growing international <br />research community.
          </motion.h2>
       
        </motion.div>

        {/* Desktop grid */}
        <div className="engage-cards-grid">
          {cards.map((card, i) => (
            <motion.article
              key={card.num}
              className="engage-card-new"
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
            >
              <motion.div
                className="engage-num"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                viewport={{ once: true }}
              >
                {card.num}
              </motion.div>
              <p className="engage-role">{card.role}</p>
              <h3 className="engage-title">{card.title}</h3>
              <p className="engage-desc">{card.desc}</p>
              <div className="engage-links">
                {card.links.map((link) => (
                  <Link key={link.href} href={link.href} className="engage-link-new">
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="engage-slider" ref={sliderRef} onScroll={onScroll}>
          {cards.map((card) => (
            <article key={card.num} className="engage-slide">
              <div className="engage-num">{card.num}</div>
              <p className="engage-role">{card.role}</p>
              <h3 className="engage-title">{card.title}</h3>
              <p className="engage-desc">{card.desc}</p>
              <div className="engage-links">
                {card.links.map((link) => (
                  <Link key={link.href} href={link.href} className="engage-link-new">
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className="engage-dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`engage-dot${active === i ? " engage-dot-active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .engage-section {
          padding: 64px 0;
          background: #F9F9F9;
          border-top: 1px solid #ebebeb;
        }
        .engage-shell {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 48px;
        }

        /* ── Label ── */
        .section-label-engage {
          font-size: 11px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #520380;
          font-weight: 700;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label-engage::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e0d6e8;
        }

        /* ── Intro ── */
        .engage-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: end;
          margin-bottom: 40px;
        }
        .engage-heading {
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 800;
          line-height: 1.1;
          color: #111111;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .engage-intro-text {
          font-size: 15px;
          color: #6B7280;
          line-height: 1.75;
          margin: 0;
        }

        /* ── Desktop grid ── */
        .engage-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid #e0d6e8;
          border-radius: 2px;
          overflow: hidden;
        }
        .engage-card-new {
          padding: 44px 36px;
          border-right: 1px solid #e0d6e8;
          transition: background .25s, box-shadow .25s;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }
        .engage-card-new:last-child { border-right: none; }
        .engage-card-new:hover {
          background: #f5eeff;
          box-shadow: inset 0 3px 0 0 #520380;
        }
        .engage-card-new:hover .engage-num { color: #520380; opacity: .3; }
        .engage-card-new:hover .engage-title { color: #3A025B; }

        /* ── Mobile slider (hidden on desktop) ── */
        .engage-slider { display: none; }
        .engage-dots   { display: none; }

        /* ── Shared card internals ── */
        .engage-num {
          font-size: 64px;
          font-weight: 800;
          color: #e0d6e8;
          line-height: 1;
          margin-bottom: 20px;
          transition: color .25s;
          letter-spacing: -0.04em;
        }
        .engage-role {
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #520380;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .engage-title {
          font-size: 20px;
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 14px;
          color: #111111;
          transition: color .25s;
          letter-spacing: -0.01em;
        }
        .engage-desc {
          font-size: 13.5px;
          color: #6B7280;
          line-height: 1.7;
          margin-bottom: 28px;
          flex: 1;
        }
        .engage-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
        }
        .engage-link-new {
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
          font-weight: 700;
          color: #520380;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #520380;
          padding: 9px 16px;
          align-self: flex-start;
          background: transparent;
          transition: background .2s, color .2s, gap .2s;
        }
        .engage-link-new::after { content: '→'; transition: transform .2s; }
        .engage-link-new:hover {
          background: #520380;
          color: #fff;
        }
        .engage-link-new:hover::after { transform: translateX(4px); }

        /* ── 1024px ── */
        @media (max-width: 1024px) {
          .engage-shell { padding: 0 36px; }
          .engage-intro-grid { gap: 48px; }
          .engage-card-new { padding: 36px 28px; }
        }

        /* ── 900px — 2-col grid ── */
        @media (max-width: 900px) {
          .engage-shell { padding: 0 28px; }
          .engage-intro-grid { grid-template-columns: 1fr; gap: 20px; margin-bottom: 32px; }
          .engage-cards-grid { grid-template-columns: 1fr 1fr; }
          .engage-card-new:nth-child(odd)  { border-right: 1px solid #e0d6e8; }
          .engage-card-new:nth-child(even) { border-right: none; }
          .engage-card-new { border-bottom: 1px solid #e0d6e8; }
          .engage-card-new:nth-last-child(-n+2) { border-bottom: none; }
        }

        /* ── 640px — hide grid, show slider ── */
        @media (max-width: 640px) {
          .engage-section { padding: 48px 0; }
          .engage-shell { padding: 0; }
          .section-label-engage { padding: 0 24px; }
          .engage-intro-grid { padding: 0 24px; margin-bottom: 40px; }
          .engage-heading { font-size: clamp(28px, 8vw, 38px); }

          .engage-cards-grid { display: none; }

          .engage-slider {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 0;
            border-top: 1px solid #e0d6e8;
            border-bottom: 1px solid #e0d6e8;
          }
          .engage-slider::-webkit-scrollbar { display: none; }

          .engage-slide {
            flex: 0 0 85vw;
            scroll-snap-align: start;
            padding: 36px 28px;
            border-right: 1px solid #e0d6e8;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            min-height: 360px;
          }
          .engage-slide:last-child { border-right: none; }

          .engage-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 24px;
            padding: 0 24px;
          }
          .engage-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: #e0d6e8;
            cursor: pointer;
            padding: 0;
            transition: background .2s, width .2s;
          }
          .engage-dot-active {
            background: #520380;
            width: 22px;
            border-radius: 4px;
          }
        }

        @media (max-width: 400px) {
          .engage-slide { flex: 0 0 92vw; padding: 28px 20px; }
        }
      `}</style>
    </section>
  );
}
