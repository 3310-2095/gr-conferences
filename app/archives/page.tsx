"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { archiveConferences } from "../lib/conferenceData";

export default function ArchivesPage() {
  const pastConferences = archiveConferences.filter(c => c.year <= 2025);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1621245059632-1b150c26c11b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f5fb] pt-[140px] pb-32 font-sans overflow-hidden">
        
        {/* Hero Section */}
        <section className="max-w-[1100px] mx-auto px-6 mb-28 relative">
          <div className="relative flex flex-col md:flex-row mt-4 md:mt-16 justify-end items-center md:items-stretch">
            
            {/* Map Image (Background/Left) */}
            <div className="w-full md:w-[60%] h-[300px] md:h-auto relative z-0 md:absolute md:left-0 md:-top-16 md:-bottom-16 md:-translate-x-10 mix-blend-multiply opacity-40 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
                alt="Map"
                className="w-full h-full object-cover object-center grayscale-[30%] contrast-[0.9]"
              />
            </div>
            
            {/* Content Box (Right/Overlapping) */}
            <div className="w-full md:w-[55%] bg-white px-10 py-12 md:px-16 md:py-16 z-10 relative mt-[-60px] md:mt-0 md:mb-12 md:ml-auto">
              <h1 className="text-3xl md:text-[42px] font-bold text-[#520380] mb-6 tracking-tight leading-tight">
                Conference Archives
              </h1>
              <p className="text-gray-600 text-[15px] leading-[1.9] font-medium max-w-[450px]">
                This archive page is where you can find materials from over a decade of GASI conferences, including conference proceedings, conference programs, and conference image galleries. Scroll down to see where we've been!
              </p>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastConferences.map((archive, index) => (
              <div 
                key={archive.id} 
                className="bg-white flex flex-col hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Image */}
                <div className="w-full aspect-square md:aspect-[4/5] lg:aspect-square relative overflow-hidden">
                  <img 
                    src={fallbackImages[index % fallbackImages.length]} 
                    alt={archive.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-[19px] font-bold text-[#111] mb-3 tracking-tight">
                    {archive.year} {archive.name}
                  </h3>
                  <p className="text-[13px] text-gray-600 leading-[1.7] font-medium">
                    Click to access the <a href={archive.website} target="_blank" rel="noopener noreferrer" className="underline decoration-[#520380]/40 underline-offset-4 hover:decoration-[#520380] hover:text-[#520380] transition-colors">conference program</a> and <a href={archive.website} target="_blank" rel="noopener noreferrer" className="underline decoration-[#520380]/40 underline-offset-4 hover:decoration-[#520380] hover:text-[#520380] transition-colors">image gallery</a>. You can also view or download the <a href={archive.website} target="_blank" rel="noopener noreferrer" className="underline decoration-[#520380]/40 underline-offset-4 hover:decoration-[#520380] hover:text-[#520380] transition-colors">conference proceedings</a>.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
