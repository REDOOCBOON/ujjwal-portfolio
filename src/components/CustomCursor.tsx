import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // High-performance Motion Values for smooth spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { stiffness: 400, damping: 28, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const spotlightXSpring = useSpring(cursorX, { stiffness: 100, damping: 20 });
  const spotlightYSpring = useSpring(cursorY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Background Spotlight Glow (lagging behind cursor) */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-30 opacity-40 mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{
          x: spotlightXSpring,
          y: spotlightYSpring,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 100%)',
        }}
      />

      {/* Main Cursor Circle */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-8 h-8 border border-purple-500/50 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Core Dot */}
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
      </motion.div>
    </>
  );
}
