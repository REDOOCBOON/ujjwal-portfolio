import { motion } from 'framer-motion';
import { Quote, UserCheck } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  relation: string;
  text: string;
  initials: string;
}

export default function Testimonials() {
  const recommendations: Testimonial[] = [
    {
      name: 'Dr. R. Arul Raj',
      role: 'Research Supervisor & Professor',
      relation: 'SRM Institute of Science and Technology',
      text: 'Ujjwal displayed exceptional analytical skills during his research internship. His ability to combine mathematical simulations with computer vision pipelines (YOLOv8, U-Net) and his structured documentation efforts make him an outstanding student and researcher.',
      initials: 'AR',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Engineering Lead',
      relation: 'Koru Foundation Product Team',
      text: 'Working with Ujjwal was a pleasure. He engineered responsive, modular React interfaces that instantly integrated with our APIs. His focus on optimization practices, such as lazy loading and component re-renders, saved us valuable rendering times.',
      initials: 'SJ',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Senior Backend Architect',
      relation: '3W Full Stack Engineering',
      text: 'Ujjwal quickly adapted to our backend architecture. He independently designed RESTful APIs handling 10+ endpoints and set up secure authentication flows. He is detailed-oriented and writes clean, self-documenting code.',
      initials: 'RK',
    },
  ];

  return (
    <section id="testimonials" className="relative py-24 px-6 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full aurora-blur pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16 select-none">
          <h2 className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">&gt; ENDORSEMENTS</h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Recommendations</h3>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {recommendations.map((rec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-white/10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Quote Mark */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-white/[0.02] group-hover:text-purple-500/10 transition duration-300" />

              <div className="space-y-4">
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "{rec.text}"
                </p>
              </div>

              {/* Sender Details */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-6">
                <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0">
                  {rec.initials}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                    <span>{rec.name}</span>
                    <UserCheck className="w-3 h-3 text-cyan-400" />
                  </h4>
                  <div className="text-[10px] font-mono text-gray-500 mt-0.5">{rec.role}</div>
                  <div className="text-[9px] font-mono text-gray-600">{rec.relation}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
