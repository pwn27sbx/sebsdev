import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';

const NotFound = () => {
  const { lang, setIsHovering } = usePortfolio();
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6 transition-colors duration-500">
      <h1 className="font-anton text-[25vw] sm:text-[20vw] leading-none text-[#00A889]/20 dark:text-[#00A889]/10 select-none">404</h1>
      <h2 className="font-anton text-4xl sm:text-6xl uppercase tracking-tighter text-[#111] dark:text-white -mt-8 sm:-mt-12">{t('notFoundTitle', lang)}</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-6 max-w-md text-sm sm:text-base">{t('notFoundDesc', lang)}</p>
      <Link to="/" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
        className="mt-10 px-8 py-4 bg-[#00A889] text-white rounded-full font-anton text-sm uppercase tracking-widest hover:bg-[#00c5a1] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00A889]/30 md:cursor-none"
      >
        {t('goHome', lang)}
      </Link>
    </div>
  );
};
export default NotFound;
