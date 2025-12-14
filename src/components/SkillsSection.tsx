import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import content from '@/data/content.json';

interface SkillRingProps {
  name: string;
  level: number;
  index: number;
  isInView: boolean;
}

const SkillRing = ({ name, level, index, isInView }: SkillRingProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center gap-4 group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-28 h-28">
        <svg
          className="w-full h-full -rotate-90 transform"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : {}}
            transition={{
              duration: 1.2,
              delay: 0.5 + index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Glow effect on hover */}
          {isHovered && (
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#skillGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Center percentage */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
        >
          <span className={`text-xl font-bold transition-colors duration-300 ${isHovered ? 'text-primary' : 'text-foreground'}`}>
            {level}%
          </span>
        </motion.div>
      </div>

      <motion.span
        className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors"
        whileHover={{ scale: 1.05 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

const SkillsSection = () => {
  const { skills } = content;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            02 / Skills
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            My Expertise
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
        </motion.div>

        {/* Technical Skills - Rings */}
        <div className="mb-16">
          <motion.h3
            className="text-center text-xl font-display font-semibold mb-10 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Technical Skills
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {skills.technical.map((skill, index) => (
              <SkillRing
                key={skill.name}
                name={skill.name}
                level={skill.level}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Languages & Soft Skills */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Languages */}
          <motion.div
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="font-display text-lg font-semibold mb-4 text-primary">
              Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.languages.map((lang, index) => (
                <motion.span
                  key={lang}
                  className="px-4 py-2 rounded-lg bg-primary/10 text-foreground text-sm font-medium border border-primary/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: 'hsl(var(--primary))',
                    boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
                  }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="font-display text-lg font-semibold mb-4 text-secondary">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.soft.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 rounded-lg bg-secondary/10 text-foreground text-sm font-medium border border-secondary/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: 'hsl(var(--secondary))',
                    boxShadow: '0 0 20px hsl(var(--secondary) / 0.3)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
