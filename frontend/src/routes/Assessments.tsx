import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS } from '../components/AssessmentQuestion';
import { FiFileText, FiZap, FiTarget } from 'react-icons/fi';

export function Assessments() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (step: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [step]: answer }));
    setProgress((Object.keys(answers).length + 1) * 5);
  };

  const handleNext = () => {
    if (currentStep < 20) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    const requiredQuestions = ASSESSMENT_QUESTIONS.filter(q => q.required);
    const answeredRequired = requiredQuestions.every(q => answers[q.id]);
    
    if (answeredRequired) {
      navigate('/assessment-results', { state: { answers } });
    } else {
      alert('Please answer all required questions before continuing');
    }
  };

  const currentQuestion = ASSESSMENT_QUESTIONS.find(q => q.id === currentStep);

  return (
    <>
      {!started ? (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl font-bold gradient-text">Career Assessment</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover your ideal career path through our AI-powered assessment
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 mt-8 space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">What to Expect</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors">
                  <div className="text-violet-600 mb-2">
                    <FiFileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium mb-1">5 Simple Questions</h3>
                  <p className="text-sm text-slate-600">Quick questions about your interests and preferences</p>
                </div>
                <div className="p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors">
                  <div className="text-violet-600 mb-2">
                    <FiZap className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium mb-1">AI Analysis</h3>
                  <p className="text-sm text-slate-600">Advanced AI matches your profile to potential careers</p>
                </div>
                <div className="p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors">
                  <div className="text-violet-600 mb-2">
                    <FiTarget className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium mb-1">Personalized Results</h3>
                  <p className="text-sm text-slate-600">Get tailored major and career recommendations</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500
                         text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                Start Assessment
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-2 bg-violet-100 rounded-full">
              <div 
                className="h-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-slate-600 mt-2">Question {currentStep} of 20</p>
          </div>

          {currentQuestion && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8"
            >
              <h2 className="text-xl font-semibold mb-2">{currentQuestion.text}</h2>
              <p className="text-sm text-violet-600 mb-6">{currentQuestion.category}</p>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentStep, option.value)}
                    className={`w-full p-4 rounded-xl text-left transition-all
                      ${answers[currentStep] === option.value 
                        ? 'bg-violet-600 text-white' 
                        : 'bg-white/50 hover:bg-violet-50'}`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-2 rounded-lg transition-all
                    ${currentStep === 1 
                      ? 'bg-gray-100 text-gray-400' 
                      : 'bg-violet-100 text-violet-600 hover:bg-violet-200'}`}
                >
                  Previous
                </button>

                {currentStep === 20 ? (
                  <button
                    onClick={handleFinish}
                    disabled={!answers[currentStep]}
                    className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500
                             text-white font-medium rounded-xl hover:opacity-90 
                             transition-opacity disabled:opacity-50"
                  >
                    Get Your Results
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!answers[currentStep]}
                    className="px-6 py-2 bg-violet-600 text-white rounded-lg
                             hover:bg-violet-700 transition-all disabled:opacity-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
} 