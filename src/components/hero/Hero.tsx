import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';
import HoverText from './HoverText';
import HeroCanvas from './HeroCanvas';

const Hero = () => {
  const { setIsHovering, lang } = usePortfolio();
  const { scrollYProgress } = useScroll();
  const lineWidth = useTransform(scrollYProgress, [0, 0.4], ['8vw', '150vw']);

  const hEnter = () => setIsHovering(true);
  const hLeave = () => setIsHovering(false);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-center px-4 overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors duration-500">
      {/* Interactive particle canvas background */}
      <HeroCanvas />
      <div className="flex flex-col items-center justify-center w-full max-w-[100vw] mx-auto z-10">
        <div className="flex items-center justify-center w-full flex-nowrap">            <div className="text-[13vw] sm:text-[16vw] leading-[0.8] uppercase tracking-tighter shrink-0 text-[#111] dark:text-white gpu" onMouseEnter={hEnter} onMouseLeave={hLeave}><HoverText text="FRONT" /></div>
          <motion.div style={{ width: lineWidth }} className="h-[1vw] sm:h-[1.5vw] bg-[#111] dark:bg-white mx-2 sm:mx-4 transition-colors duration-300 hover:bg-[#00A889] shrink-0 gpu" />
          <div className="text-[13vw] sm:text-[16vw] leading-[0.8] uppercase tracking-tighter shrink-0 text-[#111] dark:text-white gpu" onMouseEnter={hEnter} onMouseLeave={hLeave}><HoverText text="END" /></div>
        </div>
        <div className="flex flex-col sm:flex-row w-full items-center sm:items-end justify-between mt-8 sm:mt-10 px-4 sm:px-10 gap-8 sm:gap-0">
          <div className="text-[14vw] sm:text-[15vw] leading-[0.8] uppercase tracking-tighter shrink-0 text-[#111] dark:text-white" onMouseEnter={hEnter} onMouseLeave={hLeave}><HoverText text="DEVELOPER" /></div>
          <div className="w-full sm:w-[32%] sm:pb-8 flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed font-light max-w-xs sm:max-w-none">
              <span className="text-sm uppercase tracking-widest text-[#00A889] font-bold block mb-2 sm:mb-3">{t('heroAbout', lang)}</span>
              {t('heroDesc', lang)}
            </p>
          </div>
        </div>
      </div>
      <motion.div className="absolute bottom-8 right-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mix-blend-difference" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
        <span>{t('heroScroll', lang)}</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
};
export default Hero;
