"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const floatingDots = [
  { size: 6,  top: "15%", left: "10%",  delay: 0 },
  { size: 4,  top: "25%", left: "85%",  delay: 0.4 },
  { size: 8,  top: "70%", left: "8%",   delay: 0.8 },
  { size: 5,  top: "80%", left: "78%",  delay: 0.2 },
  { size: 3,  top: "45%", left: "92%",  delay: 1.0 },
  { size: 7,  top: "60%", left: "20%",  delay: 0.6 },
  { size: 4,  top: "10%", left: "55%",  delay: 1.2 },
  { size: 5,  top: "88%", left: "45%",  delay: 0.3 },
];

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#11001C] flex flex-col items-center justify-center overflow-hidden px-6">

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#520380]/20 blur-[140px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#3A025B]/30 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[#520380]/15 blur-[80px]" />
      </div>

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Floating ambient dots */}
      {floatingDots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#520380]/50"
          style={{ width: dot.size, height: dot.size, top: dot.top, left: dot.left }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(82,3,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(82,3,128,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">

        {/* 404 large number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease }}
          className="relative mb-4 select-none"
        >
          <span
            className="text-[140px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #520380 0%, #9B30D9 50%, #3A025B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>

          {/* Glow under the number */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-[#520380]/40 blur-2xl rounded-full" />
        </motion.div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#520380] to-transparent mb-8"
        />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
          className="text-[#9CA3AF] text-base leading-relaxed mb-10 max-w-md"
        >
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to the research community.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)",
              boxShadow: "0 4px 24px rgba(82,3,128,0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(82,3,128,0.65), inset 0 1px 0 rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(82,3,128,0.45), inset 0 1px 0 rgba(255,255,255,0.1)";
            }}
          >
            ← Back to Home
          </Link>

          <Link
            href="#conferences"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              border: "1px solid rgba(82,3,128,0.5)",
              color: "#D1B3FF",
              background: "rgba(82,3,128,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(82,3,128,0.18)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(82,3,128,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(82,3,128,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(82,3,128,0.5)";
            }}
          >
            Browse Conferences
          </Link>
        </motion.div>

        {/* Bottom logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 flex items-center gap-3 opacity-40"
        >
          <img src="/logo.jpeg" alt="GR Conferences" className="h-7 w-auto object-contain" />
        </motion.div>

      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#11001C] to-transparent pointer-events-none" />
    </div>
  );
}
