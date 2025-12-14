import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CircleSlash } from 'lucide-react';

const MotionToggle = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Check localStorage
    const stored = localStorage.getItem('reduced-motion');
    if (stored !== null) {
      setReducedMotion(stored === 'true');
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    localStorage.setItem('reduced-motion', String(reducedMotion));
  }, [reducedMotion]);

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass-card border border-border/50 hover:border-primary/50 transition-colors"
      onClick={() => setReducedMotion(!reducedMotion)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={reducedMotion ? 'Enable animations' : 'Reduce animations'}
    >
      <AnimatePresence mode="wait">
        {reducedMotion ? (
          <motion.div
            key="reduced"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CircleSlash size={20} className="text-muted-foreground" />
          </motion.div>
        ) : (
          <motion.div
            key="full"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles size={20} className="text-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MotionToggle;
