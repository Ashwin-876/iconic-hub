import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, MessageSquare, Code, Volume2, Briefcase, BarChart2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

// Subcomponents
import AITutorHome from './AITutorHome';
import AITutorChat from './AITutorChat';
import AICodingAssistant from './AICodingAssistant';
import AIMockInterview from './AIMockInterview';
import CareerAndResume from './CareerAndResume';
import AnalyticsAndTools from './AnalyticsAndTools';

export default function AskAI() {
  const [activeTab, setActiveTab] = useState('home'); // home, chat, code, interview, career, tools

  const tabs = [
    { id: 'home', label: 'Tutor Home', icon: Home },
    { id: 'chat', label: 'Ask AI Tutor', icon: MessageSquare },
    { id: 'code', label: 'Coding Assistant', icon: Code },
    { id: 'interview', label: 'Mock Interview', icon: Volume2 },
    { id: 'career', label: 'Career & Resume', icon: Briefcase },
    { id: 'tools', label: 'Tools & Metrics', icon: BarChart2 }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#fff8f6] text-on-background font-sans pb-16 selection:bg-vibrant-orange selection:text-white">
        <Header />
        
        <main className="max-w-7xl mx-auto px-6 mt-8 space-y-6 text-left">
          
          {/* Back to dashboard */}
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-vibrant-orange transition-colors">
            <span>&larr; Back to Dashboard</span>
          </Link>

          {/* Title Banner */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-on-background tracking-tight">AI Tutor Console</h1>
              <p className="text-sm text-on-surface-variant">Your automated career coach, mock interviewer, and coding helper.</p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="bg-white border border-surface-stroke rounded-[24px] p-2 shadow-sm flex flex-wrap gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    isActive
                      ? 'bg-vibrant-orange text-white shadow-md shadow-vibrant-orange/10'
                      : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-on-background'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Render Tab Contents */}
          <div className="mt-8">
            {activeTab === 'home' && <AITutorHome setActiveTab={setActiveTab} />}
            {activeTab === 'chat' && <AITutorChat />}
            {activeTab === 'code' && <AICodingAssistant />}
            {activeTab === 'interview' && <AIMockInterview />}
            {activeTab === 'career' && <CareerAndResume />}
            {activeTab === 'tools' && <AnalyticsAndTools />}
          </div>

        </main>
      </div>
    </PageTransition>
  );
}
