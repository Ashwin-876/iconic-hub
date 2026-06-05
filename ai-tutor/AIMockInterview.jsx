import React, { useState } from 'react';
import { Sparkles, Trophy, Award, MessageSquare, Volume2, Mic, Play, ShieldAlert, CheckCircle } from 'lucide-react';

const INTERVIEW_PRESETS = {
  frontend: [
    { speaker: "Interviewer", text: "Welcome to the Frontend Interview. Let's discuss React performance. How does the shadow reconciliation work when rendering large dynamic lists?" },
    { speaker: "Candidate", text: "React constructs virtual node representations. If keys are not unique, it fallback matches components by sibling indices, triggering full list rebuilds." },
    { speaker: "Interviewer", text: "Exactly! Follow-up: how do you prevent re-rendering nested structures when parent context triggers update events?" }
  ],
  backend: [
    { speaker: "Interviewer", text: "Let's explore system scalability. How do you mitigate cache stampede events in distributed Redis configurations?" },
    { speaker: "Candidate", text: "We can use probabilistic early expiration or lock-based query shielding to coordinate single DB fetches." }
  ]
};

export default function AIMockInterview() {
  const [role, setRole] = useState('frontend');
  const [chatLog, setChatLog] = useState(INTERVIEW_PRESETS.frontend);
  const [activeSpeech, setActiveSpeech] = useState(false);
  const [scores, setScores] = useState({ concept: 88, communication: 92, delivery: 85 });
  const [tips, setTips] = useState([
    "Communicate layout shifts using precise technical vocabulary (e.g. Reconciliation scheduler).",
    "Mention performance gains from virtualization strategies."
  ]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setChatLog(INTERVIEW_PRESETS[newRole] || [
      { speaker: "Interviewer", text: `Welcome! Let's start the ${newRole} engineering evaluation. Please outline your core experience.` }
    ]);
  };

  const simulateSpeech = () => {
    setActiveSpeech(true);
    setTimeout(() => {
      setActiveSpeech(false);
      setChatLog(prev => [
        ...prev,
        { speaker: "Interviewer", text: "Great! Let's dive deeper into specific performance checks. How would you monitor rendering pipelines?" }
      ]);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      
      {/* Visualizer & Logs (8 cols) */}
      <div className="lg:col-span-8 bg-white border border-surface-stroke rounded-[32px] shadow-sm overflow-hidden flex flex-col h-[520px]">
        
        {/* Head */}
        <div className="p-4 bg-slate-50 border-b border-surface-stroke flex justify-between items-center">
          <div className="flex items-center gap-2">
            <select
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="bg-white border border-surface-stroke rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none"
            >
              <option value="frontend">Frontend Architect Interview</option>
              <option value="backend">Distributed Systems Interview</option>
            </select>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-vibrant-orange font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>AI Interviewer Active</span>
          </div>
        </div>

        {/* Conversation Logs */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {chatLog.map((log, idx) => (
            <div key={idx} className="space-y-1 text-left text-xs">
              <span className={`font-bold block uppercase tracking-wider text-[9px] ${
                log.speaker === 'Interviewer' ? 'text-vibrant-orange' : 'text-slate-500'
              }`}>
                {log.speaker}
              </span>
              <p className={`p-3.5 rounded-2xl ${
                log.speaker === 'Interviewer'
                  ? 'bg-orange-500/[0.03] border border-orange-100 text-slate-700'
                  : 'bg-slate-50 border border-surface-stroke text-slate-600'
              }`}>
                {log.text}
              </p>
            </div>
          ))}
        </div>

        {/* Live visualizer bar */}
        <div className="p-4 border-t border-surface-stroke bg-slate-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={simulateSpeech}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                activeSpeech 
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-vibrant-orange text-white hover:bg-orange-600'
              }`}
              title="Speak / Respond"
            >
              <Mic className="w-5 h-5" />
            </button>
            <div className="text-left">
              <span className="text-[10px] text-slate-500 font-medium block">
                {activeSpeech ? "AI Interviewer listening..." : "Tap mic to answer prompt"}
              </span>
            </div>
          </div>

          {/* Animated Visualizer Waves */}
          <div className="flex items-center gap-1 h-6 pr-4">
            {[1, 2, 3, 4, 5, 6, 7].map((bar) => {
              const heightClass = activeSpeech 
                ? `h-${Math.floor(Math.random() * 4) + 2}`
                : 'h-1.5';
              return (
                <span
                  key={bar}
                  className={`w-1 bg-vibrant-orange rounded-full transition-all duration-300 ${
                    activeSpeech ? 'animate-bounce' : ''
                  }`}
                  style={{ 
                    height: activeSpeech ? `${Math.floor(Math.random() * 16) + 4}px` : '4px',
                    animationDelay: `${bar * 100}ms`
                  }}
                ></span>
              );
            })}
          </div>
        </div>

      </div>

      {/* Real-time Feedback (4 cols) */}
      <div className="lg:col-span-4 space-y-6 text-left">
        
        {/* Scores */}
        <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-on-background uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Score Analysis</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-600">Conceptual Accuracy</span>
                <span className="text-vibrant-orange">{scores.concept}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-vibrant-orange h-full rounded-full" style={{ width: `${scores.concept}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-600">Technical Delivery</span>
                <span className="text-vibrant-orange">{scores.delivery}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-vibrant-orange h-full rounded-full" style={{ width: `${scores.delivery}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Tips */}
        <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-on-background uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>Suggested Fixes</span>
          </h3>
          <div className="space-y-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-2 text-[10px] text-slate-500 font-semibold leading-relaxed">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
