import { initializeApp } from "firebase/app";
import { getDataConnect, connectDataConnectEmulator } from "firebase/data-connect";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { connectorConfig } from "@dataconnect/generated";

// Minimal config needed for the local emulator
// (Later, when deploying to production, replace this with your full config from the Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBNTwzZ4D4IF_H_RaMWZqPRbCs3eQ3VOJs",
  authDomain: "r-lost.firebaseapp.com",
  projectId: "r-lost",
  storageBucket: "r-lost.firebasestorage.app",
  messagingSenderId: "79845661674",
  appId: "1:79845661674:web:a990a74289c3896297f093",
  measurementId: "G-HZQCBCEYXS"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Initialize Data Connect with your generated connector config
export const dataConnect = getDataConnect(app, connectorConfig);

// Connect to the local SQL Connect emulator shown in your terminal (127.0.0.1:9399)
if (import.meta.env.DEV) {
  connectDataConnectEmulator(dataConnect, "127.0.0.1", 9399);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}