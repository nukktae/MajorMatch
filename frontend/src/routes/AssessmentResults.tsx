import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateCareerRecommendation } from '../services/openai';
import { assessmentService } from '../services/assessment';
import type { ResultData } from '../types/assessment';

export function AssessmentResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResultData | null>(null);
  const [answers] = useState(location.state?.answers || {});
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);

  const handleMajorSelection = (majorName: string) => {
    setSelectedMajors(prev => {
      if (prev.includes(majorName)) {
        return prev.filter(name => name !== majorName);
      }
      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, majorName];
    });
  };

  const handleSaveToProfile = async () => {
    if (results && selectedMajors.length > 0) {
      try {
        const selectedMajorsData = results.majors.filter(major => 
          selectedMajors.includes(major.name)
        );
        
        const resultToSave = {
          ...results,
          majors: selectedMajorsData
        };
        
        await assessmentService.saveResults(resultToSave);
        navigate('/profile');
      } catch (err) {
        setError('Failed to save selected majors to profile');
      }
    }
  };

  const generateResults = async () => {
    if (!answers || Object.keys(answers).length === 0) {
      setError('No assessment answers found. Please complete the assessment first.');
      setLoading(false);
      navigate('/assessments');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await generateCareerRecommendation(answers);
      
      if (!data || !data.majors || !Array.isArray(data.majors)) {
        throw new Error('Invalid response format from recommendation service');
      }
      
      setResults(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location.state?.answers) {
      navigate('/assessments');
      return;
    }
    generateResults();
  }, []);

  const handleTryAgain = () => {
    generateResults();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {error ? (
          <div className="glass-card p-8 text-center">
            <p className="text-red-500 mb-6">{error}</p>
            <button
              onClick={handleTryAgain}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500
                       text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-violet-200" />
              <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin" />
            </div>
            <p className="text-lg text-slate-600">Analyzing your responses...</p>
          </div>
        ) : results && (
          <>
            <motion.div className="text-center space-y-4">
              <h1 className="text-4xl font-bold gradient-text">Your Career Match Results</h1>
              <p className="text-xl text-slate-600">
                Select up to 2 majors to save to your profile
              </p>
            </motion.div>

            <motion.div className="space-y-6">
              {results.majors.map((major, index) => (
                <motion.div
                  key={major.name}
                  className={`glass-card p-8 space-y-6 relative ${
                    selectedMajors.includes(major.name) ? 'ring-2 ring-violet-500' : ''
                  }`}
                >
                  <div className="absolute top-4 right-4">
                    <input
                      type="checkbox"
                      checked={selectedMajors.includes(major.name)}
                      onChange={() => handleMajorSelection(major.name)}
                      disabled={selectedMajors.length >= 2 && !selectedMajors.includes(major.name)}
                      className="w-5 h-5 text-violet-500"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-semibold gradient-text">{major.name}</h2>
                      <p className="text-slate-600 mt-2">{major.description}</p>
                    </div>
                    <span className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                      {major.averageSalary}
                    </span>
                  </div>

                  <div className="bg-violet-50/50 rounded-xl p-6">
                    <h3 className="font-medium text-violet-800 mb-3">Why This Fits You</h3>
                    <p className="text-slate-600">{major.whyGoodFit}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-violet-800 mb-3">Career Paths</h3>
                      <div className="space-y-2">
                        {major.careers.map((career, i) => (
                          <div key={i} className="flex items-center gap-2 text-slate-600">
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                            {career}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-violet-800 mb-3">Key Coursework</h3>
                      <div className="space-y-2">
                        {major.coursework.map((course, i) => (
                          <div key={i} className="flex items-center gap-2 text-slate-600">
                            <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full" />
                            {course}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-violet-800 mb-3">Skills to Develop</h3>
                    <div className="flex flex-wrap gap-2">
                      {major.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6 mt-6">
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => navigate('/challenges', { 
                          state: { field: major.name } 
                        })}
                        className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-500
                                  text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                      >
                        Explore Related Challenges
                      </button>
                      <button
                        onClick={() => navigate('/mentors', { 
                          state: { field: major.name } 
                        })}
                        className="px-6 py-2 border-2 border-violet-600 text-violet-600
                                  font-medium rounded-xl hover:bg-violet-50 transition-colors"
                      >
                        Find a Mentor
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSaveToProfile}
                disabled={selectedMajors.length === 0}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500
                         text-white font-medium rounded-xl hover:opacity-90 transition-opacity
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Selected Majors to Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 