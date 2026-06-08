import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const LOGS = [
  'Parsing survey preferences...',
  'Analyzing skill parameters & benchmarks...',
  'Querying curriculum matching index...',
  'Compiling hands-on sandbox labs...',
  'Configuring 24/7 AI Tutor assistant...',
  'Writing personal dashboard configs...'
];

export default function AIRecommendationGeneration() {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return prev + 1;
      });
    }, 45);
    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const logIndex = Math.min(Math.floor((progress / 100) * LOGS.length), LOGS.length - 1);
    setCurrentLog(LOGS[logIndex]);
    if (progress === 100) {
      const t = setTimeout(() => navigate('/dashboard'), 1000);
      return () => clearTimeout(t);
    }
  }, [progress, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-slate-800 flex items-center justify-center p-4 relative overflow-hidden">

        {/* Main card */}
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-200/80 p-10 text-center space-y-8">

            {/* Animated spinning rings + Logo in circle */}
            <div className="relative mx-auto w-36 h-36 flex items-center justify-center">
              {/* Outer spinning ring */}
              <div
                className="absolute inset-0 rounded-full border-[3px] border-purple-100 border-t-purple-500 animate-spin"
                style={{ animationDuration: '2s' }}
              />
              {/* Middle spinning ring */}
              <div
                className="absolute inset-4 rounded-full border-[2px] border-blue-100 border-b-blue-400 animate-spin"
                style={{ animationDuration: '3.5s', animationDirection: 'reverse' }}
              />
              {/* Inner glow */}
              <div className="absolute inset-8 rounded-full bg-purple-500/10 blur-sm" />

              {/* Logo circle */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-purple-200/60 flex-shrink-0 bg-white">
                <img
                  src="/iconic_logo.png"
                  alt="Iconic Hub Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Generating Personalized Path</h2>
              <p className="text-xs text-slate-400 font-mono tracking-wide animate-pulse">{currentLog}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2.5">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-75 shadow-sm shadow-purple-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                <span>AI Copilot Core V2</span>
                <span className="text-purple-500">{progress}%</span>
              </div>
            </div>



            {/* Brand footer */}
            <div className="flex items-center justify-center space-x-2 pt-1">
              <img src="/iconic_logo.png" alt="Iconic Hub" className="h-5 w-auto object-contain opacity-40" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Iconic Hub AI Engine</span>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}
