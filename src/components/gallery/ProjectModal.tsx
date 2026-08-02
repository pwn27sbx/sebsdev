import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import type { GalleryProject } from '../../data/projects';

interface ProjectModalProps {
  project: GalleryProject | null;
  index?: number;
  onClose: () => void;
}

const ProjectModal = ({ project, index, onClose }: ProjectModalProps) => {
  const { setIsHovering, lang } = usePortfolio();
  const isMagenta = (index ?? 0) % 2 === 0;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`relative max-w-3xl w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] rounded-none border-4 border-[#000] dark:border-[#222] transform-gpu overflow-hidden ${isMagenta ? 'shadow-[16px_16px_0_var(--color-primary)]' : 'shadow-[16px_16px_0_var(--color-secondary)]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video relative overflow-hidden bg-[var(--color-bg-dark)] border-b-4 border-black dark:border-[#222]">
              <div className="film-grain absolute inset-0 z-10 pointer-events-none"></div>
              {project && <img src={project.img} alt={project.title}
                className="w-full h-full object-cover grayscale contrast-[1.2] opacity-80"
              />}
              <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />
              
              {/* Industrial Caution Tape */}
              <div className={`absolute bottom-0 left-0 w-full h-3 sm:h-4 z-20 pointer-events-none opacity-90 ${isMagenta ? 'bg-[repeating-linear-gradient(45deg,var(--color-primary),var(--color-primary)_10px,#000_10px,#000_20px)]' : 'bg-[repeating-linear-gradient(45deg,var(--color-secondary),var(--color-secondary)_10px,#000_10px,#000_20px)]'}`}></div>

              <button onClick={onClose}
                className={`absolute top-0 right-0 z-30 w-12 h-12 text-black border-b-4 border-l-4 border-black hover:bg-white flex items-center justify-center transition-colors duration-150 ${isMagenta ? 'bg-primary hover:text-primary' : 'bg-secondary hover:text-secondary'}`}
                aria-label="Close"
              >
                <svg className="w-6 h-6 font-bold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              
              <div className="absolute bottom-6 left-4 sm:left-6 z-20 pointer-events-none">
                <span className={`bg-black px-2 py-0.5 text-[10px] sm:text-xs font-mono font-black tracking-widest border ${isMagenta ? 'text-primary border-primary shadow-[2px_2px_0_var(--color-primary)]' : 'text-secondary border-secondary shadow-[2px_2px_0_var(--color-secondary)]'}`}>SYS-{project.id}</span>
              </div>
            </div>
            <div className="p-6 sm:p-8 relative">
              <span className={`text-black px-2 py-1 text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase border border-black shadow-[4px_4px_0_#000] inline-block mb-4 ${isMagenta ? 'bg-secondary' : 'bg-primary'}`}>{project.category}</span>
              
              <h3 className="font-anton text-4xl sm:text-5xl uppercase tracking-tighter text-[#111] dark:text-white leading-none">{project.title}</h3>
              {project.year && <p className={`text-xs font-mono text-gray-500 dark:text-gray-400 mt-3 font-bold tracking-widest border-l-4 pl-2 ${isMagenta ? 'border-primary' : 'border-secondary'}`}>{project.year}</p>}
              
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t-2 border-dashed border-gray-300 dark:border-gray-800">
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`px-8 py-3 text-black border-2 border-black font-anton text-sm uppercase tracking-widest shadow-[6px_6px_0_#000] hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none transition-all duration-75 md:cursor-none ${isMagenta ? 'bg-secondary' : 'bg-primary'}`}
                >
                  {lang === 'es' ? 'Ver Proyecto' : 'View Project'}
                </a>
                <button onClick={onClose}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="px-8 py-3 bg-white dark:bg-[#111] text-black dark:text-white border-2 border-black dark:border-white font-anton text-sm uppercase tracking-widest shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_#fff] hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none transition-all duration-75 md:cursor-none"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
export default ProjectModal;
