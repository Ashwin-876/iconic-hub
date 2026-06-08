import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, Code, Database, Cpu, Lock, Check, Brain, 
  Clock, TrendingUp, Timer, Award, Globe, Users, Star, ArrowRight, BookOpen, 
  Search, Bell, Bookmark, ChevronLeft, ChevronRight, Activity, Calendar, HelpCircle
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function BackendDeveloperPath() {
  const scrollToCurriculum = () => {
    document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [progress, setProgress] = useState(() => Number(localStorage.getItem('progress_backend') ?? 0));
  const [enrolled, setEnrolled] = useState(false);
  const [activeStage, setActiveStage] = useState(() => Number(localStorage.getItem('stage_backend') ?? 0));

  const mentors = [
    {
      name: "Dr. Marcus Holloway",
      role: "System Architect",
      credentials: "PhD MIT, Ex-AWS Principal",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC23pGSUIIPwRvJdFRZfPEKPQcTvgpw8RriOzVGjdmKNmPrvRDxHQpK1IQyFrE62qcdkTB_FI2pYAZdCHNujSSWxONcxpLFjF7nwbvKlpmXYi-TrlR7H3ZQOtTsj1XhX3QX9VYvirJ03USNt2XZ9VWUwwoqHL1mH_sCDOPj0StaicqVFjXE8mQrBqnIRyfT-aH16RIpxlrrcnZrBqN3i4pk4ns3Nl0bf3lTgtLf1B5E0aF6IeH__KUEQ7kC_W67PYRhx13zRw8u8K0f"
    },
    {
      name: "David Sterling",
      role: "Database Specialist",
      credentials: "Author of High-Scale SQL",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr5fz5--3jcSZCaVNB5eGgl09wVgjY-7J7WqU0zhug6EDZTAh5YbeCftYkjD73r0vyLlAXuzrH-mKPuiz4lsn4G-E8yhhN2l6w5XyNvO5QYxn9L8MBQ6cW8hjy7ja4hnwk4BlTF8_kz6EkPOFRHlC_p2P4VsRe7S8GpYPIWiq_bY96_R3hKtB8sQBJYMpNguW-s8ZQP5tK67UhY1XoO4F6qrkW2xnbbtGpkDh1O1va1p4gxiuimbNMVOx7sm9_d_W12T2sQfWxME0i"
    }
  ];

  const handleResumeClick = () => {
    setProgress(prev => Math.min(100, prev + 5));
  };

  const handleEnrollClick = () => {
    setEnrolled(prev => !prev);
  };

  return (
    <PageTransition>
      <div className="bg-white text-slate-900 font-sans min-h-screen pb-16 selection:bg-blue-600/30 text-left">
        <style dangerouslySetInnerHTML={{ __html: `
          .glass-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px 0 rgba(255, 107, 0, 0.05);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .glass-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px 0 rgba(255, 107, 0, 0.08);
          }
          .roadmap-line {
            background: linear-gradient(to bottom, #FF6B00 0%, #FF6B00 65%, #e2bfb0 100%);
          }
          .vibrant-glow {
            box-shadow: 0 0 24px rgba(255, 107, 0, 0.35);
          }
          .hero-mesh {
            background-image: radial-gradient(at 0% 0%, rgba(255, 107, 0, 0.15) 0%, transparent 50%),
                              radial-gradient(at 100% 100%, rgba(255, 107, 0, 0.1) 0%, transparent 50%);
          }
        `}} />

        {/* Top Navigation Bar */}
        <Header />

        <main className="relative min-h-screen text-left">
          {/* Immersive Hero Section */}
          <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                alt="Backend Dev command center" 
                className="w-full h-full object-cover brightness-[0.6] contrast-[1.1]" 
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=1200" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white"></div>
              <div className="absolute inset-0 hero-mesh"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                Backend Developer Specialist
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                Architect high-performance distributed systems. Master relational databases, advanced caching strategies, API design patterns, and system security fundamentals.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <button onClick={handleResumeClick} className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm whitespace-nowrap vibrant-glow hover:translate-y-[-2px] hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-blue-600/20 flex items-center justify-center">
                  Continue Journey
                </button>
                <button onClick={scrollToCurriculum} className="px-8 py-3.5 bg-white/70 border border-blue-600/40 text-blue-600 rounded-xl font-bold text-sm whitespace-nowrap backdrop-blur-md hover:bg-[#fff1eb] hover:border-blue-600 transition-all active:scale-95 flex items-center justify-center">View Curriculum</button>
              </div>
            </div>
          </section>

          {/* Command Center Grid */}
          <section id="curriculum" className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Main Journey Column */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* Progress Overview Card */}
                <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center gap-10">
                  <div className="relative w-44 h-44 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-[#f8ddd2]" cx="88" cy="88" fill="transparent" r="76" stroke="currentColor" strokeWidth="14"></circle>
                      <circle 
                        className="text-blue-600 rounded-full drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]" 
                        cx="88" 
                        cy="88" 
                        fill="transparent" 
                        r="76" 
                        stroke="currentColor" 
                        strokeWidth="14"
                        strokeDasharray="477.5"
                        strokeDashoffset={477.5 - (477.5 * progress) / 100}
                        strokeLinecap="round"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold text-slate-900 leading-none">{progress}%</span>
                      <span className="text-xs font-semibold text-[#5a4136] mt-1">Complete</span>
                    </div>
                  </div>
                  <div className="flex-grow text-left">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Current Focus: Database &amp; SQL Query Optimization</h3>
                    <p className="text-sm text-[#5a4136] mb-6">
                      You are mastering indexing techniques. Complete the indexing practice lab to unlock Phase 3: "APIs &amp; Caching Strategies".
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-3">
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600/10 flex items-center justify-center cursor-pointer" title="OS Basics">
                          <Activity className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600/10 flex items-center justify-center cursor-pointer" title="Database Master">
                          <Database className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600/10 flex items-center justify-center cursor-pointer" title="API Wizard">
                          <Code className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="h-8 w-px bg-surface-stroke"></div>
                      <div>
                        <span className="text-xs font-semibold text-[#5a4136] block">Skill Mastery</span>
                        <span className="text-base font-bold text-slate-900">2 of 10 Badges Earned</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Roadmap Journey */}
                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Roadmap Journey</h3>
                      <p className="text-sm text-[#5c5f60]">Your path to Backend Engineering</p>
                    </div>
                    <span className="text-xs font-semibold px-4 py-1.5 bg-[#fee3d8] rounded-full text-[#5a4136] border border-surface-stroke">
                      Last update: Today
                    </span>
                  </div>
                  
                  <div className="relative pl-12 text-left">
                    <div className="absolute left-[15px] top-6 bottom-0 w-[3px] roadmap-line rounded-full"></div>
                    
                    {/* Phase 1 */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#00B894] border-[6px] border-white flex items-center justify-center z-10 shadow-lg shadow-[#00B894]/20 transition-transform group-hover:scale-110">
                        <Check className="w-4 h-4 text-white font-bold" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl bg-white/40 border-[#00B894]/10 hover:bg-white/60 hover:translate-x-3 transition-all cursor-pointer">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-slate-900">Phase 1: Programming &amp; Linux Foundations</h4>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B894] bg-[#00B894]/10 px-3 py-1 rounded-full border border-[#00B894]/20">
                            <span className="w-2 h-2 rounded-full bg-[#00B894]"></span>
                            Completed
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">Shell Scripting, Linux administration, and node backend scripting tools.</p>
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-blue-600 border-[6px] border-white z-10 vibrant-glow transition-transform group-hover:scale-110"></div>
                      <div className="glass-card p-6 rounded-2xl border border-blue-600/30 bg-blue-600/[0.03] hover:translate-x-3 transition-all cursor-pointer ring-4 ring-blue-600/5">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-slate-900">Phase 2: Relational Databases &amp; System Arch</h4>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-600/10 px-3 py-1 rounded-full border border-blue-600/20">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            In Progress
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed mb-4">PostgreSQL, SQL queries optimization, connection pooling, and ORM abstractions.</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-blue-600">Course Progress</span>
                            <span className="text-slate-900">{progress}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-[#ffeae1] rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(255,107,0,0.4)]" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#ffeae1] border-[6px] border-white flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                        <Lock className="w-3.5 h-3.5 text-[#5a4136]/40" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl opacity-60 bg-[#fff1eb]/30 hover:translate-x-3 transition-all cursor-pointer grayscale-[0.5]">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-slate-900">Phase 3: APIs, Caching &amp; Performance</h4>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5c5f60] bg-[#ffeae1] px-3 py-1 rounded-full">
                            Locked
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">REST vs GraphQL, Redis, and message queues (RabbitMQ/Kafka).</p>
                      </div>
                    </div>

                    {/* Phase 4 */}
                    <div className="relative group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#ffeae1] border-[6px] border-white flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                        <Lock className="w-3.5 h-3.5 text-[#5a4136]/40" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl opacity-60 bg-[#fff1eb]/30 hover:translate-x-3 transition-all cursor-pointer grayscale-[0.5]">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-slate-900">Phase 4: Distributed Systems &amp; Security</h4>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5c5f60] bg-[#ffeae1] px-3 py-1 rounded-full">
                            Locked
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">System design, rate limiting, OAuth/JWT, and microservices architectures.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-8 text-left">
                <div className="glass-card p-6 rounded-2xl bg-blue-600/[0.04] border border-blue-600/20 relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">AI Mentor Insight</h4>
                      <span className="text-[10px] font-bold text-blue-600">Real-time Analysis</span>
                    </div>
                  </div>
                  <p className="text-sm italic text-slate-900 leading-relaxed mb-6 pl-4 border-l-2 border-blue-600/30">
                    "Your relational schema model queries are fully normalized. We suggest exploring <span className="font-bold text-blue-600">transaction isolation levels</span> before moving to multi-node replication."
                  </p>
                  <button onClick={handleResumeClick} className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all text-xs">
                    Review Transactions
                  </button>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h4 className="text-base font-bold text-slate-900 mb-6">Learning Metrics</h4>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0984E3]/10 flex items-center justify-center text-[#0984E3]">
                          <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-[#5a4136]">Time Invested</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">28 hrs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#00B894]/10 flex items-center justify-center text-[#00B894]">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-[#5a4136]">Avg. Quiz Score</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">91%</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h4 className="text-base font-bold text-slate-900 mb-4">Next Milestone</h4>
                  <div className="relative overflow-hidden rounded-xl mb-5 group cursor-pointer">
                    <img 
                      alt="SQL schema design" 
                      className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-700" 
                      src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-5">
                      <div className="w-full text-left">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1 block">Active Lab</span>
                        <span className="text-white font-bold text-base">Lab: Optimizing Index Scans</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleResumeClick} className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all text-xs">
                    Start Lab
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Mentors */}
          <section className="py-12 max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Lead Architects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {mentors.map((mentor, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl flex gap-6">
                  <img alt={mentor.name} className="w-24 h-24 rounded-full object-cover bg-[#fff1eb]" src={mentor.image}/>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-slate-900">{mentor.name}</h4>
                    <p className="text-blue-600 text-xs font-semibold mb-2">{mentor.role}</p>
                    <p className="text-xs text-[#5c5f60]">{mentor.credentials}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
}
