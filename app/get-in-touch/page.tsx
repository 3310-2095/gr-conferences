import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get in Touch | GR Conferences",
  description: "Contact GR Conferences for submission support, conference inquiries, and general questions.",
  alternates: { canonical: "/get-in-touch" },
};

const offices = [
  {
    heading: "Ahmedabad Office",
    body: "607, 608 The Emporio, Opp. 4D Square Mall, Visat-Gandhinagar Highway, Chandkheda, Ahmedabad – 382424, Gujarat, India",
    primary: true,
  },
  {
    heading: "Pune Office",
    body: "UrbanWrk, Unit No. 307, Koncord Tower, Bund Garden Road, Pune, Maharashtra, India, 411001",
    primary: false,
  },
];

export default function GetInTouchPage() {
  return (
    <main>
      {/* Main Content */}
      <section className="min-h-screen bg-[#f8f5fb] pt-[140px] pb-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">

          {/* Hero */}
          <div className="mb-14">
            <div
              className="inline-block px-10 py-10"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 40px rgba(82,3,128,0.06), inset 0 1px 1px rgba(255,255,255,0.35)",
              }}
            >
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#520380] mb-3">
                <span className="text-[#520380] text-xs">♦</span>
                GR Conferences
              </p>
              <h1 className="text-3xl md:text-[42px] font-bold text-[#520380] tracking-tight leading-tight">Get in Touch</h1>
            </div>
          </div>

          <div className="contact-wrap">

            {/* Map */}
            <div className="contact-map">
              <iframe
                title="GR Conferences Ahmedabad Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.3!2d72.5873!3d23.1025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e832da3b6e6b7%3A0x1!2s607%2C+608+The+Emporio%2C+Chandkheda%2C+Ahmedabad%2C+Gujarat+382424!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: 480 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Details */}
            <div className="contact-details">
              <h2 className="text-2xl font-extrabold text-[#111] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                GR Conferences
              </h2>
              <p className="text-sm italic text-gray-500 mb-8">An entity of GR Scholastic LLP</p>

              <div className="w-10 h-[2px] bg-[#520380] mb-8" />

              {offices.map((o) => (
                <div key={o.heading} className="mb-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#520380] mb-2 flex items-center gap-2">
                    {o.heading}
                    {o.primary && (
                      <span className="text-[9px] font-bold bg-[#f3e8ff] text-[#520380] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Primary
                      </span>
                    )}
                  </p>
                  <p className="text-[14px] text-gray-600 leading-[1.8]">{o.body}</p>
                </div>
              ))}

              <div className="w-full h-px bg-gray-200 my-7" />

              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#520380] mb-4">
                Contact Information
              </p>
              <p className="text-[14px] text-gray-600 leading-[1.8]">
                <a
                  href="mailto:info@gr-conferences.com"
                  className="text-[#111] border-b border-gray-300 hover:border-[#520380] hover:text-[#520380] transition-colors"
                >
                  info@gr-conferences.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .contact-wrap {
          display: flex;
          gap: 1px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(82,3,128,0.06);
        }
        .contact-map { flex: 1; min-height: 480px; }
        .contact-map iframe { min-height: 480px; }
        .contact-details { flex: 1; background: #fff; padding: 48px 40px; }
        @media (max-width: 900px) {
          .contact-wrap { flex-direction: column; }
          .contact-map { min-height: 320px; }
          .contact-map iframe { min-height: 320px; }
          .contact-details { padding: 32px 24px; }
        }
      `}</style>
    </main>
  );
}
