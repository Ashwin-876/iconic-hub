import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#060814] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/40 border border-white/10 rounded-3xl p-8 space-y-6 text-center">
          <h2 className="text-xl font-bold text-white">Forgot Password</h2>
          <p className="text-xs text-slate-400">Enter your email to receive a reset code</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl"
          >
            Send Reset Code
          </button>
          <p className="text-xs text-slate-500">
            Back to{' '}
            <Link to="/login" className="text-blue-500 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
