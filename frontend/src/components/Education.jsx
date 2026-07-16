import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

const educationData = [
  {
    degree: 'B.Tech Computer Science & Engineering (AI & ML)',
    institution: 'Kuppam Engineering College',
    duration: '2023 – 2027',
    scoreType: 'Current Percentage',
    score: '80%',
    location: 'Kuppam, Andhra Pradesh',
    details: 'Focused on core CS fundamentals combined with advanced machine learning, neural networks, computer vision, and deep learning architectures.',
  },
  {
    degree: 'Intermediate / Higher Secondary Education',
    institution: 'G.M.B.H.S.S, Kunnamkulam',
    duration: '2021 – 2023',
    scoreType: 'Percentage',
    score: '91%',
    location: 'Thrissur, Kerala',
    details: 'Specialized in Computer Science, Mathematics, Physics, and Chemistry.',
  },
  {
    degree: 'SSLC / Secondary Education School Board',
    institution: "St. Mary's G.H.S, Chowannur",
    duration: '2020 – 2021',
    scoreType: 'Percentage',
    score: '97%',
    location: 'Thrissur, Kerala',
    details: 'Graduated with high honors, mastering core science and mathematical foundations.',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-neutral-900/5 dark:bg-black/10">
      {/* Background highlight */}
      <div className="absolute left-0 bottom-10 w-96 h-96 rounded-full bg-accentBlue/5 dark:bg-accentBlue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentPurple to-accentBlue text-glow-purple">Education</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentPurple to-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-dashed border-neutral-300 dark:border-white/10 pl-6 sm:pl-8 ml-4 sm:ml-6 flex flex-col gap-12 text-left">
          
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex items-center justify-center">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accentPurple to-accentBlue p-0.5 shadow-lg shadow-accentPurple/20 flex items-center justify-center">
                  <div className="w-full h-full rounded-[10px] bg-neutral-900 flex items-center justify-center text-white">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Glassmorphic timeline card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-accentBlue/25 transition-all duration-300 relative group overflow-hidden">
                
                {/* Neon glow hover effect border overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accentPurple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    {/* Degree */}
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-accentPurple dark:group-hover:text-purple-400 transition-colors duration-300">
                      {item.degree}
                    </h3>
                    
                    {/* Institution */}
                    <p className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mt-1">
                      {item.institution}
                    </p>
                  </div>

                  {/* score tag */}
                  <div className="flex items-center gap-1 bg-accentPurple/10 border border-accentPurple/20 dark:border-accentPurple/30 text-accentPurple dark:text-purple-300 px-3 py-1.5 rounded-xl text-sm font-semibold self-start sm:self-center">
                    <Award className="w-4 h-4" />
                    <span>{item.score}</span>
                  </div>
                </div>

                {/* Sub details row */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-4 border-b border-neutral-200 dark:border-white/5 pb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accentBlue" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accentPink" />
                    {item.location}
                  </span>
                  <span className="text-accentPurple dark:text-purple-300 font-bold bg-neutral-200/50 dark:bg-white/5 px-2 py-0.5 rounded">
                    {item.scoreType}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  {item.details}
                </p>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
