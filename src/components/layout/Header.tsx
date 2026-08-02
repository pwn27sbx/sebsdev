import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio, ColorTheme } from '../../context/PortfolioContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { t } from '../../data/i18n';
import GlitchText from '../common/GlitchText';

const Header = () => {
  const { setIsHovering, darkMode, setDarkMode, lang, setLang, colorTheme, setColorTheme, immersionMode, setImmersionMode } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuLinks = [
    { path: '/', label: t('navHome', lang) },
    { path: '/proyectos', label: t('navWork', lang) },
    { path: '/about', label: t('navAbout', lang) },
    { path: '/contact', label: t('navContact', lang) }
  ];

  const themes: { id: ColorTheme; label: string }[] = [
    { id: 'default', label: 'Synthwave Circuit' },
    { id: 'holonoir', label: 'Holo Noir' },
    { id: 'metrovapor', label: 'Metro Vapor' },
    { id: 'biohazard', label: 'Biohazard' },
    { id: 'dataheist', label: 'Data Heist' },
    { id: 'tealnight', label: 'Teal Night' },
    { id: 'laserlime', label: 'Laser Lime' },
    { id: 'circuitgarden', label: 'Circuit Garden' }
  ];

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 300, damping: 24, staggerChildren: 0.05, delayChildren: 0.1 } 
    },
    exit: { opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full px-4 sm:px-8 py-3 flex justify-between items-start z-50 pointer-events-none">
      {/* Empty Left Side for spacing if needed */}
      <div></div>

      {/* Right Controls */}
      <div ref={headerRef} className="flex flex-col items-end gap-2 pointer-events-auto relative">
        <div className="flex items-center gap-3 relative">
          
          {/* Theme Dropdown Toggle */}
          <div style={{ viewTransitionName: 'color-theme-toggle' }}>
            <button
              onClick={() => { setIsThemeMenuOpen(!isThemeMenuOpen); setIsMenuOpen(false); }}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 relative overflow-hidden group ${isThemeMenuOpen ? 'text-bg-dark bg-accent shadow-[0_0_15px_var(--color-accent)] border-accent [.immersion-full_&]:text-bg-dark' : 'text-primary hover:text-accent bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-primary/30 hover:border-accent hover:scale-105 hover:shadow-[0_0_15px_var(--color-primary)] [.immersion-full_&]:bg-tertiary/50 [.immersion-full_&]:border-accent/30 [.immersion-full_&]:text-accent [.immersion-full_&]:hover:border-accent [.immersion-full_&]:hover:shadow-[0_0_20px_var(--color-accent)]'}`}
              aria-label="Open color themes"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
              </svg>
            </button>
          </div>

          {/* Dark Mode Toggle */}
          {immersionMode !== 'full' && (
            <div style={{ viewTransitionName: 'theme-toggle' }}>
              <button
                role="switch"
                aria-checked={darkMode}
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center justify-center w-10 h-10 rounded-full text-primary hover:text-accent bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-primary/30 hover:border-accent transition-all duration-500 hover:scale-105 hover:shadow-[0_0_15px_var(--color-primary)] relative overflow-hidden group"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {darkMode ? (
                    <motion.svg
                      key="sun"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                      className="w-5 h-5 absolute"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="moon"
                      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                      className="w-5 h-5 absolute"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </div>
          )}

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center justify-center w-10 h-10 rounded-full text-primary hover:text-accent bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-primary/30 hover:border-accent transition-all duration-500 hover:scale-105 hover:shadow-[0_0_15px_var(--color-primary)] [.immersion-full_&]:bg-tertiary/50 [.immersion-full_&]:border-accent/30 [.immersion-full_&]:text-accent [.immersion-full_&]:hover:border-accent [.immersion-full_&]:hover:shadow-[0_0_20px_var(--color-accent)] gap-1 relative overflow-hidden group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div 
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
              className="w-5 h-[2px] bg-current origin-center transition-all duration-300"
            />
            <motion.div 
              animate={{ opacity: isMenuOpen ? 0 : 1, x: isMenuOpen ? 10 : 0 }}
              className="w-5 h-[2px] bg-current transition-all duration-300"
            />
            <motion.div 
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
              className="w-5 h-[2px] bg-current origin-center transition-all duration-300"
            />
          </button>
        </div>

        {/* Mini Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
              <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-14 right-0 min-w-[260px] bg-white/95 dark:bg-black/95 backdrop-blur-xl border-2 border-secondary shadow-[0_0_15px_var(--color-secondary),inset_0_0_10px_var(--color-secondary)] rounded-none origin-top-right overflow-hidden flex flex-col [.immersion-full_&]:bg-bg-dark/95 [.immersion-full_&]:border-accent [.immersion-full_&]:shadow-[0_0_20px_var(--color-accent),inset_0_0_15px_var(--color-accent)]"
            >
              {/* HUD Header */}
              <div className="w-full bg-secondary text-white dark:text-black font-mono text-[10px] px-3 py-1 flex justify-between items-center uppercase tracking-widest font-bold [.immersion-full_&]:bg-accent [.immersion-full_&]:text-bg-dark">
                <span>SYS.NAV // OVERRIDE</span>
                <span className="animate-pulse">_</span>
              </div>
              
              <div className="flex flex-col gap-0 relative z-10 p-2">
                {menuLinks.map((link, i) => {
                  const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`group flex items-center justify-between px-3 py-3 transition-colors duration-200 border-b border-secondary/20 last:border-b-0 ${isActive ? 'bg-secondary/10' : 'hover:bg-secondary'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-[10px] transition-colors duration-200 ${isActive ? 'text-secondary' : 'text-secondary/80 dark:text-secondary/50 group-hover:text-white dark:group-hover:text-black'}`}>
                            {`<0${i + 1}>`}
                          </span>
                          
                          {/* GlitchText only activates on hover */}
                          <span className={`font-anton text-3xl uppercase tracking-tighter transition-colors duration-200 ${isActive ? 'text-secondary drop-shadow-[0_0_8px_var(--color-secondary)] [.immersion-full_&]:text-accent [.immersion-full_&]:drop-shadow-[0_0_8px_var(--color-accent)]' : 'text-black dark:text-white group-hover:text-white dark:group-hover:text-black [.immersion-full_&]:text-white/70 [.immersion-full_&]:group-hover:text-white'}`}>
                             <GlitchText enableOnHover={true} speed={0.4} variant={1}>
                               {link.label}
                             </GlitchText>
                          </span>
                        </div>
                        
                        {isActive && (
                          <div className="w-2 h-6 bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)] [.immersion-full_&]:bg-accent [.immersion-full_&]:shadow-[0_0_10px_var(--color-accent)]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="w-full h-[1px] bg-secondary/30 my-2"></div>

                <motion.div variants={itemVariants} className="px-3 py-2 flex justify-between items-center">
                  <span className="font-mono text-[10px] text-secondary/80 dark:text-secondary/70 uppercase tracking-widest">
                    CONFIG.LANG
                  </span>
                  <div className="flex items-center gap-1 font-mono text-sm">
                    <button
                      onClick={() => setLang('es')}
                      className={`transition-all duration-200 px-2 py-0.5 border ${lang === 'es' ? 'bg-primary text-white border-primary shadow-[0_0_10px_var(--color-primary)]' : 'bg-transparent text-secondary/80 dark:text-secondary/70 border-secondary/50 dark:border-secondary/30 hover:bg-secondary/20 hover:text-secondary'}`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      ES
                    </button>
                    <button
                      onClick={() => setLang('en')}
                      className={`transition-all duration-200 px-2 py-0.5 border ${lang === 'en' ? 'bg-primary text-white border-primary shadow-[0_0_10px_var(--color-primary)]' : 'bg-transparent text-secondary/80 dark:text-secondary/70 border-secondary/50 dark:border-secondary/30 hover:bg-secondary/20 hover:text-secondary'}`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      EN
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Theme Menu Dropdown */}
        <AnimatePresence>
          {isThemeMenuOpen && (
              <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-14 right-24 min-w-[280px] bg-white/95 dark:bg-black/95 backdrop-blur-xl border-2 border-primary shadow-[0_0_15px_var(--color-primary),inset_0_0_10px_var(--color-primary)] rounded-none origin-top-right overflow-hidden flex flex-col [.immersion-full_&]:bg-bg-dark/95 [.immersion-full_&]:border-accent [.immersion-full_&]:shadow-[0_0_20px_var(--color-accent),inset_0_0_15px_var(--color-accent)]"
            >
              <div className="w-full bg-primary text-white dark:text-black font-mono text-[10px] px-3 py-1 flex justify-between items-center uppercase tracking-widest font-bold [.immersion-full_&]:bg-accent [.immersion-full_&]:text-bg-dark">
                <span>SYS.THEME // OVERRIDE</span>
                <span className="animate-pulse">_</span>
              </div>
              
              <div className="flex flex-col gap-0 relative z-10 p-2 pb-4">
                
                {/* Immersion Mode Switch */}
                <div className="px-3 py-3 border-b border-primary/20 mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[10px] text-primary/80 dark:text-primary/70 uppercase tracking-widest">
                      IMMERSION_MODE
                    </span>
                  </div>
                  <div className="flex bg-black/10 dark:bg-white/10 p-1 rounded-sm border border-primary/30 [.immersion-full_&]:border-accent/30">
                    <button
                      onClick={() => setImmersionMode('relax')}
                      className={`flex-1 py-1 font-mono text-xs uppercase tracking-wider transition-all ${immersionMode === 'relax' ? 'bg-primary text-white shadow-[0_0_10px_var(--color-primary)]' : 'text-gray-500 hover:text-primary'}`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      Relax
                    </button>
                    <button
                      onClick={() => setImmersionMode('full')}
                      className={`flex-1 py-1 font-mono text-xs uppercase tracking-wider transition-all ${immersionMode === 'full' ? 'bg-primary text-white shadow-[0_0_10px_var(--color-primary)] [.immersion-full_&]:bg-accent [.immersion-full_&]:text-bg-dark [.immersion-full_&]:shadow-[0_0_10px_var(--color-accent)]' : 'text-gray-500 hover:text-primary [.immersion-full_&]:hover:text-accent'}`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      Full
                    </button>
                  </div>
                  <p className="font-mono text-[9px] text-gray-500 mt-2 leading-tight">
                    {immersionMode === 'relax' ? 'TEXT & HIGHLIGHTS ONLY' : 'TOTAL BACKGROUND & UI REWRITE'}
                  </p>
                </div>

                {/* Theme List */}
                <span className="font-mono text-[10px] text-primary/80 dark:text-primary/70 uppercase tracking-widest px-3 pt-1 pb-2">
                  COLOR_PALETTE
                </span>
                
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                  {themes.map((theme, i) => {
                    const isActive = colorTheme === theme.id;
                    return (
                      <motion.div key={theme.id} variants={itemVariants}>
                        <button
                          onClick={() => { setColorTheme(theme.id); }}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className={`w-full group flex items-center justify-between px-3 py-2 transition-colors duration-200 border-b border-primary/10 last:border-b-0 ${isActive ? 'bg-primary/10' : 'hover:bg-primary/5'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-mono text-[10px] transition-colors duration-200 ${isActive ? 'text-primary' : 'text-primary/50 group-hover:text-primary/80'}`}>
                              {`<0${i + 1}>`}
                            </span>
                            <span className={`font-anton text-lg uppercase tracking-wider transition-colors duration-200 ${isActive ? 'text-primary drop-shadow-[0_0_5px_var(--color-primary)] [.immersion-full_&]:text-accent [.immersion-full_&]:drop-shadow-[0_0_5px_var(--color-accent)]' : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white [.immersion-full_&]:text-white/70 [.immersion-full_&]:group-hover:text-white'}`}>
                              {theme.label}
                            </span>
                          </div>
                          {isActive && (
                            <div className="w-1.5 h-4 bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)] [.immersion-full_&]:bg-accent [.immersion-full_&]:shadow-[0_0_8px_var(--color-accent)]" />
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
