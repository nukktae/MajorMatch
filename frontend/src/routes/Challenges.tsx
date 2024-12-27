import { motion } from 'framer-motion';
import { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { useNavigate } from 'react-router-dom';
import { ChallengeCard } from '../components/ChallengeCard';
import { challenges } from '../data/challenges';
import { Challenge } from '../types/challenge';

export function Challenges() {
  const [filter, setFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [search, setSearch] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const navigate = useNavigate();
  
  const fields = ['all', ...new Set(challenges.map(challenge => challenge.field))];
  
  const filteredChallenges = challenges.filter(challenge => 
    (filter === 'all' || challenge.difficulty === filter) &&
    (selectedField === 'all' || challenge.field === selectedField) &&
    (challenge.title.toLowerCase().includes(search.toLowerCase()) ||
     challenge.field.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <motion.div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Career Challenges</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Complete hands-on challenges to explore different career paths and earn recognition
          </p>
        </motion.div>

        {/* Enhanced Search and Filters */}
        <div className="glass-card p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-slate-200 
                           bg-white/50 backdrop-blur-sm
                           focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>
              </div>
            </div>

            {/* Field Filter */}
            <div className="flex-1">
              <div className="relative">
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-slate-200 
                           bg-white/50 backdrop-blur-sm appearance-none
                           focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                >
                  <option value="all">All Fields</option>
                  {fields.filter(f => f !== 'all').map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  📚
                </span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Difficulty Pills */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-3">
              {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setFilter(level as typeof filter)}
                  className={`px-6 py-2 rounded-full transition-all
                    ${filter === level 
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md' 
                      : 'bg-white/80 text-slate-600 hover:bg-violet-50 border border-slate-200'
                    }`}
                >
                  {level === 'all' ? 'All Levels' : level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredChallenges.length === 0 && (
          <div className="text-center text-slate-600 py-8">
            No challenges found matching your criteria
          </div>
        )}
      </div>
    </PageLayout>
  );
} 