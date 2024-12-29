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

if (!firebaseConfig.apiKey) {
  console.error('Firebase API key is missing');
  throw new Error('Firebase API key is missing');
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log('Firebase config:', firebaseConfig);
console.log('Firebase initialized');

export { auth };