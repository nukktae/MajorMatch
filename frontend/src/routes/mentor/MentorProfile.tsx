import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../config/api';
import { getAuthToken } from '../../utils/auth';
import { FiStar, FiEdit2 } from 'react-icons/fi';
import { IconType } from 'react-icons';

const Icon = ({ icon: IconComponent }: { icon: IconType }) => {
  return <IconComponent size={24} />;
};

type MentorProfileType = {
  id: string;
  name: string;
  email: string;
  title: string;
  field: string;
  experience: string;
  availability: string;
  specialties: string[];
  about: string;
  reviews: {
    studentId: string;
    studentName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
};

export function MentorProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<MentorProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<MentorProfileType>>({});

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
          setEditedProfile(data);
        }
      } catch (error) {
        console.error('Error fetching mentor profile:', error);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mentors/${user?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify(editedProfile)
      });

      if (response.ok) {
        setProfile(prev => ({ ...prev, ...editedProfile } as MentorProfileType));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="px-4 py-2 text-sm bg-violet-100 text-violet-700 rounded-xl"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={e => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      value={editedProfile.title}
                      onChange={e => setEditedProfile(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={editedProfile.field}
                      onChange={e => setEditedProfile(prev => ({ ...prev, field: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Field"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-slate-600"><span className="font-medium">Name:</span> {profile.name}</p>
                    <p className="text-slate-600"><span className="font-medium">Title:</span> {profile.title}</p>
                    <p className="text-slate-600"><span className="font-medium">Field:</span> {profile.field}</p>
                  </>
                )}
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Experience & Availability</h2>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editedProfile.experience}
                      onChange={e => setEditedProfile(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Experience"
                    />
                    <input
                      type="text"
                      value={editedProfile.availability}
                      onChange={e => setEditedProfile(prev => ({ ...prev, availability: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Availability"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-slate-600"><span className="font-medium">Experience:</span> {profile.experience}</p>
                    <p className="text-slate-600"><span className="font-medium">Availability:</span> {profile.availability}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              {isEditing ? (
                <textarea
                  value={editedProfile.about}
                  onChange={e => setEditedProfile(prev => ({ ...prev, about: e.target.value }))}
                  className="w-full p-2 border rounded h-32"
                  placeholder="About me"
                />
              ) : (
                <p className="text-slate-600">{profile.about}</p>
              )}
            </div>

            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {profile.reviews.map(review => (
                  <div key={review.studentId} className="border-b last:border-0 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{review.studentName}</p>
                        <p className="text-sm text-slate-500">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-yellow-500">
                        <Icon icon={FiStar} />
                      </div>
                    </div>
                    <p className="text-slate-600 mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 