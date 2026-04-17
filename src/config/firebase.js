import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase configuration
// You can use environment variables or hardcode your Firebase credentials here
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB4fHYWAw4HSwffd6FZWfaw8nckl82QsnE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "connecta24-b27c0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "connecta24-b27c0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "connecta24-b27c0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102179698552",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102179698552:web:ceb7f9933716efbf153a8d",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-6FLQRBY51Y"
};

// Check if Firebase is properly configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey && 
         firebaseConfig.projectId && 
         !firebaseConfig.apiKey.includes('your_') &&
         !firebaseConfig.projectId.includes('your_');
};

let app = null;
let db = null;
let storage = null;
let auth = null;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  console.warn('⚠️ Chat features will not work until Firebase is properly configured');
}

export { db, storage, auth };
export default app;
