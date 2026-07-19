import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

function CustomArrow() {
  return (
    <span className="flex items-center justify-center mx-4 sm:mx-8 shrink-0" aria-hidden="true">
      <svg className="w-10 h-10 sm:w-16 sm:h-16 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </span>
  );
}

function TextBlockFront({ lang }) {
  return (
    <span className="shrink-0 flex items-center pr-4" aria-hidden="true">
      {lang === 'es' ? 'EXPERIENCIAS' : 'EXPERIENCES'} <CustomArrow /> {lang === 'es' ? 'DIGITALES' : 'DIGITAL'} <CustomArrow />
    </span>
  );
}

function TextBlockBack({ lang }) {
  return (
    <span className="shrink-0 flex items-center pr-4" aria-hidden="true">
      {lang === 'es' ? 'INNOVACIÓN' : 'INNOVATION'} <CustomArrow /> {lang === 'es' ? 'CREATIVIDAD' : 'CREATIVITY'} <CustomArrow />
    </span>
  );
}

export default function InteractiveBanner() {
  const { setIsHovering, lang } = usePortfolio();
  const [focusedBand, setFocusedBand] = useState('front');
  const { scrollY } = useScroll();
  const xFront = useTransform(scrollY, [0, 5000], [0, -1500]);
  const xBack = useTransform(scrollY, [0, 5000], [0, 1500]);

  return (
    <div
      className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center bg-transparent shrink-0 z-30"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setFocusedBand('front'); }}
      aria-hidden="true"
    >
      <div
        className={"absolute w-[130%] bg-[#111] dark:bg-white text-white dark:text-[#111] py-4 sm:py-8 md:py-10 transform rotate-[6deg] transition-all duration-700 ease-out z-[40] pointer-events-auto " + (focusedBand === 'back' ? 'blur-0 opacity-100' : 'blur-[5px] opacity-90')}
        onMouseEnter={() => setFocusedBand('back')}
      >
        <motion.div style={{ x: xBack, width: "max-content" }} className="flex">
          <div className="flex animate-marquee-reverse-slow font-anton text-4xl sm:text-6xl uppercase tracking-widest whitespace-nowrap" style={{ width: "max-content" }}>
            {[...Array(15)].map((_, i) => <TextBlockBack key={'back-' + i} lang={lang} />)}
          </div>
        </motion.div>
      </div>

      <div
        className={"absolute w-[130%] bg-[#00A889] text-white py-4 sm:py-8 md:py-10 transform -rotate-[6deg] transition-all duration-700 ease-out z-[50] pointer-events-auto shadow-none " + (focusedBand === 'back' ? 'blur-[5px]' : 'blur-0 opacity-100')}
        onMouseEnter={() => setFocusedBand('front')}
      >
        <motion.div style={{ x: xFront, width: "max-content" }} className="flex">
          <div className="flex animate-marquee-slow font-anton text-4xl sm:text-6xl uppercase tracking-widest whitespace-nowrap" style={{ width: "max-content" }}>
            {[...Array(15)].map((_, i) => <TextBlockFront key={'front-' + i} lang={lang} />)}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

