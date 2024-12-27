import { motion } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';

export function LearnMore() {
  return (
    <PageLayout>
      <div className="min-h-[calc(100vh-4rem)] relative">
        {/* Background Elements */}
        <div className="absolute -z-10 top-40 right-20 w-96 h-96 bg-violet-200/30 rounded-full blur-5xl animate-float" />
        <div className="absolute -z-10 bottom-40 left-20 w-96 h-96 bg-fuchsia-200/30 rounded-full blur-5xl animate-float-delayed" />

        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 mb-20"
          >
            <h1 className="text-5xl font-bold">
              <span className="gradient-text">How MajorMatch AI Works</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive approach combines AI technology, research-based assessments, 
              and real-world experiences to guide you toward your ideal academic path.
            </p>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12 mb-20"
          >
            <ProcessStep
              number="01"
              title="Smart Assessment Technology"
              description="Our AI-powered assessment analyzes your interests, strengths, and goals through carefully crafted questions based on educational psychology research."
              delay={0.1}
            />
            <ProcessStep
              number="02"
              title="Personalized Major Recommendations"
              description="Using advanced algorithms, we match your profile with academic programs that align with your unique combination of interests and abilities."
              delay={0.2}
            />
            <ProcessStep
              number="03"
              title="Real-World Validation"
              description="Test your fit through hands-on challenges designed by professionals and students in your recommended fields."
              delay={0.3}
            />
            <ProcessStep
              number="04"
              title="Expert Mentorship"
              description="Connect with mentors who can provide valuable insights and guidance based on their experience in your potential field of study."
              delay={0.4}
            />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            <StatCard
              number="95%"
              label="Student Satisfaction"
              description="of students report finding their ideal major through our platform"
            />
            <StatCard
              number="200+"
              label="Academic Programs"
              description="analyzed and matched to student profiles"
            />
            <StatCard
              number="50k+"
              label="Success Stories"
              description="from students who found their academic path"
            />
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl font-bold gradient-text">
              Ready to Find Your Perfect Major?
            </h2>
            <div className="flex gap-4 justify-center">
              <Link
                to="/assessments"
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500
                         text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                Start Assessment
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}

function ProcessStep({ number, title, description, delay }: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex gap-8 items-start glass-card p-8"
    >
      <span className="text-4xl font-bold gradient-text">{number}</span>
      <div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </motion.div>
  );
}

function StatCard({ number, label, description }: {
  number: string;
  label: string;
  description: string;
}) {
  return (
    <div className="glass-card p-6 text-center space-y-2">
      <div className="text-4xl font-bold gradient-text">{number}</div>
      <div className="font-medium text-slate-800">{label}</div>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
} 