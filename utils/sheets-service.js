import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

function base64ToJson(base64String) {
  const jsonString = Buffer.from(base64String, "base64").toString("utf-8");
  return JSON.parse(jsonString);
}

async function getSheetsService() {
    const googleSheetsServiceAcc = base64ToJson(process.env.GOOGLE_SHEETS_CREDENTIALS_BASE64);

    const googleSheetsAuth = new google.auth.GoogleAuth({
    credentials: googleSheetsServiceAcc,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const googleSheetsClient = await googleSheetsAuth.getClient();
    const googleSheetsService = google.sheets({ version: "v4", auth: googleSheetsClient });
    return googleSheetsService;
}

export { getSheetsService };