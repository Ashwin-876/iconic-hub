import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-3xl relative z-10 space-y-8 text-center">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full py-1.5 px-4 self-center">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-600">Step 4 of 6: Interests</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">What fields are you interested in?</h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              Select one or more topics you wish to explore. We'll curate supplementary reading guides.
            </p>
          </div>

          {/* Chips Grid */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-4">
            {INTERESTS.map((interest) => {
              const isSelected = selected.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => handleToggle(interest.id)}
                  className={`px-5 py-3 rounded-2xl border text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100'
                      : 'border-slate-200 bg-white hover:border-blue-300 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {interest.label}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center max-w-2xl mx-auto pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate('/onboarding/skill-level')}
              className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold rounded-xl transition-all hover:shadow-sm"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={selected.length === 0}
              className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-blue-100 transition-all ${
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
