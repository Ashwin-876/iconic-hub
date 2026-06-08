import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const nameFromEmail = email.split('@')[0];
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    localStorage.setItem('userName', capitalizedName);

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <PageTransition>
        <div className="min-h-screen bg-[#0b0f1e] text-white flex items-center justify-center p-6 md:p-12 font-sans overflow-y-auto relative">
          {/* Background gradient orbs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
          </div>
        <div className="max-w-6xl w-full flex items-center justify-center relative z-10">

          {/* Dark Glassmorphism Login Card */}
          <div className="flex justify-center w-full">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[36px] w-full max-w-lg space-y-6 shadow-2xl text-left">
              
              <div>
                <Link to="/" className="inline-flex items-center space-x-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-lg shadow-purple-500/20 flex items-center justify-center p-1.5 flex-shrink-0">
                    <img src="/iconic_logo.png" alt="Iconic Hub" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">Iconic Hub</span>
                </Link>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-1">Welcome back</span>
                <h2 className="text-3xl font-black text-white tracking-tight">Login to Iconic Hub</h2>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="username@gmail.com"
                    className="w-full bg-white/10 border border-white/10 focus:ring-2 focus:ring-purple-500 rounded-xl py-3 px-4 text-sm text-white placeholder-white/30 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-white/10 border border-white/10 focus:ring-2 focus:ring-purple-500 rounded-xl py-3 px-4 text-sm text-white placeholder-white/30 outline-none transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Link to="/forgot-password" className="text-xs font-bold text-purple-400 hover:text-purple-300 hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all active:scale-[0.99] disabled:opacity-50 text-sm"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="space-y-4 pt-2">
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider text-center">or continue with</p>
                
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        navigate('/dashboard');
                      }, 800);
                    }}
                    className="bg-white rounded-full py-2.5 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        navigate('/dashboard');
                      }, 800);
                    }}
                    className="bg-white rounded-full py-2.5 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all"
                  >
                    <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        navigate('/dashboard');
                      }, 800);
                    }}
                    className="bg-white rounded-full py-2.5 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all"
                  >
                    <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 font-medium">
                  Don't have an account yet?{' '}
                  <Link to="/create-account" className="text-purple-400 font-bold hover:text-purple-300 hover:underline">
                    Register for free
                  </Link>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
