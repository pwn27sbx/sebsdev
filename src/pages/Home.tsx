import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import CustomCursor from '../components/layout/CustomCursor';
import Header from '../components/layout/Header';
import Hero from '../components/hero/Hero';
import ExpertiseSection from '../components/expertise/ExpertiseSection';
import InteractiveBanner from '../components/banner/InteractiveBanner';
import ProjectsGallery from '../components/gallery/ProjectsGallery';
import ViewAllBlock from '../components/gallery/ViewAllBlock';
import Footer from '../components/layout/Footer';

const Home = () => {
  const { lang } = usePortfolio();

  return (
    <div className="bg-bg-light dark:bg-bg-dark text-[#111] dark:text-white min-h-screen font-sans md:cursor-none transition-colors duration-500 overflow-x-clip">
      <Helmet>
        <title>{t('seoTitle', lang)}</title>
        <meta name="description" content={t('seoDesc', lang)} />
        <link rel="canonical" href="https://pwn27sbx.github.io/mi-portafolio/" />
      </Helmet>
      <CustomCursor />
      <Header />
      <main className="w-full relative z-10">
        <div className="relative z-10 w-full h-[100dvh] bg-bg-light dark:bg-bg-dark transition-colors gpu">
          <Hero />
        </div>
        <div className="relative z-10 h-[200vh]">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
            <ExpertiseSection />
          </div>
        </div>
        <div className="relative z-20 -mt-[100vh] flex flex-col w-full transition-colors duration-300">
          <div className="w-full h-32 sm:h-48 bg-gradient-to-b from-transparent to-bg-light dark:to-bg-dark pointer-events-none"></div>
          <div className="bg-bg-light dark:bg-bg-dark w-full flex flex-col relative z-30">
            <div className="-mt-32 sm:-mt-48 relative z-30">
              <InteractiveBanner />
            </div>
            <ProjectsGallery />
          </div>
        </div>
        <div className="relative z-40 -mt-[100vh] w-full transition-colors duration-300 pointer-events-none">
          <div className="w-full h-[15vh] bg-gradient-to-b from-transparent to-bg-light dark:to-bg-dark"></div>
          <div className="bg-bg-light dark:bg-bg-dark w-full min-h-[100vh] flex flex-col justify-between relative z-50 pointer-events-auto pb-4">
            <div className="flex-1 flex flex-col items-center justify-center w-full mt-8 sm:mt-12">
              <ViewAllBlock />
            </div>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home;
