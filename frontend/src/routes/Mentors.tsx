import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mentors, type Mentor } from '../data/mentors';

export function Mentors() {
  const location = useLocation();
  const [selectedField, setSelectedField] = useState(location.state?.field || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMentors = mentors.filter(mentor => {
    const matchesField = !selectedField || mentor.field === selectedField;
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.field.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesField && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 mb-20"
        >
          <h1 className="text-5xl font-bold">
            <span className="gradient-text">Connect with Expert Mentors</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get personalized guidance from experienced professionals in your field of interest.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search mentors..."
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
              <option value="Biomedical Engineering">Biomedical Engineering</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Design & Psychology">Design & Psychology</option>
            </select>
          </div>
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((mentor, index) => (
            <MentorCard key={mentor.id} mentor={mentor} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MentorCard({ mentor, delay }: { mentor: Mentor; delay: number }) {
  const navigate = useNavigate();

  const handleScheduleMeeting = () => {
    navigate(`/mentors/${mentor.id}`, { 
      state: { mentor } 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-6 space-y-4"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 
                      flex items-center justify-center text-white text-2xl font-bold">
          {mentor.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{mentor.name}</h3>
          <p className="text-sm text-slate-600">{mentor.title}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-slate-600">{mentor.rating}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-600">
          <span className="font-medium">Experience:</span> {mentor.experience}
        </p>
        <p className="text-sm text-slate-600">
          <span className="font-medium">Availability:</span> {mentor.availability}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {mentor.specialties.map((specialty, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium"
          >
            {specialty}
          </span>
        ))}
      </div>

      <button 
        onClick={handleScheduleMeeting}
        className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-500
                  text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
      >
        Schedule Meeting
      </button>
    </motion.div>
  );
} 