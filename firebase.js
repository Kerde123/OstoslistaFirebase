import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Constants from 'expo-constants';

const firebaseConfig = process.env.EXPO_FIREBASE_CONFIG || Constants.manifest.extra.firebaseConfig;

const app = initializeApp(firebaseConfig);
export default getDatabase(app);