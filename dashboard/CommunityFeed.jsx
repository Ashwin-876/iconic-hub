import React from 'react';
import { MessageSquare, ThumbsUp, Users, Heart } from 'lucide-react';

const POSTS = [
  {
    id: 'p1',
    author: 'Elena Rodriguez',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFhDVaM9u-lwsCaIbac5QGAxD6DYNbhzT2L2PIzRcnxPkvQ42f0S2K0t_CDQ-VUfQ0tH4yHipCC9jFmDsDUVmPFxCeUNa_OHh5WfRqi9Aaesu7NUWNnw-AR_gkrxQ1EiMBmr5OZhG1mmlD5hKgGznicmMvMX7OXa_KoYvt3shntfdQR7vL1yacWdIDsrviE5B5iUNPgVOZ57w33zYGER-NLTzmlSXaw7dVO9LJRA8slIDl7tiPFNURym8ukB8YZKHku8IfM7aq4OU5',
    text: 'Just finished the "Advanced Product Design: Systems & Tokens" curriculum! The automated playground evaluator is extremely thorough. Highly recommend taking the final sandbox project!',
    likes: 24,
    replies: 5,
    tag: 'Achievement'
  },
  {
    id: 'p2',
    author: 'Julian Thorne',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5piocAhA20xOSqt_J4BEvrJumdcBFISagFqpTJrxKfCEU3TqT8Hd1QvMhMECTm0Q_RgRIskFI_fQ1RP09ZFfCSq3wAvYIc2axgY6vbkYpdBgicpSKY1l3CJ6-lJOBn7hlwuh_ZtjGeTUd-mzwCqNyxAnlpHROeg8vwivmJEq2nADdpGcTrBGknuwPm1RaBQ203jpCQ4mZY8Gf4jgBjN9qOUhSVqFV9w-yt7rJg2gk12DOKaSOlDc6C57v5i0TVOYaF52j3Q3POC2n',
    text: 'Looking for a study group to tackle NextJS Server Components performance benchmarks. Anyone interested in weekly virtual syncs?',
    likes: 12,
    replies: 8,
    tag: 'Study Group'
  }
];

export default function CommunityFeed() {
  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-on-background">Community Feed</h2>
        <button className="text-xs font-bold text-vibrant-orange hover:underline flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>Browse all spaces</span>
        </button>
      </div>

      <div className="space-y-4">
        {POSTS.map((post) => (
          <div key={post.id} className="bg-white border border-surface-stroke p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div className="text-left">
                  <h4 className="text-xs font-bold text-on-background">{post.author}</h4>
                  <p className="text-[10px] text-slate-500">Student Member</p>
                </div>
              </div>

              <span className="px-2 py-0.5 bg-orange-50 text-[10px] font-bold text-vibrant-orange rounded-md border border-orange-100">
                {post.tag}
              </span>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              {post.text}
            </p>

            <div className="flex items-center gap-4 pt-3 border-t border-surface-stroke text-slate-500 text-[10px] font-semibold">
              <button className="flex items-center gap-1.5 hover:text-vibrant-orange transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-vibrant-orange transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{post.replies} Replies</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
