import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import { challenges } from '../data/challenges';
import { Challenge } from '../types/challenge';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import { taskInstructions } from '../data/taskInstructions';
import { PreRequisites } from '../components/PreRequisites';
import { ChatSection } from '../components/ChatSection';

export function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const challenge = challenges.find(c => c.id === id);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleTaskComplete = (taskId: number) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const TaskInstructions = ({ task }: { task: Challenge['tasks'][0] }) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 overflow-hidden"
    >
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100 shadow-lg">
        {/* Steps Section */}
        <div className="p-8 border-b border-violet-100">
          <h4 className="flex items-center gap-3 text-xl font-semibold text-violet-900 mb-6">
            <span className="w-8 h-8 bg-violet-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            Step-by-Step Guide
          </h4>
          <div className="space-y-4">
            {getTaskInstructions(task.title).map((instruction, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 items-start group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-100 text-violet-700
                              flex items-center justify-center font-semibold group-hover:bg-violet-200
                              transition-colors"
                >
                  {idx + 1}
                </div>
                <div className="flex-1 bg-white/50 p-4 rounded-xl group-hover:bg-white/80 transition-colors">
                  <p className="text-violet-800">{instruction}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="p-8 border-b border-violet-100">
          <h4 className="flex items-center gap-3 text-xl font-semibold text-violet-900 mb-6">
            <span className="w-8 h-8 bg-violet-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            Tips & Best Practices
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getTaskTips(task.title).map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 bg-white/50 p-4 rounded-xl hover:bg-white/80 
                           hover:shadow-md transition-all group"
              >
                <svg className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-violet-700 group-hover:text-violet-900 transition-colors">{tip}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="p-8 bg-white/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleTaskComplete(task.id)}
              className="px-6 py-3 bg-violet-600 text-white rounded-xl flex items-center gap-2
                       hover:bg-violet-700 active:bg-violet-800 transition-all hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mark as Complete
            </button>
            <button
              onClick={() => setSelectedTask(null)}
              className="px-6 py-3 bg-white text-violet-700 rounded-xl flex items-center gap-2
                       hover:bg-violet-50 active:bg-violet-100 transition-all border border-violet-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close Instructions
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (!challenge) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-red-600">Challenge not found</h1>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto py-8 px-4"
      >
        {/* Enhanced Header */}
        <motion.div 
          variants={itemVariants}
          className="relative bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-8 mb-12 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Content */}
          <div className="relative">
            <h1 className="text-4xl font-bold mb-4 text-white tracking-tight">
              {challenge.title}
            </h1>
            <p className="text-violet-100 text-lg max-w-2xl leading-relaxed">
              {challenge.description}
            </p>

            {/* Challenge Stats */}
            <div className="flex gap-6 mt-6">
              <div className="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="text-violet-200 text-sm">Difficulty</span>
                <p className="text-white font-semibold">Intermediate</p>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="text-violet-200 text-sm">Estimated Time</span>
                <p className="text-white font-semibold">2-3 hours</p>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="text-violet-200 text-sm">Category</span>
                <p className="text-white font-semibold">Frontend</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PreRequisites section */}
        {challenge.preRequisites && (
          <motion.div variants={itemVariants} className="mb-12">
            <PreRequisites preRequisites={challenge.preRequisites} />
          </motion.div>
        )}

        {/* Tasks */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            Tasks
          </h2>
          
          <div className="space-y-4">
            {challenge.tasks.map((task) => (
              <motion.div key={task.id}>
                <div
                  onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                  className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm
                           hover:border-violet-400 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                      <p className="text-slate-600">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {task.completed && (
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Completed
                        </div>
                      )}
                      <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedTask === task.id && (
                  <TaskInstructions 
                    task={task}
                    onComplete={() => handleTaskComplete(task.id)}
                    onClose={() => setSelectedTask(null)}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Section - Moved to bottom */}
        <motion.div variants={itemVariants} className="mt-12">
          <ChatSection 
            challengeTitle={challenge.title}
            challengeDescription={challenge.description}
          />
        </motion.div>
      </motion.div>
    </PageLayout>
  );
}

// Helper functions for task instructions
function getTaskInstructions(taskTitle: string): string[] {
  const instruction = taskInstructions[taskTitle];
  return instruction?.steps || ['Instructions not available for this task'];
}

function getTaskTips(taskTitle: string): string[] {
  const instruction = taskInstructions[taskTitle];
  return instruction?.tips || ['Tips not available for this task'];
}

function getTaskResources(taskTitle: string) {
  const instruction = taskInstructions[taskTitle];
  return instruction?.resources || [];
} 