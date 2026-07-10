"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-[#FDFbFF] flex flex-col items-center justify-center font-sans overflow-hidden px-4">

      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-[#EADDFF]/40 rounded-full blur-[80px] pointer-events-none" />

      {/* Decorative stars */}
      <div className="absolute top-[18%] left-[18%] w-2 h-2 bg-[#9B66D9] rotate-45 opacity-60" />
      <div className="absolute top-[28%] right-[22%] w-1.5 h-1.5 bg-[#9B66D9] rotate-45 opacity-40" />
      <div className="absolute bottom-[30%] left-[12%] w-3 h-3 bg-[#EADDFF] rotate-45 opacity-80" />
      <div className="absolute top-[14%] right-[10%] w-2.5 h-2.5 bg-[#D1B3FF] rotate-45 opacity-70" />
      <div className="absolute bottom-[22%] right-[18%] w-1.5 h-1.5 bg-[#9B66D9] rotate-45 opacity-60" />

      {/* 404 Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center mb-5 relative"
      >
        {/* Left 4 */}
        <span
          className="text-[72px] sm:text-[100px] md:text-[130px] font-black leading-none z-10 -mr-4 sm:-mr-6 md:-mr-8 drop-shadow-2xl"
          style={{
            background: "linear-gradient(180deg, #b176ff 0%, #49178f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          4
        </span>

        {/* Portal 0 */}
        <div className="relative z-0 w-[72px] h-[72px] sm:w-[100px] sm:h-[100px] md:w-[130px] md:h-[130px] rounded-full bg-[#11001C] border-[7px] sm:border-[10px] md:border-[14px] border-[#8a42f5] shadow-[0_0_40px_rgba(138,66,245,0.4)] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 2px, transparent 2px)`,
              backgroundSize: "28px 28px",
              backgroundPosition: "0 0, 14px 14px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#49178f]/60 to-transparent" />
        </div>

        {/* Right 4 */}
        <span
          className="text-[72px] sm:text-[100px] md:text-[130px] font-black leading-none z-10 -ml-4 sm:-ml-6 md:-ml-8 drop-shadow-2xl"
          style={{
            background: "linear-gradient(180deg, #b176ff 0%, #49178f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          4
        </span>
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-md mx-auto z-10"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D051A] tracking-tight mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Oops! Page Not Found
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center my-4 opacity-40">
          <div className="w-16 h-[1px] bg-[#6d28d9]" />
          <div className="w-2 h-2 rotate-45 bg-[#6d28d9] mx-3" />
          <div className="w-16 h-[1px] bg-[#6d28d9]" />
        </div>

        <p className="text-[#5D576B] text-base sm:text-lg mb-7 leading-relaxed">
          The page you're looking for doesn't exist{" "}
          <br className="hidden sm:block" />
          or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#5F1FC4] hover:bg-[#461498] text-white px-7 py-3 rounded-lg font-medium transition-all shadow-[0_8px_20px_rgba(95,31,196,0.25)] hover:shadow-[0_12px_24px_rgba(95,31,196,0.35)] hover:-translate-y-0.5 text-sm sm:text-base"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
