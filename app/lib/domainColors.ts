// Tailwind's compiler statically scans source files for class-shaped substrings, so every
// variant must appear here as a full literal string — computing `bg-[${hex}]/10` at runtime
// would be invisible to the scanner and silently produce no styles.
const domainStyles: Record<string, { text: string; pill: string }> = {
  Sustainability: { text: "text-[#10b981]", pill: "bg-[#10b981]/10 text-[#10b981]" },
  ICT: { text: "text-[#3b82f6]", pill: "bg-[#3b82f6]/10 text-[#3b82f6]" },
  Innovation: { text: "text-[#f97316]", pill: "bg-[#f97316]/10 text-[#f97316]" },
  Technology: { text: "text-[#8b5cf6]", pill: "bg-[#8b5cf6]/10 text-[#8b5cf6]" },
  Business: { text: "text-[#f59e0b]", pill: "bg-[#f59e0b]/10 text-[#f59e0b]" },
  Computing: { text: "text-[#06b6d4]", pill: "bg-[#06b6d4]/10 text-[#06b6d4]" },
  Security: { text: "text-[#ef4444]", pill: "bg-[#ef4444]/10 text-[#ef4444]" },
  AI: { text: "text-[#a855f7]", pill: "bg-[#a855f7]/10 text-[#a855f7]" },
  Biotechnology: { text: "text-[#22c55e]", pill: "bg-[#22c55e]/10 text-[#22c55e]" },
  "Health Sciences": { text: "text-[#ec4899]", pill: "bg-[#ec4899]/10 text-[#ec4899]" },
  Management: { text: "text-[#eab308]", pill: "bg-[#eab308]/10 text-[#eab308]" },
  "Information Systems": { text: "text-[#6366f1]", pill: "bg-[#6366f1]/10 text-[#6366f1]" },
  "Digital Innovation": { text: "text-[#0ea5e9]", pill: "bg-[#0ea5e9]/10 text-[#0ea5e9]" },
  Research: { text: "text-[#14b8a6]", pill: "bg-[#14b8a6]/10 text-[#14b8a6]" },
  "Smart Computing": { text: "text-[#d946ef]", pill: "bg-[#d946ef]/10 text-[#d946ef]" },
  Communication: { text: "text-[#f43f5e]", pill: "bg-[#f43f5e]/10 text-[#f43f5e]" },
  Energy: { text: "text-[#fb923c]", pill: "bg-[#fb923c]/10 text-[#fb923c]" },
  Mathematics: { text: "text-[#64748b]", pill: "bg-[#64748b]/10 text-[#64748b]" },
  Physics: { text: "text-[#84cc16]", pill: "bg-[#84cc16]/10 text-[#84cc16]" },
};

const FALLBACK = { text: "text-gray-500", pill: "bg-gray-100 text-gray-500" };

export function getDomainColorTextOnly(domain: string): string {
  return (domainStyles[domain] ?? FALLBACK).text;
}

export function getDomainPillClasses(domain: string): string {
  return (domainStyles[domain] ?? FALLBACK).pill;
}
