"use client";

const executive = [
  { name: "Amit Joshi",  role: "Director",  img: "/team/amit_joshi.png" },
  { name: "Mihir Chauhan", role: "Director", img: "/team/mihir_chauhan.png" },
];

const operations = [
  { name: "Aman Barot",               role: "Associate Director",          img: "/team/AmanBarot.jpg" },
  { name: "Richa Sharma",             role: "Manager",                     img: "/team/Richa_page-0001.jpg" },
  { name: "Riddhi Gohel",             role: "Associate Manager",           img: "/team/Riddhi_Gohel.png" },
  { name: "Anisha Mishra",            role: "Assistant Manager",           img: "/team/Anisha_page-0001.jpg" },
  { name: "Parth Vekariya",           role: "Assistant",                   img: "/team/parth-vekariya.png" },
  { name: "Sudarshan Singh Jaitawat", role: "Operation Associate",         img: "/team/Sudarshan Singh Jaitawat.jpg" },
  { name: "Chirag Bhati",             role: "Operation Associate",         img: "/team/Chirag.jpg" },
  { name: "Anmol Daswani",            role: "Operation Associate",         img: "/team/Anmol.jpg" },
  { name: "Komal Parmar",             role: "Assistant Executive",         img: "/team/komal_page-0001.jpg" },
  { name: "Deepika Jain",             role: "Associate – Research Analyst", img: "/team/Deepika Jain.jpeg" },
  { name: "Rahul Srivastava",         role: "Data Analyst",                img: "/team/Rahul Srivastava.jpg" },
  { name: "Pawan Yadav",              role: "Data Analyst",                img: "/team/Pawan Yadav.jpg" },
  { name: "Tushar Parmar",            role: "Email Marketing Specialist",  img: "/team/Tushar Parmar.jpg" },
  { name: "Farhana Kureshi",          role: "Assistant – Research Analyst", img: "/team/Farhana Kureshi.jpg" },
];

const tech = [
  { name: "Shivam Vakani", role: "IT Support",          img: "/team/shivam-vakani.png" },
  { name: "Jatin Gohel",   role: "Digital Publishing",  img: "/team/Jatin-Gohel.jpg" },
  { name: "Dhruv Parekh",  role: "Jr. Web Developer",   img: "/team/Dhruv Parekh.jpg" },
];

const sections = [
  {
    id: "executive-team",
    eyebrow: "Leadership",
    title: "Executive Team",
    description: "Guiding the organization, conference strategy, and operating direction of GR Conferences.",
    members: executive,
  },
  {
    id: "operations-team",
    eyebrow: "Conference Operations",
    title: "Operations Team",
    description: "Managing and supporting the complete conference cycle — from submission and review coordination to event delivery and post-conference support.",
    members: operations,
  },
  {
    id: "tech-team",
    eyebrow: "Technology",
    title: "IT & Digital Team",
    description: "Powering the platforms, tools, and digital infrastructure that keep GR Conferences running seamlessly.",
    members: tech,
  },
];

