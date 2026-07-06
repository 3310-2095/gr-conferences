"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const institutions = [
  { file: "Aalen University, Germany.svg", name: "Aalen University, Germany" },
  { file: "American International University, Kuwait.png", name: "American International University, Kuwait" },
  { file: "American International University,Bangladesh.svg", name: "American International University, Bangladesh" },
  { file: "Amity University - Dubai Campus, United Arab Emirates.webp", name: "Amity University - Dubai Campus, United Arab Emirates" },
  { file: "Applied Quantum Technologies Institute (AQT), Columbia.svg", name: "Applied Quantum Technologies Institute (AQT), Columbia" },
  { file: "Bangladesh University of Business and Technology, Bangladesh.png", name: "Bangladesh University of Business and Technology, Bangladesh" },
  { file: "Birla Institute of Technology And Science, Pilani.png", name: "Birla Institute of Technology And Science, Pilani" },
  { file: "Birla Institute of Technology and Science, Pilani- Dubai, United Arab Emirates.png", name: "Birla Institute of Technology and Science, Pilani- Dubai, United Arab Emirates" },
  { file: "Birmingham City University, United Kingdom.png", name: "Birmingham City University, United Kingdom" },
  { file: "British Columbia Institute of Technology, Canada.webp", name: "British Columbia Institute of Technology, Canada" },
  { file: "British University In Dubai, United Arab Emirates.webp", name: "British University In Dubai, United Arab Emirates" },
  { file: "Buffalo University, New York, United States.png", name: "Buffalo University, New York, United States" },
  { file: "California State University, United States.png", name: "California State University, United States" },
  { file: "Cape Peninsula University of Technology, South Africa.webp", name: "Cape Peninsula University of Technology, South Africa" },
  { file: "Carleton University,Canada.svg", name: "Carleton University, Canada" },
  { file: "Chiang Mai University, Thailand.png", name: "Chiang Mai University, Thailand" },
  { file: "Cyprus International University, Cyprus.svg", name: "Cyprus International University, Cyprus" },
  { file: "Daffodil international university.svg", name: "Daffodil international university" },
  { file: "De La Salle University Manila, Philippines.png", name: "De La Salle University Manila, Philippines" },
  { file: "Department of Information Technology, Sri Lanka Institute of Infromation Technology, Sri Lanka.svg", name: "Department of Information Technology, Sri Lanka Institute of Infromation Technology, Sri Lanka" },
  { file: "Department Of Management Studies, IIT Madras.png", name: "Department Of Management Studies, IIT Madras" },
  { file: "Drexel University, United States.png", name: "Drexel University, United States" },
  { file: "Dyson Institute of Engineering and Technology, United Kingdom.svg", name: "Dyson Institute of Engineering and Technology, United Kingdom" },
  { file: "Eastern Washington University,United States.svg", name: "Eastern Washington University, United States" },
  { file: "Embry-Riddle Aeronautical University - Daytona Beach, United States.svg", name: "Embry-Riddle Aeronautical University - Daytona Beach, United States" },
  { file: "Emporia State University, United States.svg", name: "Emporia State University, United States" },
  { file: "Faculty of Informatics, Mahasarakham University, Thailand.webp", name: "Faculty of Informatics, Mahasarakham University, Thailand" },
  { file: "Fairmont Preparatory Academy,United States.png", name: "Fairmont Preparatory Academy, United States" },
  { file: "Fordham University, United States.svg", name: "Fordham University, United States" },
  { file: "Grambling State University, United States.png", name: "Grambling State University, United States" },
  { file: "IIM Kozhikode.jpg", name: "IIM Kozhikode" },
  { file: "Indian Institute of Technology (BHU).png", name: "Indian Institute of Technology (BHU)" },
  { file: "Indian Institute of Technology Guwahati.png", name: "Indian Institute of Technology Guwahati" },
  { file: "Indian Institute of Technology Kanpur.png", name: "Indian Institute of Technology Kanpur" },
  { file: "Indian Institute of Technology Roorkee.png", name: "Indian Institute of Technology Roorkee" },
  { file: "Indian Institute of Technology, Kharagpur.png", name: "Indian Institute of Technology, Kharagpur" },
  { file: "Informatique et Applications, Universite Ibn Tofail Kenitra, Morocco.png", name: "Informatique et Applications, Universite Ibn Tofail Kenitra, Morocco" },
  { file: "Jahangirnagar University, Bangladesh.png", name: "Jahangirnagar University, Bangladesh" },
  { file: "Jakarta State University, Indonesia.png", name: "Jakarta State University, Indonesia" },
  { file: "Khon Kaen University, Thailand.png", name: "Khon Kaen University, Thailand" },
  { file: "King Mongkut's University of Technology North Bangkok Thailand.webp", name: "King Mongkut's University of Technology North Bangkok Thailand" },
  { file: "King Saud University, Saudi Arabia.png", name: "King Saud University, Saudi Arabia" },
  { file: "Leeds Institute for Data Analytics (LIDA), University of Leeds, UK, United Kingdom.png", name: "Leeds Institute for Data Analytics (LIDA), University of Leeds, UK, United Kingdom" },
  { file: "Lorma Colleges, Inc., Philippines.avif", name: "Lorma Colleges, Inc., Philippines" },
  { file: "Loughborough University London, United Kingdom.webp", name: "Loughborough University London, United Kingdom" },
  { file: "Manipal Academy of Higher Education - Dubai Campus, United Arab Emirates.webp", name: "Manipal Academy of Higher Education - Dubai Campus, United Arab Emirates" },
  { file: "Middlesex University Dubai - Main Campus, United Arab Emirates.svg", name: "Middlesex University Dubai - Main Campus, United Arab Emirates" },
  { file: "Morgan State University, United States.png", name: "Morgan State University, United States" },
  { file: "Namibia University of Science and Technology, Namibia.png", name: "Namibia University of Science and Technology, Namibia" },
  { file: "NIT Warangal.jpg", name: "NIT Warangal" },
  { file: "Pangasinan State University, Philippines.png", name: "Pangasinan State University, Philippines" },
  { file: "Qatar University, Qatar.png", name: "Qatar University, Qatar" },
  { file: "Rajamangala University of Technology Thanyaburi, Thailand.gif", name: "Rajamangala University of Technology Thanyaburi, Thailand" },
  { file: "Saint Louis University, United States.jpg", name: "Saint Louis University, United States" },
  { file: "San Diego State University, United States.svg", name: "San Diego State University, United States" },
  { file: "School of Interdisciplinary Research, Indian Institute of Technology Delhi.png", name: "School of Interdisciplinary Research, Indian Institute of Technology Delhi" },
  { file: "Tallinn University of Technology, Estonia.svg", name: "Tallinn University of Technology, Estonia" },
  { file: "Tashkent State Agrarian University, Uzbekistan.png", name: "Tashkent State Agrarian University, Uzbekistan" },
  { file: "Tashkent State University of Economics, Uzbekistan.png", name: "Tashkent State University of Economics, Uzbekistan" },
  { file: "Telkom University, Indonesia.webp", name: "Telkom University, Indonesia" },
  { file: "Thammasat University, Thailand.jpg", name: "Thammasat University, Thailand" },
  { file: "Univ. of Waterloo, Canada.png", name: "Univ. of Waterloo, Canada" },
  { file: "Universiti Kuala Lumpur, Malaysia.webp", name: "Universiti Kuala Lumpur, Malaysia" },
  { file: "University of Botswana, Botswana.png", name: "University of Botswana, Botswana" },
  { file: "University of Buckingham, United Kingdom.webp", name: "University of Buckingham, United Kingdom" },
  { file: "University of California, United States.avif", name: "University of California, United States" },
  { file: "University of Cape Town, South Africa.svg", name: "University of Cape Town, South Africa" },
  { file: "University of Chicago, United States.svg", name: "University of Chicago, United States" },
  { file: "University of Florida, United States.png", name: "University of Florida, United States" },
  { file: "University of Johannesburg, South Africa.svg", name: "University of Johannesburg, South Africa" },
  { file: "University of Liverpool, United Kingdom.svg", name: "University of Liverpool, United Kingdom" },
  { file: "University of Reading, United Kingdom.png", name: "University of Reading, United Kingdom" },
  { file: "University of South Africa, South Africa.webp", name: "University of South Africa, South Africa" },
  { file: "University of Toronto, Canada.webp", name: "University of Toronto, Canada" },
  { file: "University of Westminster, United Kingdom.webp", name: "University of Westminster, United Kingdom" },
  { file: "Virginia Tech, United States.svg", name: "Virginia Tech, United States" },
  { file: "Washington State University, United States.svg", name: "Washington State University, United States" },
  { file: "York University, Canada.jpg", name: "York University, Canada" },
];

