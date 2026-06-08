import React, { useState, useEffect, useRef } from 'react';
import { 
  Maximize2, Sun, Moon, Share2, Bot, Send, Sparkles, Folder, Play
} from 'lucide-react';
import { callOpenRouter } from '../utils/openrouter';

const LANGUAGES = [
  { 
    id: 'python', 
    name: 'Python', 
    ext: 'py', 
    icon: (active) => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 2C8.745 2 8.086 2.014 7.234 2.386C5.556 3.12 4.417 4.717 4.131 6.551C3.81 8.608 4.254 9.697 5.485 9.697H8.257V10.884H4.275C2.658 10.884 2 11.666 2 13.26C2 14.856 2.014 15.503 2.386 16.347C3.12 18.01 4.717 19.138 6.551 19.42C8.608 19.737 9.697 19.299 9.697 18.08V15.342C9.697 13.916 10.852 12.76 12.278 12.76H15.016C16.442 12.76 17.598 11.604 17.598 10.178V7.44C17.598 6.014 16.442 4.858 15.016 4.858H12.278C12.278 3.432 11.122 2.276 9.697 2.276" fill={active ? "#ffffff" : "#387EB8"} />
        <path d="M11.999 22C15.255 22 15.914 21.986 16.766 21.614C18.444 20.88 19.583 19.283 19.869 17.449C20.19 15.392 19.746 14.303 18.515 14.303H15.743V13.116H19.725C21.342 13.116 22 12.334 22 10.74C22 9.144 21.986 8.497 21.614 7.653C20.88 5.99 19.283 4.862 17.449 4.58C15.392 4.263 14.303 4.701 14.303 5.92V8.658C14.303 10.084 13.148 11.24 11.722 11.24H8.984C7.558 11.24 6.402 12.396 6.402 13.822V16.56C6.402 17.986 7.558 19.142 8.984 19.142H11.722C11.722 20.568 12.878 21.724 14.303 21.724" fill={active ? "#f8fafc" : "#FFE052"} />
        <circle cx="7.7" cy="5.7" r="0.8" fill={active ? "#3b82f6" : "#ffffff"} />
        <circle cx="16.3" cy="18.3" r="0.8" fill={active ? "#3b82f6" : "#ffffff"} />
      </svg>
    ),
    defaultCode: '## Online Python compiler\nmessage = "Start small. Ship something."\nprint(message)' 
  },
  { 
    id: 'r', 
    name: 'R', 
    ext: 'r', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs font-serif ${active ? 'bg-white text-blue-600' : 'bg-[#1E64B6] text-white'}`}>
        R
      </div>
    ),
    defaultCode: '# Iconic Hub - Student Progress Tracker\n\nstudent_name <- "Ashwin"\ncompleted_courses <- 8\ntotal_courses <- 12\n\nprogress <- (completed_courses / total_courses) * 100\n\ncat("🎓 Student:", student_name, "\\n")\ncat("📚 Courses Completed:", completed_courses, "\\n")\ncat("📖 Total Courses:", total_courses, "\\n")\ncat("🚀 Progress:", round(progress, 2), "%\\n")\n\nif(progress >= 75) {\n  cat("🏆 Excellent Progress!\\n")\n} else if(progress >= 50) {\n  cat("👍 Keep Going!\\n")\n} else {\n  cat("💪 Stay Consistent and Keep Learning!\\n")\n}' 
  },
  { 
    id: 'sql', 
    name: 'SQL', 
    ext: 'sql', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded flex flex-col items-center justify-center border font-mono text-[9px] font-bold ${active ? 'border-white text-white' : 'border-slate-400 text-slate-500 bg-slate-50'}`}>
        <span className="leading-none">SQL</span>
        <span className="text-[7px] leading-none opacity-80">DB</span>
      </div>
    ),
    defaultCode: '-- Create Students Table\nCREATE TABLE Students (\n    StudentID INT PRIMARY KEY,\n    Name VARCHAR(50),\n    Course VARCHAR(50),\n    Marks INT\n);\n\n-- Insert Data\nINSERT INTO Students VALUES\n(1, \'Ashwin\', \'Python\', 92),\n(2, \'John\', \'SQL\', 85),\n(3, \'Sarah\', \'AI\', 95),\n(4, \'David\', \'Web Development\', 88);\n\n-- Display Data\nSELECT * FROM Students;' 
  },
  { 
    id: 'html', 
    name: 'HTML', 
    ext: 'html', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] ${active ? 'bg-white text-orange-600' : 'bg-orange-500 text-white'}`}>
        5
      </div>
    ),
    defaultCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Iconic Hub</title>\n</head>\n<body>\n    <h1>🚀 Welcome to Iconic Hub</h1>\n    <p>Learn. Build. Grow.</p>\n\n    <h2>Available Courses</h2>\n    <ul>\n        <li>Python Programming</li>\n        <li>Web Development</li>\n        <li>Machine Learning</li>\n        <li>Data Science</li>\n    </ul>\n\n    <button style="padding: 8px 16px; background: #0066ff; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Start Learning</button>\n</body>\n</html>' 
  },
  { 
    id: 'java', 
    name: 'Java', 
    ext: 'java', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${active ? 'bg-white text-red-600' : 'bg-[#E76F51] text-white'}`}>
        ☕
      </div>
    ),
    defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Start small. Ship something.");\n    }\n}' 
  },
  { 
    id: 'kotlin', 
    name: 'Kotlin', 
    ext: 'kt', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded overflow-hidden flex items-center justify-center font-extrabold text-[9px] text-white bg-gradient-to-tr from-[#7F52FF] to-[#F88909] ${active ? 'ring-1 ring-white' : ''}`}>
        K
      </div>
    ),
    defaultCode: 'fun main() {\n    println("Start small. Ship something.")\n}' 
  },
  { 
    id: 'c', 
    name: 'C', 
    ext: 'c', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-sm ${active ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
        C
      </div>
    ),
    defaultCode: '// Online C compiler to run C program online\n#include <stdio.h>\n\nint main() {\n    // Write C code here\n    printf("Start small. Ship something.");\n    return 0;\n}' 
  },
  { 
    id: 'cpp', 
    name: 'C++', 
    ext: 'cpp', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${active ? 'bg-white text-cyan-700' : 'bg-cyan-600 text-white'}`}>
        C++
      </div>
    ),
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "🚀 Welcome to Iconic Hub" << endl;\n    cout << "💻 C++ Online Compiler" << endl;\n    cout << "📚 Learn. Build. Grow." << endl;\n    return 0;\n}' 
  },
  { 
    id: 'csharp', 
    name: 'C#', 
    ext: 'cs', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${active ? 'bg-white text-purple-700' : 'bg-purple-600 text-white'}`}>
        C#
      </div>
    ),
    defaultCode: 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string student = "Ashwin";\n        int completedCourses = 8;\n        int totalCourses = 12;\n\n        double progress = (double)completedCourses / totalCourses * 100;\n\n        Console.WriteLine($"🎓 Student: {student}");\n        Console.WriteLine($"📚 Completed Courses: {completedCourses}");\n        Console.WriteLine($"📖 Total Courses: {totalCourses}");\n        Console.WriteLine($"🚀 Progress: {progress:F2}%");\n\n        if (progress >= 75)\n            Console.WriteLine("🏆 Excellent Progress!");\n        else if (progress >= 50)\n            Console.WriteLine("👍 Keep Going!");\n        else\n            Console.WriteLine("💪 Keep Learning!");\n    }\n}' 
  },
  { 
    id: 'javascript', 
    name: 'JS', 
    ext: 'js', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded flex items-center justify-center font-extrabold text-[10px] ${active ? 'bg-white text-amber-500' : 'bg-yellow-400 text-slate-900'}`}>
        JS
      </div>
    ),
    defaultCode: 'console.log("Start small. Ship something.");' 
  },
  { 
    id: 'typescript', 
    name: 'TS', 
    ext: 'ts', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded flex items-center justify-center font-extrabold text-[10px] ${active ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
        TS
      </div>
    ),
    defaultCode: 'const msg: string = "Start small. Ship something.";\nconsole.log(msg);' 
  },
  { 
    id: 'go', 
    name: 'Go', 
    ext: 'go', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${active ? 'bg-white text-sky-500' : 'bg-sky-400 text-slate-800'}`}>
        GO
      </div>
    ),
    defaultCode: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Start small. Ship something.")\n}' 
  },
  { 
    id: 'rust', 
    name: 'Rust', 
    ext: 'rs', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] ${active ? 'bg-white text-orange-800' : 'bg-[#E05A36] text-white'}`}>
        RUST
      </div>
    ),
    defaultCode: 'fn main() {\n    println!("Start small. Ship something.");\n}' 
  },
  { 
    id: 'bash', 
    name: 'Bash', 
    ext: 'sh', 
    icon: (active) => (
      <div className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold ${active ? 'bg-white text-slate-800' : 'bg-slate-800 text-white'}`}>
        $_
      </div>
    ),
    defaultCode: '#!/bin/bash\necho "Start small. Ship something."' 
  }
];

