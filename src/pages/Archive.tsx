import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { t } from '../data/i18n';
import type { ArchiveProject } from '../data/projects';
import { ARCHIVE_PROJECTS } from '../data/projects';
import ScrambledText from '../components/common/ScrambledText';
import GlitchText from '../components/common/GlitchText';
import TextType from '../components/common/TextType';

const Archive = () => {
  const { lang, setIsHovering } = usePortfolio();
  const [activeProject, setActiveProject] = useState<ArchiveProject | null>(null);
  const { showButton: showBackToTop, scrollToTop } = useScrollToTop(600);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 500], [0, 100]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen relative bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] bg-fixed text-[#111] dark:text-white font-sans transition-colors duration-500 pt-24 pb-20">
      <Helmet>
        <title>Archivo de Proyectos | Sebastian</title>
        <meta name="description" content="Explora mi archivo de proyectos interactivos desde 2021 a 2026. Especializado en React y UI/UX." />
        <link rel="canonical" href="https://pwn27sbx.github.io/mi-portafolio/proyectos" />
      </Helmet>

      {/* Skip to content link */}
      <a href="#archive-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-secondary focus:text-white focus:rounded-md focus:text-sm focus:uppercase focus:tracking-widest">
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-4 sm:p-8 flex justify-between items-center z-[100] pointer-events-none">
        <Link 
          to="/" 
          className="ml-4 sm:ml-8 pointer-events-auto group flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest px-4 py-2 text-secondary bg-transparent hover:text-primary transition-colors duration-300"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="relative z-10 font-mono">[ ← {t('back', lang) || 'BACK'} ]</span>
        </Link>
      </nav>

      {/* Header */}
      <motion.header
        style={{ y: titleY, opacity: titleOpacity }}
        className="px-4 sm:px-12 pt-4 sm:pt-8 pb-12 flex flex-col items-start relative z-20"
      >
        <div className="font-mono text-xs sm:text-sm text-primary mb-4 tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-primary animate-pulse" />
          <ScrambledText text="[ DATA_ARCHIVE_ACCESS // 2021-2026 ]" speed={0.4} />
        </div>
        <h1 className="font-anton text-6xl sm:text-8xl md:text-[10vw] uppercase tracking-tighter leading-none text-transparent [-webkit-text-stroke:2px_#111] dark:[-webkit-text-stroke:2px_#fff] [.immersion-full_&]:[-webkit-text-stroke:2px_var(--color-accent)]">
          <GlitchText speed={1.2} enableShadows enableOnHover={false}>
            {t('projects', lang)}
          </GlitchText>
        </h1>
      </motion.header>

      {/* Main Content Area */}
      <div id="archive-content" className="px-4 sm:px-12 w-full flex flex-col lg:flex-row items-start gap-8 relative z-30">
        
        {/* Project List (Left Side) */}
        <div className="w-full lg:w-3/5 flex flex-col">
          {/* List Header */}
          <div className="flex font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 [.immersion-full_&]:text-accent/60 border-b border-gray-300 dark:border-gray-800 [.immersion-full_&]:border-accent/20 pb-4 mb-4">
            <div className="w-[10%]">#ID</div>
            <div className="w-[15%] hidden sm:block">YEAR</div>
            <div className="flex-1">PROJECT_NAME</div>
            <div className="w-[25%] text-right">CLASS</div>
          </div>

          {/* List Items */}
          <div className="flex flex-col gap-2">
            {ARCHIVE_PROJECTS.map((project) => (
              <a 
                key={project.id} 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={() => { setActiveProject(project); setIsHovering(true); }}
                onMouseLeave={() => { setActiveProject(null); setIsHovering(false); }}
                className="group relative flex items-center py-6 sm:py-8 px-4 border border-transparent hover:border-secondary/30 bg-transparent hover:bg-black/5 dark:hover:bg-secondary/5 [.immersion-full_&]:hover:bg-secondary/10 transition-all duration-300"
              >
                {/* Active Indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-secondary transition-transform duration-300 origin-bottom ${activeProject?.id === project.id ? 'scale-y-100' : 'scale-y-0'}`} />
                
                <div className="w-[10%] font-mono text-xs sm:text-sm text-gray-400 [.immersion-full_&]:text-primary/60 group-hover:text-secondary transition-colors">{project.id}</div>
                <div className="w-[15%] font-mono text-xs sm:text-sm text-gray-400 [.immersion-full_&]:text-accent/50 hidden sm:block">{project.year}</div>
                
                <div className="flex-1">
                  <h2 className="font-anton text-3xl sm:text-5xl uppercase text-[#111] dark:text-white [.immersion-full_&]:text-secondary group-hover:text-secondary [.immersion-full_&]:group-hover:text-primary transition-colors tracking-wide">
                    <TextType
                      as="span"
                      text={project.title}
                      showCursor={true}
                      cursorCharacter="_"
                      cursorBlinkDuration={0.5}
                      typingSpeed={75}
                      loop={false}
                      startOnVisible={true}
                      initialDelay={50}
                      rootMargin="-50px"
                    />
                  </h2>
                </div>
                
                <div className="w-[25%] text-right font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 [.immersion-full_&]:text-accent/50 group-hover:text-[#111] dark:group-hover:text-white [.immersion-full_&]:group-hover:text-accent transition-colors">
                  {project.category}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Static HUD Preview (Right Side) */}
        <div className="w-full lg:w-2/5 hidden lg:block h-[calc(100vh-160px)] sticky top-24">
          <div className="w-full h-full relative border border-gray-300 dark:border-gray-800 [.immersion-full_&]:border-primary/30 bg-white/10 dark:bg-black/20 [.immersion-full_&]:bg-[var(--brand-bg-dark)]/40 backdrop-blur-md overflow-hidden p-4 flex flex-col justify-center items-center group-hover:border-secondary/50 transition-colors duration-500">
            
            {/* Corner HUD Elements */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
            
            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,color-mix(in srgb, var(--color-secondary) calc(0.05 * 100%), transparent)_50%)] bg-[length:100%_4px] z-10" />

            <AnimatePresence mode="wait">
              {activeProject ? (
                <motion.div 
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative z-0"
                >
                  {activeProject.video ? (
                    <video src={activeProject.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img src={activeProject.img} className="w-full h-full object-cover" alt={activeProject.title} loading="lazy" />
                  )}
                  
                  {/* HUD Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 p-4 font-mono text-xs text-secondary flex flex-col gap-1">
                    <div className="flex justify-between border-b border-secondary/30 pb-2 mb-2">
                      <span>STATUS: [ OK ]</span>
                      <span>ID: {activeProject.id}</span>
                    </div>
                    <div className="uppercase tracking-widest text-white text-sm">
                      <ScrambledText text={activeProject.title} speed={0.5} />
                    </div>
                    <div className="text-gray-400 [.immersion-full_&]:text-accent/60 text-[10px]">
                      SYS_TECH: {activeProject.category} // {activeProject.year}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-secondary/50 font-mono text-sm tracking-widest flex flex-col items-center gap-4"
                >
                  <svg className="w-12 h-12 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span>AWAITING_SELECTION...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Back to Top Button */}
      <motion.button onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-[60] w-12 h-12 bg-transparent border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-black transition-colors duration-300 md:cursor-none"
        aria-label={t('backToTop', lang)}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </motion.button>
    </div>
  );
};

export default Archive;
