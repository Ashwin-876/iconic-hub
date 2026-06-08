import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, 
  Brain, Clock, Star, Users, CreditCard, Award, Flame, Terminal, HelpCircle
} from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import Header from '../../components/Header';
import { realtimeDb } from '../../utils/store';

const SUGGESTED_COURSES = {
  'genai-llm-agents': {
    title: 'Generative AI & LLM Agent Architectures',
    duration: '14 Hours',
    level: 'Advanced',
    rating: 5.0,
    students: '9.4k',
    instructor: 'Dr. Sarah Chen',
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400',
    description: 'Master dynamic self-correcting agents, advanced prompt chains, memory constructs, and vector indexing.',
    features: ['Build 3 autonomous agents', 'Deploy agentic routing apps', 'Learn multi-agent collaboration frameworks']
  },
  'deep-learning-pytorch': {
    title: 'Advanced Deep Learning & PyTorch',
    duration: '18 Hours',
    level: 'Intermediate',
    rating: 4.9,
    students: '14.2k',
    instructor: 'Marcus Chen',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400',
    description: 'Write customized neural network layers, custom backpropagation hooks, and handle distributed multi-GPU training.',
    features: ['Write custom PyTorch autograd layers', 'Optimize distributed data parallels', 'Build advanced CNNs and RNNs']
  },
  'mlops-production-ml': {
    title: 'MLOps: Production Machine Learning Systems',
    duration: '10 Hours',
    level: 'Advanced',
    rating: 4.8,
    students: '6.2k',
    instructor: 'David Sterling',
    img: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=400',
    description: 'Setup automatic model retraining pipelines, monitor concept drift in production, and run containerized orchestration.',
    features: ['Build real-time pipeline monitoring', 'Setup Kubernetes model endpoints', 'Automate data drift analysis']
  },
  'data-pipeline-spark': {
    title: 'Data Pipeline Engineering with Apache Spark',
    duration: '12 Hours',
    level: 'Intermediate',
    rating: 4.7,
    students: '10.5k',
    instructor: 'Dr. Elena Volkov',
    img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400',
    description: 'Engineer massively scalable real-time streaming architectures using Spark structured streaming and delta lake.',
    features: ['Tune massive Spark jobs clusters', 'Configure structured real-time stream layers', 'Integrate Delta Lake transactions']
  }
};

