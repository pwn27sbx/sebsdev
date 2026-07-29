import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';
import GlitchText from '../common/GlitchText';

const ViewAllBlock = () => {
  const { setIsHovering, lang } = usePortfolio();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full flex justify-center px-4 py-8 sm:py-16"
    >
      <div className="group w-full max-w-5xl flex flex-col pointer-events-auto relative">
        <Link to="/proyectos" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          className="relative w-full flex flex-col items-center justify-center py-10 sm:py-16 md:cursor-none"
        >
          {/* Top/Bottom Tech Borders */}
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#333] dark:via-[#444] group-hover:via-[#00A889] to-transparent transition-colors duration-500"></div>
          <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#333] dark:via-[#444] group-hover:via-[#00A889] to-transparent transition-colors duration-500"></div>
          
          {/* Giant Typography Link */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="font-anton text-5xl sm:text-[8vw] md:text-[6vw] lg:text-[7vw] uppercase tracking-tighter leading-none whitespace-nowrap cursor-crosshair text-[#111] dark:text-white [text-shadow:4px_0_#00A889,-4px_0_#FF2A6D] group-hover:[text-shadow:none] group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_#333] dark:group-hover:[-webkit-text-stroke:2px_#fff] transition-all duration-200">
              <GlitchText speed={0.6} enableShadows={true} enableOnHover={true} variant={1}>
                {`${t('viewAll', lang)} ${t('projects', lang)}`}
              </GlitchText>
            </h3>
            
            {/* Terminal Command Line */}
            <div className="absolute -bottom-6 sm:-bottom-10 font-mono text-[#00A889] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-xs sm:text-sm tracking-widest flex items-center gap-4">
              <span>sys.execute("--/proyectos")</span>
              <span className="w-12 h-px bg-[#00A889] relative">
                 <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[4px] border-[4px] border-transparent border-l-[#00A889]"></span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};
export default ViewAllBlock;
