// Conference destination data with accurate geographic coordinates
export interface Destination {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

// Ordered for sequential pin reveal
export const destinations: Destination[] = [
  { city: "New York",    country: "United States", lat: 40.7128,   lng: -74.0060  },
  { city: "London",      country: "United Kingdom", lat: 51.5074,  lng:  -0.1278  },
  { city: "Bangkok",     country: "Thailand",       lat: 13.7563,   lng: 100.5018  },
  { city: "Ahmedabad",   country: "India",          lat: 23.0225,   lng:  72.5714  },
  { city: "Goa",         country: "India",          lat: 15.2993,   lng:  74.1240  },
  { city: "Udaipur",     country: "India",          lat: 24.5854,   lng:  73.7125  },
  { city: "Manila",      country: "Philippines",    lat: 14.5995,   lng: 120.9842  },
  { city: "Cape Town",   country: "South Africa",   lat: -33.9249,  lng:  18.4241  },
  { city: "Cairo",       country: "Egypt",          lat: 30.0444,   lng:  31.2357  },
  { city: "Almaty",      country: "Kazakhstan",     lat: 43.2220,   lng:  76.8512  },
  { city: "Chandigarh",  country: "India",          lat: 30.7333,   lng:  76.7794  },
  { city: "Indore",      country: "India",          lat: 22.7196,   lng:  75.8577  },
  { city: "Melbourne",   country: "Australia",      lat: -37.8136,  lng: 144.9631  },
  { city: "Dubai",       country: "UAE",            lat: 25.2048,   lng:  55.2708  },
  { city: "Moscow",      country: "Russia",         lat: 55.7558,   lng:  37.6173  },
  { city: "Las Vegas",   country: "United States",  lat: 36.1699,   lng: -115.1398 },
];
