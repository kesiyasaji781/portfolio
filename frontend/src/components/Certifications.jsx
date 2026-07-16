import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowUpRight } from 'lucide-react';

const fallbackCertifications = [
  {
    title: 'Python Course',
    issuer: 'GeeksforGeeks',
    credentialId: 'GFG-PY-2024',
    date: 'Issued 2024',
    verifyLink: '/python_course_certificate.pdf',
    color: 'from-amber-500/10 to-orange-500/10 hover:border-amber-500/30'
  },
  {
    title: 'Social Network Analysis',
    issuer: 'NPTEL',
    credentialId: 'NPTEL-SNA-2024',
    date: 'Issued 2024',
    verifyLink: '/social_network_analysis_certificate.pdf',
    color: 'from-blue-500/10 to-cyan-500/10 hover:border-blue-500/30'
  },
  {
    title: 'Application Development with AI & Essential Skills',
    issuer: 'Industry Certification Program',
    credentialId: 'ICP-AI-2024',
    date: 'Issued 2024',
    verifyLink: '/app_development_ai_essential_skills_certificate.pdf',
    color: 'from-purple-500/10 to-pink-500/10 hover:border-purple-500/30'
  },
  {
    title: 'Java Full Stack with React JS & AI',
    issuer: 'Professional Bootcamp',
    credentialId: 'JFS-REACT-AI',
    date: 'Issued 2025',
    verifyLink: '/java_full_stack_react_ai_certificate.pdf',
    color: 'from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/30'
  }
];

export default function Certifications({ onPreviewDoc, refreshTrigger }) {
  const [certifications, setCertifications] = useState(fallbackCertifications);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/certifications/')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch certifications from backend');
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mappedData = data.map(cert => ({
            title: cert.title,
            issuer: cert.issuer,
            credentialId: cert.credential_id || 'N/A',
            date: cert.date,
            verifyLink: cert.file || cert.verify_link || '#',
            color: cert.color || 'from-purple-500/10 to-pink-500/10 hover:border-purple-500/30'
          }));
          setCertifications(mappedData);
        }
      })
      .catch(error => {
        console.warn('Using fallback certifications data:', error);
      });
  }, [refreshTrigger]);
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background soft glow particles */}
      <div className="absolute left-1/4 top-1/3 w-80 h-80 rounded-full bg-accentPurple/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 w-96 h-96 rounded-full bg-accentPink/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            Licenses & <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentPurple to-accentBlue text-glow-purple">Certifications</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentPurple to-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => {
                if (cert.verifyLink && cert.verifyLink !== '#') {
                  onPreviewDoc(cert.verifyLink, cert.title);
                }
              }}
              className={`glass-card rounded-2xl p-6 border border-white/5 hover:border-accentPurple/30 transition-all duration-300 relative group flex gap-5 items-start bg-gradient-to-br ${cert.color} ${
                cert.verifyLink && cert.verifyLink !== '#' ? 'cursor-pointer hover:scale-[1.02]' : ''
              }`}
            >
              
              {/* Badge Icon */}
              <div className="p-3.5 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 text-accentPurple group-hover:bg-accentPurple group-hover:text-white transition-all duration-300 shrink-0">
                <Award className="w-6 h-6 animate-[pulse_2s_infinite]" />
              </div>

              {/* Text Info */}
              <div className="flex-1 text-left">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-accentPurple dark:group-hover:text-purple-400 transition-colors duration-200">
                    {cert.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (cert.verifyLink && cert.verifyLink !== '#') {
                        onPreviewDoc(cert.verifyLink, cert.title);
                      }
                    }}
                    className="p-1 rounded-lg border border-neutral-300 dark:border-white/10 hover:border-accentPurple text-neutral-500 hover:text-accentPurple dark:hover:text-purple-400 bg-neutral-200/50 dark:bg-white/5 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                    aria-label="Verify Certificate"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>


                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mt-1">
                  {cert.issuer}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
