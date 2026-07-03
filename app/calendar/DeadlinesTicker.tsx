"use client";

import { useMemo } from "react";
import { HiClock } from "react-icons/hi2";
import type { Conference } from "../lib/conferenceData";
import { parseConferenceDateRange } from "../lib/calendarUtils";

type DeadlineEntry = { conf: Conference; kind: "Submission" | "Registration"; label: string; date: Date };

export default function DeadlinesTicker({ conferences }: { conferences: Conference[] }) {
  const entries = useMemo(() => {
    const list: DeadlineEntry[] = [];
    conferences
      .filter((conf) => conf.status === "upcoming")
      .forEach((conf) => {
        if (conf.submissionDeadline) {
          const range = parseConferenceDateRange(conf.submissionDeadline, conf.year);
          if (range) list.push({ conf, kind: "Submission", label: conf.submissionDeadline, date: range.start });
        }
        if (conf.registrationDeadline) {
          const range = parseConferenceDateRange(conf.registrationDeadline, conf.year);
          if (range) list.push({ conf, kind: "Registration", label: conf.registrationDeadline, date: range.start });
        }
      });
    return list.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [conferences]);

  return (
    <div>
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#520380] mb-3">
          <span>♦</span> Important Research Dates
        </span>
        <h2 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          Upcoming Deadlines
        </h2>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-10 px-6 text-center">
          <HiClock className="w-6 h-6 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Deadline details will be published closer to each conference.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((e) => (
            <div key={`${e.conf.id}-${e.kind}`} className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_14px_rgba(82,3,128,0.04)] p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{e.kind} Deadline</p>
              <h4 className="font-extrabold text-gray-900 text-[16px] mb-1">{e.conf.name}</h4>
              <p className="text-[13px] text-gray-500 mb-4">{e.label}</p>
              <a
                href={e.conf.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-bold text-white bg-[#520380] px-4 py-2 rounded-lg hover:bg-[#3a025b] transition-colors"
              >
                {e.kind === "Submission" ? "Submit Now" : "Register"}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
