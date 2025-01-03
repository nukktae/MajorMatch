import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../config/api';
import { getAuthToken } from '../../utils/auth';
import { FiUsers, FiCalendar, FiStar } from 'react-icons/fi';

export function MentorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    upcomingSessions: 0,
    averageRating: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/mentors/${user?.id}/stats`, {
          headers: {
            'Authorization': `Bearer ${await getAuthToken()}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching mentor stats:', error);
      }
    };

    if (user?.id) {
      fetchStats();
    }
  }, [user?.id]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold gradient-text">Mentor Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            icon={<FiUsers />}
            title="Total Students"
            value={stats.totalStudents}
          />
          <StatsCard 
            icon={<FiCalendar />}
            title="Upcoming Sessions"
            value={stats.upcomingSessions}
          />
          <StatsCard 
            icon={<FiStar />}
            title="Average Rating"
            value={stats.averageRating.toFixed(1)}
          />
        </div>

        {/* Add more dashboard sections as needed */}
      </motion.div>
    </div>
  );
}

function StatsCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: number | string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-4">
        <div className="text-violet-600 text-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-sm text-slate-600">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
} 