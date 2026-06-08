import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Code, User, Mail, Github, Briefcase, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function JoinProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const PROJECTS = [
    { title: "Next-Gen E-Commerce", tech: ["React", "Stripe", "PostgreSQL"], img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop" },
    { title: "Real-time Chat App", tech: ["Socket.io", "Node.js", "Redis"], img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
    { title: "Fintech Dashboard", tech: ["D3.js", "Next.js", "AWS"], img: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop" },
    { title: "Spatial Music Player", tech: ["Web Audio", "Three.js", "Vue"], img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop" },
    { title: "AI Content Generator", tech: ["OpenAI", "Python", "React"], img: "https://images.unsplash.com/photo-1677442136019-21780efad995?q=80&w=800&auto=format&fit=crop" },
    { title: "Decentralized LMS", tech: ["Solidity", "Web3.js", "IPFS"], img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" }
  ];

  const projectIndex = parseInt(id, 10);
  const selectedProject = PROJECTS[projectIndex] || { title: 'Premium Project', tech: ['React', 'Node.js'] };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    github: '',
    role: 'Frontend',
    experience: '',
    agree: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.agree) {
      alert('Please fill out the required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-4">
        <Header />

        <div className="max-w-2xl mx-auto px-6 mt-4">
          <button 
            onClick={() => navigate('/developer-hub')}
            className="flex items-center gap-2 text-slate-500 hover:text-[#2563EB] text-xs font-semibold mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Developer Hub
          </button>

          {!submitted ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm text-left">
              <div className="mb-4 border-b border-slate-100 pb-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-wider mb-2">
                  PROJECT APPLICATION
                </span>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  Join Team: {selectedProject.title}
                </h1>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase">
                      {t}
                    </span>
                  ))}
                </div>
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
                      GitHub Username
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="e.g. githubdev"
                        value={formData.github}
                        onChange={(e) => setFormData({...formData, github: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-lg border border-slate-200 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-xs outline-none text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Target Role
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <select 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-lg border border-slate-200 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-xs outline-none text-slate-900 appearance-none cursor-pointer"
                      >
                        <option value="Frontend">Frontend Developer</option>
                        <option value="Backend">Backend Developer</option>
                        <option value="Full Stack">Full Stack Developer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="DevOps">DevOps Engineer</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Relevant Skills & Experience (Optional)
                  </label>
                  <div className="relative">
                    <Code className="absolute left-3.5 top-3 w-3.5 h-3.5 text-slate-400" />
                    <textarea 
                      rows="2"
                      placeholder="Briefly describe your skill level or paste links to your previous projects..."
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
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
                    I agree to contribute actively, respect the coding guidelines, and coordinate with the program leads.
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/10 active:scale-[0.99] transition-all text-xs mt-2"
                >
                  Submit Project Application
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm text-center flex flex-col items-center max-w-md mx-auto">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <h1 className="text-xl font-black text-slate-900 leading-tight mb-2">
                Application Received!
              </h1>
              
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6">
                Excellent, <span className="font-bold text-slate-800">{formData.fullName}</span>! Your request to join the <span className="font-bold text-slate-800">{selectedProject.title}</span> team has been received. We have sent an email notification to <span className="font-semibold text-slate-700">{formData.email}</span>.
              </p>

              <div className="w-full space-y-2">
                <button 
                  onClick={() => navigate('/developer-hub')}
                  className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg font-bold shadow-md shadow-blue-500/15 transition-all text-xs"
                >
                  Return to Developer Hub
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
