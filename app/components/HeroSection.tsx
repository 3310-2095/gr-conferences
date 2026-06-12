"use client";
import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi2";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { fadeUp, fadeIn, staggerContainer, viewport } from "../lib/animations";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex flex-col justify-end pb-24 lg:pb-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85"
          alt="Conference Speaker"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Gradient Overlay (Bottom to Top) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0b1021] via-[#0b1021]/60 to-transparent" />
      <div className="absolute inset-0 z-0 bg-[#0b1021]/30" />

      {/* Content Container */}
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10 flex flex-col justify-between flex-1 mt-32 lg:mt-40">
        
        {/* Center Text Content */}
        <motion.div
          className="flex justify-center items-center w-full my-auto text-center"
          variants={staggerContainer} initial="hidden" animate="show"
        >
          <div className="max-w-[900px] flex flex-col items-center">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-[50px] font-bold text-white leading-[1.1] mb-6">
              Connecting Global Research Communities
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg lg:text-xl max-w-[950px] mb-10 leading-relaxed font-light">
              One platform connecting researchers, reviewers, speakers, institutions
              and innovators through a growing ecosystem of international academic
              conferences across 50+ countries.
            </motion.p>

            <motion.a variants={fadeUp} href="#community" className="flex items-center gap-2 text-white font-semibold text-sm hover:text-[#9d78e2] transition-colors">
              See more about us
              <HiArrowDown size={14} />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Area: Social Icons */}
        <motion.div
          className="flex justify-end w-full mt-10"
          variants={fadeIn} initial="hidden" animate="show"
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/60 hover:text-white transition-colors"><FaFacebookF size={16} /></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><FaTwitter size={16} /></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><FaLinkedinIn size={16} /></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><FaInstagram size={16} /></a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
