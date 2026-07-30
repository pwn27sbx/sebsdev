import React from 'react';
import { motion } from 'framer-motion';

const Transition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div className="relative w-full h-full">
      <motion.div
        initial={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0, y: 50 }}
        animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', opacity: 1, y: 0 }}
        exit={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', opacity: 0, y: -50 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
      
      {/* Brutalist Wipe Layers */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
        className="fixed top-0 left-0 w-full h-screen bg-[#00A889] z-[999] origin-top pointer-events-none"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1], delay: 0.1 }}
        className="fixed top-0 left-0 w-full h-screen bg-[#FF2A6D] z-[998] origin-top pointer-events-none"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
        className="fixed top-0 left-0 w-full h-screen bg-[#050505] z-[997] origin-top pointer-events-none"
      />

      {/* Glitch Horizontal Bars */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
        className="fixed top-[20%] right-0 w-full h-8 bg-white z-[1000] origin-right pointer-events-none mix-blend-difference"
      />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.15 }}
        className="fixed top-[70%] left-0 w-full h-4 bg-[#00A889] z-[1000] origin-left pointer-events-none"
      />
    </motion.div>
  );
};

export default Transition;
