import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Terminal, Cpu, Award, Github, Users, Bell, User, Star, Search, Code, 
  Layout, Database, Shield, Zap, Sparkles, Brain, Smartphone, Gamepad2, 
  GitBranch, ArrowRight, Play, Save, Share2, Trash2, Eye 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

// Subcomponents
import CodingPlayground from './CodingPlayground';
import CodingChallenges from './CodingChallenges';
import DeveloperPortfolio from './DeveloperPortfolio';
import GitHubIntegration from './GitHubIntegration';

const ROADMAPS = [
  { name: 'Full Stack', icon: Layout, duration: '12 Weeks', students: '12k', diff: 'Intermediate' },
  { name: 'React Mastery', icon: Sparkles, duration: '6 Weeks', students: '8k', diff: 'Beginner' },
  { name: 'Node.js Core', icon: Terminal, duration: '8 Weeks', students: '5k', diff: 'Advanced' },
  { name: 'Cloud Arch', icon: Cpu, duration: '10 Weeks', students: '3k', diff: 'Advanced' },
  { name: 'AI Engineering', icon: Brain, duration: '16 Weeks', students: '15k', diff: 'Intermediate' },
  { name: 'Data Science', icon: Star, duration: '14 Weeks', students: '9k', diff: 'Intermediate' },
  { name: 'Cyber Security', icon: Shield, duration: '12 Weeks', students: '4k', diff: 'Advanced' },
  { name: 'Mobile App', icon: Smartphone, duration: '8 Weeks', students: '7k', diff: 'Beginner' },
  { name: 'Game Dev', icon: Gamepad2, duration: '20 Weeks', students: '6k', diff: 'Intermediate' },
  { name: 'DevOps Ops', icon: GitBranch, duration: '10 Weeks', students: '2k', diff: 'Advanced' }
];

