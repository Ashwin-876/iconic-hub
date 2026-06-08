import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Bot, Sparkles, Send, BrainCircuit } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

  const sectionRef = useRef(null);
  const chatWindowRef = useRef(null);
  const textContentRef = useRef(null);

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

  // Clean, Premium GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Chat Window Entrance (Slides up and fades in cleanly)
      gsap.fromTo(chatWindowRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chatWindowRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Text Content staggered fade up
      gsap.fromTo(".anim-tutor-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textContentRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 relative bg-white text-[#0F172A] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: UI Chat Window Mock */}
        <div ref={chatWindowRef} className="lg:col-span-7 w-full order-2 lg:order-1">
          <div className="bg-[#0B0F19] rounded-2xl overflow-hidden shadow-xl border border-slate-900 flex flex-col h-[460px]">
            {/* Top Assistant Header */}
            <div className="bg-slate-950 px-4 py-3.5 border-b border-slate-900 flex items-center justify-between">
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
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div className="text-[10px] text-slate-500">Autonomous Senior Agent</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-[#6E2ED8]/25 text-[#a78bfa] rounded text-[10px] font-bold">API v2</span>
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
                      ? "bg-[#6E2ED8] text-white rounded-tr-none border border-[#6E2ED8]/10" 
                      : "bg-slate-900 text-slate-300 rounded-tl-none border border-slate-850 shadow-md"
                  }`}>
                    <pre className="whitespace-pre-wrap font-sans leading-relaxed">{msg.text}</pre>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 rounded-2xl rounded-tl-none p-4 border border-slate-850 shadow-md flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Selector & Input */}
            <div className="bg-slate-950 p-4 border-t border-slate-900">
              <div className="flex flex-wrap gap-2 mb-3">
                {SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPrompt(idx)}
                    disabled={typing}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all text-left truncate max-w-full"
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
                  className="w-full bg-slate-900 border border-slate-850 rounded-xl py-3 pl-4 pr-12 text-xs text-slate-450 cursor-not-allowed"
                />
                <button disabled className="absolute right-3 p-1.5 bg-slate-850 text-slate-500 rounded-lg cursor-not-allowed">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Descriptions */}
        <div ref={textContentRef} className="lg:col-span-5 text-left space-y-6 order-1 lg:order-2">
          <div className="anim-tutor-item inline-flex items-center space-x-2 bg-[#6E2ED8]/10 border border-[#6E2ED8]/20 rounded-xl py-1.5 px-4">
            <BrainCircuit className="w-4 h-4 text-[#6E2ED8]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6E2ED8]">AI Learning Assistant</span>
          </div>

          <h3 className="anim-tutor-item text-3xl sm:text-5xl font-black text-[#0B1530] tracking-tight leading-none">
            An Expert Developer, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E2ED8] to-[#9F66FF]">Available 24/7</span>
          </h3>

          <p className="anim-tutor-item text-[#64748B] font-medium text-lg leading-relaxed">
            Get instant solutions to complex software architecture challenges. The AI Tutor explains concepts, debugs logical errors in real-time, and recommends next lessons dynamically.
          </p>

          <div className="anim-tutor-item grid grid-cols-2 gap-4 font-medium">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/80 hover:bg-slate-100/20 hover:border-slate-200 transition-all duration-300 text-left">
              <span className="text-sm font-extrabold text-[#0B1530] block mb-1">Interactive Reviews</span>
              <span className="text-xs text-[#64748B] leading-relaxed">Paste code to instantly audit vulnerabilities and clean up code structures.</span>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/80 hover:bg-slate-100/20 hover:border-slate-200 transition-all duration-300 text-left">
              <span className="text-sm font-extrabold text-[#0B1530] block mb-1">Resume Analyzer</span>
              <span className="text-xs text-[#64748B] leading-relaxed">Align your project list with actual industry benchmarks for placement.</span>
            </div>
          </div>

          <div className="anim-tutor-item pt-2">
            <RouterLink 
              to="/ai-tutor"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#0B1530] hover:bg-[#1E293B] text-white font-bold rounded-2xl shadow-lg hover:shadow-slate-900/10 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-sm"
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
