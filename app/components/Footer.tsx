  "use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";

const footerLinks = {
  Conferences: [
    { label: "Calendar",              href: "/calendar" },
    { label: "Community",             href: "/community" },
    { label: "Archives",              href: "/archives" },
    { label: "Partners",  href: "partners" },
  ],
  "GR Ecosystem": [
    { label: "GR Journals",           href: "https://gr-journals.com/" },
    { label: "GR Connect",            href: "https://www.gr-connect.org/" },
    { label: "GR Quotient",           href: "https://www.gr-connect.org/gr-quotient" },
    { label: "GR Author Services",    href: "https://gr-journals.com/author-services" },
  ],
  Organization: [
    { label: "GRS Global",                        href: "https://grsglobal.org/" },
    { label: "Policies",                          href: "/policies" },
    { label: "Get in Touch",                      href: "/get-in-touch" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#121212] pt-10 pb-5 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 mb-10">
          
          {/* Left Column: Brand & Newsletter */}
          <div className="w-full lg:w-[35%] flex flex-col">
            <div className="flex items-center mb-4">
              <img
                src="/conferenceslogowhite.png"
                alt="GR Conferences"
                className="h-9 w-auto object-contain"
              />
            </div>
            
            <p className="text-white font-medium text-sm mb-5 leading-relaxed max-w-[280px]">
              Think Global. Present Global.
            </p>
            
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-white flex items-center justify-center hover:-translate-y-1 shadow-lg transition-all group">
                <FaLinkedinIn className="text-[#520380] text-base group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.gr-connect.org/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl overflow-hidden hover:-translate-y-1 shadow-lg transition-all" title="GR Connect">
                <Image src="/connect.png" alt="GR Connect" width={36} height={36} className="w-full h-full object-cover" />
              </a>
            </div>
          </div>

          {/* Right Column: Links Grid */}
          <div className="w-full lg:w-[60%] lg:pt-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-6">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title} className="flex flex-col">
                  <h4 className="text-white font-bold text-sm mb-4">
                    {title}
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {links.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith("/") ? (
                          <Link href={link.href} className="text-[#9CA3AF] hover:text-white transition-colors text-[13px]">
                            {link.label}
                          </Link>
                        ) : (
                          <a href={link.href} className="text-[#9CA3AF] hover:text-white transition-colors text-[13px]">
                            {link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#9CA3AF] text-[12px]">© {new Date().getFullYear()} GR Foundation. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-5 text-[#9CA3AF] text-[12px]">
            <Link href="/policies#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/policies#terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
