import React from 'react';
import { Terminal, Shield, Award, Play } from 'lucide-react';

const CHALLENGES = [
  {
    id: 'ch1',
    title: 'Custom Hooks Masterclass',
    difficulty: 'Medium',
    points: 150,
    type: 'React Coding Playground'
  },
  {
    id: 'ch2',
    title: 'Implement OAuth Middleware',
    difficulty: 'Hard',
    points: 300,
    type: 'Backend Security Lab'
  }
];

export default function DeveloperChallenges() {
  return (
    <div className="space-y-4 text-left">
      <h2 className="text-xl font-bold text-on-background">Developer Challenges</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHALLENGES.map((ch) => (
          <div key={ch.id} className="bg-white border border-surface-stroke p-5 rounded-2xl shadow-sm flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{ch.type}</span>
                <span className="px-2 py-0.5 bg-purple-50 text-[9px] font-bold text-purple-600 rounded">
                  {ch.difficulty}
                </span>
              </div>
              <h3 className="text-sm font-bold text-on-background">{ch.title}</h3>
              <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-vibrant-orange" />
                <span>Earn {ch.points} XP / Points</span>
              </p>
            </div>
            <button className="p-3 bg-vibrant-orange hover:bg-orange-600 active:scale-95 transition-all text-white rounded-xl shadow-md shrink-0">
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
