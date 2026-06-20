import { useEffect, useState, useRef } from 'react';
import type { ComponentType } from 'react';
import { Search, Globe, Sun, Moon, ArrowRight, CornerDownLeft, Sparkles, Terminal as TerminalIcon } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  action: () => void;
  icon?: ComponentType<{ className?: string }>;
}

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  onRunTerminalCommand?: (cmd: string) => void;
}

export default function CommandPalette({
  isOpen,
  setIsOpen,
  toggleTheme,
  isDarkMode,
  onRunTerminalCommand,
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: 'nav-hero', title: 'Go to Hero / Top', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('hero') },
    { id: 'nav-about', title: 'Go to About Me', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('about') },
    { id: 'nav-skills', title: 'Go to Technical Skills', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('skills') },
    { id: 'nav-experience', title: 'Go to Experience & Internships', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('experience') },
    { id: 'nav-projects', title: 'Go to Featured Projects', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('projects') },
    { id: 'nav-publications', title: 'Go to Publications & Research', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('publications') },
    { id: 'nav-certifications', title: 'Go to Certifications', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('certifications') },
    { id: 'nav-tech-universe', title: 'Go to Tech Stack Universe', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('tech-universe') },
    { id: 'nav-contact', title: 'Go to Contact', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('contact') },

    // Preferences
    { id: 'theme-toggle', title: `Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`, category: 'Preferences', icon: isDarkMode ? Sun : Moon, action: () => { toggleTheme(); setIsOpen(false); } },

    // Actions & Socials
    { id: 'github', title: 'Open GitHub Profile', category: 'Social Links', icon: Globe, action: () => { window.open('https://github.com/REDOOCBOON', '_blank'); setIsOpen(false); } },
    { id: 'linkedin', title: 'Open LinkedIn Profile', category: 'Social Links', icon: Globe, action: () => { window.open('https://www.linkedin.com/in/ujjwal-thakur-5361502b9/', '_blank'); setIsOpen(false); } },
    { id: 'hackerrank', title: 'Open HackerRank Profile', category: 'Social Links', icon: Globe, action: () => { window.open('https://hackerrank.com/ujjwal3rd', '_blank'); setIsOpen(false); } },
    { id: 'email', title: 'Email Ujjwal (ujjwal3rd@gmail.com)', category: 'Actions', icon: Globe, action: () => { window.open('mailto:ujjwal3rd@gmail.com'); setIsOpen(false); } },

    // Easter Eggs
    { id: 'egg-matrix', title: 'Terminal Command: matrix (Digital Rain)', category: 'Interactive', icon: TerminalIcon, action: () => { onRunTerminalCommand?.('matrix'); setIsOpen(false); scrollToSection('terminal-section'); } },
    { id: 'egg-confetti', title: 'Terminal Command: party (Confetti Explosion!)', category: 'Interactive', icon: Sparkles, action: () => { onRunTerminalCommand?.('party'); setIsOpen(false); } },
    { id: 'egg-stats', title: 'Terminal Command: stats (System Stats)', category: 'Interactive', icon: TerminalIcon, action: () => { onRunTerminalCommand?.('stats'); setIsOpen(false); scrollToSection('terminal-section'); } },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // Scroll selected item into view inside listbox
    const container = scrollRef.current;
    if (!container) return;
    const selectedEl = container.children[selectedIndex] as HTMLElement;
    if (!selectedEl) return;

    const containerHeight = container.clientHeight;
    const selectedTop = selectedEl.offsetTop;
    const selectedHeight = selectedEl.clientHeight;

    if (selectedTop + selectedHeight > container.scrollTop + containerHeight) {
      container.scrollTop = selectedTop + selectedHeight - containerHeight;
    } else if (selectedTop < container.scrollTop) {
      container.scrollTop = selectedTop;
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Dialog */}
      <div
        onKeyDown={handleKeyDown}
        className="command-palette-modal relative w-full max-w-xl glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[450px]"
        style={{
          transform: 'translate3d(0,0,0)',
        }}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-0 outline-none text-white placeholder-gray-500 font-sans text-base leading-none"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 select-none rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] font-medium text-gray-400 bg-white/5 shrink-0">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto py-2 custom-scroller"
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon || ArrowRight;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors duration-150 ${
                    isSelected ? 'bg-purple-600/35 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`} />
                    <span className="font-sans text-sm font-medium">{cmd.title}</span>
                    <span className={`text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-gray-400'
                    }`}>
                      {cmd.category}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 font-mono">
                      <span>Select</span>
                      <CornerDownLeft className="w-3 h-3 text-cyan-400" />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-4 py-8 text-center text-sm text-gray-400 font-sans">
              No results found for "{search}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-400 font-mono">
          <div className="flex gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Enter</span>
          </div>
          <span>⌘K / ⌃K to toggle</span>
        </div>
      </div>
    </div>
  );
}
