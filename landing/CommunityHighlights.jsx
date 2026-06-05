import React from 'react';
import { MessageSquare, ThumbsUp, Eye, Award, Flame, Star } from 'lucide-react';

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
  }
];

const TOP_USERS = [
  { rank: 1, name: "Pranav M.", xp: "12,450 XP", streak: "48 days" },
  { rank: 2, name: "Jessica K.", xp: "10,890 XP", streak: "32 days" },
  { rank: 3, name: "Arjun S.", xp: "9,940 XP", streak: "15 days" }
];

export default function CommunityHighlights() {
  return (
    <section className="py-24 px-4 md:px-8 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title details */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-orange-500">Global Peer Network</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Thriving Developer Community</h3>
          <p className="text-slate-400">
            Collaborate, resolve blockers, share feedback, and challenge your programming skills on the global developer dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Discussions Column */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              <span>Trending Discussions</span>
            </h4>

            {DISCUSSION_POSTS.map((post, idx) => (
              <div 
                key={idx} 
                className="group p-5 bg-slate-900/35 border border-slate-850 hover:border-slate-800 rounded-xl transition-all duration-300 flex items-start space-x-4"
              >
                <img 
                  src={post.avatar} 
                  alt={post.author} 
                  className="w-10 h-10 rounded-full border border-slate-700/60"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-300">{post.author}</span>
                    <span className="text-slate-600 text-xs">•</span>
                    {post.tags.map(t => (
                      <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-[9px] text-slate-400 font-mono rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h5 className="text-sm font-bold text-slate-100 group-hover:text-orange-400 transition-colors line-clamp-1">
                    {post.title}
                  </h5>

                  {/* Actions stats counts */}
                  <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1.5">
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.upvotes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
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

          {/* Leaderboard Column */}
          <div className="lg:col-span-5 text-left">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Streak Leaderboard</span>
            </h4>

            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              {TOP_USERS.map((user) => (
                <div 
                  key={user.rank} 
                  className="flex items-center justify-between p-3.5 bg-slate-950/40 rounded-xl border border-slate-850 hover:border-slate-800 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                      user.rank === 1 ? "bg-amber-500/20 text-amber-400" :
                      user.rank === 2 ? "bg-slate-400/20 text-slate-300" :
                      "bg-amber-700/20 text-amber-600"
                    }`}>
                      {user.rank}
                    </span>
                    <span className="text-sm font-bold text-slate-200">{user.name}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-slate-400 font-mono">{user.xp}</span>
                    <span className="flex items-center space-x-1 text-xs text-orange-400 font-bold">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>{user.streak}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