function MemberCard({ name, role, img }: { name: string; role: string; img: string }) {
  return (
    <article className="member-card">
      <div className="member-card-img">
        <img src={img} alt={name} />
      </div>
      <div className="member-card-copy">
        <span className="member-role">{role}</span>
        <h3>{name}</h3>
        <div className="member-accent" />
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <div className="team-root">

    

      {/* ── Body: sticky sidebar + content ── */}
      <div className="team-body-layout">

        {/* Sticky sidebar */}
        <aside className="team-sticky-nav">
          <p className="team-sticky-nav-label">On this page</p>
          <nav>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>{s.title}</a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="team-body-content">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="directory-section">
              <div className="directory-heading">
                <span className="team-kicker">
                  <span className="diamond">♦</span> {section.eyebrow}
                </span>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
              <div className="member-grid">
                {section.members.map((m) => (
                  <MemberCard key={m.name} {...m} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <style>{`
        .team-root {
          background: #f8f5fb;
          color: #111;
        }

        /* ── Hero ── */
        .team-hero {
          position: relative;
          background: linear-gradient(135deg, #2a0050 0%, #520380 60%, #3a025b 100%);
          padding: 120px 48px 72px;
          overflow: hidden;
        }
        .team-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 60% 50%, rgba(124,58,237,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .team-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }
        .team-hero-copy { max-width: 720px; }
        .team-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c084fc;
          margin-bottom: 18px;
        }
        .diamond { font-size: 10px; color: #a855f7; }
        .team-hero h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 300;
          line-height: 1.0;
          color: #fff;
          margin: 0 0 20px;
        }
        .team-hero p {
          font-size: 15px;
          line-height: 1.75;
          color: rgba(255,255,255,0.65);
          max-width: 560px;
          margin: 0;
        }

        /* ── Body layout ── */
        .team-body-layout {
          max-width: 1240px;
          margin: 0 auto;
          padding: 72px 48px 100px;
          display: grid;
          grid-template-columns: 200px minmax(0, 1fr);
          gap: 56px;
          align-items: start;
        }

        /* ── Sticky sidebar ── */
        .team-sticky-nav {
          position: sticky;
          top: 96px;
        }
        .team-sticky-nav-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(82,3,128,0.45);
          margin: 0 0 12px;
        }
        .team-sticky-nav nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-left: 2px solid rgba(82,3,128,0.12);
          padding-left: 14px;
        }
        .team-sticky-nav nav a {
          font-size: 13px;
          color: #6b7280;
          text-decoration: none;
          padding: 6px 0 6px 0;
          border-left: 2px solid transparent;
          margin-left: -16px;
          padding-left: 14px;
          transition: color .2s, border-color .2s;
        }
        .team-sticky-nav nav a:hover {
          color: #520380;
          border-left-color: #520380;
        }

        /* ── Directory sections ── */
        .team-body-content {
          display: grid;
          gap: 80px;
        }
        .directory-section {
          display: grid;
          gap: 32px;
          grid-template-columns: 280px minmax(0, 1fr);
          scroll-margin-top: 80px;
        }
        .directory-heading {
          position: sticky;
          top: 92px;
          align-self: start;
          border-top: 1px solid rgba(82,3,128,0.12);
          padding-top: 24px;
        }
        .directory-heading .team-kicker { color: #520380; margin-bottom: 10px; }
        .directory-heading h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 300;
          line-height: 1.1;
          color: #111;
          margin: 0 0 12px;
        }
        .directory-heading p {
          font-size: 13px;
          line-height: 1.75;
          color: #6b7280;
          margin: 0;
        }

        /* ── Member grid ── */
        .member-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          border-top: 1px solid rgba(82,3,128,0.1);
          padding-top: 24px;
        }

        /* ── Member card ── */
        .member-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid rgba(82,3,128,0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: box-shadow .3s ease, border-color .3s ease, transform .3s ease;
        }
        .member-card:hover {
          box-shadow: 0 16px 40px rgba(82,3,128,0.12);
          border-color: rgba(82,3,128,0.2);
          transform: translateY(-4px);
        }
        .member-card-img {
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #f3eeff;
          flex-shrink: 0;
        }
        .member-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          filter: grayscale(100%);
          transition: filter .35s ease, transform .35s ease;
          display: block;
        }
        .member-card:hover .member-card-img img {
          filter: grayscale(0%);
          transform: scale(1.04);
        }
        .member-card-copy {
          padding: 16px 18px 18px;
          border-top: 1px solid rgba(82,3,128,0.08);
        }
        .member-role {
          display: block;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: rgba(82,3,128,0.5);
          margin-bottom: 4px;
        }
        .member-card-copy h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 15px;
          font-weight: 400;
          color: #111;
          margin: 0;
          line-height: 1.3;
          transition: color .2s;
        }
        .member-card:hover .member-card-copy h3 { color: #520380; }
        .member-accent {
          margin-top: 10px;
          height: 2px;
          width: 0;
          border-radius: 99px;
          background: linear-gradient(90deg, #520380, #a855f7);
          transition: width .4s ease;
        }
        .member-card:hover .member-accent { width: 32px; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .directory-section { grid-template-columns: 1fr; }
          .directory-heading { position: static; }
          .member-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .team-body-layout {
            grid-template-columns: 1fr;
            padding: 48px 24px 72px;
          }
          .team-sticky-nav { display: none; }
          .team-hero { padding: 100px 24px 56px; }
        }
        @media (max-width: 640px) {
          .member-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
