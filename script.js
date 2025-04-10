
import { google } from "googleapis";
import { getFirebaseService } from "./utils/firebase-service.js";
import { getSheetsService } from "./utils/sheets-service.js";

const firebaseService = await getFirebaseService();
const sheetsService = await getSheetsService();

