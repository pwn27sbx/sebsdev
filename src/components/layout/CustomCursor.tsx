import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const update = (e: MouseEvent) => {
      mouseX.set(e.clientX - 4);
      mouseY.set(e.clientY - 4);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', update);
      return () => window.removeEventListener('mousemove', update);
    }
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[100] mix-blend-difference bg-white hidden md:block"
      style={{ x: cursorX, y: cursorY }}
    />
  );
};
export default CustomCursor;
