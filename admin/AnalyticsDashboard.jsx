import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, BookOpen, GitBranch, Award, Calendar, MessageSquare, Terminal, Cpu, 
  CheckSquare, Briefcase, DollarSign, BarChart2, Bell, Shield, Settings, 
  ChevronLeft, ChevronRight, Search, Plus, Trash2, Eye, Play, Sparkles, 
  Filter, MoreVertical, RefreshCw, TrendingUp, AlertTriangle, ChevronDown, 
  CheckCircle, XCircle, ShieldCheck, Mail, ArrowUpRight, PlusCircle
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

const PATH_DATA = {
  'ai-engineer': {
    title: 'AI & Machine Learning Specialist',
    students: '1,824',
    progress: '62.8%',
    health: '98.5%',
    score: '87.2%',
    stages: [
      { title: 'Stage 1: Core Mathematical Foundations', duration: '4 Weeks', status: 'Optimal', completion: 92, count: '4 Chapters' },
      { title: 'Stage 2: Advanced Deep Learning & NLP', duration: '6 Weeks', status: 'Optimal', completion: 74, count: '5 Chapters' },
      { title: 'Stage 3: MLOps Infrastructure & Scale', duration: '5 Weeks', status: 'Review Needed', completion: 41, count: '3 Chapters' },
      { title: 'Stage 4: Enterprise Capstone Project', duration: '3 Weeks', status: 'Optimal', completion: 15, count: '2 Chapters' }
    ]
  },
  'frontend': {
    title: 'Frontend Developer Path',
    students: '3,412',
    progress: '74.2%',
    health: '100%',
    score: '89.1%',
    stages: [
      { title: 'Stage 1: HTML5, CSS3, & Modern UI Layouts', duration: '3 Weeks', status: 'Optimal', completion: 98, count: '6 Chapters' },
      { title: 'Stage 2: Advanced React, Vue, or Angular', duration: '5 Weeks', status: 'Optimal', completion: 82, count: '8 Chapters' },
      { title: 'Stage 3: Performance, SSR, & Next.js', duration: '4 Weeks', status: 'Optimal', completion: 59, count: '4 Chapters' },
      { title: 'Stage 4: Dynamic Animations & Testing', duration: '3 Weeks', status: 'Optimal', completion: 28, count: '3 Chapters' }
    ]
  },
  'backend': {
    title: 'Backend Developer Path',
    students: '2,904',
    progress: '58.4%',
    health: '95.8%',
    score: '84.6%',
    stages: [
      { title: 'Stage 1: Node.js, Go, or Python Foundations', duration: '4 Weeks', status: 'Optimal', completion: 90, count: '5 Chapters' },
      { title: 'Stage 2: Databases, SQL, & ORMs at Scale', duration: '5 Weeks', status: 'Optimal', completion: 68, count: '6 Chapters' },
      { title: 'Stage 3: Microservices & Event-Driven Architecture', duration: '5 Weeks', status: 'Review Needed', completion: 35, count: '4 Chapters' },
      { title: 'Stage 4: Distributed Systems & Caching', duration: '4 Weeks', status: 'Optimal', completion: 12, count: '3 Chapters' }
    ]
  },
  'fullstack': {
    title: 'Full Stack Developer Path',
    students: '4,152',
    progress: '68.1%',
    health: '99.1%',
    score: '88.3%',
    stages: [
      { title: 'Stage 1: Client-Side Foundations & Frameworks', duration: '4 Weeks', status: 'Optimal', completion: 94, count: '7 Chapters' },
      { title: 'Stage 2: Server-Side REST & GraphQL APIs', duration: '4 Weeks', status: 'Optimal', completion: 77, count: '5 Chapters' },
      { title: 'Stage 3: Cloud Deployments & Security', duration: '4 Weeks', status: 'Optimal', completion: 49, count: '4 Chapters' },
      { title: 'Stage 4: End-to-End Enterprise Capstones', duration: '4 Weeks', status: 'Optimal', completion: 22, count: '3 Chapters' }
    ]
  },
  'data-scientist': {
    title: 'Data Scientist Path',
    students: '1,520',
    progress: '55.2%',
    health: '97.2%',
    score: '85.9%',
    stages: [
      { title: 'Stage 1: Advanced Statistical Inference & R/Python', duration: '4 Weeks', status: 'Optimal', completion: 88, count: '5 Chapters' },
      { title: 'Stage 2: Data Wrangling, Pandas & SQL', duration: '4 Weeks', status: 'Optimal', completion: 70, count: '4 Chapters' },
      { title: 'Stage 3: Predictive Modeling & Scikit-Learn', duration: '5 Weeks', status: 'Optimal', completion: 44, count: '5 Chapters' },
      { title: 'Stage 4: Big Data Frameworks & Spark', duration: '5 Weeks', status: 'Review Needed', completion: 18, count: '3 Chapters' }
    ]
  },
  'devops': {
    title: 'DevOps & Cloud Engineer Path',
    students: '1,280',
    progress: '50.6%',
    health: '96.5%',
    score: '83.2%',
    stages: [
      { title: 'Stage 1: Linux Administration & Shell Scripting', duration: '3 Weeks', status: 'Optimal', completion: 85, count: '4 Chapters' },
      { title: 'Stage 2: Docker, Containers & Git CI/CD', duration: '5 Weeks', status: 'Optimal', completion: 60, count: '6 Chapters' },
      { title: 'Stage 3: Kubernetes & Infrastructure as Code (IaC)', duration: '6 Weeks', status: 'Review Needed', completion: 32, count: '5 Chapters' },
      { title: 'Stage 4: Observability, Logging & SRE Practices', duration: '4 Weeks', status: 'Optimal', completion: 9, count: '3 Chapters' }
    ]
  },
  'product-designer': {
    title: 'Product Designer (UI/UX) Path',
    students: '2,130',
    progress: '71.5%',
    health: '100%',
    score: '91.4%',
    stages: [
      { title: 'Stage 1: Design Thinking, User Research, & Wireframing', duration: '4 Weeks', status: 'Optimal', completion: 96, count: '5 Chapters' },
      { title: 'Stage 2: Figma Mastery & High-Fidelity Mockups', duration: '4 Weeks', status: 'Optimal', completion: 80, count: '6 Chapters' },
      { title: 'Stage 3: Design Systems & Component Design', duration: '4 Weeks', status: 'Optimal', completion: 52, count: '4 Chapters' },
      { title: 'Stage 4: Interactive Prototyping & Usability Testing', duration: '4 Weeks', status: 'Optimal', completion: 30, count: '4 Chapters' }
    ]
  },
  'analysis': {
    title: 'Learning Path Health Analysis',
    students: '18,216',
    progress: '64.9%',
    health: '98.2%',
    score: '86.9%',
    stages: [
      { title: 'Core Metric: Student Retention Assessment', duration: 'Continuous', status: 'Optimal', completion: 95, count: 'All Paths' },
      { title: 'Core Metric: Content Freshness Validation', duration: 'Weekly', status: 'Optimal', completion: 99, count: 'Weekly Scans' },
      { title: 'Core Metric: Assessment Dropoff Analysis', duration: 'Monthly', status: 'Review Needed', completion: 60, count: 'Dropoff Alerts' }
    ]
  }
};

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('');
  const [expandedGroups, setExpandedGroups] = useState({
    users: false,
    courses: false,
    paths: false,
    instructors: false,
    events: false,
    community: false,
    devhub: false,
    aitutor: false,
    assessments: false,
    career: false,
    finance: false,
    analytics: false,
    notifications: false,
    cms: false,
    security: false,
    settings: false
  });

  // Guard Route
  useEffect(() => {
    if (localStorage.getItem('admin_authenticated') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    navigate('/admin/login');
  };

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Mock State Data
  const [usersList, setUsersList] = useState([
    { id: '1', name: 'Ashwin Kumar', email: 'ashwin@gmail.com', role: 'Student', status: 'Active', progress: 85, path: 'AI Engineer', joined: '2026-05-01' },
    { id: '2', name: 'Dr. Elena Volkov', email: 'elena@iconichub.io', role: 'Instructor', status: 'Verified', progress: 100, path: 'Deep Learning', joined: '2025-10-12' },
    { id: '3', name: 'Sarah Jenkins', email: 'sarah.j@anthropic.com', role: 'Mentor', status: 'Verified', progress: 95, path: 'NLP Specialist', joined: '2026-02-15' },
    { id: '4', name: 'Marcus Chen', email: 'marcus@nvidia.com', role: 'Instructor', status: 'Verified', progress: 100, path: 'MLOps Architect', joined: '2026-01-20' },
    { id: '5', name: 'Nisha Mehta', email: 'nisha@gmail.com', role: 'Student', status: 'Pending Verification', progress: 34, path: 'Frontend Developer', joined: '2026-06-02' },
    { id: '6', name: 'Devon Wright', email: 'devon.w@gmail.com', role: 'Student', status: 'Active', progress: 62, path: 'DevOps Engineer', joined: '2026-04-18' }
  ]);

  const [coursesList, setCoursesList] = useState([
    { id: '101', title: 'Neural Networks & Deep Learning', category: 'AI & Machine Learning', status: 'Approved', instructor: 'Dr. Elena Volkov', students: 1240, rating: 4.9 },
    { id: '102', title: 'Mastering Kubernetes in Production', category: 'DevOps & Cloud', status: 'Approved', instructor: 'Marcus Chen', students: 850, rating: 4.8 },
    { id: '103', title: 'Advanced React Architecture Patterns', category: 'Web Development', status: 'Pending Review', instructor: 'Ashwin Kumar', students: 0, rating: 0.0 },
    { id: '104', title: 'Generative AI Applications with LLMs', category: 'AI & Machine Learning', status: 'Approved', instructor: 'Sarah Jenkins', students: 2310, rating: 4.95 }
  ]);

  const [moderationQueue, setModerationQueue] = useState([
    { id: '201', user: 'SpamBot99', type: 'Discussion Post', reason: 'Unsolicited promotion link', content: 'Hey guys, check out my crypto trading channel for free BTC signals...', date: '10m ago' },
    { id: '202', user: 'ReactNewbie', type: 'Q&A Thread', reason: 'Harassment/Inappropriate language', content: 'Your answers are completely stupid, you should quit software engineering immediately.', date: '1h ago' },
    { id: '203', user: 'DevOpsSam', type: 'Study Group Comment', reason: 'System Breach Guide', content: 'How to bypass authentication on the local VM by overriding pam.d files...', date: '3h ago' }
  ]);

  const [aiPrompts, setAiPrompts] = useState([
    { id: 'p1', name: 'AI Tutor Code Explainer', model: 'Gemini-1.5-Pro', temperature: 0.2, systemInstruction: 'You are an advanced pair-programming AI coach. Focus on explaining edge-cases and visual breakdowns of algorithms.' },
    { id: 'p2', name: 'ATS Resume Parser', model: 'Gemini-1.5-Flash', temperature: 0.1, systemInstruction: 'Extract technical competencies, experience timelines, and skill matches based on target engineering descriptions.' }
  ]);

  // States for interactive UI
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Web Development');
  const [newCourseInstructor, setNewCourseInstructor] = useState('Marcus Chen');
  const [curriculumChapters, setCurriculumChapters] = useState([
    { id: 1, title: 'Introduction & Setup', duration: '45m' },
    { id: 2, title: 'Core Concepts & Paradigms', duration: '1h 30m' }
  ]);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  // Feature Flag State
  const [featureFlags, setFeatureFlags] = useState({
    aiSandboxPlayground: true,
    realtimeCollaboration: false,
    payoutAutoApprove: false,
    betaLearningPaths: true,
    auditLogExporter: true
  });

  // Events Hub States
  const [eventsList, setEventsList] = useState([
    { id: 'ev1', title: 'Global GenAI Hackathon 2026', category: 'Hackathons', date: '2026-06-12', status: 'Upcoming', venue: 'Virtual & SF Campus', attendees: 512, limit: 1000 },
    { id: 'ev2', title: 'Deep Learning Model Tuning Workshop', category: 'Workshops', date: '2026-06-18', status: 'Upcoming', venue: 'Virtual / Zoom', attendees: 240, limit: 300 },
    { id: 'ev3', title: 'Agentic Workflows with Gemini API', category: 'Workshops', date: '2026-06-25', status: 'Upcoming', venue: 'Virtual / Google Meet', attendees: 185, limit: 250 },
    { id: 'ev4', title: 'Scaling LLMs in Production: Guest Lecture', category: 'Guest Lectures', date: '2026-05-28', status: 'Past', venue: 'Auditorium A', attendees: 420, limit: 500 }
  ]);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState('Hackathons');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventVenue, setNewEventVenue] = useState('');
  const [newEventLimit, setNewEventLimit] = useState(200);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate || !newEventVenue) return;
    const newEvent = {
      id: String(Date.now()),
      title: newEventTitle,
      category: newEventCategory,
      date: newEventDate,
      status: 'Upcoming',
      venue: newEventVenue,
      attendees: 0,
      limit: Number(newEventLimit)
    };
    setEventsList([newEvent, ...eventsList]);
    setNewEventTitle('');
    setNewEventDate('');
    setNewEventVenue('');
    setNewEventLimit(200);
    setActiveSubTab('all-events');
  };

  const handleCancelEvent = (id) => {
    setEventsList(prev => prev.filter(ev => ev.id !== id));
  };

  const handleToggleFlag = (flag) => {
    setFeatureFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const handleApproveCourse = (id) => {
    setCoursesList(prev => prev.map(c => c.id === id ? { ...c, status: 'Approved' } : c));
  };

  const handleModerationAction = (id, action) => {
    setModerationQueue(prev => prev.filter(m => m.id !== id));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourseName) return;
    const newCourse = {
      id: String(Date.now()),
      title: newCourseName,
      category: newCourseCategory,
      status: 'Pending Review',
      instructor: newCourseInstructor,
      students: 0,
      rating: 0.0
    };
    setCoursesList([newCourse, ...coursesList]);
    setNewCourseName('');
    setActiveSubTab('all-courses');
  };

  const handleVerifyUser = (id) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: 'Active' } : u));
  };

  const handleAddChapter = (e) => {
    e.preventDefault();
    if (!newChapterTitle) return;
    setCurriculumChapters([
      ...curriculumChapters,
      { id: Date.now(), title: newChapterTitle, duration: '30m' }
    ]);
    setNewChapterTitle('');
  };

  // Filtered Users list
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const effectiveRoleFilter = activeSubTab === 'students' ? 'Student' : roleFilter;
    const matchesRole = effectiveRoleFilter === 'All' || u.role === effectiveRoleFilter;
    const matchesVerification = activeSubTab === 'verification' ? u.status === 'Pending Verification' : true;
    return matchesSearch && matchesRole && matchesVerification;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#060814] text-slate-100 flex font-sans overflow-hidden">
        
        {/* Collapsible Sidebar Navigation */}
        <aside className={`${sidebarExpanded ? 'w-64' : 'w-20'} bg-slate-950/80 border-r border-slate-900 flex flex-col transition-all duration-300 backdrop-blur-xl shrink-0 z-40 relative`}>
          {/* Collapse trigger */}
          <button 
            onClick={() => setSidebarExpanded(!sidebarExpanded)} 
            className="absolute top-6 -right-3 w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors hover:border-slate-700 shadow-md"
          >
            {sidebarExpanded ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {/* Sidebar Header Logo */}
          <div className="p-6 flex items-center gap-3 border-b border-slate-900/50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-blue-500 to-orange-500 flex items-center justify-center text-white shrink-0 shadow-md">
              <Shield className="w-4 h-4" />
            </div>
            {sidebarExpanded && (
              <span className="text-sm font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                Iconic<span className="text-orange-500">Admin</span>
              </span>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 no-scrollbar">
            
            {/* Dashboard Home tab */}
            <button 
              onClick={() => { setActiveTab('dashboard'); setActiveSubTab(''); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-orange-500/10 to-purple-500/5 border border-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(239,68,68,0.03)]'
                  : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Terminal className="w-4 h-4" />
              {sidebarExpanded && <span>Dashboard Home</span>}
            </button>

            {/* Users category group */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleGroup('users')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-all ${
                  activeTab === 'users' ? 'text-white bg-slate-900/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  {sidebarExpanded && <span>Users</span>}
                </div>
                {sidebarExpanded && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedGroups.users ? 'rotate-180' : ''}`} />}
              </button>
              {sidebarExpanded && expandedGroups.users && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-900 ml-5">
                  <button onClick={() => { setActiveTab('users'); setActiveSubTab('all-users'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'all-users' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>All Users</button>
                  <button onClick={() => { setActiveTab('users'); setActiveSubTab('students'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'students' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Students</button>
                  <button onClick={() => { setActiveTab('users'); setActiveSubTab('instructors'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'instructors' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Instructors</button>
                  <button onClick={() => { setActiveTab('users'); setActiveSubTab('verification'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'verification' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>User Verification</button>
                </div>
              )}
            </div>

            {/* Courses category group */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleGroup('courses')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-all ${
                  activeTab === 'courses' ? 'text-white bg-slate-900/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  {sidebarExpanded && <span>Courses</span>}
                </div>
                {sidebarExpanded && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedGroups.courses ? 'rotate-180' : ''}`} />}
              </button>
              {sidebarExpanded && expandedGroups.courses && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-900 ml-5">
                  <button onClick={() => { setActiveTab('courses'); setActiveSubTab('all-courses'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'all-courses' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>All Courses</button>
                  <button onClick={() => { setActiveTab('courses'); setActiveSubTab('create-course'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'create-course' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Create Course</button>
                  <button onClick={() => { setActiveTab('courses'); setActiveSubTab('categories'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'categories' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Categories</button>
                </div>
              )}
            </div>

            {/* Learning Paths */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleGroup('paths')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <GitBranch className="w-4 h-4" />
                  {sidebarExpanded && <span>Learning Paths</span>}
                </div>
                {sidebarExpanded && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedGroups.paths ? 'rotate-180' : ''}`} />}
              </button>
              {sidebarExpanded && expandedGroups.paths && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-900 ml-5 text-left">
                  <span className="block text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1">Paths</span>
                  <button onClick={() => { setActiveTab('paths'); setActiveSubTab('ai-engineer'); }} className={`w-full text-left py-1 text-[10px] font-semibold transition-colors block truncate ${activeSubTab === 'ai-engineer' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>AI Engineer</button>
                  <button onClick={() => { setActiveTab('paths'); setActiveSubTab('frontend'); }} className={`w-full text-left py-1 text-[10px] font-semibold transition-colors block truncate ${activeSubTab === 'frontend' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Frontend Developer</button>
                  <button onClick={() => { setActiveTab('paths'); setActiveSubTab('backend'); }} className={`w-full text-left py-1 text-[10px] font-semibold transition-colors block truncate ${activeSubTab === 'backend' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Backend Developer</button>
                  <button onClick={() => { setActiveTab('paths'); setActiveSubTab('fullstack'); }} className={`w-full text-left py-1 text-[10px] font-semibold transition-colors block truncate ${activeSubTab === 'fullstack' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Full Stack Developer</button>
                  <button onClick={() => { setActiveTab('paths'); setActiveSubTab('data-scientist'); }} className={`w-full text-left py-1 text-[10px] font-semibold transition-colors block truncate ${activeSubTab === 'data-scientist' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Data Scientist</button>
                  <button onClick={() => { setActiveTab('paths'); setActiveSubTab('devops'); }} className={`w-full text-left py-1 text-[10px] font-semibold transition-colors block truncate ${activeSubTab === 'devops' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>DevOps Engineer</button>
                  <button onClick={() => { setActiveTab('paths'); setActiveSubTab('product-designer'); }} className={`w-full text-left py-1 text-[10px] font-semibold transition-colors block truncate ${activeSubTab === 'product-designer' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Product Designer</button>
                  <button onClick={() => { setActiveTab('paths'); setActiveSubTab('analysis'); }} className={`w-full text-left py-1 text-[10px] font-semibold transition-colors block truncate ${activeSubTab === 'analysis' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Path Analysis</button>
                </div>
              )}
            </div>

            {/* Events */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleGroup('events')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-all ${
                  activeTab === 'events' ? 'text-white bg-slate-900/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  {sidebarExpanded && <span>Events Hub</span>}
                </div>
                {sidebarExpanded && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedGroups.events ? 'rotate-180' : ''}`} />}
              </button>
              {sidebarExpanded && expandedGroups.events && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-900 ml-5 text-left">
                  <button onClick={() => { setActiveTab('events'); setActiveSubTab('all-events'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'all-events' || !activeSubTab ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>All Events</button>
                  <button onClick={() => { setActiveTab('events'); setActiveSubTab('create-event'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'create-event' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Create Event</button>
                  <button onClick={() => { setActiveTab('events'); setActiveSubTab('categories'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'categories' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Categories</button>
                  <button onClick={() => { setActiveTab('events'); setActiveSubTab('analytics'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'analytics' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Event Analytics</button>
                </div>
              )}
            </div>

            {/* Community Moderation tab */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleGroup('community')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-all ${
                  activeTab === 'community' ? 'text-white bg-slate-900/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  {sidebarExpanded && <span>Community</span>}
                </div>
                {sidebarExpanded && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedGroups.community ? 'rotate-180' : ''}`} />}
              </button>
              {sidebarExpanded && expandedGroups.community && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-900 ml-5">
                  <button onClick={() => { setActiveTab('community'); setActiveSubTab('reported'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'reported' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Reported Content</button>
                  <button onClick={() => { setActiveTab('community'); setActiveSubTab('health'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'health' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Community Health</button>
                </div>
              )}
            </div>

            {/* AI Tutor Panel */}
            <div className="space-y-0.5">
              <button 
                onClick={() => { toggleGroup('aitutor'); setActiveTab('aitutor'); setActiveSubTab('prompts'); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-all ${
                  activeTab === 'aitutor' ? 'text-white bg-slate-900/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4" />
                  {sidebarExpanded && <span>AI Tutor Center</span>}
                </div>
                {sidebarExpanded && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedGroups.aitutor ? 'rotate-180' : ''}`} />}
              </button>
              {sidebarExpanded && expandedGroups.aitutor && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-900 ml-5">
                  <button onClick={() => { setActiveTab('aitutor'); setActiveSubTab('prompts'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'prompts' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Prompt Tuner</button>
                  <button onClick={() => { setActiveTab('aitutor'); setActiveSubTab('logs'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'logs' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Conversation Logs</button>
                </div>
              )}
            </div>

            {/* Finance / Revenue Dashboard */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleGroup('finance')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-all ${
                  activeTab === 'finance' ? 'text-white bg-slate-900/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4" />
                  {sidebarExpanded && <span>Finance</span>}
                </div>
                {sidebarExpanded && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedGroups.finance ? 'rotate-180' : ''}`} />}
              </button>
              {sidebarExpanded && expandedGroups.finance && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-900 ml-5">
                  <button onClick={() => { setActiveTab('finance'); setActiveSubTab('revenue'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'revenue' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Revenue Details</button>
                </div>
              )}
            </div>

            {/* Settings & Feature Flags */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleGroup('settings')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-all ${
                  activeTab === 'settings' ? 'text-white bg-slate-900/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  {sidebarExpanded && <span>Settings</span>}
                </div>
                {sidebarExpanded && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedGroups.settings ? 'rotate-180' : ''}`} />}
              </button>
              {sidebarExpanded && expandedGroups.settings && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-900 ml-5">
                  <button onClick={() => { setActiveTab('settings'); setActiveSubTab('general'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'general' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>General Settings</button>
                  <button onClick={() => { setActiveTab('settings'); setActiveSubTab('flags'); }} className={`w-full text-left py-1.5 text-[11px] font-medium transition-colors block ${activeSubTab === 'flags' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}>Feature Flags</button>
                </div>
              )}
            </div>

          </div>

          {/* Admin Profile Footer */}
          <div className="p-4 border-t border-slate-900/80 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 font-bold shrink-0 text-xs">
                AD
              </div>
              {sidebarExpanded && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Administrator</p>
                  <button onClick={handleLogout} className="text-[10px] font-bold text-red-500 hover:text-red-400 block mt-0.5">
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#060814]">
          
          {/* Top navigation bar */}
          <header className="h-16 border-b border-slate-900 px-6 flex items-center justify-between bg-slate-950/20 backdrop-blur-md sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-extrabold text-white uppercase tracking-wider">
                {(() => {
                  if (activeTab === 'dashboard') return 'Platform Command Center';
                  if (activeTab === 'users') {
                    if (activeSubTab === 'all-users') return 'All Users Management';
                    if (activeSubTab === 'students') return 'Student Directory';
                    if (activeSubTab === 'instructors') return 'Instructor Profiles';
                    if (activeSubTab === 'verification') return 'User Verification Queue';
                    return 'Users';
                  }
                  if (activeTab === 'courses') {
                    if (activeSubTab === 'all-courses') return 'All Courses';
                    if (activeSubTab === 'create-course') return 'Curriculum Builder';
                    if (activeSubTab === 'categories') return 'Categories';
                    return 'Courses';
                  }
                  if (activeTab === 'paths') {
                    const titles = {
                      'ai-engineer': 'AI Engineer Path',
                      'frontend': 'Frontend Developer Path',
                      'backend': 'Backend Developer Path',
                      'fullstack': 'Full Stack Developer Path',
                      'data-scientist': 'Data Scientist Path',
                      'devops': 'DevOps Engineer Path',
                      'product-designer': 'Product Designer Path',
                      'analysis': 'Path Health Analysis'
                    };
                    return titles[activeSubTab] || 'Learning Paths';
                  }
                  if (activeTab === 'events') {
                    if (activeSubTab === 'all-events') return 'All Events Hub';
                    if (activeSubTab === 'create-event') return 'Create Event';
                    if (activeSubTab === 'categories') return 'Event Categories';
                    if (activeSubTab === 'analytics') return 'Event Analytics';
                    return 'Events Hub';
                  }
                  if (activeTab === 'community') {
                    if (activeSubTab === 'reported') return 'Reported Content Moderation';
                    if (activeSubTab === 'health') return 'Community Health Metrics';
                    return 'Community Moderation';
                  }
                  if (activeTab === 'aitutor') {
                    if (activeSubTab === 'logs') return 'AI Conversation Telemetry Logs';
                    return 'AI Prompts Optimizer';
                  }
                  if (activeTab === 'finance') return 'Financial Console';
                  if (activeTab === 'settings') {
                    if (activeSubTab === 'flags') return 'Feature Flags';
                    return 'Settings';
                  }
                  return activeTab;
                })()}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Quick Reset Option */}
              <Link to="/dashboard" className="text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors">
                Return to LMS &rarr;
              </Link>
              <div className="h-4 w-px bg-slate-900"></div>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-[10px] font-extrabold text-red-400 uppercase tracking-widest">Live</span>
              </div>
            </div>
          </header>

          {/* Scrolling Panel Viewports */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
            
            {/* VIEWPORT: DASHBOARD HOME */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Metrics Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  
                  {/* Card 1 */}
                  <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/5 to-red-500/0 rounded-full blur-2xl"></div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 text-left">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Active Users</p>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">14,285</h3>
                      </div>
                      <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400 border border-orange-500/20">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-4 text-[10px] text-emerald-400 font-semibold text-left">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+12.4% this month</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-blue-500/0 rounded-full blur-2xl"></div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 text-left">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Published Courses</p>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">114</h3>
                      </div>
                      <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-4 text-[10px] text-slate-400 text-left">
                      <span>4 pending administration approval</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/5 to-indigo-500/0 rounded-full blur-2xl"></div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 text-left">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Gross Revenue</p>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">$82,490</h3>
                      </div>
                      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-4 text-[10px] text-emerald-400 font-semibold text-left">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+8.2% vs target</span>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-yellow-500/0 rounded-full blur-2xl"></div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 text-left">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Queries Today</p>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">4,812</h3>
                      </div>
                      <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
                        <Cpu className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-4 text-[10px] text-cyan-400 font-semibold text-left">
                      <span>99.9% success uptime</span>
                    </div>
                  </div>

                </div>

                {/* Analytical Charts and Platform Activity Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Customized SVG Analytics Visualization */}
                  <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-left">
                        <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">User Activity & Growth</h4>
                        <p className="text-xs text-slate-500">Platform registrations compared with AI request volumes</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="flex items-center gap-1 text-[10px] text-orange-400 font-semibold">
                          <span className="w-2.5 h-2.5 rounded bg-orange-500"></span> Users
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-semibold">
                          <span className="w-2.5 h-2.5 rounded bg-cyan-500"></span> AI Actions
                        </span>
                      </div>
                    </div>

                    {/* SVG Interactive Line Chart mockup */}
                    <div className="h-64 w-full relative">
                      <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                        {/* Gradients */}
                        <defs>
                          <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.0"/>
                          </linearGradient>
                          <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0"/>
                          </linearGradient>
                        </defs>

                        {/* Grid Lines */}
                        <line x1="0" y1="40" x2="500" y2="40" stroke="#1A2035" strokeWidth="0.5" strokeDasharray="5,5"/>
                        <line x1="0" y1="90" x2="500" y2="90" stroke="#1A2035" strokeWidth="0.5" strokeDasharray="5,5"/>
                        <line x1="0" y1="140" x2="500" y2="140" stroke="#1A2035" strokeWidth="0.5" strokeDasharray="5,5"/>

                        {/* Chart Area Fill */}
                        <path d="M 0 160 Q 100 130 200 90 T 400 60 T 500 40 L 500 180 L 0 180 Z" fill="url(#orangeGrad)"/>
                        <path d="M 0 180 Q 80 150 160 140 T 320 80 T 500 70 L 500 180 L 0 180 Z" fill="url(#cyanGrad)"/>

                        {/* Trend Lines */}
                        <path d="M 0 160 Q 100 130 200 90 T 400 60 T 500 40" fill="none" stroke="#ff6b00" strokeWidth="3"/>
                        <path d="M 0 180 Q 80 150 160 140 T 320 80 T 500 70" fill="none" stroke="#00f0ff" strokeWidth="3"/>

                        {/* Hotspot Dots */}
                        <circle cx="200" cy="90" r="5" fill="#ff6b00" className="animate-pulse"/>
                        <circle cx="320" cy="80" r="5" fill="#00f0ff" className="animate-pulse"/>
                      </svg>
                      {/* X Axis labels */}
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-2">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun (Today)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Event Feeds logs */}
                  <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 flex flex-col justify-between text-left">
                    <div>
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">Real-Time Event Stream</h4>
                      
                      <div className="space-y-4">
                        <div className="flex gap-3 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0 animate-ping"></div>
                          <div>
                            <p className="text-slate-300"><strong>Ashwin Kumar</strong> selected career goal: <strong>AI & ML Engineer</strong></p>
                            <span className="text-[10px] text-slate-600 font-medium">Just now</span>
                          </div>
                        </div>

                        <div className="flex gap-3 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0"></div>
                          <div>
                            <p className="text-slate-300">AI Tutor generated code playground project: <strong>Vector Embeddings Masterclass</strong></p>
                            <span className="text-[10px] text-slate-600 font-medium">4m ago</span>
                          </div>
                        </div>

                        <div className="flex gap-3 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                          <div>
                            <p className="text-slate-300">Subscription transaction approved for <strong>Nisha Mehta</strong> ($19.99/mo)</p>
                            <span className="text-[10px] text-slate-600 font-medium">12m ago</span>
                          </div>
                        </div>

                        <div className="flex gap-3 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                          <div>
                            <p className="text-slate-300">Certificate issued: <strong>Kubernetes Deployment Architecture</strong> to Devon Wright</p>
                            <span className="text-[10px] text-slate-600 font-medium">1h ago</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-900/60 mt-4 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      <span>Monitoring 4 nodes</span>
                      <span className="text-emerald-400">100% operational</span>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* VIEWPORT: USER MANAGEMENT */}
            {activeTab === 'users' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950/20 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search administrators, students, mentors..."
                        className="w-full bg-slate-950 border border-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>
                    {activeSubTab !== 'students' && (
                      <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                        <select 
                          value={roleFilter}
                          onChange={(e) => setRoleFilter(e.target.value)}
                          className="bg-slate-950 border border-slate-900 text-xs text-slate-300 rounded-xl pl-9 pr-6 py-2.5 outline-none focus:border-orange-500 appearance-none cursor-pointer"
                        >
                          <option value="All">All Roles</option>
                          <option value="Student">Students</option>
                          <option value="Instructor">Instructors</option>
                          <option value="Mentor">Mentors</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <button className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Invite User
                  </button>
                </div>

                {/* Users datatable */}
                <div className="glass-panel rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-900/80 text-slate-500 uppercase tracking-widest font-extrabold">
                          <th className="p-4">Name</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Role</th>
                          <th className="p-4">Active Path</th>
                          <th className="p-4">Progress</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900/50">
                        {filteredUsers.map(user => (
                          <tr key={user.id} className="hover:bg-slate-900/10 transition-colors">
                            <td className="p-4 font-bold text-white">{user.name}</td>
                            <td className="p-4 text-slate-400 font-mono">{user.email}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                                user.role === 'Student' ? 'bg-cyan-500/10 text-cyan-400' :
                                user.role === 'Instructor' ? 'bg-orange-500/10 text-orange-400' : 'bg-purple-500/10 text-purple-400'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-4 text-slate-300">{user.path}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-orange-500 h-full" style={{ width: `${user.progress}%` }}></div>
                                </div>
                                <span className="font-mono text-[10px] text-slate-400">{user.progress}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`inline-flex items-center gap-1.5 ${
                                user.status === 'Verified' || user.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  user.status === 'Verified' || user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}></span>
                                {user.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button className="p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all" title="View Profile">
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                {user.status === 'Pending Verification' && (
                                  <button 
                                    onClick={() => handleVerifyUser(user.id)}
                                    className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 hover:text-emerald-300 rounded-lg transition-all" 
                                    title="Verify User"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button className="p-1.5 bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 rounded-lg transition-all" title="Suspend User">
                                  <XCircle className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEWPORT: COURSE MANAGEMENT */}
            {activeTab === 'courses' && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Subview: Course List */}
                {(activeSubTab === 'all-courses' || !activeSubTab) && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white tracking-tight">All Courses</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {coursesList.map(course => (
                        <div key={course.id} className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col justify-between gap-4 text-left">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">{course.category}</span>
                              <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                                course.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                              }`}>
                                {course.status}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-white line-clamp-1">{course.title}</h4>
                            <p className="text-xs text-slate-500">Instructor: <span className="text-slate-300 font-semibold">{course.instructor}</span></p>
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t border-slate-900/60">
                            <div className="flex gap-4 text-[10px] text-slate-500">
                              <span><strong>{course.students}</strong> Enrolled</span>
                              <span>★ <strong>{course.rating || 'N/A'}</strong></span>
                            </div>
                            {course.status === 'Pending Review' && (
                              <button 
                                onClick={() => handleApproveCourse(course.id)}
                                className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-[10px] rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1"
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Approve
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subview: Create Course / Curriculum Builder */}
                {activeSubTab === 'create-course' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white tracking-tight">Create & Curriculum Builder</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                      
                      {/* Left: General Settings Info */}
                      <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/20 space-y-4">
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Course Core Metadata</h4>
                        
                        <form onSubmit={handleAddCourse} className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Course Title</label>
                            <input 
                              type="text" 
                              required
                              value={newCourseName}
                              onChange={(e) => setNewCourseName(e.target.value)}
                              placeholder="e.g. Advanced System Design Masterclass"
                              className="w-full bg-slate-950 border border-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-3 px-4 text-xs text-white placeholder-slate-700 outline-none transition-all"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                              <select 
                                value={newCourseCategory}
                                onChange={(e) => setNewCourseCategory(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 text-xs text-slate-300 rounded-xl px-3 py-3 outline-none focus:border-orange-500 appearance-none cursor-pointer"
                              >
                                <option>AI & Machine Learning</option>
                                <option>Web Development</option>
                                <option>DevOps & Cloud</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lead Instructor</label>
                              <select 
                                value={newCourseInstructor}
                                onChange={(e) => setNewCourseInstructor(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 text-xs text-slate-300 rounded-xl px-3 py-3 outline-none focus:border-orange-500 appearance-none cursor-pointer"
                              >
                                <option>Marcus Chen</option>
                                <option>Dr. Elena Volkov</option>
                                <option>Sarah Jenkins</option>
                              </select>
                            </div>
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                          >
                            <PlusCircle className="w-4 h-4" /> Create Course Draft
                          </button>
                        </form>
                      </div>

                      {/* Right: Interactive Curriculum Chapters Builder */}
                      <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/20 space-y-6">
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Interactive Curriculum Builder</h4>
                        
                        <div className="space-y-3">
                          {curriculumChapters.map((ch, idx) => (
                            <div key={ch.id} className="flex justify-between items-center bg-slate-950/60 p-4 rounded-xl border border-slate-900">
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[10px] text-orange-400 font-bold font-mono">
                                  {idx + 1}
                                </span>
                                <span className="text-xs font-bold text-slate-200">{ch.title}</span>
                              </div>
                              <span className="text-[10px] text-slate-500 font-mono font-bold">{ch.duration}</span>
                            </div>
                          ))}
                        </div>

                        <form onSubmit={handleAddChapter} className="flex gap-2">
                          <input 
                            type="text" 
                            value={newChapterTitle}
                            onChange={(e) => setNewChapterTitle(e.target.value)}
                            placeholder="Add new module title..."
                            className="flex-1 bg-slate-950 border border-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-700 outline-none transition-all"
                          />
                          <button 
                            type="submit"
                            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700/50 transition-all shrink-0"
                          >
                            Add Chapter
                          </button>
                        </form>
                      </div>

                    </div>
                  </div>
                )}

                {/* Subview: Categories */}
                {activeSubTab === 'categories' && (
                  <div className="space-y-6 text-left">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white tracking-tight">Categories Management</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left: Quick Add Category */}
                      <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/20 space-y-4">
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Add New Category</h4>
                        
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          // Simple mock logic: categories can be saved/displayed dynamically
                          const form = e.target;
                          const name = form.elements.categoryName.value;
                          const desc = form.elements.categoryDesc.value;
                          if (!name) return;
                          
                          // Quick-add to dynamic view by injecting a mock or alert
                          alert(`Mock Category Added: ${name}`);
                          form.reset();
                        }} className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category Name</label>
                            <input 
                              name="categoryName"
                              type="text" 
                              required
                              placeholder="e.g. Mobile Development"
                              className="w-full bg-slate-950 border border-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-700 outline-none transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                            <textarea 
                              name="categoryDesc"
                              rows="3"
                              placeholder="e.g. iOS, Android, Flutter, React Native, and cross-platform mobile tools."
                              className="w-full bg-slate-950 border border-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-700 outline-none transition-all resize-none"
                            ></textarea>
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                          >
                            <PlusCircle className="w-4 h-4" /> Save Category
                          </button>
                        </form>
                      </div>

                      {/* Right/Middle: List of Categories */}
                      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { name: 'AI & Machine Learning', count: coursesList.filter(c => c.category === 'AI & Machine Learning').length, desc: 'Deep learning, neural networks, LLMs, NLP, and model optimization.', color: 'from-purple-500/10 to-blue-500/5 border-purple-500/20' },
                          { name: 'Web Development', count: coursesList.filter(c => c.category === 'Web Development').length, desc: 'Modern frontend frameworks, responsive UI architecture, state design patterns, and backend microservices.', color: 'from-orange-500/10 to-amber-500/5 border-orange-500/20' },
                          { name: 'DevOps & Cloud', count: coursesList.filter(c => c.category === 'DevOps & Cloud').length, desc: 'Kubernetes, serverless, automated pipelines, orchestration, infrastructure-as-code, and system security.', color: 'from-cyan-500/10 to-emerald-500/5 border-cyan-500/20' }
                        ].map((cat, idx) => (
                          <div key={idx} className={`glass-panel p-6 rounded-2xl border bg-gradient-to-br ${cat.color} flex flex-col justify-between gap-4`}>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-orange-400 font-mono text-[10px] font-bold">
                                  {cat.count} {cat.count === 1 ? 'Course' : 'Courses'}
                                </span>
                              </div>
                              <h4 className="text-sm font-extrabold text-white">{cat.name}</h4>
                              <p className="text-xs text-slate-400 leading-relaxed font-sans">{cat.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEWPORT: LEARNING PATHS COMMAND CENTER */}
            {activeTab === 'paths' && (() => {
              const currentPath = PATH_DATA[activeSubTab] || PATH_DATA['ai-engineer'];
              return (
                <div className="space-y-8 animate-fadeIn text-left">
                  
                  {/* Selected Path Header Title */}
                  <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                    <div>
                      <span className="text-[10px] font-extrabold text-orange-500 uppercase tracking-widest">Selected Command Center</span>
                      <h2 className="text-xl font-extrabold text-white tracking-tight mt-1">{currentPath.title}</h2>
                    </div>
                  </div>

                  {/* Metric Summary Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enrolled Students</p>
                      <h3 className="text-2xl font-extrabold text-white mt-1">{currentPath.students}</h3>
                      <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" /> +14% vs last Q
                      </span>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg. Progress Rate</p>
                      <h3 className="text-2xl font-extrabold text-orange-400 mt-1">{currentPath.progress}</h3>
                      <div className="w-full bg-slate-900 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-orange-500 h-full" style={{ width: currentPath.progress }}></div>
                      </div>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Syllabus Health Score</p>
                      <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">{currentPath.health}</h3>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Chapters Validated</span>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Average Test Score</p>
                      <h3 className="text-2xl font-extrabold text-white mt-1">{currentPath.score}</h3>
                      <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider block mt-1">Class Average</span>
                    </div>
                  </div>

                  {/* Stage Tracking and Student Activity grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Stage syllabus tracking */}
                    <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 space-y-6">
                      <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Path Stage Syllabus & Health</h4>
                      
                      <div className="space-y-4">
                        {currentPath.stages.map((stage, idx) => (
                          <div key={idx} className="bg-slate-950/50 border border-slate-900 p-4 rounded-xl flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{stage.duration} • {stage.count}</span>
                              <h5 className="text-xs font-bold text-white">{stage.title}</h5>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] text-slate-400 font-mono">Completed by {stage.completion}%</span>
                              </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                              stage.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400 animate-pulse'
                            }`}>
                              {stage.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Path Student Activity & Actions */}
                    <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 flex flex-col justify-between gap-6">
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Path Customization & Tools</h4>
                        <p className="text-xs text-slate-500 mb-6">Modify node locks, add dynamic prerequisite checks, or sync assessment guidelines.</p>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-slate-950/40 p-3.5 rounded-xl border border-slate-900/60">
                            <div>
                              <span className="text-xs font-bold text-slate-200">Enforce Stage Gating</span>
                              <p className="text-[9px] text-slate-500">Requires completion of previous stage before proceeding</p>
                            </div>
                            <button className="w-8 h-4.5 bg-orange-500 rounded-full p-0.5 relative transition-colors"><span className="w-3.5 h-3.5 bg-white rounded-full block translate-x-3.5 transition-transform"></span></button>
                          </div>

                          <div className="flex justify-between items-center bg-slate-950/40 p-3.5 rounded-xl border border-slate-900/60">
                            <div>
                              <span className="text-xs font-bold text-slate-200">AI Mentor Prompts Sync</span>
                              <p className="text-[9px] text-slate-500">Updates path-specific system prompts for AI copilot</p>
                            </div>
                            <button className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700/50 text-[9px] font-bold transition-all">Sync Prompt</button>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => alert(`Syllabus integrity verification check passed for: ${currentPath.title}`)}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="w-4 h-4" /> Run Syllabus Integrity Check
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* VIEWPORT: EVENTS HUB */}
            {activeTab === 'events' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* SUBTAB: ALL EVENTS */}
                {(activeSubTab === 'all-events' || !activeSubTab) && (
                  <div className="space-y-6">
                    {/* Event Stats cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Total Scheduled Events</span>
                        <h3 className="text-2xl font-extrabold text-white mt-1">{eventsList.length}</h3>
                        <p className="text-[10px] text-emerald-400 mt-1.5 font-semibold">Active & Live channels</p>
                      </div>
                      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Accumulated Attendees</span>
                        <h3 className="text-2xl font-extrabold text-white mt-1">
                          {eventsList.reduce((acc, curr) => acc + curr.attendees, 0)}
                        </h3>
                        <p className="text-[10px] text-orange-400 mt-1.5 font-semibold">Registered users</p>
                      </div>
                      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Event Success Rate</span>
                        <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">94.8%</h3>
                        <p className="text-[10px] text-slate-500 mt-1.5">Based on feedback ratings</p>
                      </div>
                    </div>

                    {/* Table list */}
                    <div className="glass-panel rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden text-left">
                      <div className="p-5 border-b border-slate-900 flex justify-between items-center">
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">Active Events Catalog</h4>
                        <button 
                          onClick={() => setActiveSubTab('create-event')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[10px] font-bold transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" /> Schedule Event
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                              <th className="p-4">Event Details</th>
                              <th className="p-4">Type</th>
                              <th className="p-4">Date</th>
                              <th className="p-4">Venue / Location</th>
                              <th className="p-4">Capacity</th>
                              <th className="p-4 text-center">Status</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900/50">
                            {eventsList.map((ev) => (
                              <tr key={ev.id} className="hover:bg-slate-900/10 transition-colors">
                                <td className="p-4">
                                  <p className="font-bold text-white text-xs">{ev.title}</p>
                                  <p className="text-[9px] text-slate-500 font-mono">ID: {ev.id}</p>
                                </td>
                                <td className="p-4">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                    ev.category === 'Hackathons' ? 'bg-purple-500/10 text-purple-400' :
                                    ev.category === 'Workshops' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                                  }`}>
                                    {ev.category}
                                  </span>
                                </td>
                                <td className="p-4 text-slate-300 font-semibold">{ev.date}</td>
                                <td className="p-4 text-slate-400">{ev.venue}</td>
                                <td className="p-4">
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-[9px] text-slate-500 font-semibold">
                                      <span>{ev.attendees} / {ev.limit}</span>
                                      <span>{Math.round((ev.attendees / ev.limit) * 100)}%</span>
                                    </div>
                                    <div className="w-24 h-1 bg-slate-900 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" 
                                        style={{ width: `${Math.min(100, (ev.attendees / ev.limit) * 100)}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 text-center">
                                  <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    ev.status === 'Upcoming' ? 'bg-emerald-500/10 text-emerald-400 animate-pulse' : 'bg-slate-800 text-slate-500'
                                  }`}>
                                    <span className={`w-1 h-1 rounded-full ${ev.status === 'Upcoming' ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                                    {ev.status}
                                  </span>
                                </td>
                                <td className="p-4 text-right">
                                  <button 
                                    onClick={() => handleCancelEvent(ev.id)}
                                    className="p-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 rounded transition-colors"
                                    title="Cancel Event"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB: CREATE EVENT */}
                {activeSubTab === 'create-event' && (
                  <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 text-left max-w-2xl">
                    <div className="mb-6">
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Schedule a New Event</h4>
                      <p className="text-xs text-slate-500 font-semibold">Broadcast hackathons, skill-building workshops, or expert guest lectures to the community.</p>
                    </div>

                    <form onSubmit={handleAddEvent} className="space-y-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Event Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. LLM Fine-Tuning & Quantization Masterclass" 
                          value={newEventTitle}
                          onChange={(e) => setNewEventTitle(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all font-medium"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-300">Format Category</label>
                          <select 
                            value={newEventCategory}
                            onChange={(e) => setNewEventCategory(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-orange-500 transition-all font-medium"
                          >
                            <option value="Hackathons">Hackathon</option>
                            <option value="Workshops">Workshop</option>
                            <option value="Guest Lectures">Guest Lecture</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-300">Event Date</label>
                          <input 
                            type="date" 
                            value={newEventDate}
                            onChange={(e) => setNewEventDate(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-orange-500 transition-all font-medium"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-300">Venue / Broadcast Link</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Auditorium C / Virtual Zoom" 
                            value={newEventVenue}
                            onChange={(e) => setNewEventVenue(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-slate-300">Registration Cap Limit</label>
                          <input 
                            type="number" 
                            value={newEventLimit}
                            onChange={(e) => setNewEventLimit(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all font-medium"
                            min="10"
                            required
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button 
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all"
                        >
                          Publish Event
                        </button>
                        <button 
                          type="button"
                          onClick={() => setActiveSubTab('all-events')}
                          className="px-6 py-3 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-white font-bold rounded-xl transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* SUBTAB: CATEGORIES */}
                {activeSubTab === 'categories' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/40 text-left space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                            <Sparkles className="w-5 h-5" />
                          </span>
                          <span className="text-[10px] font-bold text-purple-400 bg-purple-500/5 px-2 py-0.5 rounded">Major Format</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-white">Hackathons</h4>
                          <p className="text-[11px] text-slate-500 mt-1">Multi-day team programming sprints focusing on AI build-outs and product prototypes.</p>
                        </div>
                        <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-400">
                          <span>Active Scheduled:</span>
                          <span className="font-bold text-white">
                            {eventsList.filter(e => e.category === 'Hackathons').length}
                          </span>
                        </div>
                      </div>

                      <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/40 text-left space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                            <Terminal className="w-5 h-5" />
                          </span>
                          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded">Interactive Dev</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-white">Workshops</h4>
                          <p className="text-[11px] text-slate-500 mt-1">Live codebase walk-throughs, architecture design reviews, and hands-on coding sandboxes.</p>
                        </div>
                        <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-400">
                          <span>Active Scheduled:</span>
                          <span className="font-bold text-white">
                            {eventsList.filter(e => e.category === 'Workshops').length}
                          </span>
                        </div>
                      </div>

                      <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/40 text-left space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
                            <Cpu className="w-5 h-5" />
                          </span>
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded">Expert Insights</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-white">Guest Lectures</h4>
                          <p className="text-[11px] text-slate-500 mt-1">Tech leaders and research scientists outlining enterprise telemetry patterns and scaling.</p>
                        </div>
                        <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-400">
                          <span>Active Scheduled:</span>
                          <span className="font-bold text-white">
                            {eventsList.filter(e => e.category === 'Guest Lectures').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB: ANALYTICS */}
                {activeSubTab === 'analytics' && (
                  <div className="space-y-6 text-left">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Telemetry charts */}
                      <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 space-y-4">
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">Feedback & Attendee Satisfaction</h4>
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-slate-300">Hackathon Engagement</span>
                              <span className="text-purple-400">96.2%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 rounded-full" style={{ width: '96.2%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-slate-300">Workshop Completion Rates</span>
                              <span className="text-blue-400">89.4%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '89.4%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-slate-300">Guest Lecture Retention</span>
                              <span className="text-amber-400">92.5%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: '92.5%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Attendee logs */}
                      <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 space-y-4">
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">Recent Event Signups</h4>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
                            <div>
                              <p className="font-bold text-white">Sarah Jenkins registered</p>
                              <p className="text-[10px] text-slate-500">Global GenAI Hackathon 2026</p>
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">2m ago</span>
                          </div>

                          <div className="flex justify-between items-center text-xs p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
                            <div>
                              <p className="font-bold text-white">Nisha Mehta registered</p>
                              <p className="text-[10px] text-slate-500">Agentic Workflows with Gemini API</p>
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">14m ago</span>
                          </div>

                          <div className="flex justify-between items-center text-xs p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
                            <div>
                              <p className="font-bold text-white">Ashwin Kumar registered</p>
                              <p className="text-[10px] text-slate-500">Deep Learning Model Tuning Workshop</p>
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">1h ago</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEWPORT: COMMUNITY MODERATION */}
            {activeTab === 'community' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* SUBTAB: REPORTED CONTENT */}
                {(activeSubTab === 'reported' || !activeSubTab) && (
                  <div className="space-y-6">
                    {/* Header Metrics */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reported posts</p>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">{moderationQueue.length}</h3>
                      </div>
                      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform Health Score</p>
                        <h3 className="text-2xl font-extrabold text-emerald-400 tracking-tight mt-1">98.2%</h3>
                      </div>
                      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Spam Accounts Filtered</p>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">485</h3>
                      </div>
                    </div>

                    {/* reported content queue */}
                    <div className="glass-panel rounded-2xl border border-white/5 bg-slate-900/10 overflow-hidden text-left">
                      <div className="p-5 border-b border-slate-900">
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">Content Review Queue</h4>
                      </div>
                      <div className="divide-y divide-slate-900/50">
                        {moderationQueue.length === 0 ? (
                          <div className="p-8 text-center text-xs text-slate-500">No reported content pending review!</div>
                        ) : (
                          moderationQueue.map(item => (
                            <div key={item.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-950/25 transition-colors">
                              <div className="space-y-2 max-w-2xl">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-xs font-extrabold text-orange-400">@{item.user}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase tracking-wider">{item.type}</span>
                                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">{item.date}</span>
                                </div>
                                <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-950/80 p-3 rounded-lg border border-slate-900/50">{item.content}</p>
                                <p className="text-[10px] text-red-400/80 font-bold uppercase tracking-wider flex items-center gap-1">
                                  <AlertTriangle className="w-3.5 h-3.5" /> Reason: {item.reason}
                                </p>
                              </div>
                              
                              <div className="flex gap-2 shrink-0">
                                <button 
                                  onClick={() => handleModerationAction(item.id, 'dismiss')}
                                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] rounded-lg border border-slate-700/50 transition-colors"
                                >
                                  Dismiss Flag
                                </button>
                                <button 
                                  onClick={() => handleModerationAction(item.id, 'ban')}
                                  className="px-3.5 py-2 bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 font-bold text-[10px] rounded-lg transition-colors"
                                >
                                  Ban & Delete
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB: COMMUNITY HEALTH */}
                {activeSubTab === 'health' && (
                  <div className="space-y-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Interaction rates */}
                      <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 space-y-4">
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">Community Vitality Metrics</h4>
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-slate-300">Daily Active Discussions</span>
                              <span className="text-emerald-400">84.2%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84.2%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-slate-300">Mentor Response Time (&lt; 2h)</span>
                              <span className="text-blue-400">91.8%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '91.8%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-slate-300">Study Group Formation Rate</span>
                              <span className="text-purple-400">76.5%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 rounded-full" style={{ width: '76.5%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Moderation activity summary */}
                      <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 space-y-4">
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">Moderator Activity Logs</h4>
                        
                        <div className="space-y-3 text-xs">
                          <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl flex justify-between items-center">
                            <div>
                              <p className="font-bold text-white">System Auto-Moderator</p>
                              <p className="text-[10px] text-slate-500">Flagged content containing banned tokens (Crypto Spam)</p>
                            </div>
                            <span className="text-[9px] font-bold text-slate-500">12m ago</span>
                          </div>

                          <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl flex justify-between items-center">
                            <div>
                              <p className="font-bold text-white">Ashwin Kumar (Admin)</p>
                              <p className="text-[10px] text-slate-500">Approved study group: "DeepRL Pioneers"</p>
                            </div>
                            <span className="text-[9px] font-bold text-slate-500">2h ago</span>
                          </div>

                          <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl flex justify-between items-center">
                            <div>
                              <p className="font-bold text-white">Dr. Elena Volkov (Instructor)</p>
                              <p className="text-[10px] text-slate-500">Moderated answer on: "Optimizing ResNet block"</p>
                            </div>
                            <span className="text-[9px] font-bold text-slate-500">1d ago</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEWPORT: AI MANAGEMENT */}
            {activeTab === 'aitutor' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* SUBTAB: PROMPT TUNER */}
                {(activeSubTab === 'prompts' || !activeSubTab) && (
                  <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 text-left space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Prompts Tuner</h4>
                        <p className="text-xs text-slate-500">Fine-tune Gemini instructions for specific LMS contexts</p>
                      </div>
                      <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700/50 transition-all flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Add Prompt Context
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {aiPrompts.map(prompt => (
                        <div key={prompt.id} className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                          <div className="flex justify-between items-center">
                            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">{prompt.name}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold uppercase tracking-widest">{prompt.model}</span>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Instruction</label>
                            <textarea 
                              value={prompt.systemInstruction}
                              onChange={(e) => {
                                const updated = e.target.value;
                                setAiPrompts(prev => prev.map(p => p.id === prompt.id ? { ...p, systemInstruction: updated } : p));
                              }}
                              className="w-full bg-slate-950 border border-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-2.5 px-3 text-xs text-slate-300 outline-none transition-all h-24 font-mono no-scrollbar"
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Temp: {prompt.temperature}</span>
                              <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.1" 
                                value={prompt.temperature}
                                onChange={(e) => {
                                  const updated = parseFloat(e.target.value);
                                  setAiPrompts(prev => prev.map(p => p.id === prompt.id ? { ...p, temperature: updated } : p));
                                }}
                                className="accent-orange-500 w-24 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                            
                            <button className="px-3.5 py-1.5 bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 text-orange-400 font-bold text-[10px] rounded-lg transition-all">
                              Save Changes
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUBTAB: CONVERSATION LOGS */}
                {activeSubTab === 'logs' && (
                  <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 text-left space-y-6">
                    <div>
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Tutor Conversation logs</h4>
                      <p className="text-xs text-slate-500">Audit system queries, response speed telemetry, and user satisfaction ratings</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="p-4">User Session</th>
                            <th className="p-4">Topic / Query Context</th>
                            <th className="p-4">Tokens</th>
                            <th className="p-4">Latency</th>
                            <th className="p-4 text-center">Satisfaction</th>
                            <th className="p-4 text-right">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/50">
                          <tr className="hover:bg-slate-900/10 transition-colors">
                            <td className="p-4">
                              <p className="font-bold text-white">Ashwin Kumar</p>
                              <p className="text-[9px] text-slate-500 font-mono">session_49f92</p>
                            </td>
                            <td className="p-4 text-slate-300 font-medium">Explain double-descent curve in deep learning models</td>
                            <td className="p-4 text-slate-400 font-mono">420 / 680</td>
                            <td className="p-4 text-slate-400 font-mono">1.2s</td>
                            <td className="p-4 text-center">
                              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[9px] font-bold">Excellent</span>
                            </td>
                            <td className="p-4 text-right">
                              <button className="text-[10px] text-orange-400 hover:text-orange-300 font-bold transition-all">Inspect Graph</button>
                            </td>
                          </tr>

                          <tr className="hover:bg-slate-900/10 transition-colors">
                            <td className="p-4">
                              <p className="font-bold text-white">Nisha Mehta</p>
                              <p className="text-[9px] text-slate-500 font-mono">session_390af</p>
                            </td>
                            <td className="p-4 text-slate-300 font-medium">Debug React hydration failed inside Next.js layout</td>
                            <td className="p-4 text-slate-400 font-mono">810 / 1200</td>
                            <td className="p-4 text-slate-400 font-mono">1.8s</td>
                            <td className="p-4 text-center">
                              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[9px] font-bold">Optimal</span>
                            </td>
                            <td className="p-4 text-right">
                              <button className="text-[10px] text-orange-400 hover:text-orange-300 font-bold transition-all">Inspect Graph</button>
                            </td>
                          </tr>

                          <tr className="hover:bg-slate-900/10 transition-colors">
                            <td className="p-4">
                              <p className="font-bold text-white">Devon Wright</p>
                              <p className="text-[9px] text-slate-500 font-mono">session_10fdf</p>
                            </td>
                            <td className="p-4 text-slate-300 font-medium">K8s ingress-nginx TLS configuration parameters</td>
                            <td className="p-4 text-slate-400 font-mono">602 / 980</td>
                            <td className="p-4 text-slate-400 font-mono">1.4s</td>
                            <td className="p-4 text-center">
                              <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-[9px] font-bold animate-pulse">Average</span>
                            </td>
                            <td className="p-4 text-right">
                              <button className="text-[10px] text-orange-400 hover:text-orange-300 font-bold transition-all">Inspect Graph</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* VIEWPORT: FINANCE */}
            {activeTab === 'finance' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Revenue stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Monthly Recurring Revenue (MRR)</span>
                    <h3 className="text-3xl font-extrabold text-white mt-2">$24,910</h3>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-2">+5.2% vs last month</p>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Payouts to Instructors</span>
                    <h3 className="text-3xl font-extrabold text-white mt-2">$8,520</h3>
                    <p className="text-[10px] text-slate-500 mt-2">Next payment cycle: June 15th</p>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Outstanding Refunds</span>
                    <h3 className="text-3xl font-extrabold text-white mt-2">$0.00</h3>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-2">0 queries open</p>
                  </div>
                </div>

                {/* transaction list */}
                <div className="glass-panel rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden text-left">
                  <div className="p-5 border-b border-slate-900 flex justify-between items-center">
                    <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">Recent Transactions</h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Showing 4 of 4</span>
                  </div>
                  
                  <div className="divide-y divide-slate-900/50 text-xs">
                    <div className="p-4 flex justify-between items-center hover:bg-slate-900/10 transition-colors">
                      <div>
                        <p className="font-bold text-white">Ashwin Kumar</p>
                        <p className="text-[10px] text-slate-500">ashwin@gmail.com</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-400">+$19.99</p>
                        <p className="text-[10px] text-slate-600 font-mono">ID: tr_8204b</p>
                      </div>
                    </div>

                    <div className="p-4 flex justify-between items-center hover:bg-slate-900/10 transition-colors">
                      <div>
                        <p className="font-bold text-white">Nisha Mehta</p>
                        <p className="text-[10px] text-slate-500">nisha@gmail.com</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-400">+$19.99</p>
                        <p className="text-[10px] text-slate-600 font-mono">ID: tr_4910f</p>
                      </div>
                    </div>

                    <div className="p-4 flex justify-between items-center hover:bg-slate-900/10 transition-colors">
                      <div>
                        <p className="font-bold text-white">Devon Wright</p>
                        <p className="text-[10px] text-slate-500">devon.w@gmail.com</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-400">+$19.99</p>
                        <p className="text-[10px] text-slate-600 font-mono">ID: tr_3910c</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* VIEWPORT: SETTINGS & FEATURE FLAGS */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fadeIn">
                             {/* Feature flags viewport */}
                {activeSubTab === 'flags' && (
                  <div className="space-y-6 text-left">
                    {/* Stat summaries */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Active Features</span>
                        <h3 className="text-2xl font-extrabold text-white mt-1">
                          {Object.values(featureFlags).filter(Boolean).length} / {Object.keys(featureFlags).length}
                        </h3>
                        <p className="text-[10px] text-emerald-400 mt-1.5 font-semibold">Live modules running</p>
                      </div>
                      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Experimental Modules</span>
                        <h3 className="text-2xl font-extrabold text-amber-500 mt-1">2 Pending</h3>
                        <p className="text-[10px] text-slate-500 mt-1.5">Awaiting sandbox verification</p>
                      </div>
                      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Deployment Status</span>
                        <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">Optimal</h3>
                        <p className="text-[10px] text-slate-500 mt-1.5">No critical flags overrides</p>
                      </div>
                    </div>

                    {/* Redesigned grid list */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Flag 1 */}
                      <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[9px] font-bold uppercase tracking-wider">Workspace Integration</span>
                            <span className={`w-2 h-2 rounded-full ${featureFlags.aiSandboxPlayground ? 'bg-emerald-400' : 'bg-slate-700'}`}></span>
                          </div>
                          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Sandbox & Playground</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed">Enables dynamic client-side node compilers and auto-completing Gemini workspace coaches.</p>
                        </div>
                        <div className="pt-4 border-t border-slate-900 flex justify-between items-center">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status: {featureFlags.aiSandboxPlayground ? 'Active' : 'Disabled'}</span>
                          <button 
                            onClick={() => handleToggleFlag('aiSandboxPlayground')}
                            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                              featureFlags.aiSandboxPlayground 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' 
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Toggle Flag
                          </button>
                        </div>
                      </div>

                      {/* Flag 2 */}
                      <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase tracking-wider">Collaboration Node</span>
                            <span className={`w-2 h-2 rounded-full ${featureFlags.realtimeCollaboration ? 'bg-emerald-400' : 'bg-slate-700'}`}></span>
                          </div>
                          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Real-Time Peer Collaboration</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed">Allows multiple learners to synchronize code blocks inside the editor using operational transforms.</p>
                        </div>
                        <div className="pt-4 border-t border-slate-900 flex justify-between items-center">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status: {featureFlags.realtimeCollaboration ? 'Active' : 'Disabled'}</span>
                          <button 
                            onClick={() => handleToggleFlag('realtimeCollaboration')}
                            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                              featureFlags.realtimeCollaboration 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' 
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Toggle Flag
                          </button>
                        </div>
                      </div>

                      {/* Flag 3 */}
                      <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9px] font-bold uppercase tracking-wider">Finance Automation</span>
                            <span className={`w-2 h-2 rounded-full ${featureFlags.payoutAutoApprove ? 'bg-emerald-400' : 'bg-slate-700'}`}></span>
                          </div>
                          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Automatic Payout Verification</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed">Bypasses manual auditor confirmations for monthly recurring instructor transactions.</p>
                        </div>
                        <div className="pt-4 border-t border-slate-900 flex justify-between items-center">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status: {featureFlags.payoutAutoApprove ? 'Active' : 'Disabled'}</span>
                          <button 
                            onClick={() => handleToggleFlag('payoutAutoApprove')}
                            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                              featureFlags.payoutAutoApprove 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' 
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Toggle Flag
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subview: General system settings */}
                {(activeSubTab === 'general' || !activeSubTab) && (
                  <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-slate-900/15 text-left space-y-6">
                    <div>
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">General Configuration</h4>
                      <p className="text-xs text-slate-500 font-semibold">Track database backups, server nodes, and system limits</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Main database</span>
                        <p className="font-bold text-slate-200">PostgreSQL (AWS Aurora)</p>
                        <p className="text-[10px] text-slate-500">Capacity: 48.5 GB of 100 GB</p>
                      </div>
                      
                      <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Last Backup</span>
                        <p className="font-bold text-slate-200">6 hours ago (Automated)</p>
                        <p className="text-[10px] text-slate-500">AWS S3 Vault</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </main>

      </div>
    </PageTransition>
  );
}
