import React from 'react';
import { Award, CheckCircle, Play, Users, Star, Trophy } from 'lucide-react';

const PROBLEMS = [
  { id: 'dsa1', title: 'Two Sum Closest', difficulty: 'Easy', points: 100, solvedCount: '1.2k', passRate: '82%' },
  { id: 'dsa2', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', points: 300, solvedCount: '450', passRate: '34%' },
  { id: 'dsa3', title: 'Longest Palindromic Substring', difficulty: 'Medium', points: 150, solvedCount: '890', passRate: '56%' }
];

const LEADERBOARD = [
  { rank: 1, name: 'Elena Rodriguez', points: 4200, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFhDVaM9u-lwsCaIbac5QGAxD6DYNbhzT2L2PIzRcnxPkvQ42f0S2K0t_CDQ-VUfQ0tH4yHipCC9jFmDsDUVmPFxCeUNa_OHh5WfRqi9Aaesu7NUWNnw-AR_gkrxQ1EiMBmr5OZhG1mmlD5hKgGznicmMvMX7OXa_KoYvt3shntfdQR7vL1yacWdIDsrviE5B5iUNPgVOZ57w33zYGER-NLTzmlSXaw7dVO9LJRA8slIDl7tiPFNURym8ukB8YZKHku8IfM7aq4OU5' },
  { rank: 2, name: 'Julian Thorne', points: 3950, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5piocAhA20xOSqt_J4BEvrJumdcBFISagFqpTJrxKfCEU3TqT8Hd1QvMhMECTm0Q_RgRIskFI_fQ1RP09ZFfCSq3wAvYIc2axgY6vbkYpdBgicpSKY1l3CJ6-lJOBn7hlwuh_ZtjGeTUd-mzwCqNyxAnlpHROeg8vwivmJEq2nADdpGcTrBGknuwPm1RaBQ203jpCQ4mZY8Gf4jgBjN9qOUhSVqFV9w-yt7rJg2gk12DOKaSOlDc6C57v5i0TVOYaF52j3Q3POC2n' },
  { rank: 3, name: 'Marcus Holloway', points: 3800, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTprORY5SzW2ZUbEMedRbpMPFFvZif78KWi4D261cjV7Q7712q3grpw08kXW_A7K2W0vKITwyPWhzicFQueFXX16ugr-k4cM0-dEAiKpg4K66jF_XzUvzeMQfvIFCNBqy4UQOg2B4XEJ5FVl0xJKToYowiTQmZu-5GEupiPjVmMnbDGMvYb-_nXM1Y3qafj0BPYv38WT45isKRLnQ3KUBxMFrz1hldh7YIO92oTp4UoWudiBcyZghui51djRgeGz3L9SSEiZKzT5lk' }
];

export default function CodingChallenges({ onSelectChallenge }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
      
      {/* Left 8 Columns: DSA Problem Sets */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-surface-stroke">
            <h3 className="text-sm font-bold text-on-background">Daily Coding Challenges</h3>
            <span className="text-[10px] bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 rounded px-2.5 py-0.5 font-bold uppercase tracking-wider">
              Updated Daily
            </span>
          </div>

          <div className="space-y-3">
            {PROBLEMS.map((prob) => (
              <div key={prob.id} className="bg-slate-50 border border-surface-stroke p-5 rounded-2xl flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[9px] font-bold">
                    <span className={`px-2 py-0.5 rounded uppercase tracking-wider ${
                      prob.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' :
                      prob.difficulty === 'Medium' ? 'bg-[#2563EB]/10 text-[#2563EB]' : 'bg-red-50 text-error'
                    }`}>
                      {prob.difficulty}
                    </span>
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {prob.solvedCount} solved
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-on-background">{prob.title}</h4>
                  <div className="flex gap-4 text-[9px] text-slate-500 font-semibold">
                    <span>Points: {prob.points} XP</span>
                    <span>Pass Rate: {prob.passRate}</span>
                  </div>
                </div>

                <button 
                  onClick={() => onSelectChallenge?.(prob)}
                  className="p-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl shadow-md active:scale-95 transition-all"
                  title="Solve Challenge"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right 4 Columns: Leaderboard & Stats */}
      <div className="lg:col-span-4 bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-surface-stroke text-on-background">
          <Trophy className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-sm font-bold">Top Developers</h3>
        </div>

        <div className="space-y-4">
          {LEADERBOARD.map((user) => (
            <div key={user.rank} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`w-5 h-5 text-xs font-extrabold flex items-center justify-center rounded ${
                  user.rank === 1 ? 'bg-yellow-500/10 text-yellow-600' :
                  user.rank === 2 ? 'bg-slate-300/20 text-slate-500' : 'bg-blue-600/10 text-blue-700'
                }`}>
                  {user.rank}
                </span>
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-xs font-bold text-on-background">{user.name}</span>
              </div>
              <span className="text-xs font-extrabold text-[#2563EB]">{user.points} XP</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
