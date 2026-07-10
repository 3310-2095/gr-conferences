"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const institutions = [
  { file: "aalen-university-germany.svg", name: "Aalen University, Germany" },
  { file: "american-international-university-kuwait.png", name: "American International University, Kuwait" },
  { file: "american-international-university-bangladesh.svg", name: "American International University, Bangladesh" },
  { file: "amity-university-dubai-campus-united-arab-emirates.webp", name: "Amity University - Dubai Campus, United Arab Emirates" },
  { file: "applied-quantum-technologies-institute-aqt-columbia.svg", name: "Applied Quantum Technologies Institute (AQT), Columbia" },
  { file: "bangladesh-university-of-business-and-technology-bangladesh.png", name: "Bangladesh University of Business and Technology, Bangladesh" },
  { file: "birla-institute-of-technology-and-science-pilani.png", name: "Birla Institute of Technology And Science, Pilani" },
  { file: "birla-institute-of-technology-and-science-pilani-dubai-united-arab-emirates.png", name: "Birla Institute of Technology and Science, Pilani- Dubai, United Arab Emirates" },
  { file: "birmingham-city-university-united-kingdom.png", name: "Birmingham City University, United Kingdom" },
  { file: "british-columbia-institute-of-technology-canada.webp", name: "British Columbia Institute of Technology, Canada" },
  { file: "british-university-in-dubai-united-arab-emirates.webp", name: "British University In Dubai, United Arab Emirates" },
  { file: "university-at-buffalo-logo.svg", name: "University at Buffalo, New York, United States" },
  { file: "california-state-university-united-states.png", name: "California State University, United States" },
  { file: "cape-peninsula-university-of-technology-south-africa.webp", name: "Cape Peninsula University of Technology, South Africa" },
  { file: "carleton-university-canada.svg", name: "Carleton University, Canada" },
  { file: "chiang-mai-university-thailand.png", name: "Chiang Mai University, Thailand" },
  { file: "cyprus-international-university-cyprus.svg", name: "Cyprus International University, Cyprus" },
  { file: "daffodil-international-university.svg", name: "Daffodil international university" },
  { file: "de-la-salle-araneta-university-seeklogo.svg", name: "De La Salle University Manila, Philippines" },
  { file: "loyola-university-chicago-idtqoex-qm-1.svg", name: "Loyola University Chicago, United States" },
  { file: "department-of-information-technology-sri-lanka-institute-of-infromation-technology-sri-lanka.svg", name: "Department of Information Technology, Sri Lanka Institute of Infromation Technology, Sri Lanka" },
  { file: "department-of-management-studies-iit-madras.png", name: "Department Of Management Studies, IIT Madras" },
  { file: "drexel-university-united-states.png", name: "Drexel University, United States" },
  { file: "dyson-institute-of-engineering-and-technology-united-kingdom.svg", name: "Dyson Institute of Engineering and Technology, United Kingdom" },
  { file: "eastern-washington-university-united-states.svg", name: "Eastern Washington University, United States" },
  { file: "embry-riddle-aeronautical-university-daytona-beach-united-states.svg", name: "Embry-Riddle Aeronautical University - Daytona Beach, United States" },
  { file: "emporia-state-university-united-states.svg", name: "Emporia State University, United States" },
  { file: "faculty-of-informatics-mahasarakham-university-thailand.webp", name: "Faculty of Informatics, Mahasarakham University, Thailand" },
  { file: "fairmont-preparatory-academy-united-states.png", name: "Fairmont Preparatory Academy, United States" },
  { file: "fordham-university-united-states.svg", name: "Fordham University, United States" },
  { file: "grambling-state-university-united-states.png", name: "Grambling State University, United States" },
  { file: "iim-kozhikode.jpg", name: "IIM Kozhikode" },
  { file: "indian-institute-of-technology-bhu.png", name: "Indian Institute of Technology (BHU)" },
  { file: "indian-institute-of-technology-guwahati.png", name: "Indian Institute of Technology Guwahati" },
  { file: "indian-institute-of-technology-kanpur.png", name: "Indian Institute of Technology Kanpur" },
  { file: "indian-institute-of-technology-roorkee.png", name: "Indian Institute of Technology Roorkee" },
  { file: "indian-institute-of-technology-kharagpur.png", name: "Indian Institute of Technology, Kharagpur" },
  { file: "informatique-et-applications-universite-ibn-tofail-kenitra-morocco.png", name: "Informatique et Applications, Universite Ibn Tofail Kenitra, Morocco" },
  { file: "jahangirnagar-university-bangladesh.png", name: "Jahangirnagar University, Bangladesh" },
  { file: "jakarta-state-university-indonesia.png", name: "Jakarta State University, Indonesia" },
  { file: "khon-kaen-university-thailand.png", name: "Khon Kaen University, Thailand" },
  { file: "king-mongkuts-university-of-technology-north-bangkok-thailand.webp", name: "King Mongkut's University of Technology North Bangkok Thailand" },
  { file: "king-saud-university-saudi-arabia.png", name: "King Saud University, Saudi Arabia" },
  { file: "leeds-institute-for-data-analytics-lida-university-of-leeds-uk-united-kingdom.png", name: "Leeds Institute for Data Analytics (LIDA), University of Leeds, UK, United Kingdom" },
  { file: "lorma-colleges-inc-philippines.avif", name: "Lorma Colleges, Inc., Philippines" },
  { file: "loughborough-university-london-united-kingdom.webp", name: "Loughborough University London, United Kingdom" },
  { file: "manipal-academy-of-higher-education-dubai-campus-united-arab-emirates.webp", name: "Manipal Academy of Higher Education - Dubai Campus, United Arab Emirates" },
  { file: "middlesex-university-dubai-main-campus-united-arab-emirates.svg", name: "Middlesex University Dubai - Main Campus, United Arab Emirates" },
  { file: "morgan-state-university-idqqmmiukh-1.svg", name: "Morgan State University, United States" },
  { file: "namibia-university-of-science-and-technology-namibia.png", name: "Namibia University of Science and Technology, Namibia" },
  { file: "nit-warangal.jpg", name: "NIT Warangal" },
  { file: "pangasinan-state-university-philippines.png", name: "Pangasinan State University, Philippines" },
  { file: "qatar-university-qatar.png", name: "Qatar University, Qatar" },
  { file: "rajamangala-university-of-technology-thanyaburi-thailand.gif", name: "Rajamangala University of Technology Thanyaburi, Thailand" },
  { file: "saint-louis-university-united-states.jpg", name: "Saint Louis University, United States" },
  { file: "san-diego-state-university-united-states.svg", name: "San Diego State University, United States" },
  { file: "school-of-interdisciplinary-research-indian-institute-of-technology-delhi.png", name: "School of Interdisciplinary Research, Indian Institute of Technology Delhi" },
  { file: "tallinn-university-of-technology-estonia.svg", name: "Tallinn University of Technology, Estonia" },
  { file: "tashkent-state-agrarian-university-uzbekistan.png", name: "Tashkent State Agrarian University, Uzbekistan" },
  { file: "tashkent-state-university-of-economics-uzbekistan.png", name: "Tashkent State University of Economics, Uzbekistan" },
  { file: "telkom-university-indonesia.webp", name: "Telkom University, Indonesia" },
  { file: "thammasat-university-thailand.jpg", name: "Thammasat University, Thailand" },
  { file: "university-of-waterloo-id4vopjfr2-1.svg", name: "University of Waterloo, Canada" },
  { file: "cmu-sub-logo.svg", name: "Carnegie Mellon University, United States" },
  { file: "universiti-kuala-lumpur-malaysia.webp", name: "Universiti Kuala Lumpur, Malaysia" },
  { file: "university-of-botswana-botswana.png", name: "University of Botswana, Botswana" },
  { file: "university-of-buckingham-united-kingdom.webp", name: "University of Buckingham, United Kingdom" },
  { file: "university-of-california-united-states.avif", name: "University of California, United States" },
  { file: "university-of-cape-town-south-africa.svg", name: "University of Cape Town, South Africa" },
  { file: "university-of-chicago-united-states.svg", name: "University of Chicago, United States" },
  { file: "university-of-florida-logo.svg", name: "University of Florida, United States" },
  { file: "university-of-johannesburg-south-africa.svg", name: "University of Johannesburg, South Africa" },
  { file: "university-of-liverpool-united-kingdom.svg", name: "University of Liverpool, United Kingdom" },
  { file: "university-of-reading-united-kingdom.png", name: "University of Reading, United Kingdom" },
  { file: "university-of-south-africa-south-africa.webp", name: "University of South Africa, South Africa" },
  { file: "university-of-toronto-canada.webp", name: "University of Toronto, Canada" },
  { file: "university-of-westminster-united-kingdom.webp", name: "University of Westminster, United Kingdom" },
  { file: "virginia-tech-united-states.svg", name: "Virginia Tech, United States" },
  { file: "washington-state-university-united-states.svg", name: "Washington State University, United States" },
  { file: "york-university-canada.jpg", name: "York University, Canada" },
];

