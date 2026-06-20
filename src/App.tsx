import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Terminal as TerminalIcon, Search, Sun, Moon } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import Loader from './components/Loader';
import Magnetic from './components/Magnetic';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Research from './components/Research';
import GitHubHeatmap from './components/GitHubHeatmap';
import Testimonials from './components/Testimonials';
import ResumeSection from './components/ResumeSection';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [terminalCommand, setTerminalCommand] = useState('');

  // 1. Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Track scroll progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  // 2. Initialize Dark Mode theme config
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleRunTerminalCommand = (cmd: string) => {
    setTerminalCommand(cmd);
    // Reset after a frame so it can be re-triggered
    setTimeout(() => setTerminalCommand(''), 100);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Loading Screen overlay */}
      <Loader onFinished={() => setLoading(false)} />

      {!loading && (
        <div className="relative min-h-screen bg-[#030014] text-white custom-scroller transition-colors duration-300 selection:bg-purple-500/30 selection:text-purple-200">
          
          {/* Subtle starry background for dark mode / space aesthetics */}
          <div className="absolute inset-0 space-stars opacity-15 pointer-events-none" />

          {/* Scroll progress bar */}
          <div 
            className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 z-[90] transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Custom Cursor spotlight follower */}
          <CustomCursor />

          {/* Floating Navigation Header (Apple/Stripe inspired) */}
          <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-40">
            <div className="glass-panel px-4 sm:px-6 py-3 rounded-full flex items-center justify-between border border-white/10 shadow-lg">
              
              {/* Brand Logo */}
              <div 
                onClick={() => scrollToSection('hero')}
                className="text-sm font-display font-bold tracking-wider text-white hover:text-cyan-400 cursor-pointer transition select-none"
              >
                UT
              </div>

              {/* Navigation links (hidden on mobile) */}
              <nav className="hidden md:flex items-center gap-6 text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                <button onClick={() => scrollToSection('about')} className="hover:text-white transition">About</button>
                <button onClick={() => scrollToSection('skills')} className="hover:text-white transition">Skills</button>
                <button onClick={() => scrollToSection('experience')} className="hover:text-white transition">Experience</button>
                <button onClick={() => scrollToSection('projects')} className="hover:text-white transition">Projects</button>
                <button onClick={() => scrollToSection('publications')} className="hover:text-white transition">Research</button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-white transition">Contact</button>
              </nav>

              {/* Utility controls */}
              <div className="flex items-center gap-3 select-none">
                {/* Search / Command palette shortcut */}
                <Magnetic range={20}>
                  <button
                    onClick={() => setIsPaletteOpen(true)}
                    className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition relative group"
                    title="Open Command Palette (⌘K)"
                  >
                    <Search className="w-3.5 h-3.5" />
                    {/* Tooltip */}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-black/80 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                      ⌘K
                    </span>
                  </button>
                </Magnetic>

                {/* Interactive Terminal shortcut */}
                <Magnetic range={20}>
                  <button
                    onClick={() => scrollToSection('terminal-section')}
                    className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
                    title="Jump to Shell Terminal"
                  >
                    <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </Magnetic>

                {/* Theme Switcher */}
                <Magnetic range={20}>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
                    title="Toggle Theme Mode"
                  >
                    {isDarkMode ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5" />}
                  </button>
                </Magnetic>
              </div>

            </div>
          </header>

          {/* Section stack */}
          <main>
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. About Me Section */}
            <About />

            {/* 3. Skills Section */}
            <Skills />

            {/* 4. Experience Section */}
            <Experience />

            {/* 5. Featured Projects Section */}
            <Projects />

            {/* 6. Research & Publications */}
            <Research />

            {/* 7. GitHub Contribution Heatmap */}
            <GitHubHeatmap />

            {/* 8. Endorsements / Testimonials */}
            <Testimonials />

            {/* 9. Interactive Resume */}
            <ResumeSection />

            {/* 10. Interactive Terminal Section */}
            <section id="terminal-section" className="relative py-24 px-6 overflow-hidden border-t border-white/5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/5 rounded-full aurora-blur pointer-events-none" />
              <div className="w-full max-w-4xl mx-auto z-10 relative text-center">
                <div className="mb-12 select-none">
                  <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">&gt; COMPILE / CORE</h2>
                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Interactive Terminal Shell</h3>
                  <p className="text-xs text-gray-500 mt-2">Access Ujjwal's database nodes directly via command-line arguments</p>
                </div>
                <Terminal 
                  terminalCommandTrigger={terminalCommand} 
                />
              </div>
            </section>

            {/* 11. Contact Section */}
            <Contact />
          </main>

          {/* 12. Footer Section */}
          <Footer />

          {/* Command Palette Modal Dialog */}
          <CommandPalette
            isOpen={isPaletteOpen}
            setIsOpen={setIsPaletteOpen}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
            onRunTerminalCommand={handleRunTerminalCommand}
          />

          {/* Easter Egg / Matrix style secret overlay */}
          <div className="fixed bottom-4 left-4 z-40 select-none opacity-20 text-[9px] font-mono tracking-wide text-gray-600 hidden sm:block">
            UT-OS_v1.0.3 // PRESS ⌘K FOR CONSOLE
          </div>

        </div>
      )}
    </>
  );
}
