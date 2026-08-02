import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useInView } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const InteractiveShape = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  const { setIsHovering } = usePortfolio();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  
  // Parallax offsets for different layers
  const xLayer1 = useSpring(useMotionValue(0), springConfig);
  const yLayer1 = useSpring(useMotionValue(0), springConfig);
  
  const xLayer2 = useSpring(useMotionValue(0), springConfig);
  const yLayer2 = useSpring(useMotionValue(0), springConfig);

  const xLayer3 = useSpring(useMotionValue(0), springConfig); 
  const yLayer3 = useSpring(useMotionValue(0), springConfig);

  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    // Sync motion values with spring physics
    const unsubscribeX1 = mouseX.on("change", (v) => xLayer1.set(v * 20));
    const unsubscribeY1 = mouseY.on("change", (v) => yLayer1.set(v * 20));
    
    const unsubscribeX2 = mouseX.on("change", (v) => xLayer2.set(v * 50));
    const unsubscribeY2 = mouseY.on("change", (v) => yLayer2.set(v * 50));
    
    const unsubscribeX3 = mouseX.on("change", (v) => xLayer3.set(v * -30)); // Reverse for reflection/shadow
    const unsubscribeY3 = mouseY.on("change", (v) => yLayer3.set(v * -30));

    const unsubscribeRotateX = mouseY.on("change", (v) => rotateX.set(v * -15)); // Look up/down
    const unsubscribeRotateY = mouseX.on("change", (v) => rotateY.set(v * 20)); // Look left/right

    return () => {
      unsubscribeX1(); unsubscribeY1();
      unsubscribeX2(); unsubscribeY2();
      unsubscribeX3(); unsubscribeY3();
      unsubscribeRotateX(); unsubscribeRotateY();
    };
  }, [mouseX, mouseY, xLayer1, yLayer1, xLayer2, yLayer2, xLayer3, yLayer3, rotateX, rotateY]);

  useEffect(() => {
    if (!isInView) return; // Si no está en pantalla, no añadimos el listener en absoluto

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5 based on screen size so movement is consistent
      const nx = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const ny = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, isInView]);

  return (
    <div 
      ref={containerRef}
      className="relative w-[400px] h-[400px] sm:w-[900px] sm:h-[900px] flex items-center justify-center cursor-crosshair group [perspective:1000px]"
      onMouseEnter={() => setIsHovering(true)}
    >
      {/* Background Shadow/Reflection (Moves opposite) */}
      <motion.div 
        style={{ x: xLayer3, y: yLayer3 }}
        className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-40 blur-[20px] sm:blur-[30px] pointer-events-none transform-gpu will-change-transform"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img src="/cyber_mask_transparent.png" alt="" className="w-full h-full object-contain scale-110 grayscale brightness-75 contrast-125 [.immersion-full_&]:opacity-0 transition-opacity duration-500" />
          <div className="absolute inset-0 scale-110 bg-primary opacity-0 [.immersion-full_&]:opacity-100 transition-opacity duration-500" style={{ WebkitMaskImage: 'url(/cyber_mask_transparent.png)', WebkitMaskSize: 'contain', WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat' }}></div>
        </div>
      </motion.div>

      {/* Mid Layer (Slight offset, glowing edge) */}
      <motion.div 
        style={{ x: xLayer1, y: yLayer1, rotateX, rotateY }}
        className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_0_20px_#A3A3A3] [.immersion-full_&]:drop-shadow-[0_0_30px_var(--color-secondary)] transform-gpu will-change-transform transition-all duration-500"
      >
        <div className="relative w-[95%] h-[95%] flex items-center justify-center">
          <img src="/cyber_mask_transparent.png" alt="" className="w-full h-full object-contain grayscale brightness-110 contrast-125 [.immersion-full_&]:opacity-0 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-secondary opacity-0 [.immersion-full_&]:opacity-100 transition-opacity duration-500" style={{ WebkitMaskImage: 'url(/cyber_mask_transparent.png)', WebkitMaskSize: 'contain', WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat' }}></div>
        </div>
      </motion.div>

      {/* Front Layer (Main Subject) */}
      <motion.div 
        style={{ x: xLayer2, y: yLayer2, rotateX, rotateY }}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_0_15px_rgba(163,163,163,0.3)] [.immersion-full_&]:drop-shadow-[0_0_20px_var(--color-primary)] transform-gpu will-change-transform transition-all duration-500"
      >
        <div className="relative w-[90%] h-[90%] flex items-center justify-center">
          <img src="/cyber_mask_transparent.png" alt="Cyber Oni Mask" className="w-full h-full object-contain grayscale brightness-125 contrast-125 [.immersion-full_&]:opacity-0 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 [.immersion-full_&]:opacity-100 transition-opacity duration-500" style={{ WebkitMaskImage: 'url(/cyber_mask_transparent.png)', WebkitMaskSize: 'contain', WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat' }}></div>
        </div>
      </motion.div>

      {/* Scanning Laser Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
         <div className="w-[80%] h-[2px] bg-primary opacity-0 group-hover:opacity-50 shadow-[0_0_10px_var(--color-primary)] animate-[scanVertical_3s_ease-in-out_infinite] transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default InteractiveShape;
