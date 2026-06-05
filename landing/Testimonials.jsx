import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS_DATA = [
  {
    name: "Alex Rivera",
    role: "Full Stack Engineer @ Vercel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    quote: "Iconic Hub changed the way I learn. The browser compiler is super fast, and the AI Tutor instantly reviews my Pull Requests before I deploy.",
    rating: 5
  },
  {
    name: "Deepa Nair",
    role: "AI Graduate Scholar @ Stanford",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    quote: "The LLM orchestration courses are outstanding. The interactive coding challenges helped me understand vector databases and semantic search.",
    rating: 5
  },
  {
    name: "Toby Vance",
    role: "Self-Taught Junior Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    quote: "I landed my first developer role in 6 months using the Frontend learning path. The AI Recommendations kept me motivated to build products.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 md:px-8 relative bg-slate-900/10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-orange-500">Student & Engineer Success</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Trusted by Thousands globally</h3>
          <p className="text-slate-400">
            Read how developers are using Iconic Hub to master skills, build projects, and unlock careers.
          </p>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div 
              key={idx} 
              className="p-8 glass-panel rounded-2xl border border-white/10 hover:border-white/15 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center space-x-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Author detail */}
              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-slate-800/80">
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  className="w-10 h-10 rounded-full border border-slate-700/60 object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <span className="text-xs text-slate-500">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
