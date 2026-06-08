import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: 'Which tree structure does React use to schedule rendering priorities and store fiber nodes?',
    options: [
      'A standard Binary Search Tree',
      'The Fiber WorkInProgress and Current double-buffering trees',
      'A Red-Black Tree map node',
      'A linear list indexing structure'
    ],
    answer: 1
  },
  {
    id: 2,
    question: 'What is the correct hook to cache a computationally expensive value between React renders?',
    options: [
      'useCallback',
      'useMemo',
      'useRef',
      'useEffect'
    ],
    answer: 1
  }
];

export default function Quizzes() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx });
  };

  const handleSubmit = () => {
    if (submitted || Object.keys(selectedAnswers).length < QUESTIONS.length) return;
    let finalScore = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        finalScore += 1;
      }
    });
    setScore(finalScore);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm max-w-3xl mx-auto space-y-6 text-left">
      <div className="flex justify-between items-center pb-4 border-b border-surface-stroke">
        <div>
          <h3 className="text-sm font-bold text-on-background">Module 1 Quiz: React Internals</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Passing grade: 80%</p>
        </div>
        {submitted && (
          <button onClick={handleReset} className="p-2 border border-surface-stroke hover:bg-slate-50 rounded-xl text-slate-500 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => (
          <div key={q.id} className="space-y-3">
            <h4 className="text-xs font-bold text-on-background flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] shrink-0">{idx + 1}</span>
              <span>{q.question}</span>
            </h4>

            <div className="grid grid-cols-1 gap-2.5 pl-7">
              {q.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[q.id] === optIdx;
                const isCorrect = q.answer === optIdx;
                
                let optionStyle = 'border-surface-stroke bg-slate-50 text-on-surface-variant hover:border-slate-300';
                if (isSelected) {
                  optionStyle = 'border-blue-600 bg-blue-500/5 text-blue-600 font-semibold';
                }
                if (submitted) {
                  if (isCorrect) {
                    optionStyle = 'border-success-emerald bg-emerald-500/5 text-success-emerald font-semibold';
                  } else if (isSelected) {
                    optionStyle = 'border-error bg-red-500/5 text-error font-semibold';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(q.id, optIdx)}
                    disabled={submitted}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex justify-between items-center ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {submitted && isCorrect && <CheckCircle className="w-4 h-4 text-success-emerald shrink-0" />}
                    {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-error shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Submission / Result */}
      <div className="pt-6 border-t border-surface-stroke flex items-center justify-between">
        {!submitted ? (
          <>
            <span className="text-[10px] text-slate-500 font-semibold">
              {Object.keys(selectedAnswers).length} of {QUESTIONS.length} answered
            </span>
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < QUESTIONS.length}
              className={`px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 ${
                Object.keys(selectedAnswers).length < QUESTIONS.length ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              }`}
            >
              <span>Submit Answers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-surface-stroke">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600/10 rounded-xl text-blue-600">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-left space-y-0.5">
                <h4 className="text-sm font-bold text-on-background">Quiz Completed!</h4>
                <p className="text-[10px] text-slate-500">
                  Your Score: <span className="font-bold text-on-background">{score} / {QUESTIONS.length}</span> ({(score / QUESTIONS.length) * 100}%)
                </p>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              (score / QUESTIONS.length) >= 0.8 ? 'bg-success-emerald/10 text-success-emerald border border-emerald-200' : 'bg-error/10 text-error border border-red-200'
            }`}>
              {(score / QUESTIONS.length) >= 0.8 ? 'Passed' : 'Failed'}
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
