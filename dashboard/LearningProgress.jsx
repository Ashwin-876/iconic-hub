import React from 'react';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

export default function LearningProgress({ completedPaths = 2, learningHours = 24.5, certificatesEarned = 3, skillGrowth = 15 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {/* Metric 1: Completed Paths */}
      <div className="bg-white border border-surface-stroke p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Completed Paths</span>
          <div className="p-2 bg-vibrant-orange/10 rounded-xl text-vibrant-orange">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-on-background">{completedPaths}</div>
          <div className="text-[10px] text-slate-500">Learning paths completed</div>
        </div>
      </div>

      {/* Metric 2: Study Hours */}
      <div className="bg-white border border-surface-stroke p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Study Hours</span>
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-on-background">{learningHours} hrs</div>
          <div className="text-[10px] text-slate-500">Total time spent coding</div>
        </div>
      </div>

      {/* Metric 3: Certificates */}
      <div className="bg-white border border-surface-stroke p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Certificates</span>
          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-on-background">{certificatesEarned}</div>
          <div className="text-[10px] text-slate-500">Official verified credentials</div>
        </div>
      </div>

      {/* Metric 4: Skill Growth */}
      <div className="bg-white border border-surface-stroke p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Skill Growth</span>
          <div className="p-2 bg-success-emerald/10 rounded-xl text-success-emerald">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-on-background">+{skillGrowth}%</div>
          <div className="text-[10px] text-slate-500">Performance increase this month</div>
        </div>
      </div>
    </div>
  );
}
