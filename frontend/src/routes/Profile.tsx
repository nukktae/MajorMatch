import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profileService } from '../services/profile';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  major: string;
  interests: string[];
  completedAssessments: number;
  earnedBadges: number;
  assessmentResults?: {
    date: string;
    majors: {
      name: string;
      description: string;
      skills: string[];
    }[];
  }[];
}

export function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setIsLoading(true);
        const userData = await profileService.getProfile();
        setProfile(userData);
      } catch (err) {
        console.error('Failed to load profile:', err);
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-violet-200" />
          <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const handleSaveProfile = async () => {
    if (!profile) return;

    try {
      setIsSaving(true);
      const updatedProfile = await profileService.updateProfile({
        major: profile.major,
        interests: profile.interests
      });
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (!profile?.assessmentResults) return;
    
    try {
      setIsSaving(true);
      await profileService.deleteAssessmentResults(selectedResults);
      
      const updatedResults = profile.assessmentResults.filter((result) => 
        !selectedResults.includes(result.date)
      );
      
      setProfile(prev => prev ? {
        ...prev,
        assessmentResults: updatedResults,
        completedAssessments: prev.completedAssessments - selectedResults.length
      } : null);
      
      setSelectedResults([]);
    } catch (err) {
      console.error('Failed to delete results:', err);
      // You could add a toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  const toggleResultSelection = (date: string) => {
    setSelectedResults(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Profile Header */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 
                           flex items-center justify-center text-white text-3xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">{profile.name}</h1>
                <p className="text-slate-600">{profile.email}</p>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              disabled={isSaving}
              className="px-4 py-2 text-violet-600 hover:text-violet-700 
                      font-medium rounded-xl border border-violet-200 
                      hover:border-violet-300 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {/* Progress Overview - Only show when not editing */}
          {!isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-violet-50 rounded-xl">
                <h3 className="font-medium text-violet-800 mb-1">Current Major</h3>
                <p className="text-slate-700">{profile.major}</p>
              </div>
              <div className="p-4 bg-fuchsia-50 rounded-xl">
                <h3 className="font-medium text-fuchsia-800 mb-1">Assessments</h3>
                <p className="text-slate-700">{profile.completedAssessments} Completed</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <h3 className="font-medium text-purple-800 mb-1">Badges</h3>
                <p className="text-slate-700">{profile.earnedBadges} Earned</p>
              </div>
            </div>
          )}
        </div>

        {/* Edit Form - Only show when editing */}
        {isEditing ? (
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold mb-6 gradient-text">Edit Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Major
                </label>
                <input
                  type="text"
                  value={profile.major}
                  onChange={(e) => setProfile(prev => prev ? {...prev, major: e.target.value} : null)}
                  className="w-full px-4 py-2 rounded-xl border border-violet-200 focus:border-violet-400 
                           focus:outline-none focus:ring-2 focus:ring-violet-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {profile.interests?.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-violet-100 text-violet-700 
                               rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Interests Section */}
            <div className="glass-card p-8">
              <h2 className="text-xl font-semibold mb-4 gradient-text">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-violet-100 text-violet-700 
                             rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-8">
              <h2 className="text-xl font-semibold mb-4 gradient-text">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 
                               flex items-center justify-center">
                    📊
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">Completed Career Assessment</h3>
                    <p className="text-sm text-slate-600">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Assessment Results - Only show when not editing */}
            {profile.assessmentResults && profile.assessmentResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold gradient-text">Past Assessment Results</h2>
                  {selectedResults.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      disabled={isSaving}
                      className="px-4 py-2 text-red-600 hover:text-red-700 
                               font-medium rounded-xl border border-red-200 
                               hover:border-red-300 transition-colors
                               disabled:opacity-50"
                    >
                      {isSaving ? 'Deleting...' : `Delete Selected (${selectedResults.length})`}
                    </button>
                  )}
                </div>
                <div className="space-y-6">
                  {profile.assessmentResults.map((result, index) => (
                    <div 
                      key={index} 
                      className={`border-b border-slate-200 last:border-0 pb-6 last:pb-0
                                 ${selectedResults.includes(result.date) ? 'bg-violet-50/50' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedResults.includes(result.date)}
                            onChange={() => toggleResultSelection(result.date)}
                            className="w-4 h-4 rounded border-violet-300 text-violet-600 
                                     focus:ring-violet-200"
                          />
                          <h3 className="font-medium text-slate-800">
                            Career Assessment #{profile.assessmentResults!.length - index}
                          </h3>
                        </div>
                        <span className="text-sm text-slate-600">
                          {new Date(result.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="space-y-4">
                        {result.majors.map((major, idx) => (
                          <div key={idx} className="bg-white/50 rounded-xl p-4">
                            <h4 className="font-medium text-violet-700 mb-2">{major.name}</h4>
                            <p className="text-sm text-slate-600 mb-3">{major.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {major.skills.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
} 