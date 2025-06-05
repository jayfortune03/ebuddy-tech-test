import admin, { ServiceAccount } from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

import serviceAccount from "./nick-1881e-firebase-adminsdk-fbsvc-3b06eda798.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as string | ServiceAccount),
});

const firestore = admin.firestore();

export default firestore;
