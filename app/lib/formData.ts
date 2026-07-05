// Shared dropdown/option data for the "Join Us" application forms
// (app/join/speaker, chair, advisory, reviewer, partner, conference).
// Centralized here so every form pulls from one source instead of
// redeclaring the same lists.

export const TITLES = ["Dr.", "Prof.", "Mr.", "Ms.", "Mx.", "Other"];

export const PRONOUNS = ["She/Her", "He/Him", "They/Them", "Prefer not to say", "Self-describe"];

/** Used by the speaker, chair and advisory forms. */
export const DEGREES = ["Undergraduate", "Master's", "Doctoral (Ph.D.)", "Postdoctoral", "Medical", "Other"];

/** The reviewer form uses a different degree list than the others. */
export const REVIEWER_DEGREES = ["Ph.D.", "M.Phil.", "M.S./M.Sc.", "M.Tech.", "MBA", "B.Tech.", "B.Sc.", "Other"];

export const EXPERIENCE_LEVELS = [
  "PhD complete", "Postdoctoral researcher", "Assistant Professor", "Lecturer",
  "Associate Professor", "Professor", "Full Professor", "Distinguished Professor",
  "Emeritus Professor", "Dean", "Other",
];

export const YEARS_OF_EXPERIENCE = ["Less than 5", "5–10", "10–20", "20–30", "30–40", "More than 40 years"];

export const SPEAKER_ROLES = ["Keynote Speaker", "Invited Speaker", "Panelist", "Industry Speaker"];

export const INSTITUTION_TYPES = [
  "University", "College", "Research Institute", "Corporate / Industry", "NGO / Non-Profit",
  "Government Body", "Media / Publication", "Startup", "Other",
];

export const PARTNERSHIP_TYPES = [
  "Technical Partnership",
  "Financial Partnership",
  "Publication Partnership",
  "Sponsorship Partnership",
  "EdTech Partnership",
  "Promotional / Media Partnership",
  "Startup Partnership",
  "Non-Government / Community Partnership",
  "Academic / Institutional Partnership",
  "Other",
];

export const CONFERENCE_PARTNERSHIP_OPTIONS = [
  "Conference Partnership",
  "Starting a New Conference",
  "Renewal of Existing Conference",
  "Publication Partnership",
  "Technical Partnership",
];

export const CONFERENCES = [
  "ICICT – International Conference on Information & Communication Technology",
  "ICCSE – International Conference on Computer Science & Engineering",
  "ICBME – International Conference on Biomedical Engineering",
  "ICEEE – International Conference on Electrical & Electronics Engineering",
  "ICME – International Conference on Mechanical Engineering",
  "ICCHE – International Conference on Chemical & Environmental Engineering",
  "ICCVE – International Conference on Civil & Environmental Engineering",
  "ICFMA – International Conference on Financial Management & Accounting",
  "ICHSS – International Conference on Humanities & Social Sciences",
  "ICEDU – International Conference on Education & e-Learning",
  "ICBM – International Conference on Business & Management",
  "ICAL – International Conference on Arts & Literature",
];

export const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Brazil","Brunei","Bulgaria","Cambodia","Cameroon","Canada",
  "Chile","China","Colombia","Croatia","Cuba","Cyprus","Czech Republic","Denmark",
  "Ecuador","Egypt","Estonia","Ethiopia","Finland","France","Georgia","Germany","Ghana",
  "Greece","Guatemala","Hungary","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Latvia","Lebanon",
  "Libya","Lithuania","Luxembourg","Malaysia","Maldives","Malta","Mexico","Moldova",
  "Mongolia","Morocco","Myanmar","Nepal","Netherlands","New Zealand","Nigeria","Norway",
  "Oman","Pakistan","Palestine","Panama","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Saudi Arabia","Serbia","Singapore","Slovakia","Slovenia",
  "South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Tunisia","Turkey","Turkmenistan",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay",
  "Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];
