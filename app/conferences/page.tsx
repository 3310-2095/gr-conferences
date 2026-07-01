"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HiMagnifyingGlass, HiMapPin, HiCalendarDays, HiArrowRight, HiXMark } from "react-icons/hi2";
import Link from "next/link";
import { conferences } from "../lib/conferenceData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;

const allDomains = Array.from(new Set(conferences.flatMap((c) => c.domains))).sort();
const allLocations = Array.from(new Set(conferences.map((c) => c.location.split(",")[0].trim()))).sort();
const allYears = Array.from(new Set(conferences.map((c) => c.year))).sort();

const domainBgColors: Record<string, string> = {
  Sustainability: "bg-emerald-50 text-emerald-600",
  ICT: "bg-blue-50 text-blue-600",
  Innovation: "bg-orange-50 text-orange-600",
  Technology: "bg-violet-50 text-violet-600",
  Business: "bg-amber-50 text-amber-600",
  Computing: "bg-cyan-50 text-cyan-600",
  Security: "bg-red-50 text-red-600",
  AI: "bg-purple-50 text-purple-600",
  Biotechnology: "bg-green-50 text-green-600",
  "Health Sciences": "bg-pink-50 text-pink-600",
  Management: "bg-yellow-50 text-yellow-600",
  "Information Systems": "bg-indigo-50 text-indigo-600",
  "Digital Innovation": "bg-sky-50 text-sky-600",
  Research: "bg-teal-50 text-teal-600",
  "Smart Computing": "bg-fuchsia-50 text-fuchsia-600",
  Communication: "bg-rose-50 text-rose-600",
  Physics: "bg-lime-50 text-lime-600",
  Mathematics: "bg-slate-50 text-slate-600",
  Energy: "bg-orange-50 text-orange-600",
};

function getDomainBadgeStyle(domain: string) {
  return domainBgColors[domain] ?? "bg-gray-50 text-gray-500";
}

