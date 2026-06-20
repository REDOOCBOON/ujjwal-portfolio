import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, Trophy, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import Magnetic from './Magnetic';

interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
}

export default function About() {
  const [activeEvent, setActiveEvent] = useState(0);

  const timelineEvents: TimelineEvent[] = [
    {
      year: '2023 - 2027',
      title: 'SRM Institute of Science and Technology',
      subtitle: 'B.Tech in Computer Science and Engineering',
      description: 'Acquiring deep foundations in Software Engineering, DSA, DBMS, and OS. Maintaining a CGPA of 9.12/10. Active member of research and coding clusters.',
      icon: GraduationCap,
    },
    {
      year: '2025',
      title: 'SRMIST Electronic Cooling Research',
      subtitle: 'Research Intern',
      description: 'Simulated heat dissipation models for electronic systems, applying engineering principles. Co-authored publications focusing on system optimization.',
      icon: BookOpen,
    },
    {
      year: '2025 - Present',
      title: 'GenAI & Agent Systems Focus',
      subtitle: 'Autonomous Developer',
      description: 'Architecting CareerPilot AI, incorporating multi-agent orchestration via LangChain and vector databases (ChromaDB) for smart RAG interfaces.',
      icon: Cpu,
    },
    {
      year: '2026',
      title: 'Google AI-ML Internship',
      subtitle: 'AI/ML Virtual Intern',
      description: 'Engineered supervised and unsupervised machine learning pipelines using Scikit-Learn and TensorFlow on Google Cloud, tuning hyper-parameters to optimize accuracy.',
      icon: Trophy,
    },
  ];

  const nextEvent = () => {
    setActiveEvent((prev) => (prev + 1) % timelineEvents.length);
  };

  const prevEvent = () => {
    setActiveEvent((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length);
  };

  const currentEvent = timelineEvents[activeEvent];
  const CurrentIcon = currentEvent.icon;

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-indigo-600/5 aurora-blur animate-pulse-glow" />

      <div className="w-full max-w-5xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">&gt; CORE LOGS / ABOUT ME</h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Narrative & Milestones</h3>
        </div>

        {/* Narrative & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Compelling Narrative (Left 6 Cols) */}
          <div className="lg:col-span-6 text-left space-y-6">
            <h4 className="text-xl font-display font-medium text-white">
              Synthesizing scalable backends and intelligent agents.
            </h4>
            <p className="text-gray-400 leading-relaxed text-sm">
              I am a Computer Science student at <span className="text-cyan-400 font-medium">SRM Institute of Science and Technology</span> with a passion for designing high-performance, full-stack systems and GenAI solutions.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              My technical expertise spans building RESTful APIs in Python (FastAPI, Flask) and JavaScript (Node.js), and frontend styling using React and Tailwind CSS. Over the course of my projects, I have specialized in <span className="text-purple-400 font-medium">Retrieval-Augmented Generation (RAG)</span>, vector indexing, and multi-agent systems.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              From co-authoring Scopus/Springer publications on microplastics and leaf diseases to deploying end-to-end applications used by hundreds of students, I thrive on solving complex engineering challenges and writing production-ready code.
            </p>

            <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md flex items-center gap-4">
              <Cpu className="w-8 h-8 text-cyan-400 shrink-0 animate-spin-slow" style={{ animationDuration: '10s' }} />
              <div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Research Vector</div>
                <div className="text-xs text-purple-300 font-mono mt-0.5">Computer Vision · LangChain Multi-Agents · RAG</div>
              </div>
            </div>
          </div>

          {/* Interactive Timeline Widget (Right 6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 shadow-xl text-left h-[260px] flex flex-col justify-between">
              
              {/* Event content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                      {currentEvent.year}
                    </span>
                    <CurrentIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h5 className="text-base font-semibold text-white leading-snug">{currentEvent.title}</h5>
                    <div className="text-xs font-mono text-gray-500 mt-0.5">{currentEvent.subtitle}</div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {currentEvent.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Dots progress & Nav */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex gap-1.5 select-none">
                  {timelineEvents.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveEvent(idx)}
                      className={`w-2.5 h-1 rounded-full transition-all duration-300 ${
                        idx === activeEvent ? 'w-6 bg-purple-500' : 'bg-white/10'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Magnetic range={30}>
                    <button
                      onClick={prevEvent}
                      className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
                      aria-label="Previous timeline event"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </Magnetic>
                  <Magnetic range={30}>
                    <button
                      onClick={nextEvent}
                      className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
                      aria-label="Next timeline event"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Magnetic>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
