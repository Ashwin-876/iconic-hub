import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger client-side only
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = ["All", "Web Dev", "AI & ML", "Cloud & DevOps"];

const MOCK_COURSES = [
  {
    id: "nextjs-mastery",
    title: "Next.js 14 Production Masterclass",
    category: "Web Dev",
    instructor: "Sarah Jenkins",
    instructorRole: "Lead Frontend Architect",
    duration: "18h 45m",
    lessons: 48,
    rating: 4.9,
    enrollments: 4120,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "ai-engineer-python",
    title: "LLM Orchestration & Agentic Systems",
    category: "AI & ML",
    instructor: "Dr. Kian Sterling",
    instructorRole: "AI Research Scientist",
    duration: "24h 15m",
    lessons: 64,
    rating: 5.0,
    enrollments: 3490,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: "kubernetes-production",
    title: "Kubernetes & Docker in Enterprise",
    category: "Cloud & DevOps",
    instructor: "Markus Vance",
    instructorRole: "Principal Cloud Engineer",
    duration: "15h 30m",
    lessons: 32,
    rating: 4.8,
    enrollments: 1980,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "typescript-advanced",
    title: "TypeScript Deep Dive & Design Patterns",
    category: "Web Dev",
    instructor: "Elena Rostova",
    instructorRole: "Senior Systems Engineer",
    duration: "12h 10m",
    lessons: 28,
    rating: 4.9,
    enrollments: 2850,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    color: "from-blue-500 to-indigo-600"
  }
];

