import { motion } from 'framer-motion';
import { Code2, Monitor, Server, Database, BrainCircuit, Cloud } from 'lucide-react';
import TechUniverse from './TechUniverse';

interface SkillCategory {
  title: string;
  icon: any;
  skills: string[];
  color: string;
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Programming Languages',
      icon: Code2,
      skills: ['Python', 'JavaScript', 'Java', 'C', 'SQL'],
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
    },
    {
      title: 'Frontend Development',
      icon: Monitor,
      skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3'],
      color: 'from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30',
    },
    {
      title: 'Backend Development',
      icon: Server,
      skills: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'REST APIs'],
      color: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      title: 'Databases & Indexing',
      icon: Database,
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'ChromaDB'],
      color: 'from-purple-500/20 to-violet-500/20 text-purple-400 border-purple-500/30',
    },
    {
      title: 'AI & GenAI Systems',
      icon: BrainCircuit,
      skills: ['LangChain', 'RAG Pipelines', 'Gemini API', 'PyTorch', 'OpenCV', 'YOLOv8', 'Multi-Agent AI'],
      color: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      skills: ['Docker', 'Git', 'GitHub', 'AWS (Cloud Practitioner)', 'Linux', 'Postman'],
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    },
  ];

  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden border-t border-white/5 bg-black/5">
      {/* Background spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-600/5 aurora-blur pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">&gt; SKILLS DIRECTORY</h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Core Competencies & AI Universe</h3>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-white/10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-purple-400 group-hover:bg-purple-500/10 group-hover:text-purple-300 transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-semibold text-white font-display uppercase tracking-wider">{category.title}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-2.5 py-1 rounded-md border border-white/5 hover:border-white/10 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Universe Orbit Simulation */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="text-center mb-8 select-none">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-display">Interactive AI Orbital Core</h4>
            <p className="text-xs text-gray-500 mt-1">Hover over nodes to explore connection channels</p>
          </div>
          <TechUniverse />
        </div>

      </div>
    </section>
  );
}
