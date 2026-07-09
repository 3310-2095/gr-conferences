"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

// Brand purple + a couple of festive accents — matches --primary/--primary-hover in globals.css.
const CONFETTI_COLORS = ["#520380", "#8b3dff", "#C084FC", "#F5C451", "#ffffff"];

/** Two "party popper" bursts from the bottom corners + one big center burst — fired once on mount. */
function fireCelebration() {
  const end = Date.now() + 1400;

  confetti({
    particleCount: 90,
    spread: 100,
    startVelocity: 45,
    origin: { y: 0.55 },
    colors: CONFETTI_COLORS,
  });

  (function frame() {
    confetti({ particleCount: 3, angle: 60, spread: 60, origin: { x: 0, y: 0.9 }, colors: CONFETTI_COLORS });
    confetti({ particleCount: 3, angle: 120, spread: 60, origin: { x: 1, y: 0.9 }, colors: CONFETTI_COLORS });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function SuccessScreen({
  eyebrow = "Application Received",
  title = "Thank You!",
  message,
}: {
  eyebrow?: string;
  title?: string;
  message: string;
}) {
  useEffect(() => {
    fireCelebration();
  }, []);

  return (
    <div className="bg-[#FAFAFC] min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden" style={{ paddingTop: 72 }}>
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[80px] rounded-full z-0 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#C084FC]/15 blur-[70px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#F5C451]/10 blur-[70px] rounded-full z-0 pointer-events-none" />

      <div
        className="max-w-md w-full p-10 md:p-14 bg-white/85 backdrop-blur-2xl border border-white/60 rounded-2xl text-center relative z-10 overflow-hidden"
        style={{
          boxShadow: "0 24px 70px -15px rgba(82,3,128,0.22), 0 2px 8px rgba(82,3,128,0.06)",
          animation: "successPop 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Top gradient line, matches the form header treatment */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-[#C084FC] to-primary opacity-90" />

        <div className="relative z-10">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 relative"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
              boxShadow: "0 12px 32px rgba(82,3,128,0.35)",
              animation: "successBounce 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s",
            }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-white/30" style={{ animation: "successRing 1.6s ease-out infinite" }} />
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">{eyebrow}</p>
          <h2 className="text-4xl mb-5" style={{ fontFamily: "var(--font-heading)", color: "#1A1A2E" }}>
            {title}
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-10">{message}</p>

          <a
            href="/"
            className="inline-flex items-center justify-center w-full text-white font-semibold py-4 rounded-xl transition-all hover:-translate-y-1 text-sm tracking-wide uppercase"
            style={{
              background: "var(--primary)",
              boxShadow: "0 8px 20px rgba(82,3,128,0.25)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--primary-hover)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--primary)"; }}
          >
            Return to Home
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes successPop { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes successBounce { 0% { transform: scale(0); } 60% { transform: scale(1.08); } 100% { transform: scale(1); } }
          @keyframes successRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.4); opacity: 0; } }
        `,
      }} />
    </div>
  );
}
