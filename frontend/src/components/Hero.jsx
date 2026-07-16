import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown, Mail, Cpu, Database, Globe, Network } from 'lucide-react';

const words = [
  "AI & ML Enthusiast",
  "Full Stack Developer",
  "React Developer",
  "FastAPI Developer"
];

export default function Hero({ onPreviewDoc, refreshTrigger }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [resumeUrl, setResumeUrl] = useState('/Kesiya_C_Sajimon_Resume.pdf');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/resume/')
      .then(response => {
        if (!response.ok) throw new Error('No active resume found');
        return response.json();
      })
      .then(data => {
        if (data && data.file) {
          setResumeUrl(data.file);
        }
      })
      .catch(error => {
        console.warn('Using fallback contact link for resume:', error);
      });
  }, [refreshTrigger]);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setIsDeleting(true);
          setTypingSpeed(1500); // Wait before deleting
        } else {
          setTypingSpeed(100);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, typingSpeed]);

  return (
    <section className="relative min-h-[92svh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background radial soft gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accentPurple/15 blur-[120px] dark:bg-accentPurple/10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-accentBlue/15 blur-[150px] dark:bg-accentBlue/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Info Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accentPurple/20 dark:border-accentPurple/30 bg-accentPurple/5 dark:bg-accentPurple/10 text-accentPurple dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            AI & ML Engineering Student
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
          >
            Hi, I'm{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentPurple via-fuchsia-500 to-accentBlue text-glow-purple">
              Kesiya C. Sajimon
            </span>
          </motion.h1>

          {/* Typing Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6"
          >
            <span className="mr-2">I am an</span>
            <span className="text-accentBlue dark:text-accentBlue">
              {text}
            </span>
            <span className="w-1 h-7 ml-1 bg-accentBlue dark:bg-accentBlue animate-pulse inline-block" />
          </motion.div>

          {/* Intro Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mb-8 leading-relaxed font-light"
          >
            Passionate B.Tech CSE (AI & ML) student with a strong interest in Artificial Intelligence, Machine Learning, and Full Stack Development. I enjoy building scalable web applications and continuously learning new technologies.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 group px-6 py-3.5 rounded-xl text-white font-medium bg-gradient-to-r from-accentPurple to-accentBlue shadow-lg shadow-accentPurple/25 hover:shadow-accentPurple/40 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto text-center"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium border border-neutral-300 dark:border-white/10 bg-neutral-200/50 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto text-center"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </a>

            <button
              onClick={() => {
                if (resumeUrl && resumeUrl !== '#contact') {
                  onPreviewDoc(resumeUrl, "My Resume");
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium border border-accentPurple/30 dark:border-accentPurple/40 bg-accentPurple/5 text-accentPurple dark:text-purple-300 hover:bg-accentPurple/10 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto text-center cursor-pointer"
            >
              <FileDown className="w-4 h-4 animate-bounce" />
              View Resume
            </button>
          </motion.div>
        </div>

        {/* Right Graphic Column */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
          >
            {/* Spinning Holographic Orbital Ring 1 */}
            <div className="absolute inset-0 rounded-full border border-dashed border-accentPurple/30 animate-[spin_30s_linear_infinite]" />
            {/* Spinning Holographic Orbital Ring 2 */}
            <div className="absolute inset-6 rounded-full border border-double border-accentBlue/25 animate-[spin_20s_linear_infinite_reverse]" />
            {/* Rotating Tech Grid Node Circles */}
            <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-accentPurple animate-pulse-glow" />
            <div className="absolute bottom-1/2 -left-2 w-3.5 h-3.5 rounded-full bg-accentBlue animate-pulse-glow" />
            <div className="absolute -bottom-1 right-1/4 w-3 h-3 rounded-full bg-accentPink animate-pulse-glow" />

            {/* Glowing bubble background inside */}
            <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-accentPurple/20 via-accentBlue/10 to-accentPink/15 filter blur-md" />

            {/* Simulated Tech Profile Photo inside Glass Card */}
            <div className="absolute inset-10 rounded-3xl glass-card overflow-hidden flex flex-col items-center justify-center p-6 border border-white/10">
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Simulated AI Connections Network SVG */}
                <svg className="absolute inset-0 w-full h-full text-accentPurple/20 dark:text-accentPurple/30" viewBox="0 0 100 100">
                  <path d="M10,20 Q50,40 90,20 T50,80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="10" cy="20" r="2" fill="currentColor" />
                  <circle cx="50" cy="40" r="3" fill="currentColor" className="animate-ping" />
                  <circle cx="90" cy="20" r="2" fill="currentColor" />
                  <circle cx="50" cy="80" r="4" fill="currentColor" />
                  <line x1="10" y1="20" x2="50" y2="40" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="90" y1="20" x2="50" y2="40" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
                </svg>

                {/* Big Futuristic Neon Circle */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-accentPurple to-accentBlue p-1.5 shadow-xl shadow-accentPurple/30 group">
                  <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-white to-purple-200 tracking-wider">
                      KCS
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-xs tracking-[0.25em] font-semibold uppercase text-accentPurple dark:text-purple-300">
                    Neural Code Setup
                  </span>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-1">
                    Kesiya C. Sajimon
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    B.Tech CSE (AI & ML)
                  </p>
                </div>

                {/* Micro tech tags hovering */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-white/10 dark:bg-white/5 border border-white/10 text-[9px] font-mono text-accentBlue">
                  React.js
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/10 dark:bg-white/5 border border-white/10 text-[9px] font-mono text-accentPurple">
                  FastAPI
                </div>
                <div className="absolute top-1/2 left-2 px-2 py-0.5 rounded bg-white/10 dark:bg-white/5 border border-white/10 text-[9px] font-mono text-accentPink">
                  PyTorch
                </div>
              </div>
            </div>

            {/* floating badges with motion */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 py-2 px-3 rounded-2xl glass-card flex items-center gap-2 border border-white/10 shadow-lg text-xs"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Full Stack</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 py-2 px-3 rounded-2xl glass-card flex items-center gap-2 border border-white/10 shadow-lg text-xs"
            >
              <Network className="w-4 h-4 text-accentPurple" />
              <span>AI / ML model</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
