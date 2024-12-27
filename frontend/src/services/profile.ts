import { auth } from '../config/firebase';
import type { Profile } from '../types/Profile';

const API_PORT = import.meta.env.VITE_API_PORT || '3000';
const API_URL = `http://localhost:${API_PORT}/api/profile`;

export const profileService = {
  async getProfile() {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(API_URL, {
      method: 'GET',
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
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        major: data.major,
        interests: data.interests || [],
        custom_user_id: data.custom_user_id,
        nickname: data.nickname
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to update profile');
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
  }
}; 