// Publication partners — indexing/publishing bodies, shown in their own tab.
const publicationPartners = [
  { file: "springer-seeklogo.svg",       name: "Springer" },
  { file: "Springer_Nature_Logo.svg",    name: "Springer Nature" },
  { file: "IEEE_logo.svg",               name: "IEEE" },
  { file: "Scopus_logo.svg",             name: "Scopus" },
  { file: "SCImago_idRaeTB19O_1.svg",    name: "SCImago" },
  { file: "IET_Logo.svg",                name: "(IET) Inspec" },
  { file: "DBLP.png",                    name: "DBLP" },
];

// Real institutional partner logos — a distinct set/tab from Author Institutions and
// Publication Partners above. A few filenames are duplicates of the same logo
// (img02/img06/img07 etc.) — only one copy of each is listed.
const institutionalPartners = [
  { file: "AACCI.jpg",                                        name: "Asian-African Chamber of Commerce & Industry" },
  { file: "Activatelearning.jpg",                              name: "Activate Learning" },
  { file: "AssociationPartner.png",                            name: "Delta Epsilon Society of Engineers" },
  { file: "EI-Compendex.png",                                  name: "Ei Compendex" },
  { file: "Japanese-Science-and-Technology-Agency-(JST).png",  name: "Japan Science and Technology Agency (JST)" },
  { file: "Numibiauniversityofscienceandtechnology.jpg",       name: "Namibia University of Science and Technology" },
  { file: "Supporting-Local-Partner.jpg",                      name: "Global Chamber London" },
  { file: "UniversityPartner.png",                             name: "Samar State University" },
  { file: "WTI-Frankfurt-eG.png",                              name: "WTI AG" },
  { file: "acm.jpg",                                           name: "ACM" },
  { file: "assocham.png",                                      name: "ASSOCHAM India" },
  { file: "bhupal-nobles-university.jpg",                      name: "Bhupal Nobles' University" },
  { file: "ciba.png",                                          name: "CIBA" },
  { file: "csi.jpg",                                           name: "Computer Society of India" },
  { file: "gesia.png",                                         name: "GESIA" },
  { file: "goa.png",                                           name: "Goa Chamber of Commerce & Industry" },
  { file: "green_slices.jpg",                                  name: "Green Slices" },
  { file: "img03.jpg",                                         name: "Microsoft Innovation Center" },
  { file: "img05.png",                                         name: "IT Buzz" },
  { file: "interYIT-ifip.png",                                 name: "InterYIT & IFIP" },
  { file: "ministry_it.png",                                   name: "Ministry of Electronics & IT, Government of India" },
  { file: "nbso_netherland_logo.png",                          name: "NBSO Netherlands" },
  { file: "new-logo.png",                                      name: "Cape Peninsula University of Technology" },
  { file: "partner_new-1.jpg",                                 name: "IADD" },
  { file: "payUMoney.png",                                     name: "PayUmoney" },
  { file: "pca-img04.jpg",                                     name: "The Institution of Engineers (India)" },
  { file: "perfect_Edumedia.jpg",                              name: "Perfect Edumedia" },
  { file: "publication-2.svg",                                 name: "Publication Partner" },
  { file: "publication-3.svg",                                 name: "Publication Partner" },
  { file: "publication-4.svg",                                 name: "Publication Partner" },
  { file: "publication-5.svg",                                 name: "Publication Partner" },
  { file: "publication-6.svg",                                 name: "Publication Partner" },
  { file: "sitg.png",                                          name: "SABAR Institute of Technology for Girls" },
  { file: "trinity.png",                                       name: "Trinity University" },
  { file: "unified-brainz.jpg",                                name: "Unified Brainz" },
  { file: "yudiz.png",                                         name: "Yudiz Solutions Private Limited" },
  { file: "zbMATH.png",                                        name: "zbMATH Open" },
];

