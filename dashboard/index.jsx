import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Compass, Award, Flame, BookOpen } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

// Subcomponents
import WelcomeBanner from './WelcomeBanner';
import LearningProgress from './LearningProgress';
import RecommendedCourses from './RecommendedCourses';
import ContinueLearning from './ContinueLearning';
import UpcomingEvents from './UpcomingEvents';
import DeveloperChallenges from './DeveloperChallenges';
import AITutorSuggestions from './AITutorSuggestions';

export default function Dashboard() {
  const [userName, setUserName] = useState('Ashwin');
  const [careerGoal, setCareerGoal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'Ashwin');
    setCareerGoal(localStorage.getItem('onboarding_career_goal') || 'Full-Stack Developer');
  }, []);

  const isDemoUser = userName.toLowerCase() === 'ashwin';
  const streak = isDemoUser ? 5 : 0;
  const completedHours = isDemoUser ? 3.5 : 0;
  const completedPaths = isDemoUser ? 2 : 0;
  const learningHours = isDemoUser ? 24.5 : 0;
  const certificatesEarned = isDemoUser ? 3 : 0;
  const skillGrowth = isDemoUser ? 15 : 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f5f7fa] text-[#1a1f2e] font-sans pb-20 selection:bg-blue-600 selection:text-white">

        {/* Top Navigation */}
        <Header />

        {/* Dashboard Body */}
        <main className="max-w-7xl mx-auto px-6 mt-8 space-y-7 text-left">

          {/* Welcome Banner */}
          <WelcomeBanner name={userName} streak={streak} goalHours={5} completedHours={completedHours} />

          {/* Stat Cards Row */}
          <LearningProgress completedPaths={completedPaths} learningHours={learningHours} certificatesEarned={certificatesEarned} skillGrowth={skillGrowth} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

            {/* Left column — 8/12 */}
            <div className="lg:col-span-8 space-y-7">
              <ContinueLearning />
              <RecommendedCourses />
              <DeveloperChallenges />
            </div>

            {/* Right column — 4/12 */}
            <div className="lg:col-span-4 space-y-7">
              <AITutorSuggestions />
              <UpcomingEvents />
            </div>
          </div>

          {/* Achievements Section */}
          <section className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-bold text-[#1a1f2e] flex items-center gap-2">
                  <span>Your Badges &amp; Achievements</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">Milestones earned on your path to engineering mastery.</p>
              </div>
              <span className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1 group transition-all">
                <span>View all</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
              {[
                { 
                  icon: <Flame className="w-5 h-5 fill-current" />, 
                  color: isDemoUser ? 'border-blue-500/10 hover:border-blue-500/30 hover:shadow-blue-500/5 text-blue-600' : 'border-slate-200 text-slate-400', 
                  iconBg: isDemoUser ? 'bg-blue-600/10 border-blue-600/20' : 'bg-slate-100 border-slate-200',
                  label: '5 Day Streak', 
                  sub: 'Consistent study habit',
                  xp: '+250 XP',
                  unlocked: isDemoUser
                },
                { 
                  icon: <Terminal className="w-5 h-5" />, 
                  color: isDemoUser ? 'border-violet-500/10 hover:border-violet-500/30 hover:shadow-violet-500/5 text-violet-600' : 'border-slate-200 text-slate-400', 
                  iconBg: isDemoUser ? 'bg-violet-600/10 border-violet-600/20' : 'bg-slate-100 border-slate-200',
                  label: 'First Lab Done', 
                  sub: 'Sandbox success',
                  xp: '+500 XP',
                  unlocked: false
                },
                { 
                  icon: <Compass className="w-5 h-5" />, 
                  color: isDemoUser ? 'border-cyan-500/10 hover:border-cyan-500/30 hover:shadow-cyan-500/5 text-cyan-600' : 'border-slate-200 text-slate-400', 
                  iconBg: isDemoUser ? 'bg-cyan-600/10 border-cyan-600/20' : 'bg-slate-100 border-slate-200',
                  label: 'Path Finder', 
                  sub: 'Custom roadmap set',
                  xp: '+150 XP',
                  unlocked: isDemoUser
                },
                { 
                  icon: <Award className="w-5 h-5" />, 
                  color: isDemoUser ? 'border-emerald-500/10 hover:border-emerald-500/30 hover:shadow-emerald-500/5 text-emerald-600' : 'border-slate-200 text-slate-400', 
                  iconBg: isDemoUser ? 'bg-emerald-600/10 border-emerald-600/20' : 'bg-slate-100 border-slate-200',
                  label: 'Verified Graduate', 
                  sub: 'Official certs earned',
                  xp: '+1000 XP',
                  unlocked: false
                },
              ].map((badge, i) => (
                <div 
                  key={i} 
                  className={`relative flex flex-col items-center text-center p-6 bg-slate-50/50 border rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer ${badge.color}`}
                >
                  {/* Top-right XP floating badge */}
                  <div className={`absolute top-3 right-3 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border transition-colors ${
                    badge.unlocked 
                      ? 'bg-slate-100 border-slate-200 text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600' 
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}>
                    {badge.xp}
                  </div>
                  
                  {/* Icon Container */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 border transition-all duration-300 group-hover:scale-110 ${badge.iconBg}`}>
                    {badge.icon}
                  </div>
                  
                  {/* Label & Details */}
                  <h4 className={`text-xs font-bold transition-colors ${badge.unlocked ? 'text-[#1a1f2e] group-hover:text-blue-600' : 'text-slate-400'}`}>{badge.label}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">{badge.sub}</p>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </PageTransition>
  );
}
