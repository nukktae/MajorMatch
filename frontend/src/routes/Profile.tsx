import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, BeakerIcon, AcademicCapIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { EditProfileForm } from '../components/EditProfileForm';
import { AssessmentHistory } from '../components/AssessmentHistory';
import { StatCard } from '../components/StatCard';
import { PhotoUpload } from '../components/PhotoUpload';
import { useProfile } from '../hooks/useProfile';
import type { Profile as ProfileType } from '../types/Profile';

export function Profile() {
  const { profile, setProfile } = useProfile();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleResultSelection = (date: string) => {
    setSelectedResults(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  const handleDeleteSelected = async () => {
    if (!selectedResults.length) return;
    
    try {
      await profileService.deleteAssessmentResults(selectedResults);
      const updatedProfile = await profileService.getProfile();
      setProfile(updatedProfile);
      setSelectedResults([]);
    } catch (err) {
      console.error('Failed to delete results:', err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative px-4 py-12 bg-gradient-to-b from-violet-50/50">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-200/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-fuchsia-200/20 rounded-full blur-3xl" />
          
          <div className="relative flex items-start gap-8">
            <div className="flex-shrink-0">
              <PhotoUpload
                currentPhotoUrl={profile?.photo_url || null}
                onPhotoUpdate={(url) => setProfile(prev => ({ ...prev!, photo_url: url }))}
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {profile?.display_name || 'Anonymous'}
                  </h1>
                  <p className="text-slate-600">@{profile?.custom_user_id || 'user'}</p>
                </div>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-2 text-sm bg-violet-100 text-violet-700 rounded-xl 
                           hover:bg-violet-200 transition-colors flex items-center gap-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <StatCard label="Major" value={profile?.major || 'Not set'} />
                <StatCard label="Assessments" value={profile?.completed_assessments || 0} />
                <StatCard label="Interests" value={profile?.interests?.length || 0} />
              </div>

              {profile?.interests && profile.interests.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 text-sm rounded-full bg-violet-100 text-violet-700"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Assessment History</h2>
            {selectedResults.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-xl flex items-center gap-2
                          hover:bg-red-100 transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
                Delete Selected ({selectedResults.length})
              </button>
            )}
          </div>

          {profile?.assessment_results && profile.assessment_results.length > 0 ? (
            <AssessmentHistory
              assessmentResults={profile.assessment_results}
              onSelect={toggleResultSelection}
              selectedDates={selectedResults}
            />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BeakerIcon className="w-16 h-16 mx-auto text-violet-300 mb-4" />
              <h3 className="text-xl font-medium text-slate-700 mb-2">
                No Assessment History Yet
              </h3>
              <p className="text-slate-600 mb-6">
                Take your first assessment to discover majors that match your interests and skills
              </p>
              <button
                onClick={() => navigate('/assessments')}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500
                          text-white font-medium rounded-xl hover:opacity-90 transition-opacity
                          inline-flex items-center gap-2"
              >
                <AcademicCapIcon className="w-5 h-5" />
                Take Assessment
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isEditingProfile && (
          <EditProfileForm
            isOpen={isEditingProfile}
            onClose={() => setIsEditingProfile(false)}
            onSave={async (updatedData) => {
              try {
                const updatedProfile = await profileService.updateProfile(updatedData);
                setProfile(updatedProfile);
                setIsEditingProfile(false);
              } catch (err) {
                console.error('Failed to update profile:', err);
              }
            }}
            profile={profile!}
            isLoading={false}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 
