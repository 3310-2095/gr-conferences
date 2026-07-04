"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import type { Conference } from "../lib/conferenceData";
import { parseConferenceDateRange, MONTHS, type DateRange } from "../lib/calendarUtils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getMonthDays(year: number, month: number): (number | null)[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
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
      while (cur <= range.end) {
        if (cur.getFullYear() === cursor.year && cur.getMonth() === cursor.month) {
          const d = cur.getDate();
          map.set(d, [...(map.get(d) ?? []), conf]);
        }
        cur.setDate(cur.getDate() + 1);
      }
    });
    return map;
  }, [parsedEntries, cursor]);

  const cells = getMonthDays(cursor.year, cursor.month);
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === cursor.year && today.getMonth() === cursor.month;

  function shiftMonth(delta: number) {
    setDirection(delta);
    setCursor((c) => {
      const next = new Date(c.year, c.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  const cursorKey = `${cursor.year}-${cursor.month}`;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={cursorKey}
              initial={{ opacity: 0, y: direction > 0 ? 8 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -8 : 8 }}
              transition={{ duration: 0.18 }}
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {MONTHS[cursor.month]} {cursor.year}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => shiftMonth(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => shiftMonth(1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cursorKey}
          initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="grid grid-cols-7"
        >
          {cells.map((day, i) => {
            if (!day) {
              return <div key={`empty-${i}`} className="h-24 border-b border-r border-gray-50 last:border-r-0" />;
            }
            const confs = dayMap.get(day) ?? [];
            const isToday = isCurrentMonth && day === today.getDate();
            return (
              <DayCell
                key={day}
                day={day}
                confs={confs}
                isToday={isToday}
                onSelect={() => confs.length > 0 && onSelectConference(confs[0].id)}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DayCell({
  day,
  confs,
  isToday,
  onSelect,
}: {
  day: number;
  confs: Conference[];
  isToday: boolean;
  onSelect: () => void;
}) {
  const hasConf = confs.length > 0;

  return (
    <div
      className={`relative h-24 border-b border-r border-gray-50 last:border-r-0 p-2 flex flex-col transition-colors
        ${hasConf ? "bg-purple-50 cursor-pointer hover:bg-purple-100/70" : ""}
      `}
      onClick={onSelect}
    >
      {/* Day number */}
      <span
        className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold self-start
          ${isToday ? "bg-[#520380] text-white" : hasConf ? "text-[#520380]" : "text-gray-700"}
        `}
      >
        {day}
      </span>

      {/* Conference names */}
      {hasConf && (
        <div className="mt-1 flex flex-col gap-0.5 overflow-hidden">
          {confs.slice(0, 2).map((c) => (
            <span key={c.id} className="text-[10px] font-medium text-purple-700 truncate leading-tight">
              {c.name}
            </span>
          ))}
          {confs.length > 2 && (
            <span className="text-[10px] text-purple-400">+{confs.length - 2} more</span>
          )}
        </div>
      )}
    </div>
  );
}
