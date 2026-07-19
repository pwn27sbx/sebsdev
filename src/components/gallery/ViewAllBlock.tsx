import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';

const ViewAllBlock = () => {
  const { setIsHovering, lang } = usePortfolio();
  return (
    <div className="relative w-full flex justify-center px-4">
      <div className="w-full sm:w-[70%] lg:w-[45%] max-w-3xl flex flex-col pointer-events-auto">
        <Link to="/proyectos" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          className="group relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/10] max-h-[50vh] rounded-md overflow-hidden flex flex-col items-center justify-center cursor-none transform transition-all duration-700 ease-[0.16,1,0.3,1] bg-[#00A889] hover:-translate-y-4 hover:scale-[1.05] hover:-rotate-2 hover:shadow-[0_0_80px_-20px_rgba(0,168,137,0.8)]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00A889] via-[#00c5a1] to-[#00A889] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
          <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center px-4">
            <h3 className="font-anton text-4xl sm:text-5xl md:text-7xl text-white uppercase tracking-widest transition-all duration-700 ease-[0.16,1,0.3,1] leading-[0.85]">
              {t('viewAll', lang)} <br />
              <span className="text-3xl sm:text-4xl md:text-5xl text-[#004d3e] group-hover:text-white transition-colors duration-500 block mt-1 sm:mt-2">{t('projects', lang)}</span>
            </h3>
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-md transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:bg-white text-white group-hover:text-[#00A889] group-hover:scale-[1.3] group-hover:rotate-[360deg] shadow-lg mt-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default ViewAllBlock;
