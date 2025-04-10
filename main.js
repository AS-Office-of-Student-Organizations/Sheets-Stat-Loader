
import { google } from "googleapis";
import { getSheetsService, getFirebaseService } from "./utils/service-auth.js";
import { getEventsTable, getAttendanceTable } from "./utils/sheets.js";
import {
    countUniqueEmails,
    countEmails,
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

const numAttendees = countEmails(attendanceTable);
const numUniqueAttendees = countUniqueEmails(attendanceTable);
const numEvents = countUniqueEvents(eventsTable);
const numOrgs = countUniqueOrgs(eventsTable);
const numAllocated = countTotalAllocated(eventsTable);
const todaysEvents = getTodaysEvents(eventsTable);
const attendanceLeaderboard = getAttendanceLeaderboard(attendanceTable);

// put in firebase public/stats-2024-2025 document
const db = firebaseService.firestore();
const statsRef = db.collection("public").doc("stats-2024-2025");

console.log(countUniqueEmails(attendanceTable))
console.log(countUniqueEvents(eventsTable))
console.log(countUniqueOrgs(eventsTable))
console.log(countTotalAllocated(eventsTable))
console.log(getTodaysEvents(eventsTable))
console.log(getAttendanceLeaderboard(attendanceTable))

await statsRef.set({
    numAttendees,
    numUniqueAttendees,
    numEvents,
    numOrgs,
    numAllocated,
    todaysEvents,
    attendanceLeaderboard,
});
// TODO: Put in firebase!!! Then this script just needs to be timed and run!

const test = '$200.00'
console.log(parseFloat(test.replace(/[$,]/g, '')))