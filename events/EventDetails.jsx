import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Award, Shield, CheckCircle, Info, ChevronLeft, ChevronRight, Mail, Link as LinkIcon, Share2, Ticket, Sparkles, MapPin } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function EventDetails() {
  const { id } = useParams();
  const scrollContainerRef = useRef(null);
  const [registered, setRegistered] = useState(false);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const relatedEvents = [
    { id: 'pe-2.0', title: 'Prompt Engineering 2.0', cat: 'WORKSHOP', date: 'Nov 05', speaker: 'Marcus Aureli', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuGRZVPR6tLlXtslSV3YgoNIfP6j2c8AHeKoaXezA6Yzlgz0YaL1Cs3GmzIM8HXf2hGzk-c__AGP9HTCmKBGA0vIMBAc8PpEYRYOvoJHJ8xZ3Ob2HaJ9Jehig-D0Ivkl0gICtng8yx61TlEPAX_O62Jb-_XVpvxjUvlDkn3HCmBUwx0GrnFLka8Rft0XY6z-qDl8F03RGT8cyyT51NeQdQrhCJYOt7uJ02D02wu6Zco_4J3udzHNxgpfNe9KFkzux47OD3YC8VkI5q' },
    { id: 'dec-ai', title: 'Decentralized AI Networks', cat: 'SEMINAR', date: 'Nov 12', speaker: 'Dr. Kenji Wu', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyAoLV6sPvCqE5erthe8gkQeicXJD25p56mE8Ndh20JUNBRDYIwEflvtJunUvuxQWgryskAwQMB89lAWAtaSdBP_1mM4FX50Wuru1NiGLcUVdUTafn3Z-o-RRqDu5sNaDUJ6H63vCyR8y_ITamg9qgRo-UEJPFnNm13DS3ocv5izEObloEnj_CmMNMgxlEP2JV7TNRjIeSmkDSKOlIPuIn86xk4622lDVgzvUb7vH7vfSI0JyxIcG3WICWoLb4fEKoTLlWJNjRsrFG' },
    { id: 'ai-sec', title: 'AI & Cybersecurity', cat: 'CONFERENCE', date: 'Nov 18', speaker: 'Elena Volkov', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL2n1IFClLOtEeequUd2bza412rF22ofYUuq_4NWMGowPxK16jQPGhGtHOLceassZPtC7xZNgmx63QadnxhiGOHothoiE8Av_FfLbDXyP1fO2i6jJy9PV1nkD_WTb63d5IJQqNWofN3LF-C3Ax2m8bzNQvBb49KsUtStPey-qvHZ76ZiNMOxVsb176mscZhYNv69JG0oCKbq6oPXMy9gBrjFVR0PguA-wYkEnix3W39_oyit363JX7uuL7qBE69-ZbKvuGGorkl9HE' }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#fff8f6] text-on-background font-sans pb-16 selection:bg-vibrant-orange selection:text-white">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Event Background" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXhiEQWCklPBTT_oS4zACb6PSUQXA0WmRZf_wRv08iXhdbj3hkmp3WxxOUxL6xTXjGcjwHB9NzlCdVLTM0Ybgh8QFFcy3n0qIin7lvquxDSQvVGWesxB0OouC7pTxX7ArfR4tdc06WUlEiq18LG4jspmobLFm_OCOrSzlSrrNQVbGLq8w51RQVXnNAC2H18sUyo8W7NADbkkY05wdjGYTgiWWA48ZxOdVppUxoUd11lh9boe_rr28u33UTtBvGfq0QEd3vf5xfL7Pk"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
            
            {/* Title / Description (7 cols) */}
            <div className="lg:col-span-8 space-y-6 text-white text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vibrant-orange/20 border border-vibrant-orange/30 text-vibrant-orange text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-vibrant-orange animate-pulse"></span>
                Premium Session
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Gen-AI Mastery:<br />
                <span className="text-vibrant-orange">Engineering the Future</span>
              </h1>
              <p className="text-sm md:text-base text-white/80 max-w-lg leading-relaxed">
                A deep dive into the architecture of tomorrow's intelligence. Join industry pioneers in exploring the next frontier of generative technologies.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-left">
                  <Calendar className="w-5 h-5 text-vibrant-orange" />
                  <div>
                    <p className="text-[9px] text-white/60 font-bold uppercase tracking-wider">DATE</p>
                    <p className="text-xs font-bold">Oct 24, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-left">
                  <Clock className="w-5 h-5 text-vibrant-orange" />
                  <div>
                    <p className="text-[9px] text-white/60 font-bold uppercase tracking-wider">TIME</p>
                    <p className="text-xs font-bold">10:00 AM PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Card (4 cols) */}
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <div className="bg-white/95 backdrop-blur-md border border-surface-stroke p-8 rounded-[24px] w-full max-w-sm shadow-2xl space-y-6 text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-extrabold text-on-background">Registration Hub</h3>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">Limited spots remaining</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase">Live soon</span>
                </div>
                
                <div className="space-y-4 py-2">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-surface-stroke">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                      <Ticket className="w-4 h-4 text-vibrant-orange" />
                      <span>General Access</span>
                    </div>
                    <span className="text-vibrant-orange font-black text-sm">$149</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-surface-stroke opacity-60">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                      <Award className="w-4 h-4 text-slate-400" />
                      <span>VIP Pass</span>
                    </div>
                    <span className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded text-[9px] font-bold">Sold Out</span>
                  </div>
                </div>

                <button 
                  onClick={() => setRegistered(true)}
                  className={`w-full py-4 rounded-xl text-xs font-bold transition-all shadow-md ${
                    registered 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10'
                      : 'bg-vibrant-orange hover:bg-orange-600 text-white shadow-vibrant-orange/10'
                  }`}
                >
                  {registered ? 'Seat Secured ✓' : 'Secure Your Seat'}
                </button>
                <p className="text-center text-[10px] text-slate-400 font-semibold">Includes lifetime access to recordings & materials</p>
              </div>
            </div>

          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white border-y border-surface-stroke">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 text-left">
              <h2 className="text-2xl font-black text-on-background mb-2">Event Overview</h2>
              <p className="text-xs text-on-surface-variant max-w-2xl">Master the principles of Generative AI through our structured learning framework designed by industry leads.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-slate-50 p-8 rounded-[24px] border border-surface-stroke hover:shadow-md transition-shadow text-left space-y-4">
                <div className="w-10 h-10 bg-vibrant-orange/10 rounded-xl flex items-center justify-center text-vibrant-orange">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-on-background">What You'll Learn</h3>
                <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>LLM Architecture Basics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Advanced Prompt Engineering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Multi-modal Deployment</span>
                  </li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 p-8 rounded-[24px] border border-surface-stroke hover:shadow-md transition-shadow text-left space-y-4">
                <div className="w-10 h-10 bg-vibrant-orange/10 rounded-xl flex items-center justify-center text-vibrant-orange">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-on-background">Prerequisites</h3>
                <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-vibrant-orange shrink-0" />
                    <span>Basic Python Knowledge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-vibrant-orange shrink-0" />
                    <span>ML Fundamentals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-vibrant-orange shrink-0" />
                    <span>TechFlow Dev Account</span>
                  </li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 p-8 rounded-[24px] border border-surface-stroke hover:shadow-md transition-shadow text-left space-y-4">
                <div className="w-10 h-10 bg-vibrant-orange/10 rounded-xl flex items-center justify-center text-vibrant-orange">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-on-background">Certification</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Receive a verifiable NFT certificate of completion recognized by our 50+ industry partners.</p>
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-vibrant-orange w-3/4 rounded-full"></div>
                </div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Industry recognized</p>
              </div>
            </div>

          </div>
        </section>

        {/* Keynote Speaker */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white border border-surface-stroke rounded-[32px] overflow-hidden flex flex-col md:flex-row items-stretch shadow-sm">
              <div className="md:w-1/3 relative min-h-[300px]">
                <img 
                  className="absolute inset-0 w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA6TdmCXJo1rwRT4b1VAEqOjfznN5tV9AZ3FqYAooDay1l5adbRquNdcwD6k5B9xVuQSGBPYwX0RNBpvMUycFsI5UVoxLu0lCRYNkSGvPRybw8hiAm4gW52vap-u9cVY--3jPyATBhO4jlUhQZcV7srL0HSWVOCTNY4vwUSHR6boAMyi4g1UsO6NTr5eNUm1clzR9RT61jvHYsA0lRNZolLWzykBUiX2lae93y34G3B2ByJupqb4na0x9l51H9yCZop0LuPEE1-c9h" 
                  alt="Dr. Sarah Jenkins"
                />
              </div>
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center space-y-6 text-left">
                <div>
                  <span className="text-vibrant-orange text-[10px] font-bold uppercase tracking-widest block">Keynote Speaker</span>
                  <h2 className="text-2xl font-black text-on-background mt-1">Dr. Sarah Jenkins</h2>
                  <p className="text-vibrant-orange font-bold text-sm">AI Lead at TechFlow</p>
                </div>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  Sarah has spent the last decade pioneering neural network architectures that power modern generative platforms. With over 40 published papers and 12 patents in adaptive learning systems, she brings a unique blend of academic depth and commercial execution to the 'Gen-AI Mastery' session.
                </p>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Schedule */}
        <section className="py-16 bg-white border-y border-surface-stroke">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-black text-on-background">Event Schedule</h2>
              <p className="text-xs text-on-surface-variant mt-1">Four intensive modules designed for rapid mastery</p>
            </div>
            
            <div className="relative space-y-8 before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {[
                { title: "The AI Keynote", time: "10:00 - 10:45 AM", desc: "Setting the stage for the generative revolution. High-level vision and roadmap for the day.", active: true },
                { title: "Neural Architectures", time: "11:00 - 12:30 PM", desc: "Deep dive into transformer models, attention mechanisms, and fine-tuning strategies." },
                { title: "Ethics in AI", time: "01:30 - 02:30 PM", desc: "Navigating the complex landscape of bias, safety, and sustainable development." },
                { title: "Live Q&A Session", time: "02:45 - 04:00 PM", desc: "Unscripted answers to your toughest technical and strategic questions.", success: true }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-12 group text-left">
                  <div className={`absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-4 border-white shadow-md z-10 transition-transform group-hover:scale-125 ${
                    item.active 
                      ? 'bg-vibrant-orange' 
                      : item.success 
                      ? 'bg-emerald-500' 
                      : 'bg-slate-400'
                  }`}></div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-surface-stroke hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                      <h4 className="text-xs font-black text-on-background">{item.title}</h4>
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        item.active 
                          ? 'bg-orange-50 text-vibrant-orange' 
                          : item.success 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>{item.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Recommended Slider */}
        <section className="py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div className="text-left">
                <h2 className="text-2xl font-black text-on-background">Recommended for You</h2>
                <p className="text-xs text-on-surface-variant mt-1">Expand your knowledge with related upcoming sessions</p>
              </div>
              <div className="flex gap-2">
                <button onClick={scrollLeft} className="w-8 h-8 rounded-full border border-surface-stroke flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <button onClick={scrollRight} className="w-8 h-8 rounded-full border border-surface-stroke flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
              {relatedEvents.map((evt) => (
                <Link to={`/events/${evt.id}`} key={evt.id} className="min-w-[280px] md:min-w-[340px] group cursor-pointer text-left block">
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={evt.image} alt={evt.title} />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-0.5 rounded text-[9px] font-bold text-vibrant-orange uppercase">{evt.cat}</div>
                  </div>
                  <h4 className="text-xs font-black text-on-background mb-1 group-hover:text-vibrant-orange transition-colors">{evt.title}</h4>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                    <span>{evt.date}</span>
                    <span>{evt.speaker}</span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
}
