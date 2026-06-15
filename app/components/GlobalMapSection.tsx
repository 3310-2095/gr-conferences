"use client";

import React from "react";
import { FaEarthAmericas, FaLocationDot, FaMapPin, FaMapLocationDot } from "react-icons/fa6";

export default function GlobalMapSection() {
  return (
    <section className="bg-[#0A0A0F] py-10 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">

        {/* Header — tightened */}
        <div className="mb-8 text-center flex flex-col items-center z-20">
          <span className="bg-[#1D1635] text-[#A78BFA] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-[#A78BFA]/20">
            GLOBAL REACH
          </span>
          <h2 className="text-3xl md:text-[36px] font-semibold text-white mb-3 tracking-tight leading-tight">
            Conferences Across the Globe
          </h2>
          <p className="text-[#8B8B9F] max-w-xl text-[15px] leading-relaxed">
            Explore our international conference presence connecting researchers worldwide.
          </p>
        </div>

        {/* Network Map Container */}
        <div className="relative w-full max-w-[1600px] aspect-[3/1] md:aspect-[18/9] mt-2">

          {/*
            SVG viewBox stays 1000×562.5 but all paths are pulled into
            the vertical centre band (y: 80–480 → compressed to y: 120–440)
            so nothing is clipped in the shorter container.
          */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 562.5"
            preserveAspectRatio="xMidYMid meet"
          >
            <g stroke="#2D1B54" strokeWidth="1" strokeOpacity="0.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* Centre is ~(500, 281) in meet mode */}

              {/* Path 1 → Node 1: top-left (280, 160) */}
              <path d="M 460 270 L 420 270 Q 410 270 410 260 L 410 170 Q 410 160 400 160 L 280 160" />

              {/* Path 2 → Node 2: left (180, 300) */}
              <path d="M 460 281 L 180 281 L 180 300" />

              {/* Path 3 → Node 3: bottom-left (240, 400) */}
              <path d="M 470 310 L 390 310 Q 380 310 380 320 L 380 390 Q 380 400 370 400 L 240 400" />

              {/* Path 4 → Node 4: top-right (680, 170) */}
              <path d="M 540 260 L 540 180 Q 540 170 550 170 L 680 170" />

              {/* Path 5 → Node 5: far-right (820, 260) */}
              <path d="M 540 281 L 820 281 L 820 260" />

              {/* Path 6 → Node 6: bottom-right (720, 400) */}
              <path d="M 530 310 L 570 310 Q 580 310 580 320 L 580 390 Q 580 400 590 400 L 720 400" />

              {/* Path 7 → Node 7: far top-left (160, 190) */}
              <path d="M 470 260 L 300 260 Q 290 260 290 250 L 290 200 Q 290 190 280 190 L 160 190" />

              {/* Path 8 → Node 8: far top-right (840, 160) */}
              <path d="M 530 260 L 680 260 Q 690 260 690 250 L 690 170 Q 690 160 700 160 L 840 160" />
            </g>
          </svg>

          {/* Central Node — smaller */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#140F2D] border border-[#5B21B6]/40 rounded-xl flex items-center justify-center z-20 shadow-[0_0_30px_rgba(91,33,182,0.25)]">
            <FaEarthAmericas className="text-[32px] text-white" />
          </div>

          {/* Node 1: top-left */}
          <div className="absolute top-[28%] left-[28%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1829] border border-[#2E264F]/40 rounded-xl flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
            <FaLocationDot className="text-[#3B82F6] text-base" />
          </div>

          {/* Node 2: left */}
          <div className="absolute top-[53%] left-[18%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1829] border border-[#2E264F]/40 rounded-xl flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
            <FaMapPin className="text-[#A855F7] text-base" />
          </div>

          {/* Node 3: bottom-left */}
          <div className="absolute top-[71%] left-[24%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1829] border border-[#2E264F]/40 rounded-xl flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
            <FaMapLocationDot className="text-[#EF4444] text-base" />
          </div>

          {/* Node 4: top-right */}
          <div className="absolute top-[30%] left-[68%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1829] border border-[#2E264F]/40 rounded-xl flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
            <FaLocationDot className="text-[#22C55E] text-base" />
          </div>

          {/* Node 5: far-right */}
          <div className="absolute top-[46%] left-[82%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1829] border border-[#2E264F]/40 rounded-xl flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
            <FaMapPin className="text-[#F59E0B] text-base" />
          </div>

          {/* Node 6: bottom-right */}
          <div className="absolute top-[71%] left-[72%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1829] border border-[#2E264F]/40 rounded-xl flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
            <FaLocationDot className="text-[#06B6D4] text-base" />
          </div>

          {/* Node 7: far top-left */}
          <div className="absolute top-[34%] left-[16%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1829] border border-[#2E264F]/40 rounded-xl flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
            <FaLocationDot className="text-[#EC4899] text-base" />
          </div>

          {/* Node 8: far top-right */}
          <div className="absolute top-[28%] left-[84%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1829] border border-[#2E264F]/40 rounded-xl flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
            <FaMapLocationDot className="text-[#10B981] text-base" />
          </div>

        </div>
      </div>
    </section>
  );
}
