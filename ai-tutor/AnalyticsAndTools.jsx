import React, { useState } from 'react';
import { Award, BookOpen, Clock, CheckCircle2, ChevronRight, RefreshCw, BarChart2 } from 'lucide-react';
import { callOpenRouter } from '../utils/openrouter';

export default function AnalyticsAndTools() {
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(null);

  // Dynamic Flashcards state
  const [flashcard, setFlashcard] = useState({ q: "What is hydration mismatch?", a: "When server-rendered HTML structure does not match the client-side virtual DOM structure on initial load." });
  const [flipped, setFlipped] = useState(false);
  const [generatingCard, setGeneratingCard] = useState(false);

  const mockQuiz = [
    { question: "What is the primary benefit of React Server Components?", options: ["Reducing client bundle sizes", "Direct DOM reconciliation", "Accessing browser cookies synchronously"], correct: 0 },
    { question: "Which algorithm ensures efficient path search configurations in modern graph routers?", options: ["Binary Trees search", "Dijkstra routing logic", "Bubble sort matches"], correct: 1 }
  ];

  const handleOptionClick = (idx) => {
    setSelectedAnswer(idx);
    if (idx === mockQuiz[activeQuizIndex].correct) {
      setQuizScore('correct');
    } else {
      setQuizScore('incorrect');
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setQuizScore(null);
    setActiveQuizIndex((activeQuizIndex + 1) % mockQuiz.length);
  };

  const generateNewCard = async () => {
    setGeneratingCard(true);
    setFlipped(false);
    try {
      const systemPrompt = `You are a computer science professor. Generate a high-quality coding flashcard.
Respond with a JSON object:
{
  "q": "A concise technical question",
  "a": "A clear, detailed one-sentence answer"
}
Return ONLY the raw JSON object. Do not wrap in markdown or backticks.`;

      const responseText = await callOpenRouter(["Generate card"], systemPrompt);
      const cleanJson = responseText.replace(/```json\s*/i, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      if (parsed.q && parsed.a) {
        setFlashcard(parsed);
      }
    } catch (error) {
      console.error(error);
      setFlashcard({ q: "What is React reconciliation?", a: "The algorithm React uses to diff one tree with another to determine which parts need to be changed." });
    } finally {
      setGeneratingCard(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      
      {/* Quiz Module (6 cols) */}
      <div className="lg:col-span-6 bg-white border border-surface-stroke rounded-[32px] p-6 shadow-sm space-y-6 text-left">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-on-background">Adaptive Knowledge Test</h2>
          <span className="text-[10px] text-[#2563EB] font-bold uppercase tracking-wider bg-[#2563EB]/10 px-2 py-1 rounded">
            Question {activeQuizIndex + 1} of {mockQuiz.length}
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-700 leading-relaxed">{mockQuiz[activeQuizIndex].question}</p>
          
          <div className="grid grid-cols-1 gap-2.5">
            {mockQuiz[activeQuizIndex].options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === mockQuiz[activeQuizIndex].correct;
              let btnClass = "bg-slate-50 border-surface-stroke text-slate-600 hover:bg-slate-100";
              if (selectedAnswer !== null) {
                if (isSelected) {
                  btnClass = isCorrect ? "bg-emerald-500 border-emerald-500 text-white" : "bg-red-500 border-red-500 text-white";
                } else if (isCorrect) {
                  btnClass = "bg-emerald-100 border-emerald-200 text-emerald-800";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => selectedAnswer === null && handleOptionClick(idx)}
                  className={`p-3 text-xs font-semibold text-left border rounded-xl transition-all ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {quizScore && (
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className={`text-xs font-extrabold ${quizScore === 'correct' ? 'text-emerald-600' : 'text-red-600'}`}>
                {quizScore === 'correct' ? '✓ Correct! Dynamic rendering cost is zero.' : '✗ Incorrect. Try referencing state compilation rules.'}
              </span>
              <button onClick={nextQuestion} className="px-3.5 py-1.5 bg-[#2563EB] text-white text-[10px] font-bold rounded-lg hover:bg-[#1D4ED8] transition-all flex items-center gap-1">
                <span>Next</span> <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Productivity Tools (6 cols) */}
      <div className="lg:col-span-6 bg-white border border-surface-stroke rounded-[32px] p-6 shadow-sm space-y-6 text-left">
        <h2 className="text-lg font-bold text-on-background">Study Tools & Analytics</h2>

        <div className="space-y-4 text-xs">
          {/* Flashcard Widget */}
          <div className="border border-surface-stroke rounded-2xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-extrabold text-on-background flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2563EB]" />
                <span>AI Flashcards Generator</span>
              </h4>
              <button
                onClick={generateNewCard}
                disabled={generatingCard}
                className="text-[10px] text-[#2563EB] font-bold hover:underline flex items-center gap-1 disabled:opacity-60"
              >
                {generatingCard ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                <span>Generate Card</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-500">Instantly generate flashcards for quick revision based on your weak concepts:</p>
            <div 
              onClick={() => setFlipped(!flipped)}
              className="p-4 bg-[#2563EB]/[0.02] hover:bg-[#2563EB]/[0.04] border border-blue-100 rounded-xl text-center cursor-pointer transition-all min-h-[90px] flex flex-col justify-center items-center"
            >
              {!flipped ? (
                <>
                  <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider mb-1">Concept card Q</span>
                  <div className="text-xs font-black text-on-background">{flashcard.q}</div>
                  <span className="text-[8px] text-[#2563EB] font-bold uppercase tracking-wider block mt-2">Click to reveal answer</span>
                </>
              ) : (
                <>
                  <span className="text-[9px] text-emerald-600 font-bold block uppercase tracking-wider mb-1">Answer explanation</span>
                  <div className="text-xs font-semibold text-slate-700">{flashcard.a}</div>
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block mt-2">Click to show question</span>
                </>
              )}
            </div>
          </div>

          {/* Activity Logs */}
          <div className="border border-surface-stroke rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-extrabold text-on-background flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-slate-400" />
              <span>Weekly Learning Logs</span>
            </h4>
            <div className="flex gap-1.5 items-end justify-between pt-2">
              {[
                { day: "Mon", hr: 1.5 },
                { day: "Tue", hr: 0.8 },
                { day: "Wed", hr: 2.1 },
                { day: "Thu", hr: 1.2 },
                { day: "Fri", hr: 0.5 },
                { day: "Sat", hr: 0 },
                { day: "Sun", hr: 0 }
              ].map((log, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-full bg-slate-100 h-20 rounded-lg overflow-hidden flex items-end">
                    <div className="bg-[#2563EB] w-full rounded-t-lg transition-all" style={{ height: `${(log.hr / 2.5) * 100}%` }}></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-500">{log.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
