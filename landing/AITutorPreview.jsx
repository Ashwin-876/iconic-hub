import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Bot, Sparkles, Send, BrainCircuit, ShieldAlert } from 'lucide-react';

const SUGGESTIONS = [
  {
    label: "Explain closure in JS",
    prompt: "Can you explain JavaScript closures in a simple way with a small code example?",
    response: "A closure is a function that remembers its outer variables even after the outer function has finished executing.\n\n```javascript\nfunction greet(name) {\n  return function() {\n    console.log('Hello, ' + name);\n  };\n}\nconst sayHello = greet('Ashwin');\nsayHello(); // Output: Hello, Ashwin\n```\nHere, the inner function has access to 'name'!"
  },
  {
    label: "Spot bugs in my loop",
    prompt: "I have this loop, is there a memory leak or issue?\nfor (var i = 0; i < items.length; i++) {\n  setTimeout(() => console.log(items[i]), 100);\n}",
    response: "Yes! Because 'var' is function-scoped, by the time the setTimeout callbacks execute, the loop has completed, and 'i' equals 'items.length'. It will log 'undefined' multiple times.\n\nFix it by changing 'var' to 'let' (block scope) or using '.forEach()'."
  },
  {
    label: "How to set up database indexing",
    prompt: "How do database indexes improve search query speed?",
    response: "Think of a database index like the index of a book. Instead of scanning every single page (table scan), the database searches a structured B-Tree path to locate row pointers in O(log N) time, drastically speeding up queries."
  }
];

export default function AITutorPreview() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [conversation, setConversation] = useState([
    {
      role: "assistant",
      text: "Hello! I am your AI learning assistant. Choose one of the prompts below or type to see how I can help you solve code issues in real-time."
    }
  ]);
  const [typing, setTyping] = useState(false);

  const handleSelectPrompt = (index) => {
    if (typing) return;
    const selected = SUGGESTIONS[index];
    setActivePrompt(index);
    
    // Add user message
    setConversation(prev => [
      ...prev,
      { role: "user", text: selected.prompt }
    ]);

    setTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setConversation(prev => [
        ...prev,
        { role: "assistant", text: selected.response }
      ]);
      setTyping(false);
    }, 1000);
  };

  return (
    <section className="py-24 px-4 md:px-8 relative bg-slate-900/10">
      <div className="absolute top-[30%] right-[5%] w-[250px] h-[250px] bg-cyan-600/10 rounded-full blur-[80px]"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: UI Chat Window Mock */}
        <div className="lg:col-span-7 w-full order-2 lg:order-1">
          <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[460px]">
            {/* Top Assistant Header */}
            <div className="bg-slate-950/60 px-4 py-3.5 border-b border-slate-900 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white flex items-center space-x-1">
                    <span>Iconic Tutor</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                  </div>
                  <div className="text-[10px] text-slate-500">Autonomous Senior Agent</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 rounded text-[10px] font-bold">API v2</span>
              </div>
            </div>

            {/* Chat Body panel */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar bg-slate-900/10">
              {conversation.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm text-left ${
                    msg.role === 'user' 
                      ? "bg-slate-800 text-white rounded-tr-none border border-slate-700/50" 
                      : "bg-slate-900/80 text-slate-300 rounded-tl-none border border-slate-800/80"
                  }`}>
                    <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/80 rounded-2xl rounded-tl-none p-4 border border-slate-800/80 flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Selector & Input */}
            <div className="bg-slate-950/60 p-4 border-t border-slate-900">
              <div className="flex flex-wrap gap-2 mb-3">
                {SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPrompt(idx)}
                    disabled={typing}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-all text-left truncate max-w-full"
                  >
                    💡 {sug.label}
                  </button>
                ))}
              </div>

              <div className="relative flex items-center">
                <input 
                  type="text" 
                  disabled
                  placeholder="Ask a custom question..."
                  className="w-full bg-slate-900 border border-slate-850 rounded-xl py-3 pl-4 pr-12 text-xs text-slate-400 cursor-not-allowed"
                />
                <button disabled className="absolute right-3 p-1.5 bg-slate-800 text-slate-500 rounded-lg cursor-not-allowed">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Descriptions */}
        <div className="lg:col-span-5 text-left space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center space-x-2 bg-indigo-950/30 border border-indigo-500/20 rounded-lg py-1 px-3">
            <BrainCircuit className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-xs font-bold text-indigo-400">AI Learning Assistant</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            An Expert Developer, <br />
            <span className="text-gradient-purple">Available 24/7</span>
          </h3>

          <p className="text-slate-400 leading-relaxed">
            Get instant solutions to complex software architecture challenges. The AI Tutor explains concepts, debugs logical errors in real-time, and recommends next lessons dynamically.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-850">
              <span className="text-sm font-bold text-white block mb-1">Interactive Reviews</span>
              <span className="text-xs text-slate-500">Paste code to instantly audit vulnerabilities and clean up code structures.</span>
            </div>
            <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-850">
              <span className="text-sm font-bold text-white block mb-1">Resume Analyzer</span>
              <span className="text-xs text-slate-500">Align your project list with actual industry benchmarks for placement.</span>
            </div>
          </div>

          <div className="pt-2">
            <RouterLink 
              to="/ai-tutor"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold rounded-xl transition-all"
            >
              <span>Launch AI Tutor</span>
              <span>→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  );
}
