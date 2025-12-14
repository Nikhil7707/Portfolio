import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import content from '@/data/content.json';

const Footer = () => {
  const { personal } = content;
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="relative py-12 border-t border-border/50 overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/4 w-64 h-32 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-48 h-24 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a href="#" className="font-display text-2xl font-bold gradient-text mb-2 block">
              AT
            </a>
            <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center md:justify-start">
              © {currentYear} Made with <Heart size={14} className="text-accent fill-accent" /> by {personal.name}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {['About', 'Projects', 'Contact'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom decoration line */}
        <motion.div
          className="mt-8 h-px w-full"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3), hsl(var(--accent) / 0.3), transparent)',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        />
      </div>
    </footer>
  );
};

export default Footer;
