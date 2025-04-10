import dotenv from "dotenv";
import { google } from "googleapis";
import admin from "firebase-admin";

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

async function getFirebaseService() {
  const firebaseServiceAcc = base64ToJson(process.env.FIREBASE_CREDENTIALS_BASE64);

  admin.initializeApp({
      credential: admin.credential.cert(firebaseServiceAcc),
  });

  return admin;
}


export { getSheetsService, getFirebaseService };