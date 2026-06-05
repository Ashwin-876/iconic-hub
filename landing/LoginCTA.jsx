import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function LoginCTA() {
  return (
    <section className="py-24 px-4 md:px-8 relative bg-slate-950/40">
      <div className="max-w-5xl mx-auto w-full">
        {/* Glow Panel container */}
        <div className="relative glass-panel rounded-3xl p-12 md:p-16 border border-white/10 overflow-hidden shadow-2xl text-center flex flex-col items-center">
          {/* Neon gradient background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-orange-600/5 to-cyan-600/10 opacity-60"></div>
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-600/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-[80px]"></div>

          <div className="relative space-y-6 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 rounded-full py-1 px-3">
              <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="text-xs font-bold text-orange-400">Join the Future of Learning</span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Ready to Upgrade <br />
              Your Skill Set?
            </h3>

            <p className="text-base text-slate-400 leading-relaxed">
              Create your account in seconds to receive personalized AI recommendations, write code in the cloud sandbox, and share your development accomplishments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                to="/create-account"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-xl shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-white font-semibold rounded-xl transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
