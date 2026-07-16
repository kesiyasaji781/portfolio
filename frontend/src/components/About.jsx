import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, MessageSquare, ShieldAlert, Zap, BookOpen, Star } from 'lucide-react';

const coreSkills = [
  {
    title: 'Strong Problem Solving',
    description: 'Analyzing complex data patterns, building algorithmic models, and debugging full stack web applications efficiently.',
    icon: Brain,
    color: 'text-purple-400 dark:text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    title: 'High Adaptability',
    description: 'Quick to learn and adopt new framework versions, technologies, programming languages, and industry standards.',
    icon: Zap,
    color: 'text-amber-400 dark:text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'Effective Communication',
    description: 'Articulating technical architectural specifications and concepts to team members, stakeholders, and clients.',
    icon: MessageSquare,
    color: 'text-sky-400 dark:text-sky-400',
    bgColor: 'bg-sky-500/10 border-sky-500/20',
  },
  {
    title: 'Natural Leadership',
    description: 'Guiding collaborative team projects, aligning goals, managing versions, and fostering constructive feedback loops.',
    icon: Star,
    color: 'text-emerald-400 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Passion for Learning',
    description: 'Continuously taking extra-curricular courses, certifications, and building exploratory pet projects in AI & ML.',
    icon: BookOpen,
    color: 'text-rose-400 dark:text-rose-400',
    bgColor: 'bg-rose-500/10 border-rose-500/20',
  },
];

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.215, 0.61, 0.355, 1] 
      } 
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background blur highlight */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accentPink/5 dark:bg-accentPink/5 blur-[100px] pointer-events-none" />

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
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentPurple to-accentBlue text-glow-purple">Me</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentPurple to-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 ml-2">kesiya_bio.py</span>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Aspiring AI/ML Engineer & Full Stack Web Developer
              </h3>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light mb-6 text-left">
                I am Kesiya C. Sajimon, currently pursuing my B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning) at Kuppam Engineering College (2023–2027). 
              </p>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light text-left">
                My academic journey focuses on understanding how we can harness computational power and intelligence algorithms to solve real-world problems. Simultaneously, I enjoy engineering the front-to-back architecture of web systems, creating seamless user interfaces integrated with fast, scalable backends.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Location</p>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Kerala / Andhra Pradesh, India</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Affiliation</p>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Kuppam Eng. College</p>
              </div>
            </div>
          </motion.div>

          {/* Right Highlights Grid */}
          <div className="lg:col-span-7">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 text-left flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accentPurple" /> Core Attributes & Strengths
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {coreSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={skill.title}
                    variants={cardVariants}
                    className={`glass-card p-6 rounded-2xl border border-white/5 hover:border-accentPurple/20 transition-all duration-300 flex flex-col items-start text-left ${
                      index === 4 ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div className={`p-3 rounded-xl border mb-4 ${skill.bgColor}`}>
                      <IconComponent className={`w-5 h-5 ${skill.color}`} />
                    </div>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                      {skill.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
