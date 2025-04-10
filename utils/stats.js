import { Buffer } from "buffer";
import dotenv from "dotenv";
import { google } from "googleapis";
dotenv.config();

function countUniqueEmails(attendanceData) {
    const uniqueEmails = new Set();
    attendanceData.forEach((row) => {
        if (row[1]) {
            uniqueEmails.add(row[1]);
        }
    });
    return uniqueEmails.size;
}

/*function getAttendanceLeaderboard(eventData, attendanceData) {

}*/

function countUniqueEvents(eventData) {
    const uniqueEvents = new Set();
    eventData.forEach((row) => {
        if (row[0]) {
            uniqueEvents.add(row[0]);
        }
    });
    return uniqueEvents.size;
}

function countUniqueOrgs(eventData) {
    const uniqueOrgs = new Set();
    eventData.forEach((row) => {
        if (row[1]) {
            uniqueOrgs.add(row[1]);
        }
    });
    return uniqueOrgs.size;
}

function countTotalAllocated(eventData) {
    let totalAllocated = 0;
    eventData.forEach((row) => {
        if (row[5]) {
            const value = parseFloat(row[5].replace(/[$,]/g, ''));
            if (!isNaN(value)) {
                totalAllocated += value;
            }
        }
    });
    return totalAllocated;
}

function getTodaysEvents(eventData) {
    const today = new Date();
    const todaysEvents = eventData.filter((row) => {
        const eventDate = new Date(row[3]);
        return eventDate.toDateString() === today.toDateString();
    });
    return todaysEvents;
}

export {
    countUniqueEmails,
    countUniqueEvents,
    countUniqueOrgs,
    countTotalAllocated,
    getTodaysEvents,
    // getAttendanceLeaderboard,
}