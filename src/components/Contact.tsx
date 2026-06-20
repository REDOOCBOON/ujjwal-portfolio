import { useState } from 'react';
import type { FormEvent } from 'react';
import { Send, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, HackerRankIcon } from './SocialIcons';
import Magnetic from './Magnetic';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-purple-600/5 rounded-full aurora-blur pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16 select-none">
          <h2 className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">&gt; HANDSHAKE / CONTACT</h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Get In Touch</h3>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">

          {/* Info Card (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h4 className="text-xl font-display font-semibold text-white">Let's build something intelligent.</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Recruiters, supervisors, or developers—feel free to drop a message. I am open to full-time roles, internships, and AI research collaborations.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-gray-300">ujjwal3rd@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-gray-300">+91-8210052876</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4 border-t border-white/5">
              {[
                { icon: GithubIcon, label: 'GitHub', url: 'https://github.com/REDOOCBOON' },
                { icon: LinkedinIcon, label: 'LinkedIn', url: 'https://www.linkedin.com/in/ujjwal-thakur-5361502b9/' },
                { icon: HackerRankIcon, label: 'HackerRank', url: 'https://hackerrank.com/ujjwal3rd' },
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <Magnetic key={idx}>
                    <a
                      href={soc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-xs text-gray-400 hover:text-white transition duration-300"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{soc.label}</span>
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </div>

          {/* Contact Form Card (Right 7 cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 shadow-xl space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name-input" className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Your Name</label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500/50 transition font-sans"
                    placeholder="Enter name"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="email-input" className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Your Email</label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500/50 transition font-sans"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="message-input" className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Your Message</label>
                <textarea
                  id="message-input"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500/50 transition font-sans resize-none"
                  placeholder="Type message..."
                />
              </div>

              {/* Submit CTA */}
              <div className="flex justify-end pt-3">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-xs hover:shadow-lg hover:shadow-purple-500/25 transition duration-300 disabled:opacity-50 select-none"
                  >
                    {status === 'sending' ? (
                      <span>Transmitting...</span>
                    ) : status === 'success' ? (
                      <span>Message Secured! ✓</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
