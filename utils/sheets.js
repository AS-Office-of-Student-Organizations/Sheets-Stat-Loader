import { Buffer } from "buffer";
import dotenv from "dotenv";
import { google } from "googleapis";
dotenv.config();

const MASTER_SHEET_ID = "1qS_G69hPhD53jJol67pyvbn1EpAKplAOP-IcTBVmrWk"
const ATTENDANCE_SHEET_ID = "14T6TJV8dOUn4G7_Lhkz6PuBgvwk1NuTpdJH9SnyjsFw"

async function getEventsTable(googleSheetsService) {
    const masterSheetId = MASTER_SHEET_ID;
    const fallTable = await googleSheetsService.spreadsheets.values.get({
        spreadsheetId: masterSheetId,
        range: "All Events Fall!A:F",
    })
    const winterTable = await googleSheetsService.spreadsheets.values.get({
        spreadsheetId: masterSheetId,
        range: "All Events Winter!A:F",
    })
    const springTable = await googleSheetsService.spreadsheets.values.get({
        spreadsheetId: masterSheetId,
        range: "All Events Spring!A:F",
    })

    const fallValues = fallTable.data.values || [];
    const winterValues = winterTable.data.values || [];
    const springValues = springTable.data.values || [];

    const headerRow = fallValues.length > 0 ? fallValues[0] : [];

    const combinedTable = [
        ...fallValues,
        ...(winterValues.length > 0 ? winterValues.slice(1) : []),
        ...(springValues.length > 0 ? springValues.slice(1) : [])
    ];
    
    return combinedTable;
}

async function getAttendanceTable(googleSheetsService) {
    const attendanceSheetId = ATTENDANCE_SHEET_ID;
    const attendanceTable = await googleSheetsService.spreadsheets.values.get({
        spreadsheetId: attendanceSheetId,
        range: "Form Responses 1!A:F",
    });

    return attendanceTable.data.values || [];
}

export { getEventsTable, getAttendanceTable };