import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies | GR Conferences",
  description: "Refund & Cancellation, Payment, Terms & Conditions, Privacy, and Publication policies for GR Conferences.",
  alternates: { canonical: "/policies" },
};

const sections = [
  {
    id: "refund",
    title: "Refund & Cancellation",
    paragraphs: [
      "We do not claim or guarantee that any papers will be published by any specific publisher or indexed. Publishers or organizations can decline to publish a conference paper that does not meet their quality standards.",
      "We do not claim or guarantee that any papers will be indexed in any database. Indexing services evaluate conference papers and independently determine what they will index.",
    ],
  },
  {
    id: "payment",
    title: "Payment Policy",
    paragraphs: [
      "Payment of fees in GBP must accompany all registrations. No registration will be confirmed until payment is received.",
      "Payment can be made by Credit Card: only Visa and MasterCard are accepted, and payment should be submitted online via the payment form. Credit card details will not be accepted via email.",
    ],
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    paragraphs: [
      "Registration must be paid and confirmed before the deadline. We may revise our terms and conditions as per government norms, for example to reflect changes in relevant laws or regulatory requirements or improvements.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    paragraphs: [
      "Filming and photography may take place at the Conference. You consent to your image and likeness being used in marketing and films without any payment to you.",
      "Registered Address for communication: G R SCHOLASTIC LLP – C-701, Snehkunj Elegance, Near Hari Gold, Kudasan, Gandhinagar-382421, Gujarat, India. G R SCHOLASTIC LLP is a registered company u/s 12(1) of the Limited Liability Partnership Act 2008 – Government of India. All legal matters and accounts will be handled at the above jurisdiction address only.",
      "By attending the Conference, you hereby grant the absolute right and permission to use your photograph or video image in promotional materials and publicity. In addition, you hereby consent to waive any and all future claims, causes of action, and/or demands against the Conference secretariat.",
    ],
  },
  {
    id: "publication",
    title: "Publication Policy",
    paragraphs: [
      "We do not claim or guarantee that any papers will be published by any specific publisher or indexed. Publishers or organizations can decline to publish a conference paper that does not meet their quality standards.",
      "We do not claim or guarantee that any papers will be indexed in any database. Indexing services evaluate conference papers and independently determine what they will index.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <main>
      <section className="min-h-screen bg-[#f8f5fb] pt-[140px] pb-24">
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
              <h1 className="text-3xl md:text-[42px] font-bold text-[#520380] tracking-tight leading-tight">Policies</h1>
              <p className="text-gray-500 text-sm mt-3 max-w-[520px] leading-relaxed">
                Refund & Cancellation, Payment, Terms &amp; Conditions, Privacy, and Publication policies that govern participation in GR Conferences events.
              </p>
            </div>
          </div>

          <div className="policy-wrap">

            {/* Quick nav */}
            <nav className="policy-nav">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#520380] mb-4">On this page</p>
              <ul className="flex flex-col gap-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-[13.5px] text-gray-600 hover:text-[#520380] py-1.5 transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sections */}
            <div className="policy-content">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className={i > 0 ? "pt-10 mt-10 border-t border-gray-200" : ""}>
                  <h2
                    className="text-2xl font-extrabold text-[#111] mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {s.title}
                  </h2>
                  <div className="w-10 h-[2px] bg-[#520380] mb-6" />
                  <div className="flex flex-col gap-4">
                    {s.paragraphs.map((p, pi) => (
                      <p key={pi} className="text-[14px] text-gray-600 leading-[1.8]">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .policy-wrap {
          display: flex;
          align-items: flex-start;
          gap: 48px;
        }
        .policy-nav {
          flex: 0 0 220px;
          position: sticky;
          top: 120px;
        }
        .policy-content {
          flex: 1;
          min-width: 0;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(82,3,128,0.06);
          padding: 40px 40px 8px;
        }
        @media (max-width: 900px) {
          .policy-wrap { flex-direction: column; gap: 24px; }
          .policy-nav { position: static; flex: none; width: 100%; }
          .policy-content { padding: 28px 22px 4px; }
        }
      `}</style>
    </main>
  );
}
