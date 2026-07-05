// Placeholder community-member data — swap this out once the real author sheet is provided.
// `tag` is always "Author" for now since that's the only role data available from the sheet.
export type CommunityMember = {
  name: string;
  institution: string;
  country: string;
  tag: string;
  /** Only featured members get a photo — shown in the "Featured Members" wall of fame. */
  featured?: boolean;
  img?: string;
};

const FEATURED_PHOTOS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
];

const FEATURED: CommunityMember[] = [
  { name: "Elena Marceau", institution: "University of Toronto", country: "Canada", tag: "Author", featured: true, img: FEATURED_PHOTOS[0] },
  { name: "Rajiv Menon", institution: "IIT Bombay", country: "India", tag: "Author", featured: true, img: FEATURED_PHOTOS[1] },
  { name: "Amara Okafor", institution: "University of Cape Town", country: "South Africa", tag: "Author", featured: true, img: FEATURED_PHOTOS[2] },
  { name: "Lucas Weber", institution: "TU Munich", country: "Germany", tag: "Author", featured: true, img: FEATURED_PHOTOS[3] },
  { name: "Mei Lin Tan", institution: "National University of Singapore", country: "Singapore", tag: "Author", featured: true, img: FEATURED_PHOTOS[4] },
  { name: "Carlos Ibarra", institution: "Universidad de Chile", country: "Chile", tag: "Author", featured: true, img: FEATURED_PHOTOS[5] },
  { name: "Sara Whitfield", institution: "University of Oxford", country: "United Kingdom", tag: "Author", featured: true, img: FEATURED_PHOTOS[6] },
  { name: "Haruto Sato", institution: "University of Tokyo", country: "Japan", tag: "Author", featured: true, img: FEATURED_PHOTOS[7] },
];

// Generic placeholder pool for the full directory — enough entries to demonstrate
// alphabetical sorting + 48-per-page pagination across more than one page.
const FIRST_NAMES = [
  "Aarav", "Wei", "Fatima", "Liam", "Sofia", "Noah", "Ananya", "Ethan", "Mia", "Yusuf",
  "Chloe", "Kenji", "Aisha", "Lucas", "Priya", "Mateo", "Grace", "Diego", "Hana", "Omar",
  "Isabella", "Arjun", "Nora", "Felix", "Layla", "Daniel", "Zara", "Marco", "Ingrid", "Kwame",
];
const LAST_NAMES = [
  "Sharma", "Chen", "Al-Sayed", "Johansson", "Rossi", "Kim", "Nakamura", "Silva", "Kowalski", "Mensah",
  "Ivanov", "Garcia", "Müller", "Novak", "Tanaka", "Dubois", "Petrov", "Costa", "Yamamoto", "Reyes",
];
const INSTITUTIONS = [
  "University of Toronto", "IIT Delhi", "National University of Singapore", "TU Munich",
  "University of Oxford", "University of Cape Town", "Universidad de Chile", "University of Tokyo",
  "Seoul National University", "University of São Paulo", "ETH Zürich", "University of Melbourne",
  "Cairo University", "University of Warsaw", "KAIST", "University of Nairobi",
];
const COUNTRIES = [
  "Canada", "India", "Singapore", "Germany", "United Kingdom", "South Africa", "Chile", "Japan",
  "South Korea", "Brazil", "Switzerland", "Australia", "Egypt", "Poland", "Kenya", "Mexico",
];

function buildDirectory(count: number): CommunityMember[] {
  const list: CommunityMember[] = [];
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 7 + 3) % LAST_NAMES.length];
    list.push({
      name: `${first} ${last}`,
      institution: INSTITUTIONS[(i * 3 + 1) % INSTITUTIONS.length],
      country: COUNTRIES[(i * 3 + 1) % COUNTRIES.length],
      tag: "Author",
    });
  }
  return list;
}

// FEATURED members also appear in the full directory (a featured author is still an author).
export const communityMembers: CommunityMember[] = [...FEATURED, ...buildDirectory(94)];

export const featuredMembers = communityMembers.filter(
  (m): m is CommunityMember & { img: string } => Boolean(m.featured && m.img)
);
