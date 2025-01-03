import { auth } from '../config/firebase';
import type { Profile } from '../types/Profile';
import type { AssessmentResult } from '../types/assessment';
import { 
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { API_BASE_URL } from '../config/api';

export const profileService = {
  async getProfile() {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to fetch profile');
    }
    return response.json();
  },

  async updateProfile(data: Partial<Profile>) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/profile/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        major: data.major || null,
        interests: Array.isArray(data.interests) ? data.interests : [],
        custom_user_id: data.custom_user_id || null,
        display_name: data.display_name || null
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update profile');
    }
    return response.json();
  },

  async updateAssessment(results: Profile['assessment_results']) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/profile/assessment`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ results })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to update assessment');
    }
    return response.json();
  },

  async deleteAssessmentResults(dates: string[]) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/profile/assessment-results`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dates })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to delete assessment results');
    }

    return response.json();
  },

  async checkCustomId(customId: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/profile/check-custom-id?custom_user_id=${encodeURIComponent(customId)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to check custom ID availability');
    }
    return response.json();
  },

  async updateProfilePhoto(file: File) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const formData = new FormData();
    formData.append('photo', file);

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/profile/photo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to upload photo');
    }

    const result = await response.json();
    return result;
  },

  async deleteUser() {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API_BASE_URL}/api/profile/delete-user`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user from database');
      }

      try {
        await user.delete();
      } catch (error: any) {
        if (error.code === 'auth/requires-recent-login') {
          // For Google-authenticated users
          if (user.providerData[0]?.providerId === 'google.com') {
            const provider = new GoogleAuthProvider();
            await reauthenticateWithPopup(user, provider);
          } else {
            throw new Error('Please log out and log in again to delete your account');
          }
          // Try deleting again after re-authentication
          await user.delete();
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  async checkUsernameAvailability(username: string): Promise<boolean> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');

      const token = await user.getIdToken();
      const response = await fetch(`${API_BASE_URL}/api/profile/check-custom-id?custom_user_id=${encodeURIComponent(username)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to check username');
      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error('Error checking username:', error);
      throw error;
    }
  },

  async updateAssessmentResults(results: AssessmentResult[]) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/profile/assessment-results`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ results })
    });

    if (!response.ok) {
      throw new Error('Failed to update assessment results');
    }

    return response.json();
  }
}; 