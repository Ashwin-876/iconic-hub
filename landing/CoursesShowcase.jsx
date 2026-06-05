import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, BookOpen, Clock } from 'lucide-react';

const CATEGORIES = ["All", "Web Dev", "AI & ML", "Cloud & DevOps"];

const MOCK_COURSES = [
  {
    id: "nextjs-mastery",
    title: "Next.js 14 Production Masterclass",
    category: "Web Dev",
    instructor: "Sarah Jenkins",
    duration: "18h 45m",
    lessons: 48,
    rating: 4.9,
    enrollments: 4120,
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=400&q=80", // standard programming vector style image
    color: "cyan"
  },
  {
    id: "ai-engineer-python",
    title: "LLM Orchestration & Agentic Systems",
    category: "AI & ML",
    instructor: "Dr. Kian Sterling",
    duration: "24h 15m",
    lessons: 64,
    rating: 5.0,
    enrollments: 3490,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=400&q=80",
    color: "purple"
  },
  {
    id: "kubernetes-production",
    title: "Kubernetes & Docker in Enterprise",
    category: "Cloud & DevOps",
    instructor: "Markus Vance",
    duration: "15h 30m",
    lessons: 32,
    rating: 4.8,
    enrollments: 1980,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=400&q=80",
    color: "orange"
  },
  {
    id: "typescript-advanced",
    title: "TypeScript Deep Dive & Design Patterns",
    category: "Web Dev",
    instructor: "Elena Rostova",
    duration: "12h 10m",
    lessons: 28,
    rating: 4.9,
    enrollments: 2850,
    image: "https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=400&q=80",
    color: "cyan"
  }
];

export default function CoursesShowcase() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCourses = activeTab === "All" 
    ? MOCK_COURSES 
    : MOCK_COURSES.filter(c => c.category === activeTab);

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-900/10 relative">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-xl text-left">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">Curated Learning</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Explore Premium Courses</h3>
            <p className="text-slate-400">
              Master the exact technologies companies are hiring for today. Fully interactive lessons built for builders.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-300 ${
                  activeTab === cat 
                    ? "bg-slate-800 text-white border-orange-500 shadow-glow-orange" 
                    : "bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="group glass-panel rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                {/* Category Pill */}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/95 backdrop-blur text-[10px] font-bold text-white border border-slate-700/50 rounded-md">
                  {course.category}
                </span>

                {/* Micro Play icon hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-4 bg-orange-500 text-white rounded-full shadow-lg shadow-orange-500/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Course Detail text */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 mb-2">
                    <span>By {course.instructor}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100 mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {course.title}
                  </h4>
                </div>

                <div className="space-y-4">
                  {/* Course stats icons */}
                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  {/* Enroll row */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-xs font-bold text-slate-200">{course.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-500">({course.enrollments})</span>
                    </div>

                    <Link 
                      to={`/courses/${course.id}`}
                      className="text-xs font-semibold text-orange-400 group-hover:text-orange-300 flex items-center space-x-1"
                    >
                      <span>Explore</span>
                      <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link 
            to="/courses"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold rounded-xl transition-all"
          >
            <span>Browse All Courses</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
