"use client";
import ParticlesBackground from "./ParticlesBackground";

const footerLinks = {
  CONFERENCES: [
    { label: "Upcoming",              href: "#calendar" },
    { label: "Portfolio",             href: "#conferences" },
    { label: "Calendar",              href: "#calendar" },
    { label: "Researcher Community",  href: "#" },
  ],
  "GR ECOSYSTEM": [
    { label: "GR Journals",           href: "#" },
    { label: "GR Connect",            href: "#" },
    { label: "GR Quotient",           href: "#" },
    { label: "GR Author Services",    href: "#" },
  ],
  RESOURCES: [
    { label: "Archives",              href: "#archives" },
    { label: "Partners",              href: "#partners" },
    { label: "FAQs",                  href: "#" },
    { label: "Policies",              href: "#" },
    { label: "Contact",               href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0b18] pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(157,120,226,0.15)_0%,transparent_70%)] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Particles effect */}
      <ParticlesBackground id="footer-particles" density={30} linkOpacity={0.05} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Stay Updated strip */}
        <div className="relative mb-10 border-white/10 pb-10">
          <div
            className="relative rounded-3xl overflow-hidden p-6 md:p-8"
            style={{
              background: "linear-gradient(135deg, rgba(157,120,226,0.1) 0%, rgba(181,143,253,0.05) 100%)",
              border: "1px solid rgba(157,120,226,0.18)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9d78e2]/50 to-transparent" />
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[100px] bg-[#9d78e2]/10 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="lg:max-w-md">
                <h2
                  className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2"
                  style={{ letterSpacing: "-0.02em", fontFamily: "'Inter',sans-serif" }}
                >
                  Stay Updated With{" "}
                  <span className="bg-gradient-to-r from-[#9d78e2] to-[#b58ffd] bg-clip-text text-transparent">
                    Our Events
                  </span>
                </h2>
                <p className="text-[#9491ab] text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  Get conference updates, deadlines, and opportunities delivered to your inbox.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-lg">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#9d78e2]/60 focus:bg-white/[0.09] transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                />
                <button
                  className="shrink-0 px-7 py-3.5 rounded-xl font-bold text-sm text-white tracking-wide transition-all"
                  style={{
                    background: "linear-gradient(135deg, #9d78e2, #b58ffd)",
                    boxShadow: "0 4px 20px rgba(157,120,226,0.35)",
                    fontFamily: "'Inter',sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 8px 30px rgba(157,120,226,0.55)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 4px 20px rgba(157,120,226,0.35)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  Subscribe →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9d78e2] to-[#b58ffd] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#9d78e2]/30">
                <span className="text-white font-extrabold text-sm tracking-widest">GR</span>
              </div>
              <div>
                <div className="text-white font-extrabold text-base leading-none tracking-wide">
                  GR Conferences
                </div>
                <div className="text-[#9491ab] text-[10px] mt-0.5 font-medium">Global Research Network</div>
              </div>
            </div>

            {/* Tagline */}
            <p
              className="text-[#9491ab] text-sm leading-relaxed mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            >
              Connecting Researchers.<br />
              Inspiring Innovation.<br />
              Advancing Knowledge.
            </p>

            <a
              href="mailto:info@grconferences.com"
              className="text-[#9d78e2] font-semibold text-xs hover:text-[#b58ffd] transition-colors"
            >
              info@grconferences.com
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-white font-bold text-xs uppercase tracking-[0.12em] mb-4"
                style={{ fontFamily: "'Inter',sans-serif" }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#b3b0cb] hover:text-[#9d78e2] transition-colors text-sm"
                      style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[#b3b0cb] text-xs font-semibold tracking-wide border-t border-white/5 pt-6 gap-4">
          <p>© {new Date().getFullYear()} GR Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
