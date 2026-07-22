import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';

const techs = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'Node.js', 'Git', 'Vite', 'Astro', 'GSAP'];

const About = () => {
  const { lang, setIsHovering } = usePortfolio();
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] text-[#111] dark:text-white transition-colors duration-500 px-6 sm:px-12 md:px-24 pt-32 pb-20">
      <Helmet>
        <title>Sobre Mi | Sebastian</title>
        <meta name="description" content="Conoce más sobre Sebastian, Frontend Developer y diseñador de UI/UX." />
        <link rel="canonical" href="https://pwn27sbx.github.io/mi-portafolio/about" />
      </Helmet>
      <nav className="fixed top-0 left-0 w-full p-4 sm:p-8 flex justify-between items-center z-50 mix-blend-difference">
        <Link to="/" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          className="text-xs uppercase tracking-[0.2em] text-white hover:text-[#00A889] transition-colors duration-300 md:cursor-none">
          ← {t('back', lang)}
        </Link>
      </nav>

      <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
        className="font-anton text-[15vw] sm:text-[10vw] leading-none uppercase tracking-tighter mb-12">
        {t('aboutTitle', lang)}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.15 }}>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed font-light">{t('aboutDesc1', lang)}</p>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed font-light mt-6">{t('aboutDesc2', lang)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h3 className="text-xs uppercase tracking-widest text-[#00A889] font-bold mb-6">{t('aboutTechs', lang)}</h3>
          <div className="flex flex-wrap gap-3">
            {techs.map((tech, i) => (
              <motion.span key={tech} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.05 }}
                className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-xs sm:text-sm tracking-wider text-gray-600 dark:text-gray-400 hover:border-[#00A889] hover:text-[#00A889] transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          <a href="mailto:pwn27sbx@gmail.com" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            className="inline-block mt-8 px-8 py-4 bg-[#00A889] text-white rounded-full font-anton text-sm uppercase tracking-widest hover:bg-[#00c5a1] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00A889]/30 md:cursor-none"
          >
            {t('aboutContact', lang)}
          </a>
        </motion.div>
      </div>
    </div>
  );
};
export default About;
