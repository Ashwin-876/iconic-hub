import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Terminal, Award, Briefcase, Check } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const LEVELS = [
  { id: 'beginner', title: 'Beginner', desc: 'No coding experience, starting from scratch with basic logic.', icon: Sparkles, badge: 'Newbie' },
  { id: 'intermediate', title: 'Intermediate', desc: 'Can code basic scripts, looking to build applications.', icon: Terminal, badge: 'Pro' },
  { id: 'advanced', title: 'Advanced', desc: 'Professional engineer, seeking system design & ML math.', icon: Award, badge: 'Expert' }
];

export default function SelectSkillLevel() {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (!selected) return;
    localStorage.setItem('onboarding_skill_level', LEVELS.find(l => l.id === selected).title);
    navigate('/onboarding/interests');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#060814] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[20%] right-[20%] w-[350px] h-[350px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-4xl relative z-10 space-y-8 text-center">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-slate-800/85 border border-slate-700/50 rounded-full py-1 px-4 self-center backdrop-blur-md">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Step 3 of 6: Skill Level</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">What is your current experience level?</h1>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              We'll calibrate lesson difficulties, sandbox exercises, and learning speed parameters.
            </p>
          </div>

          {/* Card list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {LEVELS.map((level) => {
              const Icon = level.icon;
              const isSelected = selected === level.id;
              return (
                <div
                  key={level.id}
                  onClick={() => setSelected(level.id)}
                  className={`relative p-6 rounded-2xl border cursor-pointer hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between space-y-6 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-950/15 shadow-[0_0_20px_rgba(255,107,0,0.2)] ring-1 ring-orange-500/40 scale-[1.02]'
                      : 'border-white/5 bg-slate-900/20'
                  }`}
                >
                  {/* Circular checkmark in top-right */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-gradient-to-tr from-vibrant-orange to-amber-500 flex items-center justify-center shadow-md animate-scaleUp">
                      <Check className="w-3 h-3 text-white stroke-[3.5px]" />
                    </div>
                  )}

                  <div className="space-y-4 text-left">
                    <div className="flex justify-between items-center">
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-orange-500/10 text-orange-400' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {level.badge}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white">{level.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{level.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back/Next */}
          <div className="flex justify-between items-center max-w-3xl mx-auto pt-6 border-t border-slate-900/50">
            <button
              onClick={() => navigate('/onboarding/career-goal')}
              className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold rounded-xl transition-all"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className={`px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg transition-all ${
                !selected ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
