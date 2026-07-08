"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { fadeUp, staggerContainer, viewport } from "../lib/animations";

const institutions = [
  { file: "Aalen University, Germany.svg", name: "Aalen University, Germany" },
  { file: "American International University, Kuwait.png", name: "American International University, Kuwait" },
  { file: "American International University,Bangladesh.svg", name: "American International University, Bangladesh" },
  { file: "Amity University - Dubai Campus, United Arab Emirates.webp", name: "Amity University - Dubai Campus, United Arab Emirates" },
  { file: "Applied Quantum Technologies Institute (AQT), Columbia.svg", name: "Applied Quantum Technologies Institute (AQT), Columbia" },
  { file: "Bangladesh University of Business and Technology, Bangladesh.png", name: "Bangladesh University of Business and Technology, Bangladesh" },
  { file: "Birla Institute of Technology And Science, Pilani.png", name: "Birla Institute of Technology And Science, Pilani" },
  { file: "Birla Institute of Technology and Science, Pilani- Dubai, United Arab Emirates.png", name: "Birla Institute of Technology and Science, Pilani- Dubai, United Arab Emirates" },
  { file: "Birmingham City University, United Kingdom.png", name: "Birmingham City University, United Kingdom" },
  { file: "British Columbia Institute of Technology, Canada.webp", name: "British Columbia Institute of Technology, Canada" },
  { file: "British University In Dubai, United Arab Emirates.webp", name: "British University In Dubai, United Arab Emirates" },
  { file: "University_at_Buffalo_logo.svg", name: "University at Buffalo, New York, United States" },
  { file: "California State University, United States.png", name: "California State University, United States" },
  { file: "Cape Peninsula University of Technology, South Africa.webp", name: "Cape Peninsula University of Technology, South Africa" },
  { file: "Carleton University,Canada.svg", name: "Carleton University, Canada" },
  { file: "Chiang Mai University, Thailand.png", name: "Chiang Mai University, Thailand" },
  { file: "Cyprus International University, Cyprus.svg", name: "Cyprus International University, Cyprus" },
  { file: "Daffodil international university.svg", name: "Daffodil international university" },
  { file: "de-la-salle-araneta-university-seeklogo.svg", name: "De La Salle University Manila, Philippines" },
  { file: "Loyola_University_Chicago_idtqOEx-Qm_1.svg", name: "Loyola University Chicago, United States" },
  { file: "Department of Information Technology, Sri Lanka Institute of Infromation Technology, Sri Lanka.svg", name: "Department of Information Technology, Sri Lanka Institute of Infromation Technology, Sri Lanka" },
  { file: "Department Of Management Studies, IIT Madras.png", name: "Department Of Management Studies, IIT Madras" },
  { file: "Drexel University, United States.png", name: "Drexel University, United States" },
  { file: "Dyson Institute of Engineering and Technology, United Kingdom.svg", name: "Dyson Institute of Engineering and Technology, United Kingdom" },
  { file: "Eastern Washington University,United States.svg", name: "Eastern Washington University, United States" },
  { file: "Embry-Riddle Aeronautical University - Daytona Beach, United States.svg", name: "Embry-Riddle Aeronautical University - Daytona Beach, United States" },
  { file: "Emporia State University, United States.svg", name: "Emporia State University, United States" },
  { file: "Faculty of Informatics, Mahasarakham University, Thailand.webp", name: "Faculty of Informatics, Mahasarakham University, Thailand" },
  { file: "Fairmont Preparatory Academy,United States.png", name: "Fairmont Preparatory Academy, United States" },
  { file: "Fordham University, United States.svg", name: "Fordham University, United States" },
  { file: "Grambling State University, United States.png", name: "Grambling State University, United States" },
  { file: "IIM Kozhikode.jpg", name: "IIM Kozhikode" },
  { file: "Indian Institute of Technology (BHU).png", name: "Indian Institute of Technology (BHU)" },
  { file: "Indian Institute of Technology Guwahati.png", name: "Indian Institute of Technology Guwahati" },
  { file: "Indian Institute of Technology Kanpur.png", name: "Indian Institute of Technology Kanpur" },
  { file: "Indian Institute of Technology Roorkee.png", name: "Indian Institute of Technology Roorkee" },
  { file: "Indian Institute of Technology, Kharagpur.png", name: "Indian Institute of Technology, Kharagpur" },
  { file: "Informatique et Applications, Universite Ibn Tofail Kenitra, Morocco.png", name: "Informatique et Applications, Universite Ibn Tofail Kenitra, Morocco" },
  { file: "Jahangirnagar University, Bangladesh.png", name: "Jahangirnagar University, Bangladesh" },
  { file: "Jakarta State University, Indonesia.png", name: "Jakarta State University, Indonesia" },
  { file: "Khon Kaen University, Thailand.png", name: "Khon Kaen University, Thailand" },
  { file: "King Mongkut's University of Technology North Bangkok Thailand.webp", name: "King Mongkut's University of Technology North Bangkok Thailand" },
  { file: "King Saud University, Saudi Arabia.png", name: "King Saud University, Saudi Arabia" },
  { file: "Leeds Institute for Data Analytics (LIDA), University of Leeds, UK, United Kingdom.png", name: "Leeds Institute for Data Analytics (LIDA), University of Leeds, UK, United Kingdom" },
  { file: "Lorma Colleges, Inc., Philippines.avif", name: "Lorma Colleges, Inc., Philippines" },
  { file: "Loughborough University London, United Kingdom.webp", name: "Loughborough University London, United Kingdom" },
  { file: "Manipal Academy of Higher Education - Dubai Campus, United Arab Emirates.webp", name: "Manipal Academy of Higher Education - Dubai Campus, United Arab Emirates" },
  { file: "Middlesex University Dubai - Main Campus, United Arab Emirates.svg", name: "Middlesex University Dubai - Main Campus, United Arab Emirates" },
  { file: "Morgan_State_University_idqQMmIukH_1.svg", name: "Morgan State University, United States" },
  { file: "Namibia University of Science and Technology, Namibia.png", name: "Namibia University of Science and Technology, Namibia" },
  { file: "NIT Warangal.jpg", name: "NIT Warangal" },
  { file: "Pangasinan State University, Philippines.png", name: "Pangasinan State University, Philippines" },
  { file: "Qatar University, Qatar.png", name: "Qatar University, Qatar" },
  { file: "Rajamangala University of Technology Thanyaburi, Thailand.gif", name: "Rajamangala University of Technology Thanyaburi, Thailand" },
  { file: "Saint Louis University, United States.jpg", name: "Saint Louis University, United States" },
  { file: "San Diego State University, United States.svg", name: "San Diego State University, United States" },
  { file: "School of Interdisciplinary Research, Indian Institute of Technology Delhi.png", name: "School of Interdisciplinary Research, Indian Institute of Technology Delhi" },
  { file: "Tallinn University of Technology, Estonia.svg", name: "Tallinn University of Technology, Estonia" },
  { file: "Tashkent State Agrarian University, Uzbekistan.png", name: "Tashkent State Agrarian University, Uzbekistan" },
  { file: "Tashkent State University of Economics, Uzbekistan.png", name: "Tashkent State University of Economics, Uzbekistan" },
  { file: "Telkom University, Indonesia.webp", name: "Telkom University, Indonesia" },
  { file: "Thammasat University, Thailand.jpg", name: "Thammasat University, Thailand" },
  { file: "University_of_Waterloo_id4vOpjfR2_1.svg", name: "University of Waterloo, Canada" },
  { file: "CMU_sub-logo.svg", name: "Carnegie Mellon University, United States" },
  { file: "Universiti Kuala Lumpur, Malaysia.webp", name: "Universiti Kuala Lumpur, Malaysia" },
  { file: "University of Botswana, Botswana.png", name: "University of Botswana, Botswana" },
  { file: "University of Buckingham, United Kingdom.webp", name: "University of Buckingham, United Kingdom" },
  { file: "University of California, United States.avif", name: "University of California, United States" },
  { file: "University of Cape Town, South Africa.svg", name: "University of Cape Town, South Africa" },
  { file: "University of Chicago, United States.svg", name: "University of Chicago, United States" },
  { file: "University_of_Florida_logo.svg", name: "University of Florida, United States" },
  { file: "University of Johannesburg, South Africa.svg", name: "University of Johannesburg, South Africa" },
  { file: "University of Liverpool, United Kingdom.svg", name: "University of Liverpool, United Kingdom" },
  { file: "University of Reading, United Kingdom.png", name: "University of Reading, United Kingdom" },
  { file: "University of South Africa, South Africa.webp", name: "University of South Africa, South Africa" },
  { file: "University of Toronto, Canada.webp", name: "University of Toronto, Canada" },
  { file: "University of Westminster, United Kingdom.webp", name: "University of Westminster, United Kingdom" },
  { file: "Virginia Tech, United States.svg", name: "Virginia Tech, United States" },
  { file: "Washington State University, United States.svg", name: "Washington State University, United States" },
  { file: "York University, Canada.jpg", name: "York University, Canada" },
] as { file: string; name: string; folder?: string }[];

