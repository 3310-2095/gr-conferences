"use client";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, scaleIn, viewport } from "../lib/animations";

export default function AboutSection() {
  return (
    <section className="relative py-16 lg:py-20 bg-[#F2EBF2] overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(157,120,226,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
          >
            <motion.span variants={fadeUp} className="text-[#9d78e2] text-sm font-bold tracking-widest uppercase mb-4 block">
              About GR Conferences
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 uppercase tracking-wider leading-tight">
              One Network. <br/>
              Multiple Conferences. <br/>
              <span className="text-[#9d78e2]">Global Impact.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-base leading-relaxed mb-4 font-medium">
              GR Conferences is the integrated conference ecosystem of GR Foundation, connecting researchers, academicians, industry experts, and institutions through a diverse portfolio of international conferences.
            </motion.p>
            <motion.p variants={fadeUp} className="text-slate-600 text-base leading-relaxed mb-7 font-medium">
              Explore opportunities to present, collaborate, publish, and engage with global research communities.
            </motion.p>
            <motion.a variants={fadeUp} href="#community" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#9d78e2] to-[#b58ffd] text-white font-bold tracking-wide hover:shadow-[0_10px_30px_rgba(157,120,226,0.3)] transition-all">
              See More About Us
              <HiArrowRight size={18} />
            </motion.a>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeRight} initial="hidden" whileInView="show" viewport={viewport}
          >
            <div className="rounded-[40px] overflow-hidden border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white p-3 transition-transform hover:scale-[1.02] duration-500">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" 
                alt="Global Conference Map"
                className="w-full h-auto rounded-[32px] object-cover"
              />
            </div>
            <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-[#9d78e2] rounded-full shadow-[0_0_15px_#9d78e2] animate-pulse"></div>
            <div className="absolute top-[40%] right-[30%] w-3 h-3 bg-[#b58ffd] rounded-full shadow-[0_0_15px_#b58ffd] animate-pulse delay-75"></div>
            <div className="absolute bottom-[40%] right-[20%] w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white] animate-pulse delay-150"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
