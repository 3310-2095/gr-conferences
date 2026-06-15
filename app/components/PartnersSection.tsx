"use client";
import { motion } from "framer-motion";
import { FaPython, FaSlack, FaSpotify, FaGoogle, FaTwitch, FaWindows, FaDiscord, FaVk } from "react-icons/fa6";
import { SiJavascript, SiFirefoxbrowser } from "react-icons/si";
import { fadeUp, staggerContainer, viewport } from "../lib/animations";

const row1 = [
  { Icon: FaPython,   name: "Oxford"    },
  { Icon: FaSlack,    name: "MIT"       },
  { Icon: FaSpotify,  name: "Stanford"  },
  { Icon: FaGoogle,   name: "Cambridge" },
  { Icon: FaTwitch,   name: "Harvard"   },
  { Icon: FaWindows,  name: "Springer"  },
  { Icon: FaDiscord,  name: "Elsevier"  },
];

const row2 = [
  { Icon: FaVk,            name: "IEEE"     },
  { Icon: SiJavascript,    name: "ACM"      },
  { Icon: SiFirefoxbrowser,name: "Nature"   },
  { Icon: FaGoogle,        name: "Scopus"   },
  { Icon: FaSlack,         name: "Clarivate"},
  { Icon: FaSpotify,       name: "DBLP"     },
  { Icon: FaPython,        name: "PubMed"   },
];

function LogoCard({ Icon, name }: { Icon: React.ElementType; name: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-8 py-5 mx-3 rounded-2xl shrink-0
      bg-white/[0.03] border border-white/[0.07] w-36
      hover:bg-[#9d78e2]/10 hover:border-[#9d78e2]/40 hover:scale-105
      transition-all duration-300 cursor-pointer group">
      <Icon size={34} className="text-[#7c7a9a] group-hover:text-[#b58ffd] transition-colors duration-300" />
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7c7a9a] group-hover:text-[#c4a8ff] transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: typeof row1; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
      <div className={`flex w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {doubled.map((item, i) => (
          <LogoCard key={i} Icon={item.Icon} name={item.name} />
        ))}
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section id="partners" className="relative py-24 bg-[#0a0b18] overflow-hidden">

      {/* top / bottom border lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9d78e2]/25 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9d78e2]/25 to-transparent" />

      {/* ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] bg-[#9d78e2]/5 pointer-events-none" />

      <motion.div
        className="relative z-10 text-center mb-14 px-6"
        variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewport}
      >
        <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-[#9d78e2] text-xs font-bold tracking-[0.18em] uppercase bg-[#9d78e2]/10 border border-[#9d78e2]/25 rounded-full px-4 py-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9d78e2] animate-pulse inline-block" />
          Institutional Partners
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
          Trusted By{" "}
          <span className="bg-gradient-to-r from-[#9d78e2] via-[#b58ffd] to-[#38bdf8] bg-clip-text text-transparent">Institutions Worldwide</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[#7c7a9a] text-base mt-4 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Partnering with the world&apos;s leading universities, publishers and research bodies.
        </motion.p>
      </motion.div>

      {/* marquee rows */}
      <div className="relative z-10 flex flex-col gap-5">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>

    </section>
  );
}
