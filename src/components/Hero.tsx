import { useState, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, HackerRankIcon } from './SocialIcons';
import Magnetic from './Magnetic';

export default function Hero() {
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const subtitles = ['Full Stack Developer', 'GenAI Engineer', 'AI Research Enthusiast'];

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIdx((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '4', label: 'Internships' },
    { value: '3+', label: 'Major Projects' },
    { value: '2', label: 'Publications' },
    { value: '9.12', label: 'CGPA' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center py-20 px-6 overflow-hidden bg-grid-pattern">
      {/* Background aurora blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-purple-600/10 aurora-blur animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-600/10 aurora-blur animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">

        {/* ── Left column: text content ── */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/25 bg-purple-500/5 backdrop-blur-md mb-6 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono tracking-wider text-purple-300 uppercase">System Active — SRMIST</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-display font-bold tracking-tight text-white mb-4"
          >
            Ujjwal Thakur
          </motion.h1>

          {/* Rotating subtitle */}
          <div className="h-10 sm:h-12 overflow-hidden mb-6">
            <motion.div
              key={subtitleIdx}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-2xl sm:text-3xl font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400"
            >
              {subtitles[subtitleIdx]}
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 leading-relaxed max-w-xl mb-10"
          >
            Building Intelligent Systems, Scalable Applications, and AI-Powered Experiences.
          </motion.p>

          {/* CTA buttons + socials */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <Magnetic>
              <button
                onClick={() => scrollToSection('resume')}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Get Resume</span>
              </button>
            </Magnetic>

            <Magnetic>
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition duration-300"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>
            </Magnetic>

            <div className="flex items-center gap-3 ml-2 sm:ml-4">
              {[
                { Icon: GithubIcon, label: 'GitHub', url: 'https://github.com/REDOOCBOON' },
                { Icon: LinkedinIcon, label: 'LinkedIn', url: 'https://www.linkedin.com/in/ujjwal-thakur-5361502b9/' },
                { Icon: HackerRankIcon, label: 'HackerRank', url: 'https://hackerrank.com/ujjwal3rd' },
              ].map(({ Icon, label, url }) => (
                <Magnetic key={label}>
                  <a
                    href={url} target="_blank" rel="noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="border-l border-white/10 pl-4">
                <div className="text-3xl font-display font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: 3D card ── */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-80 h-96 rounded-2xl p-6 glass-panel border border-white/10 shadow-2xl flex flex-col justify-between group cursor-grab active:cursor-grabbing select-none"
          >
            {/* gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none rounded-2xl" />

            {/* Avatar */}
            <div
              style={{ transform: 'translateZ(50px)' }}
              className="relative w-full h-56 rounded-xl overflow-hidden border border-white/10 bg-black/40 group-hover:border-purple-500/50 transition duration-300"
            >
              <img
                src="/ujjwal_avatar.png"
                alt="Ujjwal Thakur — Full Stack Developer & GenAI Engineer"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col gap-0.5">
                <span className="text-xs font-mono text-cyan-400 font-bold">Node status: active</span>
                <span className="text-[10px] font-mono text-gray-400">Class: FULL_STACK_DEV_AGENT</span>
              </div>
            </div>

            {/* Card footer */}
            <div style={{ transform: 'translateZ(30px)' }} className="flex justify-between items-end mt-4">
              <div className="text-left">
                <div className="text-sm font-semibold text-white">Ujjwal Thakur</div>
                <div className="text-[10px] font-mono text-gray-500 mt-0.5">B.Tech CS @ SRMIST</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[10px] font-mono text-purple-300 font-bold">
                9.12
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
