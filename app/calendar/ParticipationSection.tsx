"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
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
    role: "For Researchers",
    title: "Submit Your Research",
    desc: "Present your ideas at global conferences and connect with leading researchers, academics, and industry professionals worldwide.",
    links: [{ label: "Submit Paper", href: "#conferences" }],
  },
  {
    num: "02",
    role: "For Experts",
    title: "Become a Reviewer",
    desc: "Join our expert review community and contribute your expertise in evaluating research and supporting quality academic publications.",
    links: [{ label: "Become Reviewer", href: "/join/reviewer" }],
  },
  {
    num: "03",
    role: "For Professionals",
    title: "Become a Speaker",
    desc: "Share your expertise with global researchers and present your insights, innovations, and research with an international audience.",
    links: [{ label: "Become Speaker", href: "/join/speaker" }],
  },
];

export default function ParticipationSection() {
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
    <section className="ps-section">
      <div className="ps-shell">

        {/* Label */}
        <motion.p
          className="ps-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <span style={{ color: "#520380", fontSize: 12 }}>♦</span>
          Get Involved
        </motion.p>

        {/* Intro */}
        <motion.div
          className="ps-intro-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.h2 variants={fadeUp} className="ps-heading">
            Join the Conference <br />Community.
          </motion.h2>
        </motion.div>

        {/* Desktop grid */}
        <div className="ps-cards-grid">
          {cards.map((card, i) => (
            <motion.article
              key={card.num}
              className="ps-card"
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
            >
              <motion.div
                className="ps-num"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                viewport={{ once: true }}
              >
                {card.num}
              </motion.div>
              <p className="ps-role">{card.role}</p>
              <h3 className="ps-title">{card.title}</h3>
              <p className="ps-desc">{card.desc}</p>
              <div className="ps-links">
                {card.links.map((link) => (
                  <Link key={link.href} href={link.href} className="ps-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="ps-slider" ref={sliderRef} onScroll={onScroll}>
          {cards.map((card) => (
            <article key={card.num} className="ps-slide">
              <div className="ps-num">{card.num}</div>
              <p className="ps-role">{card.role}</p>
              <h3 className="ps-title">{card.title}</h3>
              <p className="ps-desc">{card.desc}</p>
              <div className="ps-links">
                {card.links.map((link) => (
                  <Link key={link.href} href={link.href} className="ps-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className="ps-dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`ps-dot${active === i ? " ps-dot-active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .ps-section {
          padding: 64px 0;
          background: #F9F9F9;
          border-top: 1px solid #ebebeb;
        }
        .ps-shell {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .ps-label {
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
        .ps-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e0d6e8;
        }

        .ps-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: end;
          margin-bottom: 40px;
        }
        .ps-heading {
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 800;
          line-height: 1.1;
          color: #111111;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .ps-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid #e0d6e8;
          border-radius: 2px;
          overflow: hidden;
        }
        .ps-card {
          padding: 44px 36px;
          border-right: 1px solid #e0d6e8;
          transition: background .25s, box-shadow .25s;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }
        .ps-card:last-child { border-right: none; }
        .ps-card:hover {
          background: #f5eeff;
          box-shadow: inset 0 3px 0 0 #520380;
        }
        .ps-card:hover .ps-num { color: #520380; opacity: .3; }
        .ps-card:hover .ps-title { color: #3A025B; }

        .ps-slider { display: none; }
        .ps-dots   { display: none; }

        .ps-num {
          font-size: 64px;
          font-weight: 800;
          color: #e0d6e8;
          line-height: 1;
          margin-bottom: 20px;
          transition: color .25s;
          letter-spacing: -0.04em;
        }
        .ps-role {
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #520380;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .ps-title {
          font-size: 20px;
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 14px;
          color: #111111;
          transition: color .25s;
          letter-spacing: -0.01em;
        }
        .ps-desc {
          font-size: 13.5px;
          color: #6B7280;
          line-height: 1.7;
          margin-bottom: 28px;
          flex: 1;
        }
        .ps-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
        }
        .ps-link {
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
        .ps-link::after { content: '→'; transition: transform .2s; }
        .ps-link:hover { background: #520380; color: #fff; }
        .ps-link:hover::after { transform: translateX(4px); }

        @media (max-width: 1024px) {
          .ps-shell { padding: 0 36px; }
          .ps-intro-grid { gap: 48px; }
          .ps-card { padding: 36px 28px; }
        }

        @media (max-width: 768px) {
          .ps-shell { padding: 0 28px; }
          .ps-intro-grid { grid-template-columns: 1fr; gap: 20px; margin-bottom: 32px; }
          .ps-cards-grid { grid-template-columns: 1fr 1fr; }
          .ps-card:nth-child(odd)  { border-right: 1px solid #e0d6e8; }
          .ps-card:nth-child(even) { border-right: none; }
          .ps-card { border-bottom: 1px solid #e0d6e8; }
          .ps-card:nth-last-child(-n+2) { border-bottom: none; }
        }

        @media (max-width: 640px) {
          .ps-section { padding: 48px 0; }
          .ps-shell { padding: 0; }
          .ps-label { padding: 0 24px; }
          .ps-intro-grid { padding: 0 24px; margin-bottom: 40px; }
          .ps-heading { font-size: clamp(28px, 8vw, 38px); }

          .ps-cards-grid { display: none; }

          .ps-slider {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 0;
            border-top: 1px solid #e0d6e8;
            border-bottom: 1px solid #e0d6e8;
          }
          .ps-slider::-webkit-scrollbar { display: none; }

          .ps-slide {
            flex: 0 0 85vw;
            scroll-snap-align: start;
            padding: 36px 28px;
            border-right: 1px solid #e0d6e8;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            min-height: 360px;
          }
          .ps-slide:last-child { border-right: none; }

          .ps-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 24px;
            padding: 0 24px;
          }
          .ps-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: #e0d6e8;
            cursor: pointer;
            padding: 0;
            transition: background .2s, width .2s;
          }
          .ps-dot-active {
            background: #520380;
            width: 22px;
            border-radius: 4px;
          }
        }

        @media (max-width: 400px) {
          .ps-slide { flex: 0 0 92vw; padding: 28px 20px; }
        }
      `}</style>
    </section>
  );
}
