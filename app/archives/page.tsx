"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HiMagnifyingGlass, HiMapPin, HiCalendarDays, HiArrowRight, HiXMark } from "react-icons/hi2";
import Link from "next/link";
import { archiveConferences } from "../lib/conferenceData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;

const allDomains = Array.from(new Set(archiveConferences.flatMap((c) => c.domains))).sort();
const allLocations = Array.from(new Set(archiveConferences.map((c) => c.location.split(",")[0].trim()))).sort();
const allYears = Array.from(new Set(archiveConferences.map((c) => c.year))).sort((a, b) => b - a);
const allSeries = Array.from(new Set(archiveConferences.map((c) => c.name))).sort();

const domainColors: Record<string, string> = {
  Sustainability: "bg-emerald-100 text-emerald-700",
  ICT: "bg-blue-100 text-blue-700",
  Innovation: "bg-orange-100 text-orange-700",
  Technology: "bg-violet-100 text-violet-700",
  Business: "bg-amber-100 text-amber-700",
  Computing: "bg-cyan-100 text-cyan-700",
  Security: "bg-red-100 text-red-700",
  AI: "bg-purple-100 text-purple-700",
  Biotechnology: "bg-green-100 text-green-700",
  "Health Sciences": "bg-pink-100 text-pink-700",
  Management: "bg-yellow-100 text-yellow-700",
  "Information Systems": "bg-indigo-100 text-indigo-700",
  "Digital Innovation": "bg-sky-100 text-sky-700",
  Research: "bg-teal-100 text-teal-700",
  "Smart Computing": "bg-fuchsia-100 text-fuchsia-700",
  Communication: "bg-rose-100 text-rose-700",
};

function getDomainColor(domain: string) {
  return domainColors[domain] ?? "bg-gray-100 text-gray-600";
}

export default function ArchivesPage() {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [series, setSeries] = useState("");

  const filtered = useMemo(() => {
    return archiveConferences.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.fullName.toLowerCase().includes(q) ||
        c.domains.some((d) => d.toLowerCase().includes(q));
      const matchDomain = !domain || c.domains.includes(domain);
      const matchLocation = !location || c.location.includes(location);
      const matchYear = !year || c.year === Number(year);
      const matchSeries = !series || c.name === series;
      return matchSearch && matchDomain && matchLocation && matchYear && matchSeries;
    });
  }, [search, domain, location, year, series]);

  const hasFilters = search || domain || location || year || series;

  function clearFilters() {
    setSearch("");
    setDomain("");
    setLocation("");
    setYear("");
    setSeries("");
  }

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden pt-32 pb-20"
          style={{
            background: "linear-gradient(135deg, #0a0015 0%, #160228 50%, #0a0015 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(82,3,128,0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
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
              <span className="text-[#a78bfa]">♦</span> Archives
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore Our Legacy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.25 }}
              className="text-white/55 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Explore past editions of GR Conferences and revisit our global research journey.
            </motion.p>
          </div>
        </section>

        {/* ── Archive Explorer ── */}
        <section className="bg-[#f8f7fc] py-16 min-h-[80vh]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

            {/* Section header */}
            <div className="mb-10">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#520380] mb-3">
                <span>♦</span> Archive Explorer
              </span>
              <h2
                className="text-3xl font-extrabold text-gray-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                All Conferences
              </h2>
              <p className="text-gray-500 text-sm">Browse all past GR Conference editions from one place.</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-10">
              <div className="flex flex-wrap gap-3 items-center">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-xs">
                  <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search conference..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#520380] focus:ring-2 focus:ring-[#520380]/10 transition-all"
                  />
                </div>

                {/* Year */}
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#520380] bg-white cursor-pointer"
                >
                  <option value="">All Years</option>
                  {allYears.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                {/* Location */}
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#520380] bg-white cursor-pointer"
                >
                  <option value="">All Locations</option>
                  {allLocations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>

                {/* Domain */}
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#520380] bg-white cursor-pointer"
                >
                  <option value="">All Domains</option>
                  {allDomains.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {/* Conference Series */}
                <select
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#520380] bg-white cursor-pointer"
                >
                  <option value="">All Series</option>
                  {allSeries.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-[#520380] border border-[#520380]/30 hover:bg-[#520380]/5 transition-colors"
                  >
                    <HiXMark size={15} /> Clear
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
                <p className="text-gray-400 text-lg">No archived conferences match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-[#520380] font-semibold hover:underline text-sm">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((conf, i) => (
                  <motion.div
                    key={conf.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease, delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#520380]/20 transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    {/* Logo */}
                    <div className="flex items-center justify-center h-28 bg-gradient-to-br from-[#f3eeff] to-[#ede9fe] border-b border-gray-100 relative">
                      <img
                        src={conf.logo}
                        alt={conf.name}
                        className="h-14 w-14 object-contain"
                      />
                      {/* Past badge */}
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase tracking-wide">
                        Past
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {/* Name */}
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{conf.name}</h3>
                      <p className="text-xs text-[#520380] font-semibold mt-0.5">{conf.edition}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-snug line-clamp-2 mb-3">{conf.fullName}</p>

                      {/* Meta */}
                      <div className="flex flex-col gap-1.5 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <HiCalendarDays size={13} className="text-[#520380] shrink-0" />
                          <span>{conf.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <HiMapPin size={13} className="text-[#520380] shrink-0" />
                          <span>{conf.location}</span>
                        </div>
                      </div>

                      {/* Domain tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {conf.domains.map((d) => (
                          <span
                            key={d}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getDomainColor(d)}`}
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <a
                        href={conf.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group-hover:gap-3 border"
                        style={{ color: "#520380", borderColor: "rgba(82,3,128,0.25)", background: "rgba(82,3,128,0.04)" }}
                      >
                        View Conference Archive <HiArrowRight size={14} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section
          className="relative py-20 text-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a0015 0%, #160228 100%)" }}
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
              <span className="text-[#a78bfa]">♦</span> Upcoming Events
            </p>
            <h2
              className="text-3xl lg:text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Looking for Upcoming Events?
            </h2>
            <p className="text-white/55 text-base max-w-xl mx-auto mb-8">
              Explore upcoming GR Conferences and participate in global research discussions.
            </p>
            <Link
              href="/conferences"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:gap-3"
              style={{ background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)", boxShadow: "0 6px 24px rgba(82,3,128,0.4)" }}
            >
              View Upcoming Conferences <HiArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
