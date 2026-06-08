import React, { useState, useEffect } from 'react';
import { Github, RefreshCw, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function GitHubIntegration() {
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState('Not connected');
  const [syncLogs, setSyncLogs] = useState([]);

  const handleConnect = () => {
    setSyncing(true);
    setConnected(true);
    setStatus('Linking account...');
    setSyncLogs(['Connecting to GitHub OAuth API...']);
    
    setTimeout(() => {
      setStatus('Fetching profile information...');
      setSyncLogs(prev => [...prev, '✓ Authenticated as @ashwin_you']);
      
      setTimeout(() => {
        handleResync();
      }, 1000);
    }, 1200);
  };

  const handleResync = () => {
    setSyncing(true);
    setStatus('Scanning repositories...');
    setSyncLogs(prev => [...prev, 'Analyzing commit logs across active branches...']);
    
    setTimeout(() => {
      setStatus('Syncing nextjs-portfolio...');
      setSyncLogs(prev => [...prev, '✓ Syncing repository: nextjs-portfolio (452 commits)']);
      
      setTimeout(() => {
        setStatus('Syncing react-dashboard...');
        setSyncLogs(prev => [...prev, '✓ Syncing repository: react-dashboard (612 commits)']);
        
        setTimeout(() => {
          setStatus('Syncing node-backend-api...');
          setSyncLogs(prev => [...prev, '✓ Syncing repository: node-backend-api (360 commits)']);
          
          setTimeout(() => {
            setSyncing(false);
            setStatus('Successfully synced');
            setSyncLogs(prev => [...prev, '✓ Sync completed! Imported 1,424 commits successfully.']);
          }, 1200);
        }, 1000);
      }, 1000);
    }, 1200);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setSyncing(false);
    setStatus('Not connected');
    setSyncLogs([]);
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
          {connected && !syncing ? (
            <>
              <CheckCircle className="w-4 h-4 text-success-emerald" />
              <span className="text-success-emerald">{status}</span>
            </>
          ) : syncing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 text-[#2563EB] animate-spin" />
              <span className="text-[#2563EB]">{status}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">{status}</span>
            </>
          )}
        </div>
      </div>

      {/* Sync Logs Console */}
      {syncLogs.length > 0 && (
        <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-[10px] rounded-2xl space-y-1.5 border border-slate-800 shadow-inner max-h-[140px] overflow-y-auto">
          {syncLogs.map((log, lIdx) => (
            <div key={lIdx} className="leading-relaxed animate-fadeIn">
              {log}
            </div>
          ))}
          {syncing && (
            <div className="flex items-center gap-1 text-slate-400 italic">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></span>
              <span>Processing...</span>
            </div>
          )}
        </div>
      )}

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
              onClick={handleResync}
              disabled={syncing}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-on-background font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs active:scale-98"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>Resync Repositories</span>
            </button>
            <button
              onClick={handleDisconnect}
              disabled={syncing}
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
