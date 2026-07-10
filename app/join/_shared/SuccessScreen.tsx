"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

const CONFETTI_COLORS = ["#520380", "#8b3dff", "#C084FC", "#F5C451", "#ffffff"];
const REDIRECT_SECONDS = 5;

function fireCelebration() {
  const end = Date.now() + 1400;
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:9999;pointer-events:none;";
  document.body.appendChild(canvas);
  const fire = confetti.create(canvas, { resize: true, useWorker: true });
  fire({ particleCount: 90, spread: 100, startVelocity: 45, origin: { y: 0.55 }, colors: CONFETTI_COLORS });
  (function frame() {
    fire({ particleCount: 3, angle: 60, spread: 60, origin: { x: 0, y: 0.9 }, colors: CONFETTI_COLORS });
    fire({ particleCount: 3, angle: 120, spread: 60, origin: { x: 1, y: 0.9 }, colors: CONFETTI_COLORS });
    if (Date.now() < end) requestAnimationFrame(frame);
    else setTimeout(() => canvas.remove(), 3000);
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
  const router = useRouter();
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    fireCelebration();
  }, []);

  useEffect(() => {
    if (countdown <= 0) { router.push("/"); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, router]);

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(82,3,128,0.08) 0%, transparent 70%)" }}
      />

      {/* Animated check circle */}
      <div className="relative flex items-center justify-center mb-8" style={{ animation: "successPop 0.55s cubic-bezier(0.22,1,0.36,1) both" }}>
        {/* Pulse rings */}
        <div className="absolute w-36 h-36 rounded-full" style={{ background: "rgba(82,3,128,0.08)", animation: "ringPulse 2s ease-out infinite" }} />
        <div className="absolute w-28 h-28 rounded-full" style={{ background: "rgba(82,3,128,0.1)", animation: "ringPulse 2s ease-out 0.4s infinite" }} />
        {/* Circle */}
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #520380 0%, #8b3dff 100%)",
            boxShadow: "0 12px 40px rgba(82,3,128,0.35)",
            animation: "successBounce 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both",
          }}
        >
          {/* Animated checkmark */}
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" strokeDasharray="28" strokeDashoffset="28" style={{ animation: "drawCheck 0.4s ease 0.5s forwards" }} />
          </svg>
        </div>
      </div>

      {/* Eyebrow */}
      <p
        className="text-[11px] font-bold uppercase tracking-[0.22em] mb-3"
        style={{ color: "#520380", animation: "fadeUp 0.5s ease 0.3s both" }}
      >
        {eyebrow}
      </p>

      {/* Title */}
      <h2
        className="font-extrabold text-center mb-4 leading-tight"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          color: "#1A1A2E",
          animation: "fadeUp 0.5s ease 0.4s both",
        }}
      >
        {title}
      </h2>

      {/* Divider */}
      <div
        className="h-[3px] w-12 rounded-full mb-6"
        style={{ background: "linear-gradient(90deg, #520380, #C084FC)", animation: "fadeUp 0.5s ease 0.45s both" }}
      />

      {/* Message */}
      <p
        className="text-center text-[15px] leading-[1.8] max-w-md mb-10"
        style={{ color: "#6B7280", animation: "fadeUp 0.5s ease 0.5s both" }}
      >
        {message}
      </p>

      {/* Hourglass countdown timer */}
      <div className="flex flex-col items-center gap-3" style={{ animation: "fadeUp 0.5s ease 0.6s both" }}>
        <svg
          aria-label="countdown hourglass"
          role="img"
          height="120px"
          width="120px"
          viewBox="0 0 56 56"
          className="ss-loader"
          style={{ "--hue": "270" } as React.CSSProperties}
        >
          <clipPath id="ss-sand-mound-top">
            <path d="M 14.613 13.087 C 15.814 12.059 19.3 8.039 20.3 6.539 C 21.5 4.789 21.5 2.039 21.5 2.039 L 3 2.039 C 3 2.039 3 4.789 4.2 6.539 C 5.2 8.039 8.686 12.059 9.887 13.087 C 11 14.039 12.25 14.039 12.25 14.039 C 12.25 14.039 13.5 14.039 14.613 13.087 Z" className="ss-loader__sand-mound-top" />
          </clipPath>
          <clipPath id="ss-sand-mound-bottom">
            <path d="M 14.613 20.452 C 15.814 21.48 19.3 25.5 20.3 27 C 21.5 28.75 21.5 31.5 21.5 31.5 L 3 31.5 C 3 31.5 3 28.75 4.2 27 C 5.2 25.5 8.686 21.48 9.887 20.452 C 11 19.5 12.25 19.5 12.25 19.5 C 12.25 19.5 13.5 19.5 14.613 20.452 Z" className="ss-loader__sand-mound-bottom" />
          </clipPath>
          <g transform="translate(2,2)">
            <g transform="rotate(-90,26,26)" strokeLinecap="round" strokeDashoffset="153.94" strokeDasharray="153.94 153.94" stroke="hsl(0,0%,100%)" fill="none">
              <circle transform="rotate(0,26,26)" r="24.5" cy="26" cx="26" strokeWidth="2.5" className="ss-loader__motion-thick" />
              <circle transform="rotate(90,26,26)" r="24.5" cy="26" cx="26" strokeWidth="1.75" className="ss-loader__motion-medium" />
              <circle transform="rotate(180,26,26)" r="24.5" cy="26" cx="26" strokeWidth="1" className="ss-loader__motion-thin" />
            </g>
            <g transform="translate(13.75,9.25)" className="ss-loader__model">
              {/* Hourglass body — black */}
              <path d="M 1.5 2 L 23 2 C 23 2 22.5 8.5 19 12 C 16 15.5 13.5 13.5 13.5 16.75 C 13.5 20 16 18 19 21.5 C 22.5 25 23 31.5 23 31.5 L 1.5 31.5 C 1.5 31.5 2 25 5.5 21.5 C 8.5 18 11 20 11 16.75 C 11 13.5 8.5 15.5 5.5 12 C 2 8.5 1.5 2 1.5 2 Z" fill="#1a1a1a" />
              {/* Sand — purple */}
              <g strokeLinecap="round" stroke="#8b3dff">
                <line y2="20.75" x2="12" y1="15.75" x1="12" strokeDasharray="0.25 33.75" strokeWidth="1" className="ss-loader__sand-grain-left" />
                <line y2="21.75" x2="12.5" y1="16.75" x1="12.5" strokeDasharray="0.25 33.75" strokeWidth="1" className="ss-loader__sand-grain-right" />
                <line y2="31.5" x2="12.25" y1="18" x1="12.25" strokeDasharray="0.5 107.5" strokeWidth="1" className="ss-loader__sand-drop" />
                <line y2="31.5" x2="12.25" y1="14.75" x1="12.25" strokeDasharray="54 54" strokeWidth="1.5" className="ss-loader__sand-fill" />
                <line y2="31.5" x2="12" y1="16" x1="12" strokeDasharray="1 107" strokeWidth="1" stroke="#520380" className="ss-loader__sand-line-left" />
                <line y2="31.5" x2="12.5" y1="16" x1="12.5" strokeDasharray="12 96" strokeWidth="1" stroke="#520380" className="ss-loader__sand-line-right" />
                <g strokeWidth="0" fill="#8b3dff">
                  <path d="M 12.25 15 L 15.392 13.486 C 21.737 11.168 22.5 2 22.5 2 L 2 2.013 C 2 2.013 2.753 11.046 9.009 13.438 L 12.25 15 Z" clipPath="url(#ss-sand-mound-top)" />
                  <path d="M 12.25 18.5 L 15.392 20.014 C 21.737 22.332 22.5 31.5 22.5 31.5 L 2 31.487 C 2 31.487 2.753 22.454 9.009 20.062 Z" clipPath="url(#ss-sand-mound-bottom)" />
                </g>
              </g>
              {/* Glare — subtle white */}
              <g strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none">
                <path d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5" stroke="white" className="ss-loader__glare-top" />
                <path transform="rotate(180,12.25,16.75)" d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5" stroke="rgba(255,255,255,0)" className="ss-loader__glare-bottom" />
              </g>
              {/* Frame bars — black */}
              <rect height="2" width="24.5" fill="#1a1a1a" />
              <rect height="1" width="19.5" y="0.5" x="2.5" ry="0.5" rx="0.5" fill="#333333" />
              <rect height="2" width="24.5" y="31.5" fill="#1a1a1a" />
              <rect height="1" width="19.5" y="32" x="2.5" ry="0.5" rx="0.5" fill="#333333" />
            </g>
          </g>
        </svg>

        <p className="text-[13px] font-semibold" style={{ color: "#520380" }}>
          Redirecting in <span className="font-extrabold text-[#520380]">{countdown}</span>s
        </p>
      </div>

     

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes successPop { from { opacity:0; transform:translateY(20px) scale(0.9); } to { opacity:1; transform:translateY(0) scale(1); } }
          @keyframes successBounce { 0% { transform:scale(0); } 60% { transform:scale(1.12); } 100% { transform:scale(1); } }
          @keyframes ringPulse { 0% { transform:scale(1); opacity:0.7; } 100% { transform:scale(1.6); opacity:0; } }
          @keyframes drawCheck { to { stroke-dashoffset: 0; } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

          .ss-loader { --dur: 2s; display:block; }
          .ss-loader__glare-top,.ss-loader__glare-bottom,.ss-loader__model,
          .ss-loader__motion-thick,.ss-loader__motion-medium,.ss-loader__motion-thin,
          .ss-loader__sand-drop,.ss-loader__sand-fill,.ss-loader__sand-grain-left,
          .ss-loader__sand-grain-right,.ss-loader__sand-line-left,.ss-loader__sand-line-right,
          .ss-loader__sand-mound-top,.ss-loader__sand-mound-bottom {
            animation-duration: var(--dur);
            animation-timing-function: cubic-bezier(0.83,0,0.17,1);
            animation-iteration-count: infinite;
          }
          .ss-loader__glare-top { animation-name: ss-glare-top; }
          .ss-loader__glare-bottom { animation-name: ss-glare-bottom; }
          .ss-loader__model { animation-name: ss-loader-flip; transform-origin: 12.25px 16.75px; }
          .ss-loader__motion-thick,.ss-loader__motion-medium,.ss-loader__motion-thin { transform-origin: 26px 26px; }
          .ss-loader__motion-thick { animation-name: ss-motion-thick; }
          .ss-loader__motion-medium { animation-name: ss-motion-medium; }
          .ss-loader__motion-thin { animation-name: ss-motion-thin; }
          .ss-loader__sand-drop { animation-name: ss-sand-drop; }
          .ss-loader__sand-fill { animation-name: ss-sand-fill; }
          .ss-loader__sand-grain-left { animation-name: ss-sand-grain-left; }
          .ss-loader__sand-grain-right { animation-name: ss-sand-grain-right; }
          .ss-loader__sand-line-left { animation-name: ss-sand-line-left; }
          .ss-loader__sand-line-right { animation-name: ss-sand-line-right; }
          .ss-loader__sand-mound-top { animation-name: ss-sand-mound-top; }
          .ss-loader__sand-mound-bottom { animation-name: ss-sand-mound-bottom; transform-origin: 12.25px 31.5px; }

          @keyframes ss-loader-flip {
            from { transform: translate(13.75px,9.25px) rotate(-180deg); }
            24%, to { transform: translate(13.75px,9.25px) rotate(0); }
          }
          @keyframes ss-glare-top {
            from { stroke: rgba(255,255,255,0); }
            24%, to { stroke: white; }
          }
          @keyframes ss-glare-bottom {
            from { stroke: white; }
            24%, to { stroke: rgba(255,255,255,0); }
          }
          @keyframes ss-motion-thick {
            from { animation-timing-function:cubic-bezier(0.33,0,0.67,0); stroke:rgba(0,0,0,0); stroke-dashoffset:153.94; transform:rotate(0.67turn); }
            20% { animation-timing-function:cubic-bezier(0.33,1,0.67,1); stroke:hsl(0,0%,20%); stroke-dashoffset:141.11; transform:rotate(1turn); }
            40%, to { stroke:rgba(0,0,0,0); stroke-dashoffset:153.94; transform:rotate(1.33turn); }
          }
          @keyframes ss-motion-medium {
            from, 8% { animation-timing-function:cubic-bezier(0.33,0,0.67,0); stroke:rgba(0,0,0,0); stroke-dashoffset:153.94; transform:rotate(0.5turn); }
            20% { animation-timing-function:cubic-bezier(0.33,1,0.67,1); stroke:hsl(0,0%,20%); stroke-dashoffset:147.53; transform:rotate(0.83turn); }
            32%, to { stroke:rgba(0,0,0,0); stroke-dashoffset:153.94; transform:rotate(1.17turn); }
          }
          @keyframes ss-motion-thin {
            from, 4% { animation-timing-function:cubic-bezier(0.33,0,0.67,0); stroke:rgba(0,0,0,0); stroke-dashoffset:153.94; transform:rotate(0.33turn); }
            24% { animation-timing-function:cubic-bezier(0.33,1,0.67,1); stroke:hsl(0,0%,20%); stroke-dashoffset:134.7; transform:rotate(0.67turn); }
            44%, to { stroke:rgba(0,0,0,0); stroke-dashoffset:153.94; transform:rotate(1turn); }
          }
          @keyframes ss-sand-drop {
            from, 10% { animation-timing-function:cubic-bezier(0.12,0,0.39,0); stroke-dashoffset:1; }
            70%, to { stroke-dashoffset:-107; }
          }
          @keyframes ss-sand-fill {
            from, 10% { animation-timing-function:cubic-bezier(0.12,0,0.39,0); stroke-dashoffset:55; }
            70%, to { stroke-dashoffset:-54; }
          }
          @keyframes ss-sand-grain-left {
            from, 10% { animation-timing-function:cubic-bezier(0.12,0,0.39,0); stroke-dashoffset:29; }
            70%, to { stroke-dashoffset:-22; }
          }
          @keyframes ss-sand-grain-right {
            from, 10% { animation-timing-function:cubic-bezier(0.12,0,0.39,0); stroke-dashoffset:27; }
            70%, to { stroke-dashoffset:-24; }
          }
          @keyframes ss-sand-line-left {
            from, 10% { animation-timing-function:cubic-bezier(0.12,0,0.39,0); stroke-dashoffset:53; }
            70%, to { stroke-dashoffset:-55; }
          }
          @keyframes ss-sand-line-right {
            from, 10% { animation-timing-function:cubic-bezier(0.12,0,0.39,0); stroke-dashoffset:14; }
            70%, to { stroke-dashoffset:-24.5; }
          }
          @keyframes ss-sand-mound-top {
            from, 10% { animation-timing-function:linear; transform:translate(0,0); }
            15% { animation-timing-function:cubic-bezier(0.12,0,0.39,0); transform:translate(0,1.5px); }
            51%, to { transform:translate(0,13px); }
          }
          @keyframes ss-sand-mound-bottom {
            from, 31% { animation-timing-function:cubic-bezier(0.61,1,0.88,1); transform:scale(1,0); }
            56%, to { transform:scale(1,1); }
          }
        `,
      }} />
    </div>
  );
}
