import { motion } from 'framer-motion';
import { Award, Quote, BrainCircuit } from 'lucide-react';

interface Publication {
  title: string;
  publisher: string;
  indexer: string;
  date: string;
  authors: string;
  abstract: string;
  citation: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  color: string;
}

export default function Research() {
  const publications: Publication[] = [
    {
      title: 'Microplastic Detection Using Computer Vision',
      publisher: 'Journal of Environmental Science / Scopus Indexed',
      indexer: 'Scopus',
      date: 'Jan 2026',
      authors: 'Ujjwal Thakur, et al.',
      abstract:
        'Developed an end-to-end detection pipeline combining U-Net semantic segmentation and YOLOv8 object detection. The system detects, segments, and classifies microplastic particles in water samples, helping automate environmental diagnostics.',
      citation: 'Thakur, U. (2026). "Microplastic Detection Using Computer Vision." Scopus Database Index.',
    },
    {
      title: 'Leaf Disease Detection Using Computer Vision',
      publisher: 'Springer Lecture Notes in Electrical Engineering',
      indexer: 'Springer Conference',
      date: 'April 2025',
      authors: 'Ujjwal Thakur, et al.',
      abstract:
        'Engineered a convolutional neural network classification model with OpenCV pre-processing to identify visual disease patterns in plant foliage. Achieved significant classification accuracy suitable for mobile crop diagnostics.',
      citation: 'Thakur, U. (2025). "Leaf Disease Detection Using Computer Vision." Springer Conference Proceedings.',
    },
  ];

  const certifications: Certification[] = [
    { name: 'AWS Generative AI', issuer: 'Amazon Web Services', date: '2025', color: '#FF9900' },
    { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2025', color: '#FF9900' },
    { name: 'SAP Backend Developer', issuer: 'SAP', date: '2024', color: '#008FD3' },
    { name: 'IBM Cloud Computing', issuer: 'IBM', date: '2024', color: '#052FAD' },
    { name: 'HackerRank SQL Gold', issuer: 'HackerRank', date: '2024', color: '#2EC866' },
    { name: 'HackerRank Problem Solving (C++)', issuer: 'HackerRank', date: '2024', color: '#2EC866' },
  ];

  return (
    <section id="publications" className="relative py-24 px-6 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/5 aurora-blur pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-600/5 aurora-blur pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto z-10 relative grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* ── Publications column ── */}
        <div className="lg:col-span-7 text-left space-y-10">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">&gt; SCHOLARSHIP / PAPERS</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Research & Publications</h3>
          </div>

          <div className="space-y-8">
            {publications.map((pub, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-white/10 hover:shadow-lg transition-all duration-300 relative group"
              >
                {/* Indexer badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded">
                  <BrainCircuit className="w-3 h-3" />
                  <span>{pub.indexer}</span>
                </div>

                <h4 className="text-base font-semibold text-white tracking-tight leading-snug mb-2 pr-20 group-hover:text-cyan-400 transition-colors">
                  {pub.title}
                </h4>
                <div className="text-xs font-mono text-gray-500 mb-4">
                  {pub.authors} · {pub.publisher} · {pub.date}
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">{pub.abstract}</p>

                {/* Citation block */}
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3 select-all">
                  <Quote className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] font-mono text-gray-400 leading-relaxed">{pub.citation}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Certifications column ── */}
        <div id="certifications" className="lg:col-span-5 text-left space-y-10">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">&gt; VERIFICATIONS</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Certifications</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-4 rounded-xl glass-panel border border-white/5 hover:border-white/10 hover:shadow-md transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  {/* Coloured badge circle */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-white/10 bg-white/5"
                    style={{ boxShadow: `0 0 12px ${cert.color}22` }}
                  >
                    <Award
                      className="w-5 h-5 group-hover:scale-110 transition duration-300"
                      style={{ color: cert.color }}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white tracking-tight leading-snug">{cert.name}</h4>
                    <div className="text-[10px] font-mono text-gray-500 mt-0.5">{cert.issuer}</div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                  {cert.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
