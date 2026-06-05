import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, BrainCircuit, ShieldAlert, Cpu, Database, Layout, Check } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const GOALS = [
  { id: 'fullstack', title: 'Full-Stack Developer', desc: 'Build end-to-end web apps with Node, React, and databases.', icon: Terminal, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
  { id: 'ai', title: 'AI & ML Engineer', desc: 'Deploy neural networks, LLM integrations, and pipeline architectures.', icon: BrainCircuit, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  { id: 'devops', title: 'DevOps & SRE', desc: 'Manage Kubernetes clusters, CI/CD pipelines, and cloud systems.', icon: ShieldAlert, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { id: 'frontend', title: 'Frontend Specialist', desc: 'Create immersive, smooth interactive UIs with advanced React & NextJS.', icon: Layout, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
  { id: 'backend', title: 'Backend Architect', desc: 'Design scalable databases, APIs, server architectures, and system backends.', icon: Database, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { id: 'datascience', title: 'Data Scientist', desc: 'Parse large datasets, build analytical pipelines, and clean statistics.', icon: Cpu, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' }
];

export default function SelectCareerGoal() {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (!selected) return;
    localStorage.setItem('onboarding_career_goal', GOALS.find(g => g.id === selected).title);
    navigate('/onboarding/skill-level');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#060814] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-4xl relative z-10 space-y-8 text-center">
          {/* Progress Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/50 rounded-full py-1 px-4 self-center backdrop-blur-md">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Step 2 of 6: Career Goal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">What is your primary career goal?</h1>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Select the path that matches your professional aspiration. We'll tailor your recommendation.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-3xl mx-auto">
            {GOALS.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selected === goal.id;
              return (
                <div
                  key={goal.id}
                  onClick={() => setSelected(goal.id)}
                  className={`relative p-6 rounded-2xl border cursor-pointer hover:-translate-y-0.5 transition-all duration-300 flex flex-col space-y-4 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-950/15 shadow-[0_0_20px_rgba(255,107,0,0.2)] ring-1 ring-orange-500/40 scale-[1.02]'
                      : 'border-white/5 bg-slate-900/20 hover:border-slate-700/60'
                  }`}
                >
                  {/* Circular checkmark in top-right */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-gradient-to-tr from-vibrant-orange to-amber-500 flex items-center justify-center shadow-md animate-scaleUp">
                      <Check className="w-3 h-3 text-white stroke-[3.5px]" />
                    </div>
                  )}

                  <div className={`p-3 rounded-xl w-fit ${goal.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">{goal.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{goal.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center max-w-3xl mx-auto pt-6 border-t border-slate-900/50">
            <button
              onClick={() => navigate('/onboarding/welcome')}
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
