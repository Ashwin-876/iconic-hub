import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate Admin Auth
    setTimeout(() => {
      setLoading(false);
      if (email === 'admin@iconichub.io' && password === 'admin') {
        localStorage.setItem('admin_authenticated', 'true');
        navigate('/admin');
      } else {
        setError('Invalid administrative credentials. Please check credentials and try again.');
      }
    }, 800);
  };

  const prefillCredentials = () => {
    setEmail('admin@iconichub.io');
    setPassword('admin');
    setError('');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#060814] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Security themed flows */}
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Link to="/" className="flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-red-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <ShieldCheck className="w-5 h-5 font-bold" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                Iconic<span className="text-blue-600">Admin</span>
              </span>
            </Link>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/20 px-3 py-1 rounded-full border border-red-500/10">
              Secured Console
            </span>
          </div>

          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[36px] w-full max-w-md space-y-6 shadow-2xl text-left">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-white tracking-tight">Administrative Portal</h2>
              <p className="text-xs text-white/50 font-medium">Authenticate to access platform analytics and controls</p>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex items-start gap-3 text-red-400 text-xs leading-relaxed">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/70">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@iconichub.io"
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl py-3 pl-11 pr-4 text-xs font-bold text-white placeholder-white/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/70">Passkey</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl py-3 pl-11 pr-4 text-xs font-bold text-white placeholder-white/20 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.99] disabled:opacity-50 text-xs flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
