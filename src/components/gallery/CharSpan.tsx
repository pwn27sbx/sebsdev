import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface CharSpanProps {
  char: string;
  scrollYProgress: MotionValue<number>;
  turn: number;
  step: number;
}

const CharSpan = ({ char, scrollYProgress, turn, step }: CharSpanProps) => {
  const tintStart = 0.08 + (turn * step);
  const tintEnd = tintStart + 0.001;
  const untintStart = 0.50 + (turn * step);
  const untintEnd = untintStart + 0.001;
  const opacity = useTransform(scrollYProgress, [0, tintStart, tintEnd, untintStart, untintEnd, 1], [0, 0, 1, 1, 0, 0]);

  return (
    <span className="relative inline-block whitespace-pre">
      {/* Cyan offset base (Always visible, always glitching) */}
      <span 
        className="absolute text-transparent [-webkit-text-stroke:8px_var(--color-secondary)] md:[-webkit-text-stroke:10px_var(--color-secondary)] pointer-events-none -top-[0.8vw] -left-[0.6vw] z-0" 
        style={{ animation: 'glitch-1 2.5s infinite step-end' }}
      >
        {char}
      </span>
      
      {/* Magenta offset base (Always visible, always glitching) */}
      <span 
        className="absolute text-transparent [-webkit-text-stroke:8px_var(--color-primary)] md:[-webkit-text-stroke:10px_var(--color-primary)] pointer-events-none top-[0.8vw] left-[0.6vw] z-0" 
        style={{ animation: 'glitch-2 2s infinite step-end' }}
      >
        {char}
      </span>

      {/* Invisible spacer for width/height */}
      <span className="text-transparent opacity-0 pointer-events-none">{char}</span>
      
      {/* Lit-up state: Solid text fills in the center */}
      <motion.span 
        className="absolute text-[#f5f5f5]/70 dark:text-[#0a0a0a]/70 [-webkit-text-stroke:5px_#000] dark:[-webkit-text-stroke:5px_#fff] pointer-events-none left-0 top-0 z-20" 
        style={{ opacity }}
      >
        {char}
      </motion.span>
    </span>
  );
};
export default CharSpan;
