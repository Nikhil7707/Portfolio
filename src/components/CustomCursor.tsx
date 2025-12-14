import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailConfig = { damping: 35, stiffness: 200 };
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setCursorState(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
  }, [cursorX, cursorY]);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setCursorState(prev => ({ ...prev, isClicking: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursorState(prev => ({ ...prev, isClicking: false }));
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Track hover state for interactive elements
    const handleElementHover = () => {
      setCursorState(prev => ({ ...prev, isHovering: true }));
    };

    const handleElementLeave = () => {
      setCursorState(prev => ({ ...prev, isHovering: false }));
    };

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      mediaQuery.removeEventListener('change', handleChange);

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  // Update hover tracking when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      
      const handleElementHover = () => {
        setCursorState(prev => ({ ...prev, isHovering: true }));
      };

      const handleElementLeave = () => {
        setCursorState(prev => ({ ...prev, isHovering: false }));
      };

      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Don't render custom cursor on touch devices or if user prefers reduced motion
  if (prefersReducedMotion || typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: cursorState.isClicking ? 0.8 : cursorState.isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div 
          className={`w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-colors duration-150 ${
            cursorState.isHovering ? 'bg-accent' : ''
          }`}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
        animate={{
          scale: cursorState.isClicking ? 0.9 : cursorState.isHovering ? 1.8 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className={`w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-150 ${
            cursorState.isHovering ? 'border-accent' : 'border-primary/50'
          }`}
        />
      </motion.div>

      {/* Glow effect on hover */}
      {cursorState.isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x: trailXSpring,
            y: trailYSpring,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div className="w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-xl" />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
