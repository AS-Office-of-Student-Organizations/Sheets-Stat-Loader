import { Buffer } from "buffer";
import dotenv from "dotenv";
import { google } from "googleapis";
dotenv.config();

const TOP_K_EVENTS = 5; // Number of top events to return

function countUniqueEmails(attendanceData) {
    const uniqueEmails = new Set();
    attendanceData.forEach((row) => {
        if (row[1]) {
            uniqueEmails.add(row[1]);
        }
    });
    return uniqueEmails.size;
}

function countEmails(attendanceData) {
    return attendanceData.length;
}

function getAttendanceLeaderboard(attendanceData) {
    const eventAttendanceMap = new Map();
    attendanceData.forEach((row) => {
        const eventName = row[2];
        const email = row[1];
        if (eventName && email) {
            if (!eventAttendanceMap.has(eventName)) {
                eventAttendanceMap.set(eventName, new Set());
            }
            eventAttendanceMap.get(eventName).add(email);
        }
    });

    const leaderboard = Array.from(eventAttendanceMap.entries()).map(([event, attendees]) => {
        return { event, attendance: attendees.size };
    });

    leaderboard.sort((a, b) => b.attendance - a.attendance);

    const top_events = leaderboard.slice(0, TOP_K_EVENTS)
    top_events.forEach((event) => {
        const parts = event.event.split(" - ");
        event.event = parts[parts.length-1];
        event.org = parts.slice(0, -1).join(" - ");
    });
    return top_events; 
}

function countUniqueEvents(eventData) {
    const uniqueEvents = new Set();
    eventData.forEach((row) => {
        if (row[0] && row[3] && !isNaN(new Date(row[3]).getTime()) && new Date(row[3]) <= new Date()) {
            uniqueEvents.add(row[0]);
        }
    });
    return uniqueEvents.size;
}

function countUniqueOrgs(eventData) {
    const uniqueOrgs = new Set();
    eventData.forEach((row) => {
        if (row[1] && row[3] && !isNaN(new Date(row[3]).getTime()) && new Date(row[3]) <= new Date()) {
            uniqueOrgs.add(row[1]);
        }
    });
    return uniqueOrgs.size;
}

function countTotalAllocated(eventData) {
    let totalAllocated = 0;
    eventData.forEach((row) => {
        if (row[5] && row[3] && !isNaN(new Date(row[3]).getTime()) && new Date(row[3]) <= new Date()) {
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
    const todaysEventRows = eventData.filter((row) => {
        const eventDate = new Date(row[3]);
        return eventDate.toDateString() === today.toDateString();
    });
    const todaysEvents = todaysEventRows.map((row) => {
        const event = row[2];
        const org = row[1];
        const date = new Date(row[3]);
        const venue = row[4];
        return { event, org, date, venue };
    });
    return todaysEvents;
}

export {
    countUniqueEmails,
    countEmails,
    countUniqueEvents,
    countUniqueOrgs,
    countTotalAllocated,
    getTodaysEvents,
    getAttendanceLeaderboard,
}