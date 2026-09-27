import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';

const NotFoundMinimal = () => {
  const { setIsHovering, lang } = usePortfolio();

  return (
    <div className="bg-[#fafafa] dark:bg-[#111111] text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center font-sans">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-8">{t('notFoundTitle', lang)}</p>
      <Link
        to="/"
        className="text-primary hover:underline font-mono"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {t('goHome', lang)}
      </Link>
    </div>
  );
};

export default NotFoundMinimal;
