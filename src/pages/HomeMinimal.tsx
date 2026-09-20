import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import { Link } from 'react-router-dom';

import HeroMinimal from '../components/hero/HeroMinimal';
import ProjectsMinimal from '../components/gallery/ProjectsMinimal';
import FooterMinimal from '../components/layout/FooterMinimal';

const HomeMinimal = () => {
  const { lang, setIsHovering } = usePortfolio();

  return (
    <div className="bg-[#fafafa] dark:bg-[#111111] text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-500 pt-16 sm:pt-24">
      <Helmet>
        <title>{t('seoTitle', lang)} - Minimal</title>
      </Helmet>

      <main className="w-full max-w-3xl mx-auto px-6 relative pb-10">
        <HeroMinimal />

        {/* Intro Banner */}
        <div className="relative z-0 w-full bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-lg p-3 text-center mb-14 -mt-8 sm:-mt-14 shadow-sm border border-gray-100 dark:border-white/10">
          <p className="font-sans text-gray-800 dark:text-gray-200">
            {t("heroDesc", lang) || "Hello, I'm a passionate Front-End Developer!"}
          </p>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start mb-16 gap-6">
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
              Sebastian
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Digital Craftsman ( UI/UX / Developer / Engineer )
            </p>
          </div>
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-lg flex-shrink-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            {/* Placeholder for avatar */}
            <span className="text-3xl font-bold text-gray-400 dark:text-gray-600">S</span>
          </div>
        </div>

        {/* Work Description Section */}
        <section className="mb-16">
          <h3 className="text-xl font-bold mb-4 border-b-4 border-primary inline-block pb-1">Work</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify indent-4 mb-6">
            Sebastian is a freelance and full-stack developer based in Latin America with a passion for building digital services and stuff he wants. He has a knack for all things launching products, from planning and designing all the way to solving real-life problems with code. When not online, he loves hanging out with his friends or reading about software architecture.
          </p>
          <div className="text-center">
            <Link 
              to="/proyectos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded shadow-lg hover:bg-primary/90 hover:scale-105 transition-all"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              My portfolio <span className="text-xl leading-none">›</span>
            </Link>
          </div>
        </section>

        {/* Bio Section */}
        <section className="mb-16">
          <h3 className="text-xl font-bold mb-6 border-b-4 border-primary inline-block pb-1">Bio</h3>
          <div className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
            <div className="flex">
              <span className="font-bold mr-6 w-12 flex-shrink-0">2020</span>
              <span>Started coding journey and learned web fundamentals.</span>
            </div>
            <div className="flex">
              <span className="font-bold mr-6 w-12 flex-shrink-0">2022</span>
              <span>Worked as a freelance front-end developer for local businesses.</span>
            </div>
            <div className="flex">
              <span className="font-bold mr-6 w-12 flex-shrink-0">2024</span>
              <span>Present - Working on scalable enterprise applications and UI/UX design.</span>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section className="mb-16">
          <h3 className="text-xl font-bold mb-4 border-b-4 border-primary inline-block pb-1">I ♥</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Art, Music, Coding, Machine Learning, UI/UX Design, Coffee.
          </p>
        </section>

        {/* On the web */}
        <section className="mb-20">
          <h3 className="text-xl font-bold mb-6 border-b-4 border-primary inline-block pb-1">On the web</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="https://github.com/pwn27sbx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:bg-primary/10 px-4 py-2 rounded-lg font-bold transition-colors">
                <span className="text-xl">🐙</span> @pwn27sbx
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/sebastiangf/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:bg-primary/10 px-4 py-2 rounded-lg font-bold transition-colors">
                <span className="text-xl">💼</span> @sebastiangf
              </a>
            </li>
          </ul>
        </section>

        {/* Minimalist Projects Section (Selected Works) */}
        <section id="section-projects" className="py-10 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-2xl font-bold mb-10 text-gray-900 dark:text-white tracking-tight">Works</h3>
          <ProjectsMinimal limit={2} />
          
          <div className="mt-8 text-center">
            <Link 
              to="/proyectos"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              View all works <span className="text-xl leading-none">›</span>
            </Link>
          </div>
        </section>

        <section id="section-contact" className="mt-10">
          <FooterMinimal />
        </section>
      </main>
    </div>
  );
};

export default HomeMinimal;
