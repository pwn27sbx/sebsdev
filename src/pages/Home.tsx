import React, { useEffect, useRef } from 'react';
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
  const cloneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cloneRef.current) return;
      
      const { top } = cloneRef.current.getBoundingClientRect();
      
      // If the top of the cloned Hero reaches the top of the viewport
      if (top <= 0) {
        // Jump seamlessly to the real Hero at the top, preserving scroll momentum
        // Math.abs(top) gives us exactly how many pixels we scrolled PAST the clone's top
        window.scrollTo({ top: Math.abs(top), behavior: 'instant' as ScrollBehavior });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount just in case
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        
        {/* Infinite Loop Clone */}
        <div ref={cloneRef} className="relative z-50 w-full h-[100dvh] bg-bg-light dark:bg-bg-dark transition-colors gpu" aria-hidden="true">
          <Hero />
        </div>
        
        {/* Spacer to guarantee scrollability past the clone's top edge */}
        <div className="w-full h-[50vh] pointer-events-none" aria-hidden="true" />
      </main>
    </div>
  );
};
export default Home;
