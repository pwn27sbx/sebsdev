import React from 'react';
import { motion } from 'framer-motion';

const Transition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div className="relative w-full h-full">
      <motion.div
        initial={{ scale: 0.4, opacity: 0, y: '50vh', rotate: -10, filter: 'blur(20px)' }}
        animate={{ scale: 1, opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
        exit={{ scale: 0.4, opacity: 0, y: '-50vh', rotate: 10, filter: 'blur(20px)' }}
        transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 1.4 }}
        className="relative z-10 w-full min-h-screen origin-center transform-gpu"
      >
        {children}
      </motion.div>

      {/* Brutalist Wipe Layers */}
      {/* Top Layer - Cyan */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1], delay: 0.4 }}
        className="fixed top-0 left-0 w-full h-screen bg-[#00A889] z-[999] origin-top pointer-events-none"
      />
      
      {/* Middle Layer - Magenta */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1], delay: 0.6 }}
        className="fixed top-0 left-0 w-full h-screen bg-[#FF2A6D] z-[998] origin-top pointer-events-none"
      />
      
      {/* Bottom Layer - Cyberpunk Black */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1], delay: 1.0 }}
        className="fixed top-0 left-0 w-full h-screen bg-[#050505] z-[997] origin-top pointer-events-none flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Engineering Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjxwb2x5Z29uIHBvaW50cz0iMCAwIDQwIDAgNDAgNDAgMCA0MCIvPjxwYXRoIGQ9Ik0wIDIwIEw0MCAyME0yMCAwIEwyMCA0MCIvPjwvZz48L3N2Zz4=')] opacity-40" />
        
        {/* Cyberpunk Text */}
        <h1 className="font-anton text-4xl sm:text-6xl md:text-8xl text-transparent [-webkit-text-stroke:2px_#FF2A6D] uppercase tracking-widest z-10 opacity-90 mix-blend-screen animate-pulse">
          SYSTEM_OVERRIDE
        </h1>
        
        {/* Scanline */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#00A889] shadow-[0_0_20px_#00A889] animate-bounce" style={{ animationDuration: '2s' }} />
      </motion.div>

      {/* Glitch Horizontal Bars (Only on enter) */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.2 }}
        className="fixed top-[20%] right-0 w-full h-8 bg-white z-[1000] origin-right pointer-events-none mix-blend-difference"
      />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 1.3 }}
        className="fixed top-[70%] left-0 w-full h-4 bg-[#00A889] z-[1000] origin-left pointer-events-none"
      />
    </motion.div>
  );
};

export default Transition;
