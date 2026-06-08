import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Award, CheckCircle, Shield, Clock, Users, BookOpen, ChevronRight, Sparkles 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

const PROGRAM_DETAILS = {
  'full-stack': {
    name: 'Full Stack Developer Program',
    duration: '12 Weeks',
    diff: 'Intermediate',
    students: '12k',
    desc: 'Master frontend and backend engineering. Build production-grade SaaS platforms, REST APIs, and database-backed applications.',
    curriculum: [
      { week: 'Week 1-3', title: 'Advanced React & Client State', desc: 'Deep dive into React 19, custom hooks, context API, and optimized state management patterns.' },
      { week: 'Week 4-6', title: 'Backend APIs with Node & Express', desc: 'Design scalable server architectures, routing, middleware patterns, and security best practices.' },
      { week: 'Week 7-9', title: 'Database Modeling & PostgreSQL', desc: 'Learn relational database schemas, query optimization, connection pooling, and complex SQL joins.' },
      { week: 'Week 10-12', title: 'System Architecture & Deployment', desc: 'Implement JWT auth, docker containers, CI/CD automated deployments, and AWS hosting.' }
    ]
  },
  'react-mastery': {
    name: 'React Mastery Program',
    duration: '6 Weeks',
    diff: 'Beginner',
    students: '8k',
    desc: 'Go from the fundamentals to writing state-of-the-art modern React web applications with smooth motion and global state.',
    curriculum: [
      { week: 'Week 1-2', title: 'React Core & Component Design', desc: 'Understand props, state, event listeners, hook rules, and semantic JSX components.' },
      { week: 'Week 3-4', title: 'Hooks & Complex State Mappings', desc: 'Master useEffect, useMemo, useCallback, useReducer, and custom hooks.' },
      { week: 'Week 5-6', title: 'Next.js & Server Side Rendering', desc: 'Build highly optimized, SEO-friendly React apps with server components, routing, and deployment.' }
    ]
  },
  'node.js-core': {
    name: 'Node.js Core Architectures',
    duration: '8 Weeks',
    diff: 'Advanced',
    desc: 'Build fast, asynchronous backends. Deep dive into the V8 engine, event loops, stream buffers, and high-performance server clusters.',
    students: '5k',
    curriculum: [
      { week: 'Week 1-2', title: 'V8 Engine & Event Loop', desc: 'Deep dive into non-blocking thread scheduling, macro/microtask queues, and process workers.' },
      { week: 'Week 3-5', title: 'Streams, Buffers & File Systems', desc: 'Work with file streams, low-level system calls, pipeline processing, and protocol sockets.' },
      { week: 'Week 6-8', title: 'Scalable Microservices & Clusters', desc: 'Build scalable clusters, load balancers, messaging queues, and distributed configurations.' }
    ]
  },
  'cloud-arch': {
    name: 'Cloud Architecture & Infrastructure',
    duration: '10 Weeks',
    diff: 'Advanced',
    students: '3k',
    desc: 'Architect highly available, secure, and auto-scaling multi-cloud deployments.',
    curriculum: [
      { week: 'Week 1-3', title: 'AWS Fundamental Systems', desc: 'Master virtual private clouds (VPCs), subnets, load balancing, and secure IAM policies.' },
      { week: 'Week 4-6', title: 'Infrastructure as Code (Terraform)', desc: 'Write declaratively structured infrastructure configurations and resource dependencies.' },
      { week: 'Week 7-10', title: 'Serverless & Autoscaling Systems', desc: 'Deploy cloud functions, global content deliveries, database sharding, and failovers.' }
    ]
  },
  'ai-engineering': {
    name: 'AI Engineering Program',
    duration: '16 Weeks',
    diff: 'Intermediate',
    students: '15k',
    desc: 'Harness the power of foundational LLMs, prompt engineering, vector databases, and multi-agent frameworks.',
    curriculum: [
      { week: 'Week 1-4', title: 'Transformers & Large Language Models', desc: 'Learn transformer architecture foundations, context windows, and foundational models.' },
      { week: 'Week 5-8', title: 'Advanced Prompting & RAG Pipelines', desc: 'Build retrieval-augmented generation pipelines, parsing systems, and document loaders.' },
      { week: 'Week 9-12', title: 'Vector Database Vectorization', desc: 'Index embeddings with pinecone, milvus, or chroma. Optimize vector search queries.' },
      { week: 'Week 13-16', title: 'Autonomous Multi-Agent Deployments', desc: 'Orchestrate agents utilizing advanced LangGraph, auto-routing tools, and loop safeguards.' }
    ]
  },
  'data-science': {
    name: 'Data Science Program',
    duration: '14 Weeks',
    diff: 'Intermediate',
    students: '9k',
    desc: 'Extract deep insights from complex data sets using advanced statistical models and predictive machine learning algorithms.',
    curriculum: [
      { week: 'Week 1-3', title: 'Scientific Computing with Python', desc: 'Master numerical computations and complex matrix structures using NumPy and Pandas.' },
      { week: 'Week 4-7', title: 'Exploratory Data Analysis & Statistics', desc: 'Discover patterns, outliers, anomalies, and test hypotheses using statistical tests.' },
      { week: 'Week 8-14', title: 'Machine Learning Classification Models', desc: 'Train regressors, decision forests, clusters, and validate datasets with pipelines.' }
    ]
  },
  'cyber-security': {
    name: 'Cyber Security & DevSecOps',
    duration: '12 Weeks',
    diff: 'Advanced',
    students: '4k',
    desc: 'Secure infrastructure environments, run penetration tests, and enforce secure deployment rules.',
    curriculum: [
      { week: 'Week 1-4', title: 'Network Security Protocols & Pentesting', desc: 'Analyze packet logs, run protocol checks, scan ports, and locate entry exploits.' },
      { week: 'Week 5-8', title: 'Web Application Exploits & Defenses', desc: 'Enforce defenses against injection, cross-site scripting, request forgery, and broken auth.' },
      { week: 'Week 9-12', title: 'Automated DevSecOps Security Audits', desc: 'Enforce secret-key scans, static analysis pipelines, container scans, and security policies.' }
    ]
  },
  'mobile-app': {
    name: 'Mobile App Development',
    duration: '8 Weeks',
    diff: 'Beginner',
    students: '7k',
    desc: 'Build cross-platform mobile apps for iOS and Android with single codebase setups.',
    curriculum: [
      { week: 'Week 1-3', title: 'React Native Layouts & Navigation', desc: 'Design mobile layouts, view grids, custom gestures, and tab navigation menus.' },
      { week: 'Week 4-5', title: 'Native APIs & Device Sensors', desc: 'Access camera utilities, geolocation sensors, biometrics, and filesystem operations.' },
      { week: 'Week 6-8', title: 'Global App Store Publishing Mappings', desc: 'Compile mobile bundles, generate keys, submit to stores, and setup push channels.' }
    ]
  },
  'game-dev': {
    name: 'Game Development with Unity',
    duration: '20 Weeks',
    diff: 'Intermediate',
    students: '6k',
    desc: 'Build immersive 2D and 3D games using the Unity engine and C# programming.',
    curriculum: [
      { week: 'Week 1-5', title: 'Unity Scripting & Physics Engine', desc: 'Write object controllers, implement collision grids, and manipulate rigids.' },
      { week: 'Week 6-12', title: 'Immersive 3D Environments & Shaders', desc: 'Design complex worlds, assign materials, customize lights, and render pipelines.' },
      { week: 'Week 13-20', title: 'AI Controllers, UI & Sound Deployment', desc: 'Enforce pathfinding, setup status bars, script audio tracks, and build execution bundles.' }
    ]
  },
  'devops-ops': {
    name: 'DevOps & Site Reliability',
    duration: '10 Weeks',
    diff: 'Advanced',
    students: '2k',
    desc: 'Design fault-tolerant deployments, configure cluster orchestrations, and automate deployments.',
    curriculum: [
      { week: 'Week 1-4', title: 'Containerization with Docker', desc: 'Write configurations, define layers, build image bundles, and launch containers.' },
      { week: 'Week 5-7', title: 'Kubernetes Cluster Orchestration', desc: 'Configure pods, services, ingress routing, state persistence, and auto-scalers.' },
      { week: 'Week 8-10', title: 'Automated Observabilities & Metrics', desc: 'Collect resource logs, setup metrics, chart alerts, and deploy tracing dashboards.' }
    ]
  }
};

