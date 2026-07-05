"use client";

import { useState } from "react";
import { HiMapPin, HiMagnifyingGlass } from "react-icons/hi2";
import { conferences, archiveConferences } from "../lib/conferenceData";
import { getCity as getGalleryBySlug } from "../lib/galleryData";

// Maps a specific conference edition (name + year) to its real event-photo gallery, so a photo
// set never lands on the wrong year's card. Only the exact editions we have real photos for are listed.
const CONFERENCE_GALLERY_SLUG: Record<string, string> = {
  "WORLDS4|2022": "worlds4-2022",
  "ICTCS|2022": "ictcs-2022",
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

const SEARCH_FIELDS = [
  { value: "name", label: "Conference Name" },
  { value: "year", label: "Year" },
  { value: "city", label: "City" },
] as const;

type SearchField = (typeof SEARCH_FIELDS)[number]["value"];

export default function ArchivesPage() {
  const pastConferences = archiveConferences.filter(c => c.year <= 2025);

  const [searchField, setSearchField] = useState<SearchField>("name");
  const [query, setQuery] = useState("");

  const visibleConferences = pastConferences.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    if (searchField === "name") return c.name.toLowerCase().includes(q) || c.fullName.toLowerCase().includes(q);
    if (searchField === "year") return String(c.year).includes(q);
    return getCity(c.location).toLowerCase().includes(q);
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
      <main className="min-h-screen bg-[#f8f5fb] pt-[140px] pb-32 font-sans overflow-hidden">
        
        {/* Hero Section */}
        <section className="max-w-[1100px] mx-auto px-6 mb-28 relative">
          <div className="relative flex flex-col md:flex-row mt-4 md:mt-16 justify-end items-center md:items-stretch">
            
            {/* Map Image (Background/Left) */}
            <div className="w-full md:w-[60%] h-[300px] md:h-auto relative z-0 md:absolute md:left-0 md:-top-16 md:-bottom-16 md:-translate-x-10 mix-blend-multiply opacity-40 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
                alt="Map"
                className="w-full h-full object-cover object-center grayscale-[30%] contrast-[0.9]"
              />
            </div>
            
            {/* Content Box (Right/Overlapping) */}
            <div
              className="w-full md:w-[55%] px-10 py-12 md:px-16 md:py-16 z-10 relative mt-[-60px] md:mt-0 md:mb-12 md:ml-auto"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 40px rgba(82,3,128,0.06), inset 0 1px 1px rgba(255,255,255,0.35)",
              }}
            >
              <h1 className="text-3xl md:text-[42px] font-bold text-[#520380] mb-6 tracking-tight leading-tight">
                Conference Archives
              </h1>
              <p className="text-gray-600 text-[15px] leading-[1.9] font-medium max-w-[450px]">
                Explore the legacy of GR Conferences through past editions, featuring conference proceedings and event galleries from our global conference portfolio.
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="max-w-[1200px] mx-auto px-6 mb-12">
          <div
            className="flex flex-col sm:flex-row items-stretch gap-3 p-4 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 32px rgba(82,3,128,0.06), inset 0 1px 1px rgba(255,255,255,0.35)",
            }}
          >
            <div className="relative sm:w-[220px] shrink-0">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value as SearchField)}
                className="w-full h-full appearance-none px-4 py-3 rounded-xl bg-white border border-gray-200 text-[13px] font-semibold text-[#520380] outline-none focus:border-[#520380]/50 focus:ring-4 focus:ring-[#520380]/10 cursor-pointer"
              >
                {SEARCH_FIELDS.map((f) => (
                  <option key={f.value} value={f.value}>Search by {f.label}</option>
                ))}
              </select>
            </div>
            <div className="relative flex-1">
              <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-[#520380]/50" size={16} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search by ${SEARCH_FIELDS.find(f => f.value === searchField)?.label.toLowerCase()}…`}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-[13px] text-gray-800 placeholder-gray-400 outline-none focus:border-[#520380]/50 focus:ring-4 focus:ring-[#520380]/10 transition-all"
              />
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
              return (
                <div
                  key={archive.id}
                  className="flex flex-col hover:-translate-y-1 transition-transform duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(32px) saturate(180%)",
                    WebkitBackdropFilter: "blur(32px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 8px 32px rgba(82,3,128,0.06), inset 0 1px 1px rgba(255,255,255,0.35)",
                  }}
                >
                  {/* Image */}
                  <div className="w-full aspect-square md:aspect-[4/5] lg:aspect-square relative overflow-hidden">
                    <img
                      src={galleryCover ?? fallbackImages[index % fallbackImages.length]}
                      alt={archive.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {/* <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/10 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                      <HiMapPin className="w-3.5 h-3.5" />
                      {formatCityCountry(archive.location)}
                    </div> */}
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-[19px] font-bold text-[#111] mb-3 tracking-tight">
                      {archive.name} {getCountry(archive.location)}, {archive.year}
                    </h3>

                    {/* City / Country / Venue */}
                    <dl className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="rounded-lg bg-[#520380]/5 py-2 px-1">
                        <dt className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">City</dt>
                        <dd className="text-[12px] font-bold text-[#111] truncate">{getCity(archive.location) || "—"}</dd>
                      </div>
                      <div className="rounded-lg bg-[#520380]/5 py-2 px-1">
                        <dt className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Country</dt>
                        <dd className="text-[12px] font-bold text-[#111] truncate">{getCountry(archive.location)}</dd>
                      </div>
                      <div className="rounded-lg bg-[#520380]/5 py-2 px-1">
                        <dt className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Venue</dt>
                        <dd className="text-[12px] font-bold text-[#111] truncate">{archive.venueName || "TBA"}</dd>
                      </div>
                    </dl>

                    <p className="text-[13px] text-gray-600 leading-[1.7] font-medium mb-2">
                      Explore the event gallery and access the{" "}
                      <a
                        href={archive.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#520380]/40 underline-offset-4 hover:decoration-[#520380] hover:text-[#520380] transition-colors"
                      >
                        Publication Details
                      </a>{" "}
                      from this edition, or view the{" "}
                      <a
                        href={`${archive.website}#gallery`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#520380]/40 underline-offset-4 hover:decoration-[#520380] hover:text-[#520380] transition-colors"
                      >
                        Gallery
                      </a>.
                    </p>
                    {currentEdition && (
                      <a
                        href={currentEdition.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-2 text-[12.5px] font-bold text-[#520380] hover:text-[#3A025B] transition-colors"
                      >
                        View current edition →
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
