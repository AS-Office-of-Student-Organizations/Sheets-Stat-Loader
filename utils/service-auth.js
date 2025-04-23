import dotenv from "dotenv";
import { google } from "googleapis";
import admin from "firebase-admin";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

dotenv.config();

const secretsClient = new SecretsManagerClient({
  region: process.env.AWS_REGION || "us-east-1",
});

async function getSecret(secretName) {
  try {
    const command = new GetSecretValueCommand({
      SecretId: secretName,
    });
    const response = await secretsClient.send(command);
    return response.SecretString;
  } catch (error) {
    console.log(`Error retrieving secret ${secretName}: ${error.message}`);
    return null;
  }
}

async function getCredentials(secretName, envVarName) {
  const secretValue = await getSecret(secretName);

  if (secretValue) {
    const secretsJson = JSON.parse(secretValue);
    if (secretsJson[envVarName]) {
      return base64ToJson(secretsJson[envVarName]);
    }
  }

  if (process.env[envVarName]) {
    return base64ToJson(process.env[envVarName]);
  }

  throw new Error(`Could not find credentials for ${envVarName} in AWS Secrets Manager or environment variables.`);
}

function base64ToJson(base64String) {
  const jsonString = Buffer.from(base64String, "base64").toString("utf-8");
  return JSON.parse(jsonString);
}

async function getSheetsService() {
  const googleSheetsServiceAcc = await getCredentials(
    "AS-Funding-ChatBot-And-Google-Sheets", 
    "GOOGLE_SHEETS_CREDENTIALS_BASE64"
  );

    const googleSheetsAuth = new google.auth.GoogleAuth({
    credentials: googleSheetsServiceAcc,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const googleSheetsClient = await googleSheetsAuth.getClient();
    const googleSheetsService = google.sheets({ version: "v4", auth: googleSheetsClient });
    return googleSheetsService;
}

async function getFirebaseService() {
  const firebaseServiceAcc = await getCredentials(
    "AS-Funding-ChatBot-And-Google-Sheets", 
    "FIREBASE_CREDENTIALS_BASE64"
  );

  admin.initializeApp({
      credential: admin.credential.cert(firebaseServiceAcc),
  });

  return admin;
}


export { getSheetsService, getFirebaseService };
