import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import type { Profile } from '../types/Profile';
import { profileService } from '../services/profile';
import { ExclamationCircleIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { auth } from '../config/firebase';
import { PhotoUpload } from './PhotoUpload';

// Expanded major suggestions with categories
const MAJOR_CATEGORIES = {
  'Computer & Technology': [
    'Computer Science',
    'Software Engineering',
    'Data Science',
    'Information Technology',
    'Cybersecurity',
  ],
  'Engineering': [
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
  ],
  'Business': [
    'Business Administration',
    'Finance',
    'Marketing',
    'Economics',
    'International Business',
  ],
  'Science': [
    'Biology',
    'Chemistry',
    'Physics',
    'Environmental Science',
    'Mathematics',
  ],
  'Healthcare': [
    'Nursing',
    'Pre-Medicine',
    'Public Health',
    'Psychology',
    'Pharmacy',
  ]
};

// Organized interest categories
const INTEREST_CATEGORIES = {
  'Technical': ['Programming', 'Data Analysis', 'AI/ML', 'Robotics', 'Cybersecurity'],
  'Creative': ['Design', 'Art', 'Music', 'Writing', 'Photography'],
  'Business': ['Entrepreneurship', 'Marketing', 'Finance', 'Management', 'Consulting'],
  'Scientific': ['Research', 'Lab Work', 'Experimentation', 'Theory', 'Discovery'],
  'Healthcare': ['Patient Care', 'Medical Research', 'Public Health', 'Mental Health', 'Nutrition'],
  'Social Impact': ['Education', 'Environment', 'Social Justice', 'Community Service', 'Policy'],
};

interface EditProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Profile>) => void;
  profile: Profile;
  isLoading?: boolean;
}

export function EditProfileForm({ isOpen, onClose, onSave, profile, isLoading }: EditProfileFormProps) {
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [username, setUsername] = useState(profile.custom_user_id || '');
  const [majorInput, setMajorInput] = useState(profile?.major || '');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile.interests || []);
  const [showMajorSuggestions, setShowMajorSuggestions] = useState(false);
  const [displayName, setDisplayName] = useState(profile.display_name || auth.currentUser?.displayName || '');

  // Add debounce function with proper typing
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Username validation function
  const validateUsername = async (value: string) => {
    if (!value) {
      setUsernameError('');
      return;
    }

    if (value === profile.custom_user_id) {
      setUsernameError('');
      return;
    }

    if (!/^[a-zA-Z0-9_]{1,30}$/.test(value)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return;
    }

    try {
      setIsCheckingUsername(true);
      const isAvailable = await profileService.checkUsernameAvailability(value);
      if (!isAvailable) {
        setUsernameError('This username is already taken');
      } else {
        setUsernameError('');
      }
    } catch (err) {
      console.error('Error checking username:', err);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  // Debounced username check
  const debouncedUsernameCheck = debounce(validateUsername, 500);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    debouncedUsernameCheck(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameError) return;
    
    const formData = new FormData(e.target as HTMLFormElement);
    onSave({
      display_name: displayName,
      nickname: formData.get('nickname') as string,
      major: majorInput,
      custom_user_id: formData.get('username') as string,
      interests: selectedInterests
    });
  };

  const handleMajorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMajorInput(value);
    setShowMajorSuggestions(value.length > 0);
  };

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <Dialog.Title className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Edit Profile
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              <div className="flex justify-center mb-8">
                <PhotoUpload
                  currentPhotoUrl={profile.photo_url}
                  onPhotoUpdate={(url) => {
                    onSave({ ...profile, photo_url: url });
                  }}
                  className="h-24 w-24 rounded-xl ring-2 ring-slate-100 shadow-sm object-cover"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Basic Info Section */}
                    <section className="space-y-4">
                      <h3 className="text-lg font-medium text-slate-800">Basic Information</h3>
                      <div className="space-y-6">
                        {/* Display Name Input */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Display Name
                          </label>
                          <input
                            type="text"
                            name="display_name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 
                                     focus:outline-none focus:ring-2 focus:ring-violet-500/20 
                                     focus:border-violet-500"
                            placeholder="Enter your display name"
                          />
                        </div>

                        {/* Username Input */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Username
                          </label>
                          <div className="relative">
                            <div className="flex rounded-xl overflow-hidden border border-slate-200">
                              <span className="inline-flex items-center px-4 bg-slate-50 text-slate-500 border-r border-slate-200">
                                @
                              </span>
                              <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className={`w-full px-4 py-3 outline-none transition-colors
                                  ${usernameError ? 'bg-red-50' : ''}
                                  ${!usernameError && username ? 'bg-green-50' : ''}`}
                              />
                            </div>
                            
                            {/* Username validation indicator */}
                            <div className="absolute inset-y-0 right-3 flex items-center">
                              {isCheckingUsername && (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
                              )}
                              {!isCheckingUsername && username && !usernameError && (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                              )}
                              {!isCheckingUsername && usernameError && (
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                            
                            {/* Error message */}
                            {usernameError && (
                              <p className="mt-1 text-sm text-red-500">{usernameError}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Major Selection */}
                    <section className="space-y-4">
                      <h3 className="text-lg font-medium text-slate-800">Major</h3>
                      <div className="relative mb-6">
                        <input
                          type="text"
                          value={majorInput}
                          onChange={handleMajorChange}
                          onFocus={() => setShowMajorSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowMajorSuggestions(false), 200)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                          placeholder="Search or select your major"
                        />
                        
                        {showMajorSuggestions && (
                          <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-slate-200 max-h-60 overflow-auto">
                            {Object.entries(MAJOR_CATEGORIES).map(([category, majors]) => (
                              <div key={category}>
                                <div className="px-4 py-2 bg-slate-50 text-sm font-medium text-slate-700">
                                  {category}
                                </div>
                                {majors
                                  .filter(major => 
                                    major.toLowerCase().includes(majorInput.toLowerCase())
                                  )
                                  .map((major) => (
                                    <button
                                      key={major}
                                      onClick={() => {
                                        setMajorInput(major);
                                        setShowMajorSuggestions(false);
                                      }}
                                      className="w-full px-4 py-2 text-left hover:bg-violet-50 focus:bg-violet-50 focus:outline-none"
                                    >
                                      {major}
                                    </button>
                                  ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>
                  </div>

                  {/* Right Column - Interests */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-slate-800">Areas of Interest</h3>
                    
                    {Object.entries(INTEREST_CATEGORIES).map(([category, interests]) => (
                      <div key={category} className="space-y-3">
                        <h4 className="text-sm font-medium text-slate-600">{category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {interests.map((interest) => (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => {
                                setSelectedInterests(prev =>
                                  prev.includes(interest)
                                    ? prev.filter(i => i !== interest)
                                    : [...prev, interest]
                                );
                              }}
                              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                                ${selectedInterests.includes(interest)
                                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 
                             hover:bg-slate-50 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 
                             text-white text-sm font-medium hover:opacity-90 transition-opacity
                             disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg shadow-violet-500/30"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
} 