export default function CoursesShowcase() {
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const headerRef = useRef(null);

  const filteredCourses = activeTab === "All" 
    ? MOCK_COURSES 
    : MOCK_COURSES.filter(c => c.category === activeTab);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header and filters
      gsap.fromTo(".animate-fade-up", 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate course cards on load
      gsap.fromTo(".course-card-anim",
        { y: 60, opacity: 0, scale: 0.95, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Category switch animation
  const handleTabChange = (category) => {
    if (category === activeTab) return;

    gsap.to(".course-card-anim", {
      opacity: 0,
      y: 20,
      scale: 0.98,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(category);
        // Animate them back in
        gsap.fromTo(".course-card-anim",
          { y: 30, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.1
          }
        );
      }
    });
  };

  // Mouse Tilt effect on Card
  const handleMouseMove = (e) => {
    const cardEl = e.currentTarget;
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = (yc - y) / 20; // max 10 degrees tilt
    const angleY = (x - xc) / 20; 

    const glowEl = cardEl.querySelector('.card-glow');
    if (glowEl) {
      gsap.to(glowEl, {
        x: x - 150,
        y: y - 150,
        opacity: 0.15,
        duration: 0.3
      });
    }

    gsap.to(cardEl, {
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (e) => {
    const cardEl = e.currentTarget;
    if (!cardEl) return;
    const glowEl = cardEl.querySelector('.card-glow');
    if (glowEl) {
      gsap.to(glowEl, {
        opacity: 0,
        duration: 0.5
      });
    }

    gsap.to(cardEl, {
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section ref={sectionRef} className="py-28 px-4 md:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Subtle background graphics */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/10 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[140px]" />
      </div>

      {/* Infinite Scrolling Marquee Section */}
      <div className="w-screen left-1/2 right-1/2 -ml-[50vw] +mr-[50vw] relative bg-white/70 backdrop-blur-md overflow-hidden py-8 border-y border-slate-100 mb-20 select-none z-10">
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-left {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes marquee-right {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .animate-marquee-left {
            animation: marquee-left 45s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 45s linear infinite;
          }
          .animate-marquee-left:hover, .animate-marquee-right:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="relative z-10 space-y-4">
          {/* Row 1 */}
          <div className="flex overflow-hidden">
            <div className="flex whitespace-nowrap gap-4 animate-marquee-left py-1">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center text-xs md:text-sm font-bold uppercase tracking-wider text-black">
                  {["Coding Compiler", "Interactive Courses", "Live Sessions", "Industry Certifications", "Career Growth", "Progress Tracking", "AI Learning Assistant", "Smart Assessments", "Expert Mentorship", "Learning Community"].map((text, idx) => (
                    <span 
                      key={idx} 
                      className="px-5 py-2.5 bg-white/80 rounded-xl border border-slate-200 shadow-sm inline-block hover:border-purple-500 hover:text-purple-600 transition-all duration-300 cursor-pointer"
                    >
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex overflow-hidden">
            <div className="flex whitespace-nowrap gap-4 animate-marquee-right py-1">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center text-xs md:text-sm font-bold uppercase tracking-wider text-black">
                  {["Skill Development", "Learning Analytics", "Learning Streaks", "Mobile Learning", "Job-Ready Skills", "Hands-On Projects", "Personalized Learning Paths", "Interview Preparation", "Placement Support"].map((text, idx) => (
                    <span 
                      key={idx} 
                      className="px-5 py-2.5 bg-white/80 rounded-xl border border-slate-200 shadow-sm inline-block hover:border-purple-500 hover:text-purple-600 transition-all duration-300 cursor-pointer"
                    >
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 text-left">
          <div className="space-y-4 max-w-2xl">
            <h2 className="animate-fade-up text-xs uppercase font-extrabold tracking-widest text-[#6E2ED8] bg-purple-500/10 px-3 py-1.5 rounded-full inline-block">
              Curated Learning
            </h2>
            <h3 className="animate-fade-up text-3xl sm:text-5xl font-black text-[#0B1530] tracking-tight leading-tight">
              Explore Premium Courses
            </h3>
            <p className="animate-fade-up text-[#64748B] font-medium text-lg leading-relaxed">
              Master the exact technologies companies are hiring for today. Fully interactive lessons built for builders, engineered for success.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="animate-fade-up flex flex-wrap gap-2 lg:mb-2 bg-slate-100/80 backdrop-blur p-1.5 rounded-2xl border border-slate-200/50 self-start lg:self-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleTabChange(cat)}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                  activeTab === cat 
                    ? "bg-[#6E2ED8] text-white shadow-lg shadow-purple-600/20" 
                    : "text-[#64748B] hover:text-[#6E2ED8] hover:bg-white/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="course-card-anim group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 flex flex-col justify-between relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Radial gradient glow for hover interaction */}
              <div className="card-glow absolute w-[300px] h-[300px] bg-[#6E2ED8] rounded-full blur-[100px] opacity-0 pointer-events-none z-0 transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Media Preview Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 m-3 rounded-2xl group-hover:shadow-md transition-all duration-500">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Glassmorphic Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-[#0B1530] border border-slate-200/50 rounded-lg shadow-sm">
                    {course.category}
                  </span>

                  {/* Play icon hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-slate-900/10 backdrop-blur-[2px]">
                    <div className="p-4 bg-white text-[#6E2ED8] rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-500 ease-out">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                </div>

                {/* Course Detail text */}
                <div className="px-6 pb-6 pt-2 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${course.color}`} />
                      <span className="text-[10px] text-[#64748B] font-semibold">{course.instructorRole}</span>
                    </div>

                    <h4 className="text-lg font-extrabold text-[#0B1530] leading-snug group-hover:text-[#6E2ED8] transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                      {course.title}
                    </h4>

                    <div className="flex items-center space-x-2 text-xs text-[#64748B] font-semibold">
                      <span>By {course.instructor}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    {/* Course stats icons */}
                    <div className="flex items-center justify-between text-xs text-[#64748B] border-t border-slate-100 pt-4 font-semibold">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>

                    {/* Enroll row */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-blue-500 fill-current" />
                        <span className="text-xs font-extrabold text-[#0B1530]">{course.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-[#64748B] font-semibold">({course.enrollments})</span>
                      </div>

                      <Link 
                        to="/dashboard"
                        className="text-xs font-bold text-[#6E2ED8] group-hover:text-[#5921B6] flex items-center space-x-1 py-1.5 px-3 rounded-lg hover:bg-purple-50 transition-all duration-300"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center animate-fade-up">
          <Link 
            to="/dashboard"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#0B1530] hover:bg-[#1E293B] text-white font-bold rounded-2xl shadow-xl hover:shadow-slate-900/10 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group text-sm"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
