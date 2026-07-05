"use client";
import { useState } from "react";
import { HiArrowRight, HiEnvelope } from "react-icons/hi2";

export default function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="relative bg-[#F4F5F7]">
      {/* Bottom half dark bg — sits behind lower portion of card */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#121212]" />

      {/* Card */}
      <div className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div
          className="w-full rounded-2xl px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #520380 0%, #3A025B 100%)",
            boxShadow: "0 24px 64px rgba(82,3,128,0.35), 0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          {/* Decoration circles */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white opacity-[0.06] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white opacity-[0.05] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            {/* Left — Text */}
            <div className="w-full lg:w-auto text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <HiEnvelope size={16} className="text-white/70" />
                <span className="text-white/70 text-[11px] font-bold tracking-[0.12em] uppercase">GR Chronicle </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                Stay Connected With<br className="hidden sm:block" /> Global Research
              </h3>
              <p className="text-white/65 text-sm leading-relaxed max-w-sm">
                Get conference updates, deadlines, and opportunities delivered to your inbox.
              </p>
            </div>

            {/* Right — Form */}
            <div className="w-full lg:w-auto lg:min-w-[380px] flex-shrink-0">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <HiEnvelope
                      size={15}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-[#111111] bg-white outline-none border-2 border-transparent focus:border-[#7c3aed] transition-colors duration-200 placeholder:text-[#9CA3AF]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold whitespace-nowrap text-white transition-all duration-300"
                    style={{ background: "#111111", boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-2px)";
                      el.style.background = "#222222";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.background = "#111111";
                    }}
                  >
                    Subscribe
                    <HiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
                  <span className="text-white text-sm font-semibold">You're subscribed! We'll keep you updated.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
