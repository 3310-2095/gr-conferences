"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HiMapPin, HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { conferences, archiveConferences } from "../lib/conferenceData";
import { getCity as getGalleryBySlug, CONFERENCE_GALLERY_SLUG } from "../lib/galleryData";
import { getEditionLinks } from "../lib/editionLinks";
import GlassSelect from "../components/GlassSelect";

const ease = [0.22, 1, 0.36, 1] as const;
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const heroFadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// Real city photos we have on file — keyed by city name (lower-cased), each with the
// original shot plus the newer extras so repeat cards for the same city don't all show
// the identical photo. Only the cities listed here get a real location shot; everything
// else falls back below.
const CITY_IMAGES: Record<string, string[]> = {
  ahmedabad: ["/Country/ahmedabad/ahmedabad-1.jpg", "/Country/ahmedabad/ahmedabad-2.jpg", "/Country/ahmedabad/ahmedabad-3.webp"],
  bangkok: ["/Country/bangkok/bangkok-1.jpg", "/Country/bangkok/bangkok-2.jpg", "/Country/bangkok/bangkok-3.jpg"],
  london: ["/Country/london/london-1.jpg", "/Country/london/london-2.avif", "/Country/london/london-3.jpg", "/Country/london/london-4.avif"],
  cairo: ["/Country/cairo/cairo-1.webp", "/Country/cairo/le-caire.webp"],
  jaipur: ["/Country/jaipur/jaipur-1.webp", "/Country/jaipur/jaipur-2.jpg", "/Country/jaipur/jaipur-3.jpg"],
  manila: ["/Country/manila/manila-1.jpg", "/Country/manila/manila-2.jpg", "/Country/manila/manila-3.jpg", "/Country/manila/manila-4.jpg", "/Country/manila/manila-5.jpg"],
  "las vegas": ["/Country/lasvegas/lasvegas-1.webp", "/Country/lasvegas/lasvegas-2.jpg", "/Country/lasvegas/lasvegas-3.jpg", "/Country/lasvegas/lasvegas-4.webp", "/Country/lasvegas/lasvegas-5.jpg"],
  goa: ["/Country/goa/goa-1.png", "/Country/goa/goa-2.jpg", "/Country/goa/goa-3.jpg"],
  chandigarh: ["/Country/chandigarh/chandigarh-1.avif", "/Country/chandigarh/chandigarh-2.jpg", "/Country/chandigarh/chandigarh-3.jpg"],
  pune: ["/Country/pune/pune-1.jpg", "/Country/pune/pune-2.jpg", "/Country/pune/pune-3.jpg"],
};

// `location` isn't uniformly formatted ("United Kingdom" vs "London, UK" vs "India") —
// this standardizes every card to the same "City, Country" shape.
const COUNTRY_ABBREVIATIONS: Record<string, string> = {
  "United Kingdom": "UK",
  "United States": "USA",
};

// City is only present when `location` is "City, Country" — some entries only have a
// country/region on file (e.g. "Thailand", "United Kingdom"), so city can be null.
function splitLocation(location: string): { city: string | null; country: string } {
  if (location.includes(",")) {
    const parts = location.split(",");
    const country = parts.pop()!.trim();
    const city = parts.join(",").trim();
    return { city: city || null, country: COUNTRY_ABBREVIATIONS[country] ?? country };
  }
  return { city: null, country: COUNTRY_ABBREVIATIONS[location] ?? location };
}

function getCity(location: string): string {
  return splitLocation(location).city ?? "";
}

function getCountry(location: string): string {
  return splitLocation(location).country;
}

// Standardized "City, Country" label used everywhere a single location string is shown.
function formatCityCountry(location: string): string {
  const { city, country } = splitLocation(location);
  return city ? `${city}, ${country}` : country;
}

