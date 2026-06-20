import { motion } from 'framer-motion';
import { Calendar, Briefcase, MapPin } from 'lucide-react';

interface Internship {
  company: string;
  role: string;
  duration: string;
  location: string;
  achievements: string[];
}

export default function Experience() {
  const internships: Internship[] = [
    {
      company: 'EduSkills – Google AI-ML Virtual Internship',
      role: 'AI/ML Intern',
      duration: 'May 2026 – June 2026',
      location: 'Google Cloud (Virtual)',
      achievements: [
        'Trained and evaluated ML models (classification, regression, clustering) on real-world datasets using Google Cloud.',
        'Applied supervised and unsupervised learning with scikit-learn and TensorFlow.',
        'Improved model accuracy through iterative hyperparameter tuning.'
      ],
    },
    {
      company: 'Koru Foundation',
      role: 'Frontend Developer',
      duration: 'May 2025 – July 2025',
      location: 'Jamshedpur, JH (On-site)',
      achievements: [
        'Engineered responsive, component-driven UI for the product team using React.js and Tailwind CSS.',
        'Reduced page load time through lazy loading and optimized component re-renders.'
      ],
    },
    {
      company: 'SRMIST, KTR – Electronic Cooling Research',
      role: 'Research Intern',
      duration: 'Jan 2025 – Apr 2025',
      location: 'Chennai, TN (On-site)',
      achievements: [
        'Simulated heat dissipation models for electronic systems and optimized layouts.',
        'Co-authored research documentation on cooling efficiency optimization.',
        'Findings contributed directly to an ongoing departmental publication.'
      ],
    },
    {
      company: '3W Full Stack Internship',
      role: 'Full Stack Developer Intern',
      duration: 'Oct 2024 – Dec 2024',
      location: 'Remote',
      achievements: [
        'Developed and deployed 3 full-stack applications using React.js, Node.js, and MongoDB.',
        'Designed RESTful APIs handling 10+ endpoints for dynamic operations.',
        'Implemented JWT authentication protocols to secure user sessions.'
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-24 px-6 overflow-hidden border-t border-white/5">
      {/* Glow background accent */}
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-600/5 aurora-blur pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">&gt; WORK HISTORY</h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Professional Internships</h3>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-8 text-left">
          
          {internships.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Orb indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-purple-500 bg-[#030014] group-hover:bg-purple-500 group-hover:scale-110 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition" />
              </div>

              {/* Glass Card wrapper */}
              <div className="p-6 rounded-2xl glass-panel border border-white/5 group-hover:border-white/15 hover:shadow-xl hover:shadow-purple-500/5 transition duration-300 relative overflow-hidden">
                {/* Horizontal border light glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Job Metadata Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-base font-semibold text-white tracking-tight leading-snug">{job.company}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{job.role}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      {job.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      {job.location}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="space-y-2.5">
                  {job.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="text-xs text-gray-400 leading-relaxed flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono mt-0.5">↳</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
