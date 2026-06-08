import React, { useState, useRef } from 'react';
import { Play, Sparkles, AlertTriangle, CheckCircle2, RefreshCw, Terminal, ChevronDown, BarChart2, FileText, Cpu } from 'lucide-react';
import { callOpenRouter } from '../utils/openrouter';

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
    return -1`,
  typescript: `// Task: Fix strict typing error in API response handler
interface ApiResponse<T> {
  data: T;
  error?: string;
}

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  const res = await fetch(\`/api/users/\${id}\`);
  // Bug: Missing error boundary handling
  const json = await res.json();
  return json;
}`,
  css: `/* Task: Fix broken flexbox alignment */
.container {
  display: flex;
  /* Bug: justify-content misspelled */
  justify-items: center;
  align-content: space-between;
  flex-wrap: no-wrap;
  width: 100%;
  height: auto;
}`
};

const INITIAL_SUGGESTIONS = [
  {
    type: 'warning',
    title: 'Memory Leak Triggered',
    desc: 'The resize listener is attached on component mount but never detached. Ensure you return a cleanup callback.'
  },
  {
    type: 'info',
    title: 'Performance Optimization',
    desc: 'Avoid inline state updates if rendering frequently. Debounce resize checks if the component redraws heavy layouts.'
  }
];

