import { initializeApp } from "firebase/app";
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
} from "firebase/remote-config";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
  minimumFetchIntervalMillis: 0,
  fetchTimeoutMillis: 10000,
};

remoteConfig.defaultConfig = {};

export { remoteConfig, fetchAndActivate, getValue };
