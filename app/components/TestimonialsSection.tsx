"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChatBubbleBottomCenterText, HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { staggerContainer, viewport } from "../lib/animations";

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote: "My experience with ICICT 2026 was extremely positive. The conference provided a valuable forum for academic exchange and discussions on emerging ICT topics, while the organization and support from the conference team were excellent throughout. I was honored to participate both as a presenter and as a Session Chair, and I am grateful for the opportunity to contribute in these two roles.",
    name: "Michal K.",
    role: "School of Industrial Engineering and Management, Shenkar - Engineering. Design. Art., Israel",
    tag: "Speaker + Chair",
    countryCode: "il",
    country: "Israel",
  },
  {
    quote: "I have wide positive publishing experience with G R Conferences. All of them consolidate efforts of scientists from different countries and regions in the world as well as all of them connect with the brand-new topics of hi-tech and innovative Research and Advanced Development. We had a fruitful conversation and discussion with progressive leading scientists from European, Asian and Latin America countries on G R Conferences.",
    name: "Prof. Oleksandr H.",
    role: "State University of Trade and Economics, Ukraine",
    tag: "Session Chair",
    countryCode: "ua",
    country: "Ukraine",
  },
  {
    quote: "I have found the publication process with G R Conferences to be professional, efficient, and well-organized. The manuscript submission and peer-review processes were handled promptly, with constructive feedback that contributed to the quality of the final publication. The editorial team provided excellent support throughout the process.",
    name: "Prof. Benjamin G.",
    role: "University of Education, Winneba",
    tag: "Author",
    countryCode: "gh",
    country: "Ghana",
  },
  {
    quote: "I have found the entire conference process to be exceptionally well organised and seamless, from manuscript submission and peer review through to the final presentation. The editorial support and communication throughout the process have been professional, timely, and very helpful. I particularly enjoyed the networking session, which provided an excellent platform to engage with fellow researchers.",
    name: "Prof. Timothy Adeliyi",
    role: "University of Pretoria, South Africa",
    tag: "Speaker",
    countryCode: "za",
    country: "South Africa",
  },
  {
    quote: "My manuscript submission and publication journey was smooth, professional, and well-coordinated. The peer review process was constructive, the editorial support was responsive, and the conference materials and moderation were organized effectively. I am also grateful to have been invited to lead conference sessions, which made the overall academic experience even more meaningful.",
    name: "Dr. Ioseb G.",
    role: "Kauno Kolegija Higher Education Institution, Lithuania",
    tag: "Chair",
    countryCode: "lt",
    country: "Lithuania",
  },
  {
    quote: "I have had the opportunity to participate in several G R Conferences and to serve as Session Chair for the 2025 editions held in New York and Thailand. My experience with the manuscript submission process, peer review, editorial support, conference moderation, and publication activities has been positive and professionally managed.",
    name: "Dr. Estevan R.",
    role: "Universidad de las Fuerzas Armadas-ESPE, Ecuador",
    tag: "Speaker",
    countryCode: "ec",
    country: "Ecuador",
  },
  {
    quote: "The entire manuscript submission and publication process was remarkably smooth, and the editorial support I received throughout was excellent. I truly appreciate the professionalism and efficiency your team demonstrated at every stage. The time to get the papers online and indexed is short and helped a lot of researchers.",
    name: "Dr. Prashant D.",
    role: "MIT School of Computing, MIT ADT University, India",
    tag: "Author",
    countryCode: "in",
    country: "India",
  },
  {
    quote: "I am connected with G R Foundation since 2018, and ever since, I have witnessed its consistent commitment to promoting quality research and academic excellence. My experience with the manuscript submission, peer-review, and publication processes has been highly professional, transparent, and efficient.",
    name: "Prof. James S.",
    role: "Andhra University, Visakhapatnam",
    tag: "Researcher",
    countryCode: "in",
    country: "India",
  },
  {
    quote: "As a Session Chair associated with GR Foundation for the past five years, I have greatly appreciated their professionalism, dedication to quality research, and excellent conference organization. The publication process was smooth, transparent, and professionally managed. The editorial team provided timely support, and the peer-review process was constructive and insightful.",
    name: "Dr. Priya P.",
    role: "MIT World Peace University, India",
    tag: "Session Chair",
    countryCode: "in",
    country: "India",
  },
];

