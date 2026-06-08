import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

const LESSONS = [
  {
    id: 'l1',
    course: 'Full-Stack JavaScript Pathways',
    lesson: 'Module 4: React hooks under the hood',
    progress: 68,
    timeLeft: '12 mins left'
  },
  {
    id: 'l2',
    course: 'Systems Architecture Masterclass',
    lesson: 'Module 7: Designing fault-tolerant distributed caches',
    progress: 35,
    timeLeft: '45 mins left'
  }
];

export default function ContinueLearning() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 text-left">
      <h2 className="text-xl font-bold text-on-background">Continue Learning</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LESSONS.map((lesson) => (
          <div key={lesson.id} className="bg-white border border-surface-stroke p-5 rounded-2xl shadow-sm flex items-center justify-between gap-4">
            <div className="space-y-3 flex-1 min-w-0">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block truncate">{lesson.course}</span>
                <h3 className="text-sm font-bold text-on-background truncate">{lesson.lesson}</h3>
              </div>
              <div className="space-y-1.5">
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${lesson.progress}%` }}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500">
                  <span>{lesson.progress}% Completed</span>
                  <span>{lesson.timeLeft}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/courses/react-arch')}
              className="p-3 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white rounded-xl shadow-md shrink-0"
              title="Play Lesson"
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
