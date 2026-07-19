import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { t } from '../data/i18n';
import type { ArchiveProject } from '../data/projects';
import { ARCHIVE_PROJECTS } from '../data/projects';

const Archive = () => {
  const { lang } = usePortfolio();
  const [activeProject, setActiveProject] = useState<ArchiveProject | null>(null);
  const { showButton: showBackToTop, scrollToTop } = useScrollToTop(600);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { scrollY } = useScroll();
  const titleX = useTransform(scrollY, [0, 2000], [0, 1000]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(mouseX, springConfig);
  const moveY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 112.5);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] text-[#111] dark:text-white font-sans transition-colors duration-500 overflow-x-hidden pt-24 pb-20" onMouseMove={handleMouseMove}>
      {/* Skip to content link */}
      <a href="#archive-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#00A889] focus:text-white focus:rounded-md focus:text-sm focus:uppercase focus:tracking-widest">
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-none">
        <Link to="/" className="pointer-events-auto group flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
          {t('back', lang)}
        </Link>
        <div className="text-xs uppercase tracking-[0.2em]">Archive // 2021 — 2026</div>
      </nav>

      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 sm:px-12 pt-10 mb-20 overflow-visible flex flex-col items-start"
      >
        <div className="w-full max-w-md mb-12 sm:mb-20 ml-2">
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-light leading-relaxed">{t('archiveDesc', lang)}</p>
        </div>
        <motion.h1 style={{ x: titleX }} className="font-anton text-[18vw] sm:text-[15vw] leading-none uppercase tracking-tighter whitespace-nowrap">
          {t('projects', lang)}
        </motion.h1>
        <div className="h-[2px] w-full bg-[#111] dark:bg-white/20 mt-4" />
      </motion.header>

      <section id="archive-content" className="px-4 sm:px-12 relative">
        <div className="flex text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-6 px-4">
          <div className="w-[10%]">#</div>
          <div className="w-[15%] hidden sm:block">{t('archiveYear', lang)}</div>
          <div className="flex-1">{t('archiveProject', lang)}</div>
          <div className="w-[25%] text-right">{t('archiveCategory', lang)}</div>
        </div>

        {ARCHIVE_PROJECTS.map((project, index) => (
          <motion.a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            className="group flex items-center py-8 sm:py-12 border-b border-gray-300 dark:border-white/10 hover:border-[#00A889] transition-colors duration-300 px-4 relative z-10"
          >
            <div className="w-[10%] font-mono text-xs sm:text-sm text-gray-400">{project.id}</div>
            <div className="w-[15%] font-mono text-xs sm:text-sm text-gray-400 hidden sm:block">{project.year}</div>
            <div className="flex-1">
              <h2 className="font-anton text-4xl sm:text-7xl uppercase group-hover:text-[#00A889] transition-colors duration-300">{project.title}</h2>
            </div>
            <div className="w-[25%] text-right text-xs sm:text-sm uppercase tracking-widest text-gray-500 group-hover:text-[#111] dark:group-hover:text-white transition-colors">
              {project.category}
            </div>
          </motion.a>
        ))}
      </section>

      {(() => {
        const p = activeProject;
        return (
          <motion.div className="fixed top-0 left-0 w-[400px] aspect-video pointer-events-none z-50 overflow-hidden rounded-xl shadow-2xl border-4 border-white dark:border-[#111]"
            style={{ x: moveX, y: moveY, opacity: p ? 1 : 0, scale: p ? 1 : 0.5, rotate: p ? 5 : 0 }}
            transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3 } }}
          >
            {p?.video ? (
              <video src={p.video} autoPlay loop muted playsInline className="w-full h-full object-cover gpu" />
            ) : (
              p && <img src={p.img} className="w-full h-full object-cover gpu" alt={p.title + ' preview'} loading="lazy" />
            )}
          </motion.div>
        );
      })()}

      <motion.button onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-8 right-8 z-[60] w-12 h-12 rounded-full bg-[#00A889] text-white shadow-lg shadow-[#00A889]/30 flex items-center justify-center hover:shadow-xl hover:shadow-[#00A889]/40 hover:-translate-y-1 transition-[transform,box-shadow] duration-300 cursor-none"
        aria-label={t('backToTop', lang)}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </motion.button>
    </div>
  );
};

export default Archive;
