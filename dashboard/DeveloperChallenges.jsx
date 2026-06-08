import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Play } from 'lucide-react';

const CHALLENGES = [
  {
    id: 'ch1',
    title: 'Custom Hooks Masterclass',
    difficulty: 'Medium',
    points: 150,
    type: 'React Coding Playground',
    diffColor: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'ch2',
    title: 'Implement OAuth Middleware',
    difficulty: 'Hard',
    points: 300,
    type: 'Backend Security Lab',
    diffColor: 'bg-red-50 text-red-500'
  }
];

export default function DeveloperChallenges() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-on-background">Developer Challenges</h2>
        <button
          onClick={() => navigate('/developer-hub')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHALLENGES.map((ch) => (
          <div key={ch.id} className="bg-white border border-surface-stroke p-5 rounded-2xl shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{ch.type}</span>
                <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${ch.diffColor}`}>
                  {ch.difficulty}
                </span>
              </div>
              <h3 className="text-sm font-bold text-on-background">{ch.title}</h3>
              <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Earn {ch.points} XP / Points</span>
              </p>
            </div>
            <button
              onClick={() => navigate('/developer-hub')}
              className="p-3 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white rounded-xl shadow-md shrink-0"
              title={`Start: ${ch.title}`}
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
