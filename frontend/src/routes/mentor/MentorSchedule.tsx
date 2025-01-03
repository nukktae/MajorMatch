import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../config/api';
import { getAuthToken } from '../../utils/auth';
import { FiClock, FiUser, FiMessageSquare } from 'react-icons/fi';
import { IconType } from 'react-icons';

const Icon = ({ icon: IconComponent }: { icon: IconType }) => {
  return <IconComponent size={24} />;
};

type Session = {
  id: string;
  studentName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed';
  message?: string;
};

export function MentorSchedule() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/mentors/${user?.id}/sessions`, {
          headers: {
            'Authorization': `Bearer ${await getAuthToken()}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    if (user?.id) {
      fetchSessions();
    }
  }, [user?.id]);

  const handleStatusUpdate = async (sessionId: string, newStatus: Session['status']) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setSessions(sessions.map(session => 
          session.id === sessionId ? { ...session, status: newStatus } : session
        ));
      }
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold gradient-text">Schedule</h1>
        
        <div className="glass-card">
          {sessions.map(session => (
            <div 
              key={session.id}
              className="border-b last:border-0 p-6"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-violet-600">
                    <Icon icon={FiUser} />
                    <span className="font-medium text-slate-800">{session.studentName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-violet-600">
                    <Icon icon={FiClock} />
                    <span className="text-slate-800">{new Date(session.date).toLocaleDateString()} at {session.time}</span>
                  </div>
                  {session.message && (
                    <div className="flex items-start gap-2 text-violet-600">
                      <Icon icon={FiMessageSquare} />
                      <p className="text-sm text-slate-600">{session.message}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {session.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(session.id, 'confirmed')}
                        className="px-4 py-2 text-sm bg-violet-100 text-violet-700 rounded-xl"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(session.id, 'completed')}
                        className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-xl"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    session.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    session.status === 'completed' ? 'bg-slate-100 text-slate-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 