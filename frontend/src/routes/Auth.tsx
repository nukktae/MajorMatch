import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FiMail, FiLock, FiUser, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

const Icon = ({ icon: IconComponent, className }: { icon: IconType; className?: string }) => {
  const iconSize = className?.includes('w-5') ? 20 : 16;
  return (
    <span className={className}>
      <IconComponent size={iconSize} />
    </span>
  );
};

interface FormData {
  name: string;
  email: string;
  password: string;
}

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await authService.signInWithEmail(formData.email, formData.password);
      } else {
        await authService.signUpWithEmail(formData.email, formData.password, formData.name);
      }
      navigate('/');
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
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </motion.h2>
            <p className="mt-2 text-gray-600">
              {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
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
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Icon icon={FiUser} />
                    Name
                  </div>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Icon icon={FiMail} />
                  Email
                </div>
              </label>
              <input
                id="email"
                name="email"
                type="email"
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
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                         focus:ring-violet-500 focus:border-violet-500"
              />
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
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-violet-600 hover:text-violet-700"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 