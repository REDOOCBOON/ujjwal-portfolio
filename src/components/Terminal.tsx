import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import confetti from 'canvas-confetti';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

interface TerminalProps {
  terminalCommandTrigger?: string;
}

export default function Terminal({ terminalCommandTrigger }: TerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'SRMIST AI Node initialized. Connection secure.', type: 'system' },
    { text: 'Type "help" to see available terminal commands.', type: 'success' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);
  
  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  useEffect(() => {
    if (terminalCommandTrigger) {
      handleExecuteCommand(terminalCommandTrigger);
    }
  }, [terminalCommandTrigger]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [history]);

  // Matrix digital rain canvas effect
  useEffect(() => {
    if (!showMatrix || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabet = katakana.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    matrixIntervalRef.current = setInterval(draw, 30);

    return () => {
      if (matrixIntervalRef.current) clearInterval(matrixIntervalRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [showMatrix]);

  const handleExecuteCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();
    const newHistory: TerminalLine[] = [...history, { text: `ujjwal@portfolio:~$ ${trimmed}`, type: 'input' }];

    let response: TerminalLine[] = [];

    switch (cmd) {
      case 'help':
        response = [
          { text: 'Available commands:', type: 'success' },
          { text: '  about        Display personal snapshot & details', type: 'output' },
          { text: '  skills       List core tech stack and libraries', type: 'output' },
          { text: '  experience   List internship experience timelines', type: 'output' },
          { text: '  projects     Print description of key projects', type: 'output' },
          { text: '  stats        Show virtual system metrics', type: 'output' },
          { text: '  matrix       Trigger digital code rain (type "matrix off" to stop)', type: 'output' },
          { text: '  party        Trigger a celebratory confetti blast', type: 'output' },
          { text: '  secret       Display a developer secret', type: 'output' },
          { text: '  clear        Clear console history', type: 'output' },
        ];
        break;

      case 'about':
        response = [
          { text: 'Ujjwal Thakur', type: 'success' },
          { text: '--------------------------------------------------', type: 'system' },
          { text: 'Role: Full Stack Developer & GenAI Engineer', type: 'output' },
          { text: 'Education: B.Tech Computer Science, SRM Institute of Science and Technology', type: 'output' },
          { text: 'GPA: 9.12 / 10', type: 'output' },
          { text: 'Focus: Building RAG pipelines, multi-agent AI architectures, and reactive web apps.', type: 'output' },
        ];
        break;

      case 'skills':
        response = [
          { text: 'Skills Database:', type: 'success' },
          { text: '  Languages  : Python, JavaScript, TypeScript, Java, C, SQL', type: 'output' },
          { text: '  Frontend   : React, Vite, Tailwind CSS, HTML5, CSS3', type: 'output' },
          { text: '  Backend    : Node.js, Express, Flask, FastAPI, REST APIs', type: 'output' },
          { text: '  AI / GenAI : PyTorch, OpenCV, YOLOv8, LangChain, Gemini API, RAG', type: 'output' },
          { text: '  Databases  : PostgreSQL, MongoDB, MySQL, SQLite, ChromaDB', type: 'output' },
          { text: '  DevOps     : Docker, Git, GitHub, AWS, Linux', type: 'output' },
        ];
        break;

      case 'experience':
        response = [
          { text: 'Internship Log:', type: 'success' },
          { text: '  [May 2026 - June 2026] Google AI-ML Virtual Internship (AI/ML Intern)', type: 'output' },
          { text: '  [May 2025 - July 2025] Koru Foundation (Frontend Developer)', type: 'output' },
          { text: '  [Oct 2024 - Dec 2024]  3W Full Stack Internship (Full Stack Intern)', type: 'output' },
          { text: '  [Jan 2025 - Apr 2025]  SRMIST, KTR (Research Intern)', type: 'output' },
        ];
        break;

      case 'projects':
        response = [
          { text: 'Active Deployments:', type: 'success' },
          { text: '  1. CareerPilot AI - Full Stack GenAI career consulting suite (FastAPI, React, LangChain)', type: 'output' },
          { text: '  2. MonitorMail - Automatic attendance parser & SMTP emailer (Flask, React, pdfplumber)', type: 'output' },
          { text: '  3. Microplastics CV - YOLOv8 + U-Net microplastic particle detector (PyTorch, OpenCV)', type: 'output' },
        ];
        break;

      case 'stats':
        response = [
          { text: 'System Diagnostics:', type: 'success' },
          { text: '  Model Weights   : Gemini 1.5 Flash / Pro API nodes', type: 'output' },
          { text: '  Status          : Active / Online', type: 'output' },
          { text: '  UI Framerate    : 60 FPS (Hardware Accelerated)', type: 'output' },
          { text: '  Core Connection : SSL Handshake Secured', type: 'output' },
          { text: '  Agent Latency   : ~120ms response pipeline', type: 'output' },
        ];
        break;

      case 'matrix':
        setShowMatrix(true);
        response = [{ text: 'Digital Rain sequence initiated. Type "matrix off" to stop.', type: 'success' }];
        break;

      case 'matrix off':
        setShowMatrix(false);
        response = [{ text: 'Digital Rain sequence offline.', type: 'system' }];
        break;

      case 'party':
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        response = [{ text: 'Party mode triggered! 🎉', type: 'success' }];
        break;

      case 'secret':
        response = [
          { text: '💡 DEVELOPER SECRET:', type: 'success' },
          { text: '"There are 10 kinds of people: those who understand binary, and those who don\'t."', type: 'output' },
          { text: 'Also, centering a div: display: grid; place-items: center;', type: 'output' }
        ];
        break;

      case 'clear':
        setHistory([]);
        setInputValue('');
        return;

      default:
        response = [{ text: `Command not found: "${trimmed}". Type "help" for a list of commands.`, type: 'error' }];
    }

    setHistory([...newHistory, ...response]);
    setInputValue('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleExecuteCommand(inputValue);
  };

  return (
    <div
      onClick={focusInput}
      className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex flex-col h-[320px] font-mono text-sm cursor-text text-left keep-dark"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/5 select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-400 font-sans tracking-wide">ujjwal@portfolio: ~ (bash)</span>
        <div className="w-12" />
      </div>

      {/* Matrix Canvas Overlay */}
      {showMatrix && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 top-[37px] pointer-events-none opacity-40 mix-blend-screen"
        />
      )}

      {/* Console Display */}
      <div
        ref={consoleRef}
        className="flex-1 p-4 overflow-y-auto space-y-1.5 custom-scroller bg-black/20"
      >
        {history.map((line, idx) => {
          let textClass = 'text-gray-300';
          if (line.type === 'input') textClass = 'text-white font-semibold';
          if (line.type === 'error') textClass = 'text-red-400';
          if (line.type === 'success') textClass = 'text-green-400';
          if (line.type === 'system') textClass = 'text-purple-400';

          return (
            <div key={idx} className={`terminal-line break-words leading-relaxed ${textClass}`}>
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Command Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-1.5 px-4 py-3 bg-black/40 border-t border-white/5"
      >
        <span className="text-cyan-400 font-bold shrink-0">ujjwal@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-sm leading-none p-0 focus:ring-0"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
