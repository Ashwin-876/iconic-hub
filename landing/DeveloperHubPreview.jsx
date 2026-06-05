import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Code2, Cpu, ArrowUpRight, Play, Check } from 'lucide-react';

const MOCK_FILES = {
  js: {
    filename: "quick_sort.js",
    language: "JavaScript",
    code: `// QuickSort algorithm implementation
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Run sorting test
console.log(quickSort([38, 27, 43, 3, 9, 82, 10]));`,
    output: "[3, 9, 10, 27, 38, 43, 82]\nExecution completed in 4.2ms"
  },
  py: {
    filename: "ai_agent.py",
    language: "Python",
    code: `# Create a custom conversational agent
import openai

def get_agent_response(prompt):
    messages = [
        {"role": "system", "content": "You are a senior tutor."},
        {"role": "user", "content": prompt}
    ]
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )
    return response.choices[0].message.content

print(get_agent_response("Explain quantum computing."))`,
    output: "Quantum computing uses superposition & entanglement to...\nExecution completed in 1.1s"
  },
  rust: {
    filename: "main.rs",
    language: "Rust",
    code: `// Rust speed benchmark
fn main() {
    let mut sum: u64 = 0;
    for i in 0..1_000_000 {
        if i % 3 == 0 || i % 5 == 0 {
            sum += i;
        }
    }
    println!("Sum calculated successfully: {}", sum);
}`,
    output: "Sum calculated successfully: 233331666800\nExecution completed in 0.8ms"
  }
};

export default function DeveloperHubPreview() {
  const [activeLang, setActiveLang] = useState("js");
  const [running, setRunning] = useState(false);
  const [outputVisible, setOutputVisible] = useState(false);

  const fileData = MOCK_FILES[activeLang];

  const handleRunCode = () => {
    setRunning(true);
    setOutputVisible(false);
    setTimeout(() => {
      setRunning(false);
      setOutputVisible(true);
    }, 800);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Descriptions */}
        <div className="lg:col-span-5 text-left space-y-6">
          <div className="inline-flex items-center space-x-2 bg-orange-950/30 border border-orange-500/20 rounded-lg py-1 px-3">
            <Code2 className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold text-orange-400">Developer Hub</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Code and Compile <br />
            Right in Your Browser
          </h3>

          <p className="text-slate-400 leading-relaxed">
            Forget about configuring complex local development containers. Build applications, complete interactive tasks, study system APIs, and view deployment assets directly.
          </p>

          <ul className="space-y-3.5 text-sm text-slate-300">
            <li className="flex items-center space-x-3">
              <span className="p-1 bg-emerald-500/10 rounded text-emerald-400"><Check className="w-4 h-4" /></span>
              <span>Rich interactive web editor with syntax checking</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="p-1 bg-emerald-500/10 rounded text-emerald-400"><Check className="w-4 h-4" /></span>
              <span>Instant terminal output for multiple languages</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="p-1 bg-emerald-500/10 rounded text-emerald-400"><Check className="w-4 h-4" /></span>
              <span>1-click deploy to sandbox preview pages</span>
            </li>
          </ul>

          <div className="pt-2">
            <Link 
              to="/dashboard"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-all"
            >
              <span>Explore Dev Hub</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Code Editor Mock */}
        <div className="lg:col-span-7 w-full">
          <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[400px]">
            {/* Editor Top Bar Tabs */}
            <div className="flex items-center justify-between bg-slate-950/60 px-4 py-2.5 border-b border-slate-900">
              <div className="flex space-x-1.5">
                {Object.keys(MOCK_FILES).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveLang(key);
                      setOutputVisible(false);
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${
                      activeLang === key 
                        ? "bg-slate-800 text-orange-400 border-slate-700/60" 
                        : "text-slate-400 border-transparent hover:text-slate-200"
                    }`}
                  >
                    {MOCK_FILES[key].filename}
                  </button>
                ))}
              </div>

              {/* Action play button */}
              <button
                onClick={handleRunCode}
                disabled={running}
                className="flex items-center space-x-1.5 px-3 py-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-semibold rounded-md transition-all shadow-md shadow-orange-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{running ? "Running..." : "Run"}</span>
              </button>
            </div>

            {/* Code Editor Content area */}
            <div className="flex-1 flex overflow-hidden font-mono text-xs leading-normal">
              {/* Line Numbers */}
              <div className="bg-slate-950/40 text-slate-600 py-4 px-3 text-right select-none border-r border-slate-900/50">
                {fileData.code.split('\n').map((_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>

              {/* Code input text */}
              <div className="flex-1 overflow-auto py-4 px-4 text-left text-orange-200 bg-slate-900/10">
                <pre className="whitespace-pre-wrap select-text">{fileData.code}</pre>
              </div>
            </div>

            {/* Mock terminal Console Drawer */}
            <div className="bg-slate-950 px-4 py-3 border-t border-slate-900 flex flex-col justify-start">
              <div className="flex items-center justify-between pb-1 border-b border-slate-900 mb-1.5">
                <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Terminal Console Output</span>
                </div>
              </div>
              
              <div className="h-16 text-left font-mono text-[11px] text-emerald-400 overflow-y-auto">
                {running && <div className="text-slate-400 animate-pulse">Running compilation thread...</div>}
                {outputVisible && !running && <div className="whitespace-pre">{fileData.output}</div>}
                {!running && !outputVisible && <div className="text-slate-600">Click "Run" to execute program entrypoint.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