// Real institutional partner logos — a distinct set/section from the broader
// "Participating Institutions" network above. A few filenames are duplicates
// of the same logo (img02/img06/img07 etc.) — only one copy of each is listed.
const institutionalPartners = [
  { file: "AACCI.jpg",                                        name: "Asian-African Chamber of Commerce & Industry" },
  { file: "Activatelearning.jpg",                              name: "Activate Learning" },
  { file: "AssociationPartner.png",                            name: "Delta Epsilon Society of Engineers" },
  { file: "DBLP.png",                                          name: "DBLP" },
  { file: "EI-Compendex.png",                                  name: "Ei Compendex" },
  { file: "INSPEC.png",                                        name: "IET Inspec" },
  { file: "IeeeUK&IrelandSection.gif",                         name: "IEEE United Kingdom and Ireland Section" },
  { file: "Japanese-Science-and-Technology-Agency-(JST).png",  name: "Japan Science and Technology Agency (JST)" },
  { file: "Numibiauniversityofscienceandtechnology.jpg",       name: "Namibia University of Science and Technology" },
  { file: "SCImago.png",                                       name: "SCImago" },
  { file: "SCOPUS.png",                                        name: "Scopus" },
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
  { file: "springer.png",                                      name: "Springer" },
  { file: "springer_nature.jpg",                               name: "Springer Nature" },
  { file: "trinity.png",                                       name: "Trinity University" },
  { file: "unified-brainz.jpg",                                name: "Unified Brainz" },
  { file: "yudiz.png",                                         name: "Yudiz Solutions Private Limited" },
  { file: "zbMATH.png",                                        name: "zbMATH Open" },
];