export default function EnrollCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Select Plan, 2: Checkout/Confirm, 3: Success
  const [selectedPlan, setSelectedPlan] = useState('path'); // path, single
  const [loading, setLoading] = useState(false);

  const course = SUGGESTED_COURSES[courseId] || SUGGESTED_COURSES['genai-llm-agents'];

  // Simulate enrollment loading state
  const handleEnroll = () => {
    setLoading(true);
    const email = localStorage.getItem('userName') || 'ashwin@iconic-hub.io';
    realtimeDb.enrollCourse(courseId || 'genai-llm-agents', email);
    
    if (selectedPlan === 'single') {
      realtimeDb.makePayment(79.00, email);
    }

    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1800);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#fff8f6] text-[#261812] font-sans pb-20 text-left selection:bg-[#ff6b00]/30 selection:text-white">
        <Header />

        <main className="max-w-6xl mx-auto px-6 mt-10">
          {/* Top navigation path */}
          {step < 3 && (
            <button 
              onClick={() => step === 2 ? setStep(1) : navigate(-1)} 
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#ff6b00] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{step === 2 ? 'Back to plan selection' : 'Back to learning path'}</span>
            </button>
          )}

          {/* Steps Timeline Header */}
          {step < 3 && (
            <div className="flex items-center gap-4 mb-10 max-w-md">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#ff6b00] text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
                <span className="text-xs font-bold">Select Plan</span>
              </div>
              <div className="h-[2px] w-12 bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-[#ff6b00] text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
                <span className="text-xs font-bold">Verification</span>
              </div>
              <div className="h-[2px] w-12 bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-[#ff6b00] text-white' : 'bg-slate-200 text-slate-500'}`}>3</span>
                <span className="text-xs font-bold">Access</span>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Course Preview Card */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl p-6 md:p-8 space-y-6">
                  <div className="h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img 
                      src={course.img} 
                      alt={course.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-[#ff6b00] rounded text-[10px] font-extrabold uppercase border border-blue-100">
                        {course.level}
                      </span>
                      <span className="text-xs text-slate-500">• Recommended for your path</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#261812]">{course.title}</h1>
                    <p className="text-sm text-slate-600 leading-relaxed">{course.description}</p>
                  </div>

                  <div className="border-t border-slate-100 pt-6 grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
                      <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                        <Clock className="w-4 h-4 text-sky-500" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rating</span>
                      <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                        <Star className="w-4 h-4 text-blue-500 fill-current" />
                        <span>{course.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Enrolled</span>
                      <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-3">Key Syllabus Focus</h4>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      {course.features.map((feat, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Enrollment Options Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#261812]">Choose Enrollment Option</h3>
                    <p className="text-xs text-slate-500 mt-1">Unlock course content in one tap</p>
                  </div>

                  <div className="space-y-4">
                    {/* Option 1: Path Inclusion */}
                    <div 
                      onClick={() => setSelectedPlan('path')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        selectedPlan === 'path' 
                          ? 'border-[#ff6b00] bg-blue-500/[0.02] ring-4 ring-[#ff6b00]/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="plan"
                        checked={selectedPlan === 'path'}
                        onChange={() => setSelectedPlan('path')}
                        className="mt-1 accent-[#ff6b00]" 
                      />
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-[#261812]">Learning Path Access</span>
                          <span className="px-2 py-0.5 bg-[#ff6b00]/10 text-[#ff6b00] rounded text-[8px] font-black uppercase">Included</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Included free under your active AI &amp; Machine Learning Specialist path membership.
                        </p>
                        <span className="text-lg font-black text-[#ff6b00] block pt-1">$0.00</span>
                      </div>
                    </div>

                    {/* Option 2: Single Course Purchase */}
                    <div 
                      onClick={() => setSelectedPlan('single')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        selectedPlan === 'single' 
                          ? 'border-[#ff6b00] bg-blue-500/[0.02] ring-4 ring-[#ff6b00]/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="plan"
                        checked={selectedPlan === 'single'}
                        onChange={() => setSelectedPlan('single')}
                        className="mt-1 accent-[#ff6b00]" 
                      />
                      <div className="space-y-1 text-left">
                        <span className="font-extrabold text-sm text-[#261812]">Individual Course Pass</span>
                        <p className="text-xs text-slate-500">
                          Lifetime enrollment, certifications, grading, and developer playground compute.
                        </p>
                        <span className="text-lg font-black text-slate-700 block pt-1">$79.00</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 bg-gradient-to-r from-[#ff6b00] to-indigo-500 text-white rounded-2xl font-extrabold text-sm hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff6b00]/15"
                  >
                    <span>Proceed to Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-semibold border-t border-slate-100 pt-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Secure LMS verified integration</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <Sparkles className="w-10 h-10 text-[#ff6b00] mx-auto animate-bounce" />
                <h2 className="text-2xl font-extrabold text-[#261812]">Enrollment Verification</h2>
                <p className="text-xs text-slate-500">Confirming credentials for {course.title}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-3">
                  <span className="text-slate-500 font-semibold">User Account</span>
                  <span className="text-[#261812] font-bold">ashwin@iconic-hub.io</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-3">
                  <span className="text-slate-500 font-semibold">Active Curriculum</span>
                  <span className="text-[#ff6b00] font-extrabold">AI &amp; ML Specialist</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-3">
                  <span className="text-slate-500 font-semibold">Target Module</span>
                  <span className="text-slate-700 font-semibold">Stage 5-8 Core Module</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Price</span>
                  <span className="text-emerald-600 font-extrabold text-sm">
                    {selectedPlan === 'path' ? 'FREE (Path Included)' : '$79.00'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleEnroll}
                  disabled={loading}
                  className="w-full py-4 bg-[#261812] hover:bg-[#ff6b00] disabled:bg-slate-300 text-white rounded-2xl font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Confirm Access &amp; Enroll</span>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  By clicking Confirm, you will be instantly registered in the system course registry database.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 to-[#ff6b00]"></div>
              
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#261812]">You're Enrolled!</h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Awesome news! <strong>{course.title}</strong> has been successfully added to your course workspace dashboard.
                </p>
              </div>

              <div className="bg-[#fff8f6] border border-[#ff6b00]/10 rounded-2xl p-5 text-xs text-left space-y-3">
                <h4 className="font-extrabold text-[#261812] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#ff6b00]" />
                  <span>Curriculum Benefits Activated:</span>
                </h4>
                <ul className="space-y-1.5 text-slate-600 pl-5 list-disc">
                  <li>Compute credits allocated for the developer playground labs.</li>
                  <li>Interactive code-along notebooks verified in workspace.</li>
                  <li>Professional PDF certification download on 100% curriculum completion.</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={() => navigate('/dashboard')} 
                  className="flex-1 py-3 bg-[#261812] hover:bg-black text-white font-bold rounded-xl text-xs transition-all"
                >
                  Go to Dashboard
                </button>
                <button 
                  onClick={() => navigate('/courses/react-arch')} 
                  className="flex-1 py-3 bg-gradient-to-r from-[#ff6b00] to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-[#ff6b00]/10"
                >
                  Start Course Material
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
}
