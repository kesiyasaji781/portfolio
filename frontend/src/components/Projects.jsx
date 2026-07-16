import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Users, CheckCircle, Plus } from 'lucide-react';
import { SiFastapi } from 'react-icons/si';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaGithub } from 'react-icons/fa6';

const projects = [
  {
    title: 'Personal Habit Tracker',
    type: 'Personal Project',
    duration: '2024',
    description: 'A complete personal tracking web app designed to establish productive routines, set milestones, track streaks, and visualize monthly habit analytics.',
    features: [
      'Daily habit checklist & logs',
      'Flexible goal setting',
      'Streak counts and alerts',
      'Responsive canvas progress charts'
    ],
    tech: [
      { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
      { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' }
    ],
    github: 'https://github.com/kesiyasaji781/habit-tracker.git',
    team: false,
    gradient: 'from-purple-500/10 to-indigo-500/10 hover:border-purple-500/30'
  },
  {
    title: 'Job Portal System',
    type: 'Team Project',
    duration: '2024',
    description: 'A collaborative web platform connecting job seekers and employers, with comprehensive application pipelines, job boards, and dynamic statuses.',
    features: [
      'Role-based secure authentication',
      'Employer post & job pipeline management',
      'Candidate tracking and application logging',
      'Status change notifications'
    ],
    tech: [
      { name: 'React.js', icon: FaReact, color: '#61DAFB' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Git & GitHub', icon: FaGitAlt, color: '#F05032' }
    ],
    githubFrontend: 'https://github.com/derindevis/JobPortal_Frontend.git',
    githubBackend: 'https://github.com/derindevis/JobPortal_Backend.git',
    team: true,
    gradient: 'from-blue-500/10 to-emerald-500/10 hover:border-blue-500/30'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-neutral-900/5 dark:bg-black/10">
      {/* Background radial glows */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-accentPurple/5 blur-[150px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-accentBlue/5 blur-[120px] pointer-events-none" />

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
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentPurple to-accentBlue text-glow-purple">Projects</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentPurple to-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative group overflow-hidden bg-gradient-to-br ${project.gradient}`}
            >
              
              <div>
                {/* Header indicators */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {project.duration}
                  </span>
                  
                  {project.team ? (
                    <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 px-2 py-0.5 rounded">
                      <Users className="w-3 h-3" />
                      Team Project
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 text-purple-500 dark:text-purple-400 px-2 py-0.5 rounded">
                      Personal
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-accentPurple dark:group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Core Features */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                    Key Features
                  </h4>
                  <ul className="flex flex-col gap-1.5">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <CheckCircle className="w-3.5 h-3.5 text-accentBlue mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2.5 mb-6 border-t border-neutral-200 dark:border-white/5 pt-4">
                  {project.tech.map((t) => {
                    const TechIcon = t.icon;
                    return (
                      <span 
                        key={t.name} 
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-white/10 dark:bg-white/5 border border-white/5 font-medium text-neutral-700 dark:text-neutral-300"
                      >
                        <TechIcon style={{ color: t.color }} className="w-3.5 h-3.5" />
                        {t.name}
                      </span>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium border border-neutral-300 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors duration-200 min-w-[110px]"
                    >
                      <FaGithub className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.githubFrontend && (
                    <a
                      href={project.githubFrontend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors duration-200 min-w-[110px]"
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      Frontend Code
                    </a>
                  )}
                  {project.githubBackend && (
                    <a
                      href={project.githubBackend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors duration-200 min-w-[110px]"
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      Backend Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-accentPurple to-accentBlue shadow-md shadow-accentPurple/15 hover:shadow-accentPurple/25 hover:scale-105 active:scale-95 transition-all duration-200 min-w-[110px]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}

          {/* Reserved Space Placeholder Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-3xl border-2 border-dashed border-neutral-300 dark:border-white/15 bg-neutral-200/5 dark:bg-white/2 hover:bg-neutral-200/10 dark:hover:bg-white/5 transition-all duration-300 flex flex-col items-center justify-center p-8 min-h-[350px] relative group"
          >
            <div className="flex flex-col items-center text-center max-w-[240px]">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center border border-neutral-300 dark:border-white/10 text-neutral-400 group-hover:scale-110 group-hover:border-accentPurple dark:group-hover:border-purple-500/50 group-hover:text-accentPurple dark:group-hover:text-purple-400 transition-all duration-300 mb-4">
                <Plus className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-neutral-700 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                Future Project
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2 font-light">
                Actively learning and designing models in AI, ML & Full Stack. Exciting innovations coming soon.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