function LogoItem({ file, name, folder = "conf logo" }: { file: string; name: string; folder?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex items-center justify-center px-6 py-5">
      {failed ? (
        <span className="text-[11px] font-bold uppercase tracking-wide text-gray-400 text-center">{name}</span>
      ) : (
        <img
          src={`/${folder}/${file}`}
          alt={name}
          title={name}
          onError={() => setFailed(true)}
          draggable={false}
          className="max-h-10 max-w-[120px] w-auto object-contain "
        />
      )}
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex flex-col items-center text-center mb-10">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: "#520380", fontSize: 12 }}>♦</span>
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#520380]">{label}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">{title}</h2>
    </div>
  );
}

export default function TrustedInstitutions() {
  return (
    <section id="trusted-institutions" className="w-full bg-gray-100 py-20 lg:py-28">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* ── Institutional Partners ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <SectionHeader label="Partners" title="Institutional Partners" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {institutionalPartners.map((inst) => (
              <LogoItem key={inst.file} file={inst.file} name={inst.name} folder="Institutional Partners" />
            ))}
          </div>
        </motion.div>

        {/* ── Participating Institutions ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeader label="Network" title="Participating Institutions" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {institutions.map((inst) => (
              <LogoItem key={inst.file} file={inst.file} name={inst.name} folder="Participating Institutions" />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