function LogoItem({ file, name, folder = "conf logo" }: { file: string; name: string; folder?: string }) {
  const [failed, setFailed] = useState(false);
  const src = `/${folder.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(file)}`;
  const isAnimatedOrVector = /\.(svg|gif)$/i.test(file);
  return (
    <div className="flex items-center justify-center px-6 py-5">
      {failed ? (
        <span className="text-[11px] font-bold uppercase tracking-wide text-gray-400 text-center">{name}</span>
      ) : (
        <div className="relative h-10 w-30">
          <Image
            src={src}
            alt={name}
            title={name}
            fill
            sizes="120px"
            unoptimized={isAnimatedOrVector}
            onError={() => setFailed(true)}
            draggable={false}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}

type TabKey = "author" | "publication" | "institutional";

const TABS: { key: TabKey; label: string; data: { file: string; name: string }[]; folder: string; cols: string }[] = [
  {
    key: "author",
    label: "Author Institutions",
    data: institutions,
    folder: "Participating Institutions",
    cols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  },
  {
    key: "publication",
    label: "Publication Partners",
    data: publicationPartners,
    folder: "Publication Partners/Publication Partners",
    cols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  },
  {
    key: "institutional",
    label: "Institutional Partners",
    data: institutionalPartners,
    folder: "Institutional Partners",
    cols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
  },
];

export default function TrustedInstitutions() {
  const [activeTab, setActiveTab] = useState<TabKey>("author");
  const active = TABS.find((t) => t.key === activeTab)!;

  return (
    <section id="trusted-institutions" className="w-full bg-gray-100 py-20 lg:py-28">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "#520380", fontSize: 12 }}>♦</span>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#520380]">Partners & Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">Trusted By The World's Best</h2>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors duration-200 ${
                activeTab === tab.key ? "text-white" : "text-gray-500 hover:text-[#520380]"
              }`}
            >
              {activeTab === tab.key && (
                <motion.span
                  layoutId="trusted-institutions-tab-pill"
                  className="absolute inset-0 rounded-xl bg-[#520380]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── Active tab grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
            className={`grid ${active.cols} gap-4`}
          >
            {active.data.map((inst) => (
              <LogoItem key={inst.file} file={inst.file} name={inst.name} folder={active.folder} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
