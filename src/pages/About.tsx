import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import ScrambledText from '../components/common/ScrambledText';
import GlitchText from '../components/common/GlitchText';
import DecryptedText from '../components/common/DecryptedText';

const techs = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'Node.js', 'Git', 'Vite', 'Astro', 'GSAP'];

const About = () => {
  const { lang, setIsHovering } = usePortfolio();
  return (
    <div className="min-h-screen relative bg-[#f0f0f0] dark:bg-[#050505] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] bg-fixed text-[#111] dark:text-white font-sans transition-colors duration-500 overflow-x-hidden pt-24 pb-20 px-6 sm:px-12 md:px-24">
      <Helmet>
        <title>Sobre Mi | Sebastian</title>
        <meta name="description" content="Conoce más sobre Sebastian, Frontend Developer y diseñador de UI/UX." />
        <link rel="canonical" href="https://pwn27sbx.github.io/mi-portafolio/about" />
      </Helmet>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-4 sm:p-8 flex justify-between items-center z-[100] pointer-events-none left-0">
        <Link 
          to="/" 
          className="ml-0 sm:ml-4 pointer-events-auto group flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest px-4 py-2 text-[#00A889] bg-transparent hover:text-[#FF2A6D] transition-colors duration-300"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="relative z-10 font-mono">[ ← {t('back', lang) || 'BACK'} ]</span>
        </Link>
      </nav>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-4 sm:pt-8 pb-12 flex flex-col items-start relative z-20"
      >
        <div className="font-mono text-xs sm:text-sm text-[#FF2A6D] mb-4 tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF2A6D] animate-pulse" />
          <ScrambledText text="[ USER_PROFILE_ACCESS // SEBASTIAN ]" speed={0.4} />
        </div>
        <h1 className="font-anton text-6xl sm:text-8xl md:text-[10vw] uppercase tracking-tighter leading-none text-transparent [-webkit-text-stroke:2px_#111] dark:[-webkit-text-stroke:2px_#fff] mb-12 flex flex-wrap gap-x-4 sm:gap-x-8">
          {t('aboutTitle', lang).split(' ').map((word: string, i: number) => (
            <GlitchText key={i} speed={1.2} enableShadows enableOnHover={false}>
              {word}
            </GlitchText>
          ))}
        </h1>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-5xl relative z-30">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.15 }}>
          <p className="font-mono text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">{t('aboutDesc1', lang)}</p>
          <p className="font-mono text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mt-6">{t('aboutDesc2', lang)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h3 className="text-xs uppercase tracking-widest text-[#00A889] font-bold mb-6 flex items-center gap-2">
            <span className="text-[#FF2A6D]">&gt;</span> {t('aboutTechs', lang)}
          </h3>
          <div className="flex flex-wrap gap-3">
            {techs.map((tech, i) => (
              <motion.span key={tech} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.05 }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-800 bg-white/50 dark:bg-black/50 font-mono text-[10px] sm:text-xs tracking-wider text-gray-600 dark:text-gray-400 hover:border-[#00A889] hover:text-[#00A889] hover:bg-[#00A889]/10 transition-colors duration-300 relative group overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00A889] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                <DecryptedText text={tech} speed={50} maxIterations={10} animateOn="hover" />
              </motion.span>
            ))}
          </div>
          <a href="mailto:pwn27sbx@gmail.com" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            className="inline-block mt-12 px-6 py-3 border border-[#00A889] text-[#00A889] font-mono text-xs sm:text-sm uppercase tracking-widest hover:text-white transition-colors duration-300 md:cursor-none relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#00A889] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-0" />
            <span className="relative z-10">[ EXECUTE: {t('aboutContact', lang)} ]</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};
export default About;
