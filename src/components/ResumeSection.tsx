import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Maximize2, Briefcase, GraduationCap, Code2, X } from 'lucide-react';
import Magnetic from './Magnetic';

export default function ResumeSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const resumeData = {
    name: 'Ujjwal Thakur',
    email: 'ujjwal3rd@gmail.com',
    phone: '+91-8210052876',
    links: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/ujjwal-thakur' },
      { label: 'GitHub', url: 'https://github.com/ujjwal3rd' },
      { label: 'HackerRank', url: 'https://hackerrank.com/ujjwal3rd' },
    ],
    summary:
      'Full Stack Developer and GenAI Engineer with hands-on experience building production-grade web applications and AI-powered systems using Python, React.js, Node.js, Flask, and LangChain. Proven track record across 4 internships, 3 end-to-end projects, and 2 peer-reviewed publications. CGPA 9.12/10 at SRMIST; passionate about RAG pipelines, multi-agent architectures, and scalable backend engineering.',
    education: [
      {
        institution: 'SRM Institute of Science and Technology',
        degree: 'B.Tech in Computer Science and Engineering',
        duration: '2023 – 2027',
        gpa: 'CGPA: 9.12/10',
      },
      {
        institution: 'Delhi Public School, Ranchi',
        degree: 'Class XII · CBSE',
        duration: '2022',
        gpa: 'Score: 86%',
      },
    ],
    experience: [
      {
        company: 'EduSkills – Google AI-ML Virtual Internship',
        role: 'AI/ML Intern',
        duration: 'May 2026 – June 2026',
        details: [
          'Trained and evaluated ML models (classification, regression, clustering) on real-world datasets using Google Cloud.',
          'Applied supervised and unsupervised learning with scikit-learn and TensorFlow, improving model accuracy by iterative hyperparameter tuning.',
        ],
      },
      {
        company: 'Koru Foundation',
        role: 'Frontend Developer',
        duration: 'May 2025 – July 2025',
        details: [
          'Engineered responsive, component-driven UI for the product team using React.js and Tailwind CSS.',
          'Reduced page load time through lazy loading and optimised component re-renders.',
        ],
      },
      {
        company: '3W Full Stack Internship',
        role: 'Full Stack Developer Intern',
        duration: 'Oct 2024 – Dec 2024',
        details: [
          'Developed and deployed 3 full-stack applications using React.js, Node.js, and MongoDB.',
          'Designed RESTful APIs handling 10+ endpoints and implemented JWT authentication for secure user sessions.',
        ],
      },
      {
        company: 'SRMIST, KTR – Electronic Cooling Research Internship',
        role: 'Research Intern',
        duration: 'Jan 2025 – Apr 2025',
        details: [
          'Simulated heat dissipation models for electronic systems and co-authored research documentation.',
          'Findings contributed to an ongoing departmental publication.',
        ],
      },
    ],
    projects: [
      {
        title: 'CareerPilot AI',
        tech: 'Python, FastAPI, React.js, PostgreSQL, ChromaDB, LangChain, Gemini API, Docker',
        details: [
          'Built a full-stack GenAI platform supporting 500+ resume evaluations and vector-based retrieval across thousands of indexed job descriptions.',
          'Implemented multi-agent architecture (Resume Analyzer, ATS Optimizer, Interview Coach, Career Advisor) using LangChain orchestration and RAG over ChromaDB.',
        ],
      },
      {
        title: 'MonitorMail',
        tech: 'Python, Flask, React.js, PostgreSQL, JWT',
        details: [
          'Automated attendance tracking and SMTP email alerts for 200+ students.',
          'JWT-secured Flask REST API with pdfplumber PDF parsing and React frontend, reducing manual reporting time by 80%.',
        ],
      },
      {
        title: 'Microplastic Detection System',
        tech: 'Python, OpenCV, PyTorch, YOLOv8, U-Net',
        details: [
          'Designed an end-to-end detection pipeline combining U-Net semantic segmentation and YOLOv8 for real-time microplastic classification.',
          'Results accepted for publication in a Scopus-indexed journal.',
        ],
      },
    ],
  };

  const ResumeBody = ({ scrollable }: { scrollable: boolean }) => (
    <div
      className={`w-full text-left font-sans bg-black/45 p-6 sm:p-10 text-gray-300 select-text ${
        scrollable ? 'max-h-[75vh] overflow-y-auto custom-scroller' : ''
      }`}
    >
      {/* Header */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <h4 className="text-3xl font-display font-bold text-white tracking-tight leading-none mb-1.5">
          {resumeData.name}
        </h4>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-purple-300 font-mono">
          <span>{resumeData.phone}</span>
          <span>•</span>
          <span>{resumeData.email}</span>
          {resumeData.links.map((link, idx) => (
            <span key={idx} className="flex gap-x-4">
              <span>•</span>
              <a href={link.url} target="_blank" rel="noreferrer" className="hover:text-cyan-400 underline transition">
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h5 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2">Summary</h5>
        <p className="text-xs text-gray-400 leading-relaxed">{resumeData.summary}</p>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h5 className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase mb-3 flex items-center gap-1.5 border-b border-white/5 pb-1">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>Education</span>
        </h5>
        <div className="space-y-4">
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="flex justify-between items-start gap-4">
              <div>
                <h6 className="text-xs font-semibold text-white">{edu.institution}</h6>
                <div className="text-[11px] text-gray-400 mt-0.5">{edu.degree}</div>
              </div>
              <div className="text-right text-[10px] font-mono text-gray-500 shrink-0">
                <div>{edu.duration}</div>
                <div className="text-purple-300 mt-0.5">{edu.gpa}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h5 className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase mb-3 flex items-center gap-1.5 border-b border-white/5 pb-1">
          <Briefcase className="w-4 h-4 text-cyan-400" />
          <span>Experience</span>
        </h5>
        <div className="space-y-4">
          {resumeData.experience.map((exp, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1.5">
                <h6 className="text-xs font-semibold text-white">{exp.company}</h6>
                <span className="text-[10px] font-mono text-gray-500 shrink-0 ml-4">{exp.duration}</span>
              </div>
              <div className="text-[10px] font-mono text-purple-300 mb-2">{exp.role}</div>
              <ul className="space-y-1.5 pl-4 list-disc text-[11px] text-gray-400 leading-relaxed">
                {exp.details.map((det, dIdx) => <li key={dIdx}>{det}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h5 className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase mb-3 flex items-center gap-1.5 border-b border-white/5 pb-1">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>Projects</span>
        </h5>
        <div className="space-y-4">
          {resumeData.projects.map((proj, idx) => (
            <div key={idx}>
              <h6 className="text-xs font-semibold text-white mb-1">{proj.title}</h6>
              <div className="text-[10px] font-mono text-cyan-400 mb-2">{proj.tech}</div>
              <ul className="space-y-1.5 pl-4 list-disc text-[11px] text-gray-400 leading-relaxed">
                {proj.details.map((det, dIdx) => <li key={dIdx}>{det}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="resume" className="relative py-24 px-6 overflow-hidden border-t border-white/5 bg-black/5">
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full aurora-blur pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto z-10 relative">

        {/* Header */}
        <div className="text-center mb-12 select-none">
          <h2 className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">&gt; CRITERIA / CV</h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Interactive Resume</h3>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 bg-black/30 border border-white/5 border-b-0 rounded-t-2xl select-none">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>ujjwal_thakur_resume.pdf</span>
          </div>
          <div className="flex gap-2.5">
            <Magnetic range={30}>
              <button
                onClick={() => setIsFullscreen(true)}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
                title="Fullscreen Preview"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
            <Magnetic range={30}>
              <a
                href="/ujjwal_thakur_resume.pdf"
                download="Ujjwal_Thakur_Resume.pdf"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Inline viewer */}
        <div className="rounded-b-2xl border border-white/5 border-t-0 overflow-hidden">
          <ResumeBody scrollable={false} />
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {isFullscreen && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFullscreen(false)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative w-full max-w-4xl rounded-2xl glass-panel border border-white/10 shadow-2xl z-10 flex flex-col overflow-hidden"
              >
                <div className="flex justify-between items-center p-4 bg-black/50 border-b border-white/5 select-none">
                  <div className="text-xs text-gray-400 font-mono">Fullscreen Reader Mode</div>
                  <Magnetic range={20}>
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Magnetic>
                </div>
                <ResumeBody scrollable={true} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
