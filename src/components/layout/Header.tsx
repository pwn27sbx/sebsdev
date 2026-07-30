import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { t } from '../../data/i18n';

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
              className="absolute top-14 right-0 min-w-[200px] bg-[#f5f5f5]/90 dark:bg-[#050505]/90 backdrop-blur-md border-2 border-black dark:border-gray-800 shadow-[8px_8px_0_#000] dark:shadow-[8px_8px_0_#00A889] p-4 rounded-none origin-top-right overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] before:opacity-50 before:mix-blend-overlay"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,#00A889,#00A889_5px,#000_5px,#000_10px)]"></div>
              
              <div className="flex flex-col gap-1 relative z-10 mt-2">
                {menuLinks.map((link, i) => {
                  const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`block font-anton text-2xl uppercase tracking-tighter px-3 py-2 transition-all duration-300 transform origin-left glitch-hover relative overflow-hidden group ${isActive ? 'text-[#00A889] translate-x-2' : 'text-black dark:text-white hover:text-[#00A889] hover:translate-x-2'}`}
                      >
                        <span className="relative z-10">{link.label}</span>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00A889] rounded-none"></span>
                        )}
                        <div className="absolute inset-0 bg-[#00A889]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0"></div>
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-800 my-2"></div>

                <motion.div variants={itemVariants} className="px-3 py-2 flex justify-between items-center">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                    {lang === 'es' ? 'IDIOMA' : 'LANGUAGE'}
                  </span>
                  <button
                    onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                    className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] font-bold text-gray-800 dark:text-gray-200 hover:text-[#00A889] dark:hover:text-[#00A889] transition-colors duration-300 bg-white/50 dark:bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span className={lang === 'es' ? 'text-[#00A889]' : 'opacity-50'}>ES</span>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    <span className={lang === 'en' ? 'text-[#00A889]' : 'opacity-50'}>EN</span>
                  </button>
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
