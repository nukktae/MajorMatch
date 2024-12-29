import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FiMail, FiLock, FiUser, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { IconType } from 'react-icons';

// Icon wrapper component
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
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && localStorage.getItem('user')) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      
      if (isLogin) {
        await authService.signInWithEmail(formData.email, formData.password);
      } else {
        await authService.signUpWithEmail(formData.email, formData.password, formData.name);
      }
      
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      const user = provider === 'google'
        ? await authService.signInWithGoogle()
        : await authService.signInWithFacebook();
        
      localStorage.setItem('user', JSON.stringify({
        id: user.uid,
        email: user.email,
        name: user.displayName
      }));
      
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 
                    bg-gradient-to-br from-violet-50 to-fuchsia-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full 
                      bg-gradient-to-br from-violet-200 to-violet-300 opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
                      bg-gradient-to-br from-fuchsia-200 to-fuchsia-300 opacity-20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 relative"
      >
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
                required
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
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                         focus:ring-violet-500 focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 
                       text-white font-medium rounded-xl hover:opacity-90 transition-opacity
                       disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Icon icon={FiLoader} />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 
                       bg-white border border-gray-200 rounded-xl hover:bg-gray-50 
                       transition-colors group"
            >
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              <span className="text-gray-700 group-hover:text-gray-900">
                Continue with Google
              </span>
            </button>
            
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 
                       bg-[#1877F2] rounded-xl hover:bg-[#1874EA] transition-colors"
            >
              <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
              <span className="text-white">Continue with Facebook</span>
            </button>
          </div>
        </div>

        <motion.button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center mt-6 text-violet-600 hover:text-violet-700 
                   font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </motion.button>
      </motion.div>
    </div>
  );
} 