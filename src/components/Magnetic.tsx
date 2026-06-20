import { useRef } from 'react';
import type { ReactElement, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: ReactElement;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < range) {
      ref.current.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px)`;
    } else {
      ref.current.style.transform = '';
    }
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block magnetic-btn"
    >
      {children}
    </motion.div>
  );
}
