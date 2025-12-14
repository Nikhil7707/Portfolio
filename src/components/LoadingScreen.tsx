import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

const LoadingScreen = ({ onComplete, minDuration = 2500 }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'logo' | 'progress' | 'reveal'>('logo');

  useEffect(() => {
    const startTime = Date.now();

    // Phase 1: Logo animation
    const logoTimer = setTimeout(() => {
      setPhase('progress');
    }, 800);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startTime;
        const targetProgress = Math.min((elapsed / minDuration) * 100, 100);
        const newProgress = prev + (targetProgress - prev) * 0.1;
        return Math.min(newProgress, 100);
      });
    }, 50);

    // Phase 2: Reveal
    const revealTimer = setTimeout(() => {
      setPhase('reveal');
    }, minDuration - 500);

    // Complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, minDuration);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.1,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Logo */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: phase === 'reveal' ? 1.2 : 1, 
            opacity: phase === 'reveal' ? 0 : 1 
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated logo container */}
          <div className="relative">
            {/* Glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.2)',
                  '0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3)',
                  '0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.2)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main logo */}
            <motion.div
              className="relative w-32 h-32 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outer ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="1"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                />
                
                {/* Inner geometric shape */}
                <motion.polygon
                  points="50,15 85,75 15,75"
                  fill="none"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'center' }}
                />

                {/* Center dot */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="8"
                  fill="url(#gradient1)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--secondary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="mt-8 font-display text-3xl font-bold gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: phase === 'reveal' ? 0 : 1, 
            y: phase === 'reveal' ? -20 : 0 
          }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Amrit Tyagi
        </motion.h1>

        {/* Progress bar */}
        <motion.div
          className="mt-8 w-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== 'logo' ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))',
                backgroundSize: '200% 100%',
              }}
              initial={{ width: 0 }}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ['0% 0%', '100% 0%'],
              }}
              transition={{ 
                width: { duration: 0.3, ease: "easeOut" },
                backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
              }}
            />
          </div>
          <motion.p
            className="mt-2 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading experience...
          </motion.p>
        </motion.div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
              }}
              animate={{
                y: [null, Math.random() * -200],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
