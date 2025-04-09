package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	load_service "github.com/kabir-vats/Sheets-API/pkg"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func main() {
	sheetsService := load_service.GetSheetsService()
	masterSheetId := os.Getenv("MASTER_SHEET_ID")

	readRange := "Master Sheet!A:A"
	resp, err := sheetsService.Spreadsheets.Values.Get(masterSheetId, readRange).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve data from sheet: %v", err)
	}

	// Print the fetched data
	log.Printf("Retrieved %d rows from the spreadsheet", len(resp.Values))
	for i, row := range resp.Values {
		log.Printf("Row %d: %v", i+1, row)
	}

	attendanceSheetId := os.Getenv("ATTENDANCE_SHEET_ID")
	readRange = "Form Responses 1!B:C"
	resp, err = sheetsService.Spreadsheets.Values.Get(attendanceSheetId, readRange).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve data from sheet: %v", err)
	}

	emails := make(map[string]int)
	events := make(map[string]int)
	orgs := make(map[string]int)
	for _, row := range resp.Values {
		if len(row) > 0 {
			email := fmt.Sprintf("%v", row[0])
			emails[email]++
			event := fmt.Sprintf("%v", row[1])
			events[event]++
			if parts := strings.Split(event, " - "); len(parts) > 1 {
				org := parts[0]
				orgs[org]++
			} else {
				log.Printf("Skipping event: %s", event)
			}
		}
	}

	log.Printf("Found %d unique emails:", len(emails))
	log.Printf("Found %d unique events:", len(events))
	log.Printf("Found %d unique organizations:", len(orgs))

}
