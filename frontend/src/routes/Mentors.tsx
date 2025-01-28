import { motion } from 'framer-motion';
import { useState } from 'react';
import { mentors } from '../data/mentors';
import { useNavigate } from 'react-router-dom';

export function Mentors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const navigate = useNavigate();

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.field.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesField = !selectedField || mentor.field === selectedField;
    return matchesSearch && matchesField;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Our Major Advisors</h1>
        <p className="text-lg text-slate-600">
          Meet our experienced professionals ready to guide you on your academic journey
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 mb-12"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search advisors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-violet-200 focus:border-violet-400 
                     focus:outline-none focus:ring-2 focus:ring-violet-200"
          />
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="px-4 py-2 rounded-xl border border-violet-200 focus:border-violet-400 
                     focus:outline-none focus:ring-2 focus:ring-violet-200"
          >
            <option value="">All Fields</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Design & Psychology">Design & Psychology</option>
          </select>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map(mentor => (
          <motion.div
            key={mentor.id}
            onClick={() => navigate(`/mentor/${mentor.id}`, { state: { mentor } })}
            className="glass-card p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 
                           flex items-center justify-center text-white text-2xl font-bold">
                {mentor.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{mentor.name}</h3>
                <p className="text-slate-600">{mentor.field}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Experience: {mentor.experience}</p>
              <p className="text-sm text-slate-500">Availability: {mentor.availability}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {mentor.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-violet-100 text-violet-700 rounded-lg text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 