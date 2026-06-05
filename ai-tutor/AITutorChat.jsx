import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, User, Mic, Paperclip, Terminal, BookOpen, Key, AlertCircle } from 'lucide-react';

const EXAMPLE_QUESTIONS = [
  { text: "Explain React Hooks", icon: Terminal },
  { text: "What is Machine Learning?", icon: Sparkles },
  { text: "How does JWT Authentication work?", icon: Key },
  { text: "Teach me Data Structures", icon: BookOpen }
];

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

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Add user message
    const newMsgs = [...messages, { role: 'user', text, timestamp: "Just now" }];
    setMessages(newMsgs);
    setInput('');
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      let aiText = `Here is a comprehensive explanation for your query: "${text}".\n\n`;
      if (text.toLowerCase().includes('react hooks')) {
        aiText += `React Hooks were introduced in React 16.8 to allow functional components to hook into React state and lifecycle features without using classes.\n\nKey Hooks:\n- **useState**: Keeps track of component local state.\n- **useEffect**: Manages side effects (fetching data, listener setups, DOM mutations).\n- **useContext**: Directly accesses context values instead of using prop-drilling.\n\nWould you like to write a custom hooks simulation together?`;
      } else if (text.toLowerCase().includes('jwt')) {
        aiText += `JSON Web Tokens (JWT) are an open, industry-standard RFC 7519 method for representing claims securely between two parties.\n\nIt consists of three parts separated by dots (.):\n1. **Header**: Algorithms & token type.\n2. **Payload**: Token claims (user ID, permissions).\n3. **Signature**: Validates authenticity via secrets.\n\nTypically sent in the \`Authorization: Bearer <token>\` header for stateless API authentication.`;
      } else {
        aiText += `This topic relates to computer science core competencies. In engineering, conceptual understanding paired with sandbox practice builds muscle memory.\n\nHere are the core principles:\n- **Conceptual Model**: How the concept resolves developer complexity.\n- **Production Best Practices**: Caching, security checks, and optimized rendering.\n- **Step-by-Step Exercise**: I suggest testing this behavior directly inside our Interactive Playground tab.`;
      }

      setMessages(prev => [...prev, { role: 'assistant', text: aiText, timestamp: "Just now" }]);
      setIsTyping(false);
    }, 1500);
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
            <Sparkles className="w-5 h-5 text-vibrant-orange animate-pulse" />
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
                  className="p-3 bg-slate-50 hover:bg-orange-50/50 border border-surface-stroke hover:border-orange-200 text-left rounded-xl transition-all flex items-center gap-3 text-xs font-bold text-on-surface-variant hover:text-vibrant-orange group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-vibrant-orange transition-colors" />
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
              <span className="w-1.5 h-1.5 rounded-full bg-vibrant-orange"></span>
              <span>Natural language programming syntax</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-vibrant-orange"></span>
              <span>Markdown source files upload</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-vibrant-orange"></span>
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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-vibrant-orange to-amber-500 flex items-center justify-center text-white">
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
                <div className="w-8 h-8 rounded-xl bg-vibrant-orange/10 border border-vibrant-orange/20 text-vibrant-orange flex items-center justify-center font-bold text-xs shrink-0">
                  AI
                </div>
              )}
              <div className={`p-4 rounded-3xl max-w-[80%] whitespace-pre-wrap leading-relaxed ${
                m.role === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-none'
                  : 'bg-slate-50 border border-surface-stroke text-on-surface-variant rounded-tl-none'
              }`}>
                {m.text}
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
              <div className="w-8 h-8 rounded-xl bg-vibrant-orange/10 border border-vibrant-orange/20 text-vibrant-orange flex items-center justify-center font-bold text-xs shrink-0">
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
            className="flex items-center gap-2 bg-white border border-surface-stroke focus-within:border-vibrant-orange rounded-2xl px-3 py-2 transition-all"
          >
            {/* Attachment */}
            <label className="p-2 bg-slate-50 hover:bg-slate-100 border border-surface-stroke text-slate-400 rounded-xl cursor-pointer hover:text-vibrant-orange transition-all shrink-0">
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
                  : 'bg-slate-50 hover:bg-slate-100 border-surface-stroke text-slate-400 hover:text-vibrant-orange'
              }`}
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Submit */}
            <button
              type="submit"
              className="p-2 bg-vibrant-orange text-white hover:bg-orange-600 rounded-xl transition-all shadow-md shadow-vibrant-orange/10 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
