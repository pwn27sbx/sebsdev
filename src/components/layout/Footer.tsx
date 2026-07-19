import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';
import { EMAIL, SOCIAL_LINKS } from '../../constants/contacts';

const Footer = () => {
  const { setIsHovering, lang } = usePortfolio();
  const marqueeText = t('footerCta', lang);

  const TextBlock = () => (
    <div className="flex items-center h-full">
      <span className="shrink-0 leading-none whitespace-pre">{marqueeText}</span>
      <span className="shrink-0 leading-none text-[0.8em] -translate-y-[0.1em] mx-4 sm:mx-8">—</span>
    </div>
  );

  return (
    <footer className="relative flex flex-col justify-end pt-2 w-full bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-md text-center px-4 mb-4 mx-auto z-10">
        <p className="text-gray-600 dark:text-gray-400 text-[11px] sm:text-sm font-light leading-relaxed">{t('footerDesc', lang)}</p>
      </div>
      <div className="w-full border-y border-[#ddd] dark:border-[#333] py-2 sm:py-4 overflow-hidden relative flex items-center h-full">
        <a href={'mailto:' + EMAIL} className="flex cursor-none w-full items-center h-full group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="flex animate-marquee font-anton text-5xl sm:text-[7vw] uppercase transition-colors duration-300 items-center h-full text-[#00A889] sm:text-[#ccc] sm:dark:text-[#444] group-hover:text-[#00A889] hover-pause" style={{ width: 'max-content' }}>
            <TextBlock /><TextBlock /><TextBlock /><TextBlock /><TextBlock /><TextBlock /><TextBlock /><TextBlock />
          </div>
        </a>
      </div>
      <div className="mt-8 mb-8 z-10 text-center">
        <a href={'mailto:' + EMAIL} className="text-xl sm:text-3xl text-gray-800 dark:text-gray-300 hover:text-[#111] dark:hover:text-white transition-colors duration-300 relative inline-block group cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          {EMAIL}
          <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-0 h-[2px] bg-[#00A889] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-8 text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest border-t border-[#ddd] dark:border-[#222]">
        <p className="mb-3 sm:mb-0">Arequipa, Peru</p>
        <div className="flex gap-4 sm:gap-6 mb-3 sm:mb-0">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.url} className="hover:text-black dark:hover:text-white transition-colors">{link.label}</a>
          ))}
          <Link to="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
          <Link to="/contacto" className="hover:text-black dark:hover:text-white transition-colors">{lang === 'es' ? 'Contacto' : 'Contact'}</Link>
        </div>
        <p>Design by Sebastian</p>
      </div>
    </footer>
  );
};
export default Footer;
