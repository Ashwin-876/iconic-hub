import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Award, BrainCircuit, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-radial-glow">
      {/* Dynamic background accents */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text content */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-slate-800/60 border border-slate-700/50 rounded-full py-1 px-4 self-center lg:self-start backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-orange-400">Introducing Iconic Hub 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The Ultimate Hub for <br />
            <span className="text-gradient-orange">Modern Developers</span> & <br />
            <span className="text-gradient-cyan">AI Pioneers</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Accelerate your learning, build real-world developer portfolios, tackle live code playgrounds, and master skills with your personalized 24/7 AI Tutor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link 
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all duration-350 flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-semibold rounded-xl border border-slate-700/50 transition-all flex items-center justify-center"
            >
              Explore Features
            </a>
          </div>

          {/* Quick Stats banner */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800 max-w-md mx-auto lg:mx-0">
            <div>
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Developers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">120+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Guided Paths</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">99%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive UI mockups dashboard */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          <div className="relative w-full max-w-[500px] aspect-[4/3] glass-panel rounded-2xl p-4 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 group overflow-hidden">
            {/* Glossy overlay effect */}
            <div className="absolute -inset-y-12 -inset-x-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

            {/* Mock IDE Headers */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <span className="text-xs text-slate-500 font-mono">iconic-hub-dashboard.jsx</span>
              <Terminal className="w-4 h-4 text-slate-500" />
            </div>

            {/* Mock Dashboard Body */}
            <div className="space-y-4 pt-4 text-left font-sans">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">AI TUTOR SUGGESTION</span>
                  <span className="text-[10px] text-slate-500">Just now</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Based on your interest in <span className="text-cyan-400 font-mono">React Hooks</span>, I recommend the coding playground challenge 'Custom Hooks Masterclass'!"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Total Progress</span>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-lg font-bold text-white">78%</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">+12% this wk</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-orange-500 h-full w-[78%]"></div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50 flex flex-col justify-between">
                  <span className="text-xs text-slate-400">Active Path</span>
                  <span className="text-xs font-bold text-white mt-1 truncate">Full-Stack AI Architect</span>
                  <span className="text-[10px] text-slate-500 mt-2">Next up: Vector Databases</span>
                </div>
              </div>

              {/* Coding challenge completion widget */}
              <div className="p-3 bg-purple-950/20 rounded-xl border border-purple-500/20 flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <Award className="w-5 h-5 animate-bounce" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-200">Achievement Unlocked!</div>
                  <div className="text-[10px] text-slate-400">Completed 5 day Coding streak</div>
                </div>
                <div className="text-xs font-bold text-purple-400">+150 XP</div>
              </div>
            </div>
          </div>

          {/* Floaters for depth */}
          <div className="absolute -top-4 -right-4 p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 shadow-lg flex items-center space-x-2 animate-bounce" style={{ animationDuration: '6s' }}>
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono text-slate-300">AI Tutor Online</span>
          </div>
        </div>
      </div>
    </section>
  );
}
