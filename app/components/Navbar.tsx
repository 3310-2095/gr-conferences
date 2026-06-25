"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",        href: "#home" },
  { label: "About",       href: "#about" },
  { label: "Conferences", href: "#conferences" },
  { label: "Calendar",    href: "#calendar" },
  { label: "Archives",    href: "#archives" },
  { label: "Members",     href: "#members" },
  { label: "Gallery",     href: "#gallery" },
  { label: "Partners",    href: "#partners" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,10,10,0.92)"
          : "transparent",
        backdropFilter:       scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* ── Main bar ── */}
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between"
        style={{ height: 72 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <img
            src="/white.png"
            alt="GR Conferences"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
          <CTAButton href="#conferences">Submit Paper</CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden flex items-center justify-center rounded-xl transition-all duration-200"
          style={{
            width: 40,
            height: 40,
            border:     "1px solid #333333",
            background: menuOpen ? "rgba(82,3,128,0.10)" : "rgba(255,255,255,0.03)",
            color:      "#E4E4E4",
          }}
          aria-label="Toggle navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.svg
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                width={20} height={20} viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
                width={20} height={20} viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: "rgba(10,10,10,0.97)",
              borderTop:  "1px solid rgba(255,255,255,0.07)",
              overflow:   "hidden",
            }}
          >
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.2 }}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{ color: "#E4E4E4" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color      = "#FFFFFF";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color      = "#E4E4E4";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.045 + 0.05, duration: 0.2 }}
                className="mt-2"
              >
                <CTAButton href="#conferences" onClick={() => setMenuOpen(false)} block>
                  Submit Paper
                </CTAButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Shared sub-components ─────────────────────────────────────── */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
      style={{ color: "#E4E4E4" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color      = "#FFFFFF";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color      = "#E4E4E4";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {children}
    </a>
  );
}

function CTAButton({
  href,
  children,
  onClick,
  block,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  block?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${block ? "block text-center w-full" : "inline-flex"} items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200`}
      style={{
        background: "#520380",
        boxShadow:  "0 4px 18px rgba(82,3,128,0.30)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#6B04A8";
        (e.currentTarget as HTMLElement).style.boxShadow  = "0 6px 24px rgba(107,4,168,0.42)";
        (e.currentTarget as HTMLElement).style.transform  = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#520380";
        (e.currentTarget as HTMLElement).style.boxShadow  = "0 4px 18px rgba(82,3,128,0.30)";
        (e.currentTarget as HTMLElement).style.transform  = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}
