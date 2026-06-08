import React, { useState } from 'react';
import { Upload, CheckCircle, FileText, Trash2, ArrowRight } from 'lucide-react';

export default function Assignments() {
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('pending'); // pending, uploaded, graded

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('uploaded');
    }
  };

  const handleRemove = () => {
    setFile(null);
    setStatus('pending');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setStatus('graded');
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
      
      {/* Left 7 Columns: Project Spec Card */}
      <div className="lg:col-span-7 bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">ASSIGNMENT 1 OF 1</span>
          <h3 className="text-base font-bold text-on-background">React Hooks Sandbox: Custom Cache Reconciler</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Write a custom hook called `useCustomCache` that caches function outputs based on arguments, and executes component rerenders only when the cache updates. 
          </p>
        </div>

        <div className="border-t border-surface-stroke pt-4 space-y-4">
          <h4 className="text-xs font-bold text-on-background uppercase tracking-widest">Submission Guidelines</h4>
          <div className="text-xs text-on-surface-variant space-y-2">
            <p>• Save your code inside a single `useCustomCache.js` file.</p>
            <p>• Ensure all exports are default and mock dependencies are correctly referenced.</p>
            <p>• Size limit: 10MB maximum.</p>
          </div>
        </div>
      </div>

      {/* Right 5 Columns: Upload portal */}
      <div className="lg:col-span-5 bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-on-background uppercase tracking-wider font-sans">Upload Solution</h3>

        {status === 'pending' && (
          <label className="border-2 border-dashed border-surface-stroke hover:border-blue-600 hover:bg-blue-500/[0.02] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300">
            <Upload className="w-8 h-8 text-blue-600 animate-bounce" style={{ animationDuration: '3s' }} />
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-on-background">Drag & drop files here</span>
              <p className="text-[10px] text-slate-500">or click to browse your folders</p>
            </div>
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
        )}

        {status === 'uploaded' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-slate-50 border border-surface-stroke rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-8 h-8 text-blue-600 shrink-0" />
                <div className="text-left min-w-0">
                  <h4 className="text-xs font-bold text-on-background truncate">{file.name}</h4>
                  <p className="text-[9px] text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button type="button" onClick={handleRemove} className="p-2 text-slate-400 hover:text-error transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {submitting ? (
                <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
              ) : (
                <>
                  <span>Submit Assignment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'graded' && (
          <div className="p-6 bg-slate-50 border border-surface-stroke rounded-2xl text-center space-y-4">
            <div className="w-12 h-12 bg-success-emerald/10 rounded-full flex items-center justify-center text-success-emerald mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-on-background">Project Submitted!</h4>
              <p className="text-[10px] text-slate-500">Grading status: **Passed (100 / 100)**</p>
            </div>
            <button
              onClick={handleRemove}
              className="px-4 py-2 border border-surface-stroke hover:bg-white text-on-surface-variant text-[10px] font-bold rounded-xl transition-all"
            >
              Submit Again
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
