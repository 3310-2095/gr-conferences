"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HiMapPin, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { authors } from "../../lib/authors";

const ease = [0.22, 1, 0.36, 1] as const;
const PER_PAGE = 48;

export default function CommunityDirectory() {
  const [page, setPage] = useState(1);

  const sorted = useMemo(
    () => [...authors].sort((a, b) => a.name.localeCompare(b.name)),
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {pageItems.map((member, i) => (
            <motion.div
              key={`${member.name}-${start + i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: (i % 12) * 0.03 }}
              viewport={{ once: true, margin: "-40px" }}
              className="group flex flex-col items-center text-center bg-white rounded-2xl pt-6 pb-4 px-3 border border-gray-100 hover:border-[#520380]/25 hover:shadow-[0_12px_32px_rgba(82,3,128,0.10)] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative mb-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f3eeff] to-[#e8d5ff] p-0.5">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover bg-[#f3eeff]"
                  />
                </div>
              </div>
              <h4 className="text-[13px] font-semibold text-[#111] leading-snug line-clamp-2 w-full">{member.name}</h4>
              {member.country && (
                <div className="flex items-center justify-center gap-1 mt-1 text-[11px] text-[#520380]/60 font-medium">
                  <HiMapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate max-w-[90px]">{member.country}</span>
                </div>
              )}
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