const COLS = 3;

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const tagColors: Record<string, string> = {
  "Speaker + Chair": "#FF5E3A",
  "Session Chair":   "#520380",
  "Chair":           "#520380",
  "Speaker":         "#0ea5e9",
  "Author":          "#16a34a",
  "Researcher":      "#d97706",
};

function TestimonialCard({ t, i }: { t: typeof testimonials[0]; i: number }) {
  const [expanded, setExpanded] = useState(false);
  const tagColor = tagColors[t.tag] ?? "#520380";

  return (
    <motion.div
      key={t.name}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: i * 0.08, ease }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
      className="group relative bg-white border border-gray-200 p-7 flex flex-col gap-5 hover:border-[#520380]/30 hover:shadow-[0_16px_48px_rgba(82,3,128,0.10)] transition-all duration-300"
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${tagColor}, ${tagColor}99)` }}
      />

      {/* Quote icon + tag */}
      <div className="flex items-center justify-between">
        <HiOutlineChatBubbleBottomCenterText
          style={{ color: `${tagColor}50` }}
          size={28}
        />
        <span
          className="text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border"
          style={{ color: tagColor, background: `${tagColor}12`, borderColor: `${tagColor}30` }}
        >
          {t.tag}
        </span>
      </div>

      {/* Quote */}
      <div className="flex-1">
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: expanded ? "600px" : "112px" }}
        >
          <p className="text-[#374151] text-[14px] leading-[1.8]">
            "{t.quote}"
          </p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-bold transition-colors duration-200"
          style={{ color: tagColor }}
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Author */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${tagColor}, ${tagColor}99)` }}
          >
            {getInitials(t.name)}
          </div>
          <div>
            <p className="text-[#111111] font-bold text-sm">{t.name}</p>
            <p className="text-[#9CA3AF] text-xs mt-0.5">{t.role}</p>
          </div>
        </div>

        {/* Flag */}
        <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
          <span
            className={`fi fi-${t.countryCode} rounded-sm`}
            style={{ width: 30, height: 30, display: "inline-block", fontSize: 20 }}
            title={t.country}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const totalPages = Math.ceil(testimonials.length / COLS);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);

  const paginate = (newPage: number) => {
    setDir(newPage > page ? 1 : -1);
    setPage(newPage);
  };

  const visible = testimonials.slice(page * COLS, page * COLS + COLS);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.35, ease } }),
  };

  return (
    <section id="testimonials" className="relative py-16 lg:py-20 bg-[#F9F9F9] overflow-hidden border-t border-gray-100">

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `radial-gradient(#111 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
        >
          <div>
            <motion.span
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
              className="text-[#520380] font-bold tracking-[0.12em] uppercase text-[11px] mb-3 flex items-center gap-2"
            >
              <span className="text-xs">♦</span> From The Community
            </motion.span>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight"
            >
              Voices From Our<br />
              <span className="text-[#520380]">Global Community</span>
            </motion.h2>
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#9CA3AF] mr-2">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => paginate(Math.max(0, page - 1))}
              disabled={page === 0}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-[#111111] transition-all duration-300 hover:bg-[#520380] hover:border-[#520380] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiArrowLeft size={17} />
            </button>
            <button
              onClick={() => paginate(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-[#111111] transition-all duration-300 hover:bg-[#520380] hover:border-[#520380] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiArrowRight size={17} />
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="relative min-h-[420px]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={page}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visible.map((t, i) => (
                <TestimonialCard key={t.name} t={t} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width:      i === page ? 24 : 8,
                height:     8,
                background: i === page ? "#520380" : "#D1D5DB",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
