
import { google } from "googleapis";
import { getSheetsService, getFirebaseService } from "./utils/service-auth.js";
import { getEventsTable, getAttendanceTable } from "./utils/sheets.js";
import {
    countUniqueEmails,
    countUniqueEvents,
    countUniqueOrgs,
    countTotalAllocated,
    getTodaysEvents,
    getAttendanceLeaderboard,
} from "./utils/stats.js";

const firebaseService = await getFirebaseService();
const sheetsService = await getSheetsService();

const eventsTable = await getEventsTable(sheetsService);
const attendanceTable = await getAttendanceTable(sheetsService);

console.log(countUniqueEmails(attendanceTable))
console.log(countUniqueEvents(eventsTable))
console.log(countUniqueOrgs(eventsTable))
console.log(countTotalAllocated(eventsTable))
console.log(getTodaysEvents(eventsTable))
console.log(getAttendanceLeaderboard(attendanceTable))

const test = '$200.00'
console.log(parseFloat(test.replace(/[$,]/g, '')))