import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from '../types/User';
import { API_BASE_URL } from '../config/api';
import { profileService } from '../services/profile';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get profile which will create user if doesn't exist
          const profile = await profileService.getProfile();
          
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: profile.display_name || firebaseUser.displayName || firebaseUser.email?.split('@')[0],
            role: profile.role || 'student',
            photoURL: profile.photo_url || firebaseUser.photoURL,
            createdAt: new Date(profile.created_at)
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
} 