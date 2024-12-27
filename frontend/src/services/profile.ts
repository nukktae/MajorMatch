import { auth } from '../config/firebase';
import type { Profile } from '../types/Profile';

export const profileService = {
  async getProfile() {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch(`http://localhost:5000/api/profile/${user.uid}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  async updateProfile(data: Partial<Profile>) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch('http://localhost:5000/api/profile/update', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },

  async updateAssessmentResults(results: Profile['assessmentResults']) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch('http://localhost:5000/api/profile/assessment', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ results })
    });

    if (!response.ok) throw new Error('Failed to update assessment results');
    return response.json();
  },

  async deleteAssessmentResults(dates: string[]) {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const token = await user.getIdToken();
    const response = await fetch('http://localhost:5000/api/profile/assessment-results', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dates })
    });

    if (!response.ok) throw new Error('Failed to delete assessment results');
    return response.json();
  }
}; 