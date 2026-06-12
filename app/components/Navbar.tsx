"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Conferences", href: "#conferences" },
  { label: "Calendar", href: "#calendar" },
  { label: "Archives", href: "#archives" },
  { label: "Gallery", href: "#gallery" },
  { label: "Partners", href: "#partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0b18]/90 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-5'}`}>
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9d78e2] to-[#b58ffd] flex items-center justify-center">
            <span className="text-white font-extrabold text-sm tracking-widest">GR</span>
          </div>
          <div>
            <h2 className="font-extrabold text-white text-xl tracking-wide uppercase leading-none">
              Conferences
            </h2>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-2">
          {navLinks.map((link, index) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  index === 0 ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href="#conferences"
            className="px-6 py-2.5 rounded-full font-bold text-white border border-white/30 hover:bg-white hover:text-[#0a0b18] transition-all duration-300 text-sm tracking-wide"
          >
            Submit Paper
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0b18] border-t border-white/10 p-5 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#conferences"
            className="block mt-4 text-center px-5 py-3 rounded-xl text-[#0a0b18] font-bold bg-white"
          >
            Submit Paper
          </a>
        </div>
      )}
    </div>
  );
}