import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function LoginCTA() {
  return (
    <section className="py-24 px-4 md:px-8 relative bg-slate-50">
      <div className="max-w-5xl mx-auto w-full">
        {/* Glow Panel container */}
        <div className="relative bg-gradient-to-tr from-[#6E2ED8] to-[#4F46E5] rounded-[32px] p-12 md:p-16 overflow-hidden shadow-2xl text-center flex flex-col items-center text-white">
          {/* Decorative backdrop shapes */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-[80px]"></div>

          <div className="relative space-y-6 max-w-2xl">


            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Ready to Upgrade <br />
              Your Skill Set?
            </h3>

            <p className="text-base text-slate-100/80 leading-relaxed">
              Create your account in seconds to receive personalized AI recommendations, write code in the cloud sandbox, and share your development accomplishments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                to="/create-account"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#6E2ED8] font-bold rounded-xl shadow-lg hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-all"
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
