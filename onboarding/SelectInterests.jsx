import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const INTERESTS = [
  { id: 'web', label: 'Web Applications' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'sys', label: 'System Design' },
  { id: 'cloud', label: 'Cloud Computing' },
  { id: 'security', label: 'Cybersecurity' },
  { id: 'database', label: 'Database Architectures' },
  { id: 'mobile', label: 'Mobile App Development' },
  { id: 'crypto', label: 'Blockchain & Cryptography' },
  { id: 'game', label: 'Game Development' },
  { id: 'infra', label: 'Infrastructure & Ops' }
];

export default function SelectInterests() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const handleToggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleNext = () => {
    const interestNames = INTERESTS.filter(i => selected.includes(i.id)).map(i => i.label);
    localStorage.setItem('onboarding_interests', JSON.stringify(interestNames));
    navigate('/onboarding/technologies');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#060814] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute bottom-[20%] left-[20%] w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-3xl relative z-10 space-y-8 text-center">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-slate-800/85 border border-slate-700/50 rounded-full py-1 px-4 self-center backdrop-blur-md">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Step 4 of 6: Interests</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">What fields are you interested in?</h1>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Select one or more topics you wish to explore. We'll curate supplementary reading guides.
            </p>
          </div>

          {/* Chips Grid */}
          <div className="flex flex-wrap justify-center gap-3.5 max-w-2xl mx-auto py-4">
            {INTERESTS.map((interest) => {
              const isSelected = selected.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => handleToggle(interest.id)}
                  className={`px-5 py-3.5 rounded-2xl border text-sm font-semibold transition-all duration-300 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500/10 text-white shadow-md shadow-orange-500/5'
                      : 'border-white/5 bg-slate-900/25 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {interest.label}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center max-w-2xl mx-auto pt-6 border-t border-slate-900">
            <button
              onClick={() => navigate('/onboarding/skill-level')}
              className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold rounded-xl transition-all"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={selected.length === 0}
              className={`px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg transition-all ${
                selected.length === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
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
