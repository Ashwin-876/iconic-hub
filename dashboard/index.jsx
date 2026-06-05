import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Search, Bell, User, BookOpen, Compass, Award, Flame, RefreshCw, LogOut, MessageSquare, Shield } from 'lucide-react';
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
  const [careerGoal, setCareerGoal] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [interests, setInterests] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [timeTarget, setTimeTarget] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Read selections
    setCareerGoal(localStorage.getItem('onboarding_career_goal') || 'Full-Stack Developer');
    setSkillLevel(localStorage.getItem('onboarding_skill_level') || 'Beginner');
    setTimeTarget(localStorage.getItem('onboarding_study_time') || '30 Mins / day');
    
    try {
      setInterests(JSON.parse(localStorage.getItem('onboarding_interests')) || ['Web Development', 'System Design']);
      setTechStack(JSON.parse(localStorage.getItem('onboarding_technologies')) || ['React', 'TypeScript', 'Node.js']);
    } catch (e) {
      setInterests(['Web Development', 'System Design']);
      setTechStack(['React', 'TypeScript', 'Node.js']);
    }
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#fff8f6] text-on-background font-sans pb-16 selection:bg-vibrant-orange selection:text-white">
        
        {/* Modern Top Navigation Bar */}
        <Header />

        {/* Dashboard Content Container */}
        <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8 text-left">
          
          {/* Welcome Banner */}
          <WelcomeBanner name="Ashwin" streak={5} goalHours={5} completedHours={3.5} />

          {/* Learning Progress Metric Cards */}
          <LearningProgress completedPaths={2} learningHours={24.5} certificatesEarned={3} skillGrowth={15} />

          {/* Layout Grid: Left Major, Right Minor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 columns: Learning and Courses */}
            <div className="lg:col-span-8 space-y-8">
              {/* Continue Learning */}
              <ContinueLearning />

              {/* Recommended Courses Grid */}
              <RecommendedCourses />

              {/* Developer Challenges */}
              <DeveloperChallenges />
            </div>

            {/* Right 4 columns: Events, Community, AI Tutor */}
            <div className="lg:col-span-4 space-y-8">
              {/* AI Tutor suggestion Chat mockup */}
              <AITutorSuggestions />

              {/* Upcoming Events */}
              <UpcomingEvents />
            </div>

          </div>

          {/* Achievements badge showcase */}
          <section className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-on-background">Your Badges & Achievements</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-2xl border border-surface-stroke space-y-2">
                <div className="w-12 h-12 bg-vibrant-orange/10 rounded-full flex items-center justify-center text-vibrant-orange mx-auto">
                  <Flame className="w-6 h-6 fill-current" />
                </div>
                <div className="text-xs font-bold text-on-background">5 Day Streak</div>
                <div className="text-[9px] text-slate-500">Consistent study habit</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-surface-stroke space-y-2">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500 mx-auto">
                  <Terminal className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-on-background">First Lab Completed</div>
                <div className="text-[9px] text-slate-500">Sandbox coding success</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-surface-stroke space-y-2">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-500 mx-auto">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-on-background">Path Finder</div>
                <div className="text-[9px] text-slate-500">Customized roadmap set</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-surface-stroke space-y-2">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-on-background">Verified Graduate</div>
                <div className="text-[9px] text-slate-500">Earned official certs</div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </PageTransition>
  );
}
