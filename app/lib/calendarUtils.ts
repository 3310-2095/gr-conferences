import type { Conference } from "./conferenceData";

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export type DateRange = { start: Date; end: Date };

/** Parses strings like "9–11 July 2026" or "22–23 May 2026" into real Dates. Returns null for "Coming Soon" / "Date TBA". */
export function parseConferenceDateRange(date: string, year: number): DateRange | null {
  const match = date.match(/(\d{1,2})(?:[–-](\d{1,2}))?\s+([A-Za-z]+)\s+(\d{4})/);
  if (!match) return null;
  const [, startDayStr, endDayStr, monthName, yearStr] = match;
  const monthIndex = MONTHS.findIndex((m) => m.toLowerCase() === monthName.toLowerCase());
  if (monthIndex === -1) return null;
  const y = Number(yearStr) || year;
  const startDay = Number(startDayStr);
  const endDay = endDayStr ? Number(endDayStr) : startDay;
  return {
    start: new Date(y, monthIndex, startDay),
    end: new Date(y, monthIndex, endDay),
  };
}

function toYyyymmdd(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

/** Google Calendar's date range end is exclusive, so the caller-facing end date needs +1 day. */
function exclusiveEnd(d: Date): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + 1);
  return next;
}

export function buildGoogleCalendarUrl(conf: Conference, range: DateRange): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${conf.name} — ${conf.fullName}`,
    dates: `${toYyyymmdd(range.start)}/${toYyyymmdd(exclusiveEnd(range.end))}`,
    location: conf.location,
    details: `${conf.fullName}\n${conf.website}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildVenueMapUrl(location: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildIcsCalendar(entries: { conf: Conference; range: DateRange }[]): string {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//GR Conferences//Calendar//EN", "CALSCALE:GREGORIAN"];
  entries.forEach(({ conf, range }) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:conf-${conf.id}@grconferences`,
      `SUMMARY:${escapeIcsText(`${conf.name} — ${conf.fullName}`)}`,
      `DTSTART;VALUE=DATE:${toYyyymmdd(range.start)}`,
      `DTEND;VALUE=DATE:${toYyyymmdd(exclusiveEnd(range.end))}`,
      `LOCATION:${escapeIcsText(conf.location)}`,
      `DESCRIPTION:${escapeIcsText(conf.website)}`,
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export type StatusBadge = { label: string; dotClass: string; pillClass: string };

/** Derives a status badge from real fields only — resolves to Upcoming/Completed today, and
 *  upgrades automatically once real submissionDeadline/registrationDeadline values are added. */
export function getStatusBadge(conf: Conference): StatusBadge {
  if (conf.status === "past") {
    return { label: "Completed", dotClass: "bg-gray-400", pillClass: "bg-gray-100 text-gray-600" };
  }
  if (conf.submissionDeadline) {
    return { label: "Open for Submission", dotClass: "bg-emerald-500", pillClass: "bg-emerald-50 text-emerald-700" };
  }
  if (conf.registrationDeadline) {
    return { label: "Registration Open", dotClass: "bg-amber-500", pillClass: "bg-amber-50 text-amber-700" };
  }
  return { label: "Upcoming", dotClass: "bg-[#520380]", pillClass: "bg-[#f3e8ff] text-[#520380]" };
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