export default function ProgramEnroll() {
  const { programId } = useParams();
  const navigate = useNavigate();
  
  const defaultProg = PROGRAM_DETAILS['full-stack'];
  const program = PROGRAM_DETAILS[programId?.toLowerCase()] || defaultProg;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cohort, setCohort] = useState('June 22, 2026');
  const [enrolling, setEnrolling] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in all enrollment details.');
      return;
    }
    setEnrolling(true);
    setTimeout(() => {
      setEnrolling(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8fafc] text-[#261812] font-sans pb-16">
        <Header />

        <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8 text-left">
          {/* Back button */}
          <Link 
            to="/developer-hub" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Hub
          </Link>

          {success ? (
            /* SUCCESS STATE SCREEN */
            <div className="max-w-xl mx-auto bg-white border border-slate-100 p-8 rounded-[32px] shadow-[0_20px_50px_rgba(37,99,235,0.08)] text-center space-y-6 mt-8 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900">Program Registration Confirmed!</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Welcome to the <span className="text-[#2563EB] font-bold">{program.name}</span>.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Enrolled User:</span>
                  <span className="font-bold text-slate-800">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Class Cohort:</span>
                  <span className="font-bold text-slate-800">{cohort}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Curriculum Access:</span>
                  <span className="font-bold text-emerald-600">Immediate</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button 
                  onClick={() => navigate('/developer-hub')}
                  className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 active:scale-95"
                >
                  Start Cohort Sandbox
                </button>
                <Link 
                  to="/developer-hub" 
                  className="block text-xs font-bold text-slate-500 hover:underline"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            /* DETAILS AND CHECKOUT LAYOUT */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Program Overview & Stepper Curriculum (8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Hero Header */}
                <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles className="w-32 h-32 text-white" />
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 text-[#2563EB] text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse"></span>
                      COHORT DIRECTORY
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{program.name}</h1>
                    <p className="text-sm text-slate-300 leading-relaxed max-w-xl">{program.desc}</p>
                    
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <Clock className="w-4 h-4 text-[#2563EB]" />
                        <span>{program.duration} Duration</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <Users className="w-4 h-4 text-[#2563EB]" />
                        <span>{program.students} Active</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <Award className="w-4 h-4 text-[#2563EB]" />
                        <span>{program.diff} Level</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Stepper Curriculum */}
                <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm space-y-8">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-bold text-slate-900">Program Curriculum</h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">Structured modules to master these core concepts</p>
                  </div>

                  <div className="relative space-y-8 before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                    {program.curriculum.map((module, idx) => (
                      <div key={idx} className="relative pl-12 text-left group">
                        <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-4 border-white shadow-md z-10 bg-[#2563EB] group-hover:scale-125 transition-transform"></div>
                        <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#2563EB]/10 text-[#2563EB] text-[9px] font-bold uppercase tracking-wider mb-2">
                            {module.week}
                          </span>
                          <h4 className="text-sm font-bold text-slate-800 mb-1">{module.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">{module.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Checkout Form Card (4 Cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-100 p-6 md:p-8 rounded-[32px] shadow-sm space-y-6 text-left">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-base font-bold text-slate-900">Enrollment Portal</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Reserve your cohort placement</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Cohort Launch Date</label>
                    <select 
                      value={cohort}
                      onChange={(e) => setCohort(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-700"
                    >
                      <option>June 22, 2026</option>
                      <option>July 15, 2026</option>
                      <option>August 10, 2026</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Full Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-700 placeholder:text-slate-400 font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-700 placeholder:text-slate-400 font-semibold"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={enrolling}
                      className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 active:scale-95 flex items-center justify-center gap-2"
                    >
                      {enrolling ? (
                        <>
                          <span className="w-4 h-4 rounded-full border border-t-transparent border-white animate-spin"></span>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Enrollment</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-center text-[9px] text-slate-400 font-semibold">
                  By enrolling, you gain access to the sandbox live environment and AI code copilot features.
                </p>
              </div>

            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
}
