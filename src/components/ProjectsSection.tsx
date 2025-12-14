import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, X, ChevronRight } from 'lucide-react';
import content from '@/data/content.json';

interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  features: string[];
  image: string;
  github: string;
  live: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  onClick: () => void;
}

const ProjectCard = ({ project, index, isInView, onClick }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -8 }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Card glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))',
        }}
      />

      {/* Image/Preview area */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.2))`,
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Project icon/visual */}
          <motion.div
            className="text-6xl"
            animate={{
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {project.category.includes('MERN') ? '💬' : '⚡'}
          </motion.div>
        </motion.div>

        {/* Year badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-primary">
          {project.year}
        </div>

        {/* Category badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-xs font-medium text-primary">
          {project.category}
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="flex items-center gap-2 text-primary font-medium">
            View Details
            <ChevronRight size={18} />
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack preview */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom border glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header image */}
        <div 
          className="h-48 md:h-64 relative"
          style={{
            background: `linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3))`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-8xl"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {project.category.includes('MERN') ? '💬' : '⚡'}
            </motion.div>
          </div>

          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium text-primary">
              {project.year}
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-sm font-medium text-primary">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="font-display text-3xl font-bold mb-4 gradient-text">
            {project.title}
          </h2>

          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            {project.fullDescription}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-display text-lg font-semibold mb-3 text-foreground">
              Key Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <motion.li
                  key={feature}
                  className="flex items-start gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold mb-3 text-foreground">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm font-medium text-foreground"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: 'hsl(var(--primary))',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={18} />
              View Code
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-primary-foreground font-medium"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={18} />
              Live Demo
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { projects } = content;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative" ref={sectionRef}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            03 / Projects
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured Work
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* More projects hint */}
        <motion.p
          className="text-center mt-12 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          More projects coming soon...
        </motion.p>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
