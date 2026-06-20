import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, CheckCircle } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import Magnetic from './Magnetic';

interface Project {
  id: string;
  title: string;
  image: string;
  tech: string[];
  features: string[];
  summary: string;
  description: string;
  demoUrl?: string;
  githubUrl?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'careerpilot',
      title: 'CareerPilot AI',
      image: '/careerpilot_ai_mockup.png',
      tech: ['FastAPI', 'React', 'PostgreSQL', 'ChromaDB', 'LangChain', 'Gemini API', 'Docker'],
      features: ['Resume Analysis', 'ATS Optimization', 'Interview Coach', 'Career Advisor', 'Multi-Agent AI'],
      summary: 'Full-stack GenAI platform supporting 500+ resume evaluations and vector-based RAG indexing.',
      description:
        'CareerPilot AI utilises a multi-agent orchestration setup (Resume Analyzer, ATS Optimizer, Interview Coach, Career Advisor) built using LangChain and a ChromaDB vector database. It includes a JWT-secured FastAPI backend and a React dashboard delivering real-time skill gap analysis, interactive mock interviews, and dynamic question generation.',
      githubUrl: 'https://github.com/REDOOCBOON/CareerPilot-AI',
    },
    {
      id: 'monitormail',
      title: 'MonitorMail',
      image: '/monitormail_mockup.png',
      tech: ['Flask', 'React', 'PostgreSQL', 'JWT', 'pdfplumber'],
      features: ['Attendance Automation', 'Email Alerts', 'Analytics Dashboard', 'PDF Parsing'],
      summary: 'Automated attendance tracking and SMTP email alert engine for 200+ students.',
      description:
        'MonitorMail handles automatic student attendance sheet uploading, parsing transcripts using pdfplumber on a Flask REST API backend, and launching multi-threaded SMTP email notifications. It reduces manual verification and reporting time by 80% with secure JWT authentication.',
      githubUrl: 'https://github.com/REDOOCBOON/MonitorMail',
    },
    {
      id: 'microplastics',
      title: 'Microplastic Detection System',
      image: '/microplastics_mockup.png',
      tech: ['PyTorch', 'OpenCV', 'YOLOv8', 'U-Net', 'Python'],
      features: ['Computer Vision', 'Object Detection', 'Image Segmentation', 'Classification'],
      summary: 'Deep learning pipeline combining U-Net semantic segmentation and YOLOv8 object detection.',
      description:
        'An end-to-end computer vision classification pipeline designed to detect and categorise microplastics in aquatic environments. Employs U-Net for boundary segmentation and YOLOv8 for real-time bounding box identification. Results accepted for publication in a Scopus-indexed journal.',
      githubUrl: 'https://github.com/REDOOCBOON/Microplastic-Detection',
    },
  ];

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full aurora-blur pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto z-10 relative">

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">&gt; SHOWCASE</h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Featured Projects</h3>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer rounded-2xl overflow-hidden glass-panel border border-white/5 hover:border-white/15 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-black/40 border-b border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                <div className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-left">
                <h4 className="text-lg font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-cyan-400 transition">
                  {project.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-6">{project.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card footer */}
              <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-xs text-purple-400 font-mono group-hover:text-purple-300 transition select-none">
                <span>Inspect details</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Detail Modal ── */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-2xl rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
              >
                {/* Header image */}
                <div className="relative h-60 shrink-0 bg-black/40 border-b border-white/5">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent" />
                  <Magnetic range={30}>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Magnetic>
                  <div className="absolute bottom-4 left-6 text-left">
                    <h4 className="text-2xl font-display font-bold text-white tracking-tight leading-none">
                      {selectedProject.title}
                    </h4>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left custom-scroller">
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">Description</h5>
                    <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">Key Features</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedProject.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-400">
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">Tech Stack</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, tIdx) => (
                        <span key={tIdx} className="text-xs font-mono bg-white/5 border border-white/5 text-gray-300 px-2.5 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action footer */}
                <div className="p-4 bg-black/40 border-t border-white/5 shrink-0 flex items-center justify-end gap-3">
                  {selectedProject.githubUrl && (
                    <Magnetic>
                      <a
                        href={selectedProject.githubUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-white font-medium text-xs transition duration-300"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    </Magnetic>
                  )}
                  {selectedProject.demoUrl && (
                    <Magnetic>
                      <a
                        href={selectedProject.demoUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-xs hover:shadow-md hover:shadow-purple-500/10 transition duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    </Magnetic>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
