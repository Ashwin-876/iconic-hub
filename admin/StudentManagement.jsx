import React, { useState } from 'react';
import { 
  Award, BookOpen, Clock, Activity, Search, Filter, Plus, ChevronLeft, 
  ChevronRight, X, Mail, BookOpen as BookIcon, CheckCircle, Send, PlusCircle,
  BarChart3, Sparkles, Zap, ShieldAlert
} from 'lucide-react';

export default function StudentManagement() {
  // Mock Students Database
  const [students, setStudents] = useState([
    { 
      id: 's1', 
      name: 'Ashwin Kumar', 
      email: 'ashwin@gmail.com', 
      path: 'AI Engineer', 
      skillLevel: 'Intermediate', 
      progress: 85, 
      subscription: 'Premium', 
      learningHours: 142, 
      engagementScore: 94,
      completedCourses: ['Intro to Python', 'Neural Networks Basics'],
      enrolledCourses: ['Generative AI Mastery', 'Vector Databases Deep Dive'],
      certificates: ['Deep Learning Fundamentals'],
      activityCount: 42,
      avatar: 'AK'
    },
    { 
      id: 's2', 
      name: 'Nisha Mehta', 
      email: 'nisha@gmail.com', 
      path: 'Frontend Developer', 
      skillLevel: 'Beginner', 
      progress: 34, 
      subscription: 'Free', 
      learningHours: 38, 
      engagementScore: 78,
      completedCourses: ['HTML/CSS Kickstart'],
      enrolledCourses: ['React Architecture Patterns', 'Tailwind Styling Premium'],
      certificates: [],
      activityCount: 15,
      avatar: 'NM'
    },
    { 
      id: 's3', 
      name: 'Devon Wright', 
      email: 'devon.w@gmail.com', 
      path: 'DevOps Engineer', 
      skillLevel: 'Advanced', 
      progress: 62, 
      subscription: 'Premium', 
      learningHours: 94, 
      engagementScore: 88,
      completedCourses: ['Linux Administration', 'Docker Orchestration'],
      enrolledCourses: ['Kubernetes in Production', 'Terraform Cloud Deployments'],
      certificates: ['Certified DevOps Starter'],
      activityCount: 29,
      avatar: 'DW'
    },
    { 
      id: 's4', 
      name: 'Liam Foster', 
      email: 'liam@gmail.com', 
      path: 'Backend Developer', 
      skillLevel: 'Intermediate', 
      progress: 74, 
      subscription: 'Free', 
      learningHours: 110, 
      engagementScore: 91,
      completedCourses: ['SQL Database Essentials', 'NodeJS REST APIs'],
      enrolledCourses: ['Microservices Architectures', 'Redis Caching Masterclass'],
      certificates: ['Postgres SQL Specialist'],
      activityCount: 38,
      avatar: 'LF'
    }
  ]);

  // Filters & Sorting states
  const [search, setSearch] = useState('');
  const [pathFilter, setPathFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');
  const [progressFilter, setProgressFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Assign Course state
  const [selectedCourseToAssign, setSelectedCourseToAssign] = useState('Docker Orchestration');
  const [assignSuccess, setAssignSuccess] = useState(false);

  // Notification state
  const [notifText, setNotifText] = useState('');
  const [notifSuccess, setNotifSuccess] = useState(false);

  // Growth analytics period
  const [period, setPeriod] = useState('30d');

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) || 
                          student.email.toLowerCase().includes(search.toLowerCase());
    const matchesPath = pathFilter === 'All' || student.path === pathFilter;
    const matchesSkill = skillFilter === 'All' || student.skillLevel === skillFilter;
    
    let matchesProgress = true;
    if (progressFilter === 'high') matchesProgress = student.progress >= 70;
    else if (progressFilter === 'mid') matchesProgress = student.progress >= 40 && student.progress < 70;
    else if (progressFilter === 'low') matchesProgress = student.progress < 40;

    return matchesSearch && matchesPath && matchesSkill && matchesProgress;
  });

  // Assign course trigger
  const handleAssignCourse = () => {
    if (!selectedStudent || !selectedCourseToAssign) return;
    if (selectedStudent.enrolledCourses.includes(selectedCourseToAssign)) {
      alert("Student is already enrolled in this course.");
      return;
    }
    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudent.id) {
        const updatedCourses = [...s.enrolledCourses, selectedCourseToAssign];
        return { ...s, enrolledCourses: updatedCourses };
      }
      return s;
    }));
    setSelectedStudent(prev => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, selectedCourseToAssign]
    }));
    setAssignSuccess(true);
    setTimeout(() => setAssignSuccess(false), 2000);
  };

  // Send notification trigger
  const handleSendNotif = (e) => {
    e.preventDefault();
    if (!notifText) return;
    setNotifSuccess(true);
    setNotifText('');
    setTimeout(() => setNotifSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left relative">
      
      {/* Student Analytics Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Avg Completion Rate</p>
              <h3 className="text-xl font-extrabold text-white tracking-tight">84.2%</h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-emerald-400 font-semibold">
            <span>+3.4% this cycle</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Avg Engagement</p>
              <h3 className="text-xl font-extrabold text-cyan-400 tracking-tight">92 / 100</h3>
            </div>
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-400">
            <span>Based on Sandbox actions</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Total Learning Hours</p>
              <h3 className="text-xl font-extrabold text-orange-400 tracking-tight">384 hrs</h3>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400 border border-orange-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-400">
            <span>Cumulative study target</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Certificates Awarded</p>
              <h3 className="text-xl font-extrabold text-purple-400 tracking-tight">12 issued</h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-emerald-400 font-semibold">
            <span>+2 verify requests</span>
          </div>
        </div>

      </div>

      {/* Advanced filters and Search */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-900/15 flex flex-col md:flex-row justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student name or email..."
              className="w-full bg-slate-950 border border-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white placeholder-slate-600 outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <select 
              value={pathFilter}
              onChange={(e) => setPathFilter(e.target.value)}
              className="bg-slate-950 border border-slate-900 text-xs text-slate-300 rounded-xl pl-9 pr-8 py-2.5 outline-none focus:border-orange-500 appearance-none cursor-pointer"
            >
              <option value="All">All Learning Paths</option>
              <option value="AI Engineer">AI Engineer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Backend Developer">Backend Developer</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <select 
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="bg-slate-950 border border-slate-900 text-xs text-slate-300 rounded-xl pl-9 pr-8 py-2.5 outline-none focus:border-orange-500 appearance-none cursor-pointer"
            >
              <option value="All">All Skill Levels</option>
              <option value="Beginner">Beginners</option>
              <option value="Intermediate">Intermediates</option>
              <option value="Advanced">Advanced Engineers</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <select 
              value={progressFilter}
              onChange={(e) => setProgressFilter(e.target.value)}
              className="bg-slate-950 border border-slate-900 text-xs text-slate-300 rounded-xl pl-9 pr-8 py-2.5 outline-none focus:border-orange-500 appearance-none cursor-pointer"
            >
              <option value="All">All Progress Percent</option>
              <option value="high">High (&ge;70%)</option>
              <option value="mid">Mid (40% - 70%)</option>
              <option value="low">Low (&lt;40%)</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Students List table */}
      <div className="glass-panel rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/40 border-b border-slate-900/60 text-slate-500 uppercase tracking-widest font-extrabold select-none">
                <th className="p-4">Student</th>
                <th className="p-4">Learning Path</th>
                <th className="p-4">Skill Level</th>
                <th className="p-4">Progress</th>
                <th className="p-4 text-center">Completed</th>
                <th className="p-4 text-center">Certificates</th>
                <th className="p-4 text-center">Engagement</th>
                <th className="p-4">Study Plan</th>
                <th className="p-4 text-center">Monitor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50">
              {filteredStudents.map(student => (
                <tr 
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="hover:bg-slate-900/15 transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500/10 to-orange-500/10 border border-white/5 flex items-center justify-center font-extrabold text-white text-xs shrink-0">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-white">{student.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 font-semibold">{student.path}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                      student.skillLevel === 'Beginner' ? 'bg-cyan-500/10 text-cyan-400' :
                      student.skillLevel === 'Intermediate' ? 'bg-orange-500/10 text-orange-400' : 'bg-purple-500/10 text-purple-400'
                    }`}>
                      {student.skillLevel}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold text-slate-300">{student.completedCourses.length} courses</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      student.certificates.length > 0 ? 'bg-purple-500/20 text-purple-400' : 'text-slate-600'
                    }`}>
                      {student.certificates.length} certs
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{student.engagementScore}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-400">{student.subscription}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); }}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg text-[10px] font-bold transition-all"
                    >
                      Configure &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED STUDENT DRAWER VIEW */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn bg-slate-950/40 backdrop-blur-sm">
          <div className="flex-1" onClick={() => setSelectedStudent(null)}></div>
          
          <div className="w-full max-w-md bg-slate-950 border-l border-slate-900 p-6 flex flex-col justify-between shadow-2xl relative animate-slideLeft h-full overflow-y-auto no-scrollbar">
            
            <div className="space-y-6 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-slate-900">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400">Student Progress Sheet</h3>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-500 hover:text-white rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Student basic profile card */}
              <div className="flex items-center gap-4 bg-slate-900/20 p-4 rounded-2xl border border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500 flex items-center justify-center font-extrabold text-white text-base">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedStudent.name}</h4>
                  <p className="text-[10px] text-slate-500 font-mono">{selectedStudent.email}</p>
                </div>
              </div>

              {/* Learning stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Engagement Score</span>
                  <p className="text-sm font-bold text-cyan-400 mt-1">{selectedStudent.engagementScore}%</p>
                </div>
                <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Learning Hours</span>
                  <p className="text-sm font-bold text-orange-400 mt-1">{selectedStudent.learningHours} hrs</p>
                </div>
              </div>

              {/* Assign Courses controls */}
              <div className="space-y-3 pt-4 border-t border-slate-900/60">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Assign Curriculum Course</h5>
                
                {assignSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold">
                    Course assigned successfully!
                  </div>
                )}

                <div className="flex gap-2">
                  <select 
                    value={selectedCourseToAssign}
                    onChange={(e) => setSelectedCourseToAssign(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-orange-500 appearance-none cursor-pointer"
                  >
                    <option>Docker Orchestration</option>
                    <option>Generative AI Mastery</option>
                    <option>Vector Databases Deep Dive</option>
                    <option>Mastering Kubernetes in Production</option>
                  </select>
                  
                  <button 
                    onClick={handleAssignCourse}
                    className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center gap-1 shrink-0"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> Assign
                  </button>
                </div>
              </div>

              {/* Enrolled & Completed Course progress list */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Academic Status</h5>
                
                <div className="space-y-3 bg-slate-900/10 p-4 rounded-2xl border border-slate-900 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-left">Enrolled Courses</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1 text-left">
                      {selectedStudent.enrolledCourses.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-slate-900/60">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-left">Completed Courses</span>
                    {selectedStudent.completedCourses.length === 0 ? (
                      <p className="text-slate-600 font-medium text-left">None completed yet.</p>
                    ) : (
                      <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1 text-left">
                        {selectedStudent.completedCourses.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Send Quick Notifications Form */}
              <form onSubmit={handleSendNotif} className="space-y-3 pt-4 border-t border-slate-900/60">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Send student Notification</h5>
                
                {notifSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold">
                    Notification broadcasted successfully!
                  </div>
                )}

                <div className="relative">
                  <input 
                    type="text" 
                    value={notifText}
                    onChange={(e) => setNotifText(e.target.value)}
                    placeholder="Message student e.g. Great progress on Docker sandbox!"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 outline-none transition-all"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

            </div>

            <div className="pt-6 border-t border-slate-900 flex gap-3 text-xs font-bold mt-8">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="w-full py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-all text-center"
              >
                Close Sheet
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
