import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, BrainCircuit, Users, Compass, Github } from 'lucide-react';

// Subcomponents
import HeroSection from './HeroSection';
import Features from './Features';
import CoursesShowcase from './CoursesShowcase';
import DeveloperHubPreview from './DeveloperHubPreview';
import AITutorPreview from './AITutorPreview';
import CommunityHighlights from './CommunityHighlights';
import Testimonials from './Testimonials';
import LoginCTA from './LoginCTA';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-orange-500 selection:text-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#060814]/75 backdrop-blur-md border-b border-slate-900 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
              <Terminal className="w-4 h-4 font-bold" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white font-sans">
              Iconic<span className="text-orange-500">Hub</span>
            </span>
          </Link>

          {/* Nav links Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <Link to="/courses" className="hover:text-slate-200 transition-colors">Courses</Link>
            <Link to="/dashboard" className="hover:text-slate-200 transition-colors">Dev Hub</Link>
            <Link to="/community" className="hover:text-slate-200 transition-colors">Community</Link>
            <Link to="/ai-tutor" className="hover:text-slate-200 transition-colors">AI Tutor</Link>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/create-account"
              className="px-4 py-2 bg-slate-800 border border-slate-700/60 text-white hover:bg-slate-700 text-sm font-semibold rounded-lg transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection />
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">Iconic Hub</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Accelerate your engineering journey. Write, learn, and build with cutting-edge tools and a 24/7 AI tutor co-pilot.
            </p>
          </div>

          {/* Links cols */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Platform</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><Link to="/courses" className="hover:text-slate-300">Courses & Paths</Link></li>
              <li><Link to="/dashboard" className="hover:text-slate-300">Code Sandbox</Link></li>
              <li><Link to="/ai-tutor" className="hover:text-slate-300">Ask AI Tutor</Link></li>
              <li><Link to="/community" className="hover:text-slate-300">Discussion Boards</Link></li>
              <li><Link to="/admin" className="hover:text-slate-300">Admin Option</Link></li>
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
          <span className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Iconic Hub. All rights reserved.
          </span>
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
