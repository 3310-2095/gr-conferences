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

// Every label gets its own distinct color — nothing shares a swatch with another status,
// so "Completed" reads as clearly different from e.g. "Registration Closed" at a glance.
const STATUS_STYLES: Record<string, { dotClass: string; pillClass: string }> = {
  "Completed": { dotClass: "bg-gray-500", pillClass: "bg-gray-800 text-white" },
  "Registration Closed": { dotClass: "bg-red-500", pillClass: "bg-red-50 text-red-600" },
  "Registration Open": { dotClass: "bg-amber-500", pillClass: "bg-amber-50 text-amber-700" },
  "Paper Submission Open": { dotClass: "bg-emerald-500", pillClass: "bg-emerald-50 text-emerald-700" },
  "Paper Submission closed": { dotClass: "bg-orange-500", pillClass: "bg-orange-50 text-orange-700" },
  "Registration Ongoing": { dotClass: "bg-blue-500", pillClass: "bg-blue-50 text-blue-700" },
  "First Deadline Approaching": { dotClass: "bg-rose-500", pillClass: "bg-rose-50 text-rose-700" },
  "Registration Not Yet Open": { dotClass: "bg-gray-400", pillClass: "bg-gray-100 text-gray-500" },
  "Upcoming": { dotClass: "bg-[#520380]", pillClass: "bg-[#f3e8ff] text-[#520380]" },
};

function badge(label: keyof typeof STATUS_STYLES): StatusBadge {
  return { label, ...STATUS_STYLES[label] };
}

/** Derives a status badge from real fields — compares deadlines against `today` so a
 *  submissionDeadline/registrationDeadline that has already passed shows as closed. */
export function getStatusBadge(conf: Conference, today: Date = new Date()): StatusBadge {
  if (conf.status === "past") {
    return badge("Completed");
  }
  if (conf.submissionDeadline) {
    const range = parseConferenceDateRange(conf.submissionDeadline, conf.year);
    if (range && range.end < today) {
      return badge("Paper Submission closed");
    }
    return badge("Paper Submission Open");
  }
  if (conf.registrationDeadline) {
    const range = parseConferenceDateRange(conf.registrationDeadline, conf.year);
    if (range && range.end < today) {
      return badge("Registration Closed");
    }
    return badge("Registration Open");
  }
  return badge("Upcoming");
}

const FIRST_DEADLINE_APPROACHING_DAYS = 30;

/** Derives up to two status badges — a primary submission/registration state plus a
 *  secondary contextual one — driven purely by the configured deadlines vs `today`, so
 *  they advance automatically as dates pass. Falls back to a single badge when no
 *  secondary status applies. */
export function getStatusBadges(conf: Conference, today: Date = new Date()): StatusBadge[] {
  if (conf.status === "past") {
    return [badge("Completed")];
  }

  const submissionRange = conf.submissionDeadline
    ? parseConferenceDateRange(conf.submissionDeadline, conf.year)
    : null;
  const submissionStatus: "open" | "closed" | "none" = !conf.submissionDeadline
    ? "none"
    : submissionRange && submissionRange.end < today
    ? "closed"
    : "open";

  if (conf.registrationDeadline) {
    const range = parseConferenceDateRange(conf.registrationDeadline, conf.year);
    if (range && range.end < today) {
      return [badge("Registration Closed")];
    }
    const registrationOpen = badge("Registration Open");
    if (submissionStatus === "open") {
      return [badge("Paper Submission Open"), registrationOpen];
    }
    if (submissionStatus === "closed") {
      return [badge("Paper Submission closed"), registrationOpen];
    }
    return [registrationOpen];
  }

  if (submissionStatus === "open") {
    const badges: StatusBadge[] = [badge("Paper Submission Open")];
    if (submissionRange) {
      const daysLeft = Math.ceil((submissionRange.end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= FIRST_DEADLINE_APPROACHING_DAYS) {
        badges.push(badge("First Deadline Approaching"));
      }
    }
    return badges;
  }

  if (submissionStatus === "closed") {
    return [badge("Paper Submission closed"), badge("Registration Ongoing")];
  }

  return [badge("Registration Not Yet Open"), badge("Upcoming")];
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
