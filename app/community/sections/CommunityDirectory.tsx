"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HiMapPin, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { communityMembers } from "../../lib/communityMembers";

const ease = [0.22, 1, 0.36, 1] as const;
const PER_PAGE = 48;

export default function CommunityDirectory() {
  const [page, setPage] = useState(1);

  const sorted = useMemo(
    () => [...communityMembers].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const pageItems = sorted.slice(start, start + PER_PAGE);

  function goToPage(p: number) {
    setPage(Math.min(Math.max(1, p), totalPages));
    document.getElementById("all-community-members")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="all-community-members" className="relative w-full py-20 lg:py-24 bg-[#faf8fc] overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: "#520380", fontSize: 12 }}>♦</span>
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#520380]">Our People</p>
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-[#111111] tracking-tight">
              All Community Members
            </h3>
          </div>
          <span className="text-[13px] text-gray-400 font-medium">
            {sorted.length.toLocaleString()} members &middot; page {page} of {totalPages}
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pageItems.map((member, i) => (
            <motion.div
              key={`${member.name}-${start + i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: (i % 12) * 0.03 }}
              viewport={{ once: true, margin: "-40px" }}
              className="flex flex-col gap-1.5 bg-white rounded-xl px-5 py-4 border border-gray-100 hover:border-[#520380]/20 hover:shadow-[0_8px_24px_rgba(82,3,128,0.08)] transition-all duration-200"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#520380]/60 w-fit">
                {member.tag}
              </span>
              <h4 className="text-[14px] font-semibold text-[#111] leading-snug">{member.name}</h4>
              <p className="text-[12px] text-gray-500 leading-snug">{member.institution}</p>
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <HiMapPin className="w-3 h-3" /> {member.country}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#520380]/40 hover:text-[#520380] transition-colors"
              aria-label="Previous page"
            >
              <HiChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | "ellipsis")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("ellipsis");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "ellipsis" ? (
                  <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-gray-300 text-sm">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-bold transition-colors ${
                      p === page ? "bg-[#520380] text-white" : "border border-gray-200 text-gray-600 hover:border-[#520380]/40 hover:text-[#520380]"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#520380]/40 hover:text-[#520380] transition-colors"
              aria-label="Next page"
            >
              <HiChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
