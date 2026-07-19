import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';

const ExpertiseSection = () => {
  const { setIsHovering, lang } = usePortfolio();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const expertises = useMemo(() => [
    { id: '01', title: t('expertise1Title', lang), marquee: t('expertise1Marquee', lang), direction: 'left' },
    { id: '02', title: t('expertise2Title', lang), marquee: t('expertise2Marquee', lang), direction: 'right' },
    { id: '03', title: t('expertise3Title', lang), marquee: t('expertise3Marquee', lang), direction: 'left' },
  ], [lang]);

  return (
    <section className="w-full relative flex flex-col justify-center min-h-[100dvh] pt-12 pb-24 bg-[#f5f5f5] dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-700 border-t border-gray-200 dark:border-gray-800">
      <div className="relative z-10 w-full px-4 sm:px-12 md:px-24 flex flex-col gap-8 md:gap-12">
        {expertises.map((exp, index) => (
          <div key={'row-' + index}
            className="flex flex-col md:flex-row md:items-center justify-between group cursor-none w-full border-b border-gray-300 dark:border-gray-800 pb-4 md:pb-8 transition-colors duration-500 hover:border-[#00A889]"
            onMouseEnter={() => { setHoveredIndex(index); setIsHovering(true); }}
            onMouseLeave={() => { setHoveredIndex(null); setIsHovering(false); }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-12 w-full text-left">
              <span className={'font-mono text-sm md:text-base transition-colors duration-500 shrink-0 ' + (hoveredIndex === index ? 'text-[#00A889]' : 'text-gray-400 dark:text-gray-600')}>{exp.id}</span>
              <div className="flex lg:hidden flex-col w-full gap-2 mt-4 items-start text-left">
                <h2 className="font-anton text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] text-[#111] dark:text-[#eee] whitespace-pre-wrap text-left">{exp.title}</h2>
                <div className="flex whitespace-nowrap font-anton text-3xl md:text-4xl uppercase tracking-tighter leading-none text-[#00A889] animate-marquee gpu" style={{ width: 'max-content' }}>
                  <span className="shrink-0 pr-4">{exp.marquee.repeat(2)}</span>
                </div>
              </div>
              <div className="hidden lg:flex flex-1 relative overflow-hidden h-[80px] md:h-[8vw] items-center w-full justify-start">
                <h2 className={'absolute left-0 w-full font-anton text-5xl sm:text-7xl md:text-[6vw] uppercase tracking-tighter leading-none transition-all duration-500 transform origin-bottom ' + (hoveredIndex === index ? '-translate-y-[120%] opacity-0' : hoveredIndex !== null ? 'text-gray-400/30 dark:text-gray-600/30 translate-y-0 opacity-100' : 'text-[#111] dark:text-[#eee] translate-y-0 opacity-100')}>
                  {exp.title.replace('\n', ' ')}
                </h2>
                <div className={'absolute left-0 w-full transition-all duration-500 transform origin-top ' + (hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0')}>
                  <div className={'flex whitespace-nowrap font-anton text-5xl sm:text-7xl md:text-[6vw] uppercase tracking-tighter leading-none text-[#00A889] gpu ' + (exp.direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse')} style={{ width: 'max-content' }}>
                    <span className="shrink-0 pr-4">{exp.marquee.repeat(3)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ExpertiseSection;
