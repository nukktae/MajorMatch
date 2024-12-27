import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "majormatch-85a9b.firebaseapp.com",
  projectId: "majormatch-85a9b",
  storageBucket: "majormatch-85a9b.appspot.com",
  messagingSenderId: "413672111810",
  appId: "1:413672111810:web:2fbf572265181e0196455b"
};

// Initialize Firebase only if config is valid
if (!firebaseConfig.apiKey) {
  throw new Error('Firebase API key is missing. Check your environment variables.');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);