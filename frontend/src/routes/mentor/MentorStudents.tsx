import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../config/api';
import { getAuthToken } from '../../utils/auth';

type Student = {
  id: string;
  name: string;
  email: string;
  field: string;
  sessionCount: number;
};

export function MentorStudents() {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/mentors/${user?.id}/students`, {
          headers: {
            'Authorization': `Bearer ${await getAuthToken()}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (user?.id) {
      fetchStudents();
    }
  }, [user?.id]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold gradient-text">My Students</h1>
        
        <div className="glass-card">
          {students.map(student => (
            <div 
              key={student.id}
              className="border-b last:border-0 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{student.name}</h3>
                  <p className="text-sm text-slate-600">{student.email}</p>
                  <p className="text-sm text-slate-600">{student.field}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">
                    Sessions: {student.sessionCount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 