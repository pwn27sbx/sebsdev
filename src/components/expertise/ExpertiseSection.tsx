import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NodeGraph from './NodeGraph';

export default function ExpertiseSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress: sectionScrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });

  const sectionY = useTransform(sectionScrollY, [0, 1], ["35vh", "0vh"]);
  const sectionRotate = useTransform(sectionScrollY, [0, 1], [-8, 0]);
  const sectionScale = useTransform(sectionScrollY, [0, 1], [0.75, 1]);

  return (
    <motion.section
      ref={sectionRef}
      style={{
        y: sectionY,
        rotate: sectionRotate,
        scale: sectionScale,
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
      }}
      className="w-full relative flex flex-col items-center justify-center h-[100dvh] bg-[var(--color-bg-dark)] border-4 md:border-8 border-black dark:border-gray-800 shadow-[15px_15px_0_var(--color-primary)] md:shadow-[30px_30px_0_var(--color-secondary)] dark:shadow-[15px_15px_0_var(--color-primary)] dark:md:shadow-[30px_30px_0_var(--color-secondary)] overflow-hidden transition-colors duration-700 z-30 transform-gpu"
    >
      <NodeGraph />
    </motion.section>
  );
}
