import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const statusLogs = [
    'Initializing SRMIST local node...',
    'Fetching agent portfolio parameters...',
    'Loading Gemini AI model weights...',
    'Compiling interactive GPU shaders...',
    'Verifying full-stack project schemas...',
    'Establishing secure WebSockets sync...',
    'Optimizing responsive layouts...',
    'Initialization completed. Redirecting to core...',
  ];

  useEffect(() => {
    // Increment loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDone(true);
          setTimeout(onFinished, 600); // Wait for fade out animation
          return 100;
        }
        
        // Random incremental speed
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinished]);

  useEffect(() => {
    // Cycle through status logs as progress increases
    const step = Math.floor(100 / statusLogs.length);
    const currentIdx = Math.min(Math.floor(progress / step), statusLogs.length - 1);
    setStatusIdx(currentIdx);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[200] bg-[#030014] flex flex-col items-center justify-center p-6 text-white"
        >
          {/* Subtle starry backdrop */}
          <div className="absolute inset-0 space-stars opacity-15 pointer-events-none" />

          {/* Central Logo / Pulse */}
          <div className="relative mb-12 select-none">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute inset-0 bg-purple-500/20 rounded-full filter blur-xl w-24 h-24 -left-4 -top-4"
            />
            <div className="w-16 h-16 rounded-xl border border-purple-500 bg-purple-950/40 backdrop-blur-md flex items-center justify-center text-xl font-bold font-display tracking-widest text-white shadow-lg shadow-purple-500/10">
              UT
            </div>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-4">
            {/* Loading Bar */}
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
              />
            </div>

            {/* Metrics */}
            <div className="flex justify-between text-[11px] font-mono text-gray-500 select-none">
              <span>INITIALIZING CORE</span>
              <span className="text-cyan-400 font-bold">{progress}%</span>
            </div>

            {/* Terminal logs */}
            <div className="h-6 overflow-hidden text-center select-none">
              <motion.div
                key={statusIdx}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-mono text-purple-300/80"
              >
                &gt; {statusLogs[statusIdx]}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
