import { google } from "googleapis";

// Server-only — reads the service account credentials from .env.local (or the
// hosting platform's env vars in production). Never import this from a "use client" file.
function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY env vars");
  }
  // .env.local stores the PEM key as a single line with literal \n escapes — restore real newlines.
  const key = rawKey.replace(/\\n/g, "\n");
  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

/** Appends one row to `tabName`, writing the header row first if the tab is currently empty. */
export async function appendRow(tabName: string, headers: string[], row: string[]) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID env var");

  const sheets = google.sheets({ version: "v4", auth: getAuth() });
  const quotedTab = `'${tabName}'`;

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${quotedTab}!A1:A1`,
  });

  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${quotedTab}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${quotedTab}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}
