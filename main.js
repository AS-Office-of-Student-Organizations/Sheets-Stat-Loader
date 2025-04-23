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

// authenticate in
const firebaseService = await getFirebaseService();
const sheetsService = await getSheetsService();

// get our data tables
const eventsTable = await getEventsTable(sheetsService);
const attendanceTable = await getAttendanceTable(sheetsService);

// get the relevant stats with helpers
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

// log for sanity
console.log("Successfully loaded events and stats");

// set in firebase
await statsRef.set({
    numAttendees,
    numUniqueAttendees,
    numEvents,
    numOrgs,
    numAllocated,
    todaysEvents,
    attendanceLeaderboard,
});
