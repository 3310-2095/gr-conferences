"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMagnifyingGlass, HiMapPin, HiCalendarDays, HiArrowRight, HiXMark, HiChevronDown } from "react-icons/hi2";
import Link from "next/link";
import { conferences, archiveConferences } from "../lib/conferenceData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;

const allConferences = [...conferences, ...archiveConferences];

const allDomains = Array.from(new Set(allConferences.flatMap((c) => c.domains))).sort();
const allLocations = Array.from(new Set(allConferences.map((c) => c.location.split(",")[0].trim()))).sort();
const allYears = Array.from(new Set(allConferences.map((c) => c.year))).sort((a, b) => b - a);

const domainTextColors: Record<string, string> = {
  Sustainability: "text-[#10b981]", // emerald-500
  ICT: "text-[#3b82f6]", // blue-500
  Innovation: "text-[#f97316]", // orange-500
  Technology: "text-[#8b5cf6]", // violet-500
  Business: "text-[#f59e0b]", // amber-500
  Computing: "text-[#06b6d4]", // cyan-500
  Security: "text-[#ef4444]", // red-500
  AI: "text-[#a855f7]", // purple-500
  Biotechnology: "text-[#22c55e]", // green-500
  "Health Sciences": "text-[#ec4899]", // pink-500
  Management: "text-[#eab308]", // yellow-500
  "Information Systems": "text-[#6366f1]", // indigo-500
  "Digital Innovation": "text-[#0ea5e9]", // sky-500
  Research: "text-[#14b8a6]", // teal-500
  "Smart Computing": "text-[#d946ef]", // fuchsia-500
  Communication: "text-[#f43f5e]", // rose-500
  Energy: "text-[#fb923c]", // orange-400
  Mathematics: "text-[#64748b]", // slate-500
  Physics: "text-[#84cc16]", // lime-500
};

function getDomainColorTextOnly(domain: string) {
  return domainTextColors[domain] ?? "text-gray-500";
}

