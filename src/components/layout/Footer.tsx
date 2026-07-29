import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';
import { EMAIL, SOCIAL_LINKS } from '../../constants/contacts';
import GlitchText from '../common/GlitchText';
import DecryptedText from '../common/DecryptedText';

const HollowDashedLine = ({ className = "" }) => {
  const dashString = Array(80).fill("—").join(" ");
  return (
    <div className={`w-full h-[15px] md:h-[20px] overflow-hidden flex items-center pointer-events-none z-20 ${className}`}>
      <div className="whitespace-pre font-anton text-transparent [-webkit-text-stroke:2px_#111] dark:[-webkit-text-stroke:2px_#fff] text-[30px] md:text-[45px] w-full flex items-center mt-[-8px] md:[-12px]">
        <GlitchText speed={0.9} enableShadows enableOnHover={false} variant={1}>
          {dashString}
        </GlitchText>
      </div>
    </div>
  );
};

const Footer = () => {
  const { setIsHovering, lang } = usePortfolio();
  const marqueeText = t('footerCta', lang);

  const TextBlock = () => {
    const [isHovered, setIsHovered] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const interval = setInterval(() => {
        if (ref.current) {
          const hovered = ref.current.matches(':hover');
          if (hovered !== isHovered) setIsHovered(hovered);
        }
      }, 50);
      return () => clearInterval(interval);
    }, [isHovered]);
    
    return (
      <div 
        ref={ref}
        className="flex items-center h-full relative cursor-crosshair"
      >
        {/* Hollow default */}
        <span className={`shrink-0 leading-none whitespace-pre text-transparent [-webkit-text-stroke:2px_#111] dark:[-webkit-text-stroke:2px_#fff] transition-all duration-300 relative ${isHovered ? 'opacity-0' : 'opacity-[0.85]'}`}>
          {marqueeText}
        </span>
        {/* Solid hover with chromatic aberration */}
        <span className={`absolute left-0 top-0 transition-opacity duration-200 pointer-events-auto shrink-0 leading-none whitespace-pre ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {isHovered && (
            <DecryptedText 
              text={marqueeText} 
              animateOn="view" 
              speed={40} 
              maxIterations={12}
              className="text-[#111] dark:text-white drop-shadow-[4px_0_#00A889,-4px_0_#FF2A6D]"
              encryptedClassName="text-[#00A889] drop-shadow-[0_0_8px_#00A889]"
            />
          )}
        </span>
        
        {/* Separator - Hollow default */}
        <div className="relative flex items-center mx-4 sm:mx-8 -translate-y-[0.1em]">
          <span className={`shrink-0 leading-none text-[0.8em] text-transparent [-webkit-text-stroke:2px_#111] dark:[-webkit-text-stroke:2px_#fff] transition-colors ${isHovered ? 'opacity-0' : 'opacity-[0.85]'}`}>—</span>
          <span className={`absolute left-0 top-0 shrink-0 leading-none text-[0.8em] text-[#111] dark:text-white drop-shadow-[4px_0_#00A889,-4px_0_#FF2A6D] transition-colors ${isHovered ? 'opacity-100' : 'opacity-0'}`}>—</span>
        </div>
      </div>
    );
  };

  return (
    <footer className="relative flex flex-col justify-end pt-8 w-full bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors overflow-hidden">
      <div className="max-w-md text-center px-4 mb-4 mx-auto z-10">
        <p className="text-gray-600 dark:text-gray-400 text-[11px] sm:text-sm font-mono tracking-wider leading-relaxed">{t('footerDesc', lang)}</p>
      </div>
      
      <div className="w-full relative flex flex-col items-center">
        <HollowDashedLine />
        
        <div className="w-full py-2 sm:py-3 overflow-hidden relative flex items-center h-full">
          <a href={'mailto:' + EMAIL} className="flex md:cursor-none w-full items-center h-full group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="flex animate-marquee font-anton text-4xl sm:text-[5vw] uppercase items-center h-full hover-pause" style={{ width: 'max-content' }}>
              <TextBlock /><TextBlock /><TextBlock /><TextBlock /><TextBlock /><TextBlock /><TextBlock /><TextBlock />
            </div>
          </a>
        </div>
        
        <HollowDashedLine />
      </div>

      <div className="mt-12 mb-12 z-10 text-center flex justify-center">
        <a href={'mailto:' + EMAIL} className="text-2xl sm:text-4xl text-gray-800 dark:text-gray-300 hover:text-[#00A889] dark:hover:text-[#00A889] transition-colors duration-300 relative inline-block group md:cursor-none font-mono" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <DecryptedText text={EMAIL} animateOn="hover" maxIterations={12} encryptedClassName="text-[#00A889] drop-shadow-[0_0_8px_#00A889]" />
          <span className="absolute -bottom-2 sm:-bottom-3 left-0 w-0 h-[2px] bg-[#00A889] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-8 text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest border-t border-[#ddd] dark:border-[#222] font-mono">
        <p className="mb-3 sm:mb-0">Arequipa, Peru</p>
        <div className="flex gap-4 sm:gap-6 mb-3 sm:mb-0">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.url} className="hover:text-[#00A889] transition-colors">{link.label}</a>
          ))}
          <Link to="/about" className="hover:text-[#00A889] transition-colors">About</Link>
          <Link to="/contacto" className="hover:text-[#00A889] transition-colors">{lang === 'es' ? 'Contacto' : 'Contact'}</Link>
        </div>
        <p>Design by Sebastian</p>
      </div>
    </footer>
  );
};
export default Footer;
