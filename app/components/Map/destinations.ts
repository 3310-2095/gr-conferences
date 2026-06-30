// Conference destination data with accurate geographic coordinates
export interface Destination {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

// Ordered for sequential pin reveal
export const destinations: Destination[] = [
  { city: "New York",   country: "United States", lat: 40.7128,  lng: -74.006  },
  { city: "London",     country: "United Kingdom", lat: 51.5074,  lng: -0.1278  },
  { city: "Bangkok",    country: "Thailand",        lat: 13.7563,  lng: 100.5018 },
  { city: "Ahmedabad",  country: "India",           lat: 23.0225,  lng: 72.5714  },
  { city: "Goa",        country: "India",           lat: 15.2993,  lng: 74.124   },
  { city: "Udaipur",    country: "India",           lat: 24.5854,  lng: 73.7125  },
  { city: "Manila",     country: "Philippines",     lat: 14.5995,  lng: 120.9842 },
  { city: "Cape Town",  country: "South Africa",    lat: -33.9249, lng: 18.4241  },
];
