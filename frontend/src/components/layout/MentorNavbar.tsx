import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../config/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';

export function MentorNavbar() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/mentor/dashboard" className="text-2xl font-bold gradient-text">
            MajorMatch Mentor
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/mentor/dashboard" className="nav-link">
              <FiHome /> Dashboard
            </Link>
            <Link to="/mentor/students" className="nav-link">
              <FiUsers /> Students
            </Link>
            <Link to="/mentor/schedule" className="nav-link">
              <FiCalendar /> Schedule
            </Link>
            <Link to="/mentor/profile" className="nav-link">
              <FiSettings /> Profile
            </Link>
            <button 
              onClick={handleSignOut}
              className="text-sm text-violet-600 hover:text-violet-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 