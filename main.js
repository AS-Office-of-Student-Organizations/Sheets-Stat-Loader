
import { google } from "googleapis";
import { getSheetsService, getFirebaseService } from "./utils/service-auth.js";
import { getEventsTable } from "./utils/sheets.js";

const firebaseService = await getFirebaseService();
const sheetsService = await getSheetsService();

getEventsTable(sheetsService)

