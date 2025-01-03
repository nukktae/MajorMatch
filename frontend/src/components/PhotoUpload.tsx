import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCamera, FiUpload } from 'react-icons/fi';
import { profileService } from '../services/profile';
import { API_BASE_URL } from '../config/api';

interface Props {
  currentPhotoUrl: string | null;
  onPhotoUpdate: (url: string) => void;
  className?: string;
}

export function PhotoUpload({ currentPhotoUrl, onPhotoUpdate, className }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);
      const result = await profileService.updateProfilePhoto(file);
      onPhotoUpdate(result.photo_url);
    } catch (err) {
      console.error('Failed to upload photo:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };

  const getPhotoUrl = (url: string) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  };

  return (
    <div className="relative group">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-violet-100">
        {currentPhotoUrl ? (
          <img 
            src={getPhotoUrl(currentPhotoUrl)}
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-violet-400">
            <FiCamera size={32} />
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 right-0 p-2 rounded-full bg-violet-600 
                   text-white shadow-lg opacity-0 group-hover:opacity-100 
                   transition-opacity"
        disabled={isUploading}
      >
        <FiUpload size={20} />
      </motion.button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 