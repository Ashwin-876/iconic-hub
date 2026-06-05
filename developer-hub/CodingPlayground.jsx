import React, { useState } from 'react';
import { Terminal as TermIcon, Play, Code, AlertCircle, Bot, Sparkles, Send } from 'lucide-react';

export default function CodingPlayground() {
  const [code, setCode] = useState(
`// JavaScript Playground
function findMaxSubarray(arr) {
  let maxSoFar = arr[0];
  let currMax = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    currMax = Math.max(arr[i], currMax + arr[i]);
    maxSoFar = Math.max(maxSoFar, currMax);
  }
  return maxSoFar;
}

const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log("Max contiguous subarray sum is:", findMaxSubarray(numbers));
`
  );
  
  const [consoleOutput, setConsoleOutput] = useState([
    'System initialized.',
    'JavaScript ES6 compilation context ready.',
    'Type code and press Run to execute.'
  ]);
  const [compiling, setCompiling] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleRun = () => {
    setCompiling(true);
    setConsoleOutput(prev => [...prev, 'Compiling code...']);
    
    setTimeout(() => {
      setCompiling(false);
      setConsoleOutput(prev => [
        ...prev,
        'Running main.js...',
        'Max contiguous subarray sum is: 6',
        'Execution completed successfully.'
      ]);
    }, 1200);
  };

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setAiLoading(true);
    setAiResponse('');

    setTimeout(() => {
      setAiLoading(false);
      if (prompt.toLowerCase().includes('time complexity')) {
        setAiResponse('The time complexity of Kadane\'s algorithm is O(N) since it requires a single pass through the array. Space complexity is O(1).');
      } else {
        setAiResponse('Here is an optimization suggestion: you can add safeguard validations to ensure the array is not empty before parsing the elements.');
      }
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
      
      {/* File Explorer & IDE Editor (Left 8 columns) */}
      <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
        <div className="bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden shadow-md flex flex-col flex-1 min-h-[450px]">
          
          {/* Editor Header */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-950 flex justify-between items-center text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-green-500/80 rounded-full"></span>
              </div>
              <span className="border-l border-slate-800 pl-3">main.js</span>
            </div>

            <button
              onClick={handleRun}
              disabled={compiling}
              className="px-4 py-1.5 bg-vibrant-orange hover:bg-orange-600 text-white rounded-lg font-bold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 font-sans"
            >
              {compiling ? (
                <span className="w-3 h-3 rounded-full border border-t-transparent border-white animate-spin"></span>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Code</span>
                </>
              )}
            </button>
          </div>

          {/* IDE Content Screen */}
          <div className="flex-1 flex min-h-0">
            {/* Explorer bar */}
            <div className="w-36 bg-slate-950/60 border-r border-slate-900/50 p-4 text-[10px] font-mono text-slate-500 space-y-2.5 hidden md:block">
              <span className="font-bold uppercase tracking-wider block text-slate-600">WORKSPACE</span>
              <div className="space-y-1">
                <div className="text-orange-400 font-bold font-sans flex items-center gap-1">
                  <Code className="w-3 h-3" />
                  <span>main.js</span>
                </div>
                <div className="hover:text-slate-300 cursor-pointer flex items-center gap-1">
                  <span>package.json</span>
                </div>
              </div>
            </div>

            {/* Monaco mockup textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent p-6 text-xs font-mono text-emerald-400 focus:outline-none resize-none border-none outline-none leading-relaxed h-full min-h-[300px]"
            />
          </div>
        </div>

        {/* Terminal output */}
        <div className="bg-slate-950 border border-slate-900 rounded-3xl p-5 shadow-sm space-y-3 font-mono text-[10px] text-slate-500">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-900 text-slate-400">
            <TermIcon className="w-3.5 h-3.5" />
            <span>Output Console</span>
          </div>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {consoleOutput.map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-slate-700">&gt;</span>
                <span className={log.includes('successfully') || log.includes('sum is:') ? 'text-emerald-400' : 'text-slate-400'}>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Panel (Right 4 columns) */}
      <div className="lg:col-span-4 bg-white border border-surface-stroke rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[500px]">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-surface-stroke">
            <div className="w-10 h-10 rounded-xl bg-vibrant-orange/10 border border-vibrant-orange/20 flex items-center justify-center text-vibrant-orange">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-background flex items-center gap-1">
                <span>Dev Copilot AI</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </h3>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Real-time Refactoring Code</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-surface-stroke rounded-xl text-xs leading-relaxed text-on-surface-variant">
              How can I help you optimize or refactor your playground code? You can ask about code bugs, time complexity, or algorithms.
            </div>

            {aiLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-slate-50 rounded-xl border border-surface-stroke flex items-center space-x-1">
                  <span className="w-1 h-1 bg-vibrant-orange rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-vibrant-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1 h-1 bg-vibrant-orange rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}

            {aiResponse && (
              <div className="p-4 bg-orange-50/50 border border-orange-500/10 rounded-xl text-xs font-medium leading-relaxed text-on-surface-variant animate-fadeIn">
                {aiResponse}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleAskAI} className="relative flex items-center mt-6">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Copilot: 'What is the time complexity?'"
            className="w-full bg-slate-50 border border-surface-stroke focus:border-vibrant-orange focus:ring-1 focus:ring-vibrant-orange rounded-xl py-3 pl-4 pr-12 text-xs text-on-background outline-none transition-all"
          />
          <button type="submit" className="absolute right-3 p-1.5 bg-vibrant-orange hover:bg-orange-600 text-white rounded-lg transition-all">
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
