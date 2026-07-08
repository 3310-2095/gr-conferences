"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineEye, HiOutlineRocketLaunch, HiOutlineCheck } from "react-icons/hi2";

const ease = [0.16, 1, 0.3, 1] as const;

const visionPoints = [
  "Interdisciplinary collaboration across all fields",
  "Accessible to researchers at every career stage",
  "High-quality, peer-reviewed academic standards",
];

const missionPoints = [
  "Ideas and innovation that inspire positive change",
  "Meaningful platforms for global knowledge sharing",
  "Connecting the brightest minds across every border",
  "Fostering sustainable academic partnerships",
];

export default function VisionMission() {
  return (
    <section className="relative bg-[#FAFAFA] overflow-hidden py-16 lg:py-20">
      {/* Premium subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-white to-[#F8FAFC] pointer-events-none" />
      
      {/* Decorative blurred shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6 lg:mb-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
                        <span style={{ color: "#520380", fontSize: 12 }}>♦</span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700">
               Vision & Mission
              </span>
            </motion.div>
            
          
          </div>
          
    
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Vision Bento - Span 7 */}
          <motion.div
            id="vision"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white rounded-xl p-10 lg:p-14 shadow-[0_8px_32px_rgba(82,3,128,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:shadow-[0_16px_48px_rgba(82,3,128,0.14),0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-500 scroll-mt-24"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100/60 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100/50">
                    <HiOutlineEye size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Our Vision
                  </h3>
                </div>
                
                <h4 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-6 leading-tight tracking-tight">
                  Enable global <br className="hidden sm:block"/> knowledge exchange
                </h4>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
                  To empower interdisciplinary collaboration through accessible, high-quality research conferences that transcend borders and academic disciplines.
                </p>
              </div>
              
              <ul className="flex flex-col gap-4">
                {visionPoints.map((pt, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <HiOutlineCheck size={14} className="text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Image Bento - Span 5 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-xl relative group transition-all duration-500 min-h-[400px] lg:min-h-[500px]"
          >
            {/* Inner clipped image wrapper */}
            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
              <Image
                src="/ourvision.jpg"
                alt="Global research and collaboration"
                fill
                loading="lazy"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              {/* Soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/20 to-transparent opacity-90" />

              <div className="absolute bottom-10 left-10 right-10 z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-white/70" />
                  <span className="text-xs font-bold tracking-widest uppercase text-white/90">Global Impact</span>
                </div>
                <h4 className="text-2xl lg:text-3xl text-white font-medium leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Connecting the brightest minds <br className="hidden lg:block" /> across every border.
                </h4>
              </div>
            </div>

            {/* Decorative corner frame */}
            <div
              className="absolute -bottom-3 -right-3 w-20 h-20 rounded-br-2xl pointer-events-none z-20"
              style={{
                border: "2px solid rgba(82,3,128,0.35)",
                borderTop: "none",
                borderLeft: "none",
              }}
            />
            <div
              className="absolute -top-3 -left-3 w-20 h-20 rounded-tl-2xl pointer-events-none z-20"
              style={{
                border: "2px solid rgba(124,58,237,0.25)",
                borderBottom: "none",
                borderRight: "none",
              }}
            />
          </motion.div>

          {/* Mission Bento - Span 12 */}
          <motion.div
            id="mission"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-12 bg-white rounded-xl p-10 lg:p-16 shadow-[0_8px_32px_rgba(82,3,128,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:shadow-[0_16px_48px_rgba(82,3,128,0.14),0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20 scroll-mt-24"
          >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-l from-indigo-50/80 to-transparent rounded-full opacity-50 blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

            <div className="lg:w-5/12 relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100/50">
                  <HiOutlineRocketLaunch size={24} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Mission
                </h3>
              </div>
              <h4 className="text-3xl lg:text-4xl font-medium text-gray-900 leading-tight tracking-tight mb-6">
                Create meaningful <br className="hidden lg:block"/> platforms for change
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                To create meaningful platforms where ideas, innovation, and research can inspire positive change — connecting the brightest minds across every corner of the world.
              </p>
            </div>

            <div className="hidden lg:block w-px h-32 bg-gray-100 relative z-10" />

            <div className="lg:w-6/12 relative z-10 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {missionPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                      <HiOutlineCheck size={16} className="text-indigo-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-base pt-1">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
