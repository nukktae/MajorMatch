import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load environment variables
dotenv.config({ path: join(__dirname, '../../.env') });
const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};
// Validate required environment variables
if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
    throw new Error('Missing required Firebase configuration. Check your .env file.');
}
try {
    // Initialize Firebase Admin
    initializeApp({
        credential: cert(serviceAccount)
    });
    console.log('Firebase Admin initialized successfully');
}
catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
}
export const auth = getAuth();
