import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import FuzzyText from '../components/common/FuzzyText';

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
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6 transition-colors duration-500 overflow-hidden">
      <div className="flex justify-center select-none w-full">
        <FuzzyText 
          baseIntensity={0.2}
          hoverIntensity={1.5}
          enableHover={true}
          color="rgba(0, 168, 137, 0.2)"
          fontFamily="'Anton', sans-serif"
          fontSize="clamp(8rem, 25vw, 22rem)"
        >
          404
        </FuzzyText>
      </div>
      <div className="flex justify-center select-none w-full -mt-4 sm:-mt-8 z-10">
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
      <Link to="/" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
        className="mt-10 px-8 py-4 bg-[#00A889] text-white rounded-full font-anton text-sm uppercase tracking-widest hover:bg-[#00c5a1] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00A889]/30 md:cursor-none"
      >
        {t('goHome', lang)}
      </Link>
    </div>
  );
};
export default NotFound;
