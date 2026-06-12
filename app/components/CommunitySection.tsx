"use client";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { 
  HiOutlineDocumentText, 
  HiOutlineMagnifyingGlass, 
  HiOutlineMicrophone, 
  HiOutlineUserGroup, 
  HiOutlineAcademicCap, 
  HiOutlineBuildingLibrary 
} from "react-icons/hi2";
import { fadeUp, staggerContainer, staggerFast, viewport } from "../lib/animations";

const actions = [
  { icon: HiOutlineDocumentText, label: "Submit Your Paper", sub: "Present your work" },
  { icon: HiOutlineMagnifyingGlass, label: "Join as Reviewer", sub: "Peer review" },
  { icon: HiOutlineMicrophone, label: "Join as Speaker", sub: "Speak at a Conference" },
  { icon: HiOutlineUserGroup, label: "Join as Session Chair", sub: "Lead sessions" },
  { icon: HiOutlineAcademicCap, label: "Join Advisory Board", sub: "Guide our vision" },
  { icon: HiOutlineBuildingLibrary, label: "Institutional Partnership", sub: "Partner with us" },
];

export default function CommunitySection() {
  return (
    <section id="community" className="relative py-22 lg:py-25 bg-[#0a0b18] overflow-hidden">
      <div className="absolute inset-0 bg-wave opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9d78e2]/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-wider">
            Built By Researchers, For Researchers
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#b3b0cb] text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
            Become part of a growing international research community.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerFast} initial="hidden" whileInView="show" viewport={viewport}
        >
          {actions.map((action, idx) => (
            <motion.button
              key={idx}
              variants={fadeUp}
              className="flex items-center gap-5 p-6 rounded-3xl bg-[#14122b] border border-white/5 hover:border-[#9d78e2]/50 hover:bg-[#1e193e] transition-all group text-left"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 group-hover:bg-[#9d78e2]/20 flex items-center justify-center transition-colors">
                <action.icon size={28} className="text-[#9d78e2]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-white mb-1 group-hover:text-[#9d78e2] transition-colors">{action.label}</h3>
                <p className="text-sm text-[#b3b0cb]">{action.sub}</p>
              </div>
              <HiArrowRight className="text-white/20 group-hover:text-white transition-colors" size={20} />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
