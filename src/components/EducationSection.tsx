import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, Cpu, Cloud, Code } from 'lucide-react';
import content from '@/data/content.json';

const iconMap: Record<string, typeof Cpu> = {
  cpu: Cpu,
  cloud: Cloud,
  code: Code,
};

const EducationSection = () => {
  const { education, certifications } = content;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding relative" ref={sectionRef}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            04 / Education
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Learning Journey
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Education Timeline */}
          <div className="mb-20">
            <motion.h3
              className="text-2xl font-display font-semibold mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="gradient-text">Education</span>
            </motion.h3>

            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ transformOrigin: 'top' }}
              />

              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  className={`relative flex items-center gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <motion.div
                      className="glass-card p-6 rounded-xl group hover:border-primary/50 transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <GraduationCap size={20} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium text-primary">{edu.years}</span>
                      </div>
                      
                      <h4 className="font-display text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-muted-foreground mb-2">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground/80">{edu.description}</p>
                    </motion.div>
                  </div>

                  {/* Spacer for alternate layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.h3
              className="text-2xl font-display font-semibold mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <span className="gradient-text-secondary">Certifications</span>
            </motion.h3>

            <div className="grid sm:grid-cols-3 gap-6">
              {certifications.map((cert, index) => {
                const IconComponent = iconMap[cert.icon] || Award;
                
                return (
                  <motion.div
                    key={cert.title}
                    className="group glass-card p-6 rounded-xl text-center hover:border-secondary/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent size={28} className="text-secondary" />
                    </motion.div>
                    
                    <h4 className="font-display font-semibold mb-1 group-hover:text-secondary transition-colors text-sm">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
