"use client";

import { HiCalendarDays, HiArrowDownTray } from "react-icons/hi2";
import type { Conference } from "../lib/conferenceData";
import { parseConferenceDateRange, buildGoogleCalendarUrl, buildIcsCalendar, downloadIcs, type DateRange } from "../lib/calendarUtils";

export default function CalendarExport({ conferences }: { conferences: Conference[] }) {
  const dated = conferences
    .filter((conf) => conf.status === "upcoming")
    .map((conf) => ({ conf, range: parseConferenceDateRange(conf.date, conf.year) }))
    .filter((e): e is { conf: Conference; range: DateRange } => e.range !== null)
    .sort((a, b) => a.range.start.getTime() - b.range.start.getTime());

  const next = dated[0];

  function handleAddToGoogle() {
    if (!next) return;
    window.open(buildGoogleCalendarUrl(next.conf, next.range), "_blank", "noopener,noreferrer");
  }

  function handleDownload() {
    if (dated.length === 0) return;
    downloadIcs("gr-conferences.ics", buildIcsCalendar(dated));
  }

  return (
    <div className="relative w-full max-w-[960px] mx-auto bg-white rounded-sm shadow-[0_12px_40px_rgba(82,3,128,0.08)] border border-gray-100 py-12 ">
      
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* LEFT SIDE: Image */}
        <div className="flex-1 w-full flex justify-center md:justify-end shrink-0 max-w-[280px] md:max-w-[340px]">
          <img 
            src="/leftgoogle.png" 
            alt="Calendar Integration" 
            className="w-full object-contain drop-shadow-xl"
          />
        </div>

        {/* RIGHT SIDE: Content */}
        <div className="flex-1 w-full text-center md:text-left">
          <p className="text-[14px] font-extrabold tracking-[0.12em] text-gray-900 uppercase mb-1">
            Never Miss a Deadline
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#520380] uppercase tracking-tight mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
            CALENDAR
          </h2>
          <p className="text-gray-700 text-[15px] leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            Get automated updates on the newest paper submissions, registrations, and conference dates right in your personal calendar.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button
              type="button"
              onClick={handleAddToGoogle}
              disabled={!next}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#520380] text-white font-bold text-[13px] tracking-wide uppercase px-7 py-4 rounded-xl hover:bg-[#3d0260] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(82,3,128,0.3)]"
            >
              <HiCalendarDays className="w-5 h-5" /> 
              <span>Google Calendar</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={dated.length === 0}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white border-2 border-gray-200 text-gray-800 font-bold text-[13px] tracking-wide uppercase px-7 py-4 rounded-xl hover:border-[#520380]/40 hover:text-[#520380] hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiArrowDownTray className="w-5 h-5 text-gray-500 group-hover:text-[#520380] transition-colors" /> 
              <span>Download Calendar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 text-center">
        <p className="text-[13px] font-medium italic text-gray-400">
          Your calendar data is completely secure with us, we respect your privacy.
        </p>
      </div>
    </div>
  );
}