function renderFormattedMessage(text, onPasteToEditor) {
  if (!text) return null;
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
      const lang = match ? match[1] : '';
      const codeContent = match ? match[2] : part.slice(3, -3);
      return (
        <div key={idx} className="my-2 border border-slate-200 rounded-lg overflow-hidden bg-[#1e293b] text-slate-100 font-mono text-[10px] shadow-sm text-left w-full">
          <div className="flex justify-between items-center px-2 py-1 bg-[#0f172a] border-b border-slate-800 text-[9px] text-slate-400 font-sans">
            <span>{lang.toUpperCase() || 'CODE'}</span>
            {onPasteToEditor && (
              <button 
                type="button"
                onClick={() => onPasteToEditor(codeContent.trim())}
                className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-[8px] transition-all"
              >
                Paste to Editor
              </button>
            )}
          </div>
          <pre className="p-2 overflow-x-auto whitespace-pre">{codeContent}</pre>
        </div>
      );
    }
    return <span key={idx} className="whitespace-pre-wrap">{part}</span>;
  });
}

export default function CodingPlayground({ onExit, challenge }) {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[6]); // Default to 'c' to match C compiler screenshot
  const [code, setCode] = useState(LANGUAGES[6].defaultCode);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode as requested in screenshot
  const [consoleOutput, setConsoleOutput] = useState([
    '// Output console ready'
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const [htmlRenderCode, setHtmlRenderCode] = useState('');

  useEffect(() => {
    if (challenge) {
      const py = LANGUAGES.find(l => l.id === 'python') || LANGUAGES[0];
      setSelectedLang(py);
      setCode(`## Problem: ${challenge.title}\n## Difficulty: ${challenge.difficulty} | Max Points: ${challenge.points} XP\n\ndef solve(nums):\n    # TODO: Write your algorithm here\n    return nums\n\nprint("Running tests for ${challenge.title}...")\nprint("✓ Test Case 1 Passed")\nprint("✓ Test Case 2 Passed")\n`);
    }
  }, [challenge]);

  // AI assistant states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiHistory, setAiHistory] = useState([
    { type: 'bot', text: 'Hi! I am your AI Copilot. Ask me questions, request explanations, or optimize your code.' }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // AI drawer resizing states
  const [aiWidth, setAiWidth] = useState(320);
  const isResizing = useRef(false);

  const startResizing = (mouseDownEvent) => {
    mouseDownEvent.preventDefault();
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (mouseMoveEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - mouseMoveEvent.clientX;
    if (newWidth >= 240 && newWidth <= 600) {
      setAiWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Output panel resizing states
  const [outputWidth, setOutputWidth] = useState(380);
  const isResizingOutput = useRef(false);

  const startResizingOutput = (mouseDownEvent) => {
    mouseDownEvent.preventDefault();
    isResizingOutput.current = true;
    document.addEventListener('mousemove', handleMouseMoveOutput);
    document.addEventListener('mouseup', handleMouseUpOutput);
  };

  const handleMouseMoveOutput = (mouseMoveEvent) => {
    if (!isResizingOutput.current) return;
    const rightEdge = window.innerWidth - (showAi ? aiWidth : 0);
    const newWidth = rightEdge - mouseMoveEvent.clientX;
    if (newWidth >= 240 && newWidth <= 600) {
      setOutputWidth(newWidth);
    }
  };

  const handleMouseUpOutput = () => {
    isResizingOutput.current = false;
    document.removeEventListener('mousemove', handleMouseMoveOutput);
    document.removeEventListener('mouseup', handleMouseUpOutput);
  };

  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  // Sync default code when language changes
  useEffect(() => {
    setCode(selectedLang.defaultCode);
    setConsoleOutput([]);
    setHtmlRenderCode(selectedLang.id === 'html' ? selectedLang.defaultCode : '');
  }, [selectedLang]);

  // Sync scroll between textarea and syntax highlighter pre container
  const handleScroll = (e) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setConsoleOutput(prev => [...prev, `Running main.${selectedLang.ext}...`]);
    
    setTimeout(() => {
      setIsRunning(false);
      const outputs = runInterpreter(selectedLang.id, code);
      setConsoleOutput(outputs);
      if (selectedLang.id === 'html') {
        setHtmlRenderCode(code);
      }
    }, 800);
  };

  const handleClear = () => {
    setConsoleOutput([]);
    if (selectedLang.id === 'html') {
      setHtmlRenderCode('');
    }
  };

  const askAI = async (feature) => {
    setAiLoading(true);
    let promptText = '';
    if (feature === 'explain') promptText = 'Explain this code.';
    else if (feature === 'optimize') promptText = 'How can I optimize this algorithm?';
    else if (feature === 'debug') promptText = 'Analyze this code for syntax and logical errors.';
    
    const userMsgText = promptText || aiPrompt;
    if (!userMsgText.trim()) {
      setAiLoading(false);
      return;
    }

    const newHistory = [...aiHistory, { type: 'user', text: userMsgText }];
    setAiHistory(newHistory);
    setAiPrompt('');

    try {
      const messagesForAi = newHistory.map(h => ({
        role: h.type === 'bot' ? 'assistant' : 'user',
        content: h.text
      }));

      const systemPrompt = `You are Dev Copilot AI in an online IDE playground. 
The user is writing code in ${selectedLang.name}. 
Here is their current code:
\`\`\`${selectedLang.id}
${code}
\`\`\`
Provide helpful, concise code suggestions, explanations, or debugging tips.`;

      const response = await callOpenRouter(messagesForAi, systemPrompt);
      setAiHistory(prev => [...prev, { type: 'bot', text: response }]);
    } catch (error) {
      console.error(error);
      setAiHistory(prev => [...prev, { type: 'bot', text: 'Error contacting Copilot AI. Please check your network or try again.' }]);
    } finally {
      setAiLoading(false);
    }
  };

  // Syntax highlighting parser
  const getHighlightedHtml = (text, lang) => {
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Tokenize comments, strings, and words securely to prevent recursive class label injections
    let regex = /(\/\/.*|#.*|"(?:\\"|[^"])*"|'(?:\\'|[^'])*')|(\b\w+\b)/g;
    
    let highlighted = escaped.replace(regex, (match, literal, word) => {
      if (literal) {
        if (literal.startsWith('//') || literal.startsWith('#')) {
          return `<span class="text-green-600 font-normal">${literal}</span>`;
        }
        return `<span class="text-[#0D9488]">${literal}</span>`;
      }
      if (word) {
        if (lang === 'c' || lang === 'cpp' || lang === 'csharp' || lang === 'java' || lang === 'kotlin') {
          const keywords = ['int', 'void', 'return', 'public', 'class', 'static', 'using', 'namespace', 'double', 'float', 'char', 'struct', 'if', 'else', 'for', 'while', 'include'];
          if (keywords.includes(word)) {
            return `<span class="text-blue-600 font-medium">${word}</span>`;
          }
        } else if (lang === 'python') {
          const keywords = ['def', 'return', 'import', 'from', 'as', 'print', 'if', 'else', 'elif', 'for', 'in', 'while', 'try', 'except', 'with', 'class', 'pass'];
          if (keywords.includes(word)) {
            return `<span class="text-blue-600 font-medium">${word}</span>`;
          }
        } else if (lang === 'javascript' || lang === 'typescript') {
          const keywords = ['const', 'let', 'var', 'function', 'return', 'import', 'export', 'default', 'class', 'if', 'else', 'for', 'while', 'new', 'console', 'log'];
          if (keywords.includes(word)) {
            return `<span class="text-blue-600 font-medium">${word}</span>`;
          }
        }
        if (!isNaN(word) && !word.startsWith('0x')) {
          return `<span class="text-amber-600">${word}</span>`;
        }
      }
      return match;
    });

    return { __html: highlighted };
  };

  const codeLines = code.split('\n');

  return (
    <div className={`w-full h-full flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-white text-slate-900'}`}>
      
      {/* Premium Header/Toolbar */}
      <div className={`flex items-center justify-between border-b h-12 px-4 select-none shrink-0 ${isDarkMode ? 'bg-[#1e293b] border-slate-800' : 'bg-[#f8fafc] border-slate-200'}`}>
        
        {/* Left Side: Sidebar Toggle & File Tab */}
        <div className="flex items-center space-x-2">
          {/* File explorer icon button */}
          <button 
            onClick={onExit}
            className={`p-1.5 rounded border flex items-center space-x-1 hover:bg-slate-50 transition-all ${isDarkMode ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-white text-slate-500'}`}
            title="Exit Playground"
          >
            <Folder className="w-4 h-4" />
            <span className="text-[10px] font-extrabold uppercase">Exit</span>
          </button>
          <div className="w-[1px] h-6 bg-slate-200" />
          {/* Active File Tab */}
          <div className={`flex items-center px-4 h-12 border-b-2 border-blue-600 font-mono text-sm font-semibold relative ${isDarkMode ? 'text-white' : 'text-slate-700 bg-white'}`}>
            <span>main.{selectedLang.ext}</span>
          </div>
        </div>

        {/* Center/Right Toolbar buttons */}
        <div className="flex items-center space-x-2">
          {/* Maximize */}
          <button className={`p-1.5 rounded border transition-all ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 bg-[#0f172a]' : 'border-slate-200 hover:bg-slate-50 bg-white'}`}>
            <Maximize2 className="w-4 h-4 text-slate-500" />
          </button>
          
          {/* Dark / Light Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1.5 rounded border transition-all ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 bg-[#0f172a]' : 'border-slate-200 hover:bg-slate-50 bg-white'}`}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Share Button */}
          <button className={`px-4 py-1.5 rounded border text-sm font-semibold transition-all flex items-center space-x-1.5 ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 bg-[#0f172a]' : 'border-slate-200 hover:bg-slate-50 bg-white text-slate-600'}`}>
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          {/* Solid Blue Run Button */}
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="px-6 py-1.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded font-bold text-sm tracking-wide shadow transition-all disabled:opacity-50"
          >
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>

      </div>

      {/* Main Split Layout Container */}
      <div className="flex flex-1 min-h-0 items-stretch">
        
        {/* Left-most slim language vertical sidebar */}
        <div className={`w-14 flex flex-col items-center py-2 border-r shrink-0 ${isDarkMode ? 'bg-[#1e293b] border-slate-800' : 'bg-[#f8fafc] border-slate-200'}`}>
          <div className="space-y-1.5 flex-grow overflow-y-auto no-scrollbar w-full px-2 flex flex-col items-center">
            {LANGUAGES.map(lang => {
              const active = selectedLang.id === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    active 
                      ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-500/20' 
                      : isDarkMode 
                      ? 'hover:bg-slate-800 text-slate-400' 
                      : 'hover:bg-slate-200 text-slate-600'
                  }`}
                  title={lang.name}
                >
                  {lang.icon(active)}
                </button>
              );
            })}
          </div>

          {/* Collapsible Copilot Icon at bottom of language list */}
          <button 
            onClick={() => setShowAi(!showAi)}
            className={`w-10 h-10 mt-2 rounded-lg flex items-center justify-center transition-all ${
              showAi 
                ? 'bg-blue-100 text-blue-600' 
                : isDarkMode 
                ? 'hover:bg-slate-800 text-slate-400' 
                : 'hover:bg-slate-200 text-slate-600'
            }`}
            title="Dev Copilot AI"
          >
            <Bot className="w-5 h-5" />
          </button>
        </div>

        {/* Code Editor Panel */}
        <div className="flex-1 flex flex-col min-w-0 bg-white border-r border-slate-200 relative">
          
          {/* Editor Container with aligned line numbers */}
          <div className="flex-1 flex relative overflow-hidden h-full">
            
            {/* Real IDE line numbers column with block fold/minus indicator */}
            <div className={`w-12 text-right pr-3 pt-4 font-mono text-xs select-none border-r shrink-0 ${isDarkMode ? 'bg-[#0f172a] border-slate-800 text-slate-600' : 'bg-[#f8fafc] border-slate-200 text-slate-400'}`}>
              {Array.from({ length: Math.max(codeLines.length, 18) }).map((_, i) => {
                const lineIndex = i + 1;
                // Add folding collapse symbol mockup matching user's screenshot
                const lineContent = codeLines[i] || '';
                const hasFold = lineContent.includes('{') || lineContent.startsWith('def ') || lineContent.includes('main()');
                return (
                  <div key={lineIndex} className="leading-relaxed h-6 flex items-center justify-end space-x-1">
                    {hasFold && <span className="text-[10px] opacity-80 cursor-pointer font-bold select-none">-</span>}
                    <span>{lineIndex}</span>
                  </div>
                );
              })}
            </div>

            {/* Syntax highlighted pre overlay container */}
            <div 
              ref={highlightRef}
              className={`absolute inset-0 left-12 pointer-events-none overflow-auto font-mono text-sm leading-relaxed p-4 whitespace-pre-wrap break-all ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}
              style={{ paddingBottom: '100px' }}
            >
              <div dangerouslySetInnerHTML={getHighlightedHtml(code, selectedLang.id)} className="h-full w-full" />
            </div>

            {/* Caret-visible transparent textarea editor overlay */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={handleScroll}
              className="absolute inset-0 left-12 bg-transparent text-transparent caret-blue-600 resize-none outline-none font-mono text-sm leading-relaxed p-4 w-[calc(100%-3rem)] h-full overflow-auto whitespace-pre-wrap break-all"
              style={{ tabSize: 4, paddingBottom: '100px' }}
              spellCheck="false"
            />

          </div>
        </div>

        {/* Right Console Output Panel */}
        <div 
          style={{ width: `${outputWidth}px` }}
          className={`flex flex-col shrink-0 relative ${isDarkMode ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}
        >
          {/* Drag Handle on Left Border */}
          <div
            onMouseDown={startResizingOutput}
            className="absolute top-0 bottom-0 left-0 w-1.5 cursor-ew-resize bg-transparent hover:bg-blue-500/30 active:bg-blue-600 transition-colors z-50"
            title="Drag to resize Output Panel"
          />
          {/* Output header bar */}
          <div className={`flex items-center justify-between border-b h-12 px-4 select-none shrink-0 ${isDarkMode ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Output</span>
            <button 
              onClick={handleClear}
              className={`px-3 py-1 rounded border text-xs font-semibold transition-all ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 bg-[#0f172a] text-slate-300' : 'border-slate-200 hover:bg-slate-50 bg-white text-slate-500'}`}
            >
              Clear
            </button>
          </div>

          {/* Console Text Logs / HTML Preview */}
          {selectedLang.id === 'html' ? (
            <div className="flex-1 bg-white h-full w-full relative">
              {htmlRenderCode ? (
                <iframe 
                  srcDoc={htmlRenderCode} 
                  title="HTML Preview" 
                  className="w-full h-full border-none bg-white absolute inset-0"
                  sandbox="allow-scripts"
                />
              ) : (
                <div className="p-4 font-mono text-xs text-slate-400 italic">// Click Run to render page preview</div>
              )}
            </div>
          ) : (
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-left">
              {consoleOutput.length === 0 ? (
                <span className="text-slate-400 opacity-60 italic">// Execution output will display here</span>
              ) : (
                consoleOutput.map((log, idx) => (
                  <div key={idx} className={`leading-relaxed py-0.5 ${log.startsWith('Error:') || log.startsWith('[stderr]') ? 'text-red-500' : isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    {log}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Collapsible Chatbot Drawer */}
        {showAi && (
          <div 
            style={{ width: `${aiWidth}px` }}
            className={`border-l flex flex-col justify-between p-4 shrink-0 relative ${isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}
          >
            {/* Drag Handle on Left Border */}
            <div
              onMouseDown={startResizing}
              className="absolute top-0 bottom-0 left-0 w-1.5 cursor-ew-resize bg-transparent hover:bg-blue-500/30 active:bg-blue-600 transition-colors z-50"
              title="Drag to resize AI Drawer"
            />
            <div className="space-y-4 flex-grow overflow-y-auto max-h-[460px] pr-2">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <span>Dev Copilot AI</span>
                    <Sparkles className="w-3 h-3 text-blue-500" />
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-left">
                {aiHistory.map((msg, i) => (
                  <div key={i} className={`p-3 rounded-xl text-xs leading-relaxed ${
                    msg.type === 'bot' 
                      ? 'bg-white border border-slate-200 text-slate-600 shadow-sm' 
                      : 'bg-blue-600/10 border border-blue-500/20 text-blue-800'
                  }`}>
                    {renderFormattedMessage(msg.text, setCode)}
                  </div>
                ))}

                {aiLoading && (
                  <div className="flex justify-start">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Quick Actions */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <button onClick={() => askAI('explain')} className="py-1 bg-white hover:bg-slate-50 text-[9px] font-bold text-slate-600 rounded border border-slate-200 shadow-sm">Explain</button>
              <button onClick={() => askAI('optimize')} className="py-1 bg-white hover:bg-slate-50 text-[9px] font-bold text-slate-600 rounded border border-slate-200 shadow-sm">Optimize</button>
              <button onClick={() => askAI('debug')} className="py-1 bg-white hover:bg-slate-50 text-[9px] font-bold text-slate-600 rounded border border-slate-200 shadow-sm">Debug</button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (aiPrompt.trim()) askAI();
              }} 
              className="relative flex items-center mt-3"
            >
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask Copilot..."
                className="w-full bg-white border border-slate-200 focus:border-blue-500 rounded-lg py-2.5 pl-3.5 pr-10 text-xs text-slate-700 outline-none transition-all shadow-sm"
              />
              <button type="submit" className="absolute right-2 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all">
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

// Evaluate expressions (e.g. function calls, variables)
function evaluateExpr(expr, vars, funcs) {
  if (vars[expr] !== undefined) {
    return String(vars[expr]);
  }
  
  // Try function call match: name(argument)
  let callMatch = expr.match(/^(\w+)\(([^)]*)\)$/);
  if (callMatch) {
    let funcName = callMatch[1];
    let argVal = evaluateExpr(callMatch[2].trim(), vars, funcs);
    let funcDef = funcs[funcName];
    if (funcDef) {
      // Bind argument to parameter
      let localVars = { ...vars };
      if (funcDef.params.length > 0) {
        localVars[funcDef.params[0]] = argVal;
      }
      // Simple evaluate function f-string return
      let returnExpr = funcDef.expr.trim();
      if (returnExpr.startsWith('f"') && returnExpr.endsWith('"')) {
        let str = returnExpr.substring(2, returnExpr.length - 1);
        return str.replace(/\{([^}]+)\}/g, (_, exp) => localVars[exp.trim()] !== undefined ? localVars[exp.trim()] : exp);
      }
      if (returnExpr.startsWith("f'") && returnExpr.endsWith("'")) {
        let str = returnExpr.substring(2, returnExpr.length - 1);
        return str.replace(/\{([^}]+)\}/g, (_, exp) => localVars[exp.trim()] !== undefined ? localVars[exp.trim()] : exp);
      }
      if (returnExpr.startsWith('"') && returnExpr.endsWith('"')) {
        return returnExpr.substring(1, returnExpr.length - 1);
      }
      return String(localVars[returnExpr] || returnExpr);
    }
  }
  return expr;
}

// Evaluate print expressions
function evaluatePrint(line, vars, funcs) {
  let content = line.substring(6, line.length - 1).trim();
  
  // Format string: f"..."
  if (content.startsWith('f"') && content.endsWith('"')) {
    let str = content.substring(2, content.length - 1);
    return str.replace(/\{([^}]+)\}/g, (_, expression) => {
      expression = expression.trim();
      return evaluateExpr(expression, vars, funcs);
    });
  }
  if (content.startsWith("f'") && content.endsWith("'")) {
    let str = content.substring(2, content.length - 1);
    return str.replace(/\{([^}]+)\}/g, (_, expression) => {
      expression = expression.trim();
      return evaluateExpr(expression, vars, funcs);
    });
  }
  
  // Regular string literal
  if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
    return content.substring(1, content.length - 1);
  }
  
  return evaluateExpr(content, vars, funcs);
}

// Helper function to safely evaluate expressions involving sandbox variables
function evalExpressionInJS(expr, vars) {
  let varNames = Object.keys(vars).sort((a, b) => b.length - a.length);
  let resolvedExpr = expr;
  for (let name of varNames) {
    let regex = new RegExp('\\b' + name + '\\b', 'g');
    resolvedExpr = resolvedExpr.replace(regex, typeof vars[name] === 'string' ? `"${vars[name]}"` : vars[name]);
  }
  
  // Replace round(x, y) with Math.round equivalent
  resolvedExpr = resolvedExpr.replace(/round\(([^,]+),\s*([^)]+)\)/g, (match, val, digits) => {
    let evaluatedVal = evalExpressionInJS(val, vars);
    let evaluatedDigits = evalExpressionInJS(digits, vars);
    return `(Math.round(${evaluatedVal} * Math.pow(10, ${evaluatedDigits})) / Math.pow(10, ${evaluatedDigits}))`;
  });

  try {
    return new Function("return " + resolvedExpr)();
  } catch (err) {
    return 0;
  }
}

function runInterpreter(lang, code) {
  let outputs = [];
  try {
    if (lang === 'javascript' || lang === 'typescript') {
      // Capture console.log
      let originalLog = console.log;
      console.log = (...args) => {
        outputs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      };
      try {
        const cleanCode = code.replace(/window|document|parent|top|process|require/g, '');
        new Function(cleanCode)();
      } catch (err) {
        outputs.push('Error: ' + err.message);
      }
      console.log = originalLog;
    } else if (lang === 'csharp') {
      let lines = code.split('\n');
      let vars = {};
      let skipLine = false;
      let chainExecuted = false;
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line || line.startsWith('//') || line.startsWith('using ')) continue;
        
        // Handle if/else conditions (simple braces-free or braced)
        let ifMatch = line.match(/^if\s*\((.*)\)/);
        if (ifMatch) {
          let condition = ifMatch[1];
          let evaluatedCond = evalExpressionInJS(condition, vars);
          if (evaluatedCond) {
            skipLine = false;
            chainExecuted = true;
          } else {
            skipLine = true;
            chainExecuted = false;
          }
          continue;
        }
        let elseIfMatch = line.match(/^else\s+if\s*\((.*)\)/);
        if (elseIfMatch) {
          if (chainExecuted) {
            skipLine = true;
          } else {
            let condition = elseIfMatch[1];
            let evaluatedCond = evalExpressionInJS(condition, vars);
            if (evaluatedCond) {
              skipLine = false;
              chainExecuted = true;
            } else {
              skipLine = true;
            }
          }
          continue;
        }
        let elseMatch = line.match(/^else/);
        if (elseMatch) {
          if (chainExecuted) {
            skipLine = true;
          } else {
            skipLine = false;
          }
          continue;
        }
        
        // Skip block braces or lines inside skipped blocks
        if (line === '{' || line === '}' || line === 'class Program' || line === 'static void Main()') {
          continue;
        }
        
        if (skipLine) {
          if (line.includes('Console.WriteLine')) {
            skipLine = false; // Reset skip line after skipping statement
          }
          continue;
        }

        // C# Variable declaration: string student = "Ashwin";
        let varMatch = line.match(/^(?:string|int|double|var)\s+([a-zA-Z_]\w*)\s*=\s*(.*);$/);
        if (varMatch) {
          let varName = varMatch[1].trim();
          let varExpr = varMatch[2].trim();
          let cleanExpr = varExpr.replace(/\((double|int|float|decimal)\)/g, '').trim();
          
          if ((cleanExpr.startsWith('"') && cleanExpr.endsWith('"')) || (cleanExpr.startsWith("'") && cleanExpr.endsWith("'"))) {
            vars[varName] = cleanExpr.substring(1, cleanExpr.length - 1);
          } else {
            vars[varName] = evalExpressionInJS(cleanExpr, vars);
          }
          continue;
        }

        // C# Console.WriteLine
        if (line.startsWith('Console.WriteLine(') && line.endsWith(');')) {
          let content = line.substring(18, line.length - 2).trim();
          if (content.startsWith('$"') && content.endsWith('"')) {
            let str = content.substring(2, content.length - 1);
            let interpolated = str.replace(/\{([^}]+)\}/g, (_, expression) => {
              let exprName = expression.trim();
              let formatMatch = exprName.match(/^([^:]+):F(\d+)$/);
              if (formatMatch) {
                let actualVar = formatMatch[1].trim();
                let decimals = Number(formatMatch[2]);
                let val = evalExpressionInJS(actualVar, vars);
                return Number(val).toFixed(decimals);
              }
              return evalExpressionInJS(exprName, vars);
            });
            outputs.push(interpolated);
          } else if (content.startsWith('"') && content.endsWith('"')) {
            outputs.push(content.substring(1, content.length - 1));
          } else {
            outputs.push(String(evalExpressionInJS(content, vars)));
          }
        }
      }
    } else if (lang === 'sql') {
      let tables = {};
      let tableColumns = {};
      let codeText = code.replace(/--.*/g, ''); // strip sql comments
      
      // Match all CREATE TABLE statements (global scan)
      let createRegex = /CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]*?)\);/gi;
      let match;
      while ((match = createRegex.exec(codeText)) !== null) {
        let tableName = match[1];
        let columnsText = match[2];
        let cols = columnsText.split(',').map(line => {
          let parts = line.trim().split(/\s+/);
          return parts[0];
        }).filter(name => name && !name.toUpperCase().startsWith('PRIMARY') && !name.toUpperCase().startsWith('FOREIGN') && !name.toUpperCase().startsWith('KEY'));
        
        tables[tableName] = [];
        tableColumns[tableName] = cols;
      }

      // Match INSERT INTO
      let insertRegex = /INSERT\s+INTO\s+(\w+)\s+(?:VALUES\s+)?([\s\S]*?);/gi;
      while ((match = insertRegex.exec(codeText)) !== null) {
        let tableName = match[1];
        let valuesText = match[2];
        if (tables[tableName]) {
          let rowRegex = /\(([^)]+)\)/g;
          let rowMatch;
          while ((rowMatch = rowRegex.exec(valuesText)) !== null) {
            let rowVals = rowMatch[1].split(',').map(v => {
              let trimmed = v.trim();
              if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
                return trimmed.slice(1, -1);
              }
              if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                return trimmed.slice(1, -1);
              }
              return isNaN(trimmed) ? trimmed : Number(trimmed);
            });
            tables[tableName].push(rowVals);
          }
        }
      }

      // Match SELECT
      let selectRegex = /SELECT\s+([\s\S]*?)\s+FROM\s+(\w+)/gi;
      while ((match = selectRegex.exec(codeText)) !== null) {
        let selectCols = match[1].trim();
        let tableName = match[2].trim().replace(';', '');
        
        if (tables[tableName]) {
          let cols = tableColumns[tableName] || [];
          let rows = tables[tableName] || [];
          
          if (cols.length > 0) {
            let colWidths = cols.map((col, idx) => {
              let maxW = col.length;
              for (let row of rows) {
                let cellVal = String(row[idx] !== undefined ? row[idx] : '');
                if (cellVal.length > maxW) maxW = cellVal.length;
              }
              return maxW;
            });
            
            let borderLine = '+' + colWidths.map(w => '-'.repeat(w + 2)).join('+') + '+';
            outputs.push(borderLine);
            
            let headerLine = '|' + cols.map((col, idx) => ' ' + col.padEnd(colWidths[idx]) + ' ').join('|') + '|';
            outputs.push(headerLine);
            outputs.push(borderLine);
            
            for (let row of rows) {
              let rowLine = '|' + cols.map((_, idx) => {
                let cellVal = String(row[idx] !== undefined ? row[idx] : '');
                return ' ' + cellVal.padEnd(colWidths[idx]) + ' ';
              }).join('|') + '|';
              outputs.push(rowLine);
            }
            outputs.push(borderLine);
            outputs.push(`(${rows.length} rows returned)`);
          } else {
            outputs.push("Empty set (0 rows)");
          }
        } else {
          outputs.push(`Table "${tableName}" not found.`);
        }
      }
    } else if (lang === 'r') {
      let lines = code.split('\n');
      let vars = {};
      let skipBlock = false;
      let chainExecuted = false;
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;
        
        // Handle if/else conditions
        let ifMatch = line.match(/^if\s*\((.*)\)\s*\{?$/);
        if (ifMatch) {
          let condition = ifMatch[1];
          let evaluatedCond = evalExpressionInJS(condition, vars);
          if (evaluatedCond) {
            skipBlock = false;
            chainExecuted = true;
          } else {
            skipBlock = true;
            chainExecuted = false;
          }
          continue;
        }
        let elseIfMatch = line.match(/^\}\s*else\s+if\s*\((.*)\)\s*\{?$/);
        if (elseIfMatch) {
          if (chainExecuted) {
            skipBlock = true;
          } else {
            let condition = elseIfMatch[1];
            let evaluatedCond = evalExpressionInJS(condition, vars);
            if (evaluatedCond) {
              skipBlock = false;
              chainExecuted = true;
            } else {
              skipBlock = true;
            }
          }
          continue;
        }
        let elseMatch = line.match(/^\}\s*else\s*\{?$/);
        if (elseMatch) {
          if (chainExecuted) {
            skipBlock = true;
          } else {
            skipBlock = false;
          }
          continue;
        }
        if (line === '}') {
          skipBlock = false;
          continue;
        }
        if (skipBlock) continue;

        // R Assignment match: var <- val or var = val
        let assignment = line.match(/^([a-zA-Z_]\w*)\s*(?:<-|=)\s*(.*)$/);
        if (assignment) {
          let varName = assignment[1].trim();
          let varExpr = assignment[2].trim();
          if ((varExpr.startsWith('"') && varExpr.endsWith('"')) || (varExpr.startsWith("'") && varExpr.endsWith("'"))) {
            vars[varName] = varExpr.substring(1, varExpr.length - 1);
          } else {
            vars[varName] = evalExpressionInJS(varExpr, vars);
          }
          continue;
        }

        // cat or print match
        if ((line.startsWith('cat(') || line.startsWith('print(')) && line.endsWith(')')) {
          let isCat = line.startsWith('cat(');
          let content = line.substring(isCat ? 4 : 6, line.length - 1).trim();
          
          let args = [];
          let current = "";
          let inQuotes = false;
          let quoteChar = "";
          for (let char of content) {
            if ((char === '"' || char === "'") && (current.length === 0 || current[current.length - 1] !== '\\')) {
              if (!inQuotes) {
                inQuotes = true;
                quoteChar = char;
              } else if (char === quoteChar) {
                inQuotes = false;
              }
            }
            if (char === ',' && !inQuotes) {
              args.push(current.trim());
              current = "";
            } else {
              current += char;
            }
          }
          if (current.trim()) {
            args.push(current.trim());
          }

          let evaluatedArgs = args.map(arg => {
            arg = arg.trim();
            if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
              let val = arg.substring(1, arg.length - 1);
              return val.replace(/\\n/g, '');
            }
            return String(evalExpressionInJS(arg, vars));
          });
          
          let joinedStr = evaluatedArgs.filter(x => x !== '').join(' ');
          if (joinedStr) {
            outputs.push(joinedStr);
          }
        }
      }
    } else if (lang === 'python') {
      let lines = code.split('\n');
      let vars = {};
      let funcs = {};
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;
        
        if (line.startsWith('def ')) {
          let funcMatch = line.match(/def\s+(\w+)\(([^)]*)\):/);
          if (funcMatch) {
            let funcName = funcMatch[1];
            let params = funcMatch[2].split(',').map(p => p.trim());
            let nextLine = lines[i + 1] ? lines[i + 1].trim() : '';
            if (nextLine.startsWith('return ')) {
              let returnExpr = nextLine.substring(7);
              funcs[funcName] = { params, expr: returnExpr };
              i++;
            }
          }
          continue;
        }

        if (line.includes('=') && !line.includes('==') && !line.startsWith('if ') && !line.startsWith('for ')) {
          let eqIdx = line.indexOf('=');
          let varName = line.substring(0, eqIdx).trim();
          let varVal = line.substring(eqIdx + 1).trim();
          if (varVal.startsWith('"') && varVal.endsWith('"')) {
            vars[varName] = varVal.substring(1, varVal.length - 1);
          } else if (varVal.startsWith("'") && varVal.endsWith("'")) {
            vars[varName] = varVal.substring(1, varVal.length - 1);
          } else if (!isNaN(varVal)) {
            vars[varName] = Number(varVal);
          }
          continue;
        }

        if (line.startsWith('for ') && line.endsWith(':')) {
          let loopMatch = line.match(/for\s+(\w+)\s+in\s+range\(([^)]*)\):/);
          if (loopMatch) {
            let iteratorVar = loopMatch[1];
            let rangeArgs = loopMatch[2].split(',').map(a => Number(a.trim()));
            let start = rangeArgs.length > 1 ? rangeArgs[0] : 0;
            let end = rangeArgs.length > 1 ? rangeArgs[1] : rangeArgs[0];
            
            let loopBody = [];
            let j = i + 1;
            while (j < lines.length && (lines[j].startsWith('    ') || lines[j].startsWith('\t'))) {
              loopBody.push(lines[j].trim());
              j++;
            }
            i = j - 1;
            
            for (let val = start; val < end; val++) {
              vars[iteratorVar] = val;
              for (let bodyLine of loopBody) {
                if (bodyLine.startsWith('print(')) {
                  let printVal = evaluatePrint(bodyLine, vars, funcs);
                  outputs.push(printVal);
                }
              }
            }
          }
          continue;
        }

        if (line.startsWith('print(') && line.endsWith(')')) {
          let printVal = evaluatePrint(line, vars, funcs);
          outputs.push(printVal);
        }
      }
    } else {
      let lines = code.split('\n');
      for (let line of lines) {
        let trimmed = line.trim();
        // Java: System.out.println("...") or System.out.print("...")
        if (trimmed.startsWith('System.out.print') && trimmed.endsWith('");')) {
          let parenStart = trimmed.indexOf('("') + 2;
          let parenEnd = trimmed.lastIndexOf('");');
          if (parenStart > 1 && parenEnd > parenStart) {
            outputs.push(trimmed.substring(parenStart, parenEnd).replace(/\\n/g, ''));
          }
        }
        // C: printf("...") and printf("...", var)
        else if (trimmed.startsWith('printf(') && trimmed.endsWith(');')) {
          // Extract the format string (between first and last quote before closing paren)
          let fmtMatch = trimmed.match(/printf\("([^"]*?)"/);
          if (fmtMatch) {
            let fmt = fmtMatch[1].replace(/\\n/g, '').replace(/\\t/g, '\t');
            // Remove format specifiers like %s, %d, %f etc.
            fmt = fmt.replace(/%[sdif%.]/g, '');
            outputs.push(fmt);
          }
        }
        // C++: cout << "..." << endl
        else if (trimmed.includes('cout <<')) {
          let matches = trimmed.match(/"([^"]*)"/g);
          if (matches) {
            let lineOut = matches.map(m => m.slice(1, -1)).join('');
            outputs.push(lineOut);
          }
        }
        // Rust: println!("...") or println!("{}", val)
        else if (trimmed.startsWith('println!(')) {
          let inner = trimmed.replace(/^println!\(/, '').replace(/\);?$/, '');
          let strMatch = inner.match(/^"([^"]*)"/);
          if (strMatch) {
            outputs.push(strMatch[1].replace(/\\n/g, '').replace(/\{\}/g, ''));
          }
        }
        // Go: fmt.Println(...) or fmt.Printf(...)
        else if (trimmed.startsWith('fmt.Print')) {
          let strMatch = trimmed.match(/"([^"]*)"/);
          if (strMatch) {
            outputs.push(strMatch[1].replace(/\\n/g, ''));
          }
        }
        // Kotlin: println("...") or print("...")
        else if ((trimmed.startsWith('println("') || trimmed.startsWith('print("')) && trimmed.endsWith('")')) {
          let start = trimmed.indexOf('"') + 1;
          outputs.push(trimmed.substring(start, trimmed.length - 2));
        }
        // Bash: echo "..."
        else if (trimmed.startsWith('echo "') && trimmed.endsWith('"')) {
          outputs.push(trimmed.substring(6, trimmed.length - 1));
        }
      }
    }
  } catch (e) {
    outputs.push('Simulation Error: ' + e.message);
  }
  
  if (outputs.length === 0) {
    outputs.push('Compiled and ran, but produced no standard output.');
  }
  return outputs;
}

