"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const team = [
  { name: "Amit Joshi",              role: "Director",                  img: "/team/amit_joshi.png" },
  { name: "Mihir Chauhan",           role: "Director",                  img: "/team/mihir_chauhan.png" },
  { name: "Aman Barot",              role: "Associate Director",         img: "/team/AmanBarot.jpg" },
  { name: "Richa Sharma",            role: "Manager",                   img: "/team/Richa_page-0001.jpg" },
  { name: "Riddhi Gohel",            role: "Associate Manager",         img: "/team/Riddhi_Gohel.png" },
  { name: "Anisha Mishra",           role: "Assistant Manager",         img: "/team/Anisha_page-0001.jpg" },
  { name: "Parth Vekariya",          role: "Assistant",                 img: "/team/parth-vekariya.png" },
  { name: "Sudarshan Singh Jaitawat",role: "Operation Associate",       img: "/team/Sudarshan Si ngh_page-0001.jpg" },
  { name: "Chirag Bhati",            role: "Operation Associate",       img: "/team/Chirag.jpg" },
  { name: "Anmol Daswani",           role: "Operation Associate",       img: "/team/Anmol.jpg" },
  { name: "Shivam Vakani",           role: "Assistant – IT Support",    img: "/team/shivam-vakani.png" },
  { name: "Jatin Gohel",             role: "Assistant – Digital Publishing", img: "/team/Jatin-Gohel.jpg" },
  { name: "Komal Parmar",            role: "Assistant Executive",       img: "/team/komal_page-0001.jpg" },
];

export default function Team() {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-[#F9F7FF] overflow-hidden">
      {/* Soft bg glows */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(82,3,128,0.06) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

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
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#520380]">Our Team</span>
          </motion.div>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] font-light leading-[1.12] tracking-tight text-[#111111] mb-4 max-w-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Meet the people guiding the{" "}
            <span style={{ color: "#520380" }}>GR Conferences</span> ecosystem.
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: i * 0.05 }}
              viewport={{ once: true, margin: "-40px" }}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(82,3,128,0.08)",
                boxShadow: "0 2px 12px rgba(82,3,128,0.04)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 16px 40px rgba(82,3,128,0.13)";
                el.style.borderColor = "rgba(82,3,128,0.22)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 2px 12px rgba(82,3,128,0.04)";
                el.style.borderColor = "rgba(82,3,128,0.08)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/4] overflow-hidden bg-[#f3eeff]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="px-5 py-4 flex flex-col gap-1">
                {/* Role badge */}
                <span
                  className="text-[9.5px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: "rgba(82,3,128,0.5)" }}
                >
                  {member.role}
                </span>
                {/* Name */}
                <h3
                  className="text-[15px] font-semibold leading-snug text-[#111] transition-colors duration-200 group-hover:text-[#520380]"
                >
                  {member.name}
                </h3>
                {/* Bottom accent line */}
                <div
                  className="mt-2 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-8"
                  style={{ background: "linear-gradient(90deg, #520380, #8b3dff)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
