import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';

const SUGGESTIONS = [
  {
    q: 'Review React performance optimization rules',
    ans: 'React optimizes rendering using 3 core concepts:\n1. useMemo & useCallback to cache values/functions.\n2. React.memo for component shallow comparison.\n3. Virtualization (e.g. react-window) for handling long lists efficiently.'
  },
  {
    q: 'Interview Prep: Explain database indexing B-Trees',
    ans: 'B-Trees keep data sorted and allow search, sequential access, insertion, and deletion in logarithmic O(log N) time. The database scans nodes hierarchically without scanning the entire disk block.'
  }
];

export default function AITutorSuggestions() {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([
    { role: 'ai', text: 'Hello! I am your 24/7 AI Tutor. Ask me any question about software architecture, clean code, or interview preparation.' }
  ]);
  const [loading, setLoading] = useState(false);

  const askTutor = (text) => {
    if (loading || !text.trim()) return;
    setConversation(prev => [...prev, { role: 'user', text }]);
    setQuestion('');
    setLoading(true);

    setTimeout(() => {
      // Find matching sug or generic reply
      const matched = SUGGESTIONS.find(s => s.q.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(s.q.toLowerCase()));
      const reply = matched ? matched.ans : `That is an excellent question! Here is how we should look at this: focus on modular components, clean abstractions, and writing unit tests to validate execution. Let me know if you would like me to compile code templates for this!`;
      setConversation(prev => [...prev, { role: 'ai', text: reply }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6 text-left flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-surface-stroke">
        <div className="w-10 h-10 rounded-xl bg-vibrant-orange/10 border border-vibrant-orange/20 flex items-center justify-center text-vibrant-orange">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-on-background flex items-center gap-1">
            <span>24/7 AI Tutor Co-pilot</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
          </h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Autonomous Assistant Mode</p>
        </div>
      </div>

      {/* Chat logs */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {conversation.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-xs ${
              msg.role === 'user'
                ? 'bg-slate-900 text-white rounded-tr-none'
                : 'bg-surface-container-low/40 border border-surface-stroke text-on-surface-variant rounded-tl-none'
            }`}>
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">{msg.text}</pre>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 border border-surface-stroke flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-vibrant-orange rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-vibrant-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-vibrant-orange rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
      </div>

      {/* Footer / input */}
      <div className="space-y-4 pt-4 border-t border-surface-stroke">
        {/* Suggestion tags */}
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => askTutor(sug.q)}
              className="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container border border-surface-stroke rounded-lg text-[10px] font-semibold text-on-surface-variant transition-all text-left"
            >
              💡 {sug.q}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); askTutor(question); }} className="relative flex items-center">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a technical or career query..."
            className="w-full bg-slate-50 border border-surface-stroke focus:border-vibrant-orange focus:ring-1 focus:ring-vibrant-orange rounded-xl py-3 pl-4 pr-12 text-xs text-on-background placeholder-slate-400 outline-none transition-all"
          />
          <button type="submit" className="absolute right-3 p-1.5 bg-vibrant-orange hover:bg-orange-600 text-white rounded-lg transition-all active:scale-95">
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
