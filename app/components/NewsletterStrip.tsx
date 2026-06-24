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
    <div className="relative">
      {/* Top half — white bg */}
      <div className="h-20 bg-[#F4F5F7]" />
      {/* Bottom half — footer dark bg */}
      <div className="h-20 bg-[#121212]" />

      {/* Card — absolutely centered over the split */}
      <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center px-6 lg:px-12">
        <div
          className="w-full max-w-[960px] rounded-xl px-10 py-10 lg:px-16 lg:py-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FF5E3A 0%, #c0330f 100%)",
            boxShadow: "0 24px 64px rgba(255,94,58,0.35), 0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          {/* Background decoration circles */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white opacity-[0.06] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white opacity-[0.05] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Left — Text */}
            <div className="text-center lg:text-left flex-shrink-0">
              <div className="inline-flex items-center gap-2 mb-3">
                <HiEnvelope size={18} className="text-white/80" />
                <span className="text-white/80 text-xs font-bold tracking-[0.12em] uppercase">Newsletter</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                Stay Updated With Our Events
              </h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Get conference updates, deadlines, and opportunities.
              </p>
            </div>

            {/* Right — Form */}
            <div className="w-full lg:w-auto lg:min-w-[400px]">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <HiEnvelope
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-10 pr-4 py-4 rounded-xl text-sm text-[#111111] bg-white outline-none border-2 border-transparent focus:border-[#FF5E3A] transition-colors duration-200 placeholder:text-[#9CA3AF] shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300"
                    style={{
                      background: "#111111",
                      color: "#ffffff",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                    }}
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
                    <HiArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/10 border border-white/20">
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
