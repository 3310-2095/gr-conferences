import { appendRow } from "../../lib/googleSheets";

type FieldDef = { key: string; label: string };

// One entry per form — `tabEnv` points at the .env.local var holding that form's
// Google Sheet tab name, and `fields` defines the exact column order for that tab.
const FORM_CONFIG: Record<string, { tabEnv: string; fields: FieldDef[] }> = {
  speaker: {
    tabEnv: "GOOGLE_SHEET_TAB_SPEAKER",
    fields: [
      { key: "title", label: "Title" },
      { key: "firstName", label: "First Name" },
      { key: "middleName", label: "Middle Name" },
      { key: "lastName", label: "Last Name" },
      { key: "pronouns", label: "Pronouns" },
      { key: "designation", label: "Designation" },
      { key: "country", label: "Country" },
      { key: "email", label: "Email" },
      { key: "institutionalEmail", label: "Institutional Email" },
      { key: "contactNumber", label: "Contact Number" },
      { key: "degree", label: "Degree" },
      { key: "affiliation", label: "Affiliation" },
      { key: "academicProfile", label: "Academic Profile URL" },
      { key: "yearsOfExperience", label: "Years of Experience" },
      { key: "publications", label: "Publications" },
      { key: "researchArea", label: "Research Area" },
      { key: "briefProfile", label: "Brief Profile" },
      { key: "conference", label: "Conference" },
      { key: "speakerRole", label: "Speaker Role" },
      { key: "cv", label: "CV Filename" },
      { key: "additionalFiles", label: "Additional Files Filename" },
    ],
  },
  chair: {
    tabEnv: "GOOGLE_SHEET_TAB_CHAIR",
    fields: [
      { key: "title", label: "Title" },
      { key: "firstName", label: "First Name" },
      { key: "middleName", label: "Middle Name" },
      { key: "lastName", label: "Last Name" },
      { key: "pronouns", label: "Pronouns" },
      { key: "designation", label: "Designation" },
      { key: "country", label: "Country" },
      { key: "email", label: "Email" },
      { key: "institutionalEmail", label: "Institutional Email" },
      { key: "contactNumber", label: "Contact Number" },
      { key: "degree", label: "Degree" },
      { key: "affiliation", label: "Affiliation" },
      { key: "yearsExperience", label: "Years Experience" },
      { key: "researchArea", label: "Research Area" },
      { key: "briefProfile", label: "Brief Profile" },
      { key: "hasChaired", label: "Has Chaired Before" },
      { key: "sessionsCount", label: "Sessions Chaired Count" },
      { key: "sessionsList", label: "Sessions List" },
      { key: "conference", label: "Conference" },
    ],
  },
  advisory: {
    tabEnv: "GOOGLE_SHEET_TAB_ADVISORY",
    fields: [
      { key: "title", label: "Title" },
      { key: "firstName", label: "First Name" },
      { key: "middleName", label: "Middle Name" },
      { key: "lastName", label: "Last Name" },
      { key: "pronouns", label: "Pronouns" },
      { key: "degree", label: "Degree" },
      { key: "currentExperience", label: "Current Experience" },
      { key: "yearsExperience", label: "Years Experience" },
      { key: "publications", label: "Publications" },
      { key: "briefProfile", label: "Brief Profile" },
      { key: "advisoryRoles", label: "Advisory Roles" },
      { key: "peerReview", label: "Peer Review Experience" },
      { key: "orcid", label: "ORCID" },
      { key: "googleScholar", label: "Google Scholar" },
      { key: "researcherId", label: "Researcher ID" },
      { key: "scopusId", label: "Scopus ID" },
      { key: "researchGate", label: "ResearchGate" },
      { key: "otherProfile", label: "Other Profile" },
      { key: "conference", label: "Conference" },
      { key: "researchArea", label: "Research Area" },
      { key: "affiliation", label: "Affiliation" },
      { key: "additionalAffiliation", label: "Additional Affiliation" },
      { key: "email", label: "Email" },
      { key: "institutionalEmail", label: "Institutional Email" },
      { key: "country", label: "Country" },
    ],
  },
  reviewer: {
    tabEnv: "GOOGLE_SHEET_TAB_REVIEWER",
    fields: [
      { key: "title", label: "Title" },
      { key: "firstName", label: "First Name" },
      { key: "middleName", label: "Middle Name" },
      { key: "lastName", label: "Last Name" },
      { key: "pronouns", label: "Pronouns" },
      { key: "designation", label: "Designation" },
      { key: "email", label: "Email" },
      { key: "institutionalEmail", label: "Institutional Email" },
      { key: "country", label: "Country" },
      { key: "degree", label: "Degree" },
      { key: "affiliation", label: "Affiliation" },
      { key: "additionalAffiliation", label: "Additional Affiliation" },
      { key: "orcid", label: "ORCID" },
      { key: "researcherId", label: "Researcher ID" },
      { key: "scopusId", label: "Scopus ID" },
      { key: "googleScholar", label: "Google Scholar" },
      { key: "researchGate", label: "ResearchGate" },
      { key: "academicExperience", label: "Academic Experience" },
      { key: "conference", label: "Conference" },
      { key: "domainArea", label: "Domain Area" },
      { key: "reviewingExperience", label: "Reviewing Experience" },
    ],
  },
  partner: {
    tabEnv: "GOOGLE_SHEET_TAB_PARTNER",
    fields: [
      { key: "institutionName", label: "Institution Name" },
      { key: "institutionType", label: "Institution Type" },
      { key: "country", label: "Country" },
      { key: "contactName", label: "Contact Name" },
      { key: "designation", label: "Designation" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "partnershipTypes", label: "Partnership Types" },
      { key: "otherPartnershipType", label: "Other Partnership Type" },
      { key: "partnershipIntent", label: "Partnership Intent" },
      { key: "collaborationArea", label: "Collaboration Area" },
      { key: "expectedOutcomes", label: "Expected Outcomes" },
      { key: "websiteUrl", label: "Website URL" },
      { key: "additionalNotes", label: "Additional Notes" },
    ],
  },
  conference: {
    tabEnv: "GOOGLE_SHEET_TAB_CONFERENCE",
    fields: [
      { key: "fullName", label: "Full Name" },
      { key: "designation", label: "Designation" },
      { key: "organization", label: "Organization" },
      { key: "email", label: "Email" },
      { key: "contactNumber", label: "Contact Number" },
      { key: "country", label: "Country" },
      { key: "partnerships", label: "Partnership Interests" },
      { key: "otherPartnership", label: "Other Partnership" },
      { key: "scheduleCall", label: "Schedule Call Requested" },
      { key: "contactPerson", label: "Preferred Contact Person" },
      { key: "contactPersonEmail", label: "Contact Person Email" },
    ],
  },
  newsletter: {
    tabEnv: "GOOGLE_SHEET_TAB_NEWSLETTER",
    fields: [{ key: "email", label: "Email" }],
  },
};

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined) return "";
  return String(value);
}

export async function POST(request: Request) {
  let body: { form?: string; data?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const config = body.form ? FORM_CONFIG[body.form] : undefined;
  if (!config) {
    return Response.json({ error: "Unknown form" }, { status: 400 });
  }

  const tabName = process.env[config.tabEnv];
  if (!tabName) {
    return Response.json({ error: `Missing env var ${config.tabEnv}` }, { status: 500 });
  }

  const headers = ["Submitted At", ...config.fields.map((f) => f.label)];
  const row = [
    new Date().toISOString(),
    ...config.fields.map((f) => formatValue(body.data?.[f.key])),
  ];

  try {
    await appendRow(tabName, headers, row);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("submit-form: failed to append row", err);
    return Response.json({ error: "Failed to save submission" }, { status: 502 });
  }
}
