"use client";
import { motion } from "framer-motion";
import { HiArrowLeft, HiOutlineHome } from "react-icons/hi2";
import ParticlesBackground from "./components/ParticlesBackground";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#0a0b18] flex items-center justify-center overflow-hidden">
      <ParticlesBackground id="404-particles" density={40} linkOpacity={0.07} />

      {/* ambient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] bg-[#9d78e2]/15 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] bg-[#b58ffd]/10 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-4 select-none"
        >
          <span
            className="text-[160px] md:text-[220px] font-black leading-none bg-gradient-to-b from-[#9d78e2] to-[#b58ffd] bg-clip-text text-transparent"
            style={{ fontFamily: "'Inter',sans-serif", letterSpacing: "-0.05em" }}
          >
            404
          </span>
          <div className="absolute inset-0 blur-[60px] bg-[#9d78e2]/20 pointer-events-none rounded-full" />
        </motion.div>

        {/* text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider mb-3"
          style={{ fontFamily: "'Inter',sans-serif" }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-[#9491ab] text-sm leading-relaxed mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          The page you're looking for doesn't exist or has been moved.<br />
          Head back to explore our upcoming conferences.
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white tracking-wide transition-all"
            style={{ background: "linear-gradient(135deg, #9d78e2, #b58ffd)", boxShadow: "0 4px 20px rgba(157,120,226,0.35)" }}
          >
            <HiOutlineHome size={17} /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white tracking-wide border border-white/10 hover:border-[#9d78e2]/50 hover:bg-white/5 transition-all"
          >
            <HiArrowLeft size={17} /> Go Back
          </button>
        </motion.div>

      </div>
    </div>
  );
}
