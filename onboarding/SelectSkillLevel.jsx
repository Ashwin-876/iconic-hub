import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Terminal, Award, Check } from 'lucide-react';
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
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-4xl relative z-10 space-y-8 text-center">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full py-1.5 px-4 self-center">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-600">Step 3 of 6: Skill Level</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">What is your current experience level?</h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
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
                  className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-6 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/60 shadow-[0_0_0_3px_rgba(37,99,235,0.12)] scale-[1.02]'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm hover:scale-[1.01]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow animate-scaleUp">
                      <Check className="w-3 h-3 text-white stroke-[3.5px]" />
                    </div>
                  )}

                  <div className="space-y-4 text-left">
                    <div className="flex justify-between items-center">
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {level.badge}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900">{level.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{level.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back/Next */}
          <div className="flex justify-between items-center max-w-3xl mx-auto pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate('/onboarding/career-goal')}
              className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold rounded-xl transition-all hover:shadow-sm"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-blue-100 transition-all ${
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
