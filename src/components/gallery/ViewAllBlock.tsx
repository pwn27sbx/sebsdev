import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';
import GlitchText from '../common/GlitchText';
import { useIntermittentTrigger } from '../../hooks/useIntermittentTrigger';

const ViewAllBlock = () => {
  const { setIsHovering, lang } = usePortfolio();
  const intermittent = useIntermittentTrigger(5000, 1500);
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
          <div className={`absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#333] dark:via-[#444] group-hover:via-[var(--color-secondary)] to-transparent transition-colors duration-500 ${intermittent ? 'via-[var(--color-secondary)]' : ''}`}></div>
          <div className={`absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#333] dark:via-[#444] group-hover:via-[var(--color-secondary)] to-transparent transition-colors duration-500 ${intermittent ? 'via-[var(--color-secondary)]' : ''}`}></div>
          
          {/* Giant Typography Link */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className={`font-anton text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[7vw] uppercase tracking-tighter leading-none whitespace-nowrap cursor-crosshair text-[#111] dark:text-white [text-shadow:4px_0_var(--color-secondary),-4px_0_var(--color-primary)] group-hover:[text-shadow:none] group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_#333] dark:group-hover:[-webkit-text-stroke:2px_#fff] transition-all duration-200 ${intermittent ? '[text-shadow:none] text-transparent [-webkit-text-stroke:2px_#333] dark:[-webkit-text-stroke:2px_#fff]' : ''}`}>
              <GlitchText speed={0.6} enableShadows={true} enableOnHover={true} forceHoverState={intermittent} variant={1}>
                {`${t('viewAll', lang)} ${t('projects', lang)}`}
              </GlitchText>
            </h3>
            
            {/* Terminal Command Line */}
            <div className="mt-4 md:mt-0 md:absolute md:-bottom-10 font-mono text-secondary opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-[10px] sm:text-sm tracking-widest flex items-center gap-4 whitespace-nowrap">
              <span>sys.execute("--/proyectos")</span>
              <span className="w-12 h-px bg-secondary relative">
                 <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[4px] border-[4px] border-transparent border-l-[var(--color-secondary)]"></span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};
export default ViewAllBlock;
