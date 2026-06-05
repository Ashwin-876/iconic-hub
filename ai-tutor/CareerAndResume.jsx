import React, { useState } from 'react';
import { Upload, Sparkles, CheckCircle2, ChevronRight, Briefcase, TrendingUp, AlertTriangle } from 'lucide-react';

export default function CareerAndResume() {
  const [selectedRole, setSelectedRole] = useState('frontend');
  const [atsScore, setAtsScore] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  
  const careerPaths = {
    frontend: {
      title: "Frontend Developer",
      salary: "$85,000 - $140,000",
      roadmap: [
        { step: "HTML & Semantic structure markup", status: "Done" },
        { step: "CSS layouts (Flexbox, Grid, container queries)", status: "Done" },
        { step: "Modern Frameworks (React, NextJS, state architecture)", status: "In-Progress" },
        { step: "Edge deployment frameworks, custom caching systems", status: "Next" }
      ]
    },
    backend: {
      title: "Backend Engineer",
      salary: "$95,000 - $160,000",
      roadmap: [
        { step: "SQL Database architectures, isolation levels", status: "Done" },
        { step: "REST & gRPC service configurations", status: "Next" },
        { step: "Distributed caching engines (Redis, Memcached)", status: "Next" }
      ]
    }
  };

  const handleUploadMock = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAtsScore(82);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      
      {/* Resume Analyzer (6 cols) */}
      <div className="lg:col-span-6 bg-white border border-surface-stroke rounded-[32px] p-6 shadow-sm space-y-6 text-left">
        <h2 className="text-lg font-bold text-on-background">ATS Resume Scanner</h2>
        
        {/* Drop Zone */}
        <div className="border-2 border-dashed border-slate-200 hover:border-vibrant-orange rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-50/50" onClick={handleUploadMock}>
          <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <div className="text-xs font-bold text-slate-700">Click to upload your Resume</div>
          <p className="text-[10px] text-slate-500 mt-1">PDF or Word formats. Max size 5MB.</p>
        </div>

        {analyzing && (
          <div className="text-center py-4 text-xs font-bold text-vibrant-orange flex justify-center items-center gap-2">
            <span className="w-4 h-4 border-2 border-vibrant-orange border-t-transparent rounded-full animate-spin"></span>
            <span>Parsing files and checking keyword maps...</span>
          </div>
        )}

        {atsScore !== null && !analyzing && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-orange-500/[0.02] border border-orange-100 rounded-2xl">
              <div className="w-16 h-16 rounded-full border-4 border-vibrant-orange flex items-center justify-center font-black text-lg text-vibrant-orange">
                {atsScore}
              </div>
              <div className="text-left space-y-1">
                <h4 className="text-xs font-extrabold text-on-background">ATS Matching Score</h4>
                <p className="text-[10px] text-slate-500">Your resume is optimized for key frontend roles but lacks systems-architecture keywords.</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Required Enhancements</span>
              <div className="space-y-1.5 text-[10px] text-slate-500 font-semibold">
                <div className="flex gap-2 text-amber-600">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Missing keywords: "Virtual DOM reconciliation", "Tailwind CSS production".</span>
                </div>
                <div className="flex gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Contact info and social portfolio handles validated.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Career Coach (6 cols) */}
      <div className="lg:col-span-6 bg-white border border-surface-stroke rounded-[32px] p-6 shadow-sm space-y-6 text-left">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-on-background">Career Coach</h2>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-slate-50 border border-surface-stroke rounded-xl px-2.5 py-1.5 text-xs text-slate-600 font-bold outline-none"
          >
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
          </select>
        </div>

        {/* Path Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-surface-stroke rounded-2xl text-left">
            <Briefcase className="w-5 h-5 text-slate-400 mb-1" />
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Salary Range</div>
            <div className="text-sm font-black text-slate-700 mt-1">{careerPaths[selectedRole].salary}</div>
          </div>
          <div className="p-4 bg-slate-50 border border-surface-stroke rounded-2xl text-left">
            <TrendingUp className="w-5 h-5 text-slate-400 mb-1" />
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Market Demand</div>
            <div className="text-sm font-black text-vibrant-orange mt-1">High Growth</div>
          </div>
        </div>

        {/* Roadmap Roadmap Timeline */}
        <div className="space-y-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Career Roadmap Milestone</span>
          <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {careerPaths[selectedRole].roadmap.map((step, idx) => (
              <div key={idx} className="flex gap-4 relative">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                  step.status === 'Done'
                    ? 'bg-emerald-500 text-white'
                    : step.status === 'In-Progress'
                    ? 'bg-vibrant-orange text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {idx + 1}
                </div>
                <div className="text-left pt-0.5">
                  <h4 className="text-xs font-bold text-on-background">{step.step}</h4>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${
                    step.status === 'Done' ? 'text-emerald-500' : 'text-vibrant-orange'
                  }`}>{step.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
