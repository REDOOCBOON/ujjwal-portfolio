import { Heart } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Top', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Research', id: 'publications' },
    { label: 'Resume', id: 'resume' },
  ];

  return (
    <footer className="relative py-12 px-6 border-t border-white/5 select-none bg-black/20">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand + copyright */}
        <div className="text-left space-y-1.5">
          <div className="text-sm font-display font-semibold text-white tracking-widest uppercase">
            Ujjwal Thakur
          </div>
          <div className="text-[10px] font-mono text-gray-500">
            © {currentYear} · Systems & Interfaces · All rights reserved.
          </div>
        </div>

        {/* Quick nav links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-gray-400">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="hover:text-purple-400 transition"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Built-with credit */}
        <div className="text-right text-[10px] font-mono text-gray-500 flex items-center gap-1">
          <span>Engineered with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          <span>React + TS + Tailwind v4</span>
        </div>

      </div>
    </footer>
  );
}
