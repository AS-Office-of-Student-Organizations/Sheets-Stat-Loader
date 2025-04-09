package main

import (
	"log"
	"os"

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

	readRange := "Master Sheet!A1:A2"
	resp, err := sheetsService.Spreadsheets.Values.Get(masterSheetId, readRange).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve data from sheet: %v", err)
	}

	// Print the fetched data
	log.Printf("Retrieved %d rows from the spreadsheet", len(resp.Values))
	for i, row := range resp.Values {
		log.Printf("Row %d: %v", i+1, row)
	}
}
