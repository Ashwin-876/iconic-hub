import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Terminal, Sparkles } from 'lucide-react';
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
    // Increment progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 45);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Select log strings based on progress
    const logIndex = Math.min(
      Math.floor((progress / 100) * LOGS.length),
      LOGS.length - 1
    );
    setCurrentLog(LOGS[logIndex]);

    if (progress === 100) {
      const redirectTimer = setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      return () => clearTimeout(redirectTimer);
    }
  }, [progress, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#060814] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[30%] left-[30%] w-[350px] h-[350px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[30%] right-[30%] w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

        <div className="w-full max-w-md relative z-10 text-center space-y-8">
          {/* Animated CPU or Sparkle */}
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-orange-500/20 border-t-orange-500 animate-spin" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-2 rounded-full border border-cyan-500/20 border-b-cyan-500 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500 shadow-lg">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Generating Personalized Path</h2>
            <p className="text-xs text-slate-500 font-mono">{currentLog}</p>
          </div>

          {/* Progress Bar Container */}
          <div className="space-y-2">
            <div className="w-full bg-slate-950 border border-slate-900 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>AI COPILOT CORE V2</span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Tech Log Stack */}
          <div className="glass-panel p-4 rounded-xl border border-white/5 bg-slate-950/60 text-left font-mono text-[10px] text-slate-500 space-y-1">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span>INIT LEARNING_GRAPH ENGINE</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>LOAD CUSTOMIZER: {localStorage.getItem('onboarding_career_goal') || 'FULLSTACK'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              <span>CALIBRATING: {localStorage.getItem('onboarding_skill_level') || 'BEGINNER'}</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
