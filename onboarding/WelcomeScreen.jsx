import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Terminal, Rocket, Cpu, Check } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('targeted'); // Default selection to match mockup

  const cards = [
    {
      id: 'targeted',
      title: 'Targeted Paths',
      desc: 'Custom curricula built specifically for high-demand developer and engineering roles.',
      icon: Rocket,
      colorClass: 'text-orange-400 bg-orange-500/10'
    },
    {
      id: 'advice',
      title: 'AI-Powered Advice',
      desc: 'An autonomous tutor available 24/7 to solve coding problems and suggest study materials.',
      icon: Cpu,
      colorClass: 'text-cyan-400 bg-cyan-500/10'
    },
    {
      id: 'sandbox',
      title: 'Practice Sandbox',
      desc: 'Integrated code playground challenges with instant compiler feedback loop.',
      icon: Terminal,
      colorClass: 'text-purple-400 bg-purple-500/10'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#060814] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

        <div className="w-full max-w-2xl relative z-10 text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/30 rounded-full py-1.5 px-4 self-center backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-orange-400 animate-spin-slow" />
              <span className="text-xs font-semibold tracking-wider uppercase text-orange-400">Step 1 of 6: Welcome</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Let's Personalize Your <br />
              <span className="text-gradient-orange">Learning Journey</span>
            </h1>
            <p className="text-base text-slate-400 max-w-lg mx-auto">
              Our AI engine generates custom learning paths based on your goals, experience level, and availability. It takes less than 60 seconds.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {cards.map((card) => {
              const Icon = card.icon;
              const isSelected = selectedCard === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-[250ms] ease-out space-y-3 select-none ${
                    isSelected
                      ? 'border border-vibrant-orange ring-1 ring-vibrant-orange/50 shadow-[0_0_20px_rgba(255,107,0,0.25)] bg-slate-900/60 scale-[1.02]'
                      : 'border border-white/5 bg-slate-900/30 hover:border-white/10 hover:bg-slate-900/40 backdrop-blur-md hover:scale-[1.01]'
                  }`}
                >
                  {/* Circular checkmark in top-right */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-gradient-to-tr from-vibrant-orange to-amber-500 flex items-center justify-center shadow-md animate-scaleUp">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                    </div>
                  )}

                  <div className={`p-2.5 rounded-xl w-fit ${card.colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white pr-6">{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Action button */}
          <div className="pt-4">
            <button
              onClick={() => navigate('/onboarding/career-goal')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/10 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
