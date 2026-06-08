import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Flame, Trophy, Calendar, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

export default function AITutorHome({ setActiveTab }) {
  const [typedText, setTypedText] = useState('');
  const fullText = "Explain advanced React rendering lifecycle...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        setTimeout(() => { index = 0; }, 2000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const strengthAreas = ['Component Composition', 'DOM Manipulation', 'Async JS'];
  const weakConcepts = ['Memory Leak Profiling', 'Web Workers Integration', 'Custom Hook Optimization'];
  
  const successStories = [
    { name: "Sarah K.", role: "L4 Frontend Dev at Vercel", before: "Struggled with complex CSS/Next.js dynamic caching", after: "Cleared Mock interview, automated performance reviews with AI assistant, placed in 6 weeks.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
    { name: "Alex M.", role: "Full Stack Engineer at Stripe", before: "Self-taught, skipped core DSA concepts", after: "Mastered tree traversals and graph algorithms using AI playground interactive notes, landed job.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-white border border-surface-stroke rounded-[32px] p-8 md:p-12 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="space-y-6 max-w-xl text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Next-Gen Learning Assistant</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tight leading-tight">
            Your Personal <br />
            <span className="text-[#2563EB]">AI Learning Mentor</span>
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Learn faster, code smarter, prepare for interviews, and achieve career goals with an AI assistant that adapts to your learning journey.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={() => setActiveTab('chat')} className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-all flex items-center gap-2">
              Start Learning with AI <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => setActiveTab('chat')} className="px-6 py-3 bg-white border border-surface-stroke hover:bg-slate-50 text-xs font-bold text-on-background rounded-xl transition-all">
              Ask AI Tutor
            </button>
          </div>
        </div>

        {/* Hero Interactive Elements Preview */}
        <div className="w-full lg:w-[380px] bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl font-sans text-xs text-slate-300 relative">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="font-bold text-white text-[11px] uppercase tracking-wider">Iconic AI Tutor</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2563EB]/20 flex items-center justify-center text-[#2563EB] text-[10px] font-bold">U</div>
              <div className="bg-slate-800 p-2.5 rounded-2xl rounded-tl-none max-w-[80%] text-[11px] text-left">
                {typedText}<span className="w-1.5 h-3.5 bg-[#2563EB] inline-block align-middle ml-0.5 animate-pulse"></span>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <div className="bg-[#2563EB]/15 border border-[#2563EB]/20 p-2.5 rounded-2xl rounded-tr-none max-w-[80%] text-[11px] text-left text-blue-200">
                <div className="font-semibold text-[#2563EB] text-[10px] mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Mentor Suggestion
                </div>
                Sure! In React 19, the layout reconciliation runs synchronously before browser repaints...
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#2563EB] to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold">AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tutor Dashboard Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Learning Overview (8 cols) */}
        <div className="md:col-span-8 bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6 text-left">
          <h2 className="text-lg font-bold text-on-background">Learning Dashboard</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-surface-stroke">
              <Flame className="w-6 h-6 text-[#2563EB] mb-2" />
              <div className="text-xl font-black text-on-background">7 Days</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Daily Streak</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-surface-stroke">
              <Trophy className="w-6 h-6 text-blue-500 mb-2" />
              <div className="text-xl font-black text-on-background">84%</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Skill Level</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-surface-stroke">
              <Calendar className="w-6 h-6 text-cyan-500 mb-2" />
              <div className="text-xl font-black text-on-background">3.5 / 5 hr</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Weekly Goal</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-surface-stroke">
              <TrendingUp className="w-6 h-6 text-emerald-500 mb-2" />
              <div className="text-xl font-black text-on-background">Full-Stack</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Active Path</div>
            </div>
          </div>

          <div className="bg-[#2563EB]/[0.02] border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-on-background flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" /> Recommended Next Topic
              </h4>
              <p className="text-xs text-slate-600">Practice writing recursive React components with state encapsulation rules.</p>
            </div>
            <button onClick={() => setActiveTab('code')} className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold rounded-xl shrink-0 transition-all">
              Practice Now
            </button>
          </div>
        </div>

        {/* AI Insights (4 cols) */}
        <div className="md:col-span-4 bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-4 text-left">
          <h3 className="text-sm font-bold text-on-background uppercase tracking-wider">AI Insights</h3>
          
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide block mb-1">Strong Concepts</span>
              <div className="flex flex-wrap gap-1.5">
                {strengthAreas.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-[10px] font-semibold text-emerald-700 rounded-md">{s}</span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#2563EB] block mb-1 uppercase tracking-wide">Attention Suggested</span>
              <div className="flex flex-wrap gap-1.5">
                {weakConcepts.map((w, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-[10px] font-semibold text-[#2563EB] rounded-md">{w}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-surface-stroke pt-3 text-[11px] text-slate-500 leading-relaxed">
            <span className="font-bold text-on-background">Study Suggestion:</span> Dedicate 20 minutes to debugging callback scopes inside custom hooks today.
          </div>
        </div>

      </section>

      {/* Success Stories */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-on-background text-left">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories.map((story, index) => (
            <div key={index} className="bg-white border border-surface-stroke rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between text-left">
              <p className="text-xs italic text-slate-600 leading-relaxed">"{story.before} &rarr; {story.after}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                <img src={story.avatar} alt={story.name} className="w-9 h-9 rounded-full object-cover border border-slate-100" />
                <div>
                  <h4 className="text-xs font-bold text-on-background">{story.name}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-white rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden space-y-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">Learn Smarter. Grow Faster. Achieve More.</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unlock your full potential with an AI tutor that learns with you and guides every step of your journey.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => setActiveTab('chat')} className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
            Start AI Learning
          </button>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-all border border-white/10">
            Upgrade to Premium
          </button>
        </div>
      </section>
    </div>
  );
}
