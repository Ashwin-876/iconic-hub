import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Rocket, Cpu, Check } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('targeted');

  const cards = [
    {
      id: 'targeted',
      title: 'Targeted Paths',
      desc: 'Custom curricula built specifically for high-demand developer and engineering roles.',
      icon: Rocket,
      colorClass: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'advice',
      title: 'AI-Powered Advice',
      desc: 'An autonomous tutor available 24/7 to solve coding problems and suggest study materials.',
      icon: Cpu,
      colorClass: 'text-cyan-600 bg-cyan-50'
    },
    {
      id: 'sandbox',
      title: 'Practice Sandbox',
      desc: 'Integrated code playground challenges with instant compiler feedback loop.',
      icon: Terminal,
      colorClass: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle decorative glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-2xl relative z-10 text-center space-y-10">
          {/* Header */}
          <div className="space-y-5">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full py-1.5 px-4 self-center">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-600">Step 1 of 6: Welcome</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Let's Personalize Your <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Learning Journey</span>
            </h1>
            <p className="text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
              Our AI engine generates custom learning paths based on your goals, experience level, and availability. It takes less than 60 seconds.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {cards.map((card) => {
              const Icon = card.icon;
              const isSelected = selectedCard === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-200 ease-out space-y-3 select-none border ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-[0_0_0_3px_rgba(37,99,235,0.12)] scale-[1.02]'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm hover:scale-[1.01]'
                  }`}
                >
                  {/* Circular checkmark in top-right */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow animate-scaleUp">
                      <Check className="w-3 h-3 text-white stroke-[3px]" />
                    </div>
                  )}

                  <div className={`p-2.5 rounded-xl w-fit ${card.colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 pr-6">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={() => navigate('/onboarding/career-goal')}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:scale-105 active:scale-95 transition-all duration-300 text-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
