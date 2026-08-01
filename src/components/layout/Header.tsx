import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import GlitchText from '../common/GlitchText';

const Header = () => {
  const { setIsHovering, darkMode, setDarkMode, lang, setLang } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuLinks = [
    { path: '/', label: lang === 'es' ? 'INICIO' : 'HOME' },
    { path: '/proyectos', label: lang === 'es' ? 'PROYECTOS' : 'WORK' },
    { path: '/about', label: lang === 'es' ? 'SOBRE MÍ' : 'ABOUT' },
    { path: '/contact', label: lang === 'es' ? 'CONTACTO' : 'CONTACT' }
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
      <div className="flex flex-col items-end gap-2 pointer-events-auto relative">
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <div style={{ viewTransitionName: 'theme-toggle' }}>
            <button
              role="switch"
              aria-checked={darkMode}
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#00A889] dark:hover:text-[#00A889] bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,168,137,0.3)] relative overflow-hidden group"
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

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#00A889] dark:hover:text-[#00A889] bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,168,137,0.3)] gap-1 relative overflow-hidden group"
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
              className="absolute top-14 right-0 min-w-[260px] bg-white/95 dark:bg-black/95 backdrop-blur-xl border-2 border-[#00A889] shadow-[0_0_15px_rgba(0,168,137,0.2),inset_0_0_10px_rgba(0,168,137,0.1)] dark:shadow-[0_0_20px_rgba(0,168,137,0.4),inset_0_0_15px_rgba(0,168,137,0.2)] rounded-none origin-top-right overflow-hidden flex flex-col"
            >
              {/* HUD Header */}
              <div className="w-full bg-[#00A889] text-white dark:text-black font-mono text-[10px] px-3 py-1 flex justify-between items-center uppercase tracking-widest font-bold">
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
                        className={`group flex items-center justify-between px-3 py-3 transition-colors duration-200 border-b border-[#00A889]/20 last:border-b-0 ${isActive ? 'bg-[#00A889]/10' : 'hover:bg-[#00A889]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-[10px] transition-colors duration-200 ${isActive ? 'text-[#00A889]' : 'text-[#00A889]/80 dark:text-[#00A889]/50 group-hover:text-white dark:group-hover:text-black'}`}>
                            {`<0${i + 1}>`}
                          </span>
                          
                          {/* GlitchText only activates on hover */}
                          <span className={`font-anton text-3xl uppercase tracking-tighter transition-colors duration-200 ${isActive ? 'text-[#00A889] drop-shadow-[0_0_8px_rgba(0,168,137,0.5)] dark:drop-shadow-[0_0_8px_#00A889]' : 'text-black dark:text-white group-hover:text-white dark:group-hover:text-black'}`}>
                             <GlitchText enableOnHover={true} speed={0.4} variant={1}>
                               {link.label}
                             </GlitchText>
                          </span>
                        </div>
                        
                        {isActive && (
                          <div className="w-2 h-6 bg-[#FF2A6D] animate-pulse shadow-[0_0_10px_rgba(255,42,109,0.5)] dark:shadow-[0_0_10px_#FF2A6D]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="w-full h-[1px] bg-[#00A889]/30 my-2"></div>

                <motion.div variants={itemVariants} className="px-3 py-2 flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#00A889]/80 dark:text-[#00A889]/70 uppercase tracking-widest">
                    CONFIG.LANG
                  </span>
                  <div className="flex items-center gap-1 font-mono text-sm">
                    <button
                      onClick={() => setLang('es')}
                      className={`transition-all duration-200 px-2 py-0.5 border ${lang === 'es' ? 'bg-[#FF2A6D] text-white border-[#FF2A6D] shadow-[0_0_10px_rgba(255,42,109,0.5)] dark:shadow-[0_0_10px_#FF2A6D]' : 'bg-transparent text-[#00A889]/80 dark:text-[#00A889]/70 border-[#00A889]/50 dark:border-[#00A889]/30 hover:bg-[#00A889]/20 hover:text-[#00A889]'}`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      ES
                    </button>
                    <button
                      onClick={() => setLang('en')}
                      className={`transition-all duration-200 px-2 py-0.5 border ${lang === 'en' ? 'bg-[#FF2A6D] text-white border-[#FF2A6D] shadow-[0_0_10px_rgba(255,42,109,0.5)] dark:shadow-[0_0_10px_#FF2A6D]' : 'bg-transparent text-[#00A889]/80 dark:text-[#00A889]/70 border-[#00A889]/50 dark:border-[#00A889]/30 hover:bg-[#00A889]/20 hover:text-[#00A889]'}`}
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
      </div>
    </header>
  );
};

export default Header;
