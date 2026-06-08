import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';
import { callOpenRouter } from '../utils/openrouter';

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

function renderFormattedMessage(text) {
  if (!text) return null;
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
      const lang = match ? match[1] : '';
      const codeContent = match ? match[2] : part.slice(3, -3);
      
      const copyToClipboard = () => {
        navigator.clipboard.writeText(codeContent.trim());
        alert("Code copied to clipboard!");
      };

      return (
        <div key={idx} className="my-3 border border-slate-200 rounded-2xl overflow-hidden bg-[#1e293b] text-slate-100 font-mono text-[10px] shadow-sm text-left w-full">
          <div className="flex justify-between items-center px-3 py-1 bg-[#0f172a] border-b border-slate-800 text-[9px] text-slate-400 font-sans">
            <span>{lang.toUpperCase() || 'CODE'}</span>
            <button 
              type="button"
              onClick={copyToClipboard}
              className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-[8px] transition-all"
            >
              Copy
            </button>
          </div>
          <pre className="p-3 overflow-x-auto whitespace-pre">{codeContent}</pre>
        </div>
      );
    }
    return <span key={idx} className="whitespace-pre-wrap text-left block w-full leading-relaxed">{part}</span>;
  });
}

export default function AITutorSuggestions() {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([
    { role: 'ai', text: 'Hello! I am your Iconic AI Bot. Ask me any question about software architecture, clean code, or interview preparation.' }
  ]);
  const [loading, setLoading] = useState(false);

  const askTutor = async (text) => {
    if (loading || !text.trim()) return;
    const newConversation = [...conversation, { role: 'user', text }];
    setConversation(newConversation);
    setQuestion('');
    setLoading(true);

    try {
      const response = await callOpenRouter(
        newConversation,
        "You are Ashwin's personal Iconic AI Bot widget on the dashboard, helping with general programming questions, architecture ideas, or career prep."
      );
      setConversation(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      console.error(error);
      setConversation(prev => [...prev, { role: 'ai', text: "Sorry, I had trouble processing that request. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6 text-left flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-surface-stroke">
        <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-on-background flex items-center gap-1">
            <span>Iconic AI Bot</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin-slow" />
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
              {renderFormattedMessage(msg.text)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 border border-surface-stroke flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
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
            className="w-full bg-slate-50 border border-surface-stroke focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-xl py-3 pl-4 pr-12 text-xs text-on-background placeholder-slate-400 outline-none transition-all"
          />
          <button type="submit" className="absolute right-3 p-1.5 bg-blue-600 hover:bg-blue-600 text-white rounded-lg transition-all active:scale-95">
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
