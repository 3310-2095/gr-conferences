"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineMagnifyingGlass,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiArrowTopRightOnSquare,
  HiOutlineGlobeAlt,
  HiChevronRight
} from 'react-icons/hi2';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// --- Data Constants ---
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const mapMarkers = [
  { name: "New York, USA", coordinates: [-74.006, 40.7128] },
  { name: "Bangkok, Thailand", coordinates: [100.5018, 13.7563] },
  { name: "Ahmedabad, India", coordinates: [72.5714, 23.0225] },
  { name: "Goa, India", coordinates: [74.1240, 15.2993] },
  { name: "Udaipur, India", coordinates: [73.6828, 24.5854] },
  { name: "London, UK", coordinates: [-0.1276, 51.5074] },
  { name: "Manila, Philippines", coordinates: [120.9842, 14.5995] },
  { name: "Cape Town, SA", coordinates: [18.4232, -33.9249] },
];

const milestones = [
  { year: "2014", title: "The Beginning", desc: "Launched our first conference initiative, creating a platform for global research exchange." },
  { year: "2016", title: "Expanding Domains", desc: "Introduced new conferences across technology, computing, business, and emerging research areas." },
  { year: "2019", title: "Growing Global Community", desc: "Expanded participation and collaborations with researchers and academic institutions worldwide." },
  { year: "2021", title: "Embracing Hybrid Innovation", desc: "Introduced hybrid conference formats, enabling global participation through physical and virtual platforms." },
  { year: "2023", title: "Strengthening Our Network", desc: "Built a wider conference ecosystem connecting diverse research communities and disciplines." },
  { year: "2025", title: "Global Conference Portfolio", desc: "Expanded our international presence with multiple flagship conferences across countries." },
  { year: "Future", title: "Beyond Borders", desc: "Continuing to advance knowledge exchange and create impactful connections." },
];

