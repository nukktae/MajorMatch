import { auth } from '../config/firebase';

export async function getAuthToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }
  return user.getIdToken();
} 