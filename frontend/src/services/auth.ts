import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut as firebaseSignOut,
  User,
  AuthError,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../config/firebase';

const API_PORT = import.meta.env.VITE_API_PORT || '3000';

// Add persistence
setPersistence(auth, browserLocalPersistence);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const handleAuthError = (error: AuthError) => {
  console.error('Auth error:', error);
  
  switch (error.code) {
    case 'auth/invalid-api-key':
    case 'auth/invalid-credential':
      return 'Authentication service is misconfigured. Please try again later.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    default:
      return 'Authentication failed. Please try again.';
  }
};

async function createUserInDatabase(user: User) {
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
}

export const authService = {
  async signUpWithEmail(email: string, password: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await this.createUserInDatabase(user);
      return user;
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  },

  async signInWithEmail(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  },

  async signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserInDatabase(result.user);
    return result.user;
  },

  async signInWithFacebook() {
    const { user } = await signInWithPopup(auth, facebookProvider);
    await this.createUserInDatabase(user);
    return user;
  },

  async createUserInDatabase(user: User) {
    const response = await fetch(`http://localhost:${API_PORT}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.uid,
        email: user.email,
        name: user.displayName || user.email?.split('@')[0],
        photoURL: user.photoURL
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create user in database');
    }

    return response.json();
  },

  async signOut() {
    await firebaseSignOut(auth);
    localStorage.removeItem('user');
  },

  async signInWithEmailPassword(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createUserInDatabase(result.user);
    return result.user;
  }
}; 