import React from 'react';
import { Flame, Target, Sparkles, BookOpen, MessageSquare, Compass } from 'lucide-react';

export default function WelcomeBanner({ name = 'Ashwin', streak = 5, goalHours = 5, completedHours = 3.5 }) {
  const progressPercent = Math.min(Math.round((completedHours / goalHours) * 100), 100);

  return (
    <div className="bg-white border border-surface-stroke rounded-[24px] p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
      {/* Soft background gradients */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-vibrant-orange/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-amber-500/5 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="space-y-6 relative z-10 flex-1">
        {/* Header Greeting */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vibrant-orange/10 text-vibrant-orange text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Coach Insight</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-background tracking-tight">
            Welcome back, <span className="text-vibrant-orange">{name}</span>!
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl">
            "Your consistency in React Hooks challenges this week puts you in the **top 5%** of learners in the region. Keep it up!"
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3.5">
          <button className="px-6 py-3 bg-vibrant-orange text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-vibrant-orange/20 active:scale-95 transition-all flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Continue Learning</span>
          </button>
          <button className="px-6 py-3 bg-white border border-surface-stroke hover:bg-surface-container-low text-xs font-bold text-on-background rounded-xl transition-all flex items-center gap-2">
            <Compass className="w-4 h-4 text-vibrant-orange" />
            <span>Explore Courses</span>
          </button>
          <button className="px-6 py-3 bg-orange-50 hover:bg-orange-100 text-vibrant-orange text-xs font-bold rounded-xl transition-all flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>Ask AI Tutor</span>
          </button>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-10">
        {/* Streak card */}
        <div className="bg-surface-container-low/40 border border-surface-stroke p-5 rounded-2xl flex items-center gap-4 min-w-[160px] text-left">
          <div className="p-3 bg-vibrant-orange/10 rounded-xl text-vibrant-orange">
            <Flame className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-on-background">{streak} Days</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-600">Active Streak</div>
          </div>
        </div>

        {/* Weekly Goal Card */}
        <div className="bg-surface-container-low/40 border border-surface-stroke p-5 rounded-2xl flex flex-col justify-between min-w-[180px] text-left">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-vibrant-orange" />
              Weekly Goal
            </span>
            <span className="text-xs font-bold text-vibrant-orange">{progressPercent}%</span>
          </div>
          <div className="text-xl font-extrabold text-on-background mb-3">
            {completedHours} / {goalHours} hrs
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-vibrant-orange h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
