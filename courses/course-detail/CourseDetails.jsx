import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Terminal, Award, BookOpen, Clock, User, ChevronDown, ChevronUp, Bell, ArrowLeft, CheckCircle } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import Header from '../../components/Header';

// Subcomponents
import VideoLessons from './VideoLessons';
import Quizzes from './Quizzes';
import Assignments from './Assignments';
import Certificates from './Certificates';

const COURSE_DATA = {
  'react-arch': {
    title: 'Advanced React Architecture: State & Performance',
    instructor: 'Marcus Holloway',
    rating: 4.9,
    duration: '8 Hours',
    level: 'Advanced',
    students: '12,410',
    description: 'Elevate your production engineering skillset. Master React 19 fiber trees, render engines, layout reconcilers, custom hooks compilation, and advanced hooks optimization.',
    modules: [
      {
        title: 'Module 1: The React Reconciliation Algorithm',
        lessons: ['Understanding React Fiber Trees', 'WorkInProgress vs Current Trees', 'Scheduling and priority levels']
      },
      {
        title: 'Module 2: Advanced Hook State Architectures',
        lessons: ['Deep dive into closures and custom hook closures', 'Managing state memory leak safety', 'Writing bulletproof hook logic']
      },
      {
        title: 'Module 3: Performance Profiling & Auditing',
        lessons: ['Tracking redundant rerenders with React Profiler', 'useMemo and useCallback edge cases', 'Handling large scale lists virtualization']
      }
    ]
  }
};

export default function CourseDetails() {
  const { id } = useParams();
  const course = COURSE_DATA[id] || COURSE_DATA['react-arch']; // Fallback
  
  const [activeTab, setActiveTab] = useState('overview'); // overview, videos, quizzes, assignments, certificate
  const [expandedModule, setExpandedModule] = useState(0);

  const toggleModule = (idx) => {
    setExpandedModule(expandedModule === idx ? null : idx);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#fff8f6] text-on-background font-sans pb-16 selection:bg-vibrant-orange selection:text-white">
        
        {/* Navigation header */}
        <Header />

        <main className="max-w-7xl mx-auto px-6 mt-8 space-y-6 text-left">
          {/* Back button */}
          <Link to="/courses" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-vibrant-orange transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to directory</span>
          </Link>

          {/* Course Banner */}
          <div className="bg-white border border-surface-stroke rounded-[24px] p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-orange-50 text-[10px] font-bold text-vibrant-orange rounded border border-orange-100 uppercase">
                  {course.level}
                </span>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {course.duration}
                  </span>
                  <span>{course.students} enrolled students</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-on-background">{course.title}</h1>
              <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">{course.description}</p>
            </div>

            {/* Subpages Tabs Nav */}
            <div className="flex flex-wrap gap-2 border-b border-surface-stroke pb-1">
              {['overview', 'videos', 'quizzes', 'assignments', 'certificate'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-xs font-bold transition-all border-b-2 capitalize ${
                    activeTab === tab
                      ? 'border-vibrant-orange text-vibrant-orange'
                      : 'border-transparent text-slate-500 hover:text-on-background'
                  }`}
                >
                  {tab === 'videos' ? 'Video Classroom' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Sub-Views Rendering */}
          <div className="w-full">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 8 cols: Syllabus Modules */}
                <div className="lg:col-span-8 bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6">
                  <h2 className="text-lg font-bold text-on-background">Curriculum Syllabus</h2>
                  <div className="space-y-3">
                    {course.modules.map((mod, idx) => {
                      const isExpanded = expandedModule === idx;
                      return (
                        <div key={idx} className="border border-surface-stroke rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleModule(idx)}
                            className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-sm text-on-background"
                          >
                            <span>{mod.title}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                          </button>
                          {isExpanded && (
                            <div className="p-4 bg-white border-t border-surface-stroke space-y-2.5">
                              {mod.lessons.map((lesson, lIdx) => (
                                <div key={lIdx} className="flex items-center gap-3 text-xs text-on-surface-variant">
                                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                  <span>{lesson}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right 4 cols: Author Profile & Prerequisites */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-on-background uppercase tracking-wider">Instructor Profile</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-vibrant-orange font-bold text-lg">
                        M
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-on-background">{course.instructor}</h4>
                        <p className="text-[10px] text-slate-500">Lead React Dev Architect</p>
                      </div>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Marcus Holloway has built UI libraries and frontend pipelines for top SaaS startups for over 12 years.
                    </p>
                  </div>

                  <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-3">
                    <h3 className="text-sm font-bold text-on-background uppercase tracking-wider">Prerequisites</h3>
                    <div className="text-xs text-on-surface-variant space-y-2">
                      <p>• Advanced understanding of JavaScript (ES6+ closures, promises, async/await).</p>
                      <p>• Basic familiarity with React rendering hooks (useState, useEffect).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'videos' && <VideoLessons />}
            {activeTab === 'quizzes' && <Quizzes />}
            {activeTab === 'assignments' && <Assignments />}
            {activeTab === 'certificate' && <Certificates />}
          </div>

        </main>
      </div>
    </PageTransition>
  );
}
