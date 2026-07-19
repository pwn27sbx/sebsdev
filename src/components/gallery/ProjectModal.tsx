import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import type { GalleryProject } from '../../data/projects';

interface ProjectModalProps {
  project: GalleryProject | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { setIsHovering, lang } = usePortfolio();
  
  return (
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
            className="relative max-w-3xl w-full bg-white dark:bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video relative overflow-hidden bg-[#050505]">
              <div className="film-grain absolute inset-0 z-10"></div>
              {project && <img src={project.img} alt={project.title}
                className="w-full h-full object-cover"
              />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <button onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-all duration-300"
                aria-label="Close"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-[#00A889] text-white px-3 py-1 rounded-md text-xs font-mono font-bold shadow-lg">{project.id}</span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#00A889] font-bold">{project.category}</span>
              <h3 className="font-anton text-3xl sm:text-4xl uppercase tracking-tighter text-[#111] dark:text-white mt-2">{project.title}</h3>
              {project.year && <p className="text-xs font-mono text-gray-400 mt-2">{project.year}</p>}
              <div className="flex gap-3 mt-6">
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="px-6 py-3 bg-[#00A889] text-white rounded-full font-anton text-xs uppercase tracking-widest hover:bg-[#00c5a1] transition-all duration-300 hover:-translate-y-0.5 cursor-none"
                >
                  {lang === 'es' ? 'Ver Proyecto' : 'View Project'}
                </a>
                <button onClick={onClose}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-full font-anton text-xs uppercase tracking-widest hover:border-gray-500 transition-all duration-300 cursor-none"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ProjectModal;
