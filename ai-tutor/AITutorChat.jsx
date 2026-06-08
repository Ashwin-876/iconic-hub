import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, User, Mic, Paperclip, Terminal, BookOpen, Key, AlertCircle } from 'lucide-react';
import { callOpenRouter } from '../utils/openrouter';

const EXAMPLE_QUESTIONS = [
  { text: "Explain React Hooks", icon: Terminal },
  { text: "What is Machine Learning?", icon: Sparkles },
  { text: "How does JWT Authentication work?", icon: Key },
  { text: "Teach me Data Structures", icon: BookOpen }
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
        alert("Code copied to clipboard! You can paste it into the Coding Playground editor.");
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
    return <span key={idx} className="whitespace-pre-wrap">{part}</span>;
  });
}

export default function AITutorChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello Ashwin! I'm your AI Tutor. Ask me any conceptual question, upload your homework code, or request a customized study plan.", timestamp: "Just now" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Add user message
    const newMsgs = [...messages, { role: 'user', text, timestamp: "Just now" }];
    setMessages(newMsgs);
    setInput('');
    setIsTyping(true);

    try {
      const response = await callOpenRouter(
        newMsgs,
        "You are an elite AI Tutor at Iconic Hub, helping student Ashwin master computer science, web development, coding concepts, and architecture."
      );
      setMessages(prev => [...prev, { role: 'assistant', text: response, timestamp: "Just now" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I had trouble processing that request. Please try again.", timestamp: "Just now" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceToggle = () => {
    setVoiceActive(!voiceActive);
    if (!voiceActive) {
      setInput("Listening...");
      setTimeout(() => {
        setInput("Explain React Hooks render loops");
        setVoiceActive(false);
      }, 2000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMessages(prev => [...prev, { role: 'user', text: `[Uploaded File: ${file.name}]`, timestamp: "Just now" }]);
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', text: `I have analyzed "${file.name}". It appears to contain code configurations. Would you like me to audit its structure or debug performance layout constraints?`, timestamp: "Just now" }]);
        setIsTyping(false);
      }, 1200);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      
      {/* Examples & Guide (4 cols) */}
      <div className="lg:col-span-4 space-y-6 text-left">
        <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2563EB] animate-pulse" />
            <h3 className="text-sm font-bold text-on-background uppercase tracking-wider">Example Questions</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click any question template to instantly stream tutor insights and initiate learning labs:
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            {EXAMPLE_QUESTIONS.map((q, idx) => {
              const Icon = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  className="p-3 bg-slate-50 hover:bg-blue-50/50 border border-surface-stroke hover:border-blue-200 text-left rounded-xl transition-all flex items-center gap-3 text-xs font-bold text-on-surface-variant hover:text-[#2563EB] group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
                  <span>{q.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-3">
          <h4 className="text-xs font-extrabold text-on-background uppercase tracking-wider">Supported Inputs</h4>
          <ul className="text-xs text-slate-500 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
              <span>Natural language programming syntax</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
              <span>Markdown source files upload</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
              <span>Mock design blueprints parsing</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Chat Interface (8 cols) */}
      <div className="lg:col-span-8 bg-white border border-surface-stroke rounded-[32px] shadow-sm flex flex-col h-[580px] relative overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-surface-stroke flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563EB] to-cyan-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-on-background leading-none">Interactive Tutor Bot</h4>
              <span className="text-[10px] text-slate-500 font-medium">Context-Aware AI Assistant</span>
            </div>
          </div>
        </div>

        {/* Message Logs */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3 text-xs text-left ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role !== 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0">
                  AI
                </div>
              )}
              <div className={`p-4 rounded-3xl max-w-[80%] whitespace-pre-wrap leading-relaxed ${
                m.role === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-none'
                  : 'bg-slate-50 border border-surface-stroke text-on-surface-variant rounded-tl-none'
              }`}>
                {renderFormattedMessage(m.text)}
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                  U
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 text-xs text-left">
              <div className="w-8 h-8 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0">
                AI
              </div>
              <div className="bg-slate-50 border border-surface-stroke p-4 rounded-3xl rounded-tl-none text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-surface-stroke bg-slate-50/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-white border border-surface-stroke focus-within:border-[#2563EB] rounded-2xl px-3 py-2 transition-all"
          >
            {/* Attachment */}
            <label className="p-2 bg-slate-50 hover:bg-slate-100 border border-surface-stroke text-slate-400 rounded-xl cursor-pointer hover:text-[#2563EB] transition-all shrink-0">
              <Paperclip className="w-4 h-4" />
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>

            {/* Main Input */}
            <input
              type="text"
              placeholder="Ask anything concept, logic, or syntax..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-xs text-on-background px-2"
            />

            {/* Mic voice */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-2 rounded-xl border transition-all shrink-0 ${
                voiceActive 
                  ? 'bg-red-500 border-red-500 text-white animate-pulse'
                  : 'bg-slate-50 hover:bg-slate-100 border-surface-stroke text-slate-400 hover:text-[#2563EB]'
              }`}
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Submit */}
            <button
              type="submit"
              className="p-2 bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-xl transition-all shadow-md shadow-blue-500/10 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
