import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiCheckCircle, FiExternalLink, FiLightbulb } from 'react-icons/fi';

interface TaskInstructionsProps {
  task: {
    id: number;
    title: string;
    description: string;
  };
}

export function TaskInstructions({ task }: TaskInstructionsProps) {
  const instructions = taskInstructions[task.title];

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mt-4 overflow-hidden"
      >
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100 shadow-sm">
          {/* Steps Section */}
          <motion.div variants={itemVariants} className="p-6 border-b border-violet-100">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-violet-900 mb-4">
              <FiBookOpen className="w-5 h-5" />
              Step-by-Step Guide
            </h4>
            <div className="space-y-3">
              {instructions?.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex gap-4 items-start group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 text-violet-700
                                flex items-center justify-center font-medium group-hover:bg-violet-200
                                transition-colors">
                    {idx + 1}
                  </div>
                  <p className="text-violet-700 pt-1 group-hover:text-violet-900 transition-colors">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div variants={itemVariants} className="p-6 border-b border-violet-100">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-violet-900 mb-4">
              <FiLightbulb className="w-5 h-5" />
              Tips & Best Practices
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {instructions?.tips.map((tip, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start gap-3 bg-white/50 p-3 rounded-lg hover:bg-white/80 transition-colors"
                >
                  <FiCheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                  <p className="text-violet-700">{tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resources Section */}
          {instructions?.resources && (
            <motion.div variants={itemVariants} className="p-6">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-violet-900 mb-4">
                <span className="text-xl">📚</span>
                Helpful Resources
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {instructions.resources.map((resource, idx) => (
                  <motion.a
                    key={idx}
                    variants={itemVariants}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/50 p-4 rounded-lg hover:bg-white/80 
                             transition-all hover:shadow-md group"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-violet-700 group-hover:text-violet-900">
                        {resource.title}
                      </p>
                    </div>
                    <FiExternalLink className="w-5 h-5 text-violet-400 group-hover:text-violet-600" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 