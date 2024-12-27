import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiUsers, FiAward, FiBook, FiUser, FiLogOut, FiMenu } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { IconType } from 'react-icons'

// Create a wrapper component for icons
const Icon = ({ icon: IconComponent, className }: { icon: IconType; className?: string }) => {
  return <IconComponent size={className?.includes('w-5') ? 20 : 16} />
}

export function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Transform opacity based on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.95)"]
  );

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ background: navBackground }}
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/20 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className={`transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            } font-bold gradient-text hover:scale-105`}
          >
            {isScrolled ? 'MM' : 'MajorMatch AI'}
          </Link>

          {/* Dynamic Navigation Items */}
          <div className="flex items-center gap-6">
            {!isScrolled ? (
              <>
                <NavLink to="/assessments">
                  <span className="flex items-center gap-2">
                    <Icon icon={FiBook} />
                    Assessments
                  </span>
                </NavLink>
                <NavLink to="/challenges">
                  <span className="flex items-center gap-2">
                    <Icon icon={FiAward} />
                    Challenges
                  </span>
                </NavLink>
                <NavLink to="/mentors">
                  <span className="flex items-center gap-2">
                    <Icon icon={FiUsers} />
                    Mentors
                    <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-violet-600 to-fuchsia-500 
                                 text-white rounded-full">New</span>
                  </span>
                </NavLink>
              </>
            ) : (
              <button 
                onClick={() => setIsScrolled(false)}
                className="p-2 hover:bg-violet-50 rounded-lg transition-colors"
              >
                <Icon icon={FiMenu} className="w-5 h-5 text-violet-600" />
              </button>
            )}

            {/* User Section - Always Visible */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile"
                  className={`flex items-center gap-2 text-slate-700 hover:text-violet-700 
                           transition-colors ${isScrolled ? 'text-sm' : ''}`}
                >
                  <Icon icon={FiUser} />
                  {!isScrolled && 'Hi, '}{user.name}
                </Link>
                {!isScrolled && (
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 text-violet-600 hover:text-violet-700 
                             font-medium hover:bg-violet-50 rounded-lg transition-colors"
                  >
                    <Icon icon={FiLogOut} />
                    Sign Out
                  </button>
                )}
              </div>
            ) : (
              <Link 
                to="/auth" 
                className={`flex items-center gap-2 ${
                  isScrolled 
                    ? 'px-4 py-1.5 text-sm'
                    : 'px-6 py-2.5'
                } bg-gradient-to-r from-violet-600 to-fuchsia-500
                text-white font-medium rounded-xl hover:opacity-90 transition-all
                shadow-sm hover:shadow-md`}
              >
                <Icon icon={FiUser} />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="nav-link relative group"
    >
      {children}
      <motion.div 
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 
                   group-hover:w-full transition-all duration-300"
      />
    </Link>
  )
} 