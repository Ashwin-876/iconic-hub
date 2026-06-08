import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, BrainCircuit, Users, Compass, Github } from 'lucide-react';

// Subcomponents
import HeroSection from './HeroSection';
import LMSScrollAnimation from './LMSScrollAnimation';
import Features from './Features';
import CoursesShowcase from './CoursesShowcase';
import DeveloperHubPreview from './DeveloperHubPreview';
import AITutorPreview from './AITutorPreview';
import CommunityHighlights from './CommunityHighlights';
import Testimonials from './Testimonials';
import LoginCTA from './LoginCTA';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] flex flex-col justify-between overflow-x-hidden selection:bg-[#6E2ED8] selection:text-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/iconic_logo.png" alt="Iconic Hub" className="h-10 w-auto object-contain" />
          </Link>

          {/* Nav links Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#" className="text-[#6E2ED8] font-bold">Home</a>
            <Link to="/dashboard" className="text-[#64748B] hover:text-[#6E2ED8] font-semibold transition-colors">Course</Link>
            <a href="#monitors" className="text-[#64748B] hover:text-[#6E2ED8] font-semibold transition-colors">Monitors</a>
            <a href="#testimonials" className="text-[#64748B] hover:text-[#6E2ED8] font-semibold transition-colors">Testimonials</a>
            <a href="#blog" className="text-[#64748B] hover:text-[#6E2ED8] font-semibold transition-colors">Blog</a>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-sm font-bold text-[#64748B] hover:text-[#6E2ED8] transition-colors px-3 py-2"
            >
              Log In
            </Link>
            <Link 
              to="/create-account"
              className="px-6 py-2.5 bg-[#6E2ED8] text-white text-sm font-bold rounded-full hover:bg-[#5921B6] active:scale-95 transition-all shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection />
        <LMSScrollAnimation />
        <Features />
        <CoursesShowcase />
        <DeveloperHubPreview />
        <AITutorPreview />
        <CommunityHighlights />
        <Testimonials />
        <LoginCTA />
      </main>


      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
          {/* Logo & description column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/iconic_logo.png" alt="Iconic Hub" className="h-9 w-auto object-contain" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Accelerate your engineering journey. Write, learn, and build with cutting-edge tools and a 24/7 AI tutor co-pilot.
            </p>
          </div>

          {/* Links cols */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Platform</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><Link to="/dashboard" className="hover:text-slate-300">Courses & Paths</Link></li>
              <li><Link to="/dashboard" className="hover:text-slate-300">Code Sandbox</Link></li>
              <li><Link to="/ai-tutor" className="hover:text-slate-300">Ask AI Tutor</Link></li>
              <li><Link to="/community" className="hover:text-slate-300">Discussion Boards</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Community</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-300">Developer Labs</a></li>
              <li><a href="#" className="hover:text-slate-300">Peer Networking</a></li>
              <li><a href="#" className="hover:text-slate-300">Hackathons</a></li>
              <li><a href="#" className="hover:text-slate-300">Leaderboards</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Resources</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-300">API Documentation</a></li>
              <li><a href="#" className="hover:text-slate-300">System Status</a></li>
              <li><a href="#" className="hover:text-slate-300">Help Desk</a></li>
              <li><a href="#" className="hover:text-slate-300">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row copyrights */}
        <div className="max-w-7xl mx-auto w-full pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Iconic Hub. All rights reserved.
            </span>
            <Link to="/admin" className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-bold text-slate-500 hover:text-white border border-slate-800 transition-all">
              Admin Portal
            </Link>
          </div>
          <div className="flex space-x-4 text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
