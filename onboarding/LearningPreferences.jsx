import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const TIMES = [
  { id: '15m', label: '15 Mins / day', desc: 'Casual' },
  { id: '30m', label: '30 Mins / day', desc: 'Balanced' },
  { id: '1h', label: '1 Hour / day', desc: 'Intense' },
  { id: '2h', label: '2+ Hours / day', desc: 'Accelerated' }
];

const FORMATS = [
  { id: 'labs', label: 'Interactive Coding Labs', desc: 'Hands-on coding challenges & compilers' },
  { id: 'videos', label: 'Video Lectures', desc: 'Screencasts and visual walk-throughs' },
  { id: 'text', label: 'Documentation & Guides', desc: 'Deep dive articles, logs & architectures' }
];

export default function LearningPreferences() {
  const [time, setTime] = useState('');
  const [format, setFormat] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (!time || !format) return;
    localStorage.setItem('onboarding_study_time', TIMES.find(t => t.id === time).label);
    localStorage.setItem('onboarding_format', FORMATS.find(f => f.id === format).label);
    navigate('/onboarding/generating');
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
              <span className="text-xs font-bold tracking-wider uppercase text-blue-600">Step 6 of 6: Study Preferences</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">How do you prefer to study?</h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              We'll construct study schedules, calendar reminders, and compile personalized materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            {/* Column 1: Time Commitment */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Daily Study Target</h3>
              <div className="space-y-3">
                {TIMES.map((t) => {
                  const isSelected = time === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setTime(t.id)}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/60 shadow-[0_0_0_3px_rgba(37,99,235,0.1)] text-slate-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm animate-scaleUp">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3.5px]" />
                        </div>
                      )}
                      <div className="flex justify-between items-center text-xs font-semibold pr-6">
                        <span>{t.label}</span>
                        <span className="opacity-60">{t.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Format Preferences */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Learning Style</h3>
              <div className="space-y-3">
                {FORMATS.map((f) => {
                  const isSelected = format === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setFormat(f.id)}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/60 shadow-[0_0_0_3px_rgba(37,99,235,0.1)] text-slate-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm animate-scaleUp">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3.5px]" />
                        </div>
                      )}
                      <div className="text-xs font-semibold pr-6">{f.label}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{f.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center max-w-3xl mx-auto pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate('/onboarding/technologies')}
              className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold rounded-xl transition-all hover:shadow-sm"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!time || !format}
              className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-blue-100 transition-all ${
                (!time || !format) ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              }`}
            >
              Generate Recommendations
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
