import React, { useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';
import DecryptedText from '../common/DecryptedText';
import GlitchText from '../common/GlitchText';

const renderGlitchyTitle = (text: string, reveal: any) => {
  const parts = text.split(/([-&/\n])/g);
  return parts.map((part, i) => {
    if (part === '\n') {
      return <br key={i} />;
    }
    if (part === '-' || part === '/' || part === '&') {
      return (
        <GlitchText key={i} className="mx-3 md:mx-5 inline-block -translate-y-[0.1em]" speed={0.9} enableShadows enableOnHover={false}>
          {part}
        </GlitchText>
      );
    }
    if (part === '') return null;
    return (
      <DecryptedText 
        key={i} 
        text={part} 
        animateOn="view" 
        revealDirection={reveal} 
        sequential 
        useOriginalCharsOnly={false} 
        speed={85} 
        maxIterations={15} 
      />
    );
  });
};

const renderMarqueeText = (text: string) => {
  // Split by em-dash (—), hyphen (-), or ampersand (&)
  const parts = text.split(/([—\-&])/g);
  let colorToggle = true; 
  return parts.map((part, i) => {
    if (part === '—' || part === '-' || part === '&') {
      return (
        <GlitchText key={i} className="mx-2 md:mx-4 inline-block -translate-y-[0.13em] text-transparent [-webkit-text-stroke:1px_#111] md:[-webkit-text-stroke:2px_#111] dark:[-webkit-text-stroke:1px_#a3a3a3] dark:md:[-webkit-text-stroke:2px_#a3a3a3]" speed={0.9} enableShadows enableOnHover={false}>
          {part}
        </GlitchText>
      );
    }
    if (part.trim() === '') {
      return <span key={i}>{part}</span>;
    }
    
    const colorClass = colorToggle 
      ? '[-webkit-text-stroke:1px_#00A889] md:[-webkit-text-stroke:2px_#00A889]' 
      : '[-webkit-text-stroke:1px_#FF2A6D] md:[-webkit-text-stroke:2px_#FF2A6D]';
    colorToggle = !colorToggle;
    
    return (
      <span key={i} className={`text-transparent ${colorClass}`}>
        {part}
      </span>
    );
  });
};

const ExpertiseSection = () => {
  const { setIsHovering, lang } = usePortfolio();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  const expertises = useMemo(() => [
    { id: '01', title: t('expertise1Title', lang), marquee: t('expertise1Marquee', lang), direction: 'left', reveal: 'start' as const },
    { id: '02', title: t('expertise2Title', lang), marquee: t('expertise2Marquee', lang), direction: 'right', reveal: 'center' as const },
    { id: '03', title: t('expertise3Title', lang), marquee: t('expertise3Marquee', lang), direction: 'left', reveal: 'end' as const },
  ], [lang]);

  const bgParallax1 = useTransform(scrollYProgress, [0, 1], ['-5%', '15%']);
  const bgParallax2 = useTransform(scrollYProgress, [0, 1], ['5%', '-10%']);
  const bgParallax3 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section className="w-full relative flex flex-col justify-center min-h-[100dvh] pt-12 pb-24 bg-[#f5f5f5] dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-700 border-t border-gray-200 dark:border-gray-800">
      {/* Parallax background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <motion.div
          style={{ y: bgParallax1 }}
          className="absolute -top-[15%] -right-[10%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-[#00A889]/8 via-[#00A889]/3 to-transparent blur-[120px] dark:from-[#00A889]/10 dark:via-[#00A889]/4"
        />
        <motion.div
          style={{ y: bgParallax2 }}
          className="absolute -bottom-[10%] -left-[5%] w-[35%] h-[35%] rounded-full bg-gradient-to-tr from-[#00A889]/5 via-transparent to-transparent blur-[100px] dark:from-[#00A889]/6"
        />
        <motion.div
          style={{ y: bgParallax3 }}
          className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[30%] h-[30%] rounded-full bg-gradient-to-r from-transparent via-gray-200/30 to-transparent blur-[80px] dark:via-white/5"
        />
      </div>
      <div className="relative z-10 w-full px-4 sm:px-12 md:px-24 flex flex-col gap-8 md:gap-12">
        {expertises.map((exp, index) => (
          <motion.div key={'row-' + index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-center justify-between group md:cursor-none w-full border-b border-gray-300 dark:border-gray-800 pb-4 md:pb-8 transition-colors duration-500 hover:border-[#00A889]"
            onMouseEnter={() => { setHoveredIndex(index); setIsHovering(true); }}
            onMouseLeave={() => { setHoveredIndex(null); setIsHovering(false); }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-12 w-full text-left">
              <span className={'font-mono text-sm md:text-base transition-colors duration-500 shrink-0 ' + (hoveredIndex === index ? 'text-[#00A889]' : 'text-gray-400 dark:text-gray-600')}>{exp.id}</span>
              <div className="flex lg:hidden flex-col w-full gap-2 mt-4 items-start text-left">
                <h2 className="font-anton text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] text-transparent [-webkit-text-stroke:1px_#111] md:[-webkit-text-stroke:2px_#111] dark:[-webkit-text-stroke:1px_#a3a3a3] dark:md:[-webkit-text-stroke:2px_#a3a3a3] whitespace-pre-wrap text-left">
                  {renderGlitchyTitle(exp.title, exp.reveal)}
                </h2>
                <div className="flex whitespace-nowrap font-anton text-3xl md:text-4xl uppercase tracking-tighter leading-none animate-marquee gpu" style={{ width: 'max-content' }}>
                  <span className="shrink-0 flex">{renderMarqueeText(exp.marquee.repeat(4))}</span>
                </div>
              </div>
              <div className="hidden lg:flex flex-1 relative overflow-hidden h-[80px] md:h-[8vw] items-center w-full justify-start">
                <h2 className={'absolute left-0 w-full font-anton text-5xl sm:text-7xl md:text-[6vw] uppercase tracking-tighter leading-none transition-all duration-500 transform origin-bottom ' + (hoveredIndex === index ? '-translate-y-[120%] opacity-0' : hoveredIndex !== null ? 'text-transparent [-webkit-text-stroke:1px_#ddd] md:[-webkit-text-stroke:2px_#ddd] dark:[-webkit-text-stroke:1px_#333] dark:md:[-webkit-text-stroke:2px_#333] translate-y-0 opacity-100' : 'text-transparent [-webkit-text-stroke:1px_#111] md:[-webkit-text-stroke:2px_#111] dark:[-webkit-text-stroke:1px_#a3a3a3] dark:md:[-webkit-text-stroke:2px_#a3a3a3] translate-y-0 opacity-100')}>
                  {renderGlitchyTitle(exp.title.replace('\n', ' '), exp.reveal)}
                </h2>
                <div className={'absolute left-0 w-full transition-all duration-500 transform origin-top ' + (hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0')}>
                  <div className={'flex whitespace-nowrap font-anton text-5xl sm:text-7xl md:text-[6vw] uppercase tracking-tighter leading-none gpu ' + (exp.direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse')} style={{ width: 'max-content' }}>
                    <span className="shrink-0 flex">{renderMarqueeText(exp.marquee.repeat(4))}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default ExpertiseSection;
