import React, { useState } from 'react';
import { Play, FileText, Download, Bookmark, Plus } from 'lucide-react';

const CHAPTERS = [
  { id: 'v1', title: '1. React Fiber: The reconciliation node trees', duration: '14 mins', active: true },
  { id: 'v2', title: '2. Diffing hooks and internal schedules', duration: '22 mins', active: false },
  { id: 'v3', title: '3. Concurrent Mode scheduling architectures', duration: '18 mins', active: false }
];

export default function VideoLessons() {
  const [activeVideo, setActiveVideo] = useState('v1');
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!notes.trim()) return;
    setSavedNotes([...savedNotes, { time: '02:45', text: notes }]);
    setNotes('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
      
      {/* Left 8 Columns: Distraction-Free Video Frame & User Tools */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Mock HTML5 Video Player */}
        <div className="relative aspect-video w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center group shadow-md">
          {/* Glass Overlay Play */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
            <button className="w-16 h-16 rounded-full bg-vibrant-orange/95 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all">
              <Play className="w-6 h-6 fill-current ml-1" />
            </button>
          </div>

          <div className="text-center space-y-2 relative z-10 text-slate-400 p-4">
            <span className="text-2xl font-bold block text-white">Classroom Video Stream</span>
            <p className="text-xs max-w-sm mx-auto">
              [Mock Video Player: {CHAPTERS.find(c => c.id === activeVideo)?.title}]
            </p>
          </div>

          {/* Player controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 flex items-center justify-between text-[10px] text-slate-400">
            <span>02:45 / 14:00</span>
            <span>Speed: 1.0x</span>
          </div>
        </div>

        {/* Notes, Downloads, Bookmarks Section */}
        <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-surface-stroke">
            <h3 className="text-sm font-bold text-on-background">Study Tools</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-50 border border-surface-stroke rounded-lg text-slate-500 hover:text-vibrant-orange transition-all" title="Bookmark Video">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="px-3.5 py-2 bg-slate-50 border border-surface-stroke rounded-lg text-xs font-bold text-slate-600 hover:text-on-background transition-all flex items-center gap-1.5">
                <Download className="w-4 h-4 text-slate-500" />
                <span>Syllabus PDF</span>
              </button>
            </div>
          </div>

          {/* Notepad Form */}
          <form onSubmit={handleSaveNote} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Take a Note</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type your notes during the lecture..."
                rows={3}
                className="w-full bg-slate-50 border border-surface-stroke focus:border-vibrant-orange focus:ring-1 focus:ring-vibrant-orange rounded-xl p-4 text-xs text-on-background outline-none transition-all resize-none"
              />
            </div>
            <button type="submit" className="px-4 py-2.5 bg-vibrant-orange hover:bg-orange-600 text-white text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>Save Note</span>
            </button>
          </form>

          {/* Saved notes log */}
          {savedNotes.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-surface-stroke text-xs text-left">
              <h4 className="font-bold text-on-background">Saved Notes ({savedNotes.length})</h4>
              <div className="space-y-3">
                {savedNotes.map((note, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-surface-stroke rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-vibrant-orange">Timestamp: {note.time}</span>
                    <p className="text-on-surface-variant font-medium leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Right 4 Columns: Chapter List */}
      <div className="lg:col-span-4 bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-on-background uppercase tracking-wider">Lesson Chapters</h3>
        <div className="space-y-2">
          {CHAPTERS.map((chapter) => {
            const isSelected = activeVideo === chapter.id;
            return (
              <button
                key={chapter.id}
                onClick={() => setActiveVideo(chapter.id)}
                className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                  isSelected
                    ? 'border-vibrant-orange bg-orange-500/5 text-vibrant-orange font-bold'
                    : 'border-surface-stroke bg-white hover:border-slate-300 text-on-surface-variant'
                }`}
              >
                <span className="text-xs truncate mr-2">{chapter.title}</span>
                <span className="text-[9px] text-slate-500 shrink-0 font-mono">{chapter.duration}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
