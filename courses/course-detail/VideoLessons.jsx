import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, FileText, Download, Bookmark, Plus, Volume2 } from 'lucide-react';

const CHAPTERS = [
  { 
    id: 'v1', 
    title: '1. React Fiber: The reconciliation node trees', 
    duration: '14s sample', 
    url: '/AI_Video_Prompt_–_LMS_Learning.mp4' 
  },
  { 
    id: 'v2', 
    title: '2. Diffing hooks and internal schedules', 
    duration: '29s sample', 
    url: '/AI_Video_Prompt_–_LMS_Learning.mp4' 
  },
  { 
    id: 'v3', 
    title: '3. Concurrent Mode scheduling architectures', 
    duration: '12s sample', 
    url: '/AI_Video_Prompt_–_LMS_Learning.mp4' 
  }
];

export default function VideoLessons() {
  const [activeVideo, setActiveVideo] = useState('v1');
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  const videoRef = useRef(null);

  const activeVideoDetails = CHAPTERS.find(c => c.id === activeVideo) || CHAPTERS[0];

  useEffect(() => {
    // Reset player state when video changes
    setPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeVideo]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!notes.trim()) return;
    setSavedNotes([...savedNotes, { time: formatTime(currentTime), text: notes }]);
    setNotes('');
  };

  const handleDownloadSyllabus = () => {
    const doc = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /MediaBox [0 0 595 842] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 500 >>
stream
BT
/F1 22 Tf
50 780 Td
(ICONIC ACADEMY - COURSE SYLLABUS) Tj
ET
BT
/F1 14 Tf
50 740 Td
(Course Title: Advanced React Architecture Patterns) Tj
ET
BT
/F1 11 Tf
50 710 Td
(Instructor: Josh W. Comeau) Tj
ET
BT
/F1 12 Tf
50 670 Td
(COURSE SCHEDULE & CHAPTERS) Tj
ET
BT
/F1 10 Tf
50 640 Td
(1. React Fiber: The reconciliation node trees) Tj
ET
BT
/F1 10 Tf
50 620 Td
(   - In-depth look into fiber nodes, reconciler cycles, and work loops.) Tj
ET
BT
/F1 10 Tf
50 590 Td
(2. Diffing hooks and internal schedules) Tj
ET
BT
/F1 10 Tf
50 570 Td
(   - How useState, useEffect, useMemo are diffed during render phases.) Tj
ET
BT
/F1 10 Tf
50 540 Td
(3. Concurrent Mode scheduling architectures) Tj
ET
BT
/F1 10 Tf
50 520 Td
(   - Schedulers, priority lanes, and non-blocking rendering updates.) Tj
ET
BT
/F1 10 Tf
50 480 Td
(Generated dynamically via Iconic Hub - Academic Syllabus System) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
780
%%EOF`;

    const blob = new Blob([doc], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'React_Architecture_Syllabus.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
      
      {/* Left 8 Columns: Active Video Player & User Tools */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Real HTML5 Video Player */}
        <div className="relative aspect-video w-full bg-black border border-slate-900 rounded-3xl overflow-hidden shadow-xl group">
          
          {/* Main Video Element */}
          <video
            ref={videoRef}
            src={activeVideoDetails.url}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
            poster="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800"
            preload="auto"
          />

          {/* Semi-transparent play overlay shown when paused */}
          {!playing && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-slate-950/40 flex items-center justify-center cursor-pointer transition-all hover:bg-slate-950/30"
            >
              <button className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl transform scale-100 hover:scale-105 transition-all">
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
            </div>
          )}

          {/* Hover Control Overlay Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Timeline Progress Slider */}
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>

            {/* Sub-controls panel */}
            <div className="flex items-center justify-between text-white text-[11px] font-bold">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="p-1 hover:bg-white/10 rounded">
                  {playing ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                </button>
                <button className="p-1 hover:bg-white/10 rounded">
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-slate-300 font-semibold select-none">
                  {formatTime(currentTime)} / {formatTime(duration || 14)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-red-600 rounded-full text-[9px] uppercase tracking-wider animate-pulse">
                  Streaming Sample
                </span>
                <span className="text-[10px] text-slate-400">1.0x Speed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes, Downloads, Bookmarks Section */}
        <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-surface-stroke">
            <h3 className="text-sm font-bold text-on-background">Study Tools</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-50 border border-surface-stroke rounded-lg text-slate-500 hover:text-blue-600 transition-all" title="Bookmark Video">
                <Bookmark className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDownloadSyllabus}
                className="px-3.5 py-2 bg-slate-50 border border-surface-stroke rounded-lg text-xs font-bold text-slate-600 hover:text-on-background transition-all flex items-center gap-1.5"
              >
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
                className="w-full bg-slate-50 border border-surface-stroke focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-xl p-4 text-xs text-on-background outline-none transition-all resize-none"
              />
            </div>
            <button type="submit" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-600 text-white text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center gap-1">
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
                    <span className="text-[10px] font-bold text-blue-600">Timestamp: {note.time}</span>
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
                    ? 'border-blue-600 bg-blue-500/5 text-blue-600 font-bold'
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
