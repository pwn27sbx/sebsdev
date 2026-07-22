import React, { useState, useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import type { GalleryProject } from '../../data/projects';

interface PolaroidProps {
  project: GalleryProject;
  index: number;
  scrollYProgress: MotionValue<number>;
  bringToFront: () => number;
  onProjectClick: (p: GalleryProject) => void;
}

const DraggablePolaroid = ({ project, index, scrollYProgress, bringToFront, onProjectClick }: PolaroidProps) => {
  const { setIsHovering } = usePortfolio();
  const startDrop = index * 0.05;
  const endDrop = startDrop + 0.25;
  const yDrop = useTransform(scrollYProgress, [startDrop, endDrop], ['-120vh', '0vh']);
  const [zIndex, setZIndex] = useState(10 + index);
  const hasDragged = useRef(false);

  return (
    <motion.div style={{ y: yDrop, zIndex }} className="absolute flex items-center justify-center w-full h-full pointer-events-none transform-gpu will-change-transform">
      <div style={{ marginLeft: project.xOffset, marginTop: project.yOffset }} className="pointer-events-none">
        <motion.div
          onPointerDown={() => { setZIndex(bringToFront()); hasDragged.current = false; }}
          onPointerUp={() => { if (!hasDragged.current) onProjectClick(project); }}
          onDragStart={() => { hasDragged.current = true; }}
          drag dragTransition={{ power: 0.05, timeConstant: 150 }}
          initial={{ rotate: project.rot }}
          whileDrag={{ scale: 1.05, rotate: 0, cursor: 'grabbing' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="group relative pointer-events-auto cursor-grab w-[65vw] sm:w-[40vw] lg:w-[28vw] aspect-[4/3] rounded-2xl p-2 sm:p-3 bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden transform-gpu will-change-transform transition-colors duration-500"
        >            <div className="hover-shine-effect rounded-xl"></div>
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#050505] shadow-inner ring-1 ring-black/5 dark:ring-white/10 gpu-layer">
            <div className="film-grain absolute inset-0 z-10"></div>
            <img draggable="false" src={project.img} alt={project.title || (project.category + ' project thumbnail ' + project.id)} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-80 transition-[transform,filter,opacity] duration-700 scale-110 group-hover:scale-100 group-hover:grayscale-0 group-hover:opacity-100 will-change-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-10"></div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
              <span className="bg-[#00A889] text-white px-2.5 py-1 rounded-md text-[9px] sm:text-xs font-mono font-bold shadow-lg border border-[#00A889]/50">{project.id}</span>
            </div>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex gap-2">
              <span className="bg-white/20 dark:bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] sm:text-xs font-mono font-medium tracking-widest border border-white/20 dark:border-white/10">{project.category}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default DraggablePolaroid;
