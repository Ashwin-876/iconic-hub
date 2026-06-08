import React, { useState } from 'react';
import { Home, MessageSquare, Code2, Mic, Briefcase, BarChart2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

// Subcomponents
import AITutorHome from './AITutorHome';
import AITutorChat from './AITutorChat';
import AICodingAssistant from './AICodingAssistant';
import AIMockInterview from './AIMockInterview';
import CareerAndResume from './CareerAndResume';
import AnalyticsAndTools from './AnalyticsAndTools';

const TABS = [
  { id: 'home',      label: 'Tutor Home',        icon: Home },
  { id: 'chat',      label: 'Ask AI Tutor',       icon: MessageSquare },
  { id: 'code',      label: 'Coding Assistant',   icon: Code2 },
  { id: 'interview', label: 'Mock Interview',     icon: Mic },
  { id: 'career',    label: 'Career & Resume',    icon: Briefcase },
  { id: 'tools',     label: 'Tools & Metrics',    icon: BarChart2 },
];

export default function AskAI() {
  const [activeTab, setActiveTab] = useState('code');

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f5f7fa] text-[#1a1f2e] font-sans pb-16 selection:bg-[#2563EB] selection:text-white">
        <Header />

        <main className="max-w-7xl mx-auto px-6 mt-6 space-y-5 text-left">

          {/* ── Tab Navigation Bar ── */}
          <nav className="bg-white border border-slate-200 rounded-2xl px-3 py-2.5 shadow-sm flex flex-wrap gap-1">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/15'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* ── Tab Content ── */}
          <div>
            {activeTab === 'home'      && <AITutorHome setActiveTab={setActiveTab} />}
            {activeTab === 'chat'      && <AITutorChat />}
            {activeTab === 'code'      && <AICodingAssistant />}
            {activeTab === 'interview' && <AIMockInterview />}
            {activeTab === 'career'    && <CareerAndResume />}
            {activeTab === 'tools'     && <AnalyticsAndTools />}
          </div>

        </main>
      </div>
    </PageTransition>
  );
}
