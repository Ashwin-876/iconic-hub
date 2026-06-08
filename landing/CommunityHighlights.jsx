import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, ThumbsUp, Eye, Award, Flame, Users, Globe, 
  Trophy, CheckCircle, Zap, ShieldAlert, BookOpen, ChevronRight, 
  MapPin, Star, Clock 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GLOBAL_STATS = [
  { label: "Total Developers", value: 142000, suffix: "+" },
  { label: "Countries Represented", value: 120, suffix: "" },
  { label: "Daily Discussions", value: 1850, suffix: "" },
  { label: "Challenges Solved", value: 34000, suffix: "+" }
];

const DISCUSSION_POSTS = [
  {
    title: "How to properly scale Next.js SSR with Redis Cache?",
    author: "Liam Garcia",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
    replies: 18,
    upvotes: 42,
    views: 310,
    tags: ["NextJS", "Caching"]
  },
  {
    title: "Understanding Python's Asyncio Loop lifecycle",
    author: "Maya Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    replies: 12,
    upvotes: 28,
    views: 195,
    tags: ["Python", "Async"]
  },
  {
    title: "Rust compiler vs Go GC: Memory optimization benchmarks",
    author: "Oliver Bennett",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    replies: 24,
    upvotes: 56,
    views: 450,
    tags: ["Rust", "Go", "Performance"]
  }
];

const TOP_USERS = [
  { rank: 1, name: "Pranav M.", xp: 12450, streak: 48 },
  { rank: 2, name: "Jessica K.", xp: 10890, streak: 32 },
  { rank: 3, name: "Arjun S.", xp: 9940, streak: 15 }
];

const RECENT_ACTIVITIES = [
  { user: "Sarah J.", action: "completed challenge", target: "Binary Search Tree optimization", time: "Just now", badge: "🏆 Challenge Winner" },
  { user: "Alex R.", action: "earned certification", target: "Advanced System Architect", time: "2m ago", badge: "🎓 Certified" },
  { user: "Elena V.", action: "solved bug query", target: "Node memory leak debugging", time: "5m ago", badge: "💡 Mentor Assist" },
  { user: "Devon M.", action: "started study group", target: "Kubernetes Enterprise Deployments", time: "10m ago", badge: "👥 Group Host" }
];

const STUDY_GROUPS = [
  { name: "System Design Deep Dive", members: 1420, active: 85 },
  { name: "Rust Performance Benchmarks", members: 920, active: 64 },
  { name: "LLM Fine-tuning Workshop", members: 2100, active: 110 }
];

const TECH_TAGS = ["AI", "React", "Next.js", "TypeScript", "Python", "Cloud", "Kubernetes", "System Design", "Machine Learning", "Docker", "GSAP", "Redis"];

