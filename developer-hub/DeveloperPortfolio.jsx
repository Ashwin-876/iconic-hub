import React, { useState } from 'react';
import { Download, Github, Star, Layout, Briefcase, FileText, X, Check } from 'lucide-react';

export default function DeveloperPortfolio() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Tech Modern");

  const templates = [
    { name: "Tech Modern", desc: "A sleek, tech-focused layout with code highlights.", badge: "Default", primaryColor: "#2563EB", preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=150" },
    { name: "Minimalist Clean", desc: "Simple and readable high-contrast print layout.", badge: "Popular", primaryColor: "#0F172A", preview: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=150" },
    { name: "Creative Gradient", desc: "Vibrant details suited for creative engineers.", badge: "New", primaryColor: "#EC4899", preview: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150" },
    { name: "Executive Professional", desc: "A formal corporate layout for leadership roles.", badge: "Classic", primaryColor: "#0369A1", preview: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=150" }
  ];

  const selectedDetails = templates.find(t => t.name === selectedTemplate) || templates[0];

  const commitGrid = Array.from({ length: 48 }, (_, i) => ({
    commits: Math.floor(Math.random() * 5),
    id: i
  }));

  const handleDownloadResume = () => {
    // Generate a beautiful mock PDF file
    const doc = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 900 >>
stream
BT
/F1 22 Tf
50 780 Td
(ASHWIN - SOFTWARE ENGINEER RESUME) Tj
ET
BT
/F1 12 Tf
50 740 Td
(Email: ashwin@iconichub.dev | Template: ${selectedTemplate}) Tj
ET
BT
/F1 14 Tf
50 700 Td
(DEVELOPER METRICS) Tj
ET
BT
/F1 11 Tf
50 680 Td
(- Platform Rank: #425 (Top 3% of active engineers)) Tj
ET
BT
/F1 11 Tf
50 660 Td
(- Sync Contributions: 48 weeks active contribution tracking) Tj
ET
BT
/F1 14 Tf
50 610 Td
(TECHNICAL SKILLS) Tj
ET
BT
/F1 11 Tf
50 590 Td
(- Frontend: React Hooks, NextJS server rendering, state providers) Tj
ET
BT
/F1 11 Tf
50 570 Td
(- DevOps: Resilient containerization, Docker packaging, K8s orchestration) Tj
ET
BT
/F1 11 Tf
50 550 Td
(- Core: HTML5, CSS layout architectures, Tailwind CSS, Javascript ES6+) Tj
ET
BT
/F1 14 Tf
50 500 Td
(REPRESENTATIVE PROJECTS) Tj
ET
BT
/F1 11 Tf
50 480 Td
(- AI Prompt Engineering Masterclass & Chat Co-pilot Drawer) Tj
ET
BT
/F1 11 Tf
50 460 Td
(- Developer Portfolio & Sync Commit Hub platform integration) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000311 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
680
%%EOF`;

    const blob = new Blob([doc], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ashwin_Resume_${selectedTemplate.replace(/\s+/g, '_')}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto animate-fadeIn">
      
      {/* Portfolio Info */}
      <div className="bg-white border border-surface-stroke rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-xl font-bold text-on-background">Portfolio &amp; Resume Builder</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Generate clean, modern developer portfolios directly synced with your Github commit trees and classroom milestones. Selected Theme: <strong style={{ color: selectedDetails.primaryColor }}>{selectedTemplate}</strong>.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handleDownloadResume} 
              style={{ backgroundColor: selectedDetails.primaryColor }}
              className="px-5 py-3 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 hover:brightness-90 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Generate PDF Resume</span>
            </button>
            <button 
              onClick={() => setShowTemplates(true)}
              className="px-5 py-3 bg-slate-50 border border-surface-stroke hover:bg-slate-100 text-xs font-bold text-slate-600 rounded-xl transition-all flex items-center gap-1.5 active:scale-95"
            >
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
          {commitGrid.map((cell) => {
            // Calculate a color gradient based on selected primary color
            const intensity = cell.commits;
            let bgColor = 'bg-slate-200';
            if (intensity > 0) {
              bgColor = ''; // dynamic background style below
            }
            return (
              <div
                key={cell.id}
                className={`w-3.5 h-3.5 rounded-sm transition-all ${bgColor}`}
                style={intensity > 0 ? { backgroundColor: `${selectedDetails.primaryColor}${intensity === 1 ? '33' : intensity === 2 ? '66' : intensity === 3 ? 'aa' : 'ff'}` } : {}}
                title={`${cell.commits} commits`}
              ></div>
            );
          })}
        </div>
        <div className="flex justify-between items-center text-[9px] text-slate-500 font-semibold px-1">
          <span>48 Weeks contribution tracking</span>
          <span className="flex items-center gap-1">
            <span>Less</span>
            <span className="w-2.5 h-2.5 bg-slate-200 rounded-sm"></span>
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: `${selectedDetails.primaryColor}33` }}></span>
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: selectedDetails.primaryColor }}></span>
            <span>More</span>
          </span>
        </div>
      </div>

      {/* Templates Drawer Dialog */}
      {showTemplates && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-100 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Select Resume Template</h3>
                <p className="text-xs text-slate-500">Pick a visual layout theme for your exported PDF portfolio.</p>
              </div>
              <button 
                onClick={() => setShowTemplates(false)}
                className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl p-2 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[50vh]">
              {templates.map((theme) => {
                const isSelected = selectedTemplate === theme.name;
                return (
                  <div 
                    key={theme.name}
                    onClick={() => {
                      setSelectedTemplate(theme.name);
                      setShowTemplates(false);
                    }}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer hover:bg-slate-50 ${
                      isSelected ? 'border-[#2563EB] bg-blue-500/[0.02] shadow-sm' : 'border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={theme.preview} 
                        alt={theme.name} 
                        className="w-12 h-16 object-cover rounded border border-slate-200 shadow-sm"
                      />
                      <div className="text-left space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{theme.name}</span>
                          <span className="text-[8px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                            {theme.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal">{theme.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span 
                        className="w-4 h-4 rounded-full border border-white shadow-sm inline-block" 
                        style={{ backgroundColor: theme.primaryColor }}
                      ></span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 text-right">
              <button 
                onClick={() => setShowTemplates(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
