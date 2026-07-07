"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { HiArrowLeft, HiMapPin } from "react-icons/hi2";
import { getCity } from "../../lib/galleryData";
import SkeletonImage from "../SkeletonImage";

const ease = [0.22, 1, 0.36, 1] as const;

// Cycle through a few heights so the masonry columns feel organic, Pinterest-style
const HEIGHTS = ["h-56", "h-72", "h-64", "h-80", "h-60", "h-96"];

// Renders a batch at a time instead of mounting every photo (some galleries have 90+
// full-resolution images) — keeps the number of concurrent image requests down.
const BATCH_SIZE = 24;

export default function CityGalleryPage() {
  const params = useParams<{ slug: string }>();
  const city = getCity(params.slug);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const isLoadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [params.slug]);

  const total = city?.images.length ?? 0;
  const hasMore = visibleCount < total;

  const loadMore = useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    // Small delay so the loader is visible instead of an instant, jarring pop-in.
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + BATCH_SIZE, total));
      isLoadingRef.current = false;
    }, 400);
  }, [total]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "400px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  if (!city) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6" style={{ paddingTop: 72 }}>
        <p className="text-gray-400 text-lg mb-4">We couldn't find that gallery.</p>
        <Link href="/gallery" className="text-[#520380] font-semibold hover:underline text-sm">
          &larr; Back to Gallery
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-white" style={{ paddingTop: 72 }}>
      {/* Header */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-14 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-[#520380] transition-colors mb-6"
          >
            <HiArrowLeft className="w-4 h-4" /> Back to Gallery
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <HiMapPin className="w-4 h-4 text-[#520380]" />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#520380]">
              {city.country}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {city.city}
          </h1>
          <p className="text-gray-500 text-base max-w-xl leading-relaxed">
            {city.images.length} images &middot; destination views and conference moments from{" "}
            {city.city}, {city.country}.
          </p>
        </motion.div>
      </section>

      {/* Pinterest-style masonry */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
          {city.images.slice(0, visibleCount).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: (i % 8) * 0.05 }}
              viewport={{ once: true, margin: "-40px" }}
              className={`relative mb-3 rounded-xl overflow-hidden break-inside-avoid group ${HEIGHTS[i % HEIGHTS.length]}`}
            >
              <SkeletonImage
                src={img.src}
                alt={`${city.city} ${img.type}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div ref={sentinelRef} className="flex justify-center items-center py-10">
            <span
              className="w-6 h-6 rounded-full border-2 border-[#520380]/20 border-t-[#520380] animate-spin"
              aria-label="Loading more photos"
            />
          </div>
        )}
      </section>
    </main>
  );
}
