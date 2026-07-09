// Real per-edition Gallery / Publication History links, sourced from the team's tracking sheet:
// https://docs.google.com/spreadsheets/d/1ajhkog-D6_mHNDNCW83FwL_Jfwm6KlMpcLWmekRMlMA
// Keyed by "<sheet acronym>|<year>". Missing entries mean the sheet has no link for that edition yet.
type EditionLinks = { gallery?: string; publication?: string };

const RAW: Record<string, EditionLinks> = {
  "ICICT|2026": { gallery: "https://www.icict.co.uk/glimpse-of-icict-2026.php?section=physical", publication: "https://www.icict.co.uk/publication.php" },
  "ICICT|2025": { gallery: "https://www.icict.co.uk/glimpse-of-icict-2025.php?section=physical", publication: "https://www.icict.co.uk/publication.php" },
  "ICICT|2024": { gallery: "https://www.icict.co.uk/glimpse-of-icict-2024.php?section=physical", publication: "https://www.icict.co.uk/publication.php" },
  "ICICT|2023": { gallery: "https://www.icict.co.uk/glimpse-of-icict-2023.php?section=physical", publication: "https://www.icict.co.uk/publication.php" },
  "ICICT|2022": { gallery: "https://www.icict.co.uk/glimpse-of-icict-2022.php?section=physical", publication: "https://www.icict.co.uk/publication.php" },

  "SmartCom|2026": { gallery: "https://www.smartcomconference.com/glimpse-of-smartcom-2026-physical.php", publication: "https://www.smartcomconference.com/publication.php" },
  "SmartCom|2025": { gallery: "https://www.smartcomconference.com/glimpse-of-smartcom-2025-physical.php", publication: "https://www.smartcomconference.com/publication.php" },
  "SmartCom|2024": { gallery: "https://www.smartcomconference.com/glimpse-of-smartcom-2024-physical.php", publication: "https://www.smartcomconference.com/publication.php" },
  "SmartCom|2023": { gallery: "https://www.smartcomconference.com/glimpse-of-smartcom-2023-physical.php", publication: "https://www.smartcomconference.com/publication.php" },
  "SmartCom|2022": { gallery: "https://www.smartcomconference.com/glimpse-of-smartcom-2021-physical.php", publication: "https://www.smartcomconference.com/publication.php" },

  "BioCom|2026": { gallery: "https://ictisthailand.com/gallery.php?year=2026-physical-all", publication: "https://ictisthailand.com/biocom.php#section05" },
  "BioCom|2018": { publication: "https://link.springer.com/book/10.1007/978-3-030-21726-6" },

  "ICT4SD|2025": { gallery: "https://ict4sd.org/glimpse.php?section=2025-physical" },
  "ICT4SD|2024": { gallery: "https://ict4sd.org/glimpse.php?section=2024-physical" },
  "ICT4SD|2023": { gallery: "https://ict4sd.org/glimpse.php?section=2023-physical" },
  "ICT4SD|2022": { gallery: "https://ict4sd.org/glimpse.php?section=2022-physical" },
  "ICT4SD|2021": { gallery: "https://ict4sd.org/glimpse.php?section=2021" },

  "ICTIS Thailand|2026": { gallery: "https://ictisthailand.com/gallery.php?year=2026-physical-all", publication: "https://ictisthailand.com/publication.html" },
  "ICTIS Thailand|2025": { gallery: "https://ictisthailand.com/gallery.php?year=2025-physical-all", publication: "https://ictisthailand.com/publication.html" },
  "ICTIS Thailand|2024": { gallery: "https://ictisthailand.com/gallery.php?year=2024-physical-all", publication: "https://ictisthailand.com/publication.html" },
  "ICTIS Thailand|2023": { gallery: "https://ictisthailand.com/gallery.php?year=2023-physical-all", publication: "https://ictisthailand.com/publication.html" },
  "ICTIS Thailand|2022": { gallery: "https://ictisthailand.com/gallery.php?year=2022-physical-all", publication: "https://ictisthailand.com/publication.html" },

  "TIBS|2026": { gallery: "https://tibsconf.com/glimpse.php" },

  "WorldS4|2025": { gallery: "https://www.worlds4.co.uk/gallery/2025/physical", publication: "https://www.worlds4.co.uk/publication" },
  "WorldS4|2024": { gallery: "https://www.worlds4.co.uk/gallery/2024/physical", publication: "https://www.worlds4.co.uk/publication" },
  "WorldS4|2023": { gallery: "https://www.worlds4.co.uk/gallery/2023/physical", publication: "https://www.worlds4.co.uk/publication" },
  "WorldS4|2022": { gallery: "https://www.worlds4.co.uk/gallery/2022/physical", publication: "https://www.worlds4.co.uk/publication" },
  "WorldS4|2021": { gallery: "https://www.worlds4.co.uk/gallery/2021/physical", publication: "https://www.worlds4.co.uk/publication" },

  "ICTIS USA|2025": { gallery: "https://ictisusa.com/gallery.php?year=2025-physical-all", publication: "https://ictisusa.com/publication.html" },
  "ICTIS USA|2024": { gallery: "https://ictisusa.com/gallery.php?year=2024-physical-all", publication: "https://ictisusa.com/publication.html" },
  "ICTIS USA|2023": { gallery: "https://ictisusa.com/gallery.php?year=2023-physical-all", publication: "https://ictisusa.com/publication.html" },
  "ICTIS USA|2022": { gallery: "https://ictisusa.com/gallery.php?year=2023-physical-all", publication: "https://ictisusa.com/publication.html" },
  "ICTIS USA|2021": { gallery: "https://ictisusa.com/gallery.php?year=2023-physical-all", publication: "https://ictisusa.com/publication.html" },

  "ICTCS|2025": { gallery: "https://ictcs.in/gallery.php?id=34552", publication: "https://ictcs.in/publication.php" },
  "ICTCS|2024": { gallery: "https://ictcs.in/gallery.php?id=34551", publication: "https://ictcs.in/publication.php" },
  "ICTCS|2023": { gallery: "https://ictcs.in/gallery.php?id=34449", publication: "https://ictcs.in/publication.php" },
  "ICTCS|2022": { gallery: "https://ictcs.in/gallery.php?id=47723", publication: "https://ictcs.in/publication.php" },
  "ICTCS|2021": { gallery: "https://ictcs.in/gallery.php?id=96683", publication: "https://ictcs.in/publication.php" },

  "ISBM|2025": { gallery: "https://isbmconf.com/gallery", publication: "https://isbmconf.com/publications" },
  "ISBM|2024": { gallery: "https://isbmconf.com/gallery", publication: "https://isbmconf.com/publications" },
  "ISBM|2023": { gallery: "https://isbmconf.com/gallery", publication: "https://isbmconf.com/publications" },
  "ISBM|2022": { gallery: "https://isbmconf.com/gallery", publication: "https://isbmconf.com/publications" },

  "MCT4SD Philippines|2025": { gallery: "https://mct4sd.com/glimpse.php?section=2025-physical", publication: "https://mct4sd.com/publication.html" },
};

// Maps the `name` field used in conferenceData.ts to the acronym used as the sheet's row key.
const ACRONYM_ALIAS: Record<string, string> = {
  "ICT4SD": "ICT4SD",
  "WORLDS4": "WorldS4",
  "ISBM": "ISBM",
  "MCT4SD CAPETOWN": "MCT4SD Capetown",
  "MCT4SD PHILIPPINES": "MCT4SD Philippines",
  "ICTCS": "ICTCS",
  "SMARTCOM": "SmartCom",
  "ICICT": "ICICT",
  "TIBS": "TIBS",
  "ICTIS USA": "ICTIS USA",
  "BIOCOM": "BioCom",
  "ICTIS THAILAND": "ICTIS Thailand",
  "ICTIS LV": "ICTIS USA",
  "ICTIS AHMEDABAD": "ICTIS USA",
};

export function getEditionLinks(name: string, year: number): EditionLinks {
  const acronym = ACRONYM_ALIAS[name.toUpperCase()];
  if (!acronym) return {};
  return RAW[`${acronym}|${year}`] ?? {};
}
