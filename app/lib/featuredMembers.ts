// Real featured members — session chairs sourced from sessionchairdata/data.xlsx.
// Photos live in public/Featured Members/, matched one-to-one by person.
export type FeaturedMember = {
  name: string;
  tag: string;
  institution: string;
  country: string;
  img: string;
};

export const featuredMembers: FeaturedMember[] = [
  {
    name: "Faisal Quader",
    tag: "Professor",
    institution: "University of Maryland",
    country: "United States",
    img: "/Featured Members/66-Faisal-Quader.jpg",
  },
  {
    name: " Ioseb Gabelaia",
    tag: "Associate Professor",
    institution: "Kauno Kolegija Higher Education Institution",
    country: "Lithuania",
    img: "/Featured Members/Ioseb-Gabelaia.jpg",
  },
  {
    name: " Randy Joy M. Ventayen",
    tag: "Director",
    institution: "Pangasinan State University",
    country: "Philippines",
    img: "/Featured Members/Dr. Randy Joy Ventayen.jpg",
  },
  {
    name: "Sachin R. Jain",
    tag: "Assistant Professor",
    institution: "Oklahoma State University",
    country: "United States",
    img: "/Featured Members/Dr. Sachin R. Jain.jpg",
  },
  {
    name: "Prinn Sukriket",
    tag: "Professor",
    institution: "Finn School of Business and Tourism",
    country: "Bangkok, Thailand",
    img: "/Featured Members/Dr. Prinn Sukriket.webp",
  },







  {
    name: "Kanakarn Phanniphong",
    tag: "Associate Professor",
    institution: "Rajamangala University of Technology Tawan-ok",
    country: "Thailand",
    img: "/Featured Members/kanakarn_phanniphong.png",
  },
  {
    name: "Malinka Ivanova",
    tag: "Associate Professor",
    institution: "Technical University of Sofia",
    country: "Bulgaria",
    img: "/Featured Members/Malinka Ivanova.jpg",
  },
  {
    name: "Kunihiko Takamatsu",
    tag: "Professor",
    institution: "Institute of Science Tokyo",
    country: "Japan",
    img: "/Featured Members/Kunihiko Takamatsu.jpg",
  },


];
