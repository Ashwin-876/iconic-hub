import React from 'react';
import { Calendar, Users, Award, Video } from 'lucide-react';

const EVENTS = [
  {
    id: 'e1',
    title: 'React 19 System Patterns & API Upgrades',
    type: 'Live Class & Workshop',
    icon: Video,
    time: 'Starts in 2 hrs',
    date: 'Today, 8:00 PM',
    registered: false,
    color: 'text-orange-500 bg-orange-50'
  },
  {
    id: 'e2',
    title: 'Iconic Global Hackathon: AI Agent Builders',
    type: 'Coding Competition',
    icon: Award,
    time: '3 days left to register',
    date: 'Jun 12 - Jun 14',
    registered: true,
    color: 'text-purple-500 bg-purple-50'
  }
];

export default function UpcomingEvents() {
  const handleRegister = (title) => {
    alert(`Successfully registered for: ${title}!`);
  };

  return (
    <div className="space-y-4 text-left">
      <h2 className="text-xl font-bold text-on-background">Upcoming Events</h2>

      <div className="space-y-3">
        {EVENTS.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="bg-white border border-surface-stroke p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${event.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{event.type}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-vibrant-orange animate-ping"></span>
                    <span className="text-[10px] font-bold text-vibrant-orange">{event.time}</span>
                  </div>
                  <h3 className="text-sm font-bold text-on-background">{event.title}</h3>
                  <div className="text-[10px] font-medium text-slate-500">{event.date}</div>
                </div>
              </div>

              <button
                onClick={() => handleRegister(event.title)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  event.registered
                    ? 'bg-slate-100 text-slate-500 cursor-default'
                    : 'bg-white border border-surface-stroke hover:bg-slate-50 text-on-background'
                }`}
                disabled={event.registered}
              >
                {event.registered ? 'Registered' : 'Join Event'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
