import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticlesBg from './components/ui/ParticlesBg';
import UploadDashboard from './components/UploadDashboard';
import DocViewer from './components/ui/DocViewer';

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'; // sleek dark theme by default
    }
    return 'dark';
  });

  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Sync theme to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Custom dual-ring mouse tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile touch interfaces
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className={`theme-transition min-h-screen relative w-full text-neutral-800 dark:text-neutral-100 bg-gradient-mesh ${
      !isTouchDevice ? 'custom-cursor-pointer' : ''
    }`}>
      {/* Dynamic particle overlay */}
      <ParticlesBg theme={theme} />

      {/* Custom Pointer Circle Ring */}
      {!isTouchDevice && (
        <motion.div
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering ? 'rgba(139, 92, 246, 0.8)' : 'rgba(139, 92, 246, 0.4)',
            backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
          }}
          transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accentPurple pointer-events-none z-50 mix-blend-screen hidden md:block"
        />
      )}

      {/* Layout Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar theme={theme} toggleTheme={toggleTheme} onOpenAdmin={() => setIsAdminOpen(true)} />
        
        <main className="flex-1 w-full">
          <Hero onPreviewDoc={(url, title) => setActiveDoc({ url, title })} refreshTrigger={refreshTrigger} />
          
          <div className="max-w-7xl mx-auto px-6">
            <About />
            <Education />
            <Skills />
            <Projects />
            <Certifications onPreviewDoc={(url, title) => setActiveDoc({ url, title })} refreshTrigger={refreshTrigger} />
            <Contact />
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Admin Upload Dashboard */}
      <UploadDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onRefreshData={() => setRefreshTrigger(prev => prev + 1)} 
      />

      {/* Lightbox Document Viewer */}
      {activeDoc && (
        <DocViewer 
          url={activeDoc.url} 
          title={activeDoc.title} 
          onClose={() => setActiveDoc(null)} 
        />
      )}
    </div>
  );
}
