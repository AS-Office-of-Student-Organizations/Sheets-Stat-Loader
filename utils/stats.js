import { Buffer } from "buffer";
import dotenv from "dotenv";
import { google } from "googleapis";
dotenv.config();

async function getEventsTable(googleSheetsService) {
    const masterSheetId = process.env.MASTER_SHEET_ID;
    const res = await googleSheetsService.spreadsheets.values.get({
        spreadsheetId: masterSheetId,
        range: "All Events Fall!A:C",
    })
    console.log(res.data.values[0])
}

