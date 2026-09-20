import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import ProjectsMinimal from '../components/gallery/ProjectsMinimal';
import FooterMinimal from '../components/layout/FooterMinimal';

const ArchiveMinimal = () => {
  const { lang } = usePortfolio();

  return (
    <div className="bg-[#fafafa] dark:bg-[#111111] text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-500 pt-24 pb-10">
      <Helmet>
        <title>{t('seoTitle', lang)} - Works</title>
      </Helmet>

      <main className="w-full max-w-2xl mx-auto px-6 relative">
        <h1 className="text-3xl font-bold mb-10 tracking-tight">All Works</h1>
        <ProjectsMinimal />
        
        <div className="mt-20">
          <FooterMinimal />
        </div>
      </main>
    </div>
  );
};

export default ArchiveMinimal;
