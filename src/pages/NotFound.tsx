import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import FuzzyText from '../components/common/FuzzyText';
import ScrambledText from '../components/common/ScrambledText';

const NotFound = () => {
  const { lang, setIsHovering } = usePortfolio();
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] bg-fixed flex flex-col items-center justify-center text-center px-6 transition-colors duration-500 overflow-hidden">
      
      {/* Corner Glitch Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-secondary opacity-50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-primary opacity-50" />

      <div className="flex justify-center select-none w-full z-10">
        <FuzzyText 
          baseIntensity={0.2}
          hoverIntensity={1.5}
          enableHover={true}
          color="color-mix(in srgb, var(--color-secondary) calc(0.2 * 100%), transparent)"
          fontFamily="'Anton', sans-serif"
          fontSize="clamp(8rem, 25vw, 22rem)"
        >
          404
        </FuzzyText>
      </div>
      <div className="flex justify-center select-none w-full -mt-4 sm:-mt-8 z-20">
        <FuzzyText 
          baseIntensity={0.15}
          hoverIntensity={1}
          enableHover={true}
          color={isDark ? "#ffffff" : "#111111"}
          fontFamily="'Anton', sans-serif"
          fontSize="clamp(2rem, 5vw, 4rem)"
          letterSpacing={2}
        >
          {t('notFoundTitle', lang)}
        </FuzzyText>
      </div>
      
      <div className="mt-8 font-mono text-xs sm:text-sm text-primary tracking-widest flex items-center gap-2 z-20">
        <span className="w-2 h-2 bg-primary animate-pulse" />
        <ScrambledText text="[ ERR_404: SECTOR_NOT_FOUND ]" speed={0.5} />
      </div>

      <Link to="/" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
        className="mt-12 px-6 py-3 border border-secondary text-secondary font-mono text-xs sm:text-sm uppercase tracking-widest hover:text-black hover:bg-secondary transition-all duration-300 md:cursor-none relative group overflow-hidden z-20"
      >
        <span className="relative z-10">[ {t('goHome', lang) || 'RETURN_TO_ROOT'} ]</span>
      </Link>
    </div>
  );
};
export default NotFound;
