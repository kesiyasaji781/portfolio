import React from 'react';
import { ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-neutral-200 dark:border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light order-3 md:order-1">
          © {new Date().getFullYear()} Kesiya C. Sajimon. All rights reserved.
        </p>

        {/* Brand Credit */}
        <div className="text-center order-1 md:order-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            Designed & Developed by{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentPurple to-accentBlue font-bold">
              Kesiya C. Sajimon
            </span>
          </p>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mt-1">
            B.Tech CSE (AI & ML)
          </span>
        </div>

        {/* Social & Back to Top */}
        <div className="flex items-center gap-4 order-2 md:order-3">
          <a
            href="https://github.com/kesiyasaji781"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-neutral-300 dark:border-white/10 text-neutral-500 hover:text-accentPurple dark:hover:text-white bg-neutral-100/50 dark:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-neutral-300 dark:border-white/10 text-neutral-500 hover:text-accentBlue dark:hover:text-white bg-neutral-100/50 dark:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl border border-accentPurple/30 dark:border-accentPurple/40 text-accentPurple dark:text-purple-300 hover:bg-accentPurple hover:text-white dark:hover:bg-accentPurple/25 bg-accentPurple/5 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
