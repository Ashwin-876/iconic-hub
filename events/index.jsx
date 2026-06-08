import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Award, Shield, CheckCircle, Info, ChevronLeft, ChevronRight, Mail, Link as LinkIcon, Share2, Ticket, Sparkles, MapPin } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function EventsHub() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [registered, setRegistered] = useState(false);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const [registeredEvents, setRegisteredEvents] = useState({});

  const toggleRegister = (eventId) => {
    setRegisteredEvents(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const relatedEvents = [
    { id: 'pe-2.0', title: 'Prompt Engineering 2.0', cat: 'WORKSHOP', date: 'Nov 05', speaker: 'Marcus Aureli', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400' },
    { id: 'dec-ai', title: 'Decentralized AI Networks', cat: 'SEMINAR', date: 'Nov 12', speaker: 'Dr. Kenji Wu', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400' },
    { id: 'ai-sec', title: 'AI & Cybersecurity', cat: 'CONFERENCE', date: 'Nov 18', speaker: 'Elena Volkov', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400' },
    { id: 'nextjs-15', title: 'Next.js 15 Masterclass', cat: 'WORKSHOP', date: 'Nov 22', speaker: 'Josh W. Comeau', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400' },
    { id: 'web3-contracts', title: 'Web3 Smart Contracts', cat: 'SEMINAR', date: 'Nov 28', speaker: 'Elena Rossi', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=400' },
    { id: 'design-systems', title: 'Design Systems at Scale', cat: 'CONFERENCE', date: 'Dec 03', speaker: 'Elena Rossi', image: 'https://images.unsplash.com/photo-1581291518655-9523c932dedf?auto=format&fit=crop&q=80&w=400' },
    { id: 'llm-finetuning', title: 'LLM Fine-tuning Masterclass', cat: 'WORKSHOP', date: 'Dec 10', speaker: 'Dr. Sarah Chen', image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=400' },
    { id: 'vector-db', title: 'Vector Databases 101', cat: 'SEMINAR', date: 'Dec 15', speaker: 'Liam Grant', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400' },
    { id: 'pm-ai', title: 'Product Management in AI', cat: 'CONFERENCE', date: 'Dec 20', speaker: 'Sofia Vergara', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400' },
    { id: 'micro-frontends', title: 'Micro-frontend Architecture', cat: 'WORKSHOP', date: 'Dec 27', speaker: 'Kelsey Hightower', image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 text-on-background font-sans pb-16 selection:bg-blue-600 selection:text-white">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[75vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Event Background" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXhiEQWCklPBTT_oS4zACb6PSUQXA0WmRZf_wRv08iXhdbj3hkmp3WxxOUxL6xTXjGcjwHB9NzlCdVLTM0Ybgh8QFFcy3n0qIin7lvquxDSQvVGWesxB0OouC7pTxX7ArfR4tdc06WUlEiq18LG4jspmobLFm_OCOrSzlSrrNQVbGLq8w51RQVXnNAC2H18sUyo8W7NADbkkY05wdjGYTgiWWA48ZxOdVppUxoUd11lh9boe_rr28u33UTtBvGfq0QEd3vf5xfL7Pk"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
            
            {/* Title / Description (12 cols) */}
            <div className="lg:col-span-12 space-y-6 text-white text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Premium Session
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Gen-AI Mastery:<br />
                <span className="text-blue-600">Engineering the Future</span>
              </h1>
              <p className="text-sm md:text-base text-white/80 max-w-lg leading-relaxed">
                A deep dive into the architecture of tomorrow's intelligence. Join industry pioneers in exploring the next frontier of generative technologies.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-left">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-[9px] text-white/60 font-bold uppercase tracking-wider">DATE</p>
                    <p className="text-xs font-bold">Oct 24, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-left">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-[9px] text-white/60 font-bold uppercase tracking-wider">TIME</p>
                    <p className="text-xs font-bold">10:00 AM PST</p>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-slate-50/50 border-y border-surface-stroke">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-14 text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2 block">STRUCTURED CURRICULUM</span>
              <h2 className="text-3xl font-black text-on-background mb-3">Event Overview</h2>
              <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">Master the principles of Generative AI through our structured learning framework designed by industry leads.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-[24px] border border-slate-100 hover:border-[#2563EB]/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] hover:-translate-y-1 transition-all duration-300 text-left space-y-5">
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center text-[#2563EB] shadow-inner">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-on-background tracking-tight">What You'll Learn</h3>
                <ul className="space-y-3.5 text-xs text-slate-500 font-medium">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>LLM Architecture Basics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Advanced Prompt Engineering</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Multi-modal Deployment</span>
                  </li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-[24px] border border-slate-100 hover:border-[#2563EB]/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] hover:-translate-y-1 transition-all duration-300 text-left space-y-5">
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center text-[#2563EB] shadow-inner">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-on-background tracking-tight">Prerequisites</h3>
                <ul className="space-y-3.5 text-xs text-slate-500 font-medium">
                  <li className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>Basic Python Knowledge</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>ML Fundamentals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>TechFlow Dev Account</span>
                  </li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-[24px] border border-slate-100 hover:border-[#2563EB]/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] hover:-translate-y-1 transition-all duration-300 text-left space-y-5">
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center text-[#2563EB] shadow-inner">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-on-background tracking-tight">Certification</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Receive a verifiable NFT certificate of completion recognized by our 50+ industry partners.</p>
                <div className="space-y-2 pt-2">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] w-3/4 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Industry Recognized</span>
                    <span className="text-[#2563EB]">75% complete</span>
                  </div>
                </div>
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
                  <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest block">Keynote Speaker</span>
                  <h2 className="text-2xl font-black text-on-background mt-1">Dr. Sarah Jenkins</h2>
                  <p className="text-blue-600 font-bold text-sm">AI Lead at TechFlow</p>
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
        <section className="py-20 bg-white border-y border-surface-stroke">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2 block">AGENDA AND TIMELINE</span>
              <h2 className="text-3xl font-black text-on-background">Event Schedule</h2>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">Four intensive modules designed for rapid mastery</p>
            </div>
            
            <div className="relative space-y-8 before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {[
                { title: "The AI Keynote", time: "10:00 - 10:45 AM", desc: "Setting the stage for the generative revolution. High-level vision and roadmap for the day.", active: true },
                { title: "Neural Architectures", time: "11:00 - 12:30 PM", desc: "Deep dive into transformer models, attention mechanisms, and fine-tuning strategies." },
                { title: "Ethics in AI", time: "01:30 - 02:30 PM", desc: "Navigating the complex landscape of bias, safety, and sustainable development." },
                { title: "Live Q&A Session", time: "02:45 - 04:00 PM", desc: "Unscripted answers to your toughest technical and strategic questions.", success: true }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-12 group text-left">
                  <div className={`absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-4 border-white shadow-md z-10 transition-all duration-300 group-hover:scale-125 ${
                    item.active 
                      ? 'bg-[#2563EB] ring-4 ring-[#2563EB]/20' 
                      : item.success 
                      ? 'bg-emerald-500' 
                      : 'bg-slate-300'
                  }`}></div>
                  <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                    item.active 
                      ? 'bg-white border-[#2563EB]/30 shadow-[0_10px_30px_rgba(37,99,235,0.05)] -translate-y-0.5' 
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2.5 mb-2.5">
                      <h4 className="text-sm font-bold text-on-background tracking-tight">{item.title}</h4>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        item.active 
                          ? 'bg-[#2563EB]/10 text-[#2563EB]' 
                          : item.success 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-slate-50 text-slate-500'
                      }`}>{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Recommended Slider */}
        <section className="py-20 overflow-hidden bg-slate-50/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div className="text-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2 block">MORE FOR YOU</span>
                <h2 className="text-3xl font-black text-on-background">Recommended for You</h2>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">Expand your knowledge with related upcoming sessions</p>
              </div>
              <div className="flex gap-3">
                <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-[#2563EB] hover:text-white transition-all shadow-sm">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-[#2563EB] hover:text-white transition-all shadow-sm">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div ref={scrollContainerRef} className="flex gap-8 overflow-x-auto hide-scrollbar pb-6">
              {relatedEvents.map((evt) => (
                <div key={evt.id} className="min-w-[290px] md:min-w-[350px] bg-white border border-slate-100 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all group text-left flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-sm">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={evt.image} alt={evt.title} />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-lg text-[9px] font-bold text-[#2563EB] uppercase tracking-wider shadow-sm">{evt.cat}</div>
                    </div>
                    <Link to={`/events/${evt.id}`}>
                      <h4 className="text-sm font-bold text-on-background mb-3 group-hover:text-[#2563EB] transition-colors tracking-tight line-clamp-1">{evt.title}</h4>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold">
                      <span>{evt.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>{evt.speaker}</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/events/register/${evt.id}`)}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-bold shadow-sm transition-all border ${
                        registeredEvents[evt.id]
                          ? 'bg-slate-100 border-slate-200 text-slate-600'
                          : 'bg-[#2563EB] border-[#2563EB] text-white hover:bg-blue-700 shadow-blue-500/10'
                      }`}
                    >
                      {registeredEvents[evt.id] ? 'Registered' : 'Register'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
}
