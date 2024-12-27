import { useNavigate } from 'react-router-dom';
import { Challenge } from '../types/challenge';

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/challenges/${challenge.id}`)}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 
                 hover:border-violet-400 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-sm ${
          challenge.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
          challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {challenge.difficulty}
        </span>
        <span className="text-violet-600 font-semibold">{challenge.points} pts</span>
      </div>

      <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
      <p className="text-slate-600 mb-4">{challenge.description}</p>

      <div className="flex items-center justify-between text-slate-500 text-sm">
        <span>{challenge.field}</span>
        <span>{challenge.duration}</span>
      </div>
    </div>
  );
} 