import { auth } from '../config/firebase';
import type { Profile } from '../types/Profile';

const API_PORT = import.meta.env.VITE_API_PORT || '3000';
const API_URL = `http://localhost:${API_PORT}/api/profile`;

export const profileService = {
  async getProfile() {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    try {
      const token = await user.getIdToken();
      const response = await fetch(API_URL, {
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
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  async updateProfile(data: Partial<Profile>) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        major: data.major || null,
        interests: Array.isArray(data.interests) ? data.interests : [],
        custom_user_id: data.custom_user_id || null,
        nickname: data.nickname || null
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
    const response = await fetch(`${API_URL}/assessment`, {
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
    const response = await fetch(`${API_URL}/assessment-results`, {
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
    const response = await fetch(`${API_URL}/check-custom-id?custom_user_id=${encodeURIComponent(customId)}`, {
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

    const token = await user.getIdToken();
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${API_URL}/photo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update profile photo');
    }
    return response.json();
  },

  async deleteUser() {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(`${API_URL}/delete-user`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to delete user');
    }

    // Delete Firebase user after successful backend deletion
    await user.delete();
  },

  async checkUsernameAvailability(username: string): Promise<boolean> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');

      const token = await user.getIdToken();
      const response = await fetch(`${API_URL}/check-custom-id?custom_user_id=${encodeURIComponent(username)}`, {
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
  }
}; 