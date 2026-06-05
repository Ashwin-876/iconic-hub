import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, Code, Database, Cpu, Lock, Check, Brain, 
  Clock, TrendingUp, Timer, Award, Globe, Users, Star, ArrowRight, BookOpen, 
  Search, Bell, Bookmark, ChevronLeft, ChevronRight, Activity, Calendar, HelpCircle
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function AIEngineerPath() {
  const [progress, setProgress] = useState(65);
  const [enrolled, setEnrolled] = useState(false);
  const [activeStage, setActiveStage] = useState(2);

  const mentors = [
    {
      name: "Dr. Elena Volkov",
      role: "Deep Learning Lead",
      credentials: "PhD Stanford, Ex-DeepMind",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv7wPgv5HRy1RMSpwLd7IlCtgMvlG4t9f6bgY4930WU45I3fs6-Fok_MDFsSsne2bvxE6hovkadAdQOYwMUE5RnK1QnOsyhyJyys0B8_MBaL__cMYwT-SToCJeIJIZqkptXWle_-T2T1ydteQ2TpJMSBWUdbmZlRHVkkDpLrzoRrdZyCdRMFv_4KV3GQ-b65urR9TDmQONWIO7D4rbpvdKpOzpY8xazKyFhGbkceoZNXTlfTOawXTh0rbmMQuanRBNoQBjHV_zTNjd"
    },
    {
      name: "Marcus Chen",
      role: "MLOps Architect",
      credentials: "Senior Engineer @ NVIDIA",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMEtwL2GgyhD8VAKyAJsYQ09tFlhfpSFKGm_qbrFDd-50HBc0A2VxMbOa7va96irCp-mMFaNHh9xggSx5MqVNCiDgn1UzIESBSPJw9nyqvDacbK2Vom7vlWi82pTQspPWtZ9uSQTfFGHUjaqI3cAyDulbqdwhznJWM1ANLLp3m52JUzNOFjXMX2ibGFlomKT3G55UG8tOx-8ZfnR9nJ8bkXuh4YO--Kz95HP92-G2X8vrYTCTD-zFIjcLjNsCH1_0snjIoFviGl562"
    },
    {
      name: "Sarah Jenkins",
      role: "NLP Specialist",
      credentials: "Head of GenAI @ Anthropic",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX_CipNLoNFDfQQhY8bZl5SD_brSFWuceMoOY2r9jy86Kxw6D7--AobEUnHPFKUicDAaVT2ek7dxDbJnQjbAXR8HTkafvAWTCjUKOrXIQ6q30GncF0joXzPsegiXngto90XJx-s62IMDl9SDguIzeLFRIpHCaHGca7WmpThAFnUcMNKPk2hN0MKdWYcyytBM20dyHjYBpfSE985Idcy1tALLUbDlmyfxb3XkE1gdNPgYdvmD7HLjxtEHnPS5RzIVL1anMrpveMB2qN"
    },
    {
      name: "David Okafor",
      role: "Vision Specialist",
      credentials: "Research Fellow @ MIT",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4H7_GVZSadc9CLSEXqaFNd6Xfj7BTavYgD2vOGQ3RNFoIjkeMfSZC0xNrTt5COnCIIZD_LSQfs1phSBePPuhRieXSfV5GavFQfZfioqJ9J7bFI1GRqXwBcJCYyNoijvjN-axcJRovl_rQAK-jtWtVokSlPjuloBL_Oqsozx_0h2gPNjNw8KdR87BJwyrYo8s-B_y_14ltOX6TvfZgha7pXIXetMtDMTmI6dV2Ilaj_xnyLY_D4S_cWn1tYbxfDsEH4ENWKain_joz"
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

        {/* Top Navigation Bar */}
        <Header />

        <main className="relative min-h-screen">
          
          {/* Immersive Hero Section */}
          <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                alt="Cinematic futuristic learning command center" 
                className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQBq2YZPTNexQ-KGRmcANTSzfI7UnMEVWWTSLuM_ofA1Cht9cFcH3TH2aeafRIvQpmmhcSQcCOfpql922wl0q9UaCqvE_Fi1vEXLTNOzRFpnU60G8F3FV7SBHgfvUy697m9aO-RslusCDyMeHk4lpkvv544rfIG6Q95PWK83fcoKsHCpv-4QEElQXWJoRdgYFVgUExsIocr-bFVGTU9VNN3exNc5MWxsfEFastJvJQvcfR_OmuNTrXCgr-QJEo10y3htZjReBcLJw7" 
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
                AI &amp; Machine Learning Specialist
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                Master the architecture of intelligence. From neural foundations to deploying large-scale generative models, embark on an industry-vetted journey.
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
                    <h3 className="text-2xl font-bold text-[#261812] mb-2">Current Focus: Transformer Architectures</h3>
                    <p className="text-sm text-[#5a4136] mb-6">
                      You're making excellent progress in the Intermediate phase. Complete the next lab to unlock "Advanced Generative AI".
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-3">
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-vibrant-orange/10 flex items-center justify-center cursor-pointer" title="Mathematics Mastery">
                          <Activity className="w-5 h-5 text-vibrant-orange" />
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-vibrant-orange/10 flex items-center justify-center cursor-pointer" title="Python Expert">
                          <Code className="w-5 h-5 text-vibrant-orange" />
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-vibrant-orange/10 flex items-center justify-center cursor-pointer" title="Neural Pioneer">
                          <Brain className="w-5 h-5 text-vibrant-orange" />
                        </div>
                      </div>
                      <div className="h-8 w-px bg-surface-stroke"></div>
                      <div>
                        <span className="text-xs font-semibold text-[#5a4136] block">Skill Mastery</span>
                        <span className="text-base font-bold text-[#261812]">3 of 12 Badges Earned</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Roadmap Journey */}
                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-2xl font-bold text-[#261812]">Roadmap Journey</h3>
                      <p className="text-sm text-[#5c5f60]">Your path to AI specialization</p>
                    </div>
                    <span className="text-xs font-semibold px-4 py-1.5 bg-[#fee3d8] rounded-full text-[#5a4136] border border-surface-stroke">
                      Last update: Oct 12
                    </span>
                  </div>
                  
                  <div className="relative pl-12 text-left">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[15px] top-6 bottom-0 w-[3px] roadmap-line rounded-full"></div>
                    
                    {/* Phase 1: Foundations (Completed) */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#00B894] border-[6px] border-[#fff8f6] flex items-center justify-center z-10 shadow-lg shadow-[#00B894]/20 transition-transform group-hover:scale-110">
                        <Check className="w-4 h-4 text-white font-bold" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl bg-white/40 border-[#00B894]/10 hover:bg-white/60 hover:translate-x-3 transition-all cursor-pointer">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-[#261812]">Phase 1: AI Foundations</h4>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B894] bg-[#00B894]/10 px-3 py-1 rounded-full border border-[#00B894]/20">
                            <span className="w-2 h-2 rounded-full bg-[#00B894]"></span>
                            Completed
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">Calculus, Linear Algebra, and Statistical Learning theory basics. Completed on Sept 15, 2024.</p>
                        <div className="mt-4 flex gap-2">
                          <span className="px-2.5 py-1 bg-[#ffeae1] rounded text-[10px] font-bold text-[#5a4136]">Mathematics</span>
                          <span className="px-2.5 py-1 bg-[#ffeae1] rounded text-[10px] font-bold text-[#5a4136]">Statistics</span>
                        </div>
                      </div>
                    </div>

                    {/* Phase 2: Deep Learning (In Progress) */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-vibrant-orange border-[6px] border-[#fff8f6] z-10 vibrant-glow transition-transform group-hover:scale-110"></div>
                      <div className="glass-card p-6 rounded-2xl border border-vibrant-orange/30 bg-vibrant-orange/[0.03] hover:translate-x-3 transition-all cursor-pointer ring-4 ring-vibrant-orange/5">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-[#261812]">Phase 2: Deep Learning Architectures</h4>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-vibrant-orange bg-vibrant-orange/10 px-3 py-1 rounded-full border border-vibrant-orange/20">
                            <span className="w-2 h-2 rounded-full bg-vibrant-orange animate-pulse"></span>
                            In Progress
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed mb-4">CNNs, RNNs, and the rise of Transformers in NLP and Vision. Current focus: Transformer Attention Mechanisms.</p>
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

                    {/* Phase 3: Production (Locked) */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#ffeae1] border-[6px] border-[#fff8f6] flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                        <Lock className="w-3.5 h-3.5 text-[#5a4136]/40" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl opacity-60 bg-[#fff1eb]/30 hover:translate-x-3 transition-all cursor-pointer grayscale-[0.5]">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-[#261812]">Phase 3: Production ML &amp; LLMs</h4>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5c5f60] bg-[#ffeae1] px-3 py-1 rounded-full">
                            Locked
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">Scaling models, RLHF, and deploying secure AI pipelines. Unlocks after Phase 2 completion.</p>
                      </div>
                    </div>

                    {/* Phase 4: Advanced GenAI (Locked) */}
                    <div className="relative mb-14 group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#ffeae1] border-[6px] border-[#fff8f6] flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                        <Lock className="w-3.5 h-3.5 text-[#5a4136]/40" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl opacity-60 bg-[#fff1eb]/30 hover:translate-x-3 transition-all cursor-pointer grayscale-[0.5]">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-[#261812]">Phase 4: Advanced Generative AI &amp; LLMs</h4>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5c5f60] bg-[#ffeae1] px-3 py-1 rounded-full">
                            Locked
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">Mastering GANs, Diffusion models, and fine-tuning Large Language Models for specialized domains.</p>
                      </div>
                    </div>

                    {/* Capstone (Locked) */}
                    <div className="relative group">
                      <div className="absolute -left-[45px] top-1.5 w-10 h-10 rounded-full bg-[#ffeae1] border-[6px] border-[#fff8f6] flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                        <Lock className="w-3.5 h-3.5 text-[#5a4136]/40" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl opacity-60 bg-[#fff1eb]/30 hover:translate-x-3 transition-all cursor-pointer grayscale-[0.5]">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="text-lg font-bold text-[#261812]">Capstone: Enterprise AI Deployment</h4>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5c5f60] bg-[#ffeae1] px-3 py-1 rounded-full">
                            Locked
                          </span>
                        </div>
                        <p className="text-sm text-[#5a4136] leading-relaxed">Designing scalable MLOps pipelines and deploying production-ready AI services to the cloud.</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Right Sidebar Analytics & Insight Panels */}
              <div className="lg:col-span-4 flex flex-col gap-8 text-left">
                
                {/* AI Mentor Insight */}
                <div className="glass-card p-6 rounded-2xl bg-vibrant-orange/[0.04] border border-vibrant-orange/20 relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-vibrant-orange/5 rounded-full blur-2xl transition-all group-hover:scale-150"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-vibrant-orange flex items-center justify-center text-white shadow-md shadow-vibrant-orange/20">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#261812]">AI Mentor Insight</h4>
                      <span className="text-[10px] font-bold text-vibrant-orange">Real-time Analysis</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm italic text-[#261812] leading-relaxed mb-6 pl-4 border-l-2 border-vibrant-orange/30">
                      "Based on your recent lab scores, you're strong in supervised learning but could brush up on <span class="font-bold text-vibrant-orange">Gradient Descent optimization</span> before the final module."
                    </p>
                  </div>
                  <button onClick={handleResumeClick} className="w-full py-3 border-2 border-vibrant-orange text-vibrant-orange rounded-xl font-bold hover:bg-vibrant-orange hover:text-white transition-all active:scale-95 text-xs">
                    Review Optimization
                  </button>
                </div>

                {/* Learning Metrics */}
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
                      <span className="text-sm font-bold text-[#261812]">42.5 hrs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#00B894]/10 flex items-center justify-center text-[#00B894]">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-[#5a4136]">Avg. Quiz Score</span>
                      </div>
                      <span className="text-sm font-bold text-[#261812]">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-vibrant-orange/10 flex items-center justify-center text-vibrant-orange">
                          <Zap className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-[#5a4136]">Daily Streak</span>
                      </div>
                      <span className="text-sm font-bold text-[#261812]">12 Days</span>
                    </div>
                  </div>
                </div>

                {/* Next Milestone Card */}
                <div className="glass-card p-6 rounded-2xl">
                  <h4 className="text-base font-bold text-[#261812] mb-4">Next Milestone</h4>
                  <div className="relative overflow-hidden rounded-xl mb-5 group cursor-pointer">
                    <img 
                      alt="Neural network visualization" 
                      className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-700" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRBx9c0tgIWDQYnDC0hjIZbkowW9oOIj5B9mJzRE5LvgqtGpMqujcu6CVQk60vrk00oTrijfsQ7cNGx-ygX_eLvpNxUDYTmN7Aq-XKAX5RZeHtDdzc41TWqCLq-BzKPn51k63ptbKtxob0DyvkaCj9QBmoA8gcK-NxCh09jGQrbbqAwFdSj0kM6s8kbCC_3igFWeYNHm-KMQvUJ3JvKSSvivdUOA1ujlLWUDX_v4htXrcFzrgelcHOlwSA9PLRbEDu1UM4t06_G30c" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-5">
                      <div className="w-full text-left">
                        <span className="text-[10px] font-bold text-vibrant-orange uppercase tracking-widest mb-1 block">Active Module</span>
                        <span className="text-white font-bold text-base">Lab: Fine-Tuning BERT</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-[#5a4136]">
                      <Timer className="w-4 h-4 text-vibrant-orange" />
                      <span className="text-xs font-semibold">45 mins</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5a4136]">
                      <Award className="w-4 h-4 text-vibrant-orange" />
                      <span className="text-xs font-semibold">250 Pts</span>
                    </div>
                  </div>
                  <button onClick={handleResumeClick} className="w-full py-3.5 bg-[#261812] text-white rounded-xl font-bold hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-on-surface/10 text-xs">
                    Start Lab
                  </button>
                </div>

                {/* Masterclass Highlight */}
                <div className="glass-card p-6 rounded-2xl border-l-4 border-vibrant-orange">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-[#261812]">Live Masterclass</h4>
                    <span className="animate-pulse flex h-2 w-2 rounded-full bg-vibrant-orange"></span>
                  </div>
                  <div className="flex gap-4 p-4 bg-[#fff1eb] rounded-xl border border-surface-stroke mb-4">
                    <div className="flex flex-col items-center justify-center bg-white px-3 py-1.5 rounded-lg border border-surface-stroke shadow-sm h-fit">
                      <span className="text-[10px] text-vibrant-orange font-bold uppercase">Oct</span>
                      <span className="text-xl font-bold leading-none">14</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#261812] mb-1">Generative Agents</h5>
                      <p className="text-xs text-[#5a4136]">with Dr. Sarah Chen</p>
                    </div>
                  </div>
                  <button className="group inline-flex items-center gap-2 text-xs text-vibrant-orange font-bold hover:gap-3 transition-all">
                    Join Waitlist 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

            </div>
          </section>

          {/* Expert Mentors */}
          <section className="py-12 max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-bold text-[#261812] mb-2">Lead Architects</h2>
                <p className="text-sm text-[#5c5f60]">Learn directly from world-class AI researchers and industry practitioners.</p>
              </div>
              <button className="hidden md:block text-vibrant-orange font-bold hover:underline text-sm">View all mentors</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mentors.map((mentor, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl">
                  <img alt={`${mentor.name} headshot`} className="w-full aspect-square rounded-xl object-cover mb-6 bg-[#fff1eb]" src={mentor.image}/>
                  <h4 className="text-lg font-bold text-[#261812] mb-1">{mentor.name}</h4>
                  <p className="text-vibrant-orange font-semibold text-xs mb-4">{mentor.role}</p>
                  <div className="flex items-center gap-2 text-[#5c5f60] text-xs">
                    <Award className="w-4 h-4 text-vibrant-orange" />
                    <span>{mentor.credentials}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 px-6">
            <div className="max-w-5xl mx-auto glass-card rounded-[40px] p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-vibrant-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 relative z-10">Ready to build the future?</h2>
              <p className="text-sm md:text-base text-[#5c5f60] mb-10 max-w-2xl mx-auto relative z-10">
                Join 1,200+ students already mastering AI &amp; Machine Learning on this track. Your career transformation starts with a single module.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button 
                  onClick={handleEnrollClick}
                  className={`px-10 py-5 rounded-2xl font-bold text-sm shadow-xl transition-all duration-300 ${enrolled ? 'bg-[#00B894] text-white shadow-[#00B894]/20' : 'bg-vibrant-orange text-white shadow-vibrant-orange/20'}`}
                >
                  {enrolled ? 'Enrolled in Path ✓' : 'Enroll in Path Now'}
                </button>
                <button className="px-10 py-5 bg-white border border-vibrant-orange text-vibrant-orange rounded-2xl font-bold text-sm hover:bg-orange-50 transition-all">
                  Schedule Career Advice
                </button>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="bg-[#1A1A1B] text-white w-full mt-12">
          <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-start gap-12 text-left">
            <div className="max-w-sm">
              <span className="text-lg font-bold text-vibrant-orange block mb-4">ICONIC HUB</span>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Empowering the next generation of digital leaders through rigorous, expert-led technical education and career transformation.
              </p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-vibrant-orange transition-all" href="#">
                  <Globe className="w-4 h-4" />
                </a>
                <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-vibrant-orange transition-all" href="#">
                  <Users className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h5 className="text-white font-bold mb-6 text-sm">Learning Hub</h5>
                <ul className="space-y-4 text-xs text-white/70">
                  <li><Link className="hover:text-vibrant-orange transition-colors" to="/courses">Explore Courses</Link></li>
                  <li><a className="hover:text-vibrant-orange transition-colors" href="#">Career Guide</a></li>
                  <li><a className="hover:text-vibrant-orange transition-colors" href="#">Skill Assessments</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-bold mb-6 text-sm">Support</h5>
                <ul className="space-y-4 text-xs text-white/70">
                  <li><a className="hover:text-vibrant-orange transition-colors" href="#">Help Center</a></li>
                  <li><a className="hover:text-vibrant-orange transition-colors" href="#">Terms of Service</a></li>
                  <li><a className="hover:text-vibrant-orange transition-colors" href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© 2026 Iconic Hub. Elevating the future of learning.</p>
            <p className="uppercase tracking-widest text-[10px]">Built for Excellence</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
