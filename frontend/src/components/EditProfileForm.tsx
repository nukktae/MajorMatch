import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiCheck, FiSearch } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';

const RECOMMENDED_MAJORS = [
  { name: 'Computer Science', category: 'Technology' },
  { name: 'Data Science', category: 'Technology' },
  { name: 'Software Engineering', category: 'Technology' },
  { name: 'Business Administration', category: 'Business' },
  { name: 'Digital Marketing', category: 'Business' },
  { name: 'Graphic Design', category: 'Arts' },
  { name: 'Psychology', category: 'Social Sciences' },
  { name: 'Biology', category: 'Sciences' }
] as const;

type InterestCategoryType = 'Technology' | 'Business' | 'Arts' | 'Sciences' | 'Social';

const INTEREST_CATEGORIES: Record<InterestCategoryType, string[]> = {
  'Technology': ['AI/ML', 'Web Development', 'Mobile Apps', 'Cloud Computing', 'Cybersecurity'],
  'Business': ['Entrepreneurship', 'Marketing', 'Finance', 'Project Management'],
  'Arts': ['UI/UX Design', 'Digital Art', '3D Modeling', 'Animation'],
  'Sciences': ['Research', 'Data Analysis', 'Lab Work', 'Environmental Science'],
  'Social': ['Psychology', 'Education', 'Social Work', 'Communication']
};

interface Props {
  currentMajor: string | null;
  currentInterests: string[];
  currentCustomId?: string;
  currentNickname?: string;
  onSave: (major: string | null, interests: string[], customId?: string, nickname?: string) => Promise<void>;
  onCancel: () => void;
}

export function EditProfileForm({ 
  currentMajor, 
  currentInterests, 
  currentCustomId = '', 
  currentNickname = '', 
  onSave, 
  onCancel 
}: Props) {
  const [major, setMajor] = useState<string | null>(currentMajor);
  const [interests, setInterests] = useState<string[]>(currentInterests);
  const [customId, setCustomId] = useState(currentCustomId);
  const [nickname, setNickname] = useState(currentNickname);
  const [customIdError, setCustomIdError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<InterestCategoryType>('Technology');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const filteredMajors = RECOMMENDED_MAJORS.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async () => {
    if (!major && !interests.length && !customId && !nickname) {
      return;
    }

    try {
      await onSave(
        major,
        interests,
        customId || undefined,
        nickname || undefined
      );
    } catch (error) {
      console.error('Error saving profile:', error);
      setCustomIdError(error instanceof Error ? error.message : 'Failed to save profile');
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="space-y-8 bg-white/90 backdrop-blur-none rounded-xl p-8">
      {/* User ID and Nickname */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Custom User ID
            </label>
            <input
              type="text"
              value={customId}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
                setCustomId(value);
                setCustomIdError(null);
              }}
              placeholder="your_unique_id"
              maxLength={30}
              className="w-full px-4 py-2 rounded-xl border border-violet-200 
                       focus:border-violet-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-200"
            />
            {customIdError && (
              <p className="mt-1 text-sm text-red-600">{customIdError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Your display name"
              maxLength={50}
              className="w-full px-4 py-2 rounded-xl border border-violet-200 
                       focus:border-violet-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-200"
            />
          </div>
        </div>
      </div>

      {/* Major Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold gradient-text">Select Your Major</h3>
          <div className="relative flex-1 max-w-xs">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <FiSearch size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search majors..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-violet-200 
                       focus:border-violet-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredMajors.map((m) => (
            <motion.button
              key={m.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMajor(m.name)}
              className={`p-4 rounded-xl text-left transition-all flex items-center justify-between
                ${major === m.name
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg' 
                  : 'bg-white hover:bg-violet-50 text-slate-700 border border-slate-200'}`}
            >
              <div>
                <span className="font-medium">{m.name}</span>
                <p className="text-sm opacity-80">{m.category}</p>
              </div>
              {major === m.name && <FiCheck size={20} />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Interests Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold gradient-text">Select Your Interests</h3>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(Object.keys(INTEREST_CATEGORIES) as InterestCategoryType[]).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                ${activeCategory === category
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg' 
                  : 'bg-white hover:bg-violet-50 text-slate-700 border border-slate-200'}`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <AnimatePresence>
            {INTEREST_CATEGORIES[activeCategory].map((interest) => (
              <motion.button
                key={interest}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleInterest(interest)}
                className={`p-4 rounded-xl text-left transition-all
                  ${interests.includes(interest)
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg' 
                    : 'bg-white hover:bg-violet-50 text-slate-700 border border-slate-200'}`}
              >
                <span className="font-medium">{interest}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          disabled={isSaving}
          className="px-6 py-2 rounded-xl text-slate-600 hover:bg-slate-100 
                   disabled:opacity-50 transition-colors"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 
                   text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </div>
  );
} 