"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const testimonials = [
  {
    quote: "My experience with ICICT 2026 was extremely positive. The conference provided a valuable forum for academic exchange and discussions on emerging ICT topics, while the organization and support from the conference team were excellent throughout. I was honored to participate both as a presenter and as a Session Chair, and I am grateful for the opportunity to contribute in these two roles.",
    name: "Michal K.",
    role: "School of Industrial Engineering and Management, Shenkar - Engineering. Design. Art., Israel",
  },
  {
    quote: "I have wide positive publishing experience with G R Conferences. All of them consolidate efforts of scientists from different countries and regions in the world as well as all of them connect with the brand-new topics of hi-tech and innovative Research and Advanced Development. We had a fruitful conversation and discussion with progressive leading scientists from European, Asian and Latin America countries on G R Conferences.",
    name: "Prof. Oleksandr H.",
    role: "State University of Trade and Economics, Ukraine",
  },
  {
    quote: "I have found the publication process with G R Conferences to be professional, efficient, and well-organized. The manuscript submission and peer-review processes were handled promptly, with constructive feedback that contributed to the quality of the final publication. The editorial team provided excellent support throughout the process.",
    name: "Prof. Benjamin G.",
    role: "University of Education, Winneba",
  },
  {
    quote: "I have found the entire conference process to be exceptionally well organised and seamless, from manuscript submission and peer review through to the final presentation. The editorial support and communication throughout the process have been professional, timely, and very helpful. I particularly enjoyed the networking session, which provided an excellent platform to engage with fellow researchers.",
    name: "Prof. Timothy Adeliyi",
    role: "University of Pretoria, South Africa",
  },
  {
    quote: "My manuscript submission and publication journey was smooth, professional, and well-coordinated. The peer review process was constructive, the editorial support was responsive, and the conference materials and moderation were organized effectively. I am also grateful to have been invited to lead conference sessions, which made the overall academic experience even more meaningful.",
    name: "Dr. Ioseb G.",
    role: "Kauno Kolegija Higher Education Institution, Lithuania",
  },
  {
    quote: "I have had the opportunity to participate in several G R Conferences and to serve as Session Chair for the 2025 editions held in New York and Thailand. My experience with the manuscript submission process, peer review, editorial support, conference moderation, and publication activities has been positive and professionally managed.",
    name: "Dr. Estevan R.",
    role: "Universidad de las Fuerzas Armadas-ESPE, Ecuador",
  },
  {
    quote: "The entire manuscript submission and publication process was remarkably smooth, and the editorial support I received throughout was excellent. I truly appreciate the professionalism and efficiency your team demonstrated at every stage. The time to get the papers online and indexed is short and helped a lot of researchers.",
    name: "Dr. Prashant D.",
    role: "MIT School of Computing, MIT ADT University, India",
  },
  {
    quote: "I am connected with G R Foundation since 2018, and ever since, I have witnessed its consistent commitment to promoting quality research and academic excellence. My experience with the manuscript submission, peer-review, and publication processes has been highly professional, transparent, and efficient.",
    name: "Prof. James S.",
    role: "Andhra University, Visakhapatnam",
  },
  {
    quote: "As a Session Chair associated with GR Foundation for the past five years, I have greatly appreciated their professionalism, dedication to quality research, and excellent conference organization. The publication process was smooth, transparent, and professionally managed. The editorial team provided timely support, and the peer-review process was constructive and insightful.",
    name: "Dr. Priya P.",
    role: "MIT World Peace University, India",
  },
];

// Real photos — one per testimonial, matched by name
const avatars = [
  "/TestimonialPhotos/Michal Koren.png",   // Michal K.
  "/TestimonialPhotos/Oleksandr.jpg",       // Prof. Oleksandr H.
  "/TestimonialPhotos/Benjamin.jpg",        // Prof. Benjamin G.
  "/TestimonialPhotos/Timothy.webp",        // Prof. Timothy Adeliyi
  "/TestimonialPhotos/Ioseb.jpg",           // Dr. Ioseb G.
  "/TestimonialPhotos/Estevan.jpeg",        // Dr. Estevan R.
  "/TestimonialPhotos/Prashant.jpg",        // Dr. Prashant D.
  "/TestimonialPhotos/James.png",           // Prof. James S.
  "/TestimonialPhotos/Priya.png",           // Dr. Priya P.
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#FAFAFA] font-sans">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-24">
        
        {/* Left Col - Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-[#520380]">
            <span className="text-xs">♦</span>
            Testimonials
          </span>
          <h2 className="text-2xl mt-18 font-extrabold text-[#111] leading-snug tracking-tight">
            Voices From Our<br />
            <span className="text-[#520380]">Global Community</span>
          </h2>
        </motion.div>

        {/* Right Col - Content */}
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Avatar Grid — real photos */}
          <div className="flex flex-wrap gap-[10px] mb-12">
            {avatars.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`View testimonial from ${testimonials[i].name}`}
                className={`relative w-[48px] h-[48px] rounded-full overflow-hidden transition-all duration-300 select-none ${
                  i === currentIndex
                    ? "ring-2 ring-[#520380] ring-offset-2 scale-110 z-10 shadow-lg"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <img
                  src={src}
                  alt={testimonials[i].name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>

          <hr className="border-gray-200 mb-10" />

          {/* Testimonial Content Area */}
          <div className="relative min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col h-full"
              >
                <div className="flex-1">
                  <p className="text-[#374151] text-[16px] md:text-[18px] leading-[1.8] mb-10 max-w-4xl">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h4 className="text-[#111111] font-semibold text-base mb-1">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-[#6B7280] text-sm max-w-xs md:max-w-md">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 self-start md:self-auto shrink-0">
                    <button
                      onClick={prevTestimonial}
                      className="w-[46px] h-[46px] rounded-full border border-gray-200 flex items-center justify-center text-gray-500 transition-all duration-300 hover:border-[#520380] hover:text-[#520380] hover:shadow-[0_4px_12px_rgba(82,3,128,0.1)] bg-white"
                      aria-label="Previous testimonial"
                    >
                      <HiChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-[46px] h-[46px] rounded-full border border-gray-200 flex items-center justify-center text-gray-500 transition-all duration-300 hover:border-[#520380] hover:text-[#520380] hover:shadow-[0_4px_12px_rgba(82,3,128,0.1)] bg-white"
                      aria-label="Next testimonial"
                    >
                      <HiChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
