import React, { useEffect, useRef } from 'react';
import { Play, ArrowRight, Users, BookOpen, Star, Award, Globe, Code, Headphones } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctasRef = useRef(null);
  const cardsRef = useRef([]);

  const handleWatchVideo = () => {
    alert('Playing introductory video...');
  };

  const handleGetStarted = () => {
    alert('Getting started...');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Entry Animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      );

      tl.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );

      tl.fromTo(ctasRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.6'
      );

      // Filter out any null/undefined references in array
      const validCards = cardsRef.current.filter(Boolean);

      // Stagger reveal student cards with slight rotate/scale
      tl.fromTo(validCards,
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' },
        '-=0.8'
      );

      // 2. Continuous Idle Floating Animation for Cards
      validCards.forEach((card, idx) => {
        gsap.to(card, {
          y: idx % 2 === 0 ? '-=15' : '+=15',
          rotation: idx % 2 === 0 ? -1.5 : 1.5,
          duration: 3 + idx * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.25
        });
      });

      // 3. Parallax scroll effect
      validCards.forEach((card, idx) => {
        gsap.to(card, {
          y: idx % 2 === 0 ? '-=80' : '-=50',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-hidden flex flex-col items-center justify-center py-20"
    >
      {/* Background Gradients for Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-purple-200/20 to-blue-200/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-emerald-100/15 to-indigo-200/25 blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center z-10">
        
        {/* Centered Hero Content Block */}
        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-20 px-4">
          

          {/* Large Premium Headline */}
          <h1 
            ref={headlineRef} 
            className="font-black text-3xl sm:text-4xl lg:text-5xl text-[#0B1530] tracking-tight leading-[1.2] max-w-2xl mx-auto"
          >
            Let's Learn about new{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E2ED8] to-[#4F46E5] block mt-1">
              Knowledge and abilities.
            </span>
          </h1>
          
          {/* Short Supporting Description */}
          <p 
            ref={descRef} 
            className="text-[#64748B] font-semibold text-xs sm:text-sm leading-relaxed max-w-xl mx-auto"
          >
            Empowering learners with industry-ready courses, real-world projects, expert guidance, and certifications that open new opportunities.
          </p>

          {/* Primary and Secondary CTA Buttons */}
          <div ref={ctasRef} className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <button
              onClick={handleGetStarted}
              className="group flex items-center gap-2 px-8 py-3.5 bg-[#6E2ED8] text-white font-bold rounded-full hover:bg-[#5921B6] active:scale-95 transition-all shadow-lg shadow-purple-600/25 text-xs sm:text-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={handleWatchVideo}
              className="flex items-center gap-3 px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-all group shadow-sm"
            >
              <span className="w-7 h-7 bg-[#6E2ED8]/10 text-[#6E2ED8] rounded-full flex items-center justify-center group-hover:bg-[#6E2ED8] group-hover:text-white transition-all">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              <span className="font-bold text-xs text-[#0B1530] group-hover:text-[#6E2ED8] transition-colors">
                Watch Video
              </span>
            </button>
          </div>

          {/* Learners Group Avatars Section */}
          <div className="flex items-center gap-3 pt-4 justify-center">
            <div className="flex -space-x-2">
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="/student_1.png" alt="User" />
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="/student_2.png" alt="User" />
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="/student_3.png" alt="User" />
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="/student_4.png" alt="User" />
            </div>
            <div className="text-[11px] font-bold text-slate-500">
              Join <span className="text-[#6E2ED8]">50,000+</span> Learners and start learning today!
            </div>
          </div>
        </div>

        {/* Distributed Student Cards */}
        
        {/* Card 1: Left Card Container */}
        <div className="hidden md:block absolute left-[1%] lg:left-[3%] top-[10%] z-10">
          <div className="relative">
            {/* Card Frame */}
            <div 
              ref={el => cardsRef.current[0] = el}
              className="w-[130px] lg:w-[175px] aspect-[1/1.45] transition-shadow duration-500 hover:shadow-2xl hover:shadow-purple-900/10 group"
            >
              <div className="relative w-full h-full bg-gradient-to-b from-[#FAF5FF] to-[#E9D5FF] rounded-t-[120px] rounded-b-[120px] shadow-xl shadow-purple-900/5 border border-white/60 p-2 flex items-center justify-center overflow-hidden">
                <img
                  alt="Student portrait"
                  className="w-full h-full object-cover rounded-t-[105px] rounded-b-[105px] transform group-hover:scale-105 transition-transform duration-500"
                  src="/student_1.png"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Right Card Container */}
        <div className="hidden md:block absolute right-[1%] lg:right-[3%] top-[10%] z-10">
          <div className="relative">
            {/* Card Frame */}
            <div 
              ref={el => cardsRef.current[3] = el}
              className="w-[130px] lg:w-[175px] aspect-[1/1.45] transition-shadow duration-500 hover:shadow-2xl hover:shadow-rose-900/10 group"
            >
              <div className="relative w-full h-full bg-gradient-to-b from-[#FFF5F5] to-[#FFE4E6] rounded-t-[120px] rounded-b-[120px] shadow-xl shadow-rose-900/5 border border-white/60 p-2 flex items-center justify-center overflow-hidden">
                <img
                  alt="Student portrait"
                  className="w-full h-full object-cover rounded-t-[105px] rounded-b-[105px] transform group-hover:scale-105 transition-transform duration-500"
                  src="/student_4.png"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Stats Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 mt-16 z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 bg-white/80 backdrop-blur-md border border-slate-200/50 p-6 rounded-[32px] shadow-sm">
          {[
            { value: '50,000+', label: 'Active Learners', icon: <Users className="w-4 h-4 text-purple-600" />, color: 'bg-purple-100' },
            { value: '1,500+', label: 'Expert Courses', icon: <BookOpen className="w-4 h-4 text-emerald-600" />, color: 'bg-emerald-100' },
            { value: '4.8/5', label: 'Learner Rating', icon: <Star className="w-4 h-4 text-amber-600 fill-current" />, color: 'bg-amber-100' },
            { value: '25,000+', label: 'Certifications Issued', icon: <Award className="w-4 h-4 text-blue-600" />, color: 'bg-blue-100' },
            { value: '120+', label: 'Countries Reached', icon: <Globe className="w-4 h-4 text-pink-600" />, color: 'bg-pink-100' }
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 justify-start md:border-r last:border-0 border-slate-200/50 last:pr-0 pr-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-left">
                <div className="text-sm font-extrabold text-[#0B1530]">{stat.value}</div>
                <div className="text-[10px] text-slate-500 font-bold leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 mt-6 z-10">
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#6E2ED8] p-6 rounded-[32px] shadow-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-white text-left">
          {[
            { title: 'Industry Expert Mentors', desc: 'Learn from professionals with real-world experience.', icon: <Users className="w-4 h-4 text-white/90" /> },
            { title: 'Hands-on Projects', desc: 'Build real projects and strengthen your portfolio.', icon: <Code className="w-4 h-4 text-white/90" /> },
            { title: 'Recognized Certificates', desc: 'Earn certificates that boost your career.', icon: <Award className="w-4 h-4 text-white/90" /> },
            { title: '24/7 Learning Support', desc: 'Get help anytime with our dedicated support team.', icon: <Headphones className="w-4 h-4 text-white/90" /> }
          ].map((info, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-sm shrink-0 mt-0.5">
                {info.icon}
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider">{info.title}</h4>
                <p className="text-[10px] text-white/70 mt-1 font-medium leading-relaxed">{info.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
