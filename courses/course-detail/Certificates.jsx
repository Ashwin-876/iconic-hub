import React from 'react';
import { Award, Printer, Share2, ShieldCheck, Terminal } from 'lucide-react';

export default function Certificates({ studentName = 'Ashwin', courseTitle = 'Advanced React Architecture: State & Performance' }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      
      {/* Control Buttons */}
      <div className="flex justify-between items-center pb-4 border-b border-surface-stroke">
        <div>
          <h3 className="text-sm font-bold text-on-background">Your Certificate</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Verified Completion Credential</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="px-4 py-2 bg-slate-50 border border-surface-stroke hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:text-on-background transition-all flex items-center gap-1.5">
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print / PDF</span>
          </button>
          <button className="px-4 py-2 bg-slate-50 border border-surface-stroke hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:text-on-background transition-all flex items-center gap-1.5">
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>Share Badge</span>
          </button>
        </div>
      </div>

      {/* Verified Certificate Card Graphic Frame */}
      <div className="w-full bg-white border-[12px] border-double border-surface-stroke rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-md flex flex-col items-center justify-between text-center min-h-[500px] border-slate-200">
        
        {/* Aesthetic background badges */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-vibrant-orange/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Certificate Header logo */}
        <div className="space-y-2 relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-vibrant-orange to-amber-500 flex items-center justify-center text-white shadow-md shadow-vibrant-orange/20">
            <Terminal className="w-6 h-6" />
          </div>
          <span className="text-sm font-extrabold tracking-widest text-slate-500 uppercase">Iconic Hub Academy</span>
        </div>

        {/* Certificate Body text */}
        <div className="space-y-6 relative z-10 my-8">
          <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Certificate of Completion</span>
          <p className="text-xs text-slate-500">This is officially verified to certify that</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-background font-sans italic border-b border-surface-stroke pb-3 px-8 w-fit mx-auto">
            {studentName}
          </h2>
          <p className="text-xs text-slate-500 max-w-lg leading-relaxed mx-auto">
            has successfully completed the coursework requirements and practical sandbox evaluator labs for the verified syllabus
          </p>
          <h3 className="text-lg font-bold text-vibrant-orange max-w-xl mx-auto leading-snug">
            {courseTitle}
          </h3>
        </div>

        {/* Signatures & Hashes row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-surface-stroke pt-8 relative z-10 text-[10px] text-slate-500">
          
          {/* Signatures */}
          <div className="space-y-1 text-left sm:text-left">
            <div className="font-mono text-slate-400">Marcus Holloway</div>
            <div className="border-t border-slate-300 w-28 mt-1"></div>
            <div className="text-[8px] uppercase tracking-wider text-slate-400">Lead Curriculum Instructor</div>
          </div>

          {/* Secure validation hash */}
          <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-surface-stroke rounded-xl max-w-xs text-left">
            <ShieldCheck className="w-6 h-6 text-success-emerald shrink-0" />
            <div className="space-y-0.5">
              <span className="font-bold text-on-background uppercase text-[8px] tracking-wider block">Security Verified</span>
              <span className="font-mono text-slate-500 text-[8px] truncate block max-w-[150px]">
                ID: IH-RE-984A-98F12B5-CA
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
