import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiUser, FiCalendar, FiUsers, FiLogOut } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { auth } from '../config/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { IconBaseProps } from 'react-icons';

interface IconProps extends IconBaseProps {
  icon: IconType;
}

const Icon = ({ icon: IconComponent, ...props }: IconProps) => {
  return <IconComponent {...props} size={20} />;
};

export function MentorLayout() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <nav className="bg-white/80 backdrop-blur-xl border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/mentor/dashboard" className="flex items-center px-3 text-violet-600">
                Dashboard
              </Link>
              <Link to="/mentor/schedule" className="flex items-center gap-2 px-3 text-slate-600 hover:text-violet-600">
                <Icon icon={FiCalendar} />
                Schedule
              </Link>
              <Link to="/mentor/students" className="flex items-center gap-2 px-3 text-slate-600 hover:text-violet-600">
                <Icon icon={FiUsers} />
                Students
              </Link>
              <Link to="/mentor/profile" className="flex items-center gap-2 px-3 text-slate-600 hover:text-violet-600">
                <Icon icon={FiUser} />
                Profile
              </Link>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 text-slate-600 hover:text-violet-600"
            >
              <Icon icon={FiLogOut} />
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
} 