export default function ConferencesPage() {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    return conferences.filter((c) => {
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
        <section
          className="relative overflow-hidden pt-32 pb-20"
          style={{
            background: "linear-gradient(135deg, #0d0118 0%, #1a0230 50%, #0d0118 100%)",
          }}
        >
          {/* Dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(82,3,128,0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(82,3,128,0.45) 0%, transparent 65%)",
            }}
          />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-white/50 mb-6"
            >
              <span className="text-[#a78bfa]">♦</span> Conference Portfolio
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Conferences
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="text-white/50 text-sm font-semibold tracking-[0.12em] uppercase mb-4"
            >
              Explore Our Conferences
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.25 }}
              className="text-2xl lg:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore. Connect. Collaborate.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="text-white/55 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Explore our global conference portfolio connecting researchers, innovators, and institutions
              across technology, sustainability, business, and emerging fields.
            </motion.p>
          </div>
        </section>

        {/* ── Filters ── */}
        <section className="bg-white border-b border-gray-100 sticky top-[82px] z-40 shadow-sm">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12 py-4">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search conferences..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-5 py-3 rounded-full border border-gray-100 bg-[#fbfbfe] text-[13.5px] font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-[#520380]/30 focus:bg-white focus:shadow-[0_4px_20px_rgba(82,3,128,0.05)] transition-all"
                />
              </div>

              {/* Domain */}
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="px-5 py-3 rounded-full border border-gray-100 bg-[#fbfbfe] text-[13.5px] font-medium text-gray-700 outline-none focus:border-[#520380]/30 focus:bg-white focus:shadow-[0_4px_20px_rgba(82,3,128,0.05)] cursor-pointer transition-all"
              >
                <option value="">All Domains</option>
                {allDomains.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              {/* Location */}
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-5 py-3 rounded-full border border-gray-100 bg-[#fbfbfe] text-[13.5px] font-medium text-gray-700 outline-none focus:border-[#520380]/30 focus:bg-white focus:shadow-[0_4px_20px_rgba(82,3,128,0.05)] cursor-pointer transition-all"
              >
                <option value="">All Locations</option>
                {allLocations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              {/* Year */}
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-5 py-3 rounded-full border border-gray-100 bg-[#fbfbfe] text-[13.5px] font-medium text-gray-700 outline-none focus:border-[#520380]/30 focus:bg-white focus:shadow-[0_4px_20px_rgba(82,3,128,0.05)] cursor-pointer transition-all"
              >
                <option value="">All Years</option>
                {allYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              {/* Status */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-5 py-3 rounded-full border border-gray-100 bg-[#fbfbfe] text-[13.5px] font-medium text-gray-700 outline-none focus:border-[#520380]/30 focus:bg-white focus:shadow-[0_4px_20px_rgba(82,3,128,0.05)] cursor-pointer transition-all"
              >
                <option value="">Upcoming & Past</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-full text-[13.5px] font-medium text-[#520380] border border-[#520380]/20 hover:bg-[#520380]/5 transition-colors"
                >
                  <HiXMark size={16} /> Clear
                </button>
              )}

              <span className="ml-auto text-sm text-gray-400 font-medium px-4">
                {filtered.length} conference{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </section>

        {/* ── Cards Grid (Timeline Style) ── */}
        <section className="bg-white py-16 min-h-[60vh]">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12 relative">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-400 text-lg">No conferences match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-[#520380] font-semibold hover:underline text-sm">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="relative pl-[30px] md:pl-0">
                {/* Continuous Vertical Timeline Line */}
                <div className="absolute left-[5px] md:left-[118px] top-10 bottom-10 w-px bg-[#e5d9f2]" />

                <div className="flex flex-col gap-6 md:gap-8">
                  {filtered.map((conf, i) => (
                    <motion.div
                      key={conf.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: i * 0.05 }}
                      className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8 group"
                    >
                      {/* Left: Logo Circle (on desktop) / Node (on mobile) */}
                      <div className="hidden md:flex shrink-0 w-[100px] h-[100px] bg-white rounded-full items-center justify-center shadow-[0_8px_32px_rgba(82,3,128,0.06)] border border-purple-50 z-10 ml-0 md:ml-4 relative">
                        <img src={conf.logo} alt={conf.name} className="w-12 h-12 object-contain" />
                      </div>

                      {/* Timeline Dot */}
                      <div className="absolute left-[-30px] md:left-[114px] top-8 md:top-1/2 md:-translate-y-1/2 w-4 h-4 bg-white border-[3px] border-[#520380] rounded-full z-10 shadow-sm" />

                      {/* Card Content */}
                      <div className="flex-1 bg-white rounded-[24px] p-6 shadow-[0_4px_24px_rgba(82,3,128,0.04)] border border-gray-100 flex flex-col md:flex-row gap-6 md:gap-8 group-hover:shadow-[0_12px_40px_rgba(82,3,128,0.08)] transition-all ml-0">
                        
                        {/* Card Left Side */}
                        <div className="flex-1">
                          <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#520380]/20 bg-white text-[#520380] text-[10px] font-bold uppercase tracking-widest mb-3.5">
                            {conf.edition.toUpperCase()}
                          </div>
                          
                          <h3 className="text-2xl font-extrabold text-[#1a0230] mb-2 tracking-tight">
                            {conf.name}
                          </h3>
                          <p className="text-[13.5px] text-gray-500 font-medium mb-5 leading-relaxed">
                            {conf.fullName}
                          </p>
                          
                          {/* Domains */}
                          <div className="flex flex-wrap gap-2.5">
                            {conf.domains.map(d => (
                              <span key={d} className={`px-3.5 py-1.5 rounded-full text-[11.5px] font-bold ${getDomainBadgeStyle(d)}`}>
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Right Side */}
                        <div className="w-full md:w-[280px] bg-[#fbfbfe] rounded-[20px] p-5 flex flex-col justify-center shrink-0 border border-gray-50">
                          <div className="flex items-center gap-3.5 mb-3.5">
                            <HiCalendarDays className="text-[#520380] w-5 h-5 shrink-0" />
                            <span className="text-[14px] font-semibold text-[#1a0230]">{conf.date}</span>
                          </div>
                          <div className="flex items-center gap-3.5 mb-5">
                            <HiMapPin className="text-[#520380] w-5 h-5 shrink-0" />
                            <span className="text-[14px] font-semibold text-[#1a0230]">{conf.location}</span>
                          </div>
                          <a
                            href={conf.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 bg-[#520380] text-white rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2.5 transition-colors hover:bg-[#3A025B]"
                          >
                            Visit Conference <HiArrowRight className="-rotate-45 w-4 h-4" />
                          </a>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section
          className="py-20 text-center"
          style={{ background: "linear-gradient(135deg, #0d0118 0%, #1a0230 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(rgba(82,3,128,0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
            <p className="text-white/50 text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              <span className="text-[#a78bfa]">♦</span> Archives
            </p>
            <h2
              className="text-3xl lg:text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore Our Legacy
            </h2>
            <p className="text-white/55 text-base max-w-xl mx-auto mb-8">
              Revisit past editions of GR Conferences and explore our global research journey.
            </p>
            <Link
              href="/archives"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:gap-3"
              style={{ background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)", boxShadow: "0 6px 24px rgba(82,3,128,0.4)" }}
            >
              View Conference Archives <HiArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