// Archive card title is just "ACRONYM YEAR" — except ICTIS in 2024/2025, where two
// differently-located ICTIS editions land in the same year, so the city qualifier
// (already part of `name`, e.g. "ICTIS USA") is kept to tell them apart.
function getArchiveCardTitle(name: string, year: number): string {
  const acronym = name.split(" ")[0];
  const keepQualifier = acronym === "ICTIS" && (year === 2024 || year === 2025);
  return `${keepQualifier ? name : acronym} ${year}`;
}

export default function ArchivesPage() {
  const pastConferences = archiveConferences.filter(c => c.year <= 2025 && !c.hideFromArchives);

  const allNames = useMemo(() => Array.from(new Set(pastConferences.map(c => c.name))).sort(), [pastConferences]);
  const allYears = useMemo(() => Array.from(new Set(pastConferences.map(c => String(c.year)))).sort((a, b) => Number(b) - Number(a)), [pastConferences]);
  const allCities = useMemo(() => Array.from(new Set(pastConferences.map(c => getCity(c.location)).filter(Boolean))).sort(), [pastConferences]);

  const [query, setQuery] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterCity, setFilterCity] = useState("");

  const hasFilters = query || filterName || filterYear || filterCity;

  const visibleConferences = pastConferences.filter((c) => {
    const q = query.trim().toLowerCase();
    const matchQuery = !q || c.name.toLowerCase().includes(q) || c.fullName.toLowerCase().includes(q);
    const matchName = !filterName || c.name === filterName;
    const matchYear = !filterYear || String(c.year) === filterYear;
    const matchCity = !filterCity || getCity(c.location) === filterCity;
    return matchQuery && matchName && matchYear && matchCity;
  });

  const fallbackImages = [
    "https://images.unsplash.com/photo-1621245059632-1b150c26c11b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <>
      <main className="min-h-screen bg-[#f8f5fb] pb-32 font-sans overflow-hidden">

        {/* Hero Section */}
        <section className="relative overflow-hidden mb-16" style={{ minHeight: "70svh", paddingTop: 72 }}>
          {/* Full-bleed background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/archive.avif"
              alt=""
              className="w-full h-full object-cover object-center scale-105"
              style={{ filter: "brightness(0.4) saturate(1.1)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(30,5,60,0.85) 0%, rgba(10,2,30,0.68) 50%, rgba(60,10,100,0.58) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, #121212 0%, transparent 40%)" }}
            />
          </div>

          <div
            aria-hidden
            className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none z-[1]"
            style={{ background: "radial-gradient(ellipse at bottom right, rgba(124,58,237,0.25) 0%, transparent 65%)" }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex items-center">
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col max-w-3xl py-20 lg:py-28"
            >
              <motion.div variants={heroFadeUp} className="flex items-center gap-3 mb-7">
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/60">
                  Archives
                </span>
              </motion.div>

              <motion.h1
                variants={heroFadeUp}
                className="font-extrabold text-white leading-[1.06] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.2rem, 4.2vw, 4rem)", fontFamily: "'Playfair Display', serif" }}
              >
                Conference
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #a78bfa 0%, #7c3aed 50%, #520380 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Archives
                </span>
              </motion.h1>

              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  show: { width: 56, opacity: 1, transition: { duration: 0.8, ease, delay: 0.1 } },
                }}
                className="h-[3px] bg-[#520380] rounded-full mb-7"
              />

              <motion.p
                variants={heroFadeUp}
                className="text-[#D1D5DB] text-base lg:text-lg leading-[1.85] max-w-xl"
              >
                Explore the legacy of GR Conferences through past editions, featuring conference proceedings and event galleries from our global conference portfolio.
              </motion.p>
            </motion.div>
          </div>

          <div
            aria-hidden
            className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
            style={{ background: "linear-gradient(to top, #121212, transparent)" }}
          />
        </section>

        {/* Search Section */}
        <section className="max-w-[1200px] mx-auto px-6 mb-12">
          <div className="bg-white/95 backdrop-blur-2xl rounded-sm border border-white/80 shadow-[0_8px_32px_rgba(82,3,128,0.08)] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[220px]">
                <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#520380]/50" size={16} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search conferences…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-[13px] text-gray-800 placeholder-gray-400 outline-none focus:border-[#520380]/50 focus:ring-4 focus:ring-[#520380]/10 transition-all"
                />
              </div>
              <GlassSelect
                value={filterName}
                onChange={setFilterName}
                placeholder="Conference Name"
                options={allNames.map(n => ({ label: n, value: n }))}
              />
              <GlassSelect
                value={filterYear}
                onChange={setFilterYear}
                placeholder="Year"
                options={allYears.map(y => ({ label: y, value: y }))}
              />
              <GlassSelect
                value={filterCity}
                onChange={setFilterCity}
                placeholder="City"
                options={allCities.map(c => ({ label: c, value: c }))}
              />
              {hasFilters && (
                <button
                  onClick={() => { setQuery(""); setFilterName(""); setFilterYear(""); setFilterCity(""); }}
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold text-[#520380] bg-white border border-[#520380]/20 hover:bg-[#f3e8ff] transition-all whitespace-nowrap"
                >
                  <HiXMark size={13} /> Clear all
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="max-w-[1200px] mx-auto px-6">
          {visibleConferences.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg">No archived conferences match your search.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleConferences.map((archive, index) => {
              const currentEdition = conferences.find(c => c.name === archive.name);
              const gallerySlug = CONFERENCE_GALLERY_SLUG[`${archive.name}|${archive.year}`];
              const galleryCover = gallerySlug ? getGalleryBySlug(gallerySlug)?.cover : undefined;
              const editionLinks = getEditionLinks(archive.name, archive.year);
              const galleryHref = editionLinks.gallery ?? (gallerySlug ? `/gallery/${gallerySlug}` : `/gallery`);
              const publicationHref = editionLinks.publication ?? `${archive.website}#publication`;
              const cityImageOptions = CITY_IMAGES[getCity(archive.location).toLowerCase()];
              const cityImage = cityImageOptions?.[archive.id % cityImageOptions.length];
              return (
                <div
                  key={archive.id}
                  className="flex flex-col hover:-translate-y-1 transition-transform duration-300 bg-white rounded-xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(82,3,128,0.08)",
                    boxShadow: "0 4px 24px rgba(82,3,128,0.06)",
                  }}
                >
                  {/* Image */}
                  <div className="w-full aspect-square md:aspect-[4/5] lg:aspect-square relative overflow-hidden">
                    <img
                      src={galleryCover ?? cityImage ?? fallbackImages[index % fallbackImages.length]}
                      alt={archive.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white text-[11px] font-semibold">
                      <HiMapPin className="w-3.5 h-3.5" />
                      {formatCityCountry(archive.location)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-[19px] font-bold text-[#111] mb-3 tracking-tight">
                      {getArchiveCardTitle(archive.name, archive.year)}
                    </h3>

                    <p className="text-[13px] text-gray-600 leading-[1.7] font-medium mb-2">
                      Explore the{" "}
                      <a
                        href={galleryHref}
                        target={editionLinks.gallery ? "_blank" : undefined}
                        rel={editionLinks.gallery ? "noopener noreferrer" : undefined}
                        className="underline decoration-[#520380]/40 underline-offset-4 hover:decoration-[#520380] hover:text-[#520380] transition-colors"
                      >
                        event gallery
                      </a>{" "}
                      and access the{" "}
                      <a
                        href={publicationHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#520380]/40 underline-offset-4 hover:decoration-[#520380] hover:text-[#520380] transition-colors"
                      >
                        Publication Details
                      </a>{" "}
                      from this edition.
                    </p>
                    {currentEdition && (
                      <a
                        href={currentEdition.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-2 text-[12.5px] font-bold text-[#520380] hover:text-[#3A025B] transition-colors"
                      >
                        View current edition website →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </section>
      </main>
    </>
  );
}
``