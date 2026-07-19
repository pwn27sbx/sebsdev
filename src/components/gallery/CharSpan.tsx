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
  const untintStart = 0.40 + (turn * step);
  const untintEnd = untintStart + 0.001;
  const opacity = useTransform(scrollYProgress, [0, tintStart, tintEnd, untintStart, untintEnd, 1], [0, 0, 1, 1, 0, 0]);

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="text-[#e5e5e5] dark:text-[#2a2a2a]">{char}</span>
      <motion.span className="absolute text-[#00A889] pointer-events-none -top-[1vw] -left-[0.8vw] md:-top-[0.8vw] md:-left-[0.6vw]" style={{ opacity }}>{char}</motion.span>
    </span>
  );
};
export default CharSpan;
