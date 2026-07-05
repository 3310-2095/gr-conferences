"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CommunityCTA() {
  return (
    <div className="relative bg-white px-10 py-10">
      <div className="max-w-[1100px] mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true, margin: "-80px" }}
          className="w-full bg-white rounded-sm shadow-[0_12px_40px_rgba(82,3,128,0.08)] border border-gray-100 py-12 px-8 md:px-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* LEFT: Image */}
            <div className="flex-1 w-full flex justify-center md:justify-end shrink-0 max-w-[280px] md:max-w-[340px]">
              <img
                src="/community.png"
                alt="Community"
                className="w-full object-contain drop-shadow-xl"
              />
            </div>

            {/* RIGHT: Content */}
            <div className="flex-1 w-full text-center md:text-left">
              <p className="text-[14px] font-extrabold tracking-[0.12em] text-gray-900 uppercase mb-1">
                Ready to Get Involved?
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-[#520380] uppercase tracking-tight mb-5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Join our Community
              </h2>
              <p className="text-gray-700 text-[15px] leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                Whether you're an author, researcher, reviewer, speaker, institution, or industry
                partner, there's a place for you in our global network.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <a
                  href="#choose-role"
                  className="w-full sm:w-auto sm:min-w-[200px] inline-flex items-center justify-center gap-2.5 bg-[#520380] text-white font-bold text-[13px] tracking-wide uppercase px-7 py-[14px] rounded-xl hover:bg-[#3d0260] transition-colors shadow-[0_4px_14px_rgba(82,3,128,0.3)]"
                >
                  Join the Community
                </a>
              </div>
            </div>
          </div>


        </motion.div>
      </div>
    </div>
  );
}
