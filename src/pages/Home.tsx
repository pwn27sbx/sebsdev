import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';

import Hero from '../components/hero/Hero';
import ExpertiseSection from '../components/expertise/ExpertiseSection';
import InteractiveBanner from '../components/banner/InteractiveBanner';
import ProjectsGallery from '../components/gallery/ProjectsGallery';
import ViewAllBlock from '../components/gallery/ViewAllBlock';
import Footer from '../components/layout/Footer';
import ScrollSpyNav from '../components/layout/ScrollSpyNav';

import { useLenis } from 'lenis/react';

const Home = () => {
  const { lang } = usePortfolio();

  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });
  
  const horizontalX = useTransform(horizontalProgress, [0, 1], ["0vw", "-100vw"]);

  return (
    <div className="bg-transparent text-[#111] dark:text-white min-h-screen font-sans md:cursor-none transition-colors duration-500 overflow-x-clip">
      <Helmet>
        <title>{t('seoTitle', lang)}</title>
        <meta name="description" content={t('seoDesc', lang)} />
        <link rel="canonical" href="https://pwn27sbx.github.io/mi-portafolio/" />
      </Helmet>

      <main className="w-full relative">
        <ScrollSpyNav />
        <div className="w-full relative z-20">
          <motion.div
            className="relative w-full origin-bottom bg-[#f0f0f0] dark:bg-[#030303] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] bg-fixed transition-colors duration-500"
          >
            <div id="section-about" className="relative z-10 w-full h-[100dvh] bg-transparent transition-colors gpu">
              <Hero />
            </div>
            <div id="section-expertise" ref={horizontalRef} className="relative z-10 w-full h-[250vh]">
              <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center bg-transparent pointer-events-none">
                <div className="w-full flex-shrink-0 pointer-events-auto">
                  <ExpertiseSection />
                </div>
              </div>
            </div>

            <div className="relative z-20 flex flex-col w-full -mt-[100vh] bg-[#f0f0f0] dark:bg-[#030303] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] bg-fixed">
              <div className="w-full flex flex-col items-center justify-center relative bg-transparent z-40 pb-10">
                <InteractiveBanner />
              </div>
              <div className="relative z-30 flex flex-col w-full transition-colors duration-300 bg-transparent">
                <div id="section-projects" className="bg-transparent w-full flex flex-col relative pt-12 sm:pt-24 z-10">
                  <ProjectsGallery>
                    <div className="flex-1 flex flex-col items-center justify-center w-full mt-20 mb-4 sm:mt-12 sm:mb-16">
                      <ViewAllBlock />
                    </div>
                    <div id="section-contact" className="w-full">
                      <Footer />
                    </div>
                  </ProjectsGallery>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
export default Home;
