import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';
import DecryptedText from '../common/DecryptedText';

const ViewAllBlock = () => {
  const { setIsHovering, lang } = usePortfolio();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full flex justify-center px-4"
    >
      <div className="w-full sm:w-[70%] lg:w-[45%] max-w-3xl flex flex-col pointer-events-auto">
        <Link to="/proyectos" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          className="group relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/10] max-h-[50vh] rounded-none overflow-hidden flex flex-col items-center justify-center md:cursor-none transition-all duration-700 ease-[0.16,1,0.3,1] bg-black dark:bg-[#0a0a0a] border-[3px] border-transparent hover:border-[#00A889] hover:-translate-y-4 hover:shadow-[0_0_60px_-15px_rgba(0,168,137,0.5)]"
        >
          {/* Default state outline */}
          <div className="absolute inset-0 border border-[#333] dark:border-[#222] transition-colors duration-500 group-hover:border-transparent pointer-events-none"></div>
          
          <div className="absolute inset-0 bg-[#00A889]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1] z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center px-4">
            <h3 className="font-anton text-4xl sm:text-5xl md:text-7xl text-white uppercase tracking-widest transition-all duration-700 ease-[0.16,1,0.3,1] leading-[0.85]">
              <DecryptedText text={t('viewAll', lang)} animateOn="hover" maxIterations={12} className="group-hover:text-[#00A889]" encryptedClassName="text-[#00A889] drop-shadow-[0_0_8px_#00A889]" /> <br />
              <span className="text-3xl sm:text-4xl md:text-5xl text-gray-500 dark:text-gray-600 group-hover:text-white transition-colors duration-500 block mt-1 sm:mt-2">
                <DecryptedText text={t('projects', lang)} animateOn="hover" maxIterations={12} encryptedClassName="text-[#00A889] drop-shadow-[0_0_8px_#00A889]" />
              </span>
            </h3>
            
            <div className="font-mono text-[#00A889] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 mt-2 sm:mt-4 text-xs sm:text-sm tracking-widest">
              [ INITIATE_SEQUENCE ] --{'>'}
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};
export default ViewAllBlock;
