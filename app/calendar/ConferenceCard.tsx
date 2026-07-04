"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMapPin, HiCalendarDays, HiChevronDown,
} from "react-icons/hi2";
import type { Conference } from "../lib/conferenceData";
import { conferences, archiveConferences } from "../lib/conferenceData";
import { getDomainPillClasses } from "../lib/domainColors";

const ease = [0.22, 1, 0.36, 1] as const;

const allConferenceEntries = [...conferences, ...archiveConferences];

// Stable generic city images for fallback to make it look premium
const genericCityImages = [
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=600",
];

export default function ConferenceCard({ conf, index }: { conf: Conference; index: number }) {
  const [historyOpen, setHistoryOpen] = useState(false);

  const editionHistory = allConferenceEntries
    .filter((c) => c.name === conf.name && c.id !== conf.id)
    .sort((a, b) => b.year - a.year);

  const cityImage = genericCityImages[conf.id % genericCityImages.length];

  return (
    <motion.div
      id={`conf-${conf.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease, delay: index * 0.05 }}
      className="bg-white  w-full border border-gray-100 shadow-[0_4px_24px_rgba(82,3,128,0.03)] hover:shadow-[0_12px_40px_rgba(82,3,128,0.08)] transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden relative group scroll-mt-32"
    >
      {/* Left Banner Image */}
      <div className="relative w-full md:w-[260px] lg:w-[280px] shrink-0 min-h-[260px] md:min-h-full bg-gray-100 flex flex-col justify-end p-5 lg:p-6 overflow-hidden">
        <img
          src={cityImage}
          alt={conf.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent" />
        
        <div className="relative z-10 text-white flex flex-col">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90 mb-1.5">
            <HiMapPin className="w-3.5 h-3.5" /> {conf.location}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90 mb-4">
            <HiCalendarDays className="w-3.5 h-3.5" /> {conf.date}
          </div>
          <h3 className="text-3xl font-extrabold font-serif mb-1 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            {conf.name}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">
            {conf.domains[0]} & {conf.domains[1] || "INTELLIGENT SYSTEMS"}
          </p>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-5 lg:p-7 flex flex-col relative bg-white">

        {/* Top row: Domains + Status badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {conf.domains.slice(0, 3).map((d) => (
              <span key={d} className={`text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#f5efff] text-[#520380]`}>
                {d}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {conf.status === "past" ? (
              <div className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                COMPLETED
              </div>
            ) : (
              <>
                <div className="bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  OPEN SUBMISSION
                </div>
                <div className="bg-[#fef3c7] text-[#d97706] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  REGISTRATION OPEN
                </div>
              </>
            )}
          </div>
        </div>

        {/* Title, Full Name & Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold text-[#111] font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
              {conf.fullName}
            </h2>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={conf.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg bg-[#520380] text-white text-[12px] font-bold hover:bg-[#38015c] transition-colors shadow-sm"
            >
              Submit Paper
            </a>
          </div>
        </div>

        {/* Deadlines */}
        <div className="flex flex-wrap gap-8 mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Paper Submission Deadline</p>
            <p className="text-[13px] font-semibold text-gray-700">{conf.submissionDeadline || "TBA"}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Registration Deadline</p>
            <p className="text-[13px] font-semibold text-gray-700">{conf.registrationDeadline || "TBA"}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px border-t border-dashed border-gray-200 mb-4" />

        {/* Edition History */}
        <div className="mt-auto">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setHistoryOpen((v) => !v)}
              className="flex items-center gap-1.5 text-[12px] font-bold text-[#520380] hover:underline"
            >
              <HiChevronDown className={`w-3.5 h-3.5 transition-transform ${historyOpen ? "rotate-180" : "-rotate-90"}`} />
              Edition History
            </button>
            <a
              href={conf.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-bold text-gray-500 hover:text-[#520380] hover:underline"
            >
              Visit Website &rarr;
            </a>
          </div>
          <AnimatePresence>
            {historyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease }}
                className="overflow-hidden"
              >
                <ul className="pt-3 pb-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {editionHistory.length > 0 ? (
                    editionHistory.map((edition) => (
                      <li key={edition.id} className="text-[12px] gap-2">
                        <span className="text-gray-600 font-medium">
                          {edition.edition} &middot; {edition.date} &middot; {edition.location.split(",")[0].trim()}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-[12px] text-gray-400 font-medium">No previous editions recorded.</li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
