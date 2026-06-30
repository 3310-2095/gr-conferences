"use client";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa6";

const footerLinks = {
  Conferences: [
    { label: "Upcoming",              href: "#calendar" },
    { label: "Portfolio",             href: "#conferences" },
    { label: "Calendar",              href: "#calendar" },
    { label: "Researcher Community",  href: "#" },
  ],
  "GR Ecosystem": [
    { label: "GR Journals",           href: "#" },
    { label: "GR Connect",            href: "#" },
    { label: "GR Quotient",           href: "#" },
    { label: "GR Author Services",    href: "#" },
  ],
  Resources: [
    { label: "Archives",                          href: "#archives" },
    { label: "Partners",                          href: "#partners" },
    { label: "Join our Conference Review Committee", href: "/join/reviewer" },
    { label: "FAQs",                              href: "#" },
    { label: "Policies",                          href: "#" },
    { label: "Contact",                           href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#121212] pt-20 pb-8 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-12 mb-20">
          
          {/* Left Column: Brand & Newsletter */}
          <div className="w-full lg:w-[35%] flex flex-col">
            {/* Brand Logo */}
            <div className="flex items-center mb-8">
              <img
                src="/conferenceslogowhite.png"
                alt="GR Conferences"
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {/* Newsletter Text */}
            <p className="text-white font-medium text-lg mb-8 leading-relaxed max-w-[320px]">
              Get conference updates, deadlines, and opportunities delivered to your inbox.
            </p>
            
            {/* Newsletter Form */}
            {/* <div className="relative w-full max-w-[340px] mb-12">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent border border-white/20 rounded-full pl-6 pr-14 py-3.5 text-white text-sm placeholder-white/40 outline-none focus:border-white transition-colors"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 w-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 transition-colors group">
                 <HiArrowRight className="text-[#121212] text-lg group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div> */}

            {/* Social Icons */}
            <div className="flex gap-4">
             
              <a href="#" className="w-12 h-12 rounded-[14px] bg-white flex items-center justify-center hover:-translate-y-1 shadow-lg transition-all group">
                <FaLinkedinIn className="text-[#520380] text-xl group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Links Grid */}
          <div className="w-full lg:w-[60%] lg:pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-8">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title} className="flex flex-col">
                  <h4 className="text-white font-bold text-lg mb-6">
                    {title}
                  </h4>
                  <ul className="flex flex-col gap-4">
                    {links.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith("/") ? (
                          <Link href={link.href} className="text-[#9CA3AF] hover:text-white transition-colors text-[15px]">
                            {link.label}
                          </Link>
                        ) : (
                          <a href={link.href} className="text-[#9CA3AF] hover:text-white transition-colors text-[15px]">
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
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9CA3AF] text-[13px]">© {new Date().getFullYear()} GR Foundation. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 text-[#9CA3AF] text-[13px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
