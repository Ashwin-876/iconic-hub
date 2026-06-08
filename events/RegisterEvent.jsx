import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, Briefcase, FileText, CheckCircle2, ArrowLeft, Shield } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';
import { realtimeDb } from '../utils/store';

export default function RegisterEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the event title
  const events = {
    'pe-2.0': { title: 'Prompt Engineering 2.0', cat: 'WORKSHOP', date: 'Nov 05', speaker: 'Marcus Aureli' },
    'dec-ai': { title: 'Decentralized AI Networks', cat: 'SEMINAR', date: 'Nov 12', speaker: 'Dr. Kenji Wu' },
    'ai-sec': { title: 'AI & Cybersecurity', cat: 'CONFERENCE', date: 'Nov 18', speaker: 'Elena Volkov' },
    'nextjs-15': { title: 'Next.js 15 Masterclass', cat: 'WORKSHOP', date: 'Nov 22', speaker: 'Josh W. Comeau' },
    'web3-contracts': { title: 'Web3 Smart Contracts', cat: 'SEMINAR', date: 'Nov 28', speaker: 'Elena Rossi' },
    'design-systems': { title: 'Design Systems at Scale', cat: 'CONFERENCE', date: 'Dec 03', speaker: 'Elena Rossi' },
    'llm-finetuning': { title: 'LLM Fine-tuning Masterclass', cat: 'WORKSHOP', date: 'Dec 10', speaker: 'Dr. Sarah Chen' },
    'vector-db': { title: 'Vector Databases 101', cat: 'SEMINAR', date: 'Dec 15', speaker: 'Liam Grant' },
    'pm-ai': { title: 'Product Management in AI', cat: 'CONFERENCE', date: 'Dec 20', speaker: 'Sofia Vergara' },
    'micro-frontends': { title: 'Micro-frontend Architecture', cat: 'WORKSHOP', date: 'Dec 27', speaker: 'Kelsey Hightower' }
  };

  const selectedEvent = events[id] || { title: 'Premium Tech Session', cat: 'EVENT', date: 'Upcoming', speaker: 'Guest Speaker' };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    reason: '',
    agree: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.agree) {
      alert('Please fill out the required fields.');
      return;
    }
    realtimeDb.registerEvent(id || 'pe-2.0', formData.fullName);
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-4">
        <Header />

        <div className="max-w-2xl mx-auto px-6 mt-4">
          <button 
            onClick={() => navigate('/events')}
            className="flex items-center gap-2 text-slate-500 hover:text-[#2563EB] text-xs font-semibold mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Events
          </button>

          {!submitted ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm text-left">
              <div className="mb-4 border-b border-slate-100 pb-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-wider mb-2">
                  {selectedEvent.cat} REGISTRATION
                </span>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  {selectedEvent.title}
                </h1>
                <p className="text-[10px] text-slate-500 mt-1 font-medium flex items-center gap-2">
                  <span>with {selectedEvent.speaker}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span>{selectedEvent.date}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-lg border border-slate-200 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-xs outline-none text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-lg border border-slate-200 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-xs outline-none text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-lg border border-slate-200 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-xs outline-none text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Job Title / Role (Optional)
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="e.g. Software Engineer"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-lg border border-slate-200 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-xs outline-none text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Why do you want to attend? (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3 w-3.5 h-3.5 text-slate-400" />
                    <textarea 
                      rows="2"
                      placeholder="Tell us what you hope to learn..."
                      value={formData.reason}
                      onChange={(e) => setFormData({...formData, reason: e.target.value})}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-lg border border-slate-200 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-xs outline-none text-slate-900 resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input 
                    type="checkbox"
                    id="agree"
                    required
                    checked={formData.agree}
                    onChange={(e) => setFormData({...formData, agree: e.target.checked})}
                    className="mt-0.5 w-3.5 h-3.5 text-[#2563EB] focus:ring-[#2563EB] border-slate-300 rounded cursor-pointer"
                  />
                  <label htmlFor="agree" className="text-[10px] text-slate-500 font-medium cursor-pointer leading-tight">
                    I agree to register for this event and receive relevant updates, materials, and certificates associated with the session.
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/10 active:scale-[0.99] transition-all text-xs mt-2"
                >
                  Complete Registration
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm text-center flex flex-col items-center max-w-md mx-auto">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <h1 className="text-xl font-black text-slate-900 leading-tight mb-2">
                Registration Successful!
              </h1>
              
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6">
                Thank you, <span className="font-bold text-slate-800">{formData.fullName}</span>! You are registered for <span className="font-bold text-slate-800">{selectedEvent.title}</span>. Confirmation email sent to <span className="font-semibold text-slate-700">{formData.email}</span>.
              </p>

              <div className="w-full space-y-2">
                <button 
                  onClick={() => navigate('/events')}
                  className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg font-bold shadow-md shadow-blue-500/15 transition-all text-xs"
                >
                  Return to Events Hub
                </button>
                <Link 
                  to="/dashboard"
                  className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-bold transition-all text-xs block"
                >
                  Go to Student Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
