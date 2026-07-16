import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layout, Server, Wrench } from 'lucide-react';
import { 
  SiC, SiFastapi, SiGooglecolab 
} from 'react-icons/si';
import { 
  FaPython, FaJs, FaHtml5, FaCss3Alt, FaReact, 
  FaGitAlt, FaGithub, FaDocker, FaCode 
} from 'react-icons/fa6';

const skillsData = [
  {
    category: 'Programming Languages',
    icon: Cpu,
    color: 'from-purple-500 to-indigo-500',
    skills: [
      { name: 'Python', icon: FaPython, level: 85, color: '#3776AB' },
      { name: 'C Language', icon: SiC, level: 75, color: '#A8B9CC' },
      { name: 'JavaScript', icon: FaJs, level: 80, color: '#F7DF1E' }
    ]
  },
  {
    category: 'Frontend Development',
    icon: Layout,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'HTML5', icon: FaHtml5, level: 90, color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3Alt, level: 85, color: '#1572B6' },
      { name: 'JavaScript', icon: FaJs, level: 80, color: '#F7DF1E' },
      { name: 'React.js', icon: FaReact, level: 80, color: '#61DAFB' }
    ]
  },
  {
    category: 'Backend Architecture',
    icon: Server,
    color: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'FastAPI', icon: SiFastapi, level: 70, color: '#009688' }
    ]
  },
  {
    category: 'Tools & Environments',
    icon: Wrench,
    color: 'from-rose-500 to-orange-500',
    skills: [
      { name: 'Git', icon: FaGitAlt, level: 80, color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, level: 85, color: '#181717' },
      { name: 'Docker', icon: FaDocker, level: 65, color: '#2496ED' },
      { name: 'VS Code', icon: FaCode, level: 90, color: '#007ACC' },
      { name: 'Google Colab', icon: SiGooglecolab, level: 80, color: '#F9AB00' }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Ambient background particles/glows */}
      <div className="absolute right-1/4 bottom-1/4 w-80 h-80 rounded-full bg-accentPurple/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 top-1/4 w-96 h-96 rounded-full bg-accentBlue/5 blur-[140px] pointer-events-none" />

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
            Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentPurple to-accentBlue text-glow-purple">Skills</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentPurple to-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {skillsData.map((cat, catIdx) => {
            const CatIcon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-white/5 flex flex-col hover:border-white/10"
              >
                
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-tr ${cat.color} text-white shadow-md`}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-800 dark:text-white">
                    {cat.category}
                  </h3>
                </div>

                {/* Skills Progress Grid */}
                <div className="flex flex-col gap-6">
                  {cat.skills.map((skill, idx) => {
                    const SkillIcon = skill.icon;
                    return (
                      <div key={skill.name} className="flex flex-col gap-2">
                        
                        <div className="flex items-center justify-between text-sm">
                          {/* Left Icon + Name */}
                          <div className="flex items-center gap-2.5 font-medium text-neutral-700 dark:text-neutral-300">
                            <SkillIcon 
                              style={{ color: skill.color }} 
                              className="w-5 h-5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" 
                            />
                            <span>{skill.name}</span>
                          </div>
                          
                          {/* Right Percentage */}
                          <span className="font-mono font-semibold text-accentPurple dark:text-purple-300">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative border border-black/5 dark:border-white/5">
                          {/* Animated Progress Fill */}
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-accentPurple to-accentBlue"
                          />
                        </div>

                      </div>
                    );
                  })}
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
