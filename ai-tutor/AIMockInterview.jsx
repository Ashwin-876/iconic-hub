import React, { useState } from 'react';
import { Sparkles, Trophy, Award, MessageSquare, Volume2, Mic, Play, ShieldAlert, CheckCircle, Send } from 'lucide-react';
import { callOpenRouter } from '../utils/openrouter';

const INTERVIEW_PRESETS = {
  frontend: [
    { speaker: "Interviewer", text: "Welcome to the Frontend Interview. Let's discuss React performance. How does the shadow reconciliation work when rendering large dynamic lists?" }
  ],
  backend: [
    { speaker: "Interviewer", text: "Let's explore system scalability. How do you mitigate cache stampede events in distributed Redis configurations?" }
  ]
};

export default function AIMockInterview() {
  const [role, setRole] = useState('frontend');
  const [chatLog, setChatLog] = useState(INTERVIEW_PRESETS.frontend);
  const [activeSpeech, setActiveSpeech] = useState(false);
  const [input, setInput] = useState('');
  const [scores, setScores] = useState({ concept: 85, communication: 90, delivery: 80 });
  const [tips, setTips] = useState([
    "Communicate layout shifts using precise technical vocabulary (e.g. Reconciliation scheduler).",
    "Mention performance gains from virtualization strategies."
  ]);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setChatLog(INTERVIEW_PRESETS[newRole] || [
      { speaker: "Interviewer", text: `Welcome! Let's start the ${newRole} engineering evaluation. Please outline your core experience.` }
    ]);
  };

  const handleSend = async (customText) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const updatedLog = [...chatLog, { speaker: "Candidate", text: textToSend }];
    setChatLog(updatedLog);
    setInput('');
    setLoading(true);

    try {
      const systemPrompt = `You are a senior technical interviewer at Google evaluating a candidate for a ${role} role.
Analyze the candidate's last answer in relation to the interview history.
Respond with a JSON object having this exact schema:
{
  "interviewerResponse": "Your next follow-up question or feedback on their response",
  "scores": {
    "concept": 0-100 (conceptual correctness score),
    "delivery": 0-100 (vocabulary and articulation score)
  },
  "tips": [
    "Tip 1 on how they could have answered better",
    "Tip 2 on how they could have answered better"
  ]
}
Return ONLY the raw JSON object. Do not wrap in markdown or backticks.`;

      const responseText = await callOpenRouter(updatedLog, systemPrompt);
      const cleanJson = responseText.replace(/```json\s*/i, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      setChatLog(prev => [...prev, { speaker: "Interviewer", text: parsed.interviewerResponse || "Interesting. Let's move to the next question." }]);
      if (parsed.scores) {
        setScores({
          concept: parsed.scores.concept || 80,
          communication: Math.round(((parsed.scores.concept || 80) + (parsed.scores.delivery || 80)) / 2),
          delivery: parsed.scores.delivery || 80
        });
      }
      if (parsed.tips) {
        setTips(parsed.tips);
      }
    } catch (error) {
      console.error(error);
      setChatLog(prev => [...prev, { speaker: "Interviewer", text: "Thank you. Let's proceed to the next technical topic." }]);
    } finally {
      setLoading(false);
    }
  };

  const simulateSpeech = () => {
    setActiveSpeech(true);
    // Simulate candidate answering via voice search
    setTimeout(() => {
      setActiveSpeech(false);
      const sampleAnswers = {
        frontend: "We should use stable unique keys like user.id instead of array indexes or random values to prevent complete DOM node rebuilding.",
        backend: "We can use mutex locks or probabilistic early expiration to ensure that only a single worker fetches and updates cache keys from the DB."
      };
      handleSend(sampleAnswers[role] || "We should optimize database queries and monitor layout performance.");
    }, 2500);
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
          <div className="flex items-center gap-1 text-[11px] text-[#2563EB] font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>AI Interviewer Active</span>
          </div>
        </div>

        {/* Conversation Logs */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {chatLog.map((log, idx) => (
            <div key={idx} className="space-y-1 text-left text-xs">
              <span className={`font-bold block uppercase tracking-wider text-[9px] ${
                log.speaker === 'Interviewer' ? 'text-[#2563EB]' : 'text-slate-500'
              }`}>
                {log.speaker}
              </span>
              <p className={`p-3.5 rounded-2xl ${
                log.speaker === 'Interviewer'
                  ? 'bg-[#2563EB]/[0.03] border border-[#2563EB]/10 text-slate-700'
                  : 'bg-slate-50 border border-surface-stroke text-slate-600'
              }`}>
                {log.text}
              </p>
            </div>
          ))}
          {loading && (
            <div className="text-left text-xs text-slate-400 italic">Interviewer is evaluating your response...</div>
          )}
        </div>

        {/* Live visualizer bar */}
        <div className="p-4 border-t border-surface-stroke bg-slate-50 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your response to the interviewer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
              className="flex-1 bg-white border border-surface-stroke focus:border-[#2563EB] outline-none rounded-xl px-3 py-2 text-xs text-on-background"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="p-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={simulateSpeech}
                disabled={loading}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                  activeSpeech 
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] disabled:opacity-60'
                }`}
                title="Speak / Respond"
              >
                <Mic className="w-5 h-5" />
              </button>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 font-medium block">
                  {activeSpeech ? "AI Interviewer listening..." : "Tap mic to answer with a sample spoken response"}
                </span>
              </div>
            </div>

            {/* Animated Visualizer Waves */}
            <div className="flex items-center gap-1 h-6 pr-4">
              {[1, 2, 3, 4, 5, 6, 7].map((bar) => {
                return (
                  <span
                    key={bar}
                    className={`w-1 bg-[#2563EB] rounded-full transition-all duration-300 ${
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

      </div>

      {/* Real-time Feedback (4 cols) */}
      <div className="lg:col-span-4 space-y-6 text-left">
        
        {/* Scores */}
        <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-on-background uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-blue-500" />
            <span>Score Analysis</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-600">Conceptual Accuracy</span>
                <span className="text-[#2563EB]">{scores.concept}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${scores.concept}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-600">Technical Delivery</span>
                <span className="text-[#2563EB]">{scores.delivery}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${scores.delivery}%` }}></div>
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
