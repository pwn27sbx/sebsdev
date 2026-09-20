import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import FooterMinimal from '../components/layout/FooterMinimal';

const ContactMinimal = () => {
  const { lang, setIsHovering } = usePortfolio();

  return (
    <div className="bg-[#fafafa] dark:bg-[#111111] text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-500 pt-24 pb-10">
      <Helmet>
        <title>{t('seoTitle', lang)} - Contact</title>
      </Helmet>

      <main className="w-full max-w-2xl mx-auto px-6 relative flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md">
            I'm currently available for freelance work or full-time opportunities. Let's build something great together.
          </p>
          
          <a 
            href="mailto:contact@sebastian.dev"
            className="inline-block w-max px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded shadow hover:scale-105 transition-transform"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Say Hello
          </a>
        </div>
        
        <div className="mt-auto">
          <FooterMinimal />
        </div>
      </main>
    </div>
  );
};

export default ContactMinimal;
