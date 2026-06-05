import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

export default function CreateAccount() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#060814] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/40 border border-white/10 rounded-3xl p-8 space-y-6 text-center">
          <h2 className="text-xl font-bold text-white">Create Account</h2>
          <p className="text-xs text-slate-400">Join Iconic Hub and start learning today</p>
          <button
            onClick={() => navigate('/onboarding/welcome')}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl"
          >
            Sign Up
          </button>
          <p className="text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
