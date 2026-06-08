import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, BrainCircuit, ShieldAlert, Cpu, Database, Layout, Check } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const GOALS = [
  { id: 'fullstack', title: 'Full-Stack Developer', desc: 'Build end-to-end web apps with Node, React, and databases.', icon: Terminal, color: 'text-blue-600 bg-blue-50' },
  { id: 'ai', title: 'AI & ML Engineer', desc: 'Deploy neural networks, LLM integrations, and pipeline architectures.', icon: BrainCircuit, color: 'text-cyan-600 bg-cyan-50' },
  { id: 'devops', title: 'DevOps & SRE', desc: 'Manage Kubernetes clusters, CI/CD pipelines, and cloud systems.', icon: ShieldAlert, color: 'text-purple-600 bg-purple-50' },
  { id: 'frontend', title: 'Frontend Specialist', desc: 'Create immersive, smooth interactive UIs with advanced React & NextJS.', icon: Layout, color: 'text-pink-600 bg-pink-50' },
  { id: 'backend', title: 'Backend Architect', desc: 'Design scalable databases, APIs, server architectures, and system backends.', icon: Database, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'datascience', title: 'Data Scientist', desc: 'Parse large datasets, build analytical pipelines, and clean statistics.', icon: Cpu, color: 'text-indigo-600 bg-indigo-50' }
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
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-4xl relative z-10 space-y-8 text-center">
          {/* Progress Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full py-1.5 px-4 self-center">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-600">Step 2 of 6: Career Goal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">What is your primary career goal?</h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
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
                  className={`relative p-6 rounded-2xl border cursor-pointer hover:-translate-y-0.5 transition-all duration-200 flex flex-col space-y-4 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/60 shadow-[0_0_0_3px_rgba(37,99,235,0.12)] scale-[1.02]'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  {/* Circular checkmark in top-right */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow animate-scaleUp">
                      <Check className="w-3 h-3 text-white stroke-[3.5px]" />
                    </div>
                  )}

                  <div className={`p-3 rounded-xl w-fit ${goal.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{goal.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{goal.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center max-w-3xl mx-auto pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate('/onboarding/welcome')}
              className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold rounded-xl transition-all hover:shadow-sm"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-blue-100 transition-all ${
                !selected ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95 hover:shadow-blue-200'
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
