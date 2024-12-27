import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="gradient-text">Discover Your Perfect</span>
          <br />
          Academic Journey
        </h1>
        <p className="text-lg text-slate-600 mb-12">
          Using AI-powered insights and real-world experiences to help you find
          the perfect major that aligns with your passions and potential.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/assessments"
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500
                     text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Start Your Journey
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 text-violet-600 font-medium rounded-xl
                     border border-violet-200 hover:border-violet-300 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
      {/* Feature cards section */}
    </div>
  );
} 