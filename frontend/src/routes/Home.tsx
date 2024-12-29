import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SparklesIcon, BeakerIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -z-10 top-20 right-20 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-3xl animate-float" />
      <div className="absolute -z-10 bottom-20 left-20 w-[500px] h-[500px] bg-fuchsia-200/30 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 py-20"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-500">
              Discover Your Perfect
            </span>
            <br />
            <span className="text-slate-800">Academic Journey</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Using AI-powered insights and real-world experiences to help you find
            the perfect major that aligns with your passions and potential.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-6 justify-center"
          >
            <Link
              to="/assessments"
              className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-500
                       text-white font-medium rounded-2xl hover:shadow-lg hover:shadow-violet-500/30 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                Start Your Journey
                <SparklesIcon className="h-5 w-5 group-hover:animate-pulse" />
              </span>
            </Link>
            <Link
              to="/learn-more"
              className="px-8 py-4 text-violet-600 font-medium rounded-2xl
                       border-2 border-violet-200 hover:border-violet-300 
                       hover:bg-violet-50 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          <FeatureCard
            icon={<BeakerIcon className="h-8 w-8" />}
            title="AI-Powered Analysis"
            description="Advanced algorithms analyze your interests and strengths to find your perfect match"
            delay={0.4}
          />
          <FeatureCard
            icon={<AcademicCapIcon className="h-8 w-8" />}
            title="Personalized Path"
            description="Get tailored recommendations based on your unique combination of skills"
            delay={0.5}
          />
          <FeatureCard
            icon={<UserGroupIcon className="h-8 w-8" />}
            title="Expert Mentorship"
            description="Connect with professionals and students in your field of interest"
            delay={0.6}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-32 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="95%" label="Success Rate" />
            <StatCard number="50k+" label="Students Helped" />
            <StatCard number="200+" label="Majors Analyzed" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20
                 hover:bg-white/90 hover:shadow-xl hover:shadow-violet-500/10 
                 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="text-violet-500 mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10
                 backdrop-blur-xl border border-white/20"
    >
      <div className="text-4xl font-bold bg-clip-text text-transparent 
                      bg-gradient-to-r from-violet-600 to-fuchsia-500 mb-2">
        {number}
      </div>
      <div className="text-slate-600 font-medium">{label}</div>
    </motion.div>
  );
} 