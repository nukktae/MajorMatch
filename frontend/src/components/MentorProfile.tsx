import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { API_BASE_URL } from '../config/api';
import { getAuthToken } from '../utils/auth';
import { MentorProfile as MentorProfileType } from '../types/MentorProfile';

export function MentorProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<MentorProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/mentors/${user?.id}`, {
          headers: {
            'Authorization': `Bearer ${await getAuthToken()}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching mentor profile:', error);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm bg-violet-100 text-violet-700 rounded-xl"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile fields here */}
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        {profile.reviews.map(review => (
          <div key={review.studentId} className="border-b last:border-0 py-4">
            <div className="flex justify-between">
              <span className="font-medium">{review.studentName}</span>
              <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
            </div>
            <p className="text-slate-600 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 