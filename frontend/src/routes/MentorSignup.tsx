import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../config/firebase';
import { API_BASE_URL } from '../config/api';
import { getAuthToken } from '../utils/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FiMail, FiLock, FiUser, FiAlertCircle, FiLoader, FiBriefcase, FiBook } from 'react-icons/fi';
import { IconType } from 'react-icons';

const Icon = ({ icon: IconComponent, className }: { icon: IconType; className?: string }) => {
  return <IconComponent size={className?.includes('w-5') ? 20 : 16} />;
};

export function MentorSignup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    field: '',
    experience: '',
    availability: '',
    specialties: [] as string[],
    about: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Get token for API request
      const token = await getAuthToken();

      // Create mentor profile in our backend
      const response = await fetch(`${API_BASE_URL}/api/users/mentor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userCredential.user.uid,
          name: formData.name,
          title: formData.title,
          field: formData.field,
          experience: formData.experience,
          availability: formData.availability,
          specialties: formData.specialties,
          about: formData.about,
          role: 'mentor'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create mentor profile');
      }

      // Update custom claims in Firebase
      const updateRoleResponse = await fetch(`${API_BASE_URL}/api/auth/set-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          role: 'mentor'
        })
      });

      if (!updateRoleResponse.ok) {
        throw new Error('Failed to set mentor role');
      }

      // Force token refresh to get new custom claims
      await userCredential.user.getIdToken(true);
      
      // Navigate to mentor dashboard
      navigate('/mentor/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <motion.h2 
              className="text-3xl font-bold gradient-text"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Become a Mentor
            </motion.h2>
            <p className="mt-2 text-gray-600">
              Share your expertise and guide others
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl bg-red-50 flex items-center gap-3"
              >
                <Icon icon={FiAlertCircle} className="w-5 h-5 text-red-500" />
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Icon icon={FiUser} />
                    Name
                  </div>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:ring-violet-500 focus:border-violet-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Icon icon={FiMail} />
                    Email
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:ring-violet-500 focus:border-violet-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Icon icon={FiLock} />
                    Password
                  </div>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:ring-violet-500 focus:border-violet-500"
                />
              </div>

              {/* Professional Info */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Icon icon={FiBriefcase} />
                    Professional Title
                  </div>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:ring-violet-500 focus:border-violet-500"
                />
              </div>

              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Icon icon={FiBook} />
                    Field of Expertise
                  </div>
                </label>
                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl
                         text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-500
                         hover:from-violet-700 hover:to-fuchsia-600 focus:outline-none focus:ring-2
                         focus:ring-offset-2 focus:ring-violet-500"
              >
                {loading ? (
                  <Icon icon={FiLoader} className="w-5 h-5 animate-spin" />
                ) : (
                  'Create Mentor Account'
                )}
              </button>

              <Link
                to="/auth"
                className="text-center text-sm text-violet-600 hover:text-violet-700"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
   