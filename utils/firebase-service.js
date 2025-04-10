import dotenv from "dotenv";
import admin from "firebase-admin";
dotenv.config();

function base64ToJson(base64String) {
    const jsonString = Buffer.from(base64String, "base64").toString("utf-8");
    return JSON.parse(jsonString);
}

async function getFirebaseService() {
    const firebaseServiceAcc = base64ToJson(process.env.FIREBASE_CREDENTIALS_BASE64);

    admin.initializeApp({
        credential: admin.credential.cert(firebaseServiceAcc),
    });

    return admin;
}

export { getFirebaseService };