export default function CommunityHighlights() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const [activities, setActivities] = useState(RECENT_ACTIVITIES);

  // Real-time activity simulation
  useEffect(() => {
    const names = ["Marcus", "Nadia", "Chloe", "Tyler", "Siddharth", "Amina"];
    const actions = ["submitted solution for", "passed benchmark on", "started learning path", "joined group"];
    const targets = ["Redux toolkit slice", "Django API pipeline", "Next.js routing", "Docker production build"];
    const badges = ["💻 Coder", "🚀 Optimizer", "📚 Learner", "🤝 Peer"];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomTarget = targets[Math.floor(Math.random() * targets.length)];
      const randomBadge = badges[Math.floor(Math.random() * badges.length)];

      const newActivity = {
        user: randomName,
        action: randomAction,
        target: randomTarget,
        time: "Just now",
        badge: randomBadge
      };

      setActivities(prev => {
        const updated = [newActivity, ...prev.slice(0, 3)];
        // Trigger a quick GSAP fade-in effect on the newly added first row
        gsap.fromTo(".activity-row:first-child", 
          { opacity: 0, x: -15, backgroundColor: "rgba(110, 46, 216, 0.05)" },
          { opacity: 1, x: 0, backgroundColor: "rgba(255, 255, 255, 0)", duration: 0.8, ease: "power2.out" }
        );
        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal headers
      gsap.fromTo(".anim-comm-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Statistics Count-up Trigger
      const statElements = document.querySelectorAll(".stat-counter");
      statElements.forEach(el => {
        const targetValue = parseInt(el.getAttribute("data-target"), 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetValue,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val).toLocaleString();
          }
        });
      });

      // 3. Discussions Slide Left, Leaderboard Slide Right
      gsap.fromTo(".anim-slide-left",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-slide-left",
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(".anim-slide-right",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-slide-right",
            start: "top 80%"
          }
        }
      );

      // 4. Stagger Cards reveals
      gsap.fromTo(".anim-stagger-card",
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-stagger-card",
            start: "top 85%"
          }
        }
      );

      // 6. Floating badges yoyo loop
      gsap.to(".badge-float", {
        y: -5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-4 md:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative text-[#0F172A] overflow-hidden">
      {/* Decorative clean radial gradients */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-200/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-200/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title details */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="anim-comm-header text-xs uppercase font-extrabold tracking-widest text-[#6E2ED8] bg-[#6E2ED8]/10 px-4.5 py-1.5 rounded-full inline-block">
            Global Peer Network
          </h2>
          <h3 className="anim-comm-header text-3xl sm:text-5xl font-black text-[#0B1530] tracking-tight leading-none">
            Thriving Developer Community
          </h3>
          <p className="anim-comm-header text-[#64748B] font-medium text-lg leading-relaxed max-w-2xl mx-auto">
            Collaborate, resolve blocker codes, share architecture reviews, join study groups, and advance your engineering career inside our modern ecosystem.
          </p>
        </div>

        {/* Global Statistics Counters Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {GLOBAL_STATS.map((stat, idx) => (
            <div key={idx} className="anim-comm-header bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="font-extrabold text-3xl sm:text-4xl text-[#0B1530] block">
                <span className="stat-counter" data-target={stat.value}>0</span>
                {stat.suffix}
              </span>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mt-1.5 block">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Main Dashboard Column */}
          <div className="lg:col-span-7 space-y-8 text-left anim-slide-left">
            
            {/* Discussions Segment */}
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold text-[#0B1530] mb-6 flex items-center space-x-2.5">
                <MessageSquare className="w-5 h-5 text-[#6E2ED8]" />
                <span>Trending Discussions</span>
              </h4>

              {DISCUSSION_POSTS.map((post, idx) => (
                <div 
                  key={idx} 
                  className="group p-6 bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg rounded-2xl transition-all duration-300 flex items-start space-x-4 cursor-pointer"
                >
                  <img 
                    src={post.avatar} 
                    alt={post.author} 
                    className="w-10 h-10 rounded-xl border border-slate-200 object-cover"
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-[#0B1530]">{post.author}</span>
                      <span className="text-slate-300 text-xs">•</span>
                      {post.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-slate-100 text-[9px] text-[#64748B] font-mono font-extrabold rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>

                    <h5 className="text-sm sm:text-base font-extrabold text-[#0B1530] group-hover:text-[#6E2ED8] transition-colors line-clamp-1">
                      {post.title}
                    </h5>

                    <div className="flex items-center space-x-4 text-xs text-[#64748B] pt-1 font-semibold">
                      <span className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{post.upvotes}</span>
                      </span>
                      <span className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{post.replies}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{post.views}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Sidebar Dashboard Column */}
          <div className="lg:col-span-5 text-left space-y-8 anim-slide-right">
            
            {/* Leaderboard Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold text-[#0B1530] flex items-center space-x-2.5">
                <Award className="w-5 h-5 text-blue-500" />
                <span>Streak Leaderboard</span>
              </h4>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
                {TOP_USERS.map((user) => (
                  <div 
                    key={user.rank} 
                    className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100/60 hover:bg-slate-100/40 hover:border-slate-200 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-3.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        user.rank === 1 ? "bg-blue-500/20 text-blue-500" :
                        user.rank === 2 ? "bg-slate-200 text-[#64748B]" :
                        "bg-blue-500/20 text-blue-500"
                      }`}>
                        {user.rank}
                      </span>
                      <span className="text-sm font-extrabold text-[#0B1530]">{user.name}</span>
                    </div>

                    <div className="flex items-center space-x-4 font-semibold">
                      <span className="text-xs text-[#64748B] font-mono">{user.xp.toLocaleString()} XP</span>
                      <span className="flex items-center space-x-1 text-xs text-blue-600 font-extrabold">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span>{user.streak} days</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor Spotlight Card */}
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold text-[#0B1530] flex items-center space-x-2.5">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Mentor Spotlight</span>
              </h4>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center space-x-4 group hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" 
                  alt="Mentor"
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-100"
                />
                <div className="flex-1 text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#0B1530]">Dr. Kian Sterling</span>
                    <span className="flex items-center space-x-1 text-[11px] font-extrabold text-blue-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>5.0 (420 answers)</span>
                    </span>
                  </div>
                  <span className="text-xs text-[#6E2ED8] font-bold block">AI & Systems Architect</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["LLMs", "Rust", "Distributed Systems"].map((tag) => (
                      <span key={tag} className="text-[8px] bg-slate-100 text-slate-500 py-0.5 px-2 rounded-md font-mono font-bold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>





      </div>
    </section>
  );
}
