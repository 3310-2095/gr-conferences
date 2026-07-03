"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { HiMapPin, HiArrowRight, HiCalendarDays } from "react-icons/hi2";
import type { Conference } from "../lib/conferenceData";
import {
  parseConferenceDateRange,
  getStatusBadge,
  MONTHS,
  type DateRange,
} from "../lib/calendarUtils";

/* ─── helpers ──────────────────────────────────────────────── */
function fmtRange(range: DateRange): string {
  const s = range.start;
  const e = range.end;
  const m = MONTHS[s.getMonth()].slice(0, 3);
  if (s.getDate() === e.getDate()) return `${s.getDate()} ${m} ${s.getFullYear()}`;
  return `${s.getDate()}–${e.getDate()} ${m} ${s.getFullYear()}`;
}

type Entry = { conf: Conference; range: DateRange };

function groupByMonth(entries: Entry[]): { label: string; items: Entry[] }[] {
  const map = new Map<string, Entry[]>();
  entries.forEach((e) => {
    const key = `${MONTHS[e.range.start.getMonth()]} ${e.range.start.getFullYear()}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  });
  return Array.from(map.entries()).map(([label, items]) => ({ label, items }));
}

/* ─── main ─────────────────────────────────────────────────── */
export default function TimelineView({
  conferences,
  onSelectConference,
}: {
  conferences: Conference[];
  onSelectConference: (id: number) => void;
}) {
  const { groups, undated } = useMemo(() => {
    const dated: Entry[] = [];
    const undated: Conference[] = [];
    conferences.forEach((conf) => {
      const range = parseConferenceDateRange(conf.date, conf.year);
      if (range) dated.push({ conf, range });
      else undated.push(conf);
    });
    dated.sort((a, b) => a.range.start.getTime() - b.range.start.getTime());
    return { groups: groupByMonth(dated), undated };
  }, [conferences]);

  if (groups.length === 0 && undated.length === 0) {
    return <p className="text-center text-gray-400 py-16">No conferences match your filters.</p>;
  }

  /* flatten entries once — used for both copies of the marquee */
  const allEntries: Entry[] = groups.flatMap((g) => g.items);

  /* speed: px per second — wider content = faster so it feels consistent */
  const CARD_W = 210; // px per card slot
  const MARKER_W = 80; // px per month marker
  const totalW = groups.reduce((acc, g) => acc + MARKER_W + g.items.length * CARD_W, 0);
  const duration = Math.max(30, totalW / 60); // seconds

  return (
    <div className="w-full select-none">
      {/* inject keyframes once */}
      <style>{`
        @keyframes tl-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tl-track {
          animation: tl-scroll ${duration}s linear infinite;
        }
        .tl-viewport:hover .tl-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Marquee viewport — overflow hidden, no scrollbar ── */}
      <div
        className="tl-viewport w-full overflow-hidden"
        style={{ height: 480 }}
      >
        {/* ── Moving strip (2× content for seamless loop) ── */}
        <div className="tl-track relative flex items-stretch" style={{ height: 480, width: "max-content" }}>

          {/* Spine — spans full width of both copies */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: "50%",
              height: 2,
              background: "linear-gradient(90deg,#520380,#7c3aed,#c084fc,#7c3aed,#520380,#7c3aed,#c084fc,#7c3aed,#520380)",
            }}
          />

          {/* Copy 1 */}
          <TrackContent groups={groups} allEntries={allEntries} onSelect={onSelectConference} offset={0} />

          {/* Copy 2 — identical, seamlessly continues */}
          <TrackContent groups={groups} allEntries={allEntries} onSelect={onSelectConference} offset={allEntries.length} />
        </div>
      </div>

      {/* ── Date TBA ── */}
      {undated.length > 0 && (
        <div className="mt-6 px-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#520380]/50 mb-3">
            Date TBA
          </p>
          <div className="flex flex-wrap gap-2">
            {undated.map((conf) => (
              <button
                key={conf.id}
                type="button"
                onClick={() => onSelectConference(conf.id)}
                className="px-4 py-2 rounded-xl border border-[#520380]/20 text-[12px] font-bold text-[#520380] bg-[#f3e8ff]/60 hover:bg-[#520380] hover:text-white transition-all"
              >
                {conf.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── One full copy of the track content ───────────────────── */
function TrackContent({
  groups,
  allEntries,
  onSelect,
  offset,
}: {
  groups: { label: string; items: Entry[] }[];
  allEntries: Entry[];
  onSelect: (id: number) => void;
  offset: number;
}) {
  let idx = offset;
  return (
    <div className="relative flex items-stretch px-10 gap-0 z-10">
      {groups.map(({ label, items }) => (
        <div key={`${label}-${offset}`} className="flex items-stretch gap-0">
          <MonthMarker label={label} />
          {items.map((entry) => {
            const pos = idx % 2 === 0 ? "above" : "below";
            idx++;
            return (
              <TrackCard
                key={`${entry.conf.id}-${offset}`}
                entry={entry}
                position={pos}
                onClick={() => onSelect(entry.conf.id)}
              />
            );
          })}
        </div>
      ))}
      {/* end cap */}
      <div className="flex items-center pl-4 pr-10">
        <div className="w-3 h-3 rounded-full bg-[#520380] ring-4 ring-[#f3e8ff]" />
      </div>
    </div>
  );
}

/* ─── Month marker ─────────────────────────────────────────── */
function MonthMarker({ label }: { label: string }) {
  const [month, year] = label.split(" ");
  return (
    <div className="relative flex flex-col items-center justify-center w-[80px] shrink-0">
      {/* dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-[#520380] z-10" />
      {/* label */}
      <div
        className="absolute flex flex-col items-center"
        style={{ top: "calc(50% - 40px)", transform: "translateY(-100%)" }}
      >
        <span className="text-[11px] font-black tracking-widest text-[#520380] uppercase leading-none">
          {month.slice(0, 3)}
        </span>
        <span className="text-[10px] font-light text-[#71818c] tracking-wider">{year}</span>
      </div>
    </div>
  );
}

/* ─── Card ─────────────────────────────────────────────────── */
function TrackCard({
  entry,
  position,
  onClick,
}: {
  entry: Entry;
  position: "above" | "below";
  onClick: () => void;
}) {
  const { conf, range } = entry;
  const badge = getStatusBadge(conf);
  const isAbove = position === "above";

  return (
    <div className="relative flex flex-col items-center justify-center shrink-0 w-[210px]">
      {/* stem */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-px"
        style={{
          top: isAbove ? "auto" : "50%",
          bottom: isAbove ? "50%" : "auto",
          height: 52,
          background: "linear-gradient(to bottom, rgba(82,3,128,0.5), transparent)",
          ...(isAbove && { background: "linear-gradient(to top, rgba(82,3,128,0.5), transparent)" }),
        }}
      />

      {/* spine dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#7c3aed] ring-[3px] ring-white z-10" />

      {/* card */}
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ y: isAbove ? -5 : 5, transition: { duration: 0.18 } }}
        whileTap={{ scale: 0.97 }}
        className="absolute text-left group"
        style={{
          width: 188,
          top: isAbove ? "auto" : "calc(50% + 54px)",
          bottom: isAbove ? "calc(50% + 54px)" : "auto",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
      >
        <div className="rounded-2xl border border-white/80 bg-white shadow-[0_4px_20px_rgba(82,3,128,0.10)] overflow-hidden transition-all group-hover:shadow-[0_10px_36px_rgba(82,3,128,0.24)] group-hover:border-[#520380]/30">
          {/* accent bar */}
          <div
            className="h-[3px] w-full"
            style={{
              background:
                conf.status === "past"
                  ? "linear-gradient(90deg,#d1d5db,#9ca3af)"
                  : "linear-gradient(90deg,#520380,#7c3aed,#c084fc)",
            }}
          />
          <div className="p-3.5">
            <div className="flex items-start justify-between gap-1 mb-1.5">
              <h4 className="font-black text-[13px] text-gray-900 leading-tight flex-1">{conf.name}</h4>
              <HiArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#520380] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
            </div>
            <p className="text-[10px] text-gray-400 leading-snug mb-2.5 line-clamp-2">{conf.fullName}</p>
            <div className="flex items-center gap-1.5 mb-1.5">
              <HiCalendarDays className="w-3 h-3 text-[#7c3aed] shrink-0" />
              <span className="text-[11px] font-semibold text-[#520380]">{fmtRange(range)}</span>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <HiMapPin className="w-3 h-3 text-[#7c3aed] shrink-0" />
              <span className="text-[11px] text-gray-500 truncate">{conf.location}</span>
            </div>
            <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.pillClass}`}>
              {badge.label}
            </span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
