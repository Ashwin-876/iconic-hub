import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, Code, Database, Cpu, Lock, Check, Brain, 
  Clock, TrendingUp, Timer, Award, Globe, Users, Star, ArrowRight, BookOpen, 
  Search, Bell, Bookmark, ChevronLeft, ChevronRight, Activity, Calendar, HelpCircle,
  MessageSquare, BarChart2, Shield, Flame, Trophy, Award as CertificateIcon, ArrowUpRight,
  TrendingDown, CheckCircle
} from 'lucide-react';
import { gsap } from 'gsap';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function AIEngineerPath() {
  const [progress, setProgress] = useState(65);
  const [activeStage, setActiveStage] = useState(4); // Transformer Architectures index is 4 (0-based)
  const [hoveredBadge, setHoveredBadge] = useState(null);

  const handleResumeClick = () => {
    setProgress(prev => Math.min(100, prev + 5));
  };

  const scrollToCurriculum = () => {
    document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
  };

  // GSAP animation references
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineConnectorRef = useRef(null);
  const stagesRef = useRef([]);

  useEffect(() => {
    // Staggered reveal of hero items
    gsap.fromTo('.hero-animate', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    // Floating cards soft animation loop
    gsap.to('.floating-card-1', { y: -8, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.floating-card-2', { y: 8, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.3 });
    gsap.to('.floating-card-3', { y: -10, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.6 });
    gsap.to('.floating-card-4', { y: 6, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.9 });

    // Animate roadmap progress line drawing
    if (timelineConnectorRef.current) {
      gsap.fromTo(timelineConnectorRef.current,
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2, ease: 'power2.out', delay: 0.5 }
      );
    }

    // Animate stage bubbles
    gsap.fromTo(stagesRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.8 }
    );
  }, []);

  const roadmapStages = [
    { name: 'AI Foundations', status: 'completed' },
    { name: 'Python for ML', status: 'completed' },
    { name: 'Data Analysis', status: 'completed' },
    { name: 'ML Fundamentals', status: 'completed' },
    { name: 'Transformer Architectures', status: 'active' },
    { name: 'Advanced GenAI', status: 'locked' },
    { name: 'LLM Fine-Tuning', status: 'locked' },
    { name: 'AI Agents', status: 'locked' },
    { name: 'Deployment', status: 'locked' },
    { name: 'AI System Design', status: 'locked' }
  ];

  const skillBadges = [
    { name: 'Python', desc: 'Syntax & core libraries mastery', icon: <Code className="w-4 h-4 text-sky-500" />, unlocked: true },
    { name: 'Deep Learning', desc: 'CNNs, RNNs & Backprop', icon: <Brain className="w-4 h-4 text-purple-500" />, unlocked: true },
    { name: 'Neural Networks', desc: 'Multi-layer perceptrons', icon: <Cpu className="w-4 h-4 text-emerald-500" />, unlocked: true },
    { name: 'AI Systems', desc: 'Optimization & pipelines', icon: <Database className="w-4 h-4 text-blue-500" />, unlocked: false },
    { name: 'Data Science', desc: 'Statistical testing & data handling', icon: <Activity className="w-4 h-4 text-rose-500" />, unlocked: false }
  ];

  const accomplishments = [
    { id: 1, title: 'AI Explorer', desc: 'Completed the AI Foundations milestone', icon: '🧭', date: 'Earned May 14' },
    { id: 2, title: 'Fast Learner', desc: 'Finished 5 modules in 48 hours', icon: '⚡', date: 'Earned May 28' },
    { id: 3, title: 'Problem Solver', desc: 'Passed all math quizzes with 100%', icon: '🧠', date: 'Earned Jun 01' },
    { id: 4, title: 'Consistency Master', desc: 'Logged in 7 days in a row', icon: '📅', date: 'Earned Jun 04' },
    { id: 5, title: 'Streak Champion', desc: 'Achieved a 12-day streak', icon: '🔥', date: 'Earned Jun 07' }
  ];

  const topLearners = [
    { rank: 1, name: 'Elena Rostova', pts: '18,450', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', progress: '95%' },
    { rank: 2, name: 'Alex Thompson', pts: '16,210', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', progress: '91%' },
    { rank: 3, name: 'Sofia Mendez', pts: '15,900', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', progress: '88%' },
    { rank: 4, name: 'Marcus Sterling', pts: '14,250', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', progress: '78%' },
    { rank: 5, name: 'Ashwin (You)', pts: '11,400', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9JivfbW9dCr4pdrDVYPrs1WlFjSdI3oUYsDOpFEjpiOYB39-qE5pGibnQ_mNbh5bo2ZIPM-CAmFI3zh9FfcEzRFK8ra6rbZxTHm1OGHvX4q36bQ71vL3rpDEU5WfexUtBkFOIqmuHS44xTBzJIUmUr82yPmlniMsxg_R8B955cvHqLRwglw3YISBA0zOBg9M3cK58QH3JOGqszIaF5oCCYWAFUawMZUGEapdyVBUwYIhvMCmyDVacz2MuD7T5iErBNVvYNn666thv', progress: '65%', highlight: true }
  ];

  const suggestedCourses = [
    { slug: 'genai-llm-agents', title: 'Generative AI & LLM Agent Architectures', duration: '14 Hours', level: 'Advanced', rating: 5.0, count: '9.4k', instructor: 'Dr. Sarah Chen', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400' },
    { slug: 'deep-learning-pytorch', title: 'Advanced Deep Learning & PyTorch', duration: '18 Hours', level: 'Intermediate', rating: 4.9, count: '14.2k', instructor: 'Marcus Chen', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400' },
    { slug: 'mlops-production-ml', title: 'MLOps: Production Machine Learning Systems', duration: '10 Hours', level: 'Advanced', rating: 4.8, count: '6.2k', instructor: 'David Sterling', img: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=400' },
    { slug: 'data-pipeline-spark', title: 'Data Pipeline Engineering with Apache Spark', duration: '12 Hours', level: 'Intermediate', rating: 4.7, count: '10.5k', instructor: 'Dr. Elena Volkov', img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <PageTransition>
      <div className="bg-white text-slate-900 font-sans min-h-screen pb-16 selection:bg-[#ff6b00]/30 selection:text-white relative overflow-hidden" ref={containerRef}>
        
        {/* Soft elegant radial glow filters for light theme */}
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#ff6b00]/5 to-transparent blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-blue-500/5 to-transparent blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-purple-500/3 to-transparent blur-[150px] pointer-events-none"></div>

        <Header />

        {/* 1. HERO BANNER */}
        <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden border-b border-black/5">
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              alt="Cinematic high-tech futuristic AI neural network background" 
              className="w-full h-full object-cover brightness-[0.5] contrast-[1.15]" 
              src="/ai_learning_bg.png" 
            />
            {/* Ambient Dark-to-Light gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-white"></div>
            
            {/* Ambient Particle SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-35 mix-blend-screen pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15%" cy="30%" r="2" fill="#ff6b00" className="animate-pulse" />
              <circle cx="85%" cy="20%" r="2.5" fill="#3b82f6" className="animate-pulse" />
              <circle cx="50%" cy="40%" r="1.5" fill="#fff" className="animate-pulse" />
              <line x1="15%" y1="30%" x2="50%" y2="40%" stroke="#ff6b00" strokeWidth="0.5" strokeOpacity="0.2" />
              <line x1="85%" y1="20%" x2="50%" y2="40%" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.2" />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-8">
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] tracking-tight hero-animate">
              AI &amp; Machine Learning Specialist
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] hero-animate">
              Master the architecture of intelligence. From foundational calculus to deploying large-scale transformer models, embark on an industry-focused learning journey.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 hero-animate">
              <button onClick={handleResumeClick} className="px-10 py-4.5 bg-gradient-to-r from-[#ff6b00] to-indigo-500 text-white rounded-2xl font-extrabold text-base whitespace-nowrap shadow-lg shadow-[#ff6b00]/20 hover:scale-105 transition-all duration-300">
                Continue Journey
              </button>
              <button onClick={scrollToCurriculum} className="px-10 py-4.5 bg-white/10 border border-white/25 text-white hover:bg-white/20 rounded-2xl font-extrabold text-base whitespace-nowrap backdrop-blur-md hover:scale-105 transition-all duration-300">
                View Curriculum
              </button>
            </div>
          </div>
        </section>

        {/* 2. PROGRESS & AI MENTOR SIDE-BY-SIDE */}
        <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Progress Tracking section */}
            <div className="lg:col-span-8 bg-white/80 border border-slate-200 p-8 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center gap-10 text-left">
              <div className="relative w-44 h-44 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-100" cx="88" cy="88" fill="transparent" r="76" stroke="currentColor" strokeWidth="12"></circle>
                  <circle 
                    className="text-[#ff6b00]" 
                    cx="88" 
                    cy="88" 
                    fill="transparent" 
                    r="76" 
                    stroke="currentColor" 
                    strokeWidth="12"
                    strokeDasharray="477.5"
                    strokeDashoffset={477.5 - (477.5 * progress) / 100}
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.2))' }}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-slate-900 leading-none">{progress}%</span>
                  <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Completed</span>
                </div>
              </div>

              <div className="flex-grow space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#ff6b00] uppercase tracking-wider block mb-1">Current Focus</span>
                  <h3 className="text-2xl font-bold text-slate-900 leading-snug">Transformer Architectures</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    You're crushing this path! Finish the active module on Self-Attention mechanism to unlock generative pre-training labs.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-3">Skill Badges &amp; Achievements</span>
                  <div className="flex flex-wrap gap-3">
                    {skillBadges.map((badge, idx) => (
                      <div 
                        key={idx} 
                        className={`relative px-3 py-1.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                          badge.unlocked 
                            ? 'bg-slate-50 border-slate-200 text-slate-900' 
                            : 'bg-white border-slate-100 text-slate-400'
                        }`}
                        onMouseEnter={() => setHoveredBadge(idx)}
                        onMouseLeave={() => setHoveredBadge(null)}
                      >
                        {badge.icon}
                        <span className="text-xs font-semibold">{badge.name}</span>
                        {!badge.unlocked && <Lock className="w-3.5 h-3.5 ml-1 text-slate-300" />}

                        {/* Hover Tooltip */}
                        {hoveredBadge === idx && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-[10px] text-slate-300 leading-normal z-30 shadow-xl">
                            <p className="font-bold text-white mb-0.5">{badge.name}</p>
                            <p>{badge.desc}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="px-3 py-1.5 rounded-xl bg-[#ff6b00]/10 border border-[#ff6b00]/20 text-[#ff6b00] text-xs font-bold">
                      +3 Earned
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: ChatGPT-inspired AI Mentor Insight */}
            <div className="lg:col-span-4 bg-white/80 border border-slate-200 p-6 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col justify-between text-left space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/10 flex items-center justify-center text-[#ff6b00] border border-[#ff6b00]/20">
                    <Brain className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      AI Mentor Insight
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    </h4>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Real-time Performance Analysis</span>
                  </div>
                </div>
              </div>

              {/* Chat-bubble content */}
              <div className="space-y-4 text-xs leading-relaxed text-slate-600">
                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-3">
                  <p>
                    👋 <strong className="text-slate-900">Hi Ashwin,</strong> based on your recent labs:
                  </p>
                  <ul className="space-y-2 pl-2 list-disc list-inside">
                    <li><span className="text-emerald-600 font-bold">Strength:</span> Solid neural architecture fundamentals and tensor operations.</li>
                    <li><span className="text-blue-500 font-bold">Improvement needed:</span> Practice Gradient Descent parameter optimization and learning rate schedulers.</li>
                    <li><span className="text-blue-600 font-bold">Timeline:</span> Projected to complete in <strong className="text-slate-900">14 days</strong>.</li>
                  </ul>
                  <p className="border-t border-slate-200/60 pt-2 mt-1 text-[10px] text-slate-500">
                    💡 Next recommended step: <strong className="text-slate-900">Lab: Fine-Tuning BERT</strong>
                  </p>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/15">
                Review Recommendations
              </button>
            </div>

          </div>
        </section>

        {/* 3. INTERACTIVE ROADMAP (GSAP connect animations) */}
        <section id="curriculum" className="max-w-7xl mx-auto px-6 mb-16 text-left">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Learning Roadmap</h2>
            <p className="text-sm text-slate-500 mt-2">Staggered timeline visualizer guiding your specialized curriculum.</p>
          </div>

          {/* Wrapping Grid Roadmap View */}
          <div className="relative bg-white/80 border border-slate-200 rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {roadmapStages.map((stage, idx) => {
                const isActive = stage.status === 'active';
                const isCompleted = stage.status === 'completed';
                
                return (
                  <div 
                    key={idx} 
                    ref={el => stagesRef.current[idx] = el}
                    className={`flex flex-col items-center text-center p-6 rounded-2xl border transition-all ${
                      isActive 
                        ? 'bg-blue-500/5 border-[#ff6b00] shadow-md shadow-[#ff6b00]/5 ring-2 ring-[#ff6b00]/10' 
                        : isCompleted 
                        ? 'bg-emerald-500/[0.02] border-emerald-500/20' 
                        : 'bg-slate-50 border-slate-200/50'
                    } hover:scale-[1.02] duration-300`}
                  >
                    {/* Circle Node */}
                    <div className="mb-4">
                      {isCompleted ? (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/10">
                          <Check className="w-5 h-5 font-bold" />
                        </div>
                      ) : isActive ? (
                        <div className="w-12 h-12 rounded-full bg-[#ff6b00] text-white flex items-center justify-center shadow-lg shadow-[#ff6b00]/20 ring-4 ring-[#ff6b00]/10 animate-pulse">
                          <Zap className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 text-slate-400 flex items-center justify-center">
                          <Lock className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Metadata text */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Stage {idx + 1}</span>
                      <h4 className={`text-sm font-bold truncate max-w-[130px] ${isActive ? 'text-[#ff6b00]' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                        {stage.name}
                      </h4>
                      <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full mt-2 ${
                        isCompleted ? 'bg-emerald-500/10 text-emerald-600' : isActive ? 'bg-blue-500/10 text-[#ff6b00]' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {stage.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. ANALYTICS & RADAR PROFICIENCY CHART */}
        <section className="max-w-7xl mx-auto px-6 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left: 4 Analytics Glass Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Performance Analytics</h2>
            <p className="text-sm text-slate-500">Track and optimize your learning metrics in real time.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between text-slate-500 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider">Learning Hours</span>
                  <Clock className="w-5 h-5 text-sky-500" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">42.5 hrs</h3>
                <p className="text-[10px] text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+4.2 hours this week</span>
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between text-slate-500 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider">Projects Completed</span>
                  <Code className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">8 Projects</h3>
                <p className="text-[10px] text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>On track for next milestone</span>
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between text-slate-500 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider">Quiz Performance</span>
                  <Award className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">94% Avg</h3>
                <p className="text-[10px] text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Top 3% percentile quiz scores</span>
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between text-slate-500 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider">Skill Growth Rate</span>
                  <TrendingUp className="w-5 h-5 text-[#ff6b00]" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 font-mono">+12.4%</h3>
                <p className="text-[10px] text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Month-over-month increase</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Radar Chart Container */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-xl space-y-6">
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">Proficiency Matrix</h3>
            
            {/* Custom SVG Radar Chart */}
            <div className="relative w-full flex justify-center py-4">
              <svg width="220" height="220" viewBox="0 0 220 220" className="overflow-visible">
                {/* Radar Grid Circles */}
                <circle cx="110" cy="110" r="30" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                <circle cx="110" cy="110" r="60" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                
                {/* Radial Grid Lines (6 axes) */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const x = 110 + 90 * Math.cos((angle * Math.PI) / 180);
                  const y = 110 + 90 * Math.sin((angle * Math.PI) / 180);
                  return (
                    <line key={i} x1="110" y1="110" x2={x} y2={y} stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                  );
                })}

                {/* Radar Plot Polyline Area */}
                <polygon 
                  points={`
                    ${110 + 95 * 0.9 * Math.cos((0 * Math.PI)/180)},${110 + 95 * 0.9 * Math.sin((0 * Math.PI)/180)}
                    ${110 + 90 * 0.9 * Math.cos((60 * Math.PI)/180)},${110 + 90 * 0.9 * Math.sin((60 * Math.PI)/180)}
                    ${110 + 85 * 0.9 * Math.cos((120 * Math.PI)/180)},${110 + 85 * 0.9 * Math.sin((120 * Math.PI)/180)}
                    ${110 + 70 * 0.9 * Math.cos((180 * Math.PI)/180)},${110 + 70 * 0.9 * Math.sin((180 * Math.PI)/180)}
                    ${110 + 60 * 0.9 * Math.cos((240 * Math.PI)/180)},${110 + 60 * 0.9 * Math.sin((240 * Math.PI)/180)}
                    ${110 + 50 * 0.9 * Math.cos((300 * Math.PI)/180)},${110 + 50 * 0.9 * Math.sin((300 * Math.PI)/180)}
                  `}
                  fill="rgba(255, 107, 0, 0.15)"
                  stroke="#ff6b00"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(255, 107, 0, 0.2))' }}
                />

                {/* Axis Labels */}
                <text x="110" y="8" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">Python</text>
                <text x="215" y="65" textAnchor="start" fill="#64748b" fontSize="9" fontWeight="bold">ML</text>
                <text x="210" y="165" textAnchor="start" fill="#64748b" fontSize="9" fontWeight="bold">DL</text>
                <text x="110" y="218" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">NLP</text>
                <text x="5" y="165" textAnchor="end" fill="#64748b" fontSize="9" fontWeight="bold">LLMs</text>
                <text x="0" y="65" textAnchor="end" fill="#64748b" fontSize="9" fontWeight="bold">Deploy</text>
              </svg>
            </div>

            <div className="border-t border-slate-100 pt-4 text-xs space-y-2.5">
              <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">AI-Generated Skills Summary</span>
              <p className="text-slate-600 leading-normal">
                🔥 You display exceptional knowledge in <strong className="text-slate-900">Python scripting &amp; ML concepts</strong>. We recommend focusing on intermediate fine-tuning pipelines and deployment parameters in modules 9 &amp; 10.
              </p>
            </div>
          </div>

        </section>

        {/* 5. CONTINUE LEARNING & ACHIEVEMENTS */}
        <section className="max-w-7xl mx-auto px-6 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left: 8 cols - Continue Learning Card & Achievements Grid */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Continue Learning recommendation card */}
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Continue Learning</h3>
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-full md:w-48 aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    alt="Transformer Attention code mockup representation" 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#ff6b00] text-white flex items-center justify-center">
                      <Zap className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-[#ff6b00] rounded text-[9px] font-extrabold uppercase border border-blue-100">Active Lab</span>
                    <span className="text-xs text-slate-500 font-semibold">• 45 mins</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Lab: Fine-Tuning BERT for Custom Classification</h4>
                  <p className="text-xs text-slate-600 leading-normal">
                    Get hands-on coding. Set up multi-head self-attention weight parameters and optimize predictions in PyTorch.
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500">Progression: Module 5 / 10</span>
                    <button className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-indigo-500 hover:from-[#ff7c1a] hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs transition-all flex items-center gap-1">
                      <span>Start Lab</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Showcase Area */}
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Your Badges &amp; Achievements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {accomplishments.map((badge) => (
                  <div 
                    key={badge.id}
                    className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center text-center space-y-3 hover:bg-slate-50 transition-all shadow-sm group cursor-pointer"
                  >
                    <span className="text-3xl block group-hover:scale-125 transition-transform duration-300">{badge.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 block">{badge.title}</h4>
                      <p className="text-[9px] text-slate-500 leading-normal mt-1">{badge.desc}</p>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{badge.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: 4 cols - Leaderboard Card */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Leaderboard</h3>
            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Top Learners</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full bg-emerald-500/10">Active Tier</span>
              </div>

              <div className="space-y-3">
                {topLearners.map((learner) => (
                  <div 
                    key={learner.rank} 
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      learner.highlight 
                        ? 'bg-[#ff6b00]/5 border-[#ff6b00]/20 shadow-sm' 
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black w-4 text-center ${
                        learner.rank === 1 ? 'text-blue-500' : learner.rank === 2 ? 'text-slate-400' : learner.rank === 3 ? 'text-blue-500' : 'text-slate-400'
                      }`}>
                        #{learner.rank}
                      </span>
                      <img 
                        src={learner.img} 
                        alt={learner.name} 
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div className="text-left">
                        <span className="text-xs font-bold text-slate-900 block leading-none">{learner.name}</span>
                        <span className="text-[9px] text-slate-500 mt-1 block">Level {Math.ceil(parseFloat(learner.progress) / 10)}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="text-xs font-bold text-[#ff6b00] block">{learner.pts} XP</span>
                      <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wider">{learner.progress} Complete</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* 6. RECOMMENDED COURSES CAROUSEL */}
        <section className="max-w-7xl mx-auto px-6 mb-8 text-left">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore Path Modules</h2>
              <p className="text-sm text-slate-500 mt-2">Highly relevant specialized courses suggested by your learning metrics.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedCourses.map((course, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:bg-slate-50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="h-40 relative overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-extrabold text-[#ff6b00] border border-[#ff6b00]/25">
                    {course.level}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                      <div className="flex items-center gap-1 text-blue-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{course.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                      {course.title}
                    </h4>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                        <Users className="w-3 h-3 text-slate-500" />
                      </div>
                      <span>{course.instructor}</span>
                    </div>

                    <Link to={`/enroll/${course.slug}`} className="w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] border border-[#2563EB] hover:shadow-lg hover:shadow-blue-500/25 text-white font-bold rounded-xl active:scale-[0.99] transition-all text-center block">
                      Enroll
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
