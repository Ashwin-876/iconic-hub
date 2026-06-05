import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, Code, Database, Cpu, Lock, Check, Brain, 
  Clock, TrendingUp, Timer, Award, Globe, Users, Star, ArrowRight, BookOpen, 
  Search, Bell, Bookmark, ChevronLeft, ChevronRight, Activity, Calendar, HelpCircle
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function ProductDesignerPath() {
  const [progress, setProgress] = useState(80);
  const [enrolled, setEnrolled] = useState(false);

  const mentors = [
    {
      name: "Sarah Jenkins",
      role: "UX Design Lead",
      credentials: "Head of GenAI @ Anthropic, Ex-Apple Design Team",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX_CipNLoNFDfQQhY8bZl5SD_brSFWuceMoOY2r9jy86Kxw6D7--AobEUnHPFKUicDAaVT2ek7dxDbJnQjbAXR8HTkafvAWTCjUKOrXIQ6q30GncF0joXzPsegiXngto90XJx-s62IMDl9SDguIzeLFRIpHCaHGca7WmpThAFnUcMNKPk2hN0MKdWYcyytBM20dyHjYBpfSE985Idcy1tALLUbDlmyfxb3XkE1gdNPgYdvmD7HLjxtEHnPS5RzIVL1anMrpveMB2qN"
    },
    {
      name: "David Okafor",
      role: "UI & Motion Architect",
      credentials: "Creative Fellow @ MIT, UX Netflix",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4H7_GVZSadc9CLSEXqaFNd6Xfj7BTavYgD2vOGQ3RNFoIjkeMfSZC0xNrTt5COxNrTt5COnCIIZD_LSQfs1phSBePPuhRieXSfV5GavFQfZfioqJ9J7bFI1GRqXwBcJCYyNoijvjN-axcJRovl_rQAK-jtWtVokSlPjuloBL_Oqsozx_0h2gPNjNw8KdR87BJwyrYo8s-B_y_14ltOX6TvfZgha7pXIXetMtDMTmI6dV2Ilaj_xnyLY_D4S_cWn1tYbxfDsEH4ENWKain_joz"
    }
  ];

  const handleResumeClick = () => {
    setProgress(prev => Math.min(100, prev + 5));
  };

  const handleEnrollClick = () => {
    setEnrolled(prev => !prev);
  };

  return (
    <PageTransition>
      <div className="bg-[#fff8f6] text-[#261812] font-sans min-h-screen pb-16 selection:bg-vibrant-orange/30 text-left">
        <style dangerouslySetInnerHTML={{ __html: `
          .glass-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px 0 rgba(255, 107, 0, 0.05);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .glass-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px 0 rgba(255, 107, 0, 0.08);
          }
          .roadmap-line {
            background: linear-gradient(to bottom, #FF6B00 0%, #FF6B00 65%, #e2bfb0 100%);
          }
          .vibrant-glow {
            box-shadow: 0 0 24px rgba(255, 107, 0, 0.35);
          }
          .hero-mesh {
            background-image: radial-gradient(at 0% 0%, rgba(255, 107, 0, 0.15) 0%, transparent 50%),
                              radial-gradient(at 100% 100%, rgba(255, 107, 0, 0.1) 0%, transparent 50%);
          }
        `}} />

        <Header />

        <main className="relative min-h-screen text-left">
          {/* Immersive Hero Section */}
          <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                alt="Product design command center" 
                className="w-full h-full object-cover brightness-[0.6] contrast-[1.1]" 
                src="https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=1200" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fff8f6]/40 to-[#fff8f6]"></div>
              <div className="absolute inset-0 hero-mesh"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibrant-orange/10 border border-vibrant-orange/20 mb-6 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-vibrant-orange" />
                <span className="text-xs font-bold text-vibrant-orange uppercase tracking-wider">Professional Learning Path</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                Product Designer
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                Master the intersection of aesthetics and user psychology. Learn UX research, wireframing, high-fidelity UI prototyping, and building responsive design systems.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <button onClick={handleResumeClick} className="px-8 py-3.5 bg-vibrant-orange text-white rounded-xl font-bold text-sm whitespace-nowrap vibrant-glow hover:translate-y-[-2px] hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-vibrant-orange/20 flex items-center justify-center">
                  Continue Journey
                </button>
                <button className="px-8 py-3.5 bg-white/70 border border-vibrant-orange/40 text-vibrant-orange rounded-xl font-bold text-sm whitespace-nowrap backdrop-blur-md hover:bg-[#fff1eb] hover:border-vibrant-orange transition-all active:scale-95 flex items-center justify-center">
                  View Curriculum
                </button>
              </div>
            </div>
          </section>

          {/* Command Center Grid */}
          <section className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Main Journey Column */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* Progress Overview Card */}
                <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center gap-10">
                  <div className="relative w-44 h-44 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-[#f8ddd2]" cx="88" cy="88" fill="transparent" r="76" stroke="currentColor" strokeWidth="14"></circle>
                      <circle 
                        className="text-vibrant-orange rounded-full drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]" 
                        cx="88" 
                        cy="88" 
                        fill="transparent" 
                        r="76" 
                        stroke="currentColor" 
                        strokeWidth="14"
                        strokeDasharray="477.5"
                        strokeDashoffset={477.5 - (477.5 * progress) / 100}
                        strokeLinecap="round"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold text-[#261812] leading-none">{progress}%</span>
                      <span className="text-xs font-semibold text-[#5a4136] mt-1">Complete</span>
                    </div>
                  </div>
                  <div className="flex-grow text-left">
                    <h3 className="text-2xl font-bold text-[#261812] mb-2">Current Focus: High-Fidelity UI Prototyping</h3>
                    <p className="text-sm text-[#5a4136] mb-6">
                      You are designing interactive UI transitions. Complete the interaction lab to unlock Phase 4: "Usability Testing &amp; Design Handoff".
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-3">
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-vibrant-orange/10 flex items-center justify-center cursor-pointer" title="Wireframing Expert">
                          <Activity className="w-5 h-5 text-vibrant-orange" />
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-vibrant-orange/10 flex items-center justify-center cursor-pointer" title="UI Designer">
                          <Code className="w-5 h-5 text-vibrant-orange" />
                        </div>
                      </div>
                      <div className="h-8 w-px bg-surface-stroke"></div>
                      <div>
                        <span className="text-xs font-semibold text-[#5a4136] block">Skill Mastery</span>
                        <span className="text-base font-bold text-[#261812]">6 of 12 Badges Earned</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Roadmap Journey */}
                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-2xl font-bold text-[#261812]">Roadmap Journey</h3>
                      <p className="text-sm text-[#5c5f60]">Your path to Lead UX Designer</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-12 text-left">
                    <div className="absolute left-[15px] top-6 bottom-0 w-[3px] roadmap-line rounded-full"></div>
                    
                    {/* Phase 1 */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#00B894] border-[6px] border-[#fff8f6] flex items-center justify-center z-10 shadow-lg shadow-[#00B894]/20 transition-transform group-hover:scale-110">
                        <Check className="w-4 h-4 text-white font-bold" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl bg-white/40 border-[#00B894]/10 hover:bg-white/60 hover:translate-x-3 transition-all cursor-pointer">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-[#261812]">Phase 1: UX Research &amp; User Personas</h4>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B894] bg-[#00B894]/10 px-3 py-1 rounded-full border border-[#00B894]/20">
                            <span className="w-2 h-2 rounded-full bg-[#00B894]"></span>
                            Completed
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">User interviews, competitive analysis, journey mapping, and persona construction.</p>
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#00B894] border-[6px] border-[#fff8f6] flex items-center justify-center z-10 shadow-lg shadow-[#00B894]/20 transition-transform group-hover:scale-110">
                        <Check className="w-4 h-4 text-white font-bold" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl bg-white/40 border-[#00B894]/10 hover:bg-white/60 hover:translate-x-3 transition-all cursor-pointer">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-[#261812]">Phase 2: Wireframing &amp; Design Systems</h4>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B894] bg-[#00B894]/10 px-3 py-1 rounded-full border border-[#00B894]/20">
                            <span className="w-2 h-2 rounded-full bg-[#00B894]"></span>
                            Completed
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">Low-fidelity sketches, typography selection, layout grids setup, and atomic design system assets library.</p>
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-vibrant-orange border-[6px] border-[#fff8f6] z-10 vibrant-glow transition-transform group-hover:scale-110"></div>
                      <div className="glass-card p-6 rounded-2xl border border-vibrant-orange/30 bg-vibrant-orange/[0.03] hover:translate-x-3 transition-all cursor-pointer ring-4 ring-vibrant-orange/5">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-[#261812]">Phase 3: High-Fidelity UI Prototyping</h4>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-vibrant-orange bg-vibrant-orange/10 px-3 py-1 rounded-full border border-vibrant-orange/20">
                            <span className="w-2 h-2 rounded-full bg-vibrant-orange animate-pulse"></span>
                            In Progress
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed mb-4">Interactive variables, state transitions, micro-interactions, responsive sizing, and Figma animations.</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-vibrant-orange">Course Progress</span>
                            <span className="text-[#261812]">{progress}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-[#ffeae1] rounded-full overflow-hidden">
                            <div className="h-full bg-vibrant-orange rounded-full shadow-[0_0_8px_rgba(255,107,0,0.4)]" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phase 4 */}
                    <div className="relative group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#ffeae1] border-[6px] border-[#fff8f6] flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                        <Lock className="w-3.5 h-3.5 text-[#5a4136]/40" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl opacity-60 bg-[#fff1eb]/30 hover:translate-x-3 transition-all cursor-pointer grayscale-[0.5]">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-[#261812]">Phase 4: Usability Testing &amp; Design Handoff</h4>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5c5f60] bg-[#ffeae1] px-3 py-1 rounded-full">
                            Locked
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">A/B usability testing, click heatmaps analysis, designer-to-developer CSS specifications handoff.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-8 text-left">
                <div className="glass-card p-6 rounded-2xl bg-vibrant-orange/[0.04] border border-vibrant-orange/20 relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-vibrant-orange flex items-center justify-center text-white shadow-md shadow-vibrant-orange/20">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#261812]">AI Mentor Insight</h4>
                      <span className="text-[10px] font-bold text-vibrant-orange">Real-time Analysis</span>
                    </div>
                  </div>
                  <p className="text-sm italic text-[#261812] leading-relaxed mb-6 pl-4 border-l-2 border-vibrant-orange/30">
                    "Your visual style is highly consistent. I recommend evaluating <span className="font-bold text-vibrant-orange">WCAG contrast ratios</span> before committing user interface frames."
                  </p>
                  <button onClick={handleResumeClick} className="w-full py-3 border-2 border-vibrant-orange text-vibrant-orange rounded-xl font-bold hover:bg-vibrant-orange hover:text-white transition-all text-xs">
                    Test Accessibility
                  </button>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h4 className="text-base font-bold text-[#261812] mb-6">Learning Metrics</h4>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0984E3]/10 flex items-center justify-center text-[#0984E3]">
                          <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-[#5a4136]">Time Invested</span>
                      </div>
                      <span className="text-sm font-bold text-[#261812]">54 hrs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#00B894]/10 flex items-center justify-center text-[#00B894]">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-[#5a4136]">Avg. Quiz Score</span>
                      </div>
                      <span className="text-sm font-bold text-[#261812]">97%</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h4 className="text-base font-bold text-[#261812] mb-4">Next Milestone</h4>
                  <div className="relative overflow-hidden rounded-xl mb-5 group cursor-pointer">
                    <img 
                      alt="premium design canvas layout" 
                      className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-700" 
                      src="https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=400" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-5">
                      <div className="w-full text-left">
                        <span className="text-[10px] font-bold text-vibrant-orange uppercase tracking-widest mb-1 block">Active Lab</span>
                        <span className="text-white font-bold text-base">Lab: Prototyping Transitions</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleResumeClick} className="w-full py-3.5 bg-[#261812] text-white rounded-xl font-bold hover:bg-orange-600 transition-all text-xs">
                    Start Lab
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Mentors */}
          <section className="py-12 max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#261812] mb-8">Lead Architects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {mentors.map((mentor, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl flex gap-6">
                  <img alt={mentor.name} className="w-24 h-24 rounded-full object-cover bg-[#fff1eb]" src={mentor.image}/>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-[#261812]">{mentor.name}</h4>
                    <p className="text-vibrant-orange text-xs font-semibold mb-2">{mentor.role}</p>
                    <p className="text-xs text-[#5c5f60]">{mentor.credentials}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
}