const PROJECTS = [
  { title: "Next-Gen E-Commerce", tech: ["React", "Stripe", "PostgreSQL"], img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop" },
  { title: "Real-time Chat App", tech: ["Socket.io", "Node.js", "Redis"], img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
  { title: "Fintech Dashboard", tech: ["D3.js", "Next.js", "AWS"], img: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop" },
  { title: "Spatial Music Player", tech: ["Web Audio", "Three.js", "Vue"], img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop" },
  { title: "AI Content Generator", tech: ["OpenAI", "Python", "React"], img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop" },
  { title: "Decentralized LMS", tech: ["Solidity", "Web3.js", "IPFS"], img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" }
];

export default function DeveloperHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hub'); // hub, playground, challenges, portfolio, github
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [compilerLang, setCompilerLang] = useState('Python 3.11');

  const isPlayground = activeTab === 'playground';

  return (
    <PageTransition>
      <div className={`${isPlayground ? 'h-screen overflow-hidden flex flex-col bg-white' : 'min-h-screen pb-16 bg-[#f8fafc]'} text-[#261812] font-sans selection:bg-[#2563EB] selection:text-white`}>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .tech-float { animation: float 6s ease-in-out infinite; }
          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.2s; }
          .stagger-3 { animation-delay: 0.3s; }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .glass-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(37, 99, 235, 0.08);
          }
          .vibrant-shadow {
            box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.5);
          }
          .vibrant-shadow:hover {
            box-shadow: 0 15px 35px -5px rgba(37, 99, 235, 0.6);
          }
        `}} />

        {/* Navigation Bar */}
        <Header />

        <main className={`${isPlayground ? 'flex-1 min-h-0 w-full flex flex-col' : 'max-w-7xl mx-auto px-6 mt-8 space-y-12'} text-left`}>
          
          {/* Internal Hub Tab Selection Banner - Hidden in Playground Mode */}
          {!isPlayground && (
            <div className="bg-white border border-surface-stroke rounded-[24px] p-4 shadow-sm flex flex-wrap gap-2">
              {[
                { id: 'hub', label: 'Developer Hub Home' },
                { id: 'playground', label: 'Coding Playground' },
                { id: 'challenges', label: 'Coding Challenges' },
                { id: 'portfolio', label: 'Portfolio Builder' },
                { id: 'github', label: 'GitHub Sync' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 text-xs font-bold transition-all rounded-xl ${
                    activeTab === tab.id
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/10'
                      : 'bg-slate-50 hover:bg-slate-100 border border-surface-stroke text-[#5a4136]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Subpages rendering */}
          {activeTab === 'hub' && (
            <div className="space-y-16 animate-fadeIn">
              
              {/* Hero Section */}
              <section className="relative pt-8 pb-12 overflow-visible">
                {/* Floating Tech Background */}
                <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                  <div className="tech-float stagger-1 absolute top-10 left-4 opacity-20 text-[#2563EB]">
                    <Code className="w-16 h-16" />
                  </div>
                  <div className="tech-float stagger-2 absolute top-24 right-12 opacity-20 text-[#2563EB]">
                    <Terminal className="w-20 h-20" />
                  </div>
                  <div className="tech-float stagger-3 absolute bottom-8 left-1/4 opacity-15 text-[#2563EB]">
                    <Database className="w-24 h-24" />
                  </div>
                  <div className="tech-float stagger-1 absolute top-1/2 right-1/4 opacity-15 text-[#2563EB]">
                    <Cpu className="w-14 h-14" />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-surface-stroke">
                      <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#5a4136]">
                        AI-Powered Learning Platform
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#261812] leading-tight">
                      Learn, Build & <span className="text-[#2563EB]">Deploy</span> Code Faster
                    </h1>
                    <p className="text-lg text-[#5c5f60] max-w-lg">
                      Master programming through hands-on projects, live coding environments, and AI-powered mentorship. The ultimate sandbox for the next generation of creators.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <button onClick={() => setActiveTab('playground')} className="px-8 py-4 bg-[#2563EB] text-white rounded-full vibrant-shadow hover:scale-105 active:scale-95 transition-all text-sm font-bold">
                        Open IDE Playground
                      </button>
                      <button onClick={() => setActiveTab('challenges')} className="px-8 py-4 border border-surface-stroke text-[#5a4136] rounded-full hover:bg-slate-50 transition-all text-sm font-bold">
                        Browse Challenges
                      </button>
                    </div>
                    <div className="flex items-center gap-6 pt-8">
                      <div className="flex -space-x-3">
                        <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Developer Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrnRLyiLxmCwrMDWqZwczjY81Crbi16zVml6uxZj6NsmtKUnppPyh0av6U3MWfwAdzf4AabUqvDmgFaJPPcG9l06RZilHzwN2TV1pK3OH9HZXiBnYg9lvHyj4ozECYe4s0w31lkQfrAxZsiiQZ0QPBF1xS5QxvLBtlEvsuzOoUJ_ww9epWN4Cn0_m-uoV-9rV60lqI-7NSvH4iGy5Twmd5gMowLZzHRqPmynEpx1KgxWDZFU8u0B9Hn6XYxE_5IBCVNE8yn7sIHDNZ" />
                        <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Developer Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxDO87c_nSOdDJJJ9MagaKUeRzGPlZ9ad5vbIkWU1ynTWU86EMER6boaoMd3o1zogjWFaNTFHbGIYHIjXNVfQrgdS7bcR6D69gbCdGWKbf4T4xCXATx8Zw0kJFNmyvkFYGctymQfe90QZzlyTF_VEKM55GPmMIWhdNaWZyHUsPMvineBRdikt9ST8fDUGqpd4JnocWYsY8OaPT9jJ6iXgd_1bPkqMHaC6R3bY2sqHbL9ZHFg9ZOWhm0S_U0XIya6EfLDoZBmz3ok2w" />
                        <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Developer Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOpVbD5pg89kIyNrVuioE1g50-81nXnwUNdAKsg1Lm4iUDPief9i_cZVJMhsrsMu1YL3PTOmtI72PPyf5GTToqwwTlw42ZTQxciA8i2KiFv3q8LftBJMAMz5AN4teZEX5ytpe0_va4OhQzUq6PY2Bl2l_H31oAlyuUZUyhssIrGnH4vAkAmtxIb8bLI-sTQa5mHJ05ULSPPZ2UmHLpzHIaynfHo9tdRCeFIXt6oTtpPEYAnm58wNJuCS3Eu-os3UR4glyaEnt64USl" />
                      </div>
                      <p className="text-xs font-semibold text-[#5c5f60]">Joined by <span className="text-[#261812] font-bold">100k+ developers</span> worldwide</p>
                    </div>
                  </div>

                  {/* Floating Code Editor Visual */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-[#2563EB]/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative glass-card rounded-[24px] overflow-hidden border border-surface-stroke shadow-2xl">
                      <div className="bg-[#1A1A1B] p-4 flex items-center justify-between border-b border-white/10">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-white/40 text-xs font-mono">main.py</div>
                        <div className="text-white/40 text-xs hover:text-white cursor-pointer">
                          <Zap className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="bg-[#1A1A1B]/95 p-6 min-h-[320px] font-mono text-xs leading-relaxed text-left">
                        <div className="flex gap-4">
                          <span className="text-white/20 select-none w-4">1</span>
                          <span className="text-white"><span className="text-[#2563EB]">import</span> kinetic_glass</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/20 select-none w-4">2</span>
                          <span></span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/20 select-none w-4">3</span>
                          <span className="text-white"><span className="text-[#2563EB]">def</span> <span className="text-[#0984E3]">initialize_success</span>(developer):</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/20 select-none w-4">4</span>
                          <span className="text-white pl-4"><span className="text-[#2563EB]">print</span>(<span className="text-[#00B894]">f"Welcome to the Lab, {"{"}developer{"}"}!"</span>)</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/20 select-none w-4">5</span>
                          <span className="text-white pl-4"><span className="text-[#2563EB]">return</span> kinetic_glass.<span className="text-[#0984E3]">launch</span>()</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/20 select-none w-4">6</span>
                          <span></span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/20 select-none w-4">7</span>
                          <span className="text-[#939a9c]"># Start your journey today</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/20 select-none w-4">8</span>
                          <span className="text-white"><span className="text-[#0984E3]">initialize_success</span>(<span className="text-[#00B894]">"Future Pro"</span>)</span>
                        </div>
 
                        {/* Compiler Output Mockup */}
                        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-[#2563EB] font-bold text-[10px] uppercase tracking-widest mb-2">Live Compiler Output</div>
                          <div className="text-[#00B894]">&gt; Welcome to the Lab, Future Pro!</div>
                          <div className="text-[#00B894]">&gt; Deployment sequence initialized...</div>
                          <div className="text-white/40">&gt; Done in 0.4s</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Accelerated Learning Paths Section */}
              <section className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-[#261812]">Accelerated Learning Paths</h2>
                  <p className="text-[#5c5f60] max-w-2xl mx-auto">
                    Structured curriculum designed by industry experts to take you from zero to production-ready in weeks, not years.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {ROADMAPS.map((p, idx) => {
                    const IconComponent = p.icon;
                    return (
                      <div key={idx} className="glass-card p-6 rounded-[24px] flex flex-col h-full group">
                        <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mb-6 group-hover:bg-[#2563EB] transition-colors duration-300">
                          <IconComponent className="w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-bold text-[#261812] mb-2">{p.name}</h3>
                        <div className="space-y-2 mb-6 flex-grow">
                          <div className="flex items-center gap-2 text-[#5c5f60] text-xs">
                            <span className="font-semibold">Duration:</span>
                            <span>{p.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#5c5f60] text-xs">
                            <span className="font-semibold">Students:</span>
                            <span>{p.students}</span>
                          </div>
                          <div className="inline-block px-3 py-1 rounded-full bg-surface-container-low text-[10px] font-bold text-[#5a4136] uppercase tracking-tighter mt-2">
                            {p.diff}
                          </div>
                        </div>
                        <Link 
                          to={`/developer-hub/program/${p.name.toLowerCase().replace(/ /g, '-')}`}
                          className="w-full text-center text-xs font-bold py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all shadow-md shadow-blue-500/5 hover:shadow-lg hover:shadow-blue-500/10 block"
                        >
                          Join Program
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Online Compiler Section */}
              <section className="py-12 bg-surface-container-low rounded-[32px] border border-surface-stroke overflow-hidden" id="compiler">
                <div className="px-8 flex flex-col lg:flex-row gap-12 items-center">
                  <div className="lg:w-1/3 space-y-6 text-left">
                    <h2 className="text-3xl font-bold text-[#261812]">Native Online Compiler</h2>
                    <p className="text-sm text-[#5c5f60] leading-relaxed">
                      No setup required. Write, compile, and execute code in 40+ languages directly in your browser with our low-latency execution engine.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00B894]/10 flex items-center justify-center text-[#00B894] font-bold text-xs">✓</span>
                        <span className="text-sm font-medium text-[#261812]">Low-latency containerized execution</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00B894]/10 flex items-center justify-center text-[#00B894] font-bold text-xs">✓</span>
                        <span className="text-sm font-medium text-[#261812]">Multi-file project support</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00B894]/10 flex items-center justify-center text-[#00B894] font-bold text-xs">✓</span>
                        <span className="text-sm font-medium text-[#261812]">Collaborative live coding rooms</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="lg:w-2/3 w-full">
                    <div className="glass-card rounded-[24px] overflow-hidden shadow-xl border-surface-stroke">
                      {/* Editor Header */}
                      <div className="bg-[#e6f0ff] px-6 py-4 flex flex-wrap gap-4 items-center justify-between border-b border-surface-stroke">
                        <div className="flex items-center gap-4">
                          <select 
                            value={compilerLang}
                            onChange={(e) => setCompilerLang(e.target.value)}
                            className="bg-white border border-surface-stroke rounded-lg px-4 py-1.5 text-xs font-mono outline-none focus:ring-2 focus:ring-[#2563EB] text-[#261812]"
                          >
                            <option>Python 3.11</option>
                            <option>JavaScript (Node.js)</option>
                            <option>C++ (GCC 12)</option>
                            <option>Java 17</option>
                          </select>
                          <span className="text-[#5c5f60] font-mono text-xs">unsaved_project_01</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-surface-stroke rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors text-[#261812]">
                            <Save className="w-3.5 h-3.5" /> Save
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-surface-stroke rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors text-[#261812]">
                            <Share2 className="w-3.5 h-3.5" /> Share
                          </button>
                          <button onClick={() => setActiveTab('playground')} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#2563EB] text-white rounded-lg text-xs font-bold vibrant-shadow active:scale-95 transition-all">
                            <Play className="w-3.5 h-3.5 fill-white" /> Run Code
                          </button>
                        </div>
                      </div>
                      
                      {/* Editor Body */}
                      <div className="grid grid-rows-[300px_150px] text-left">
                        <div className="bg-white p-6 font-mono text-xs flex gap-4 overflow-auto">
                          <div className="text-[#5a4136]/30 text-right select-none w-8 border-r border-slate-100 pr-2">
                            1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10
                          </div>
                          <div className="flex-grow whitespace-pre text-[#261812]">
                            <span className="text-[#2563EB] font-bold">class</span> <span className="text-[#0984E3]">CodeLabChallenge</span>:<br/>
                            {"    "}<span className="text-[#2563EB] font-bold">def</span> <span className="text-[#0984E3]">__init__</span>(self, name):<br/>
                            {"        "}self.name = name<br/>
                            {"        "}self.points = 0<br/>
                            {"    "}<br/>
                            {"    "}<span className="text-[#2563EB] font-bold">def</span> <span className="text-[#0984E3]">solve</span>(self):<br/>
                            {"        "}self.points += 100<br/>
                            {"        "}<span className="text-[#2563EB] font-bold">print</span>(f<span className="text-[#00B894]">"Challenge completed by {'{'}self.name{'}'}!"</span>)<br/>
                            <br/>
                            user = <span className="text-[#0984E3]">CodeLabChallenge</span>(<span className="text-[#00B894]">"Nexus_Dev"</span>)<br/>
                            user.<span className="text-[#0984E3]">solve</span>()
                          </div>
                        </div>
                        <div className="bg-[#1A1A1B] p-6 border-t border-surface-stroke">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Console Output</span>
                            <Trash2 className="w-3.5 h-3.5 text-white/40 hover:text-white cursor-pointer" />
                          </div>
                          <div className="font-mono text-xs text-white/90">
                            <div className="text-[#00B894]">Compiling... Success</div>
                            <div className="">Challenge completed by Nexus_Dev!</div>
                            <div className="mt-2 text-white/40">Program exited with code 0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured Projects Section */}
              <section className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4 text-left">
                    <h2 className="text-3xl font-bold text-[#261812]">Build Real-World Portfolio Projects</h2>
                    <p className="text-sm text-[#5c5f60] max-w-xl">
                      Don't just learn syntax. Build production-grade applications that hiring managers actually care about.
                    </p>
                  </div>
                  <button className="text-xs font-bold text-[#2563EB] flex items-center gap-2 group shrink-0">
                    Browse all projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PROJECTS.map((proj, idx) => (
                    <div key={idx} className="glass-card rounded-[24px] overflow-hidden group flex flex-col">
                      <div className="relative h-52 overflow-hidden">
                        <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                          <div className="flex flex-wrap gap-2">
                            {proj.tech.map((t, i) => (
                              <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between text-left">
                        <h4 className="text-lg font-bold text-[#261812] mb-6">{proj.title}</h4>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => navigate(`/developer-hub/join/${idx}`)}
                            className="flex-1 text-xs font-bold py-2.5 rounded-xl bg-[#2563EB] text-white vibrant-shadow"
                          >
                            Join Project
                          </button>
                          <button className="px-4 py-2.5 rounded-xl border border-surface-stroke text-[#5c5f60] hover:bg-surface-container-low transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}

          {activeTab === 'playground' && (
            <CodingPlayground 
              onExit={() => setActiveTab('hub')} 
              challenge={selectedChallenge} 
            />
          )}
          {activeTab === 'challenges' && (
            <CodingChallenges 
              onSelectChallenge={(prob) => {
                setSelectedChallenge(prob);
                setActiveTab('playground');
              }} 
            />
          )}
          {activeTab === 'portfolio' && <DeveloperPortfolio />}
          {activeTab === 'github' && <GitHubIntegration />}

        </main>
      </div>
    </PageTransition>
  );
}

