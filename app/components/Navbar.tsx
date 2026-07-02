"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",        href: "/" },
  { label: "About",       href: "/about" },
  { label: "Conferences", href: "/conferences" },
  { label: "Archives",    href: "/archives" },
  { label: "Community",     href: "#Community" },
  { label: "Gallery",     href: "#gallery" },
  { label: "Partners",    href: "#partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const solid = !isHome || scrolled;

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
        background: solid ? "#ffffff" : "transparent",
        borderBottom: solid ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
        boxShadow: solid ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* ── Main bar ── */}
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between"
        style={{ height: 82 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <img
            src="/conferenceslogowhite.png"
            alt="GR Conferences"
            className="w-auto object-contain transition-all duration-300"
            style={{
              height: 48,
              filter: solid ? "brightness(0) saturate(100%)" : "none",
            }}
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href} solid={solid}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
          <CTAButton href="/join/conference">Start Your Own Conference</CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden flex items-center justify-center rounded-xl transition-all duration-200"
          style={{
            width: 40,
            height: 40,
            border: solid ? "1px solid rgba(0,0,0,0.10)" : "1px solid rgba(255,255,255,0.20)",
            background: menuOpen ? "rgba(82,3,128,0.10)" : solid ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.10)",
            color: solid ? "#1a1a2e" : "#ffffff",
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
              background: "#ffffff",
              borderTop: "1px solid rgba(0,0,0,0.07)",
              overflow: "hidden",
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
                  style={{ color: "#1a1a2e" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#520380";
                    (e.currentTarget as HTMLElement).style.background = "rgba(82,3,128,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#1a1a2e";
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
                <CTAButton href="/join/conference" onClick={() => setMenuOpen(false)} block>
                  Start Your Own Conference
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

function NavLink({ href, children, solid }: { href: string; children: React.ReactNode; solid: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Tag = href.startsWith("/") ? Link : ("a" as unknown as typeof Link);
  return (
    <Tag
      href={href}
      className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
      style={{
        color: isActive ? "#520380" : solid ? "#1a1a2e" : "rgba(255,255,255,0.92)",
        background: isActive ? "rgba(82,3,128,0.08)" : "transparent",
        fontWeight: isActive ? 700 : undefined,
      }}
      onMouseEnter={(e) => {
        if (isActive) return;
        (e.currentTarget as HTMLElement).style.color = solid ? "#520380" : "#ffffff";
        (e.currentTarget as HTMLElement).style.background = solid ? "rgba(82,3,128,0.07)" : "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        if (isActive) return;
        (e.currentTarget as HTMLElement).style.color = solid ? "#1a1a2e" : "rgba(255,255,255,0.92)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {children}
    </Tag>
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
    <Link
      href={href}
      onClick={onClick}
      className={`${block ? "block text-center w-full" : "inline-flex"} items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200`}
      style={{ background: "#520380", border: "none" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#6B04A8";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#520380";
      }}
    >
      {children}
    </Link>
  );
}
