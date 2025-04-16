# Google Sheets Stat Loader

To run:


You first need to have the npm package, and run: `npm install`

Ensure you have the .env file, then run `node main.js`

This script is intended to be deployed on AWS as a cron job and run after midnight on each day, populating the database that the website will use for its statistics.

Here's the google sheets setup instructions:
You need a master sheet and attendance sheet.
Within the master sheet, you NEED three sheets to be created: 
- All Events Fall
- All Events Winter
- All Events Spring
Within the attendance sheet, you need to have the sheet:
- Form Responses 1

Then for your `.env` file, you need to have:
- GOOGLE_SHEETS_CREDENTIALS_BASE64
- FIREBASE_CREDENTIALS_BASE64
- ATTENDANCE_SHEET_ID
- MASTER_SHEET_ID
for google sheets API to connect and run on your sheets. Make sure you have fully configured google sheets serviceworker to have view access to those two sheets.

Within each the attendance sheet, the layout should be:
Row 1: Headers
Column A: Timestamp
Column B: Email
Column C: Organization - Event

Within each of the "All Events" sheets, the layout should be:
Row 1: Headers
Column A: Fin-ID#
Column B: Organization Name
Column C: Name of Event
Column D: Event Date

Don't have any clutter in those sheets, it might mess things up.


