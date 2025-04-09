package load_service

import (
	"context"
	"encoding/base64"
	"log"
	"os"

	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

func GetSheetsService() *sheets.Service {

	b64Creds := os.Getenv("GOOGLE_SHEETS_FETCH_CREDENTIALS_BASE64")

	credsJSON, err := base64.StdEncoding.DecodeString(b64Creds)
	if err != nil {
		log.Fatalf("Failed to decode base64 credentials: %v", err)
	}

	ctx := context.Background()
	creds, err := google.CredentialsFromJSON(ctx, credsJSON, sheets.SpreadsheetsScope)
	if err != nil {
		log.Fatalf("Failed to parse credentials: %v", err)
	}

	srv, err := sheets.NewService(ctx, option.WithCredentials(creds))
	if err != nil {
		log.Fatalf("Unable to retrieve Sheets client: %v", err)
	}
	return srv
}
