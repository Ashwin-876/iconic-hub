import React from 'react';
import { 
  Terminal, 
  Cpu, 
  GitBranch, 
  Bot, 
  Users, 
  TrendingUp 
} from 'lucide-react';

const FEATURES_DATA = [
  {
    icon: Bot,
    title: "AI Co-pilot Tutor",
    description: "Get context-aware help, automatic code analysis, and interactive mock interviews on-demand.",
    color: "from-cyan-500 to-blue-500",
    shadow: "shadow-glow-cyan"
  },
  {
    icon: Terminal,
    title: "Interactive Playgrounds",
    description: "Write, compile, and execute code in modern sandboxes supporting dozens of libraries and frameworks.",
    color: "from-orange-500 to-amber-500",
    shadow: "shadow-glow-orange"
  },
  {
    icon: TrendingUp,
    title: "Structured Paths",
    description: "Navigate curated tracks for Frontend, Backend, AI Engineering, DevOps, and Data Science.",
    color: "from-purple-500 to-indigo-500",
    shadow: "shadow-glow-purple"
  },
  {
    icon: GitBranch,
    title: "GitHub Portfolio Sync",
    description: "Instantly deploy your sandbox projects to GitHub and generate a public developer portfolio.",
    color: "from-emerald-500 to-teal-500",
    shadow: ""
  },
  {
    icon: Users,
    title: "Collaborative Labs",
    description: "Join study groups, tackle programming hackathons, and challenge peers on public leaderboards.",
    color: "from-rose-500 to-pink-500",
    shadow: ""
  },
  {
    icon: Cpu,
    title: "Real-world API Library",
    description: "Integrate pre-built API packages, weather feeds, database gateways, and auth modules in seconds.",
    color: "from-blue-500 to-indigo-500",
    shadow: ""
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 md:px-8 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-orange-500">Supercharged Ecosystem</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Everything You Need to Scale</h3>
          <p className="text-slate-400">
            A unified suite designed to take developers from code concepts to full-scale enterprise software applications.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className="group relative rounded-2xl glass-panel p-8 glass-panel-hover flex flex-col items-start text-left cursor-default overflow-hidden"
              >
                {/* Accent line top */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feat.color} opacity-20 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Glowing backdrop dot */}
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-tr ${feat.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-2xl transition-all duration-300`}></div>

                <div className={`p-3 bg-gradient-to-br ${feat.color} rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                  {feat.title}
                </h4>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
