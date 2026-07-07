"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cities } from "../../lib/galleryData";
import SkeletonImage from "../SkeletonImage";

const ease = [0.22, 1, 0.36, 1] as const;

export default function GalleryCities() {
  return (
    <section className="relative w-full py-24 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-[#520380] text-xs">♦</span>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#520380]">
              City Wise Collections
            </span>
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] font-light leading-[1.12] tracking-tight text-[#111111] max-w-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Explore Moments From <span style={{ color: "#520380" }}>Every Host City</span>
          </motion.h2>
        </motion.div>

        {/* Collection cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {cities.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <Link href={`/gallery/${c.slug}`} className="group block">
                {/* Mosaic preview */}
                  <div className="relative flex gap-1 h-[260px] rounded-2xl overflow-hidden">
                    <div className="relative flex-[1.6] overflow-hidden">
                      <SkeletonImage
                        src={c.cover}
                        alt={c.city}
                        fill
                        sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="relative flex-1 flex flex-col gap-1">
                      <div className="relative flex-1 overflow-hidden">
                        <SkeletonImage
                          src={c.thumb1}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 40vw, 15vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="relative flex-1 overflow-hidden">
                        <SkeletonImage
                          src={c.thumb2}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 40vw, 15vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent group-hover:from-black/10 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Caption */}
                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-[17px] font-bold text-[#111111] group-hover:text-[#520380] transition-colors duration-200">
                      {c.city}
                    </h3>
                    <p className="text-[12.5px] text-gray-500 mt-0.5">
                      {c.images.length} images &middot; GR Conferences
                    </p>
                  </div>
                  <span className="text-[#520380] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
