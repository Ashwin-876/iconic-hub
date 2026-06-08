import React, { useEffect, useRef } from 'react';
import { Play, ArrowRight } from 'lucide-react';
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
      className="relative min-h-[calc(100vh-73px)] w-full bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-hidden flex items-center justify-center py-12"
    >
      {/* Background Gradients for Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-purple-200/20 to-blue-200/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-emerald-100/15 to-indigo-200/25 blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center z-10 min-h-[75vh]">
        
        {/* Centered Hero Content Block */}
        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-25 -mt-16 md:-mt-24 px-4">
          
          {/* Large Premium Headline */}
          <h1 
            ref={headlineRef} 
            className="font-black text-3xl sm:text-4xl lg:text-5xl text-[#0B1530] tracking-tight leading-[1.2] max-w-2xl mx-auto whitespace-pre-line"
          >
            Let's Learn about new{'\n'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E2ED8] to-[#4F46E5]">
              Knowledge and abilities.
            </span>
          </h1>
          
          {/* Short Supporting Description */}
          <p 
            ref={descRef} 
            className="text-[#64748B] font-medium text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Empowering learners with industry-ready courses, real-world projects, expert guidance, and certifications that open new opportunities.
          </p>

          {/* Primary and Secondary CTA Buttons */}
          <div ref={ctasRef} className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <button
              onClick={handleGetStarted}
              className="group flex items-center gap-2 px-8 py-4 bg-[#6E2ED8] text-white font-bold rounded-full hover:bg-[#5921B6] active:scale-95 transition-all shadow-lg shadow-purple-600/25 text-sm sm:text-base"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={handleWatchVideo}
              className="flex items-center gap-3 px-6 py-4 bg-white/85 backdrop-blur-md border border-slate-200/80 hover:bg-slate-50/90 rounded-full transition-all group shadow-sm"
            >
              <span className="w-8 h-8 bg-[#6E2ED8]/10 text-[#6E2ED8] rounded-full flex items-center justify-center group-hover:bg-[#6E2ED8] group-hover:text-white transition-all">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </span>
              <span className="font-bold text-sm sm:text-base text-[#0B1530] group-hover:text-[#6E2ED8] transition-colors">
                Watch Video
              </span>
            </button>
          </div>
        </div>

        {/* Distributed Student Cards */}
        
        {/* Card 1: Top Left (Large) - Beside headline area */}
        <div 
          ref={el => cardsRef.current[0] = el}
          className="hidden md:block absolute left-[1.5%] lg:left-[4%] top-[3%] w-[140px] lg:w-[190px] aspect-[1/1.5] z-10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-purple-900/10 group"
        >
          <div className="relative w-full h-full bg-gradient-to-b from-[#FAF5FF] to-[#E9D5FF] rounded-t-[120px] rounded-b-[120px] shadow-xl shadow-purple-900/5 border border-white/60 p-2.5 flex items-center justify-center overflow-hidden">
            <img
              alt="Student portrait"
              className="w-full h-full object-cover rounded-t-[105px] rounded-b-[105px] transform group-hover:scale-105 transition-transform duration-500"
              src="/student_1.png"
            />
          </div>
        </div>

        {/* Card 4: Top Right (Large) - Beside headline area */}
        <div 
          ref={el => cardsRef.current[3] = el}
          className="hidden md:block absolute right-[1.5%] lg:right-[4%] top-[3%] w-[140px] lg:w-[190px] aspect-[1/1.5] z-10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-rose-900/10 group"
        >
          <div className="relative w-full h-full bg-gradient-to-b from-[#FFF5F5] to-[#FFE4E6] rounded-t-[120px] rounded-b-[120px] shadow-xl shadow-rose-900/5 border border-white/60 p-2.5 flex items-center justify-center overflow-hidden">
            <img
              alt="Student portrait"
              className="w-full h-full object-cover rounded-t-[105px] rounded-b-[105px] transform group-hover:scale-105 transition-transform duration-500"
              src="/student_4.png"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
