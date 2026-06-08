import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Flame, Award, Users, ChevronRight, MessageSquare, Share2, UserCheck, Sparkles, Terminal, X, Send, Volume2, Maximize2, Settings } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function DiscussionForums() {
  const [showLiveSession, setShowLiveSession] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { user: "@dev_sam", text: "Excited for this session! 🚀" },
    { user: "@alex_ux", text: "The presentation slides look great." },
    { user: "@kristen_ai", text: "Will we get a copy of the notebook?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  React.useEffect(() => {
    if (showLiveSession) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLiveSession]);

  React.useEffect(() => {
    if (!showLiveSession) return;
    const interval = setInterval(() => {
      const mockUsers = ["@johndoe", "@marcus_chen", "@sarah_dev", "@david_sterling", "@elena_rossi"];
      const mockTexts = [
        "LLMs are super powerful!",
        "Does GPT-o1 support multi-step reasoning natively?",
        "Awesome prompt tips!",
        "Whoa, that self-correction prompt is clean.",
        "Could you explain the system instruction structure again?",
        "Thanks for the answer!",
        "Brilliant session! 🔥"
      ];
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      setChatMessages(prev => [...prev, { user: randomUser, text: randomText }].slice(-10));
    }, 3500);
    return () => clearInterval(interval);
  }, [showLiveSession]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { user: "@ashwin_you", text: chatInput }]);
    setChatInput("");
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      votes: 142,
      voted: null, // 'up' or 'down'
      author: "@alex_ux",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      channel: "AIStrategy",
      time: "2h ago",
      title: "Should we prioritize GPT-o1 over 4o for creative UX writing tasks?",
      tags: ["AI Ethics", "Productivity"],
      comments: 48
    },
    {
      id: 2,
      votes: 89,
      voted: null,
      author: "@sarah_dev",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      channel: "FullstackDev",
      time: "5h ago",
      title: "The performance impact of CSS container queries on complex dashboards.",
      tags: ["Frontend"],
      comments: 24
    }
  ]);

  const [activeCircle, setActiveCircle] = useState({
    ux: false,
    ai: true,
    fullstack: false
  });

  const handleVote = (id, direction) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        let diff = 0;
        let newVoted = null;
        if (direction === 'up') {
          if (post.voted === 'up') {
            diff = -1;
          } else if (post.voted === 'down') {
            diff = 2;
            newVoted = 'up';
          } else {
            diff = 1;
            newVoted = 'up';
          }
        } else {
          if (post.voted === 'down') {
            diff = 1;
          } else if (post.voted === 'up') {
            diff = -2;
            newVoted = 'down';
          } else {
            diff = -1;
            newVoted = 'down';
          }
        }
        return { ...post, votes: post.votes + diff, voted: newVoted };
      }
      return post;
    }));
  };

  const toggleCircle = (key) => {
    setActiveCircle(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#fff8f6] text-on-background font-sans pb-16 selection:bg-[#2563EB] selection:text-white">
        <Header />

        <main className="max-w-7xl mx-auto px-6 mt-8 space-y-12 text-left">
          
          {/* Immersive Hero Banner */}
          <section className="relative h-[320px] rounded-3xl overflow-hidden shadow-xl">
            <img 
              alt="Live Prompt Engineering Workshop" 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_uZEQcgvJZWDUTGutFzV3wuML-EDyUXxYZ0LLm3Bitt5uo9zADV_L9s-FtzODiC8MNzlEHw-U7Je1JHhHu47ATUuYpZOWRUVkNrXh-CxGOjWWQ_85_CT-BvRZQ7iyqVyKbdiWNwudU-g_yRg7xdA-aewqvlqesrB2zk0m_pfkmQrYb2zVprUz_XIcHca2tnVuzR_VAsfQFsRIHZvl426-jfXE-43QzAxghIxjqN5Einh130lH6OQpr8gy6HvGLs2UaycnqkrXjxw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent flex flex-col justify-center px-8 md:px-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 w-fit backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live Now</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white max-w-2xl leading-tight">Prompt Engineering for AI Strategists Masterclass</h1>
              <p className="text-xs md:text-sm text-white/80 max-w-xl leading-relaxed">Join 400+ learners as we explore advanced techniques in LLM orchestration and creative prompting.</p>
              <button 
                onClick={() => setShowLiveSession(true)}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-6 py-3.5 rounded-xl w-fit hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <span>Join Session</span>
                <Play className="w-4 h-4 fill-white" />
              </button>
            </div>
          </section>

          {/* Community Circles Discovery */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-black text-on-background">Explore Circles</h2>
                <p className="text-xs text-on-surface-variant">Specialized hubs for focused learning and collaboration.</p>
              </div>
              <button className="text-xs font-bold text-[#2563EB] flex items-center gap-1 hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Circle Card 1 */}
              <div className={`bg-white border p-6 rounded-2xl group hover:-translate-y-1 transition-all shadow-sm ${
                activeCircle.ux ? 'border-[#2563EB] ring-2 ring-[#2563EB]/10' : 'border-surface-stroke'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#2563EB]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">2.4k members</span>
                </div>
                <h3 className="text-base font-bold mb-1 group-hover:text-[#2563EB] transition-colors">UX Research</h3>
                <p className="text-xs text-slate-500 mb-6 h-8 overflow-hidden">Methodologies for human-centric design systems.</p>
                <button 
                  onClick={() => toggleCircle('ux')}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    activeCircle.ux 
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'bg-[#2563EB] border-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/10'
                  }`}
                >
                  {activeCircle.ux ? 'Member Joined' : 'Join Circle'}
                </button>
              </div>

              {/* Circle Card 2 */}
              <div className={`bg-white border p-6 rounded-2xl group hover:-translate-y-1 transition-all shadow-sm ${
                activeCircle.ai ? 'border-[#2563EB] ring-2 ring-[#2563EB]/10' : 'border-surface-stroke'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#2563EB]">
                    <Flame className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">5.1k members</span>
                </div>
                <h3 className="text-base font-bold mb-1 group-hover:text-[#2563EB] transition-colors">AI Strategy</h3>
                <p className="text-xs text-slate-500 mb-6 h-8 overflow-hidden">Integrating large language models into enterprise workflows.</p>
                <button 
                  onClick={() => toggleCircle('ai')}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    activeCircle.ai 
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'bg-[#2563EB] border-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/10'
                  }`}
                >
                  {activeCircle.ai ? 'Member Joined' : 'Join Circle'}
                </button>
              </div>

              {/* Circle Card 3 */}
              <div className={`bg-white border p-6 rounded-2xl group hover:-translate-y-1 transition-all shadow-sm ${
                activeCircle.fullstack ? 'border-[#2563EB] ring-2 ring-[#2563EB]/10' : 'border-surface-stroke'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#2563EB]">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">3.8k members</span>
                </div>
                <h3 className="text-base font-bold mb-1 group-hover:text-[#2563EB] transition-colors">Fullstack Dev</h3>
                <p className="text-xs text-slate-500 mb-6 h-8 overflow-hidden">Modern web architectures from React to Edge Computing.</p>
                <button 
                  onClick={() => toggleCircle('fullstack')}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    activeCircle.fullstack 
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'bg-[#2563EB] border-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/10'
                  }`}
                >
                  {activeCircle.fullstack ? 'Member Joined' : 'Join Circle'}
                </button>
              </div>
            </div>
          </section>

          {/* Core Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Trending Discussions */}
            <section className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-on-background tracking-tight">Trending Discussions</h2>
                  <p className="text-xs text-slate-500 mt-1">Join active community brainstorming sessions</p>
                </div>
                <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
                  <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-[#2563EB] transition-colors">Recent</button>
                  <button className="px-4 py-1.5 rounded-lg bg-white text-[#2563EB] text-xs font-extrabold shadow-sm border border-slate-200/30">Hot</button>
                </div>
              </div>

              <div className="space-y-5">
                {posts.map(post => {
                  const getTagStyles = (tag) => {
                    const norm = tag.toLowerCase();
                    if (norm.includes('ethics')) return 'bg-purple-50 text-purple-600 border-purple-100';
                    if (norm.includes('prod')) return 'bg-blue-50 text-blue-600 border-blue-100';
                    if (norm.includes('front')) return 'bg-sky-50 text-sky-600 border-sky-100';
                    return 'bg-slate-50 text-slate-600 border-slate-100';
                  };

                  return (
                    <article key={post.id} className="bg-white/90 border border-slate-200/80 p-6 rounded-3xl flex gap-6 hover:border-[#2563EB]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-sm relative overflow-hidden group">
                      {/* Ambient card accent glow */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2563EB] to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      


                      <div className="flex-1 space-y-3.5 text-left">
                        <div className="flex items-center gap-2">
                          <img src={post.avatar} alt="Author" className="w-6 h-6 rounded-full object-cover border-2 border-white shadow-sm" />
                          <span className="text-[10px] text-slate-400 font-semibold tracking-wide flex items-center gap-1">
                            <span>posted by</span>
                            <span className="text-slate-700 font-bold hover:text-[#2563EB] cursor-pointer">{post.author}</span>
                            <span>in</span>
                            <span className="text-[#2563EB] font-extrabold uppercase hover:underline cursor-pointer">#{post.channel}</span>
                            <span className="text-slate-300">•</span>
                            <span>{post.time}</span>
                          </span>
                        </div>
                        
                        <h3 className="text-base font-extrabold text-[#261812] hover:text-[#2563EB] transition-colors cursor-pointer leading-snug">
                          {post.title}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className={`px-3 py-0.5 border rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-sm ${getTagStyles(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-5 pt-3.5 border-t border-slate-100 text-xs">
                          <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#2563EB] text-[10px] font-extrabold uppercase tracking-wider transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments} Comments</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#2563EB] text-[10px] font-extrabold uppercase tracking-wider transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {/* Featured Post Card */}
                <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-[#2563EB]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-sm relative group flex flex-col">
                  <div className="h-44 relative overflow-hidden bg-slate-100">
                    <img 
                      alt="Post Highlight" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCmooC7cQUtJcwIFyK7aHn4M_Izvs1WI_XbHY2M4M5tlTDe7gBPoP5YRAuxYeNG2NmvjBasJ9beSpQjH5_8cH2VW2yAk7eiF4re7YXKDrCQs0jI5pExywHJ1t0I_YTwYYS-T2QQQ9gItl_sf_4WcFb475YY2LYGs0QDu9GEvnCkJQB1wou6Q_iWo2CnJ65NNaHhpZffEiOSPKlC53j6DO-hquyMvu2e6_0EXm3FxuDftz8GuQpXXJJyIY6yu0qhBqXCRfi552iAVBU"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#2563EB]/95 text-white font-extrabold text-[9px] uppercase tracking-wider rounded-full shadow-md">
                      Featured Spotlight
                    </div>
                  </div>
                  
                  <div className="p-6 flex gap-6">

                    
                    <div className="flex-1 space-y-3.5 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-semibold tracking-wide flex items-center gap-1">
                          <span>posted by</span>
                          <span className="text-slate-700 font-bold hover:text-[#2563EB] cursor-pointer">@marcus_m</span>
                          <span>in</span>
                          <span className="text-[#2563EB] font-extrabold uppercase hover:underline cursor-pointer">#CareerGrowth</span>
                          <span className="text-slate-300">•</span>
                          <span>8h ago</span>
                        </span>
                      </div>
                      
                      <h3 className="text-base font-extrabold text-[#261812] hover:text-[#2563EB] transition-colors leading-snug cursor-pointer">
                        Community Spotlight: How Kinetic Glass LMS members landed roles at top AI labs.
                      </h3>
                      
                      <div className="flex items-center gap-5 pt-3.5 border-t border-slate-100 text-xs">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#2563EB] text-[10px] font-extrabold uppercase tracking-wider transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span>112 Comments</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#2563EB] text-[10px] font-extrabold uppercase tracking-wider transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            {/* Sidebar Columns */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Active Stats */}
              <div className="bg-white border border-surface-stroke p-6 rounded-2xl shadow-sm text-left space-y-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-50 pb-2">Community Pulse</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <span className="text-2xl font-black text-[#2563EB]">1.2k</span>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Online Now</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-2xl font-black text-on-background">15k</span>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Daily Posts</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-slate-500">
                    <span>Goal: 20k Discussions</span>
                    <span className="text-[#2563EB] font-bold">75%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2563EB] w-3/4 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Contributors */}
              <div className="bg-white border border-surface-stroke p-6 rounded-2xl shadow-sm text-left">
                <h3 className="text-xs font-bold text-on-background uppercase tracking-wider mb-6 flex justify-between items-center">
                  <span>Top Contributors</span>
                  <Award className="w-4 h-4 text-[#2563EB]" />
                </h3>
                
                <div className="space-y-4">
                  {[
                    { name: "Elena Rossi", role: "AI Ethicist", points: 420, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", rank: "#1" },
                    { name: "David Chen", role: "Architect", points: 385, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", rank: "#2" },
                    { name: "Aisha Khan", role: "Product Lead", points: 310, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", rank: "#3" }
                  ].map((user, uIdx) => (
                    <div key={uIdx} className="flex items-center justify-between group cursor-pointer border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-slate-100" />
                        <div>
                          <p className="text-xs font-bold text-on-background group-hover:text-[#2563EB] transition-colors">{user.name}</p>
                          <p className="text-[9px] text-slate-400 font-semibold">{user.points} Points • {user.role}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold ${uIdx === 0 ? 'text-[#2563EB]' : 'text-slate-400'}`}>{user.rank}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speaker Card */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 p-6 text-white h-[260px] flex flex-col justify-end text-left shadow-md">
                <img 
                  alt="Speaker" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkqq64-Pzb-IZ5XvB4dOINEivOAmeBWZlCJEYMLNaXO26AK7uiUYXBLSc6v0BmBebpcinqMEXdmumUfbHhN7LnHAS38ca0dtFo0M5TwiBOnUFvS4023Q5SNAYMLqhYvWiAqD-maKjVQkMKvK1cxHV1u1YeMkRxnTN4BtrK4-VDNnMsEmdrzIQWHitdNed0dawNndHLlYHy7M9awW1ICG4DGJStyVg2K4_oTG2S7LycTpUkRwa4LHVFXZKno8sFwQDPCfpXGrc0HfLW"
                />
                <div className="relative space-y-4">
                  <h3 className="text-base font-bold leading-tight">Got insights to share?</h3>
                  <p className="text-[10px] text-white/70 leading-relaxed">Apply to become a speaker for our upcoming community workshops and build your personal brand.</p>
                  <button className="w-full py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-[#2563EB] hover:text-white transition-all">
                    Apply as Speaker
                  </button>
                </div>
              </div>

            </aside>
          </div>

        </main>

        {/* Live Session Masterclass Modal */}
        {showLiveSession && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-6 md:pt-12 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
            <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Close Button */}
              <button 
                onClick={() => setShowLiveSession(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full p-2.5 transition-all z-20 shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: Video Stream Screen */}
              <div className="flex-1 flex flex-col bg-slate-950 text-white min-h-[300px]">
                {/* Simulated Stream Frame */}
                <div className="relative flex-1 aspect-video bg-black flex flex-col justify-between p-6 overflow-hidden">
                  
                  {/* Real Video Stream Background */}
                  <video 
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

                  {/* Header badges */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      Live
                    </div>
                    <div className="px-3 py-1 bg-black/40 rounded-full text-[10px] text-slate-300 font-bold backdrop-blur-md">
                      1080p HD
                    </div>
                  </div>

                  {/* Presenter Camera Overlay */}
                  <div className="absolute bottom-16 right-6 w-32 h-24 rounded-lg overflow-hidden border border-white/20 shadow-lg bg-slate-900">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkqq64-Pzb-IZ5XvB4dOINEivOAmeBWZlCJEYMLNaXO26AK7uiUYXBLSc6v0BmBebpcinqMEXdmumUfbHhN7LnHAS38ca0dtFo0M5TwiBOnUFvS4023Q5SNAYMLqhYvWiAqD-maKjVQkMKvK1cxHV1u1YeMkRxnTN4BtrK4-VDNnMsEmdrzIQWHitdNed0dawNndHLlYHy7M9awW1ICG4DGJStyVg2K4_oTG2S7LycTpUkRwa4LHVFXZKno8sFwQDPCfpXGrc0HfLW" 
                      alt="Dr. Sarah Chen Camera" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Controls bar */}
                  <div className="relative z-10 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                        <Play className="w-4 h-4 fill-white" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] text-slate-300 font-semibold select-none">Live Stream Session (01:24:42 elapsed)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Details Footer */}
                <div className="p-6 bg-slate-900 border-t border-slate-800 text-left space-y-2">
                  <h3 className="text-base font-extrabold text-white">Prompt Engineering for AI Strategists Masterclass</h3>
                  <p className="text-[10px] text-slate-400">Presented by <strong className="text-white">Dr. Sarah Chen</strong> • 482 active community members tuning in</p>
                </div>
              </div>

              {/* Right Side: Live Chat Stream */}
              <div className="w-full md:w-[320px] bg-slate-50 flex flex-col justify-between border-l border-slate-100">
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700 tracking-wider uppercase">Live Chat</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Active</span>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col justify-end min-h-[150px]">
                  {chatMessages.map((msg, mIdx) => (
                    <div key={mIdx} className="text-left space-y-0.5 text-xs">
                      <span className={`font-bold block ${msg.user === '@ashwin_you' ? 'text-blue-600' : 'text-slate-600'}`}>
                        {msg.user}
                      </span>
                      <p className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-100 inline-block max-w-[90%] break-words">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendChat} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Say something in live chat..." 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                  <button type="submit" className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-md">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>

            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
