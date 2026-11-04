import { initializeApp } from "firebase/app";
import { getAI, GoogleAIBackend } from "firebase/ai";
import { getAuth } from "firebase/auth";
import { getDataConnect, connectDataConnectEmulator } from "firebase/data-connect";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { connectorConfig } from "@dataconnect/generated";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

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
export const auth = getAuth(app);

// AppCheck / Recaptcha
if (import.meta.env.DEV) {
    (self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean }).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}
initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
});

// Initialize Data Connect with your generated connector config
export const dataConnect = getDataConnect(app, connectorConfig);

// Initialize the Gemini Developer API backend service.
export const ai = getAI(app, { backend: new GoogleAIBackend() });

// Connect to the local SQL Connect emulator shown in your terminal (127.0.0.1:9399)
if (import.meta.env.DEV) {
  connectDataConnectEmulator(dataConnect, "127.0.0.1", 9399);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}