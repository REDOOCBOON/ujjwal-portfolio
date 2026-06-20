import { useState } from 'react';
import { GitBranch, Calendar } from 'lucide-react';

export default function GitHubHeatmap() {
  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);

  // Generate mock heatmap data for 24 weeks (7 days each)
  // 0: no commits, 1: 1-2 commits, 2: 3-5 commits, 3: 6+ commits
  const weeks = 24;
  const daysPerWeek = 7;
  
  // Simple seed-based random to keep it consistent
  const getCommitCount = (col: number, row: number) => {
    const seed = (col * 3 + row * 7) % 11;
    if (seed < 4) return 0;
    if (seed < 7) return 1;
    if (seed < 10) return 2;
    return 3;
  };

  const getCommitNumber = (level: number) => {
    if (level === 0) return 0;
    if (level === 1) return Math.floor(Math.random() * 2) + 1;
    if (level === 2) return Math.floor(Math.random() * 3) + 3;
    return Math.floor(Math.random() * 5) + 6;
  };

  const getDateStr = (col: number, row: number) => {
    // Mock date calculation working backwards
    const date = new Date(2026, 5, 18); // June 18, 2026
    const daysOffset = (weeks - col - 1) * 7 + (6 - row);
    date.setDate(date.getDate() - daysOffset);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="github-activity" className="relative py-24 px-6 overflow-hidden border-t border-white/5 bg-black/5">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-600/5 rounded-full aurora-blur pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-12 select-none">
          <h2 className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">&gt; CORE PULSE</h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">GitHub Activity Core</h3>
        </div>

        {/* Heatmap Card */}
        <div className="p-6 rounded-2xl glass-panel border border-white/5 shadow-xl flex flex-col md:flex-row gap-8 items-center justify-between">
          
          {/* Contribution Grid */}
          <div className="flex-1 overflow-x-auto w-full custom-scroller pb-2">
            <div className="flex flex-col gap-1 min-w-[380px]">
              <div className="flex gap-1">
                {Array.from({ length: weeks }).map((_, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-1">
                    {Array.from({ length: daysPerWeek }).map((_, rowIdx) => {
                      const level = getCommitCount(colIdx, rowIdx);
                      const count = getCommitNumber(level);
                      const dateStr = getDateStr(colIdx, rowIdx);
                      
                      let colorClass = 'bg-white/5'; // level 0
                      if (level === 1) colorClass = 'bg-purple-900/40 border border-purple-500/20';
                      if (level === 2) colorClass = 'bg-purple-700/60 border border-purple-500/30';
                      if (level === 3) colorClass = 'bg-purple-500 border border-purple-400/50';

                      return (
                        <div
                          key={rowIdx}
                          onMouseEnter={() => setHoveredDay({ count, date: dateStr })}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-3 h-3 rounded-[2px] transition duration-150 cursor-crosshair hover:scale-125 hover:shadow-md ${colorClass}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              
              {/* Grid Legend */}
              <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-3 select-none">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-[2px] bg-white/5" />
                  <div className="w-3 h-3 rounded-[2px] bg-purple-900/40 border border-purple-500/20" />
                  <div className="w-3 h-3 rounded-[2px] bg-purple-700/60 border border-purple-500/30" />
                  <div className="w-3 h-3 rounded-[2px] bg-purple-500 border border-purple-400/50" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Stats & Tooltip Dashboard */}
          <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 text-left space-y-6 shrink-0">
            {/* Dynamic Hover Tooltip Banner */}
            <div className="h-16 flex flex-col justify-center">
              {hoveredDay ? (
                <>
                  <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono">
                    <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{hoveredDay.count} commits</span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{hoveredDay.date}</span>
                  </div>
                </>
              ) : (
                <span className="text-xs text-gray-500 font-mono">Hover over the grid blocks to see contributions logs</span>
              )}
            </div>

            {/* Static Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xl font-display font-bold text-white">724</div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">Yearly Commits</div>
              </div>
              <div>
                <div className="text-xl font-display font-bold text-white">42 Days</div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">Max Streak</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
