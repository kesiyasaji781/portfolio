import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles, Settings } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme, onOpenAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll listener to adjust navbar background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check active section
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentSection = section;
            break;
          }
        }
      }
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 glass-panel shadow-lg border-b border-white/5 dark:border-white/5 border-black/5' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Branding */}
        <a 
          href="#" 
          className="flex items-center gap-2 group font-semibold text-lg tracking-wider"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-accentPurple to-accentBlue shadow-lg shadow-accentPurple/25 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-sm">K</span>
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-400 group-hover:from-accentPurple group-hover:to-accentBlue transition-all duration-300">
            Kesiya C. Sajimon
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isSectionActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  isSectionActive
                    ? 'text-accentPurple dark:text-purple-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-accentPurple dark:hover:text-white'
                }`}
              >
                {isSectionActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-accentPurple/5 dark:bg-accentPurple/10 border-b-2 border-accentPurple dark:border-accentPurple/70 rounded-lg z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            );
          })}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-accentPurple dark:hover:text-accentPurple hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Admin Gear Button */}
          <button
            onClick={onOpenAdmin}
            className="ml-2 p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-accentPurple dark:hover:text-accentPurple hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Admin Dashboard"
          >
            <Settings className="w-4 h-4" />
          </button>
        </nav>

        {/* Mobile Hamburger Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-indigo-600" />}
          </button>

          {/* Mobile Admin Trigger */}
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-accentPurple dark:hover:text-white cursor-pointer"
            aria-label="Admin Dashboard"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-accentPurple dark:hover:text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-panel border-t border-white/5 mt-4"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                    activeSection === item.href.substring(1)
                      ? 'bg-accentPurple/10 text-accentPurple dark:text-purple-400 border-l-4 border-accentPurple'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
