"use client";

import { HiMapPin } from "react-icons/hi2";
import { conferences, archiveConferences } from "../lib/conferenceData";

// `location` isn't uniformly formatted ("United Kingdom" vs "London, UK" vs "India") —
// this pulls just the country portion for the "NAME COUNTRY, YEAR" card title.
const COUNTRY_ABBREVIATIONS: Record<string, string> = {
  "United Kingdom": "UK",
  "United States": "USA",
};

function getCountry(location: string): string {
  const country = location.includes(",")
    ? location.split(",").pop()!.trim()
    : location;
  return COUNTRY_ABBREVIATIONS[country] ?? country;
}

// City is only present when `location` is "City, Country" — otherwise fall back to the
// country/region itself (e.g. "Thailand", "United Kingdom" have no distinct city on file).
function getCity(location: string): string {
  return location.includes(",") ? location.split(",")[0].trim() : location;
}

export default function ArchivesPage() {
  const pastConferences = archiveConferences.filter(c => c.year <= 2025);

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

        {/* Cards Section */}
        <section className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastConferences.map((archive, index) => {
              const currentEdition = conferences.find(c => c.name === archive.name);
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
                      src={fallbackImages[index % fallbackImages.length]}
                      alt={archive.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/10 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                      <HiMapPin className="w-3.5 h-3.5" />
                      {getCity(archive.location)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-[19px] font-bold text-[#111] mb-3 tracking-tight">
                      {archive.name} {getCountry(archive.location)}, {archive.year}
                    </h3>
                    <p className="text-[13px] text-gray-600 leading-[1.7] font-medium mb-2">
                      Explore the conference image gallery and access the{" "}
                      <a
                        href={archive.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#520380]/40 underline-offset-4 hover:decoration-[#520380] hover:text-[#520380] transition-colors"
                      >
                        conference proceedings
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
                        View current edition →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
