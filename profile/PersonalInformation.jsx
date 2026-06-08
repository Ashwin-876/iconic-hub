import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Award, Code, Database, Cpu, Flame, Search, Bell, Bookmark, 
  ArrowRight, BookOpen, Activity, Calendar, Shield, CreditCard, Settings, 
  Sparkles, ExternalLink, Check, Plus, Trash2, CheckCircle2, TrendingUp, BarChart2,
  Lock, Clock, Users, ArrowUpRight, CheckSquare, Brain, Trophy, Target, Star, Globe, Github, Linkedin, Twitter
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function PersonalInformation() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const navigate = useNavigate();
  const [xp, setXp] = useState(14250);
  const [streak, setStreak] = useState(12);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [starredProjects, setStarredProjects] = useState({ 1: true, 3: false });
  const [selectedCert, setSelectedCert] = useState(null);

  // Personal Info Form States
  const [name, setName] = useState('Ashwin');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }
  }, []);
  const [role, setRole] = useState('AI & Frontend Systems Engineer');
  const [location, setLocation] = useState('San Francisco, CA');
  const [bio, setBio] = useState('Passionate about web architectures, deep learning pipelines, and building interactive, high-performance user experiences.');
  const [githubUrl, setGithubUrl] = useState('https://github.com/ashwin');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/ashwin');
  const [twitterUrl, setTwitterUrl] = useState('https://twitter.com/ashwin');

  // Projects list state
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Interactive Glassmorphism Sandbox",
      desc: "A client-side compiler and sandbox playground showcasing advanced CSS backdrop filters and real-time layout rendering.",
      tech: ["React", "Tailwind CSS", "Vite"],
      stars: 43,
      link: "#"
    },
    {
      id: 2,
      title: "Distributed Pipeline Node Scheduler",
      desc: "Optimized connection pooling and task scheduler written in Go, handling up to 10k messages per second using RabbitMQ.",
      tech: ["Go", "RabbitMQ", "PostgreSQL"],
      stars: 28,
      link: "#"
    },
    {
      id: 3,
      title: "GenAI Transformer Attention Maps Visualizer",
      desc: "Visual interface for analyzing transformer weights and attention mappings during token parsing tasks.",
      tech: ["Python", "TensorFlow", "React"],
      stars: 56,
      link: "#"
    }
  ]);

  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjTitle || !newProjDesc) return;
    const proj = {
      id: Date.now(),
      title: newProjTitle,
      desc: newProjDesc,
      tech: newProjTech ? newProjTech.split(',').map(t => t.trim()) : ["React"],
      stars: 0,
      link: "#"
    };
    setProjects([proj, ...projects]);
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjTech('');
    triggerToast('Project added to portfolio! 🚀');
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    triggerToast('Project removed from portfolio.');
  };

  const toggleStarProject = (id) => {
    setStarredProjects(prev => {
      const isStarred = !prev[id];
      setProjects(currentProjs => currentProjs.map(p => {
        if (p.id === id) {
          return { ...p, stars: isStarred ? p.stars + 1 : p.stars - 1 };
        }
        return p;
      }));
      return { ...prev, [id]: isStarred };
    });
    triggerToast(starredProjects[id] ? 'Removed star' : 'Project starred! ⭐');
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const claimDailyXP = () => {
    setXp(prev => prev + 250);
    setStreak(prev => prev + 1);
    triggerToast('Daily XP Reward Claimed! +250 XP 🚀');
  };

  const saveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', name);
    triggerToast('Profile information updated successfully! ✨');
  };

  // Mock analytics data
  const weeklyHours = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 4.2 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 3.5 },
    { day: "Fri", hours: 6.0 },
    { day: "Sat", hours: 2.5 },
    { day: "Sun", hours: 1.5 },
  ];

  const skillMetrics = [
    { name: "Frontend Architecture", level: 88, color: "bg-blue-600", percentColor: "text-blue-600" },
    { name: "Deep Learning (GenAI)", level: 78, color: "bg-cyan-500", percentColor: "text-cyan-500" },
    { name: "Systems design & SQL", level: 75, color: "bg-blue-500", percentColor: "text-blue-500" },
    { name: "Database Engineering", level: 70, color: "bg-emerald-500", percentColor: "text-emerald-500" },
    { name: "DevOps & CI/CD", level: 55, color: "bg-purple-500", percentColor: "text-purple-500" }
  ];

  // Verified Certificates Data
  const certificates = [
    {
      id: "cert-ai",
      title: "AI & ML Specialist Path Diploma",
      issuer: "Kinetic Glass LMS & OpenAI Partnership",
      date: "Oct 2025",
      idCode: "KG-AIML-99882",
      color: "from-blue-500 to-indigo-500",
      skills: ["Neural Networks", "Transformer Scaling", "LLM Fine-tuning", "PyTorch"]
    },
    {
      id: "cert-react",
      title: "React Core Architectures",
      issuer: "ICONIC HUB Developer Guild",
      date: "Aug 2025",
      idCode: "KG-REACT-34201",
      color: "from-cyan-500 to-blue-600",
      skills: ["Concurrent Mode", "Suspense", "State Management", "VDOM Tuning"]
    },
    {
      id: "cert-postgres",
      title: "High-Scale PostgreSQL Engineering",
      issuer: "ICONIC HUB System Design Academy",
      date: "May 2025",
      idCode: "KG-DB-88291",
      color: "from-emerald-500 to-teal-600",
      skills: ["Consistent Hashing", "Connection Pooling", "WAL Tuning", "Distributed Queries"]
    }
  ];

  // Gamified achievements list
  const achievements = [
    {
      id: "streak-10",
      title: "Streak Master",
      desc: "Maintain a study streak of 10+ consecutive days.",
      points: "+500 XP",
      icon: Flame,
      color: "text-blue-500 bg-blue-100 border-blue-200",
      unlocked: true,
      progress: 100
    },
    {
      id: "code-warrior",
      title: "Algorithm Expert",
      desc: "Complete 15 advanced system design algorithms coding challenges.",
      points: "+750 XP",
      icon: Code,
      color: "text-blue-500 bg-blue-500 border-blue-500",
      unlocked: true,
      progress: 100
    },
    {
      id: "ai-pioneer",
      title: "AI Trailblazer",
      desc: "Fine-tune 3 neural models in the GPU sandbox playground.",
      points: "+1000 XP",
      icon: Brain,
      color: "text-cyan-600 bg-cyan-50 border-cyan-200",
      unlocked: true,
      progress: 100
    },
    {
      id: "cloud-guru",
      title: "SRE Champion",
      desc: "Deploy a distributed node scheduler with clean health check metrics.",
      points: "+1200 XP",
      icon: Cpu,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      unlocked: false,
      progress: 60
    },
    {
      id: "cert-collector",
      title: "Polymath Scholar",
      desc: "Earn 5 verified professional learning diplomas.",
      points: "+2000 XP",
      icon: Trophy,
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      unlocked: false,
      progress: 60
    }
  ];

  // Contribution map generation (like github)
  const contributionGrid = Array.from({ length: 53 * 7 }, (_, i) => {
    // Deterministic distribution to make it look realistic
    const daySeed = (i * 3) % 17;
    if (daySeed === 0 || daySeed === 5) return 0;
    if (daySeed === 1 || daySeed === 7) return 1;
    if (daySeed === 2 || daySeed === 11) return 2;
    if (daySeed === 3 || daySeed === 13) return 3;
    return 4;
  });

  // XP progression details
  const nextLevelXp = 15000;
  const currentLevelXpProgress = xp % 5000;
  const percentToNextLevel = Math.floor((currentLevelXpProgress / 5000) * 100);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#fff8f6] text-[#261812] font-sans pb-20 selection:bg-blue-600/30 text-left">
        <style dangerouslySetInnerHTML={{ __html: `
          .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 8px 32px 0 rgba(255, 107, 0, 0.04);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .glass-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px 0 rgba(255, 107, 0, 0.07);
          }
          .mesh-banner {
            background-image: radial-gradient(at 0% 0%, rgba(255, 107, 0, 0.22) 0%, transparent 65%),
                              radial-gradient(at 100% 100%, rgba(255, 168, 0, 0.16) 0%, transparent 65%),
                              radial-gradient(at 50% 0%, rgba(0, 184, 148, 0.05) 0%, transparent 50%);
          }
          .custom-scrollbar::-webkit-scrollbar {
            height: 4px;
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 107, 0, 0.2);
            border-radius: 99px;
          }
        `}} />

        {/* Global Toast */}
        {showToast && (
          <div className="fixed bottom-8 right-8 z-50 bg-[#261812] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in border border-white/10">
            <Sparkles className="w-5 h-5 text-blue-500 animate-spin" />
            <span className="text-sm font-bold">{toastMessage}</span>
          </div>
        )}

        <Header />

        <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">

          {/* Profile Header & Hero Banner */}
          <section className="relative rounded-[36px] overflow-hidden glass-card border border-white/80">
            <div className="h-44 bg-cover bg-center relative" style={{ backgroundImage: "url('/dashboard_banner.png')" }}>
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <button 
                  onClick={claimDailyXP}
                  className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-blue-500/25 shadow-md flex items-center gap-2 hover:bg-blue-50 hover:border-blue-500/40 active:scale-95 transition-all text-xs font-extrabold text-[#261812]"
                >
                  <Flame className="w-4 h-4 text-blue-600 animate-bounce" />
                  Claim Daily Reward
                </button>
              </div>
            </div>
            
            <div className="px-8 pb-8 pt-4 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 relative">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20">
                <div className="w-32 h-32 rounded-[28px] bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 shadow-xl relative z-10 shrink-0">
                  <div className="w-full h-full bg-white rounded-[24px] overflow-hidden flex items-center justify-center">
                    <img 
                      alt="User profile avatar" 
                      className="w-full h-full object-cover" 
                      src="/dashboard_avatar.png"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border-2 border-white">
                    LVL {Math.floor(xp / 5000) + 1}
                  </span>
                </div>
                
                <div className="text-center sm:text-left space-y-2">
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#261812] tracking-tight">{name}</h1>
                    <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[10px] font-extrabold uppercase tracking-wider">
                      PRO SCHOLAR
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-600">{role}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-slate-400" /> {location}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-blue-600">
                      <Flame className="w-3.5 h-3.5 fill-current animate-pulse" /> {streak} Day Streak
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress & Quick stats */}
              <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full lg:w-auto shrink-0">
                {/* Level Progress Bar Card */}
                <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm flex flex-col justify-between flex-grow sm:w-64">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <span>XP Progress</span>
                    <span className="text-blue-600 font-extrabold">{xp.toLocaleString()} / {nextLevelXp} XP</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#fcece7] rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${percentToNextLevel}%` }}></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">{percentToNextLevel}% to Level {Math.floor(xp / 5000) + 2}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-white/40 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-sm text-center shrink-0">
                  <div className="px-3 py-2 border-r border-slate-200/50">
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Certificates</span>
                    <span className="text-base font-black text-[#261812]">{certificates.length}</span>
                  </div>
                  <div className="px-3 py-2 border-r border-slate-200/50">
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Showcases</span>
                    <span className="text-base font-black text-[#261812]">{projects.length}</span>
                  </div>
                  <div className="px-3 py-2">
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Achievements</span>
                    <span className="text-base font-black text-[#261812]">3 / 5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom skills badges */}
            <div className="border-t border-slate-200/50 bg-white/45 backdrop-blur-md px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expertise:</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-[#261812] shadow-sm">
                    <Brain className="w-3.5 h-3.5 text-cyan-500" /> Deep Learning
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-[#261812] shadow-sm">
                    <Code className="w-3.5 h-3.5 text-blue-600" /> React Architecture
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-[#261812] shadow-sm">
                    <Database className="w-3.5 h-3.5 text-emerald-500" /> PostgreSQL tuning
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-[#261812] shadow-sm">
                    <Cpu className="w-3.5 h-3.5 text-purple-500" /> SRE & Node Scheduling
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-end md:self-auto">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Sliding Tab Switcher */}
          <section className="w-full flex border-b border-slate-200 shrink-0 relative overflow-x-auto gap-8 custom-scrollbar">
            {[
              { id: 'portfolio', label: 'Portfolio & Projects', icon: User },
              { id: 'analytics', label: 'Learning Analytics', icon: BarChart2 },
              { id: 'achievements', label: 'Achievements & Badges', icon: Trophy },
              { id: 'saved', label: 'Saved Courses', icon: Bookmark },
              { id: 'activity', label: 'Activity Map', icon: Activity },
              { id: 'settings', label: 'Settings & Billing', icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 pt-1 font-bold text-sm border-b-2 transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'border-blue-600 text-blue-600 scale-105' 
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </section>

          {/* Dynamic Portfolio View */}
          {activeTab === 'portfolio' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: About & Projects */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* About me Card */}
                <div className="glass-card p-6 rounded-3xl space-y-4">
                  <h3 className="text-lg font-bold text-[#261812] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" /> Professional Summary
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    {bio}
                  </p>
                </div>

                {/* Projects Showcase */}
                <div className="glass-card p-6 rounded-3xl space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-[#261812]">Featured Project Showcases</h3>
                      <p className="text-xs text-slate-500">Interactive demonstrations and systems built during courses</p>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{projects.length} Projects Listed</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm flex flex-col justify-between h-52 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-md transition-all duration-300 relative group">
                        
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <button 
                            onClick={() => toggleStarProject(proj.id)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              starredProjects[proj.id]
                                ? 'bg-blue-50 text-blue-600 border-blue-200' 
                                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
                            }`}
                            title="Star Project"
                          >
                            <Star className={`w-3.5 h-3.5 ${starredProjects[proj.id] ? 'fill-current' : ''}`} />
                          </button>
                          
                          <button 
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all border border-red-100"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-2 pr-16">
                          <h4 className="text-sm font-bold text-[#261812] group-hover:text-blue-600 transition-colors truncate">{proj.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{proj.desc}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1.5">
                            {proj.tech.map((t, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded bg-[#fff1eb] text-blue-600 text-[9px] font-extrabold uppercase tracking-wide">
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                            <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                              ⭐ {proj.stars} stars
                            </span>
                            <a href={proj.link} className="text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                              View Repository <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add project form */}
                  <form onSubmit={handleAddProject} className="border-t border-slate-100 pt-6 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Publish New Showcase Project</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Project Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Serverless DB Query Scheduler"
                          value={newProjTitle}
                          onChange={(e) => setNewProjTitle(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Technologies (comma-separated)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Go, AWS Lambda, DynamoDB"
                          value={newProjTech}
                          onChange={(e) => setNewProjTech(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Project Description</label>
                      <textarea 
                        placeholder="Detail the technical hurdles, design decisions, and system capabilities..."
                        value={newProjDesc}
                        onChange={(e) => setNewProjDesc(e.target.value)}
                        rows="2"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="px-6 py-2.5 bg-[#261812] text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Add to Showcase Portfolio
                    </button>
                  </form>
                </div>

              </div>

              {/* Right Column: Verified Credentials & Certificates */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Credentials Panel */}
                <div className="glass-card p-6 rounded-3xl space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#261812] flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" /> Verified Certificates
                    </h3>
                    <p className="text-xs text-slate-500">Credly-compatible path completions</p>
                  </div>

                  <div className="space-y-4">
                    {certificates.map((cert) => (
                      <div 
                        key={cert.id} 
                        className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col gap-3 hover:border-blue-500/10 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedCert(cert)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cert.color} flex items-center justify-center text-white shrink-0`}>
                            <Award className="w-6 h-6" />
                          </div>
                          <div className="text-left space-y-0.5 min-w-0 flex-grow">
                            <h4 className="text-xs font-bold text-[#261812] truncate">{cert.title}</h4>
                            <p className="text-[10px] text-slate-500 truncate">{cert.issuer}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {cert.skills.slice(0, 3).map((s, idx) => (
                            <span key={idx} className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-100">
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center border-t border-slate-100 pt-3 text-[9px] font-bold text-slate-400">
                          <span>Issued {cert.date}</span>
                          <span className="text-blue-600 hover:underline inline-flex items-center gap-0.5">
                            Verify Credential <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Learning Analytics View */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Weekly study & Skill Levels */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Weekly Chart */}
                <div className="glass-card p-6 rounded-3xl space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-[#261812]">Weekly Learning Hours</h3>
                      <p className="text-xs text-slate-500">Average: 3.1 hrs / day</p>
                    </div>
                    <span className="text-xs font-bold text-[#00B894] bg-[#00B894]/10 px-3 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +14% this week
                    </span>
                  </div>

                  {/* Simple CSS Column Bar Graph */}
                  <div className="h-52 flex items-end justify-between px-4 pt-6 border-b border-slate-200/70">
                    {weeklyHours.map((d, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 w-1/12 group cursor-pointer">
                        <span className="text-[10px] font-extrabold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {d.hours}h
                        </span>
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg group-hover:brightness-110 transition-all duration-300 shadow-sm"
                          style={{ height: `${(d.hours / 7.0) * 100}%` }}
                        />
                        <span className="text-[10px] font-bold text-slate-400 mt-2">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Path Progress Tracker */}
                <div className="glass-card p-6 rounded-3xl space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-[#261812]">Enrolled Paths Completion</h3>
                    <p className="text-xs text-slate-500">Milestone progression in current certification programs</p>
                  </div>
                  <div className="space-y-4">
                    
                    {/* Path 1 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-800">AI & ML Specialist Path</span>
                        <span className="text-blue-600 font-extrabold">65% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-[#fcece7] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    {/* Path 2 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-800">Full-Stack Developer Path</span>
                        <span className="text-blue-500 font-extrabold">40% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-blue-500/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>

                    {/* Path 3 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-800">Backend Developer Specialist</span>
                        <span className="text-cyan-500 font-extrabold">48% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-cyan-500/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: '48%' }}></div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Right Column: Skill Radar Mock & Streaks */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Skill Ratings */}
                <div className="glass-card p-6 rounded-3xl space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-[#261812]">Skill Strength Matrix</h3>
                    <p className="text-xs text-slate-500">Self-assessments verified via quizzes</p>
                  </div>
                  
                  <div className="space-y-4">
                    {skillMetrics.map((skill, index) => (
                      <div key={index} className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>{skill.name}</span>
                          <span className={`${skill.percentColor}`}>{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SVG Growth Visualization */}
                  <div className="border-t border-slate-100 pt-4 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-3 self-start">Visual Learning Path</span>
                    <svg viewBox="0 0 120 120" className="w-36 h-36">
                      <polygon points="60,10 102,40 102,90 60,110 18,90 18,40" fill="none" stroke="#e2bfb0" strokeWidth="0.75" />
                      <polygon points="60,30 88,50 88,80 60,95 32,80 32,50" fill="none" stroke="#e2bfb0" strokeWidth="0.5" strokeDasharray="2" />
                      <polygon points="60,20 90,45 80,75 60,95 40,80 35,50" fill="rgba(255, 107, 0, 0.15)" stroke="rgba(255, 107, 0, 0.8)" strokeWidth="1.5" />
                      <circle cx="60" cy="20" r="2.5" fill="#ff6b00" />
                      <circle cx="90" cy="45" r="2.5" fill="#ff6b00" />
                      <circle cx="80" cy="75" r="2.5" fill="#ff6b00" />
                      <circle cx="60" cy="95" r="2.5" fill="#ff6b00" />
                      <circle cx="40" cy="80" r="2.5" fill="#ff6b00" />
                      <circle cx="35" cy="50" r="2.5" fill="#ff6b00" />
                    </svg>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Gamified Achievements View */}
          {activeTab === 'achievements' && (
            <div className="glass-card p-6 rounded-3xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#261812] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-600" /> Learning Badges & Achievements
                </h3>
                <p className="text-xs text-slate-500 font-semibold">Gamified tasks unlocked during path completions. Claim reward milestones below.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((ach) => {
                  const Icon = ach.icon;
                  return (
                    <div 
                      key={ach.id} 
                      className={`p-5 rounded-2xl border flex flex-col justify-between h-48 transition-all ${
                        ach.unlocked 
                          ? 'bg-white border-slate-200/80 shadow-sm hover:shadow-md' 
                          : 'bg-slate-50/70 border-slate-200/50 opacity-70'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`p-2.5 rounded-xl border ${ach.color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-black text-blue-600">{ach.points}</span>
                          {ach.unlocked ? (
                            <span className="text-[9px] font-bold text-[#00B894] uppercase flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5 fill-current" /> UNLOCKED
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" /> LOCKED
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-extrabold text-[#261812]">{ach.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{ach.desc}</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                          <span>Task Progress</span>
                          <span>{ach.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${ach.unlocked ? 'bg-[#00B894]' : 'bg-slate-300'} rounded-full`} style={{ width: `${ach.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Saved Courses View */}
          {activeTab === 'saved' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Course Card 1 */}
              <div className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between h-96 group border border-white/60">
                <div className="relative h-44 overflow-hidden">
                  <img 
                    alt="React code context" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400" 
                  />
                  <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full border border-slate-100 shadow-sm cursor-pointer hover:bg-white text-blue-600">
                    <Bookmark className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">Advanced React</span>
                    <h4 className="text-sm font-bold text-[#261812] line-clamp-2 leading-relaxed">React Concurrent Mode & Render Optimization</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">Master transitions, deferred values, suspense, and virtual lists render techniques.</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold text-[#261812] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> 12.5 hrs
                    </span>
                    <Link to="/courses" className="px-4 py-2 bg-[#261812] text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-all">
                      Resume Course
                    </Link>
                  </div>
                </div>
              </div>

              {/* Course Card 2 */}
              <div className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between h-96 group border border-white/60">
                <div className="relative h-44 overflow-hidden">
                  <img 
                    alt="System Architecture diagram" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                    src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400" 
                  />
                  <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full border border-slate-100 shadow-sm cursor-pointer hover:bg-white text-blue-600">
                    <Bookmark className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-extrabold text-[#261812] uppercase tracking-wider">System Design</span>
                    <h4 className="text-sm font-bold text-[#261812] line-clamp-2 leading-relaxed">Designing Fault-Tolerant Distributed Caching</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">Consistent hashing, replica nodes, write-back cache strategies, and eviction rules.</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold text-[#261812] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> 16 hrs
                    </span>
                    <Link to="/courses" className="px-4 py-2 bg-[#261812] text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-all">
                      Resume Course
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Activity Timeline View */}
          {activeTab === 'activity' && (
            <div className="glass-card p-6 rounded-3xl space-y-8 text-left">
              <div>
                <h3 className="text-lg font-bold text-[#261812]">Learning Commitment History</h3>
                <p className="text-xs text-slate-500">Your study contribution squares mapping daily engagement</p>
              </div>

              {/* Github-style contribution grid */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-[3.5px] p-5 bg-white/50 rounded-2xl border border-slate-200/50 justify-center overflow-x-auto">
                  {contributionGrid.slice(0, 364).map((activity, idx) => {
                    let squareColor = 'bg-[#fff1eb]'; // 0
                    if (activity === 1) squareColor = 'bg-[#ffd2be]';
                    if (activity === 2) squareColor = 'bg-[#ffa477]';
                    if (activity === 3) squareColor = 'bg-[#ff7632]';
                    if (activity === 4) squareColor = 'bg-blue-600';

                    return (
                      <div 
                        key={idx} 
                        className={`w-[11.5px] h-[11.5px] rounded-[2.5px] transition-all hover:scale-125 cursor-pointer ${squareColor}`}
                        title={`Day ${idx + 1}: Study Score ${activity}`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold px-2">
                  <span>Less Study</span>
                  <div className="flex gap-[3px] items-center">
                    <div className="w-[11px] h-[11px] bg-[#fff1eb] rounded-[2px]" />
                    <div className="w-[11px] h-[11px] bg-[#ffd2be] rounded-[2px]" />
                    <div className="w-[11px] h-[11px] bg-[#ffa477] rounded-[2px]" />
                    <div className="w-[11px] h-[11px] bg-[#ff7632] rounded-[2px]" />
                    <div className="w-[11px] h-[11px] bg-blue-600 rounded-[2px]" />
                    <span className="ml-1">More Study</span>
                  </div>
                </div>
              </div>

              {/* Detailed Activity Logs */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">Recent Timeline Events</h4>
                
                <div className="relative pl-6 space-y-6">
                  <div className="absolute left-[5px] top-1.5 bottom-1.5 w-[2px] bg-slate-200"></div>

                  {/* Event 1 */}
                  <div className="relative group">
                    <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white shadow-sm transition-transform group-hover:scale-125" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400">TODAY • 2:15 PM</span>
                      <p className="text-sm font-bold text-[#261812]">Completed Lab: Optimizing Index Scans</p>
                      <p className="text-xs text-slate-500">Earned +100 XP and PostgreSQL Indexing skill endorsement.</p>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="relative group">
                    <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-[#00B894] ring-4 ring-white shadow-sm transition-transform group-hover:scale-125" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400">YESTERDAY • 4:00 PM</span>
                      <p className="text-sm font-bold text-[#261812]">Enrolled in DevOps & SRE Specialist Path</p>
                      <p className="text-xs text-slate-500">Customized cloud native deployments learning path initiated.</p>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="relative group">
                    <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-white shadow-sm transition-transform group-hover:scale-125" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400">OCT 24, 2025</span>
                      <p className="text-sm font-bold text-[#261812]">Earned Certified AI & ML Specialist Diploma</p>
                      <p className="text-xs text-slate-500">Completed the final assessment with a verified 94% quiz score.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* Account Settings & Subscription View */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Profile Variables form */}
              <div className="lg:col-span-8">
                <div className="glass-card p-6 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold text-[#261812] flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" /> Personal Profile Settings
                  </h3>
                  
                  <form onSubmit={saveSettings} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500">Display Name</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500">Professional Title</label>
                        <input 
                          type="text" 
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500">Location</label>
                        <input 
                          type="text" 
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500">Email Address</label>
                        <input 
                          type="email" 
                          disabled
                          value="ashwin@iconichub.io"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 text-xs cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500">GitHub Profile</label>
                        <input 
                          type="text" 
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500">LinkedIn Profile</label>
                        <input 
                          type="text" 
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500">Twitter Profile</label>
                        <input 
                          type="text" 
                          value={twitterUrl}
                          onChange={(e) => setTwitterUrl(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-500">Short Bio</label>
                      <textarea 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows="3"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none bg-white"
                      />
                    </div>

                    <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:brightness-110 active:scale-95 transition-all">
                      Save Profile Changes
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Billing info */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Subscription Info Card */}
                <div className="glass-card p-6 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold text-[#261812] flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" /> Subscription Plan
                  </h3>

                  <div className="p-4 rounded-2xl bg-gradient-to-tr from-blue-600/10 to-indigo-500/10 border border-blue-600/30 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wide">Active Subscription</span>
                        <h4 className="text-base font-bold text-[#261812]">Iconic Hub Pro</h4>
                      </div>
                      <span className="text-lg font-black text-blue-600">$29<span className="text-[10px] font-bold text-slate-500">/mo</span></span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      Next billing renewal date: July 12, 2026. Credit card ending in •••• 4242.
                    </p>

                    <div className="flex flex-col gap-2">
                      <button type="button" className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all">
                        Manage Payment
                      </button>
                      <button type="button" className="w-full py-2.5 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-xl text-xs font-bold text-slate-600 bg-white transition-all">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>

                {/* Account Actions Card */}
                <div className="glass-card p-6 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold text-[#261812] flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" /> Account Actions
                  </h3>
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 leading-relaxed text-left">
                      Sign out of your session on this device. Your local progress metrics are automatically synchronized.
                    </p>
                    <button 
                      type="button" 
                      onClick={() => {
                        alert('Logging out...');
                        navigate('/');
                      }}
                      className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 rounded-xl text-xs font-bold transition-all"
                    >
                      Logout Session
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>

        {/* Certificate Preview Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 bg-[#261812]/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-xl w-full border border-slate-100 shadow-2xl relative space-y-6">
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold p-2 hover:bg-slate-100 rounded-full"
              >
                ✕
              </button>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Award className="w-8 h-8" />
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">VERIFIED DIPLOMA</span>
                  <h3 className="text-xl font-black text-[#261812]">{selectedCert.title}</h3>
                  <p className="text-xs text-slate-500">Issued to Ashwin by {selectedCert.issuer}</p>
                </div>

                {/* Certificate visual mock */}
                <div className="border-[8px] border-double border-slate-200 p-6 bg-slate-50 rounded-2xl relative overflow-hidden">
                  {/* Subtle seal */}
                  <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full border-2 border-blue-200/50 flex items-center justify-center text-[8px] font-bold text-blue-400/50 rotate-12">
                    GOLD SEAL
                  </div>
                  <div className="text-center space-y-2 select-none">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Certificate of Completion</span>
                    <span className="text-xs font-serif italic text-slate-600 block">This credentials certify that</span>
                    <span className="text-lg font-bold text-[#261812] block tracking-wide">{name}</span>
                    <span className="text-xs font-serif italic text-slate-600 block">has successfully mastered all milestones in the career path</span>
                    <span className="text-sm font-extrabold text-blue-600 block">{selectedCert.title}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 space-y-1">
                  <p>Credential Identification ID: <span className="font-mono text-[#261812] font-semibold">{selectedCert.idCode}</span></p>
                  <p>Completion Timestamp: <span className="font-mono text-[#261812] font-semibold">{selectedCert.date}</span></p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      triggerToast('Credential URL copied to clipboard! 📋');
                      setSelectedCert(null);
                    }}
                    className="flex-1 py-3 bg-[#261812] text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-all"
                  >
                    Copy Shareable Link
                  </button>
                  <button 
                    onClick={() => {
                      triggerToast('Downloading PDF credential file...');
                      setSelectedCert(null);
                    }}
                    className="flex-1 py-3 border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold rounded-xl text-slate-600 bg-white transition-all"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
