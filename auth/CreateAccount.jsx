import React, { useState, useEffect, useRef } from 'react';
import { initNewUser } from '../utils/initNewUser';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Lock, Eye, EyeOff, CheckCircle, Brain, 
  TrendingUp, Award, BookOpen, Star, Sparkles, ArrowRight, Check 
} from 'lucide-react';
import gsap from 'gsap';
import PageTransition from '../components/PageTransition';
import { realtimeDb } from '../utils/store';

export default function CreateAccount() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const containerRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const navigate = useNavigate();

  // Focus states for floating labels
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const [focusConfirmPass, setFocusConfirmPass] = useState(false);

  // Validation checking on keyup
  useEffect(() => {
    const newErrors = {};
    if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
  }, [password, confirmPassword]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up form elements on right column
      gsap.fromTo(".anim-form-item",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );

      // Removed floating cards animation as elements were removed.
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    initNewUser();
    localStorage.setItem('userName', fullName);

    realtimeDb.registerUser({
      name: fullName,
      email: email,
      role: 'Student'
    });

    setTimeout(() => {
      setLoading(false);
      navigate('/onboarding/welcome');
    }, 1200);
  };

  // Mouse Parallax movement on left column illustration
  const handleMouseMove = (e) => {
    const bounds = leftSideRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    gsap.to(".parallax-bg", { x: x * 0.04, y: y * 0.04, duration: 0.5, ease: "power2.out" });
    gsap.to(".parallax-student", { x: x * 0.02, y: y * 0.02, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to([".parallax-bg", ".parallax-student"], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  return (
    <PageTransition>
      <div ref={containerRef} className="h-screen bg-[#0b0f1e] text-white flex items-center justify-center p-4 font-sans overflow-hidden relative">
        
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
        </div>

        {/* Center Card Panel */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-[24px] space-y-3.5 shadow-2xl relative z-10 text-left">
          
          {/* Onboarding Steps Progress Header */}
          <div className="anim-form-item flex items-center justify-between text-[9px] font-bold text-white/25 select-none pb-2.5 border-b border-white/10">
            <div className="flex items-center space-x-1 text-purple-400">
              <span className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-[8px]">1</span>
              <span>Account</span>
            </div>
            <ChevronDivider />
            <div className="flex items-center space-x-1">
              <span className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[8px]">2</span>
              <span>Personalize</span>
            </div>
            <ChevronDivider />
            <div className="flex items-center space-x-1">
              <span className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[8px]">3</span>
              <span>Paths</span>
            </div>
          </div>

          {/* Welcoming Headline */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-purple-400 block">Join ICONIC HUB LMS</span>
            <h2 className="anim-form-item text-xl font-black text-white tracking-tight">
              Start Your Learning Journey
            </h2>
          </div>

          {/* Social login integration buttons */}
          <div className="space-y-2">
            <div className="anim-form-item grid grid-cols-3 gap-2">
              <SocialButton 
                label="Google" 
                icon={<GoogleIcon />} 
                onClick={() => {
                  setLoading(true);
                  initNewUser();
                  localStorage.setItem('userName', 'Google Scholar');
                  realtimeDb.registerUser({
                    name: 'Google Scholar',
                    email: 'google.student@gmail.com',
                    role: 'Student'
                  });
                  setTimeout(() => {
                    setLoading(false);
                    navigate('/onboarding/welcome');
                  }, 1000);
                }} 
              />
              <SocialButton 
                label="GitHub" 
                icon={<GithubIcon />} 
                onClick={() => {
                  setLoading(true);
                  initNewUser();
                  localStorage.setItem('userName', 'GitHub Octocat');
                  realtimeDb.registerUser({
                    name: 'GitHub Octocat',
                    email: 'octocat@github.com',
                    role: 'Student'
                  });
                  setTimeout(() => {
                    setLoading(false);
                    navigate('/onboarding/welcome');
                  }, 1000);
                }} 
              />
              <SocialButton 
                label="LinkedIn" 
                icon={<LinkedinIcon />} 
                onClick={() => {
                  setLoading(true);
                  initNewUser();
                  localStorage.setItem('userName', 'LinkedIn Professional');
                  realtimeDb.registerUser({
                    name: 'LinkedIn Professional',
                    email: 'professional@linkedin.com',
                    role: 'Student'
                  });
                  setTimeout(() => {
                    setLoading(false);
                    navigate('/onboarding/welcome');
                  }, 1000);
                }} 
              />
            </div>
          </div>

          {/* Separator row */}
          <div className="anim-form-item flex items-center space-x-3 select-none py-0.5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[9px] text-white/30 font-extrabold uppercase tracking-wider">or sign up with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form input elements */}
          <form onSubmit={handleRegister} className="space-y-2.5">
            
            {/* Full Name */}
            <div className="anim-form-item relative">
              <label 
                className={`absolute left-3 transition-all duration-300 pointer-events-none font-bold text-[10px] ${
                  focusName || fullName ? 'top-1 text-purple-400 text-[8px]' : 'top-3 text-white/30'
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onFocus={() => setFocusName(true)}
                  onBlur={() => setFocusName(false)}
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 rounded-xl pt-4 pb-1.5 px-3 text-xs font-bold text-white placeholder-transparent outline-none transition-all"
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" />
              </div>
            </div>

            {/* Email Address */}
            <div className="anim-form-item relative">
              <label 
                className={`absolute left-3 transition-all duration-300 pointer-events-none font-bold text-[10px] ${
                  focusEmail || email ? 'top-1 text-purple-400 text-[8px]' : 'top-3 text-white/30'
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusEmail(true)}
                  onBlur={() => setFocusEmail(false)}
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 rounded-xl pt-4 pb-1.5 px-3 text-xs font-bold text-white placeholder-transparent outline-none transition-all"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div className="anim-form-item relative text-left">
              <label 
                className={`absolute left-3 transition-all duration-300 pointer-events-none font-bold text-[10px] ${
                  focusPass || password ? 'top-1 text-purple-400 text-[8px]' : 'top-3 text-white/30'
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusPass(true)}
                  onBlur={() => setFocusPass(false)}
                  className={`w-full bg-white/5 border focus:ring-1 rounded-xl pt-4 pb-1.5 px-3 text-xs font-bold text-white placeholder-transparent outline-none transition-all ${
                    errors.password ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-purple-500 focus:ring-purple-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-[9px] text-red-400 font-bold mt-0.5 block">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="anim-form-item relative text-left">
              <label 
                className={`absolute left-3 transition-all duration-300 pointer-events-none font-bold text-[10px] ${
                  focusConfirmPass || confirmPassword ? 'top-1 text-purple-400 text-[8px]' : 'top-3 text-white/30'
                }`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusConfirmPass(true)}
                  onBlur={() => setFocusConfirmPass(false)}
                  className={`w-full bg-white/5 border focus:ring-1 rounded-xl pt-4 pb-1.5 px-3 text-xs font-bold text-white placeholder-transparent outline-none transition-all ${
                    errors.confirmPassword ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-purple-500 focus:ring-purple-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-[9px] text-red-400 font-bold mt-0.5 block">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Submit CTA button */}
            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="anim-form-item w-full py-2.5 mt-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all active:scale-[0.99] disabled:opacity-50 text-xs flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              {!loading && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>

          {/* SignIn Link */}
          <div className="anim-form-item text-center pt-2 border-t border-white/10">
            <p className="text-xs text-white/40 font-semibold">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}

// Subcomponents helper methods for cleaner JSX code base

function ChevronDivider() {
  return <span className="text-white/20">→</span>;
}

function SocialButton({ label, icon, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 py-3 rounded-2xl transition-all active:scale-95">
      {icon}
      <span className="text-[10px] font-extrabold text-white/60">{label}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
