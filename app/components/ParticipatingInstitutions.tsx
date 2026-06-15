"use client";

import React from "react";
import { SiUpwork } from "react-icons/si";
import { FaShopify } from "react-icons/fa6";

export default function ParticipatingInstitutions() {
  const logos = [
    {
      id: 1,
      element: (
        <div className="flex items-center">
          <SiUpwork className="text-[#14A800] text-3xl mr-2" />
          <span className="text-[#14A800] text-[30px] font-semibold">
            upwork
          </span>
        </div>
      ),
    },

    {
      id: 2,
      element: (
        <div className="flex items-center">
          <div className="grid grid-cols-2 gap-[2px] mr-3">
            <div className="w-3 h-3 bg-[#F25022]" />
            <div className="w-3 h-3 bg-[#7FBA00]" />
            <div className="w-3 h-3 bg-[#00A4EF]" />
            <div className="w-3 h-3 bg-[#FFB900]" />
          </div>
          <span className="text-gray-300 text-[30px] font-medium">
            Microsoft
          </span>
        </div>
      ),
    },

    {
      id: 3,
      element: (
        <div className="flex items-center">
          <FaShopify className="text-[#95BF47] text-4xl mr-2" />
          <span className="text-gray-300 text-[30px] font-semibold">
            shopify
          </span>
        </div>
      ),
    },

    {
      id: 4,
      element: (
        <div className="flex items-center text-[32px] font-medium">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </div>
      ),
    },

    {
      id: 5,
      element: (
        <div className="flex items-center">
          <div className="flex items-end gap-1 mr-3">
            <div className="w-[6px] h-[12px] bg-[#FF3D57] rounded-sm" />
            <div className="w-[6px] h-[16px] bg-[#FFCB00] rounded-sm" />
            <div className="w-[6px] h-[20px] bg-[#00C875] rounded-sm" />
          </div>

          <span className="text-gray-300 text-[30px] font-semibold">
            monday
            <span className="text-gray-500 font-normal">.com</span>
          </span>
        </div>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#070814] py-20">

      {/* Strong Left Fade */}
      <div className="absolute left-0 top-0 z-20 h-full w-72 bg-gradient-to-r from-black via-black/65 to-transparent" />

      {/* Strong Right Fade */}
      <div className="absolute right-0 top-0 z-20 h-full w-72 bg-gradient-to-l from-black via-black/65 to-transparent" />

      <div className="relative z-10">
        <h3 className="text-center text-white text-2xl md:text-3xl font-semibold tracking-wide mb-14">
          Participating Institutions
        </h3>

        {/* Infinite Marquee */}
        <div className="overflow-hidden">
          <div className="marquee flex items-center">

            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 md:mx-12 opacity-100"
              >
                {logo.element}
              </div>
            ))}

          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          width: max-content;
          animation: scroll 25s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}