// Simple syntax highlighter for the code display overlay
function highlight(code, lang) {
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments
  escaped = escaped.replace(/(\/\/.*$|#.*$)/gm, '<span class="code-comment">$1</span>');
  // Strings
  escaped = escaped.replace(/(`[^`]*`|"(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, '<span class="code-string">$1</span>');
  // Keywords
  const keywords = ['function', 'const', 'let', 'var', 'return', 'async', 'await', 'import', 'export', 'default', 'if', 'else', 'for', 'while', 'class', 'interface', 'type', 'def', 'from', 'and', 'or', 'not', 'in', 'True', 'False', 'None', 'React', 'useState', 'useEffect', 'Promise'];
  keywords.forEach(kw => {
    const re = new RegExp(`\\b(${kw})\\b`, 'g');
    escaped = escaped.replace(re, '<span class="code-keyword">$1</span>');
  });
  // Numbers
  escaped = escaped.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
  return escaped;
}

export default function AICodingAssistant() {
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.javascript);
  const [activeTab, setActiveTab] = useState('review'); // review | console | metrics
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [metrics, setMetrics] = useState({ score: '72', exec: 'N/A', memory: 'N/A', issues: 2 });
  const [loading, setLoading] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  const LANG_LABELS = {
    javascript: 'JavaScript',
    react: 'React JSX',
    python: 'Python',
    typescript: 'TypeScript',
    css: 'CSS'
  };

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setCode(LANGUAGE_TEMPLATES[newLang] || '// Start writing code...');
    setLangDropdown(false);
    setSuggestions(INITIAL_SUGGESTIONS);
    setConsoleOutput('');
  };

  const syncScroll = (e) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const runAudit = async () => {
    setLoading(true);
    setActiveTab('review');
    try {
      const systemPrompt = `You are a professional code compiler, linter and reviewer. Analyze the user's code in language: ${lang} and return a JSON object with the following schema:
{
  "suggestions": [
    {
      "type": "warning" | "success" | "info",
      "title": "Short action title",
      "desc": "Detailed explanation of the issue or suggestion"
    }
  ],
  "consoleOutput": "Terminal/linter verification trace logs",
  "score": 0-100 (integer represent linter quality score),
  "execTime": "estimated speed (e.g. '0.04ms')",
  "memory": "estimated memory size (e.g. '1.2 MB')"
}
Return ONLY the raw JSON object. Do not wrap in markdown or backticks, just raw JSON.`;

      const responseText = await callOpenRouter([code], systemPrompt);
      // Clean potential JSON markdown formatting
      const cleanJson = responseText.replace(/```json\s*/i, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      setSuggestions(parsed.suggestions || []);
      setConsoleOutput(parsed.consoleOutput || 'Audit completed successfully.');
      setMetrics({
        score: String(parsed.score || 90),
        exec: parsed.execTime || '0.05ms',
        memory: parsed.memory || '1.1 MB',
        issues: (parsed.suggestions || []).filter(s => s.type !== 'success').length
      });
    } catch (error) {
      console.error(error);
      setSuggestions([
        { type: 'warning', title: 'Audit Failed', desc: 'Could not fetch analysis suggestions from the AI. Check connection.' }
      ]);
      setConsoleOutput(`> Linter error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action) => {
    setLoading(true);
    try {
      const systemPrompt = `You are an expert AI refactoring tool. Refactor or optimize the provided code in language: ${lang}. 
Return a JSON object with the following schema:
{
  "code": "The newly refactored or optimized code",
  "explanation": "A short summary of what improvements were made and why"
}
Return ONLY the raw JSON object. Do not wrap in markdown or backticks, just raw JSON.`;

      const responseText = await callOpenRouter([code], systemPrompt);
      const cleanJson = responseText.replace(/```json\s*/i, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      if (parsed.code) {
        setCode(parsed.code);
      }
      setSuggestions([
        { type: 'success', title: `${action === 'refactor' ? 'Refactor' : 'Optimization'} Applied`, desc: parsed.explanation || 'Code optimized successfully.' }
      ]);
      setActiveTab('review');
    } catch (error) {
      console.error(error);
      setSuggestions([
        { type: 'warning', title: 'Action Failed', desc: `Could not perform ${action}: ${error.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-6 items-start animate-fadeIn">

      {/* ── LEFT: Dark Code Editor Panel ── */}
      <div className="flex-1 min-w-0 bg-[#1a2035] rounded-2xl overflow-hidden shadow-xl border border-slate-800 flex flex-col">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#141926] border-b border-slate-800">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-2 bg-[#1e2840] border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{LANG_LABELS[lang]}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {langDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-[#1e2840] border border-slate-700 rounded-xl shadow-2xl z-30 py-1 min-w-[140px]">
                {Object.entries(LANG_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => handleLangChange(key)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors ${lang === key ? 'text-[#2563EB] bg-blue-500/10' : 'text-slate-300 hover:bg-slate-700/50'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:brightness-110"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400 cursor-pointer hover:brightness-110"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:brightness-110"></span>
          </div>
        </div>

        {/* Code Area with Syntax Highlighting */}
        <div className="relative flex overflow-hidden" style={{ minHeight: '360px', maxHeight: '420px' }}>
          {/* Line Numbers */}
          <div className="select-none text-right px-3 pt-4 pb-4 text-slate-600 font-mono text-xs leading-relaxed bg-[#141926] border-r border-slate-800 shrink-0" style={{ minWidth: '3rem' }}>
            {code.split('\n').map((_, i) => (
              <div key={i} className="leading-[1.6rem]">{i + 1}</div>
            ))}
          </div>

          {/* Syntax Highlight Layer */}
          <div
            ref={highlightRef}
            className="absolute inset-0 left-12 pointer-events-none font-mono text-xs leading-[1.6rem] p-4 overflow-auto whitespace-pre"
            dangerouslySetInnerHTML={{ __html: highlight(code, lang) }}
            style={{ color: '#c9d1d9' }}
          />

          {/* Transparent Textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={syncScroll}
            className="flex-1 bg-transparent text-transparent caret-[#58a6ff] font-mono text-xs leading-[1.6rem] p-4 resize-none outline-none border-none"
            spellCheck={false}
            style={{ tabSize: 2 }}
          />
        </div>

        {/* Editor Bottom Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#141926] border-t border-slate-800">
          <button
            onClick={runAudit}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            {loading
              ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              : <Play className="w-3.5 h-3.5 fill-current" />
            }
            {loading ? 'Analyzing...' : 'Run Code Audit'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('refactor')}
              disabled={loading}
              className="px-4 py-2 bg-[#1e2840] hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
            >
              Refactor
            </button>
            <button
              onClick={() => handleAction('optimize')}
              disabled={loading}
              className="px-4 py-2 bg-[#1e2840] hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
            >
              Optimize
            </button>
          </div>
        </div>
      </div>

      {/* ── RIGHT: AI Review Panel ── */}
      <div className="w-[340px] shrink-0 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '480px' }}>

        {/* Tab Header */}
        <div className="flex border-b border-slate-100">
          {[
            { id: 'review', label: 'AI Review', icon: Sparkles },
            { id: 'console', label: 'Console Logs', icon: FileText },
            { id: 'metrics', label: 'Metrics', icon: BarChart2 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-[#2563EB] text-[#2563EB] bg-white'
                    : 'border-transparent text-slate-400 hover:text-slate-600 bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 text-left">

          {/* AI Review Tab */}
          {activeTab === 'review' && (
            <div className="space-y-4">
              {loading && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <RefreshCw className="w-4 h-4 text-[#2563EB] animate-spin shrink-0" />
                  <span className="text-xs text-[#2563EB] font-semibold">Analyzing code with AI...</span>
                </div>
              )}
              {!loading && suggestions.map((s, idx) => (
                <div key={idx} className="flex gap-3 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="mt-0.5 shrink-0">
                    {s.type === 'warning' ? (
                      <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      </div>
                    ) : s.type === 'success' ? (
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[#2563EB]" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-800">{s.title}</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Console Logs Tab */}
          {activeTab === 'console' && (
            <div>
              {consoleOutput ? (
                <pre className="font-mono text-[11px] text-emerald-400 bg-[#141926] rounded-xl p-4 leading-relaxed overflow-auto whitespace-pre-wrap">
                  {consoleOutput}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <Terminal className="w-8 h-8 text-slate-200 mb-3" />
                  <p className="text-xs text-slate-400 font-medium">Press <span className="font-bold text-slate-600">Run Code Audit</span> to see console output</p>
                </div>
              )}
            </div>
          )}

          {/* Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black text-[#2563EB]">{metrics.score}<span className="text-base text-slate-400 font-bold">/100</span></div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Linter Score</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
                  <div className="text-lg font-black text-slate-700">{metrics.exec}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Exec Time</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
                  <div className="text-lg font-black text-slate-700">{metrics.memory}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Memory</div>
                </div>
                <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
                  <div className={`text-xl font-black ${metrics.issues === 0 ? 'text-emerald-600' : 'text-amber-500'}`}>{metrics.issues}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Issues Found</div>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] text-emerald-700 font-medium leading-relaxed">
                💡 <strong>Tip:</strong> Lower allocated heap buffers optimizes layout transitions in Next.js Server Components.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Syntax highlight styles */}
      <style>{`
        .code-comment { color: #57a64a; }
        .code-string  { color: #ce9178; }
        .code-keyword { color: #569cd6; font-weight: 600; }
        .code-number  { color: #b5cea8; }
      `}</style>
    </div>
  );
}
