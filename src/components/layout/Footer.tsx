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
      <div className="whitespace-pre font-anton text-transparent [-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:2px_#fff] text-[30px] md:text-[45px] w-full flex items-center mt-[-8px] md:mt-[-12px] opacity-80">
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

  const TextBlock = ({ isHovered, setRef }: { isHovered: boolean, setRef: (el: HTMLDivElement | null) => void }) => {
    return (
      <div
        ref={setRef}
        className="flex items-center h-full relative cursor-crosshair"
      >
        {/* Hollow default */}
        <span className={`shrink-0 leading-none whitespace-pre text-[#f5f5f5]/40 dark:text-[#0a0a0a]/40 [-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:2px_#fff] transition-all duration-300 relative ${isHovered ? 'opacity-0' : 'opacity-[0.85]'}`}>
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
              className="text-[#000] dark:text-white [text-shadow:4px_0_#00A889,-4px_0_#FF2A6D]"
              encryptedClassName="text-[#00A889] [text-shadow:0_0_8px_#00A889]"
            />
          )}
        </span>

        {/* Separator - Hollow default */}
        <div className="relative flex items-center mx-4 sm:mx-8 -translate-y-[0.1em]">
          <span className={`shrink-0 leading-none text-[0.8em] text-transparent [-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:2px_#fff] transition-colors ${isHovered ? 'opacity-0' : 'opacity-[0.85]'}`}>—</span>
          <span className={`absolute left-0 top-0 shrink-0 leading-none text-[0.8em] text-[#000] dark:text-white [text-shadow:4px_0_#00A889,-4px_0_#FF2A6D] transition-colors ${isHovered ? 'opacity-100' : 'opacity-0'}`}>—</span>
        </div>
      </div>
    );
  };

  const blockRefs = React.useRef<(HTMLDivElement | null)[]>(Array(8).fill(null));
  const [hoveredStates, setHoveredStates] = React.useState<boolean[]>(Array(8).fill(false));

  React.useEffect(() => {
    let animationFrameId: number;

    const checkHoverStates = () => {
      let changed = false;
      const newStates = blockRefs.current.map((ref, i) => {
        const isHovered = ref ? ref.matches(':hover') : false;
        if (isHovered !== hoveredStates[i]) changed = true;
        return isHovered;
      });

      if (changed) {
        setHoveredStates(newStates);
      }
      animationFrameId = requestAnimationFrame(checkHoverStates);
    };

    animationFrameId = requestAnimationFrame(checkHoverStates);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hoveredStates]);

  return (
    <footer className="relative flex flex-col justify-end pt-8 w-full bg-transparent transition-colors overflow-hidden">
      <div className="max-w-md text-center px-4 mb-4 mx-auto z-10">
        <p className="text-gray-600 dark:text-gray-400 text-[11px] sm:text-sm font-mono tracking-wider leading-relaxed">{t('footerDesc', lang)}</p>
      </div>

      <div className="w-full relative flex flex-col items-center">
        <HollowDashedLine />

        <div className="w-full py-2 sm:py-3 overflow-hidden relative flex items-center h-full">
          <a href={'mailto:' + EMAIL} className="flex md:cursor-none w-full items-center h-full group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="flex animate-marquee font-anton text-4xl sm:text-[5vw] uppercase items-center h-full hover-pause gpu" style={{ width: 'max-content', animationDuration: '15s' }}>
              {[...Array(8)].map((_, i) => (
                <TextBlock
                  key={i}
                  isHovered={hoveredStates[i]}
                  setRef={(el) => blockRefs.current[i] = el}
                />
              ))}
            </div>
          </a>
        </div>

        <HollowDashedLine />
      </div>

      <div className="mt-12 mb-12 z-10 text-center flex justify-center">
        <a href={'mailto:' + EMAIL} className="text-2xl sm:text-4xl text-gray-800 dark:text-gray-300 hover:text-[#00A889] dark:hover:text-[#00A889] transition-colors duration-300 relative inline-block group md:cursor-none font-mono" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <DecryptedText text={EMAIL} animateOn="hover" maxIterations={12} encryptedClassName="text-[#00A889] [text-shadow:0_0_8px_#00A889]" />
          <span className="absolute -bottom-2 sm:-bottom-3 left-0 w-0 h-[2px] bg-[#00A889] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4 sm:px-8 text-[10px] sm:text-xs text-white uppercase tracking-widest border-t-8 border-[#FF2A6D] font-mono font-black bg-[#050505] relative z-20 w-full mt-auto">
        
        {/* Left Side */}
        <div className="flex flex-col gap-1 items-center md:items-start mb-8 md:mb-0">
          <p className="px-3 py-1.5 bg-[#00A889] text-black shadow-[4px_4px_0_#FF2A6D] rotate-[-2deg] hover:rotate-0 transition-transform">SYS-AREQUIPA//PERU</p>
          <span className="text-gray-500 text-[8px] mt-2">LAT: -16.4090, LON: -71.5375</span>
        </div>
        
        {/* Center Links */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 md:mb-0">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border-2 border-white hover:border-[#00A889] hover:bg-[#00A889] hover:text-black hover:shadow-[4px_4px_0_#FF2A6D] hover:-translate-y-1 hover:-translate-x-1 transition-all">{link.label}</a>
          ))}
          <Link to="/about" className="px-3 py-2 border-2 border-white hover:border-[#FF2A6D] hover:bg-[#FF2A6D] hover:text-black hover:shadow-[4px_4px_0_#00A889] hover:-translate-y-1 hover:-translate-x-1 transition-all">About</Link>
          <Link to="/contact" className="px-3 py-2 border-2 border-white hover:border-[#FF2A6D] hover:bg-[#FF2A6D] hover:text-black hover:shadow-[4px_4px_0_#00A889] hover:-translate-y-1 hover:-translate-x-1 transition-all">{lang === 'es' ? 'Contacto' : 'Contact'}</Link>
        </div>
        
        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end">
          <p className="px-3 py-1.5 bg-[#FF2A6D] text-black shadow-[4px_4px_0_#00A889] rotate-[2deg] hover:rotate-0 transition-transform">DEV-SEBASTIAN</p>
          <span className="text-gray-500 text-[8px] mt-2">© {new Date().getFullYear()} // ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
