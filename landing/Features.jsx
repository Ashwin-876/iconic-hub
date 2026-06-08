import React, { useEffect, useRef } from 'react';
import { BookOpen, Award, Sparkles, TrendingUp, CheckCircle, BarChart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const services = [
    {
      title: "Interactive Learning",
      description: "Engage with high-quality video lessons, hands-on coding sandboxes, quizzes, and real-world projects designed to build practical, employable skills.",
      iconBg: "bg-gradient-to-tr from-purple-500 to-indigo-500 text-white",
      icon: <BookOpen className="w-6 h-6" />,
      floatDelay: "0s"
    },
    {
      title: "Industry Certifications",
      description: "Earn professional certificates, badges, and verified credentials to demonstrate your technical competence to top-tier hiring managers globally.",
      iconBg: "bg-gradient-to-tr from-blue-500 to-cyan-500 text-white",
      icon: <Award className="w-6 h-6" />,
      floatDelay: "1.2s"
    },
    {
      title: "AI Learning Assistant",
      description: "Get 24/7 personalized course recommendations, code review suggestions, and instant tutor explanations tailored to your active coding session.",
      iconBg: "bg-gradient-to-tr from-blue-500 to-blue-500 text-white",
      icon: <Sparkles className="w-6 h-6" />,
      floatDelay: "0.6s"
    },
    {
      title: "Career Growth",
      description: "Transition from learner to developer with mock interview prep, curated portfolio builders, placement pipelines, and tech career advising.",
      iconBg: "bg-gradient-to-tr from-rose-500 to-pink-500 text-white",
      icon: <TrendingUp className="w-6 h-6" />,
      floatDelay: "1.8s"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance reveal for headers
      gsap.fromTo('.anim-feat-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 2. Entrance reveal for service cards
      gsap.fromTo('.anim-feat-card',
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.anim-feat-card',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. GSAP Count-up Trigger for stats
      const statElements = document.querySelectorAll('.features-stat-counter');
      statElements.forEach(el => {
        const targetValue = parseInt(el.getAttribute('data-target'), 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetValue,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val).toLocaleString();
          }
        });
      });

      // 4. Parallax effect for exit
      gsap.to(containerRef.current, {
        opacity: 0.85,
        y: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 90%',
          end: 'bottom top',
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Card Tilt mouse handlers
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    const rotateX = ((y / rect.height) - 0.5) * -12; 
    const rotateY = ((x / rect.width) - 0.5) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s ease-out';
  };

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="py-24 bg-white text-[#0F172A] relative overflow-hidden"
    >
      {/* Background glowing decorations */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-icon {
          0% { transform: translateY(0px) rotate(-1deg); }
          100% { transform: translateY(-8px) rotate(3deg); }
        }
        .animate-float-icon {
          animation: float-icon 4s ease-in-out infinite alternate;
        }

        /* Floating UI elements surrounding graduate student */
        @keyframes float-ui-1 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes float-ui-2 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(12px) rotate(-2deg); }
        }
        .animate-float-ui-1 {
          animation: float-ui-1 5s ease-in-out infinite alternate;
        }
        .animate-float-ui-2 {
          animation: float-ui-2 6s ease-in-out infinite alternate;
        }
      `}} />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* LMS Features Header & Cards */}
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="anim-feat-header text-xs uppercase font-extrabold tracking-widest text-[#6E2ED8] block">
              Core Platform Features
            </h2>
            <h3 className="anim-feat-header text-3xl md:text-5xl font-black text-[#0B1530] tracking-tight leading-tight">
              Transform Learning Into Career Success
            </h3>
            <p className="anim-feat-header text-[#64748B] font-medium text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Master in-demand skills, earn certifications, and accelerate your career through interactive learning experiences.
            </p>
          </div>
 
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            {services.map((service, idx) => (
              <div 
                key={idx}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="anim-feat-card group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 shadow-[0_10px_40px_rgba(15,23,42,0.03)] flex flex-col items-start text-left space-y-6 hover:shadow-[0_30px_60px_rgba(110,46,216,0.1)] hover:border-[#6E2ED8]/25 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Glowing border outline highlight on card hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/10 rounded-3xl pointer-events-none transition-colors duration-300" />

                {/* Decorative background hover glow circle */}
                <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-purple-500/5 group-hover:scale-[3.8] blur-2xl transition-all duration-500 pointer-events-none" />

                {/* Icon wrapper with floating animation */}
                <div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg animate-float-icon ${service.iconBg}`}
                  style={{ animationDelay: service.floatDelay }}
                >
                  {service.icon}
                </div>
                
                <div className="space-y-3 relative z-10">
                  <h4 className="font-extrabold text-xl text-[#0B1530] group-hover:text-[#6E2ED8] transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-sm text-[#64748B] leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
                
                <div className="pt-2 relative z-10 mt-auto">
                  <span className="text-xs font-extrabold text-[#6E2ED8] group-hover:text-[#5921B6] inline-flex items-center space-x-1">
                    <span>Learn more</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access to learning anytime and anywhere section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-8">
          
          {/* Left: Graduation Student Illustration & Floating Cards */}
          <div className="lg:col-span-6 flex justify-center relative select-none">
            <div className="relative w-[340px] h-[380px] sm:w-[400px] sm:h-[450px] lg:w-[450px] lg:h-[500px] flex items-end justify-center">
              
              {/* Graduate Student Portrait cutout */}
              <img
                alt="Graduate Student"
                className="relative z-10 w-[85%] h-[92%] object-cover object-top transform scale-105"
                src="/graduate_student.png"
              />

              {/* Floating UI Element 1: Achievement Card (Top Left) */}
              <div className="absolute top-8 -left-8 z-20 animate-float-ui-1 bg-white/90 backdrop-blur-md border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl p-4 flex items-center space-x-3 w-[200px]">
                <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-extrabold text-slate-400 block tracking-wider">Achievement</span>
                  <span className="text-xs font-bold text-slate-800">AI Engineer Certified</span>
                </div>
              </div>

              {/* Floating UI Element 4: Progress Tracker Card (Mid Right) */}
              <div className="absolute top-28 -right-12 z-20 animate-float-ui-2 bg-white/90 backdrop-blur-md border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl p-4 flex items-center space-x-3 w-[190px]">
                <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl">
                  <BarChart className="w-5 h-5" />
                </div>
                <div className="text-left flex-1 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Course Progress</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full w-[85%]" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700">85%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Text & statistics grid */}
          <div className="lg:col-span-6 text-left space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#6E2ED8] block">
                World-Class EdTech Learning
              </h2>
              <h3 className="font-black text-3xl sm:text-5xl text-[#0B1530] tracking-tight leading-tight">
                Access to learning anytime and anywhere
              </h3>
              <p className="text-[#64748B] font-medium text-base md:text-lg leading-relaxed">
                Accelerate your engineering journey. Write, learn, and build with cutting-edge tools and a 24/7 AI tutor co-pilot.
              </p>
            </div>

            {/* Statistics grid with GSAP count-up animations */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-6 border-t border-b border-dashed border-slate-200 py-6">
              <div>
                <span className="font-extrabold text-4xl text-[#0B1530] block">
                  <span className="features-stat-counter" data-target="300">0</span>+
                </span>
                <span className="text-sm text-[#64748B] font-bold">Experienced Teachers</span>
              </div>
              <div className="border-l border-dashed border-slate-200 pl-8">
                <span className="font-extrabold text-4xl text-[#0B1530] block">
                  <span className="features-stat-counter" data-target="100">0</span>k+
                </span>
                <span className="text-sm text-[#64748B] font-bold">Successful Graduates</span>
              </div>
              <div className="border-t border-dashed border-slate-200 pt-6">
                <span className="font-extrabold text-4xl text-[#0B1530] block">
                  <span className="features-stat-counter" data-target="70">0</span>+
                </span>
                <span className="text-sm text-[#64748B] font-bold">Learning Paths</span>
              </div>
              <div className="border-l border-t border-dashed border-slate-200 pl-8 pt-6">
                <span className="font-extrabold text-4xl text-[#0B1530] block">
                  <span className="features-stat-counter" data-target="98">0</span>%
                </span>
                <span className="text-sm text-[#64748B] font-bold">Job Success Rate</span>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button className="px-8 py-4 bg-[#6E2ED8] text-white font-bold rounded-full hover:bg-[#5921B6] active:scale-95 transition-all shadow-lg hover:shadow-purple-600/30 text-base">
                Get Started
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
