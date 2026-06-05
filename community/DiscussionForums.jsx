import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Flame, Award, Users, ChevronRight, MessageSquare, Share2, ArrowUp, ArrowDown, UserCheck, Sparkles, Terminal } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function DiscussionForums() {
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
      <div className="min-h-screen bg-[#fff8f6] text-on-background font-sans pb-16 selection:bg-vibrant-orange selection:text-white">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vibrant-orange/20 border border-vibrant-orange/30 w-fit backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-vibrant-orange animate-pulse"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live Now</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white max-w-2xl leading-tight">Prompt Engineering for AI Strategists Masterclass</h1>
              <p className="text-xs md:text-sm text-white/80 max-w-xl leading-relaxed">Join 400+ learners as we explore advanced techniques in LLM orchestration and creative prompting.</p>
              <button className="bg-vibrant-orange hover:bg-orange-600 text-white text-xs font-bold px-6 py-3.5 rounded-xl w-fit hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-vibrant-orange/20">
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
              <button className="text-xs font-bold text-vibrant-orange flex items-center gap-1 hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Circle Card 1 */}
              <div className="bg-white border border-surface-stroke p-6 rounded-2xl group hover:-translate-y-1 transition-all shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-vibrant-orange">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">2.4k members</span>
                </div>
                <h3 className="text-base font-bold mb-1 group-hover:text-vibrant-orange transition-colors">UX Research</h3>
                <p className="text-xs text-slate-500 mb-6 h-8 overflow-hidden">Methodologies for human-centric design systems.</p>
                <button 
                  onClick={() => toggleCircle('ux')}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    activeCircle.ux 
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'border-surface-stroke hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {activeCircle.ux ? 'Member Joined' : 'Join Circle'}
                </button>
              </div>

              {/* Circle Card 2 */}
              <div className="bg-white border border-surface-stroke p-6 rounded-2xl group hover:-translate-y-1 transition-all shadow-sm ring-2 ring-vibrant-orange/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-vibrant-orange">
                    <Flame className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">5.1k members</span>
                </div>
                <h3 className="text-base font-bold mb-1 group-hover:text-vibrant-orange transition-colors">AI Strategy</h3>
                <p className="text-xs text-slate-500 mb-6 h-8 overflow-hidden">Integrating large language models into enterprise workflows.</p>
                <button 
                  onClick={() => toggleCircle('ai')}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeCircle.ai 
                      ? 'bg-vibrant-orange text-white shadow-md shadow-vibrant-orange/10'
                      : 'border-surface-stroke hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {activeCircle.ai ? 'Member Joined' : 'Join Circle'}
                </button>
              </div>

              {/* Circle Card 3 */}
              <div className="bg-white border border-surface-stroke p-6 rounded-2xl group hover:-translate-y-1 transition-all shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-vibrant-orange">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">3.8k members</span>
                </div>
                <h3 className="text-base font-bold mb-1 group-hover:text-vibrant-orange transition-colors">Fullstack Dev</h3>
                <p className="text-xs text-slate-500 mb-6 h-8 overflow-hidden">Modern web architectures from React to Edge Computing.</p>
                <button 
                  onClick={() => toggleCircle('fullstack')}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    activeCircle.fullstack 
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'border-surface-stroke hover:bg-slate-50 text-slate-700'
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
                <h2 className="text-xl font-black text-on-background">Trending Discussions</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 rounded-full bg-white border border-surface-stroke text-xs font-bold hover:border-vibrant-orange text-slate-600 transition-colors">Recent</button>
                  <button className="px-4 py-1.5 rounded-full bg-vibrant-orange text-white text-xs font-bold">Hot</button>
                </div>
              </div>

              <div className="space-y-4">
                {posts.map(post => (
                  <article key={post.id} className="bg-white border border-surface-stroke p-6 rounded-2xl flex gap-6 hover:border-vibrant-orange/20 transition-all shadow-sm">
                    {/* Voting */}
                    <div className="flex flex-col items-center gap-1 bg-slate-50 border border-surface-stroke rounded-xl px-2 py-3 h-fit shrink-0">
                      <button 
                        onClick={() => handleVote(post.id, 'up')}
                        className={`hover:text-vibrant-orange transition-all ${post.voted === 'up' ? 'text-vibrant-orange scale-110' : 'text-slate-400'}`}
                      >
                        <ArrowUp className="w-5 h-5" />
                      </button>
                      <span className="text-xs font-bold text-slate-700">{post.votes}</span>
                      <button 
                        onClick={() => handleVote(post.id, 'down')}
                        className={`hover:text-red-500 transition-all ${post.voted === 'down' ? 'text-red-500 scale-110' : 'text-slate-400'}`}
                      >
                        <ArrowDown className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <img src={post.avatar} alt="Author" className="w-5 h-5 rounded-full object-cover border border-slate-100" />
                        <span className="text-[10px] text-slate-400 font-semibold">
                          posted by <b className="text-slate-600">{post.author}</b> in <b className="text-vibrant-orange">#{post.channel}</b> • {post.time}
                        </span>
                      </div>
                      
                      <h3 className="text-sm font-extrabold text-on-background hover:text-vibrant-orange transition-colors cursor-pointer leading-snug">
                        {post.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-0.5 bg-slate-50 border border-surface-stroke text-slate-500 rounded text-[9px] font-bold uppercase tracking-wider">{tag}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-2 border-t border-slate-50/50">
                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-vibrant-orange text-[10px] font-bold uppercase tracking-wider transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.comments} Comments</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-vibrant-orange text-[10px] font-bold uppercase tracking-wider transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}

                {/* Featured Post Card */}
                <article className="bg-white border border-surface-stroke rounded-2xl overflow-hidden hover:border-vibrant-orange/20 transition-all shadow-sm">
                  <img 
                    alt="Post Highlight" 
                    className="w-full h-44 object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCmooC7cQUtJcwIFyK7aHn4M_Izvs1WI_XbHY2M4M5tlTDe7gBPoP5YRAuxYeNG2NmvjBasJ9beSpQjH5_8cH2VW2yAk7eiF4re7YXKDrCQs0jI5pExywHJ1t0I_YTwYYS-T2QQQ9gItl_sf_4WcFb475YY2LYGs0QDu9GEvnCkJQB1wou6Q_iWo2CnJ65NNaHhpZffEiOSPKlC53j6DO-hquyMvu2e6_0EXm3FxuDftz8GuQpXXJJyIY6yu0qhBqXCRfi552iAVBU"
                  />
                  <div className="p-6 flex gap-6">
                    <div className="flex flex-col items-center gap-1 bg-slate-50 border border-surface-stroke rounded-xl px-2 py-3 h-fit shrink-0">
                      <ArrowUp className="w-5 h-5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">215</span>
                      <ArrowDown className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1 space-y-3 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-semibold">
                          posted by <b className="text-slate-600">@marcus_m</b> in <b className="text-vibrant-orange">#CareerGrowth</b> • 8h ago
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-on-background leading-snug">
                        Community Spotlight: How Kinetic Glass LMS members landed roles at top AI labs.
                      </h3>
                      <div className="flex items-center gap-4 pt-2 border-t border-slate-50/50">
                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-vibrant-orange text-[10px] font-bold uppercase tracking-wider transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span>112 Comments</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-vibrant-orange text-[10px] font-bold uppercase tracking-wider transition-colors">
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
                    <span className="text-2xl font-black text-vibrant-orange">1.2k</span>
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
                    <span className="text-vibrant-orange font-bold">75%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-vibrant-orange w-3/4 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Contributors */}
              <div className="bg-white border border-surface-stroke p-6 rounded-2xl shadow-sm text-left">
                <h3 className="text-xs font-bold text-on-background uppercase tracking-wider mb-6 flex justify-between items-center">
                  <span>Top Contributors</span>
                  <Award className="w-4 h-4 text-vibrant-orange" />
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
                          <p className="text-xs font-bold text-on-background group-hover:text-vibrant-orange transition-colors">{user.name}</p>
                          <p className="text-[9px] text-slate-400 font-semibold">{user.points} Points • {user.role}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold ${uIdx === 0 ? 'text-vibrant-orange' : 'text-slate-400'}`}>{user.rank}</span>
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
                  <button className="w-full py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-vibrant-orange hover:text-white transition-all">
                    Apply as Speaker
                  </button>
                </div>
              </div>

            </aside>
          </div>

        </main>
      </div>
    </PageTransition>
  );
}
