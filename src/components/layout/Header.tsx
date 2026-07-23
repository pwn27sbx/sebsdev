import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { setIsHovering, darkMode, setDarkMode, lang, setLang } = usePortfolio();

  return (
    <header className="fixed top-0 left-0 right-0 w-full px-4 sm:px-8 py-3 flex justify-between items-center z-50 pointer-events-none">
      {/* Language Switcher */}
      <div
        className="pointer-events-auto"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          className="flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase font-light text-gray-600 dark:text-gray-300 hover:text-[#00A889] dark:hover:text-[#00A889] transition-colors duration-300"
          aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
          <span className={lang === 'es' ? 'text-gray-900 dark:text-white font-normal' : 'text-gray-400 dark:text-gray-500'}>ES</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className={lang === 'en' ? 'text-gray-900 dark:text-white font-normal' : 'text-gray-400 dark:text-gray-500'}>EN</span>
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="pointer-events-auto" style={{ viewTransitionName: 'theme-toggle' }}>
        <button
          role="switch"
          aria-checked={darkMode}
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-all duration-500 hover:scale-105 hover:shadow-lg relative overflow-hidden group"
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
    </header>
  );
};

export default Header;
