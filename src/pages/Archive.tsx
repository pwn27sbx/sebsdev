import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useSpring, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { t } from '../data/i18n';
import type { ArchiveProject } from '../data/projects';
import { ARCHIVE_PROJECTS } from '../data/projects';
import ScrambledText from '../components/common/ScrambledText';
import TextPressure from '../components/common/TextPressure';
import TextType from '../components/common/TextType';

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
      <Helmet>
        <title>Archivo de Proyectos | Sebastian</title>
        <meta name="description" content="Explora mi archivo de proyectos interactivos desde 2021 a 2026. Especializado en React y UI/UX." />
        <link rel="canonical" href="https://pwn27sbx.github.io/mi-portafolio/proyectos" />
      </Helmet>
      {/* Skip to content link */}
      <a href="#archive-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#00A889] focus:text-white focus:rounded-md focus:text-sm focus:uppercase focus:tracking-widest">
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <nav className="fixed top-0 w-full p-4 sm:p-8 flex justify-between items-center z-[100] pointer-events-none">
        <Link to="/" className="pointer-events-auto group flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-[#00A889] dark:hover:text-[#00A889]">
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
          {t('back', lang)}
        </Link>
        <div className="pointer-events-auto text-[10px] sm:text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
          Archive // 2021 — 2026
        </div>
      </nav>

      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 sm:px-12 pt-10 mb-8 sm:mb-20 overflow-visible flex flex-col items-start"
      >
        <div className="w-full max-w-md min-h-[4rem] sm:min-h-[5rem] mb-2 sm:mb-4 ml-2 flex items-end relative z-10">
          <ScrambledText 
            className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-light leading-relaxed m-0"
            style={{ margin: 0 }}
            radius={100}
            duration={2}
            speed={0.5}
            scrambleChars="«¤-¤»"
          >
            {t('archiveDesc', lang)}
          </ScrambledText>
        </div>
        <motion.div style={{ x: titleX }} className="w-full relative mt-4 mb-4 sm:mb-6 text-[#111] dark:text-white">
          <TextPressure
            text={t('projects', lang)}
            flex={false}
            alpha={false}
            stroke={true}
            width
            weight
            italic
            textColor="currentColor"
            strokeColor="#00A889"
            strokeWidth={5}
            minFontSize={36}
            className="text-left scale-y-[1.5] sm:scale-y-[1.3] origin-bottom"
          />
        </motion.div>
        <div className="h-[2px] w-full bg-[#111] dark:bg-white/20 mt-4 sm:mt-6 relative z-10" />
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
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            className="group flex items-center py-8 sm:py-12 border-b border-gray-300 dark:border-white/10 hover:border-[#00A889] transition-colors duration-300 px-4 relative z-10"
          >
            <div className="w-[10%] font-mono text-xs sm:text-sm text-gray-400">{project.id}</div>
            <div className="w-[15%] font-mono text-xs sm:text-sm text-gray-400 hidden sm:block">{project.year}</div>
            <div className="flex-1">
              <TextType
                as="h2"
                text={project.title}
                className="font-anton text-4xl sm:text-7xl uppercase group-hover:text-[#00A889] transition-colors duration-300"
                showCursor={true}
                cursorCharacter="_"
                cursorBlinkDuration={0.5}
                typingSpeed={75}
                loop={false}
                startOnVisible={true}
                initialDelay={50}
                rootMargin="-50px"
              />
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
        className="fixed bottom-8 right-8 z-[60] w-12 h-12 rounded-full bg-[#00A889] text-white shadow-lg shadow-[#00A889]/30 flex items-center justify-center hover:shadow-xl hover:shadow-[#00A889]/40 hover:-translate-y-1 transition-[transform,box-shadow] duration-300 md:cursor-none"
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