// Real institutional partner logos — kept in their own row, separate from the
// "Participating Institutions" wall above. A few filenames are duplicates of
// the same logo (img02/img06/img07 etc.) — only one copy of each is listed.
const institutionalPartners = [
  { file: "springer-seeklogo.svg",       name: "Springer",        folder: "Publication Partners/Publication Partners" },
  { file: "Springer_Nature_Logo.svg",    name: "Springer Nature", folder: "Publication Partners/Publication Partners" },
  { file: "IEEE_logo.svg",               name: "IEEE",            folder: "Publication Partners/Publication Partners" },
  { file: "Scopus_logo.svg",             name: "Scopus",          folder: "Publication Partners/Publication Partners" },
  { file: "SCImago_idRaeTB19O_1.svg",    name: "SCImago",         folder: "Publication Partners/Publication Partners" },
  { file: "IET_Logo.svg",                name: "(IET) Inspec",    folder: "Publication Partners/Publication Partners" },
  { file: "DBLP.png",                    name: "DBLP",            folder: "Publication Partners/Publication Partners" },
] as { file: string; name: string; folder?: string }[];

const maskStyle: React.CSSProperties = {
  maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
};

function InstitutionLogoItem({ file, name, folder = "conf logo" }: { file: string; name: string; folder?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="mx-8 shrink-0 text-[11px] font-bold uppercase tracking-[0.15em] text-white/30 whitespace-nowrap cursor-default select-none">
        {name}
      </span>
    );
  }

  return (
    <img
      src={`/${folder}/${file}`}
      alt={name}
      title={name}
      draggable={false}
      onError={() => setFailed(true)}
      className="mx-10 shrink-0 object-contain select-none opacity-80 hover:opacity-100 transition-opacity duration-300"
      style={{ height: 70, width: "auto", maxWidth: 220 }}
    />
  );
}

