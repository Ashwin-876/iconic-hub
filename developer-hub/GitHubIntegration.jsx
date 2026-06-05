import React, { useState } from 'react';
import { Github, RefreshCw, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function GitHubIntegration() {
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState('Not connected');

  const handleConnect = () => {
    setSyncing(true);
    setStatus('Linking account...');
    setTimeout(() => {
      setConnected(true);
      setSyncing(false);
      setStatus('Successfully synced');
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setStatus('Not connected');
  };

  return (
    <div className="bg-white border border-surface-stroke rounded-3xl p-6 md:p-8 shadow-sm max-w-xl mx-auto space-y-6 text-left animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-surface-stroke">
        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
          <Github className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-on-background">GitHub Integration</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Repository Contribution Sync</p>
        </div>
      </div>

      {/* Info */}
      <p className="text-xs text-on-surface-variant leading-relaxed">
        Connect your GitHub account to sync repositories, import commit graph statistics, and generate verified developer portfolios automatically.
      </p>

      {/* Status Bar */}
      <div className="p-4 bg-slate-50 border border-surface-stroke rounded-2xl flex justify-between items-center text-xs">
        <span className="text-slate-500 font-semibold">Connection Status</span>
        <div className="flex items-center gap-1.5 font-bold">
          {connected ? (
            <>
              <CheckCircle className="w-4 h-4 text-success-emerald" />
              <span className="text-success-emerald">{status}</span>
            </>
          ) : syncing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 text-vibrant-orange animate-spin" />
              <span className="text-vibrant-orange">{status}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">{status}</span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2">
        {!connected ? (
          <button
            onClick={handleConnect}
            disabled={syncing}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>Connect GitHub Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleConnect}
              disabled={syncing}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-on-background font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>Resync Repositories</span>
            </button>
            <button
              onClick={handleDisconnect}
              className="w-full py-3 text-error hover:underline text-xs font-bold block text-center"
            >
              Disconnect Account
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
