import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { profileService } from '../services/profile';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { EditProfileForm } from '../components/EditProfileForm';
import type { Profile } from '../types/Profile';
import {
  ExclamationTriangleIcon as ExclamationCircleIcon,
  CameraIcon,
  PencilIcon,
  TrashIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon as ClipboardCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { API_BASE_URL } from '../config/api';
import { authService } from '../services/auth';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="text-center space-y-4">
        <div className="text-red-500 mb-4">
          <ExclamationCircleIcon className="h-12 w-12 mx-auto animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Error Occurred</h2>
        <p className="text-gray-600">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const userData = await profileService.getProfile();
        setProfile(userData);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-violet-200 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50"
      >
        <div className="text-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20">
          <div className="text-red-500 mb-4">
            <ExclamationCircleIcon className="h-12 w-12 mx-auto animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Error Occurred</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="animate-pulse">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
            <div className="h-3 w-36 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async (data: Partial<Profile>) => {
    if (!profile) return;
    
    try {
      setIsSaving(true);
      const updatedProfile = await profileService.updateProfile(data);
      
      if (updatedProfile) {
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (!profile?.assessment_results?.length || selectedResults.length === 0) return;
    
    try {
      setIsSaving(true);
      await profileService.deleteAssessmentResults(selectedResults);
      
      const updatedResults = profile.assessment_results.filter((result) => 
        !selectedResults.includes(result.date)
      );
      
      setProfile(prev => prev ? {
        ...prev,
        assessment_results: updatedResults,
        completed_assessments: (prev.completed_assessments || 0) - selectedResults.length
      } : null);
      
      setSelectedResults([]);
    } catch (err) {
      console.error('Failed to delete results:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleResultSelection = (date: string) => {
    setSelectedResults((prev: string[]) => 
      prev.includes(date) 
        ? prev.filter((d: string) => d !== date)
        : [...prev, date]
    );
  };

  const handleDeleteAccount = async () => {
    try {
      setIsSaving(true);
      await profileService.deleteUser();
      navigate('/auth');
    } catch (err) {
      console.error('Failed to delete account:', err);
      if (err instanceof Error && err.message.includes('log out and log in again')) {
        // Force logout and redirect to auth page
        await authService.signOut();
        navigate('/auth', { 
          state: { message: 'Please log in again to delete your account' }
        });
      } else {
        setError(err instanceof Error ? err.message : 'Failed to delete account');
      }
    } finally {
      setIsSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50/30 py-8 px-4"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden bg-violet-100">
                  {profile?.photo_url ? (
                    <img 
                      src={`${API_BASE_URL}${profile.photo_url}`}
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-violet-400">
                      <CameraIcon className="h-8 w-8" />
                    </div>
                  )}
                </div>
              </motion.div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h1 className="text-2xl font-semibold text-slate-800">
                      {profile?.display_name || profile?.nickname || auth.currentUser?.displayName || 'Anonymous'}
                    </h1>
                    <p className="text-sm text-slate-500">{profile?.email}</p>
                    <p className="text-xs text-violet-500 font-medium">@{profile?.custom_user_id || 'username'}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors shadow-sm text-sm"
                    >
                      <PencilIcon className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDeleteConfirm(true)}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-sm"
                    >
                      <TrashIcon className="h-3.5 w-3.5 mr-1.5" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {[
              {
                title: "Current Major",
                value: profile?.major || 'Not Set',
                icon: <AcademicCapIcon className="h-5 w-5 text-violet-500" />,
              },
              {
                title: "Assessments",
                value: `${profile?.completed_assessments || 0} Completed`,
                icon: <ClipboardCheckIcon className="h-5 w-5 text-emerald-500" />,
              },
              {
                title: "Interests",
                value: `${profile?.interests?.length || 0} Selected`,
                icon: <SparklesIcon className="h-5 w-5 text-blue-500" />,
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">{stat.title}</span>
                  {stat.icon}
                </div>
                <p className="text-base font-medium text-slate-800">{stat.value}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Your Interests</h2>
            <SparklesIcon className="h-5 w-5 text-violet-500" />
          </div>
          <div className="flex flex-wrap gap-2">
            {profile?.interests?.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 
                         text-violet-700 rounded-xl text-sm font-medium border border-violet-100"
              >
                {interest}
              </span>
            )) || (
              <p className="text-slate-500 text-sm">No interests selected yet</p>
            )}
          </div>
        </motion.div>

        {/* Assessment Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-100 shadow-sm mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Assessment History</h2>
            <div className="flex items-center gap-2">
              {selectedResults.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleDeleteSelected}
                  className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-sm font-medium 
                           hover:bg-red-100 transition-colors flex items-center gap-1"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete Selected
                </motion.button>
              )}
              <ClipboardCheckIcon className="h-5 w-5 text-emerald-500" />
            </div>
          </div>

          <div className="space-y-3">
            {profile?.assessment_results?.length ? (
              profile.assessment_results.map((result) => (
                <motion.div
                  key={result.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-xl border transition-colors ${
                    selectedResults.includes(result.date)
                      ? 'bg-violet-50 border-violet-200'
                      : 'bg-white border-slate-100 hover:border-violet-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedResults.includes(result.date)}
                        onChange={() => toggleResultSelection(result.date)}
                        className="w-4 h-4 text-violet-500 rounded border-slate-300 
                                 focus:ring-violet-500"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {new Date(result.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-slate-500">
                          Recommended Major: {result.majors[0]?.name || 'Not available'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/assessment-results', { 
                        state: { results: result } 
                      })}
                      className="text-violet-500 hover:text-violet-600 text-sm font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>No assessments completed yet</p>
                <button
                  onClick={() => navigate('/assessments')}
                  className="mt-2 text-violet-500 hover:text-violet-600 text-sm font-medium"
                >
                  Take Your First Assessment →
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <EditProfileForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveProfile}
        profile={profile}
        isLoading={isSaving}
      />
      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
        isLoading={isSaving}
      />
    </motion.div>
  );
}

export default function ProfileWithErrorBoundary() {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <Profile />
    </ReactErrorBoundary>
  );
} 