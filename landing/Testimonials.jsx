import React from 'react';
import { Star } from 'lucide-react';

const ROW_1 = [
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

const ROW_2 = [
  {
    name: "Elena Rostova",
    role: "Backend Tech Lead @ Telegram",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    quote: "The System Architecture path is gold. Rebuilding a distributed message broker in Rust was the hardest and most rewarding thing I've done this year.",
    rating: 5
  },
  {
    name: "Marcus Vance",
    role: "VP of Engineering @ Stripe",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80",
    quote: "My engineering team's onboarding time went from weeks to days. They practice directly in the interactive playground without spinning up containers.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Lead SRE @ HashiCorp",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
    quote: "The Devops path with Kubernetes and Terraform is incredibly practical. Highly recommend it to any software engineer wanting to level up.",
    rating: 5
  }
];

const ROW_3 = [
  {
    name: "Dr. CS Professor",
    role: "Computer Science Professor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
    quote: "As a teacher, I love how the AI recommendations guide students. It's like having a personalized co-pilot for every single student.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "UI Designer @ Figma",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80",
    quote: "The frontend developer path is so comprehensive. The CSS grid and flexbox animations visual sandbox helped me build a great portfolio.",
    rating: 5
  },
  {
    name: "Julian Thorne",
    role: "Software Architect @ Netflix",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80",
    quote: "Rebuilding real-world APIs with this platform's library saved me weeks of studying. The instant sandbox compiler is an engineering superpower.",
    rating: 5
  }
];

export default function Testimonials() {
  const Card = ({ t }) => (
    <div className="w-[420px] md:w-[460px] h-[220px] shrink-0 p-6 md:p-8 bg-white/70 backdrop-blur-md border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-3xl flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(110,46,216,0.06)] hover:border-[#6E2ED8]/30 transition-all duration-300 select-none">
      <div className="space-y-3">
        {/* Rating stars & Quote */}
        <div className="flex items-center space-x-1">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-blue-500 fill-current stroke-blue-500" />
          ))}
        </div>

        <p className="text-sm md:text-base text-slate-700 italic leading-relaxed text-left font-medium line-clamp-3">
          "{t.quote}"
        </p>
      </div>

      {/* Author detail */}
      <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
        <img 
          src={t.avatar} 
          alt={t.name}
          className="w-11 h-11 rounded-full border-2 border-white shadow-sm object-cover"
        />
        <div className="text-left">
          <h4 className="text-sm font-extrabold text-[#0B1530]">{t.name}</h4>
          <span className="text-xs font-semibold text-slate-500">{t.role}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 relative bg-white overflow-hidden text-[#0F172A]">
      {/* Side Fading Glow Effects */}
      <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full mb-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#6E2ED8]">Student & Engineer Success</h2>
          <h3 className="text-3xl md:text-5xl font-black text-[#0B1530] tracking-tight">Trusted by Thousands globally</h3>
          <p className="text-[#64748B] text-lg font-medium leading-relaxed">
            Read how developers are mastering skills, building products, and unlocking careers.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-l-to-r {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes marquee-r-to-l {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-scroll-l-to-r {
          animation: marquee-l-to-r 45s linear infinite;
        }
        .animate-scroll-r-to-l {
          animation: marquee-r-to-l 45s linear infinite;
        }
        .animate-scroll-l-to-r:hover, .animate-scroll-r-to-l:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Marquee Rows */}
      <div className="space-y-8 w-screen left-1/2 right-1/2 -ml-[50vw] +mr-[50vw] relative">
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden select-none w-full">
          <div className="flex whitespace-nowrap gap-6 animate-scroll-l-to-r py-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {ROW_1.map((t, idx) => <Card key={idx} t={t} />)}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden select-none w-full">
          <div className="flex whitespace-nowrap gap-6 animate-scroll-r-to-l py-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {ROW_2.map((t, idx) => <Card key={idx} t={t} />)}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Left to Right */}
        <div className="flex overflow-hidden select-none w-full">
          <div className="flex whitespace-nowrap gap-6 animate-scroll-l-to-r py-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {ROW_3.map((t, idx) => <Card key={idx} t={t} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
