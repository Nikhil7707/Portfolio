import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, FileDown } from 'lucide-react';
import content from '@/data/content.json';

const HeroSection = () => {
  const { personal } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="gradient-text glow-text">{personal.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-primary" />
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-primary font-medium">
              {personal.title}
            </h2>
            <span className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-primary" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 rounded-xl font-semibold text-primary-foreground overflow-hidden block text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--accent)))',
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                View GitHub
                <ExternalLink size={18} />
              </span>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download="Amrit_Tyagi_Resume.pdf"
              className="group px-8 py-4 rounded-xl font-semibold border-2 border-border hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300 block text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                Download Resume
                <FileDown size={18} className="group-hover:animate-bounce" />
              </span>
            </motion.a>
          </motion.div>

          {/* Tech stack preview */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >
            {['Python', 'C++', 'MERN', 'IoT', 'MySQL'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm text-muted-foreground backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 1.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: 'hsl(var(--primary) / 0.5)',
                  color: 'hsl(var(--foreground))',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
