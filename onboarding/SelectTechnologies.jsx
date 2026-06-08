import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const TECHS = [
  { id: 'js', label: 'JavaScript' },
  { id: 'py', label: 'Python' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'rust', label: 'Rust' },
  { id: 'go', label: 'Go' },
  { id: 'react', label: 'React / Next.js' },
  { id: 'docker', label: 'Docker' },
  { id: 'sql', label: 'SQL & Postgres' },
  { id: 'aws', label: 'AWS Cloud' },
  { id: 'pytorch', label: 'PyTorch / ML' }
];

export default function SelectTechnologies() {
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
    const techNames = TECHS.filter(t => selected.includes(t.id)).map(t => t.label);
    localStorage.setItem('onboarding_technologies', JSON.stringify(techNames));
    navigate('/onboarding/preferences');
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
              <span className="text-xs font-bold tracking-wider uppercase text-blue-600">Step 5 of 6: Technologies</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Select preferred languages/frameworks</h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              We'll populate your interactive coding challenges and repositories using these configurations.
            </p>
          </div>

          {/* Chips Grid */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-4">
            {TECHS.map((tech) => {
              const isSelected = selected.includes(tech.id);
              return (
                <button
                  key={tech.id}
                  onClick={() => handleToggle(tech.id)}
                  className={`px-5 py-3 rounded-2xl border text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100'
                      : 'border-slate-200 bg-white hover:border-blue-300 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {tech.label}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center max-w-2xl mx-auto pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate('/onboarding/interests')}
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
