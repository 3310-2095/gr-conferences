export type GalleryImage = { src: string; type: "destination" | "conference" };
export type CityGallery = {
  slug: string;
  city: string;
  country: string;
  cover: string;
  thumb1: string;
  thumb2: string;
  images: GalleryImage[];
};

// Generic conference-moment photos (dummy) reused across cities
const CONF_1 = "/banner.jpeg";
const CONF_2 = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800";
const CONF_3 = "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800";
const CONF_4 = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800";
const CONF_5 = "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800";
const CONF_6 = "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=800";

// Generic destination fallback photos (dummy) for cities without a second local shot
const DEST_FALLBACK_1 = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800";
const DEST_FALLBACK_2 = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800";
const DEST_FALLBACK_3 = "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800";
const DEST_FALLBACK_4 = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800";

export const cities: CityGallery[] = [
  {
    slug: "ahmedabad",
    city: "Ahmedabad",
    country: "India",
    cover: "/ahmedabadcity.webp",
    thumb1: CONF_1,
    thumb2: "/ahmedabad.jpg",
    images: [
      { src: "/ahmedabadcity.webp", type: "destination" },
      { src: CONF_1, type: "conference" },
      { src: "/ahmedabad.jpg", type: "destination" },
      { src: CONF_2, type: "conference" },
      { src: "/ahmedabadcity.webp", type: "destination" },
      { src: CONF_4, type: "conference" },
      { src: "/ahmedabad.jpg", type: "destination" },
      { src: CONF_5, type: "conference" },
      { src: "/ahmedabadcity.webp", type: "destination" },
      { src: CONF_1, type: "conference" },
      { src: "/ahmedabad.jpg", type: "destination" },
      { src: CONF_6, type: "conference" },
    ],
  },
  {
    slug: "goa",
    city: "Goa",
    country: "India",
    cover: "/goa.png",
    thumb1: CONF_2,
    thumb2: "/goacity.avif",
    images: [
      { src: "/goa.png", type: "destination" },
      { src: CONF_2, type: "conference" },
      { src: "/goacity.avif", type: "destination" },
      { src: CONF_1, type: "conference" },
      { src: "/goa.png", type: "destination" },
      { src: CONF_5, type: "conference" },
      { src: "/goacity.avif", type: "destination" },
      { src: CONF_4, type: "conference" },
      { src: "/goa.png", type: "destination" },
      { src: CONF_6, type: "conference" },
      { src: "/goacity.avif", type: "destination" },
      { src: CONF_3, type: "conference" },
    ],
  },
  {
    slug: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    cover: "/capetown.jpg",
    thumb1: CONF_3,
    thumb2: DEST_FALLBACK_1,
    images: [
      { src: "/capetown.jpg", type: "destination" },
      { src: CONF_3, type: "conference" },
      { src: DEST_FALLBACK_1, type: "destination" },
      { src: CONF_1, type: "conference" },
      { src: "/capetown.jpg", type: "destination" },
      { src: CONF_6, type: "conference" },
      { src: DEST_FALLBACK_1, type: "destination" },
      { src: CONF_2, type: "conference" },
      { src: "/capetown.jpg", type: "destination" },
      { src: CONF_5, type: "conference" },
      { src: DEST_FALLBACK_1, type: "destination" },
      { src: CONF_4, type: "conference" },
    ],
  },
  {
    slug: "manila",
    city: "Manila",
    country: "Philippines",
    cover: "/manila.jpg",
    thumb1: CONF_4,
    thumb2: DEST_FALLBACK_2,
    images: [
      { src: "/manila.jpg", type: "destination" },
      { src: CONF_4, type: "conference" },
      { src: DEST_FALLBACK_2, type: "destination" },
      { src: CONF_6, type: "conference" },
      { src: "/manila.jpg", type: "destination" },
      { src: CONF_1, type: "conference" },
      { src: DEST_FALLBACK_2, type: "destination" },
      { src: CONF_3, type: "conference" },
      { src: "/manila.jpg", type: "destination" },
      { src: CONF_2, type: "conference" },
      { src: DEST_FALLBACK_2, type: "destination" },
      { src: CONF_5, type: "conference" },
    ],
  },
  {
    slug: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    cover: "/thailand.jpg",
    thumb1: CONF_5,
    thumb2: DEST_FALLBACK_3,
    images: [
      { src: "/thailand.jpg", type: "destination" },
      { src: CONF_5, type: "conference" },
      { src: DEST_FALLBACK_3, type: "destination" },
      { src: CONF_2, type: "conference" },
      { src: "/thailand.jpg", type: "destination" },
      { src: CONF_4, type: "conference" },
      { src: DEST_FALLBACK_3, type: "destination" },
      { src: CONF_1, type: "conference" },
      { src: "/thailand.jpg", type: "destination" },
      { src: CONF_6, type: "conference" },
      { src: DEST_FALLBACK_3, type: "destination" },
      { src: CONF_3, type: "conference" },
    ],
  },
  {
    slug: "new-york",
    city: "New York",
    country: "USA",
    cover: "/newyork.png",
    thumb1: CONF_6,
    thumb2: DEST_FALLBACK_4,
    images: [
      { src: "/newyork.png", type: "destination" },
      { src: CONF_6, type: "conference" },
      { src: DEST_FALLBACK_4, type: "destination" },
      { src: CONF_3, type: "conference" },
      { src: "/newyork.png", type: "destination" },
      { src: CONF_2, type: "conference" },
      { src: DEST_FALLBACK_4, type: "destination" },
      { src: CONF_5, type: "conference" },
      { src: "/newyork.png", type: "destination" },
      { src: CONF_1, type: "conference" },
      { src: DEST_FALLBACK_4, type: "destination" },
      { src: CONF_4, type: "conference" },
    ],
  },
  {
    slug: "london",
    city: "London",
    country: "United Kingdom",
    cover: DEST_FALLBACK_2,
    thumb1: CONF_1,
    thumb2: DEST_FALLBACK_3,
    images: [
      { src: DEST_FALLBACK_2, type: "destination" },
      { src: CONF_1, type: "conference" },
      { src: DEST_FALLBACK_3, type: "destination" },
      { src: CONF_5, type: "conference" },
      { src: DEST_FALLBACK_2, type: "destination" },
      { src: CONF_3, type: "conference" },
      { src: DEST_FALLBACK_3, type: "destination" },
      { src: CONF_6, type: "conference" },
      { src: DEST_FALLBACK_2, type: "destination" },
      { src: CONF_2, type: "conference" },
      { src: DEST_FALLBACK_3, type: "destination" },
      { src: CONF_4, type: "conference" },
    ],
  },
  {
    slug: "las-vegas",
    city: "Las Vegas",
    country: "USA",
    cover: DEST_FALLBACK_4,
    thumb1: CONF_2,
    thumb2: DEST_FALLBACK_1,
    images: [
      { src: DEST_FALLBACK_4, type: "destination" },
      { src: CONF_2, type: "conference" },
      { src: DEST_FALLBACK_1, type: "destination" },
      { src: CONF_4, type: "conference" },
      { src: DEST_FALLBACK_4, type: "destination" },
      { src: CONF_6, type: "conference" },
      { src: DEST_FALLBACK_1, type: "destination" },
      { src: CONF_1, type: "conference" },
      { src: DEST_FALLBACK_4, type: "destination" },
      { src: CONF_5, type: "conference" },
      { src: DEST_FALLBACK_1, type: "destination" },
      { src: CONF_3, type: "conference" },
    ],
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