function GlassSelect({ value, onChange, options, placeholder }: { value: string, onChange: (val: string) => void, options: {label: string, value: string}[], placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full text-left appearance-none bg-white/60 backdrop-blur-md pl-5 pr-10 py-3 rounded-2xl border border-white/60 text-sm text-gray-800 outline-none cursor-pointer transition-all hover:bg-white/75 focus:bg-white/90 focus:border-[#520380]/40 focus:ring-4 focus:ring-[#520380]/10 min-w-[160px]"
      >
        <span className="block truncate font-medium">{value ? (options.find(o => o.value === value)?.label || value) : placeholder}</span>
      </button>
      <HiChevronDown className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#520380]/60 transition-transform ${isOpen ? "rotate-180" : ""}`} size={16} />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[110%] left-0 min-w-full w-max max-w-[280px] z-50 bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/80 shadow-[0_12px_40px_rgba(82,3,128,0.2)] overflow-hidden"
          >
            <div className="max-h-[250px] overflow-y-auto flex flex-col p-1.5 gap-0.5" style={{ scrollbarWidth: "thin" }}>
              <button
                type="button"
                onClick={() => { onChange(""); setIsOpen(false); }}
                className={`text-left px-3 py-2.5 text-sm rounded-xl transition-all ${!value ? "bg-white/70 text-[#520380] font-bold shadow-sm" : "text-gray-800 font-medium hover:bg-white/50"}`}
              >
                {placeholder}
              </button>
              {options.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setIsOpen(false); }}
                  className={`text-left px-3 py-2.5 text-sm rounded-xl transition-all ${value === opt.value ? "bg-white/70 text-[#520380] font-bold shadow-sm" : "text-gray-800 font-medium hover:bg-white/50"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConferenceCard({ conf, index }: { conf: typeof conferences[0], index: number }) {


  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease, delay: index * 0.05 }}
      className="bg-white rounded-[24px] w-full max-w-[380px] mx-auto border border-gray-100 shadow-[0_4px_24px_rgba(82,3,128,0.03)] hover:shadow-[0_12px_40px_rgba(82,3,128,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative group"
    >
      {/* Faint Purple Top Wave Pattern */}
      <div className="absolute top-0 left-0 w-full h-[120px] pointer-events-none z-0 overflow-hidden rounded-t-[24px]">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="wave-drift h-full absolute top-0 left-0"
          style={{ width: "130%" }}
        >
          <path fill="#520380" fillOpacity="0.03" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,176C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          <path fill="#520380" fillOpacity="0.04" d="M0,96L60,112C120,128,240,160,360,176C480,192,600,192,720,165.3C840,139,960,85,1080,85.3C1200,85,1320,139,1380,165.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          <path fill="#520380" fillOpacity="0.02" d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,208C1120,192,1280,128,1360,96L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
        {/* Gradient to fade out the waves at the bottom of the 120px area */}
        <div className="absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative p-5 z-10 flex flex-col flex-1">
        
        {/* Top Row: Logo + Name/Edition */}
        <div className="flex gap-3 mb-3">
          <div className="w-[68px] h-[68px] shrink-0 rounded-[16px] shadow-[0_8px_24px_rgba(82,3,128,0.15)] flex items-center justify-center z-10 relative overflow-hidden bg-white">
            <img src={conf.logo} alt={conf.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[19px] font-extrabold text-[#111] leading-none tracking-tight">{conf.name}</h3>
              <div className="bg-[#ede0ff] text-[#520380] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                {conf.edition}
              </div>
            </div>
          </div>
        </div>

        {/* Full Name — full width */}
        <div className="mb-2.5">
          <p className="text-[12.5px] text-gray-500 font-medium leading-snug">
            {conf.fullName}
          </p>
        </div>

        {/* Domains — full width */}
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-4">
          {conf.domains.map((d, index) => (
            <div key={d} className="flex items-center gap-1.5">
              <span className={`text-[12px] font-bold ${getDomainColorTextOnly(d)}`}>{d}</span>
              {index < conf.domains.length - 1 && (
                <span className="text-gray-200 text-[10px] font-light">|</span>
              )}
            </div>
          ))}
        </div>

        {/* Date Section */}
        <div className="border-t border-gray-100 pt-3 pb-3 flex items-center gap-3">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-[#f5efff] flex items-center justify-center shrink-0">
            <HiCalendarDays className="text-[#520380] w-[17px] h-[17px]" />
          </div>
          <span className="text-[13px] font-semibold text-[#111]">{conf.date}</span>
        </div>

        {/* Location Section */}
        <div className="border-t border-gray-100 pt-3 pb-4 flex items-center gap-3">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-[#f5efff] flex items-center justify-center shrink-0">
            <HiMapPin className="text-[#520380] w-[17px] h-[17px]" />
          </div>
          <span className="text-[13px] font-semibold text-[#111]">{conf.location}</span>
        </div>

        {/* Button */}
        <a
          href={conf.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto relative overflow-hidden flex items-center justify-center gap-2 w-full py-3 rounded-[12px] bg-transparent text-[#520380] text-[13.5px] font-bold transition-all duration-300 border border-[#520380]/20 group-hover:border-transparent group-hover:shadow-[0_8px_20px_rgba(82,3,128,0.18)]"
        >
          {/* Smooth Gradient Fill from Left */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#520380] to-[#8b3dff] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-[12px]" />
          
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            Visit Conference
            <HiArrowRight className="w-[16px] h-[16px] -rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0 group-hover:translate-x-1" />
          </span>
        </a>
      </div>
    </motion.div>
  );
}

export default function ConferencesPage() {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    return allConferences.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.fullName.toLowerCase().includes(q) ||
        c.domains.some((d) => d.toLowerCase().includes(q));
      const matchDomain = !domain || c.domains.includes(domain);
      const matchLocation = !location || c.location.includes(location);
      const matchYear = !year || c.year === Number(year);
      const matchStatus = !status || c.status === status;
      return matchSearch && matchDomain && matchLocation && matchYear && matchStatus;
    });
  }, [search, domain, location, year, status]);

  const hasFilters = search || domain || location || year || status;

  function clearFilters() {
    setSearch("");
    setDomain("");
    setLocation("");
    setYear("");
    setStatus("");
  }

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ minHeight: "520px", paddingTop: 82 }}>

          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/banner.jpeg"
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.38) saturate(1.1)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(20,2,48,0.88) 0%, rgba(10,2,30,0.60) 55%, rgba(60,10,100,0.45) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0d0118 0%, transparent 45%)" }} />
            {/* dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(rgba(167,139,250,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          </div>

          {/* Glows */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none z-[1]" style={{ background: "radial-gradient(ellipse at top left, rgba(82,3,128,0.35) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none z-[1]" style={{ background: "radial-gradient(ellipse at bottom right, rgba(124,58,237,0.2) 0%, transparent 65%)" }} />

          {/* Content */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
            <div className="max-w-3xl">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-10 bg-[#520380]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/55">Conference Portfolio</span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
                className="font-extrabold text-white leading-[1.07] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)", fontFamily: "'Playfair Display', serif" }}
              >
                Explore Our Global
                <br />
                <span style={{ background: "linear-gradient(90deg, #a78bfa 0%, #c084fc 50%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Conference Portfolio
                </span>
              </motion.h1>

              {/* Divider */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 56, opacity: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.25 }}
                className="h-[3px] bg-[#520380] rounded-full mb-6"
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
                className="text-white/60 text-base lg:text-lg leading-relaxed max-w-xl mb-10"
              >
                Connecting researchers, innovators, and institutions across technology,
                sustainability, business, and emerging fields  worldwide.
              </motion.p>

            </div>
          </div>
        </section>

        {/* ── Conference Explorer ── */}
        <section className="bg-[#f8f7fc] py-16 min-h-[80vh]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

            {/* Section header */}
            <div className="mb-10">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#520380] mb-3">
                <span>♦</span> Conference Explorer
              </span>
              <h2
                className="text-3xl font-extrabold text-gray-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our Conferences
              </h2>
              <p className="text-gray-500 text-sm">Browse our current lineup of GR Conference editions from one place.</p>
            </div>

            {/* Filters */}
            <div className="sticky top-[85px] z-40 bg-white/50 backdrop-blur-2xl rounded-3xl border border-white/70 shadow-[0_8px_32px_rgba(82,3,128,0.08)] p-5 mb-10 transition-all duration-300">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-xs">
                  <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-[#520380]/60" size={18} />
                  <input
                    type="text"
                    placeholder="Search conference..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 text-sm text-gray-800 placeholder-gray-500 outline-none focus:bg-white/90 focus:border-[#520380]/40 focus:ring-4 focus:ring-[#520380]/10 transition-all"
                  />
                </div>

                {/* Year */}
                <GlassSelect
                  value={year}
                  onChange={setYear}
                  placeholder="All Years"
                  options={allYears.map(y => ({ label: String(y), value: String(y) }))}
                />

                {/* Location */}
                <GlassSelect
                  value={location}
                  onChange={setLocation}
                  placeholder="All Locations"
                  options={allLocations.map(l => ({ label: l, value: l }))}
                />

                {/* Domain */}
                <GlassSelect
                  value={domain}
                  onChange={setDomain}
                  placeholder="All Domains"
                  options={allDomains.map(d => ({ label: d, value: d }))}
                />

                {/* Status */}
                <GlassSelect
                  value={status}
                  onChange={setStatus}
                  placeholder="All Status"
                  options={[
                    { label: "Upcoming", value: "upcoming" },
                    { label: "Past", value: "past" }
                  ]}
                />

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 px-5 py-3 rounded-2xl text-sm font-semibold text-[#520380] bg-white/60 backdrop-blur-md border border-white/80 hover:bg-white/90 transition-all shadow-[0_2px_10px_rgba(82,3,128,0.05)]"
                  >
                    <HiXMark size={16} /> Clear
                  </button>
                )}

                <span className="ml-auto text-sm text-gray-400 font-medium">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Cards */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-400 text-lg">No conferences match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-[#520380] font-semibold hover:underline text-sm">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {filtered.map((conf, i) => (
                  <ConferenceCard key={conf.id} conf={conf} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
}