export default function PartnersSection() {
  return (
    <section id="partners" className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2e1a45 0%, #341d50 40%, #281540 70%, #2e1a45 100%)" }}
    >

      {/* Soft purple glow top-right */}
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(82,3,128,0.12) 0%, transparent 65%)" }}
      />
      {/* Soft glow bottom-left */}
      <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)" }}
      />

      {/* Top edge */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col lg:flex-row">

        {/* ── Left: Editorial header ── */}
        <motion.div
          className="relative lg:w-[400px] xl:w-[450px] flex-shrink-0 flex flex-col justify-between pl-8 lg:pl-14 pr-8 py-16 lg:py-20 border-b lg:border-b-0 border-r border-white/[0.07]"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#520380]/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <motion.span variants={fadeUp} className="text-[#520380] font-bold tracking-[0.14em] uppercase text-[11px] mb-5 flex items-center gap-2">
              <span className="text-[#520380] text-xs">♦</span>
              Partners & Institutions
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Trusted By The<br />
              <span className="text-[#520380]">World's Best</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 text-sm leading-relaxed mb-10 max-w-xs">
              Partnering with leading universities, publishers, research bodies and global institutions worldwide.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-8 mb-10">
              <div>
                <p className="text-white text-3xl font-extrabold tracking-tight leading-none mb-1">150+</p>
                <p className="text-white/35 text-xs uppercase tracking-widest">Countries</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-white text-3xl font-extrabold tracking-tight leading-none mb-1">7500+</p>
                <p className="text-white/35 text-xs uppercase tracking-widest">Institutions</p>
              </div>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="/join/partner"
              className="group inline-flex items-center gap-3 font-bold text-white transition-all duration-300"
              style={{
                padding: "14px 32px",
                fontSize: 14,
                background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)",
                borderRadius: 10,
                boxShadow: "0 4px 24px rgba(82,3,128,0.30)",
              }}
              whileHover={{ y: -2, boxShadow: "0 10px 36px rgba(82,3,128,0.50)" }}
              whileTap={{ scale: 0.97 }}
            >
              Become a Partner
              <FaArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </motion.div>

        {/* ── Right: Two scrolling logo rows ── */}
        <div className="flex-1 flex flex-col justify-center py-14 lg:py-20 gap-10 overflow-hidden">

          {/* Row label */}
          <div className="px-8 lg:px-12 flex items-center justify-between gap-4">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">Publication Partners</span>
            <a href="/partners" className="group flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 hover:text-[#a259ff] transition-colors whitespace-nowrap">
              See All
              <FaArrowRight size={9} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Row 1 — real institutional partner logos, scroll left (right to left) */}
          <div style={maskStyle} className="relative">
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "radial-gradient(ellipse 55% 100% at 0% 50%, rgba(139,61,255,0.13) 0%, rgba(82,3,128,0.07) 35%, transparent 70%)",
              }}
            />
            <div className="flex items-center w-max" style={{ animation: "scroll-left 8s linear infinite" }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
            >
              {[...institutionalPartners, ...institutionalPartners].map((inst, i) => (
                <InstitutionLogoItem key={i} file={inst.file} name={inst.name} folder={inst.folder} />
              ))}
            </div>
          </div>

          {/* Row label */}
          <div className="px-8 lg:px-12 mt-14 flex items-center justify-between gap-4">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">Author Institutions</span>
            <a href="/partners" className="group flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 hover:text-[#a259ff] transition-colors whitespace-nowrap">
              See All
              <FaArrowRight size={9} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Row 2 — real university logo images, scroll right */}
          <div style={maskStyle} className="relative">
            {/* Left-to-right spotlight behind logos */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "radial-gradient(ellipse 55% 100% at 0% 50%, rgba(139,61,255,0.13) 0%, rgba(82,3,128,0.07) 35%, transparent 70%)",
              }}
            />
            <div className="flex items-center w-max" style={{ animation: "scroll-right 110s linear infinite" }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
            >
              {[...institutions, ...institutions].map((inst, i) => (
                <InstitutionLogoItem key={i} file={inst.file} name={inst.name} folder="Participating Institutions" />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <style>{`
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
