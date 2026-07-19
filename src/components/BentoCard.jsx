import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function BentoCard({ project }) {
  const { setIsHovering } = usePortfolio();
  const [isHovered, setHovered] = useState(false);

  const isLarge = project.spanClass.includes('md:col-span-2 md:row-span-2');
  const isSmall = project.spanClass.includes('md:col-span-1 md:row-span-1');
  const isMedium = !isLarge && !isSmall;

  const paddingClass = isLarge ? 'p-6 md:p-8' : isMedium ? 'p-5 md:p-6' : 'p-4';
  const titleClass = isLarge ? 'text-4xl md:text-5xl lg:text-7xl' : isMedium ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl';
  const btnClass = isLarge ? 'w-12 h-12 md:w-14 md:h-14' : isMedium ? 'w-10 h-10 md:w-12 md:h-12' : 'w-8 h-8 md:w-10 md:h-10';
  const svgClass = isLarge ? 'w-5 h-5 md:w-6 md:h-6' : isMedium ? 'w-4 h-4 md:w-5 md:h-5' : 'w-4 h-4';
  const categoryClass = isLarge ? 'text-[10px] md:text-[12px]' : isMedium ? 'text-[9px] md:text-[10px]' : 'text-[8px] md:text-[9px]';

  const slideVariants = {
    top: { y: '-100%', x: 0 },
    bottom: { y: '100%', x: 0 },
    left: { x: '-100%', y: 0 },
    right: { x: '100%', y: 0 },
    center: { y: 0, x: 0 }
  };

  const handleFocus = () => { setIsHovering(true); setHovered(true); };
  const handleBlur = () => { setIsHovering(false); setHovered(false); };

  return (
    <motion.div
      layout
      className={"group relative overflow-hidden rounded-xl md:rounded-2xl border-[0.5px] border-white/20 dark:border-white/10 bg-[#050505] cursor-pointer md:cursor-none " + project.spanClass + " transform-gpu shadow-none hover:shadow-[0_20px_50px_rgba(0,168,137,0.15)] transition-all duration-500"}
      onMouseEnter={() => { setIsHovering(true); setHovered(true); }}
      onMouseLeave={() => { setIsHovering(false); setHovered(false); }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="article"
      aria-label={project.title + ' - ' + project.category}
    >
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
        />

        {project.hoverImg && (
          <motion.img
            src={project.hoverImg}
            alt={project.title + ' hover'}
            loading="lazy"
            initial={project.slideDirection}
            variants={slideVariants}
            animate={isHovered ? 'center' : project.slideDirection}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className={"relative z-30 h-full flex flex-col justify-between pointer-events-none " + paddingClass}>
        <div className="flex justify-between items-start pointer-events-auto w-full">
          <span className={"text-white px-0 py-1 font-mono font-bold uppercase tracking-[0.2em] border-b border-transparent group-hover:border-[#00A889] group-hover:text-[#00A889] transition-colors duration-300 " + categoryClass}>
            {project.category}
          </span>
          <div className={"rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#00A889] group-hover:text-white group-hover:scale-110 group-hover:-rotate-45 transition-all duration-500 shrink-0 shadow-lg " + btnClass}>
            <svg className={svgClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-auto">
          <h3 className={"text-white font-anton uppercase tracking-tighter mb-0 leading-[0.9] group-hover:text-[#00A889] transition-colors duration-300 " + titleClass}>
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.tech.map(t => (
              <span key={t} className={"font-mono border border-white/40 text-white rounded-sm bg-black/80 text-[10px] md:text-[11px] px-2.5 py-1"}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

