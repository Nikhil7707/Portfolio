import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Phone, Linkedin } from 'lucide-react';
import content from '@/data/content.json';

const AboutSection = () => {
  const { personal } = content;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const contactItems = [
    { icon: MapPin, label: 'Location', value: personal.location },
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect', href: personal.linkedin },
  ];

  return (
    <section id="about" className="section-padding relative" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              01 / About
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Who I Am
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Visual */}
            <motion.div
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
                    backgroundSize: '300% 300%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Inner content */}
                <div className="absolute inset-[2px] rounded-2xl bg-card overflow-hidden">
                  {/* Placeholder with initials */}
                  <img
                    src="/profile-pic.jpg"
                    alt="Profile"
                    className="w-full h-full object-contain"
                  />

                  {/* Overlay pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-xl glass-card flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-2xl">🚀</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl glass-card flex items-center justify-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className="text-xl">💻</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants}>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-6">
                <span className="text-foreground">CSE Student & </span>
                <span className="gradient-text">IoT Specialist</span>
              </h3>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {personal.bio}
              </p>

              {/* Contact Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href || '#'}
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group glass-card p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                        {item.label}
                      </span>
                      <span className="text-foreground text-sm font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