const leadership = [
  { name: "Dr. Sarah Chen", role: "Global Director", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Prof. James Miller", role: "Head of Research Advisory", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Elena Rodriguez", role: "VP of Conference Operations", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Dr. Ahmed Hassan", role: "Chief Scientific Officer", img: "https://randomuser.me/api/portraits/men/46.jpg" },
];

const ecosystemList = [
  { title: "Conferences", desc: "Premier academic & industry events connecting minds globally." },
  { title: "Journals", desc: "High-impact open access research publications across disciplines." },
  { title: "Author Services", desc: "Professional editing, formatting, and pre-publication support." },
  { title: "Connect", desc: "An exclusive networking platform for global researchers." },
  { title: "Quotient", desc: "Data-driven analytics and impact measurement for academics." },
  { title: "Chronicle", desc: "The latest news, updates, and deep dives in academic journalism." },
];

const conferences = [
  { id: 1, title: "ICT for Sustainable Development (ICT4SD)", edition: "11th Edition", date: "9–11 July 2026", location: "Goa, India", tags: ["Sustainability", "ICT", "Innovation"], link: "https://ict4sd.org" },
  { id: 2, title: "International Conference on Technological Intelligence and Business Strategies (TIBS)", edition: "1st Edition", date: "23–24 June 2026", location: "India", tags: ["Technology", "Business", "Innovation"], link: "https://tibsconf.com" },
  { id: 3, title: "World Conference on Information Communication Systems, Software, Security and Sustainability (WORLDS4)", edition: "10th Edition", date: "28–30 July 2026", location: "United Kingdom", tags: ["Computing", "Security", "Sustainability"], link: "https://www.worlds4.co.uk" },
  { id: 4, title: "World Conference on Information Systems for Business Management (ISBM)", edition: "5th Edition", date: "17–19 September 2026", location: "India", tags: ["Business", "Information Systems", "Management"], link: "https://isbmconf.com" },
  { id: 5, title: "International Conference on Machine and Computing Technologies for Sustainable Development (MCT4SD)", edition: "2nd Edition", date: "16–17 November 2026", location: "India", tags: ["AI", "Computing", "Sustainability"], link: "https://mct4sdconf.com" },
  { id: 6, title: "International Conference on Innovations in Biotechnology and Health Sciences (BIOCOM)", edition: "3rd Edition", date: "9–11 April 2026", location: "Bangkok, Thailand", tags: ["Biotechnology", "Health Sciences", "Innovation"], link: "https://ictisthailand.com/biocom.php" },
  { id: 7, title: "International Conference on Information and Communication Technology for Competitive Strategies (ICTCS)", edition: "11th Edition", date: "16–19 December 2026", location: "India", tags: ["ICT", "AI", "Digital Innovation"], link: "https://ictcs.in" },
  { id: 8, title: "International Congress on Information and Communication Technology (ICICT)", edition: "12th Edition", date: "23–26 February 2027", location: "London, UK", tags: ["ICT", "Computing", "Research"], link: "https://icict.co.uk" },
  { id: 9, title: "International Conference on Smart Trends in Computing and Communications (SMARTCOM)", edition: "11th Edition", date: "27–30 January 2027", location: "India", tags: ["Smart Computing", "AI", "Communication"], link: "https://www.smartcomconference.com" },
  { id: 10, title: "International Conference on Applied Physics, Mathematics & Energy (APME)", edition: "1st Edition", date: "Coming Soon", location: "Bangkok, Thailand", tags: ["Physics", "Mathematics", "Energy"], link: "https://apmeconf.com" },
];

export default function AboutPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("All Domains");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  // Dynamic filter generation
  const allDomains = useMemo(() => {
    const tags = conferences.flatMap(c => c.tags);
    return ["All Domains", ...Array.from(new Set(tags))].sort();
  }, []);

  const allLocations = useMemo(() => {
    const locs = conferences.map(c => c.location);
    return ["All Locations", ...Array.from(new Set(locs))].sort();
  }, []);

  // Filtered results
  const filteredConferences = conferences.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchDomain = domainFilter === "All Domains" || c.tags.includes(domainFilter);
    const matchLoc = locationFilter === "All Locations" || c.location === locationFilter;
    return matchSearch && matchDomain && matchLoc;
  });

  return (
    <main className="min-h-screen pt-24 bg-[var(--background)] text-[var(--foreground)]">
      
      {/* --- HERO & OUR STORY --- */}
      <section className="section-padding container-custom text-center relative">
        <div className="absolute inset-0 bg-pattern pointer-events-none opacity-40"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-primary font-bold tracking-[0.14em] uppercase text-sm mb-4 block">About Us</span>
          <h1 className="text-5xl md:text-7xl font-extrabold font-heading mb-6 tracking-tight leading-tight">
            A decade of connecting <br/>
            <span className="text-gradient">researchers across borders</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
            What started as a single conference has grown into a global ecosystem of international conferences spanning multiple disciplines, countries, and research communities. Today, GR Conferences brings together researchers, institutions, and experts through impactful academic events worldwide.
          </p>
        </motion.div>
      </section>

      {/* --- VISION & MISSION --- */}
      <section className="pb-24 container-custom">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-10 lg:p-12 glass relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-125"></div>
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30">
               <HiOutlineGlobeAlt className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              To enable global knowledge exchange and interdisciplinary collaboration through accessible, high-quality research conferences.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-10 lg:p-12 glass relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-125"></div>
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30">
               <HiArrowTopRightOnSquare className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              To create meaningful platforms where ideas, innovation, and research can inspire positive change worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- GLOBAL PRESENCE MAP --- */}
      <section className="py-24 bg-surface-2 border-y border-white/5 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Global Presence</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Conferences Beyond Borders. An interactive look at our global conference destinations and host countries.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl mx-auto bg-surface rounded-[2rem] p-4 md:p-8 border border-white/5 shadow-2xl relative"
          >
            <ComposableMap projectionConfig={{ scale: 140 }} className="w-full h-auto opacity-80" style={{ pointerEvents: 'none' }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography 
                      key={geo.rsmKey} 
                      geography={geo} 
                      fill="#2A2A2A" 
                      stroke="#121212" 
                      strokeWidth={0.5} 
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#333" },
                        pressed: { outline: "none" }
                      }}
                    />
                  ))
                }
              </Geographies>
              {mapMarkers.map(({ name, coordinates }) => (
                <Marker key={name} coordinates={coordinates as [number, number]}>
                   <circle r={6} fill="var(--primary)" className="animate-glow-pulse origin-center" />
                   <circle r={2} fill="#FFF" />
                   <text textAnchor="middle" y={-14} style={{ fill: "#D1D5DB", fontSize: "11px", fontWeight: 500, filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.8))" }}>
                     {name}
                   </text>
                </Marker>
              ))}
            </ComposableMap>
          </motion.div>
        </div>
      </section>

      {/* --- CONFERENCE JOURNEY (TIMELINE) --- */}
      <section className="py-32 container-custom relative">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Milestones</h2>
          <p className="text-gray-400 text-lg">The journey from our first conference to a global ecosystem.</p>
        </div>

        <div className="max-w-4xl mx-auto relative px-4 md:px-0">
          {/* Vertical Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2"></div>
          
          {milestones.map((m, i) => (
            <motion.div 
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 mb-20 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 w-[14px] h-[14px] bg-[var(--background)] border-2 border-[var(--primary)] rounded-full translate-x-[20px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10 shadow-[0_0_12px_var(--primary-glow)]"></div>
              
              {/* Content */}
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'} pl-16 md:pl-0`}>
                 <div className="text-primary font-bold text-xl md:text-2xl mb-2 tracking-widest">{m.year}</div>
                 <h3 className="text-2xl font-bold text-white mb-3 font-heading">{m.title}</h3>
                 <p className="text-gray-400 leading-relaxed text-base md:text-lg">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- LEADERSHIP BOARD --- */}
      <section className="py-24 bg-surface-2 border-y border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Leadership & Advisory Board</h2>
            <p className="text-gray-400 text-lg">Meet the people guiding the GR Conferences ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {leadership.map((person, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card bg-surface p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <img src={person.img} alt={person.name} className="w-28 h-28 rounded-full object-cover mb-6 border-4 border-surface-2 shadow-lg" />
                <h4 className="text-xl font-bold text-white mb-1">{person.name}</h4>
                <p className="text-primary text-sm font-medium">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GR ECOSYSTEM --- */}
      <section className="py-32 container-custom relative">
        <div className="absolute inset-0 bg-pattern pointer-events-none opacity-30"></div>
        <div className="text-center mb-16 relative z-10">
          <span className="text-primary font-bold tracking-[0.14em] uppercase text-sm mb-4 block">Holistic Approach</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">The GR Ecosystem</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">A comprehensive suite of platforms driving academic excellence and collaboration.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
          {ecosystemList.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl hover:border-primary/50 transition-colors group"
            >
               <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
               <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- ARCHIVES / EXPLORE OUR CONFERENCES --- */}
      <section className="py-24 bg-surface-2 border-y border-white/5" id="archives">
        <div className="container-custom">
          
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Explore Our Conferences</h2>
            <p className="text-gray-400 text-lg max-w-3xl">Explore. Connect. Collaborate. Discover our global conference portfolio connecting researchers, innovators, and institutions across technology, sustainability, business, and emerging fields.</p>
          </div>

          {/* Filters Area */}
          <div className="glass p-6 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search conferences by title or tags..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div className="flex w-full md:w-auto gap-4">
              <select 
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="flex-1 md:flex-none bg-[var(--input-bg)] border border-[var(--border)] rounded-full py-3 px-6 text-white focus:outline-none focus:border-primary appearance-none cursor-pointer"
              >
                {allDomains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="flex-1 md:flex-none bg-[var(--input-bg)] border border-[var(--border)] rounded-full py-3 px-6 text-white focus:outline-none focus:border-primary appearance-none cursor-pointer"
              >
                {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Conference Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredConferences.length > 0 ? (
                filteredConferences.map((c) => {
                  const acronym = c.title.match(/\(([^)]+)\)/)?.[1] || c.title.substring(0, 3).toUpperCase();
                  
                  return (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="card p-8 flex flex-col h-full bg-surface group"
                    >
                      <div className="flex gap-4 items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shrink-0 shadow-[0_4px_20px_var(--primary-glow)] text-white font-bold text-lg tracking-wider">
                          {acronym}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white leading-tight mb-2 line-clamp-3">{c.title}</h4>
                          <span className="inline-block text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {c.edition}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 mt-2 mb-8">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <HiOutlineCalendarDays className="w-5 h-5 text-gray-500 shrink-0" />
                          <span>{c.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <HiOutlineMapPin className="w-5 h-5 text-gray-500 shrink-0" />
                          <span>{c.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                        {c.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-medium text-gray-300 border border-white/10 bg-white/5 px-2.5 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a 
                        href={c.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-outline w-full py-3 text-sm gap-2 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all"
                      >
                        View Conference Archive <HiArrowTopRightOnSquare className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )
                })
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400">
                  <HiOutlineMagnifyingGlass className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-xl">No conferences found matching your filters.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setDomainFilter("All Domains"); setLocationFilter("All Locations"); }}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-24 text-center container-custom">
        <h2 className="text-4xl font-heading font-bold text-white mb-6">Looking for Upcoming Events?</h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Explore upcoming GR Conferences and participate in global research discussions.</p>
        <a href="#archives" className="btn-primary px-8 py-4 text-lg rounded-full inline-flex gap-3">
          View Upcoming Conferences <HiChevronRight className="w-5 h-5" />
        </a>
      </section>

    </main>
  );
}
