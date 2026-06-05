import React, { useState } from 'react';
import { Play, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Terminal, RefreshCw } from 'lucide-react';

const LANGUAGE_TEMPLATES = {
  javascript: `// Task: Fix memory leak in custom listener hook
function useWindowSize() {
  const [size, setSize] = React.useState({ width: window.innerWidth });

  React.useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    // TODO: Add memory leak cleanup here
  }, []);

  return size;
}`,
  react: `// Task: Optimize React reconciliation and state triggers
function UserFeed({ users }) {
  return (
    <ul>
      {users.map(user => (
        // Warning: Poor performance key logic
        <li key={Math.random()}>{user.name}</li>
      ))}
    </ul>
  );
}`,
  python: `# Task: Debug index range failure
def fetch_binary_search(items, target):
    low = 0
    high = len(items)
    while low <= high:
        mid = (low + high) // 2
        # Bug: index out of bounds risk if target is high
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid
        else:
            high = mid
    return -1`
};

export default function AICodingAssistant() {
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.javascript);
  const [activeSubTab, setActiveSubTab] = useState('suggestions'); // suggestions, output, metrics
  const [aiSuggestions, setAiSuggestions] = useState([
    { type: 'warning', title: 'Memory Leak Triggered', desc: 'The resize listener is attached on component mount but never detached. Ensure you return a cleanup callback.' },
    { type: 'info', title: 'Performance Optimization', desc: 'Avoid inline state updates if rendering frequently. Debounce resize checks if the component redraws heavy layouts.' }
  ]);
  const [compilerOutput, setCompilerOutput] = useState('Press "Run Code Audit" to evaluate terminal logs...');
  const [metrics, setMetrics] = useState({ score: '72/100', execution: 'N/A', memory: 'N/A' });
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    setCode(LANGUAGE_TEMPLATES[newLang] || '// Write custom code blocks here...');
  };

  const handleAction = (action) => {
    setLoading(true);
    setTimeout(() => {
      if (action === 'debug' || action === 'review') {
        if (lang === 'javascript') {
          setAiSuggestions([
            { type: 'success', title: 'Memory leak resolved', desc: 'Return a callback `() => window.removeEventListener("resize", handleResize)` within the useEffect.' },
            { type: 'info', title: 'Strict dependency enforcement', desc: 'Add empty dependency array `[]` explicitly if resize hooks monitor window constraints.' }
          ]);
          setCompilerOutput('> linter execution passed.\n> memory leak checks validated: SUCCESS.');
          setMetrics({ score: '96/100', execution: '0.04ms', memory: '1.2MB' });
        } else if (lang === 'react') {
          setAiSuggestions([
            { type: 'success', title: 'State reconciliation fixed', desc: 'Replace `Math.random()` key generator with stable unique attributes like `user.id`.' }
          ]);
          setCompilerOutput('> React reconciler optimized.\n> Rerender counts down by 42%.');
          setMetrics({ score: '100/100', execution: '0.01ms', memory: '0.8MB' });
        } else {
          setAiSuggestions([
            { type: 'success', title: 'Binary search boundaries aligned', desc: 'Set `high = len(items) - 1` and update conditional checks `low = mid + 1` / `high = mid - 1` to prevent inf loop.' }
          ]);
          setCompilerOutput('> execution successful. Array elements matched correctly.');
          setMetrics({ score: '98/100', execution: '0.12ms', memory: '4.5MB' });
        }
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      
      {/* Code Editor Panel (7 cols) */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-[24px] shadow-lg overflow-hidden text-left font-mono">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-vibrant-orange" />
            <select
              value={lang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-slate-900 text-slate-200 border border-slate-800 rounded px-2.5 py-1 text-xs outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="react">React JSX</option>
              <option value="python">Python</option>
            </select>
          </div>
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 bg-slate-950/80 text-emerald-400 p-5 outline-none resize-none text-[11px] leading-relaxed border-none focus:ring-0"
        />

        {/* Action Triggers */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap gap-2 justify-between items-center">
          <button
            onClick={() => handleAction('debug')}
            className="px-4 py-2 bg-vibrant-orange hover:bg-orange-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            disabled={loading}
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>Run Code Audit</span>
          </button>

          <div className="flex gap-1.5">
            <button onClick={() => handleAction('debug')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg transition-all">
              Refactor
            </button>
            <button onClick={() => handleAction('debug')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg transition-all">
              Optimize
            </button>
          </div>
        </div>
      </div>

      {/* AI Suggestions / Output (5 cols) */}
      <div className="lg:col-span-5 bg-white border border-surface-stroke rounded-[24px] shadow-sm overflow-hidden flex flex-col h-[470px]">
        
        {/* Tabs */}
        <div className="flex border-b border-surface-stroke bg-slate-50">
          {[
            { id: 'suggestions', label: 'AI Review' },
            { id: 'output', label: 'Console Logs' },
            { id: 'metrics', label: 'Metrics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 px-4 py-3 text-xs font-bold text-center border-b-2 transition-all ${
                activeSubTab === tab.id
                  ? 'border-vibrant-orange text-vibrant-orange bg-white'
                  : 'border-transparent text-slate-500 hover:text-on-background'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body content */}
        <div className="p-5 flex-1 overflow-y-auto text-left">
          {activeSubTab === 'suggestions' && (
            <div className="space-y-4">
              {aiSuggestions.map((s, idx) => (
                <div key={idx} className="flex gap-3 items-start border-b border-slate-50 pb-3 last:border-b-0">
                  {s.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  ) : s.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-vibrant-orange shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-on-background">{s.title}</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'output' && (
            <pre className="font-mono text-[10px] text-slate-600 bg-slate-50 border border-surface-stroke rounded-xl p-4 h-full overflow-auto">
              {compilerOutput}
            </pre>
          )}

          {activeSubTab === 'metrics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-surface-stroke p-3.5 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Linter Score</div>
                  <div className="text-base font-black text-vibrant-orange mt-1">{metrics.score}</div>
                </div>
                <div className="bg-slate-50 border border-surface-stroke p-3.5 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Exec Time</div>
                  <div className="text-base font-black text-slate-700 mt-1">{metrics.execution}</div>
                </div>
                <div className="bg-slate-50 border border-surface-stroke p-3.5 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Allocated</div>
                  <div className="text-base font-black text-slate-700 mt-1">{metrics.memory}</div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[10px] text-emerald-700 font-semibold leading-relaxed">
                Tip: Lower allocated heap buffers optimize layout transitions in Next.js Server Components.
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
