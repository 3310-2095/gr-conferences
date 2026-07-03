"use client";

import { useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiMapPin, HiCalendarDays } from "react-icons/hi2";
import type { Conference } from "../lib/conferenceData";
import { parseConferenceDateRange, MONTHS, type DateRange } from "../lib/calendarUtils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getMonthWeeks(year: number, month: number): (number | null)[][] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = Array(firstWeekday).fill(null);
  
  for (let d = 1; d <= daysInMonth; d++) {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }
  return weeks;
}

export default function MonthlyCalendar({
  conferences,
  onSelectConference,
}: {
  conferences: Conference[];
  onSelectConference: (id: number) => void;
}) {
  const parsedEntries = useMemo(() => {
    return conferences
      .map((conf) => ({ conf, range: parseConferenceDateRange(conf.date, conf.year) }))
      .filter((e): e is { conf: Conference; range: DateRange } => e.range !== null);
  }, [conferences]);

  const defaultCursor = useMemo(() => {
    // Show July 2026 by default as requested if upcoming isn't found
    const upcoming = parsedEntries
      .filter((e) => e.conf.status === "upcoming")
      .sort((a, b) => a.range.start.getTime() - b.range.start.getTime());
    const ref = upcoming[0]?.range.start ?? new Date(2026, 6, 1);
    return { year: ref.getFullYear(), month: ref.getMonth() };
  }, [parsedEntries]);

  const [cursor, setCursor] = useState(defaultCursor);
  const [direction, setDirection] = useState(0);

  const dayMap = useMemo(() => {
    const map = new Map<number, Conference[]>();
    parsedEntries.forEach(({ conf, range }) => {
      const cur = new Date(range.start);
      while (cur.getTime() <= range.end.getTime()) {
        if (cur.getFullYear() === cursor.year && cur.getMonth() === cursor.month) {
          map.set(cur.getDate(), [...(map.get(cur.getDate()) ?? []), conf]);
        }
        cur.setDate(cur.getDate() + 1);
      }
    });
    return map;
  }, [parsedEntries, cursor]);

  const weeks = getMonthWeeks(cursor.year, cursor.month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === cursor.year && today.getMonth() === cursor.month;

  function shiftMonth(delta: number) {
    setDirection(delta);
    setCursor((c) => {
      const next = new Date(c.year, c.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  const cursorKey = `${cursor.year}-${cursor.month}`;

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none' }}>
      <div className="relative w-full max-w-[1200px] min-w-[950px] h-[800px] overflow-hidden rounded-sm bg-[#f4f3ef] shadow-2xl border border-gray-200 mx-auto">
        
        {/* ── LEFT LARGE CIRCLE ── */}
        <div 
          className="absolute left-[-140px] top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[#71818c] flex flex-col justify-center items-end pr-20 shadow-[10px_0_40px_rgba(0,0,0,0.15)] z-20"
        >
          <div className="text-right">
        

            <AnimatePresence mode="wait">
              <motion.div
                key={cursorKey}
                initial={{ opacity: 0, y: direction > 0 ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction > 0 ? -10 : 10 }}
                transition={{ duration: 0.2 }}
                className="mb-6"
              >
                <h2 className="text-[3.5rem] font-black text-white leading-[0.85] tracking-tighter" style={{ fontFamily: "Inter, sans-serif" }}>
                  {MONTHS[cursor.month].toUpperCase()}
                </h2>
                <h2 className="text-[3.5rem] font-light text-white leading-[0.85] tracking-tighter" style={{ fontFamily: "Inter, sans-serif" }}>
                  {cursor.year}
                </h2>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex items-center justify-end gap-2 mb-8 text-white/90 text-sm font-medium tracking-widest">
              <span className="opacity-40">'{String(cursor.year - 2).slice(2)}</span>
              <span className="opacity-70">'{String(cursor.year - 1).slice(2)}</span>
              <span className="font-bold text-white border-b-2 border-white pb-1">'{String(cursor.year).slice(2)}</span>
              <span className="opacity-70">'{String(cursor.year + 1).slice(2)}</span>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => shiftMonth(-1)}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105"
              >
                <HiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => shiftMonth(1)}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105"
              >
                <HiChevronRight className="w-5 h-5" />
              </button>
            </div>

         
          </div>
        </div>

        {/* ── RIGHT DATES (RADIAL LAYOUT) ── */}
        <div className="absolute left-20 inset-0 z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={cursorKey}
              initial={{ opacity: 0, rotate: direction > 0 ? 5 : -5 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: direction > 0 ? -5 : 5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 pointer-events-none"
            >
              {weeks.map((week, wIndex) => {
                // Radial distance from center of the left circle
                // The physical center is at x = 140px relative to container left edge (-140 + 280 = 140)
                const R = 270 + wIndex * 75;
                return week.map((day, dIndex) => {
                  if (!day) return null;
                  
                  // Spread 7 days across an arc from -36 to +36 degrees
                  const angleDeg = -36 + dIndex * 12; 
                  const angleRad = (angleDeg * Math.PI) / 180;
                  
                  const x = R * Math.cos(angleRad);
                  const y = R * Math.sin(angleRad);
                  
                  const confsToday = dayMap.get(day) ?? [];
                  const hasConf = confsToday.length > 0;
                  const isToday = isCurrentMonth && day === today.getDate();

                  return (
                    <RadialCell 
                      key={day}
                      day={day} 
                      monthName={MONTHS[cursor.month]}
                      weekday={WEEKDAYS[dIndex]} 
                      x={x} 
                      y={y} 
                      angleDeg={angleDeg} 
                      confs={confsToday}
                      isToday={isToday}
                      onClick={() => hasConf && onSelectConference(confsToday[0].id)}
                    />
                  );
                });
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function RadialCell({ day, monthName, weekday, x, y, angleDeg, confs, isToday, onClick }: any) {
  const [hover, setHover] = useState(false);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  const hasConf = confs.length > 0;

  function handleMouseMove(e: React.MouseEvent) {
    setTipPos({ x: e.clientX, y: e.clientY });
  }

  return (
    <div
      className={`absolute flex flex-col items-center gap-0 pointer-events-auto transition-all ${hasConf ? "cursor-pointer" : ""}`}
      style={{
        left: `calc(140px + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
        zIndex: hover ? 50 : "auto",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <span
        className={`text-[2rem] font-black transition-colors ${hasConf || isToday ? "text-[#520380]" : "text-[#1d232a]"}`}
        style={{ fontFamily: "Inter, sans-serif", lineHeight: 1 }}
      >
        {day}
      </span>
      <span className="text-[10px] font-bold text-[#71818c]/70 tracking-widest uppercase">
        {weekday}
      </span>

      {/* Event indicator dots */}
      {hasConf && (
        <div className="flex gap-1 mt-1 shrink-0">
          {confs.map((_: any, i: number) => (
            <div key={i} className={`w-2 h-2 rounded-full ${hover ? "bg-[#7c3aed] scale-125" : "bg-[#520380]"} transition-all`} />
          ))}
        </div>
      )}

      {/* Portal tooltip — renders above everything */}
      {hasConf && hover && typeof document !== "undefined" && createPortal(
        <div
          className="pointer-events-none fixed"
          style={{ left: tipPos.x + 16, top: tipPos.y - 8, zIndex: 9999 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl shadow-[0_16px_48px_rgba(82,3,128,0.22)] border border-[#f3e8ff] w-[220px] overflow-hidden"
          >
            {/* Top accent */}
            <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg,#520380,#7c3aed,#c084fc)" }} />
            <div className="px-4 py-3">
              <p className="text-[10px] font-black tracking-[0.18em] text-[#520380] uppercase mb-2.5">
                {monthName} {day}
              </p>
              <div className="flex flex-col gap-2">
                {confs.map((c: any) => (
                  <div key={c.id}>
                    <p className="text-[13px] font-black text-gray-900 leading-tight mb-0.5">{c.name}</p>
                    <p className="text-[10px] text-gray-400 leading-snug line-clamp-2">{c.fullName}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <HiMapPin className="w-2.5 h-2.5 text-[#7c3aed] shrink-0" />
                      <span className="text-[10px] text-gray-500 truncate">{c.location}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-1.5">
                <HiCalendarDays className="w-3 h-3 text-[#520380]" />
                <span className="text-[10px] font-bold text-[#520380]">Click to view details</span>
              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
}
