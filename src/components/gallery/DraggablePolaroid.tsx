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
  const isMagenta = index % 2 === 0;

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
          className={`group relative pointer-events-auto cursor-grab w-[65vw] sm:w-[40vw] lg:w-[28vw] aspect-[4/3] rounded-none p-1 sm:p-1.5 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border-4 border-[#000] dark:border-[#222] shadow-[8px_8px_0_#000] dark:shadow-[8px_8px_0_#000] hover:-translate-y-1 hover:-translate-x-1 overflow-hidden transform-gpu will-change-transform transition-all duration-75 ${isMagenta ? 'hover:shadow-[12px_12px_0_var(--color-primary)]' : 'hover:shadow-[12px_12px_0_var(--color-secondary)]'}`}
        >            
          <div className="relative w-full h-full overflow-hidden bg-[var(--color-bg-dark)] rounded-none">
            <div className="film-grain absolute inset-0 z-10"></div>
            
            <img draggable="false" src={project.img} alt={project.title || (project.category + ' project thumbnail ' + project.id)} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-[1.2] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 will-change-transform transition-all duration-75" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-75 z-10 pointer-events-none"></div>
            
            {/* Industrial Caution Tape */}
            <div className={`absolute bottom-0 left-0 w-full h-2 sm:h-3 z-20 pointer-events-none opacity-80 group-hover:opacity-100 ${isMagenta ? 'bg-[repeating-linear-gradient(45deg,var(--color-primary),var(--color-primary)_10px,#000_10px,#000_20px)]' : 'bg-[repeating-linear-gradient(45deg,var(--color-secondary),var(--color-secondary)_10px,#000_10px,#000_20px)]'}`}></div>

            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 pointer-events-none">
              <span className={`bg-black px-2 py-0.5 text-[10px] sm:text-xs font-mono font-black tracking-widest border ${isMagenta ? 'text-primary border-primary shadow-[2px_2px_0_var(--color-primary)]' : 'text-secondary border-secondary shadow-[2px_2px_0_var(--color-secondary)]'}`}>SYS-{project.id}</span>
            </div>
            <div className="absolute bottom-4 left-2 sm:bottom-5 sm:left-3 z-20 flex gap-2 pointer-events-none">
              <span className={`text-black px-2 py-1 text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase border border-black shadow-[4px_4px_0_#000] ${isMagenta ? 'bg-secondary' : 'bg-primary'}`}>
                {project.category}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default DraggablePolaroid;
