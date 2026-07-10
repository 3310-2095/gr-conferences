"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiMapPin, HiCalendarDays, HiArrowRight } from "react-icons/hi2";
import type { Conference } from "../lib/conferenceData";
import { conferences, archiveConferences } from "../lib/conferenceData";
import { getStatusBadges } from "../lib/calendarUtils";
import { CONFERENCE_GALLERY_SLUG } from "../lib/galleryData";
import { getEditionLinks } from "../lib/editionLinks";

const ease = [0.22, 1, 0.36, 1] as const;

const allConferenceEntries = [...conferences, ...archiveConferences];

const genericCityImages = [
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=600",
];

export default function ConferenceCard({ conf, index }: { conf: Conference; index: number }) {
  const editionHistory = allConferenceEntries
    .filter((c) => c.name === conf.name && c.id !== conf.id)
    .sort((a, b) => b.year - a.year);

  const cityImage = genericCityImages[conf.id % genericCityImages.length];
  const badges = getStatusBadges(conf);

  return (
    <motion.div
      id={`conf-${conf.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease, delay: index * 0.05 }}
      className="bg-white w-full rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(82,3,128,0.03)] hover:shadow-[0_12px_40px_rgba(82,3,128,0.08)] transition-shadow duration-300 overflow-hidden scroll-mt-32 group flex flex-col md:flex-row"
    >
      {/* ── Left Image — stretches full card height ── */}
      <div className="relative w-full md:w-[220px] lg:w-[240px] shrink-0 self-stretch overflow-hidden">
        <img
          src={cityImage}
          alt={conf.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1">
            <HiMapPin className="w-3 h-3 shrink-0" /> {conf.location}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/80 mb-3">
            <HiCalendarDays className="w-3 h-3 shrink-0" /> {conf.date}
          </div>
          <h3 className="text-2xl font-bold leading-tight mb-1">{conf.name}</h3>
          <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
            {conf.domains[0]}{conf.domains[1] ? ` & ${conf.domains[1]}` : ""}
          </p>
        </div>
      </div>

      {/* ── Right Content ── */}
      <div className="flex-1 p-5 lg:p-7 flex flex-col">

        {/* Domains + Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {conf.domains.slice(0, 3).map((d) => (
              <span key={d} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#f5efff] text-[#520380]">
                {d}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {badges.map((badge) => (
              <span key={badge.label} className={`${badge.pillClass} text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full`}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Full name + Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
          <h2 className="text-xl font-extrabold text-[#111] font-serif max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            {conf.fullName}
          </h2>
          <div className="flex flex-wrap gap-3 shrink-0">
            {conf.registerUrl ? (
              <a
                href={conf.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-[#520380] text-white text-[12px] font-bold hover:bg-[#38015c] transition-colors"
              >
                Register Now
              </a>
            ) : (
              <span
                aria-disabled="true"
                title="Registration not open yet"
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-400 text-[12px] font-bold cursor-not-allowed"
              >
                Register Now
              </span>
            )}
            {conf.submitPaperUrl ? (
              <a
                href={conf.submitPaperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#520380] text-white text-[12px] font-bold hover:bg-[#38015c] transition-colors"
              >
                Submit Paper <HiArrowRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                title="Paper submission not open yet"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gray-200 text-gray-400 text-[12px] font-bold cursor-not-allowed"
              >
                Submit Paper <HiArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>

        {/* Deadlines */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Paper Submission</p>
              <p className="text-[13px] font-semibold text-gray-700">{conf.submissionDeadline || "TBA"}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Registration</p>
              <p className="text-[13px] font-semibold text-gray-700">{conf.registrationDeadline || "TBA"}</p>
            </div>
          </div>
          <a
            href={conf.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#520380] hover:text-[#38015c] transition-colors"
          >
            Visit Website <HiArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="w-full h-px border-t border-dashed border-gray-200 mb-4" />

        {/* Edition History — always visible */}
        <div className="mt-auto">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Edition History</p>
          {editionHistory.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {editionHistory.map((edition) => {
                const links = getEditionLinks(edition.name, edition.year);
                return (
                  <li key={edition.id} className="text-[12px] text-gray-600">
                    <span className="font-medium">{edition.edition}</span>
                    {" · "}{edition.date}
                    {" · "}{edition.location.split(",")[0].trim()}
                    {" · "}
                    {links.publication ? (
                      <a
                        href={links.publication}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#520380] font-bold hover:underline"
                      >
                        Publication History
                      </a>
                    ) : (
                      <Link href="/archives" className="text-[#520380] font-bold hover:underline">
                        Publication History
                      </Link>
                    )}
                    {" · "}
                    {links.gallery ? (
                      <a
                        href={links.gallery}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#520380] font-bold hover:underline"
                      >
                        Gallery
                      </a>
                    ) : (
                      <Link
                        href={
                          CONFERENCE_GALLERY_SLUG[`${edition.name}|${edition.year}`]
                            ? `/gallery/${CONFERENCE_GALLERY_SLUG[`${edition.name}|${edition.year}`]}`
                            : "/gallery"
                        }
                        className="text-[#520380] font-bold hover:underline"
                      >
                        Gallery
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-[12px] text-gray-400">This is the first edition</p>
          )}
        </div>

      </div>
    </motion.div>
  );
}
