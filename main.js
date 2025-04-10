
import { google } from "googleapis";
import { getSheetsService, getFirebaseService } from "./utils/service-auth.js";
import { getEventsTable, getAttendanceTable } from "./utils/sheets.js";

const firebaseService = await getFirebaseService();
const sheetsService = await getSheetsService();

console.log((await getEventsTable(sheetsService)).length)
console.log((await getAttendanceTable(sheetsService)).length)
