import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import FooterMinimal from '../components/layout/FooterMinimal';

const AboutMinimal = () => {
  const { lang } = usePortfolio();

  return (
    <div className="bg-[#fafafa] dark:bg-[#111111] text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-500 pt-24 pb-10">
      <Helmet>
        <title>{t('seoTitle', lang)} - About</title>
      </Helmet>

      <main className="w-full max-w-2xl mx-auto px-6 relative">
        <h1 className="text-3xl font-bold mb-8 tracking-tight">About Me</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p className="mb-4">
            Hello, I'm Sebastian. I'm a Front-End Developer with a passion for building clean, fast, and interactive web applications.
          </p>
          <p className="mb-4">
            I love exploring new technologies and crafting unique digital experiences. When I'm not coding, I'm usually reading about software architecture or enjoying a good cup of coffee.
          </p>
          <h2 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Tech Stack</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>React & TypeScript</li>
            <li>Three.js & WebGL</li>
            <li>Tailwind CSS</li>
            <li>Node.js & Ecosystem</li>
          </ul>
        </div>
        
        <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-10">
          <FooterMinimal />
        </div>
      </main>
    </div>
  );
};

export default AboutMinimal;
