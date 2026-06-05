import React from 'react';
import { Download, Github, Star, Layout, Briefcase, FileText } from 'lucide-react';

export default function DeveloperPortfolio() {
  const commitGrid = Array.from({ length: 48 }, (_, i) => ({
    commits: Math.floor(Math.random() * 5),
    id: i
  }));

  const handleDownloadResume = () => {
    alert('Generating & downloading PDF resume...');
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto animate-fadeIn">
      
      {/* Portfolio Info */}
      <div className="bg-white border border-surface-stroke rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-xl font-bold text-on-background">Portfolio & Resume Builder</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Generate clean, modern developer portfolios directly synced with your Github commit trees and classroom milestones. Showcase credentials in a single click.
          </p>
          <div className="flex gap-2">
            <button onClick={handleDownloadResume} className="px-5 py-3 bg-vibrant-orange hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>Generate PDF Resume</span>
            </button>
            <button className="px-5 py-3 bg-slate-50 border border-surface-stroke hover:bg-slate-100 text-xs font-bold text-slate-600 rounded-xl transition-all flex items-center gap-1.5">
              <Layout className="w-4 h-4" />
              <span>View Templates</span>
            </button>
          </div>
        </div>

        {/* Metric stats */}
        <div className="md:col-span-4 bg-slate-50 border border-surface-stroke p-5 rounded-2xl space-y-3">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform Rank</h4>
          <div className="text-3xl font-extrabold text-on-background">Rank #425</div>
          <p className="text-[10px] text-slate-500">Top 3% of active engineers</p>
        </div>
      </div>

      {/* Mock GitHub contribution grid */}
      <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-on-background uppercase tracking-wider flex items-center gap-2">
          <Github className="w-4 h-4" />
          <span>Synchronized Contributions</span>
        </h3>

        <div className="flex flex-wrap gap-1 border border-surface-stroke p-4 rounded-xl bg-slate-50 justify-center">
          {commitGrid.map((cell) => (
            <div
              key={cell.id}
              className={`w-3.5 h-3.5 rounded-sm transition-all ${
                cell.commits === 0 ? 'bg-slate-200' :
                cell.commits === 1 ? 'bg-orange-200' :
                cell.commits === 2 ? 'bg-orange-300' :
                cell.commits === 3 ? 'bg-orange-400' : 'bg-vibrant-orange'
              }`}
              title={`${cell.commits} commits`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between items-center text-[9px] text-slate-500 font-semibold px-1">
          <span>48 Weeks contribution tracking</span>
          <span className="flex items-center gap-1">
            <span>Less</span>
            <span className="w-2.5 h-2.5 bg-slate-200 rounded-sm"></span>
            <span className="w-2.5 h-2.5 bg-orange-200 rounded-sm"></span>
            <span className="w-2.5 h-2.5 bg-vibrant-orange rounded-sm"></span>
            <span>More</span>
          </span>
        </div>
      </div>

    </div>
  );
}
