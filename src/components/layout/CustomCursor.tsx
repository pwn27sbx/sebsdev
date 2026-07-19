import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const update = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', update);
      return () => window.removeEventListener('mousemove', update);
    }
  }, []);
  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-difference bg-white"
      animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4, width: 8, height: 8 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
    />
  );
};
export default CustomCursor;
