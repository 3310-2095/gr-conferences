"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMagnifyingGlass, HiChevronDown, HiXMark } from "react-icons/hi2";
import { conferences, archiveConferences } from "../lib/conferenceData";
import { getStatusBadge } from "../lib/calendarUtils";
import ConferenceCard from "./ConferenceCard";
import MonthlyCalendar from "./MonthlyCalendar";
import TimelineView from "./TimelineView";
import CalendarExport from "./CalendarExport";
import GlassSelect from "../components/GlassSelect";

const ease = [0.22, 1, 0.36, 1] as const;

const allConferences = [...conferences, ...archiveConferences];

const allLocations = Array.from(new Set(allConferences.map((c) => c.location.split(",")[0].trim()))).sort();
const allSeries = Array.from(new Set(allConferences.map((c) => c.name.split(" ")[0]))).sort();

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_ABBR = MONTHS.map((m) => m.slice(0, 3));

function getConfMonth(date: string): number {
  for (let i = 0; i < MONTHS.length; i++) {
    if (date.includes(MONTHS[i])) return i + 1;
  }
  return 0;
}

const STATUS_OPTIONS = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Paper Submission Open", value: "paper submission open" },
  { label: "Paper Submission closed", value: "paper submission closed" },
  { label: "Paper Submission Not yet open", value: "paper submission not yet open" },
  { label: "Registration Open", value: "registration open" },
  { label: "Registration Closed", value: "registration closed" },
  { label: "Registration Not yet open", value: "registration not yet open" },
  { label: "First deadline", value: "first deadline" },
  { label: "Extended deadline", value: "extended deadline" },
  { label: "Final deadline", value: "final deadline" },
];


const VIEWS = [
  { value: "list", label: "List" },
  { value: "calendar", label: "Calendar" },
  { value: "timeline", label: "Timeline" },
] as const;

type ViewMode = (typeof VIEWS)[number]["value"];

