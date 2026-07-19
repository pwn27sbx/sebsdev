import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from './context/PortfolioContext';

const projects = [
  { id: "01", year: "2024", title: "NEXUS", category: "Frontend", img: "/img/Nexus.webp", link: "https://nexus-drab-one.vercel.app/" },
  { id: "02", year: "2024", title: "SERVICIOS GENERALES", category: "Fullstack", video: "https://www.w3schools.com/html/mov_bbb.mp4", link: "https://roi-servicios.vercel.app/" },
  { id: "03", year: "2024", title: "FUXION OPORTUNIDAD", category: "Landing Page", img: "/img/Fuxion.webp", link: "https://fuxionoportunidad.vercel.app/" },
  { id: "04", year: "2023", title: "TRANSPORTES PREMIUM", category: "UI/UX", img: "/img/TransPremium.webp", link: "https://trasnportesjuan.vercel.app/" },
  { id: "05", year: "2024", title: "GRUPO HIRBELL", category: "Corporate", img: "/img/Hirbell.webp", link: "https://grupohirbell.vercel.app/" },
  { id: "06", year: "2023", title: "TETRIS ARCADE", category: "JavaScript / HTML", img: "/img/Tetris.webp", link: "/tetris/index.html" },
  { id: "07", year: "2022", title: "PAINT", category: "JavaScript / HTML", img: "/img/Paint.webp", link: "/paint/index.html" }
];

const Archive = () => {
  const { lang, setIsHovering } = usePortfolio();
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollY } = useScroll();
  const titleX = useTransform(scrollY, [0, 2000], [0, 1000]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(mouseX, springConfig);
  const moveY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 112.5);
  };

  return (
    <div
      className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] text-[#111] dark:text-white font-sans transition-colors duration-500 overflow-x-hidden pt-24 pb-20"
      onMouseMove={handleMouseMove}
    >
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-none" role="navigation" aria-label={lang === 'es' ? 'Navegación' : 'Navigation'}>
        <Link
          to="/"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="pointer-events-auto group flex items-center gap-2 text-xs uppercase tracking-[0.2em] focus-visible:outline-2 focus-visible:outline-white"
          aria-label={lang === 'es' ? 'Volver al inicio' : 'Back to home'}
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
          {lang === 'es' ? 'Volver' : 'Back'}
        </Link>
        <div className="text-xs uppercase tracking-[0.2em]" aria-hidden="true">Archive // 2021 — 2026</div>
      </nav>

      <header className="px-6 sm:px-12 pt-10 mb-20 overflow-visible flex flex-col items-start">
        <div className="w-full max-w-md mb-12 sm:mb-20 ml-2">
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed">
            {lang === 'es'
              ? 'Una selección curada de trabajos, experimentos y colaboraciones. Desde interfaces de usuario precisas hasta experiencias web interactivas completas.'
              : 'A curated selection of works, experiments, and collaborations. From precise user interfaces to full interactive web experiences.'}
          </p>
        </div>

        <motion.h1
          style={{ x: titleX }}
          className="font-anton text-[18vw] sm:text-[15vw] leading-none uppercase tracking-tighter whitespace-nowrap"
        >
          {lang === 'es' ? 'PROYECTOS' : 'PROJECTS'}
        </motion.h1>
        <div className="h-[2px] w-full bg-[#111] dark:bg-white/20 mt-4" />
      </header>

      <section className="px-4 sm:px-12 relative" aria-label={lang === 'es' ? 'Lista de proyectos' : 'Projects list'}>
        <div className="flex text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-6 px-4" role="row" aria-hidden="true">
          <div className="w-[10%]">#</div>
          <div className="w-[15%] hidden sm:block">{lang === 'es' ? 'AÑO' : 'YEAR'}</div>
          <div className="flex-1">{lang === 'es' ? 'PROYECTO' : 'PROJECT'}</div>
          <div className="w-[25%] text-right">{lang === 'es' ? 'CATEGORÍA' : 'CATEGORY'}</div>
        </div>

        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => { setActiveProject(project); setIsHovering(true); }}
            onMouseLeave={() => { setActiveProject(null); setIsHovering(false); }}
            onFocus={() => setActiveProject(project)}
            onBlur={() => setActiveProject(null)}
            className="group flex items-center py-8 sm:py-12 border-b border-gray-300 dark:border-white/10 hover:border-[#00A889] transition-colors duration-300 px-4 relative z-10 focus-visible:outline-2 focus-visible:outline-[#00A889]"
            aria-label={`${project.title} - ${project.category} (${project.year})`}
          >
            <div className="w-[10%] font-mono text-xs sm:text-sm text-gray-400">{project.id}</div>
            <div className="w-[15%] font-mono text-xs sm:text-sm text-gray-400 hidden sm:block">{project.year}</div>
            <div className="flex-1">
              <h2 className="font-anton text-4xl sm:text-7xl uppercase group-hover:text-[#00A889] transition-colors duration-300">
                {project.title}
              </h2>
            </div>
            <div className="w-[25%] text-right text-xs sm:text-sm uppercase tracking-widest text-gray-500 group-hover:text-[#111] dark:group-hover:text-white transition-colors">
              {project.category}
            </div>
          </a>
        ))}
      </section>

      <motion.div
        className="fixed top-0 left-0 w-[300px] sm:w-[400px] aspect-video pointer-events-none z-50 overflow-hidden rounded-xl shadow-2xl border-4 border-white dark:border-[#111]"
        style={{
          x: moveX,
          y: moveY,
          opacity: activeProject ? 1 : 0,
          scale: activeProject ? 1 : 0.5,
          rotate: activeProject ? 5 : 0
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3 } }}
        aria-hidden="true"
      >
        {activeProject?.video ? (
          <video
            src={activeProject.video}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={activeProject?.img}
            className="w-full h-full object-cover"
            alt={activeProject ? activeProject.title : "Preview"}
            loading="lazy"
          />
        )}
      </motion.div>
    </div>
  );
};

export default Archive;
