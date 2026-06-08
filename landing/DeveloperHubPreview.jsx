import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Code2, ArrowUpRight, Play, Check, CheckCircle2, Cpu, Activity, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const [typedCode, setTypedCode] = useState("");

  const sectionRef = useRef(null);
  const editorRef = useRef(null);
  const buttonRef = useRef(null);

  const fileData = MOCK_FILES[activeLang];

  // Code typing simulation
  useEffect(() => {
    let active = true;
    setTypedCode("");
    const codeString = fileData.code;
    let i = 0;
    const interval = setInterval(() => {
      if (!active) return;
      if (i < codeString.length) {
        setTypedCode(codeString.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 12);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [activeLang]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for the text content
      gsap.fromTo(".anim-badge", 
        { scale: 0.8, opacity: 0, y: 20 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Headline Split-Text Reveal
      gsap.fromTo(".anim-heading-line", 
        { y: 35, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Description & Checklist Items Staggered
      gsap.fromTo(".anim-text-item", 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // 4. Centerpiece Editor Reveal Animation
      gsap.fromTo(editorRef.current,
        { opacity: 0, scale: 0.92, y: 50, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: editorRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRunCode = () => {
    if (running) return;
    setRunning(true);
    setOutputVisible(false);
    
    // Simulate compilation thread in console logs
    gsap.fromTo(".terminal-text", 
      { opacity: 0.5 }, 
      { opacity: 1, duration: 0.2, repeat: 3, yoyo: true }
    );

    setTimeout(() => {
      setRunning(false);
      setOutputVisible(true);
      // Stagger animate lines of code output
      gsap.fromTo(".terminal-output-line",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }, 1000);
  };

  // 3D Mouse Parallax effect on Editor
  const handleMouseMove = (e) => {
    const card = editorRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const angleX = (yc - y) / 45; // max tilt degrees
    const angleY = (x - xc) / 45;

    gsap.to(card, {
      transform: `perspective(1200px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.01, 1.01, 1.01)`,
      boxShadow: "0 25px 60px -15px rgba(110, 46, 216, 0.15)",
      borderColor: "rgba(110, 46, 216, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const card = editorRef.current;
    if (!card) return;
    gsap.to(card, {
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)",
      borderColor: "rgba(30, 41, 59, 1)",
      duration: 0.5,
      ease: "power2.out"
    });
  };

  // Simple custom highlight logic for typed code
  const highlightCode = (rawCode) => {
    const keywords = ["function", "const", "let", "mut", "return", "def", "import", "fn", "println!", "console.log", "print"];
    let lines = rawCode.split('\n');
    return lines.map((line, idx) => {
      if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
        return <div key={idx} className="text-slate-500">{line}</div>;
      }
      let parts = line.split(/(\s+|,|\(|\)|\{|\}|\[|\]|;)/);
      return (
        <div key={idx} className="min-h-[1.2rem]">
          {parts.map((part, pIdx) => {
            if (keywords.includes(part)) {
              return <span key={pIdx} className="text-[#a78bfa] font-bold">{part}</span>;
            }
            if (!isNaN(part) && part.trim() !== "") {
              return <span key={pIdx} className="text-blue-500">{part}</span>;
            }
            if (part.startsWith('"') || part.startsWith("'") || part.endsWith('"') || part.endsWith("'")) {
              return <span key={pIdx} className="text-emerald-400">{part}</span>;
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <section ref={sectionRef} className="py-28 px-4 md:px-8 bg-white relative text-[#0F172A] overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Descriptions */}
        <div className="lg:col-span-5 text-left space-y-8 relative z-10">
          <div className="anim-badge inline-flex items-center space-x-2 bg-[#6E2ED8]/10 border border-[#6E2ED8]/20 rounded-xl py-1.5 px-4">
            <Code2 className="w-4 h-4 text-[#6E2ED8]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6E2ED8]">Developer Hub</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl sm:text-5xl font-black text-[#0B1530] tracking-tight leading-none overflow-hidden">
              <span className="anim-heading-line block">Code and Compile</span>
              <span className="anim-heading-line block text-transparent bg-clip-text bg-gradient-to-r from-[#6E2ED8] to-[#9F66FF]">Right in Your Browser</span>
            </h3>

            <p className="anim-text-item text-[#64748B] font-medium text-lg leading-relaxed">
              Forget about configuring complex local development containers. Build applications, complete interactive tasks, study system APIs, and view deployment assets directly in a fully-sandboxed environment.
            </p>
          </div>

          <ul className="space-y-4 text-base text-[#0B1530] font-semibold">
            {["Rich interactive web editor with syntax checking", "Instant terminal output for multiple languages", "1-click deploy to sandbox preview pages"].map((item, idx) => (
              <li key={idx} className="anim-text-item flex items-center space-x-3.5">
                <span className="p-1 bg-emerald-100/80 rounded-lg text-emerald-600 shadow-sm">
                  <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="anim-text-item pt-2">
            <Link 
              to="/dashboard"
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-[#6E2ED8] hover:bg-[#5921B6] text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-purple-600/30 transform hover:-translate-y-0.5 active:scale-95 text-base"
            >
              <span>Explore Dev Hub</span>
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Right Column: Code Editor Mock Container */}
        <div className="lg:col-span-7 w-full relative z-20 flex justify-center items-center py-10">
          
          {/* Editor Sandbox Wrapper */}
          <div 
            ref={editorRef}
            className="bg-[#070913] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 flex flex-col h-[420px] w-full relative group transition-all duration-500 ease-out"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Editor Top Bar Tabs */}
            <div className="flex items-center justify-between bg-slate-950 px-5 py-3.5 border-b border-slate-900/60 select-none">
              <div className="flex space-x-2">
                {Object.keys(MOCK_FILES).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveLang(key);
                      setOutputVisible(false);
                    }}
                    className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all duration-300 ${
                      activeLang === key 
                        ? "bg-slate-800/80 text-[#a78bfa] border-slate-700/60 shadow-sm" 
                        : "text-slate-400 border-transparent hover:text-[#a78bfa] hover:bg-slate-900/40"
                    }`}
                  >
                    {MOCK_FILES[key].filename}
                  </button>
                ))}
              </div>

              {/* Action Run Button with pulsing glow */}
              <button
                ref={buttonRef}
                onClick={handleRunCode}
                disabled={running}
                className="flex items-center space-x-2 px-4 py-2 bg-[#6E2ED8] hover:bg-[#5921B6] active:scale-95 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 relative overflow-hidden group/btn animate-pulse"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{running ? "Running..." : "Run"}</span>
              </button>
            </div>

            {/* Code Editor Content area */}
            <div className="flex-1 flex overflow-hidden font-mono text-xs leading-normal bg-slate-950/20 text-[#A78BFA]">
              {/* Line Numbers */}
              <div className="bg-slate-950/40 text-slate-700 py-5 px-4 text-right select-none border-r border-slate-900/40 space-y-0.5">
                {fileData.code.split('\n').map((_, index) => (
                  <div key={index} className="h-[1.2rem]">{index + 1}</div>
                ))}
              </div>

              {/* Code input text with typewriter effect and custom highlighting */}
              <div className="flex-1 overflow-auto py-5 px-5 text-left text-purple-200/90 whitespace-pre-wrap select-text custom-scroll">
                {highlightCode(typedCode)}
                <span className="inline-block w-1.5 h-4 bg-[#A78BFA] ml-0.5 animate-pulse" style={{ verticalAlign: 'middle' }} />
              </div>
            </div>

            {/* Mock terminal Console Drawer */}
            <div className="bg-slate-950/90 backdrop-blur-md px-6 py-4.5 border-t border-slate-900/70 flex flex-col justify-start">
              <div className="flex items-center justify-between pb-2 border-b border-slate-900/60 mb-2">
                <div className="flex items-center space-x-2 text-slate-500 text-[10px] uppercase font-extrabold tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-[#a78bfa]" />
                  <span>Terminal Console Output</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    running ? "bg-blue-500 animate-pulse" : 
                    outputVisible ? "bg-emerald-400" : "bg-slate-500"
                  }`} />
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500">
                    {running ? "Running" : outputVisible ? "Done" : "Idle"}
                  </span>
                </div>
              </div>
              
              <div className="h-16 text-left font-mono text-[11px] text-emerald-400 overflow-y-auto terminal-text">
                {running && (
                  <div className="text-slate-400 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                    <span>Compiling program sandbox thread...</span>
                  </div>
                )}
                {outputVisible && !running && (
                  <div className="space-y-1">
                    {fileData.output.split('\n').map((line, idx) => (
                      <div key={idx} className="terminal-output-line">{line}</div>
                    ))}
                  </div>
                )}
                {!running && !outputVisible && <div className="text-slate-650">Click "Run" to execute program entrypoint.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
