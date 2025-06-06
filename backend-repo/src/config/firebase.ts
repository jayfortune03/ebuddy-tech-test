import admin, { ServiceAccount } from "firebase-admin";

import dotenv from "dotenv";
import path from "path";

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountPath) {
  throw new Error(
    "Service account key is missing in the environment variables"
  );
}

const serviceAccount = require(path.resolve(__dirname, serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as string | ServiceAccount),
});

const firestore = admin.firestore();
firestore.settings({
  host: "localhost:8080",
  ssl: false,
});

export default firestore;
