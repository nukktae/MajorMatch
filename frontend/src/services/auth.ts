import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  AuthError,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';

const API_PORT = import.meta.env.VITE_API_PORT || '3000';

async function createUserInDatabase(user: User) {
  try {
    const token = await user.getIdToken();
    const response = await fetch(`http://localhost:${API_PORT}/api/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.uid,
        email: user.email,
        name: user.displayName || user.email?.split('@')[0],
        photoURL: user.photoURL
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create user in database');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating user in database:', error);
    throw error;
  }
}

export const authService = {
  async signUpWithEmail(email: string, password: string, name: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    await createUserInDatabase(user);
    return user;
  },

  async signInWithEmail(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  },

  async signOut() {
    await firebaseSignOut(auth);
  }
}; 