import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="relative font-display text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="gradient-text">AT</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      layoutId="activeNavDot"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}

              {/* Resume Button */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="ml-4 px-4 py-2 text-sm font-medium rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative z-50 p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-2xl font-display font-semibold ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  whileHover={{ x: 10, color: 'hsl(var(--primary))' }}
                >
                  {item.name}
                </motion.button>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="mt-4 px-8 py-3 text-lg font-semibold rounded-xl border-2 border-primary text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