export default function ConferenceCalendarPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");
  const [series, setSeries] = useState("");
  const [view, setView] = useState<ViewMode>("list");
  const [pendingScrollId, setPendingScrollId] = useState<number | null>(null);

  // Months that have at least one conference in the selected year — drives the
  // clickable/greyed-out state of the month strip under the year toggle.
  const monthsWithConfsForYear = useMemo(() => {
    const set = new Set<number>();
    if (!year) return set;
    allConferences.forEach((c) => {
      if (c.year === Number(year)) {
        const m = getConfMonth(c.date);
        if (m) set.add(m);
      }
    });
    return set;
  }, [year]);

  const filtered = useMemo(() => {
    const today = new Date();
    return allConferences.filter((c) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.fullName.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.domains.some((d) => d.toLowerCase().includes(q));
      const matchLocation = !location || c.location.split(",")[0].trim() === location;
      const matchYear = !year || c.year === Number(year);
      const matchMonth = !month || getConfMonth(c.date) === Number(month);

      const derivedStatus = getStatusBadge(c, today).label;
      const matchStatus = !status || derivedStatus.toLowerCase() === status.toLowerCase();
      const matchSeries = !series || c.name.split(" ")[0] === series;

      return matchSearch && matchLocation && matchYear && matchMonth && matchStatus && matchSeries;
    });
  }, [search, location, year, month, status, series]);

  const hasFilters = search || location || year || month || status || series;

  function clearFilters() {
    setSearch("");
    setLocation("");
    setYear("");
    setMonth("");
    setStatus("");
    setSeries("");
  }

  const scrolledToRef = useRef<number | null>(null);

  function handleSelectConference(id: number) {
    setView("list");
    setPendingScrollId(id);
  }

  useEffect(() => {
    if (view !== "list" || pendingScrollId === null) return;
    if (scrolledToRef.current === pendingScrollId) return;
    const el = document.getElementById(`conf-${pendingScrollId}`);
    if (!el) return;
    scrolledToRef.current = pendingScrollId;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("ring-2", "ring-[#520380]", "ring-offset-4");
    const t = setTimeout(() => el.classList.remove("ring-2", "ring-[#520380]", "ring-offset-4"), 1800);
    return () => clearTimeout(t);
  }, [view, pendingScrollId]);

  return (
    <>
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
                Explore.

                <br />
                <span style={{ background: "linear-gradient(90deg, #a78bfa 0%, #c084fc 50%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Plan.
                </span>
                <br />
                <span style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)", fontFamily: "'Playfair Display', serif" }}
                >
                  Participate.
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
                Discover all GR Conferences, track important deadlines, and find the right conference for your research, all in one place.
              </motion.p>

            </div>
          </div>
        </section>

        {/* ── Conference Explorer ── */}
        <section id="conferences" className="relative bg-[#ffffff] py-16 min-h-[80vh] scroll-mt-24"
        >
      
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

            {/* Section header */}
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#520380] mb-3">
                  <span>♦</span> Conference Explorer
                </span>
                <h2
                  className="text-3xl font-extrabold text-gray-900 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  12 Conferences, One Portfolio
                </h2>
                <p className="text-gray-500 text-sm mb-4">Plan Your Research Journey</p>

                {/* Year toggle */}
                <div className="inline-flex items-center bg-gray-100 rounded-2xl p-1 gap-1">
                  {["2026", "2027"].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => {
                        setYear((prev) => (prev === y ? "" : y));
                        setMonth("");
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${year === y ? "bg-[#520380] text-white shadow-[0_4px_14px_rgba(82,3,128,0.25)]" : "text-gray-500 hover:text-[#520380]"
                        }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>

                {/* Month strip — appears once a year is selected. Months with a conference
                    that year are clickable; months with none are greyed out. */}
                {year && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {MONTH_ABBR.map((label, i) => {
                      const m = i + 1;
                      const hasConf = monthsWithConfsForYear.has(m);
                      const isSelected = month === String(m);

                      if (!hasConf) {
                        return (
                          <span
                            key={label}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-gray-300 bg-gray-50 select-none cursor-not-allowed"
                          >
                            {label}
                          </span>
                        );
                      }

                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setMonth((prev) => (prev === String(m) ? "" : String(m)))}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${isSelected
                              ? "bg-[#520380] text-white shadow-[0_4px_10px_rgba(82,3,128,0.25)]"
                              : "bg-white border border-gray-200 text-gray-600 hover:border-[#520380]/40 hover:text-[#520380]"
                            }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* View toggle */}
                <div className="inline-flex items-center bg-white/70 backdrop-blur-md border border-white/70 rounded-2xl p-1 gap-1 shrink-0">
                  {VIEWS.map((v) => (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => setView(v.value)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${view === v.value ? "bg-[#520380] text-white shadow-[0_4px_14px_rgba(82,3,128,0.25)]" : "text-gray-500 hover:text-[#520380]"
                        }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters — only in List view — search + dropdowns in one horizontal row */}
            {view === "list" && <div className="sticky top-[82px] z-40 bg-white/95 backdrop-blur-2xl rounded-sm border border-white/80 shadow-[0_8px_32px_rgba(82,3,128,0.08)] p-4 mb-10">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[220px]">
                  <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#520380]/50" size={16} />
                  <input
                    type="text"
                    placeholder="Search by name, domain or location…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-[13px] text-gray-800 placeholder-gray-400 outline-none focus:border-[#520380]/50 focus:ring-4 focus:ring-[#520380]/10 transition-all"
                  />
                </div>
                <GlassSelect value={location} onChange={setLocation} placeholder="All Locations"
                  options={allLocations.map(l => ({ label: l, value: l }))} />
                <GlassSelect value={series} onChange={setSeries} placeholder="All Series"
                  options={allSeries.map(s => ({ label: s, value: s }))} />
                <GlassSelect value={status} onChange={setStatus} placeholder="All Status"
                  options={STATUS_OPTIONS} />
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold text-[#520380] bg-white border border-[#520380]/20 hover:bg-[#f3e8ff] transition-all whitespace-nowrap"
                  >
                    <HiXMark size={13} /> Clear all
                  </button>
                )}
              </div>
            </div>}

            {/* Views */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-400 text-lg">No conferences match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-[#520380] font-semibold hover:underline text-sm">
                  Clear all filters
                </button>
              </div>
            ) : view === "list" ? (
              <div className="grid grid-cols-1 gap-y-8">
                {filtered.slice(0, 12).map((conf, i) => (
                  <ConferenceCard key={conf.id} conf={conf} index={i} />
                ))}
              </div>
            ) : view === "calendar" ? (
              <MonthlyCalendar conferences={filtered.slice(0, 12)} onSelectConference={handleSelectConference} />
            ) : (
              <TimelineView conferences={filtered.slice(0, 12)} onSelectConference={handleSelectConference} />
            )}
          </div>
        </section>

        {/* ── Participation Opportunities ── */}
        {/* <section className="bg-[#f8f7fc] py-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <ParticipationSection />
          </div>
        </section> */}

        {/* ── Google Calendar Integration ── */}
        <section className="bg-white py-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <CalendarExport conferences={conferences} />
          </div>
        </section>

      </main>
    </>
  );
}
