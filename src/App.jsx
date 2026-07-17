import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Archive from './Archive';

const globalStyles = `
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  .font-anton {
    font-family: 'Anton', sans-serif;
  }

  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  @keyframes marquee-reverse {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
  }

  @keyframes marquee-slow {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  @keyframes marquee-reverse-slow {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
  }

  .animate-marquee {
    animation: marquee 25s linear infinite;
  }

  .animate-marquee-reverse {
    animation: marquee-reverse 25s linear infinite;
  }

  .animate-marquee-slow {
    animation: marquee-slow 120s linear infinite;
  }

  .animate-marquee-reverse-slow {
    animation: marquee-reverse-slow 120s linear infinite;
  }

  /* TEXTURA DE GRANO FOTOGRÁFICO */
  .film-grain::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.08"/%3E%3C/svg%3E');
    pointer-events: none;
    z-index: 10;
  }

  /* REFLEJO DE CRISTAL OPTIMIZADO */
  .hover-shine-effect {
    position: absolute;
    top: 0; left: -150%; width: 60%; height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-20deg) translateZ(0);
    transition: none;
    pointer-events: none;
    z-index: 50;
    will-change: left;
  }
  .group:hover .hover-shine-effect {
    animation: glass-shine 0.8s ease-in-out forwards;
  }
  @keyframes glass-shine {
    0% { left: -150%; }
    100% { left: 200%; }
  }

  @media (hover: none) and (pointer: coarse) {
    .custom-cursor {
      display: none !important;
    }

    .polaroid-img {
      filter: grayscale(0) !important;
      opacity: 1 !important;
      transform: scale(1) translateZ(0) !important;
    }
    .polaroid-overlay {
      opacity: 0.9 !important;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .hover-pause:hover {
      animation-play-state: paused !important;
    }
  }

  /* ANIMACIÓN OLA VERDE RECUPERADA PARA MÓVILES */
  @keyframes wave-fill {
    0%   { clip-path: inset(150% -50% -50% -50%); }
    40%  { clip-path: inset(-50% -50% -50% -50%); }
    60%  { clip-path: inset(-50% -50% -50% -50%); }
    100% { clip-path: inset(-50% -50% 150% -50%); }
  }
`;

const CustomCursor = ({ isHovering }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', updateMousePosition);
      return () => window.removeEventListener('mousemove', updateMousePosition);
    }
  }, []);

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-difference bg-white"
      animate={{
        x: mousePosition.x - 4,
        y: mousePosition.y - 4,
        width: 8,
        height: 8,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0 }}
    />
  );
};

const HoverText = ({ text }) => {
  return (
    <>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-colors duration-150 hover:text-[#00A889] cursor-default font-anton"
        >
          {char}
        </span>
      ))}
    </>
  );
};

const Header = ({ setIsHovering, lang }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full p-4 sm:p-8 flex justify-between items-center z-50 text-white mix-blend-difference pointer-events-none">
      <div
        className="text-xs sm:text-sm font-light uppercase tracking-widest leading-relaxed"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
      </div>
      <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}>
      </div>
    </header>
  );
};

const Hero = ({ setIsHovering, lang }) => {
  const { scrollYProgress } = useScroll();
  const lineWidth = useTransform(scrollYProgress, [0, 0.4], ["8vw", "150vw"]);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-center px-4 overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="flex flex-col items-center justify-center w-full max-w-[100vw] mx-auto z-10">
        <div className="flex items-center justify-center w-full flex-nowrap">
          <div
            className="text-[13vw] sm:text-[16vw] leading-[0.8] uppercase tracking-tighter shrink-0 text-[#111] dark:text-white"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <HoverText text="FRONT" />
          </div>
          <motion.div
            style={{ width: lineWidth }}
            className="h-[1vw] sm:h-[1.5vw] bg-[#111] dark:bg-white mx-2 sm:mx-4 transition-colors duration-300 hover:bg-[#00A889] shrink-0"
          />
          <div
            className="text-[13vw] sm:text-[16vw] leading-[0.8] uppercase tracking-tighter shrink-0 text-[#111] dark:text-white"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <HoverText text="END" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full items-center sm:items-end justify-between mt-8 sm:mt-10 px-4 sm:px-10 gap-8 sm:gap-0">
          <div
            className="text-[14vw] sm:text-[15vw] leading-[0.8] uppercase tracking-tighter shrink-0 text-[#111] dark:text-white"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <HoverText text="DEVELOPER" />
          </div>

          <div className="w-full sm:w-[32%] sm:pb-8 flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-xs sm:max-w-none">
              <span className="text-sm uppercase tracking-widest text-[#00A889] font-bold block mb-2 sm:mb-3">
                {lang === 'es' ? 'Acerca de' : 'About'}
              </span>
              {lang === 'es'
                ? 'Soy un desarrollador enfocado en crear experiencias digitales interactivas, fusionando diseño de alta calidad con tecnología moderna para marcas y proyectos creativos.'
                : 'I am a developer focused on creating interactive digital experiences, merging high-quality design con modern technology for creative brands and projects.'}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 right-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mix-blend-difference"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>{lang === 'es' ? 'Hacer Scroll' : 'Scroll down'}</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
};

const ExpertiseSection = ({ setIsHovering, lang }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const expertises = [
    {
      id: "01",
      title: lang === 'es' ? "DESARROLLO\nFRONTEND" : "FRONTEND\nDEVELOPMENT",
      marquee: "REACT — NEXT.JS — ASTRO — TYPESCRIPT — TAILWIND CSS — JAVASCRIPT — ",
      direction: "left"
    },
    {
      id: "02",
      title: lang === 'es' ? "DISEÑO UI/UX" : "UI/UX DESIGN",
      marquee: "FIGMA — UI/UX — FRAMER — PROTOTYPING — DESIGN SYSTEMS — ACCESSIBILITY — ",
      direction: "right"
    },
    {
      id: "03",
      title: lang === 'es' ? "MOTION &\nINTERACCIÓN" : "MOTION &\nINTERACTION",
      marquee: "FRAMER MOTION — GSAP — WEBGL — THREE.JS — SVG ANIMATION — CREATIVE CODING — ",
      direction: "left"
    }
  ];

  return (
    <section className="w-full relative flex flex-col justify-center min-h-[100dvh] pt-12 pb-24 bg-[#f5f5f5] dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-700 border-t border-gray-200 dark:border-gray-800">
      <div className="relative z-10 w-full px-4 sm:px-12 md:px-24 flex flex-col gap-8 md:gap-12">
        {expertises.map((exp, index) => (
          <div
            key={`row-${index}`}
            className="flex flex-col md:flex-row md:items-center justify-between group cursor-none w-full border-b border-gray-300 dark:border-gray-800 pb-4 md:pb-8 transition-colors duration-500 hover:border-[#00A889]"
            onMouseEnter={() => { setHoveredIndex(index); setIsHovering(true); }}
            onMouseLeave={() => { setHoveredIndex(null); setIsHovering(false); }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-12 w-full text-left">
              <span className={`font-mono text-sm md:text-base transition-colors duration-500 shrink-0 ${
                hoveredIndex === index ? 'text-[#00A889]' : 'text-gray-400 dark:text-gray-600'
              }`}>
                {exp.id}
              </span>

              <div className="flex lg:hidden flex-col w-full gap-2 mt-4 items-start text-left">
                <h2 className="font-anton text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] text-[#111] dark:text-[#eee] whitespace-pre-wrap text-left">
                  {exp.title}
                </h2>
                <div className="flex whitespace-nowrap font-anton text-3xl md:text-4xl uppercase tracking-tighter leading-none text-[#00A889] animate-marquee" style={{ width: "max-content" }}>
                  <span className="shrink-0 pr-4">{exp.marquee.repeat(2)}</span>
                </div>
              </div>

              <div className="hidden lg:flex flex-1 relative overflow-hidden h-[80px] md:h-[8vw] items-center w-full justify-start">
                <h2 className={`absolute left-0 w-full font-anton text-5xl sm:text-7xl md:text-[6vw] uppercase tracking-tighter leading-none transition-all duration-500 transform origin-bottom ${
                  hoveredIndex === index
                    ? '-translate-y-[120%] opacity-0'
                    : hoveredIndex !== null
                      ? 'text-gray-400/30 dark:text-gray-600/30 translate-y-0 opacity-100'
                      : 'text-[#111] dark:text-[#eee] translate-y-0 opacity-100'
                }`}>
                  {exp.title.replace('\n', ' ')}
                </h2>

                <div className={`absolute left-0 w-full transition-all duration-500 transform origin-top ${
                  hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}>
                   <div className={`flex whitespace-nowrap font-anton text-5xl sm:text-7xl md:text-[6vw] uppercase tracking-tighter leading-none text-[#00A889] ${
                     exp.direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
                   }`} style={{ width: "max-content" }}>
                     <span className="shrink-0 pr-4">{exp.marquee.repeat(3)}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const InteractiveBanner = ({ setIsHovering, lang }) => {
  const [focusedBand, setFocusedBand] = useState('front');

  const { scrollY } = useScroll();
  const xFront = useTransform(scrollY, [0, 5000], [0, -1500]);
  const xBack = useTransform(scrollY, [0, 5000], [0, 1500]);

  const CustomArrow = () => (
    <span className="flex items-center justify-center mx-4 sm:mx-8 shrink-0">
      <svg className="w-10 h-10 sm:w-16 sm:h-16 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </span>
  );

  const TextBlockFront = () => (
    <span className="shrink-0 flex items-center pr-4">
      {lang === 'es' ? 'EXPERIENCIAS' : 'EXPERIENCES'} <CustomArrow /> {lang === 'es' ? 'DIGITALES' : 'DIGITAL'} <CustomArrow />
    </span>
  );

  const TextBlockBack = () => (
    <span className="shrink-0 flex items-center pr-4">
      {lang === 'es' ? 'INNOVACIÓN' : 'INNOVATION'} <CustomArrow /> {lang === 'es' ? 'CREATIVIDAD' : 'CREATIVITY'} <CustomArrow />
    </span>
  );

  return (
    <div
      className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center bg-transparent shrink-0 z-30"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setFocusedBand('front'); }}
    >
      <div className={`absolute w-[130%] bg-[#111] dark:bg-white text-white dark:text-[#111] py-4 sm:py-8 md:py-10 transform rotate-[6deg] transition-all duration-700 ease-out z-[40] pointer-events-auto ${focusedBand === 'back' ? 'blur-0 opacity-100' : 'blur-[5px] opacity-90'}`} onMouseEnter={() => setFocusedBand('back')}>
        <motion.div style={{ x: xBack, width: "max-content" }} className="flex">
          <div className="flex animate-marquee-reverse-slow font-anton text-4xl sm:text-6xl uppercase tracking-widest whitespace-nowrap" style={{ width: "max-content" }}>
            {[...Array(15)].map((_, i) => <TextBlockBack key={`back-${i}`} />)}
          </div>
        </motion.div>
      </div>

      <div className={`absolute w-[130%] bg-[#00A889] text-white py-4 sm:py-8 md:py-10 transform -rotate-[6deg] transition-all duration-700 ease-out z-[50] pointer-events-auto shadow-none ${focusedBand === 'back' ? 'blur-[5px]' : 'blur-0 opacity-100'}`} onMouseEnter={() => setFocusedBand('front')}>
        <motion.div style={{ x: xFront, width: "max-content" }} className="flex">
          <div className="flex animate-marquee-slow font-anton text-4xl sm:text-6xl uppercase tracking-widest whitespace-nowrap" style={{ width: "max-content" }}>
            {[...Array(15)].map((_, i) => <TextBlockFront key={`front-${i}`} />)}
          </div>
        </motion.div>
      </div>
    </div>
  );
};


// ========================================================
// TEXTO ESCRITORIO: SOMBRA 3D PERFECTA
// ========================================================
const DesktopScrollText = ({ text, scrollYProgress, globalOffset }) => {
  const chars = text.split('');
  const shuffleArray = [10, 2, 8, 4, 12, 1, 6, 9, 3, 11, 0, 7, 5];

  return (
    <span className="flex relative leading-none py-2 sm:py-4">
      {chars.map((char, i) => {
        const globalIdx = i + globalOffset;
        const turn = shuffleArray.indexOf(globalIdx) !== -1 ? shuffleArray.indexOf(globalIdx) : i;
        const step = 0.015;

        // ENTRADA
        const tintStart = 0.08 + (turn * step);
        const tintEnd = tintStart + 0.001;

        // SALIDA
        const untintStart = 0.40 + (turn * step);
        const untintEnd = untintStart + 0.001;

        const opacity = useTransform(
          scrollYProgress,
          [0, tintStart, tintEnd, untintStart, untintEnd, 1],
          [0, 0, 1, 1, 0, 0]
        );

        return (
          <span key={i} className="relative inline-block whitespace-pre">
            {/* Base Gris (Sombra) */}
            <span className="text-[#e5e5e5] dark:text-[#2a2a2a]">{char}</span>
            {/* Letra Verde Animada con Desfase */}
            <motion.span
              className="absolute text-[#00A889] pointer-events-none -top-[1vw] -left-[0.8vw] md:-top-[0.8vw] md:-left-[0.6vw]"
              style={{ opacity }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

// ========================================================
// TEXTO MÓVIL: OLA VERDE RECUPERADA (CERO BUG)
// ========================================================
const MobileVerticalWaveText = ({ text, delay }) => (
  <span className="relative inline-flex whitespace-nowrap py-2 sm:py-4 leading-none">
    {/* Base Gris */}
    <span className="text-[#e5e5e5] dark:text-[#2a2a2a] block">
      {text}
    </span>
    {/* Letra Verde con Animación en Bucle + Sombra 3D */}
    <span
      className="absolute text-[#00A889] block pointer-events-none -top-[1.5vw] -left-[1vw] sm:-top-[1vw] sm:-left-[0.8vw]"
      style={{
        animation: `wave-fill 4s cubic-bezier(0.25, 1, 0.5, 1) infinite`,
        animationDelay: delay,
        clipPath: 'inset(150% -50% -50% -50%)'
      }}
    >
      {text}
    </span>
  </span>
);

const BentoCard = ({ project, setIsHovering }) => {
  const [isHovered, setHovered] = useState(false);

  // Diccionario de direcciones para la imagen secundaria
  const slideVariants = {
    top: { y: "-100%", x: 0 },
    bottom: { y: "100%", x: 0 },
    left: { x: "-100%", y: 0 },
    right: { x: "100%", y: 0 },
    center: { y: 0, x: 0 }
  };

  return (
    <motion.div
      layout
      // Cero bordes de separación
      className={`group relative overflow-hidden rounded-none border-none bg-[#050505] cursor-none ${project.spanClass} transform-gpu`}
      onMouseEnter={() => { setIsHovering(true); setHovered(true); }}
      onMouseLeave={() => { setIsHovering(false); setHovered(false); }}
    >
      <div className="absolute inset-0 z-0 bg-[#050505]">

        {/* IMAGEN PRINCIPAL */}
        <img
          src={project.img}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 transition-all duration-700 ease-out"
        />

        {/* IMAGEN SECUNDARIA (Animada direccionalmente) */}
        {project.hoverImg && (
          <motion.img
            src={project.hoverImg}
            alt={`${project.title} hover`}
            initial={project.slideDirection}
            variants={slideVariants}
            animate={isHovered ? "center" : project.slideDirection}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"></div>
      </div>

      <div className="relative z-30 h-full p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start pointer-events-auto">
          <span className="bg-[#111] text-white px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest border border-white/20 rounded-md group-hover:bg-[#00A889] group-hover:border-[#00A889] transition-colors duration-300">
            {project.category}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#00A889] group-hover:border-[#00A889] group-hover:scale-110 group-hover:-rotate-45 transition-all duration-500">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-auto">
          <h3 className="text-white font-anton text-2xl sm:text-3xl uppercase tracking-wider mb-1 leading-none drop-shadow-lg">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            {project.tech.map(t => (
              <span key={t} className="text-[9px] font-mono border border-white/20 text-white/90 px-1.5 py-0.5 rounded backdrop-blur-sm bg-black/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsGallery = ({ setIsHovering, lang }) => {
  const projectsData = [
    // 🏆 TOP TIER: LOS MÁS RELEVANTES (Cartas Grandes 2x2)
    {
      id: "01", title: "Interactive Grid Engine", category: "SAAS / ARCHITECTURE",
      tech: ["React", "TypeScript", "Algorithms"], img: "/img/MiniExcel.webp", hoverImg: "/img/MiniExcel2.webp",
      spanClass: "col-span-2 md:col-span-2 row-span-2", slideDirection: "top"
    },
    {
      id: "02", title: "Visual Logic Editor", category: "SAAS",
      tech: ["Next.js", "DAG"], img: "/img/LogicEditor.webp", hoverImg: "/img/LogicEditor2.webp",
      spanClass: "col-span-2 md:col-span-2 row-span-2", slideDirection: "top"
    },
    {
      id: "03", title: "Faceted Search UI", category: "E-COMMERCE",
      tech: ["Data Structures", "Algorithms"], img: "/img/Filtered.webp", hoverImg: "/img/Filtered2.webp",
      spanClass: "col-span-2 md:col-span-2 row-span-2", slideDirection: "left"
    },

    // 🥈 MID TIER: INTERACTIVOS Y DIRECTORIOS (Cartas Medianas)
    {
      id: "04", title: "Paint Studio", category: "CREATIVE / WEB APP",
      tech: ["Canvas", "UI"], img: "/img/Paint2.webp", hoverImg: "/img/Paint.webp",
      spanClass: "col-span-2 md:col-span-2 row-span-1", slideDirection: "right" // Mediana ancha (Horizontal)
    },
    {
      id: "05", title: "Tetris Arcade", category: "GAMING / INTERACTIVE",
      tech: ["Framer", "Logic"], img: "/img/Tetris2.webp", hoverImg: "/img/Tetris.webp",
      spanClass: "col-span-1 md:col-span-1 row-span-2", slideDirection: "bottom" // Mediana alta (Vertical)
    },
    {
      id: "06", title: "Nexus Directory", category: "DIRECTORY / TOOLKIT",
      tech: ["React", "Centralized Data"], img: "/img/9.webp", hoverImg: "/img/10.webp",
      spanClass: "col-span-1 md:col-span-1 row-span-2", slideDirection: "bottom" // Mediana alta (Vertical)
    },

    // 🥉 BOTTOM TIER: LANDINGS MENOS RELEVANTES (Cartas Chicas 1x1)
    {
      id: "07", title: "Transportes Premium", category: "LANDING",
      tech: ["Astro", "SVG Motion"], img: "/img/5.webp", hoverImg: "/img/13.webp",
      spanClass: "col-span-1 md:col-span-1 row-span-1", slideDirection: "left"
    },
    {
      // Agregada para completar el rompecabezas matemático de la grilla
      id: "08", title: "Creative Agency UI", category: "LANDING",
      tech: ["Framer", "Design"], img: "/img/7.webp", hoverImg: "/img/7_2.webp",
      spanClass: "col-span-1 md:col-span-1 row-span-1", slideDirection: "right"
    }
  ];

  return (
    // CENTRADO ABSOLUTO: El contenedor toma toda la altura (h-full), y justify-center distribuye el espacio sobrante arriba y abajo por igual.
    <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 max-w-[1400px] mx-auto py-12 sm:py-16">

      {/* TÍTULO CON RESPITE NATURAL */}
      <div className="mb-6 sm:mb-10 flex justify-start w-full shrink-0 z-30">
        <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none text-[#111] dark:text-white">
          {lang === 'es' ? 'TRABAJOS' : 'SELECTED'} <span className="text-[#00A889]">{lang === 'es' ? 'DESTACADOS' : 'WORKS'}</span>
        </h2>
      </div>

      {/*
        EL LÍMITE (max-h-[65vh]): Esta es la clave. Al decirle a la grilla que no sea más alta que el 65% de la pantalla,
        garantizamos que haya un 35% de espacio libre (menos el título) que se distribuye como aire arriba y abajo.
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(10,minmax(0,1fr))] md:grid-rows-5 gap-0 w-full flex-1 max-h-[65vh] min-h-0 rounded-3xl overflow-hidden border-[0.5px] border-gray-300/50 dark:border-white/10 relative z-20 bg-[#050505]">
        {projectsData.map(project => (
          <BentoCard key={project.id} project={project} setIsHovering={setIsHovering} />
        ))}
      </div>

    </div>
  );
};

const ViewAllBlock = ({ setIsHovering, lang }) => (
  <div className="relative w-full flex justify-center px-4">
    <div className="w-full sm:w-[70%] lg:w-[45%] max-w-3xl flex flex-col pointer-events-auto">
      <Link
        to="/proyectos"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="group relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/10] max-h-[50vh] rounded-md overflow-hidden flex flex-col items-center justify-center cursor-none transform transition-all duration-700 ease-[0.16,1,0.3,1] bg-[#00A889] hover:-translate-y-4 hover:scale-[1.05] hover:-rotate-2 hover:shadow-[0_0_80px_-20px_rgba(0,168,137,0.8)]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00A889] via-[#00c5a1] to-[#00A889] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center px-4">
          <h3 className="font-anton text-4xl sm:text-5xl md:text-7xl text-white uppercase tracking-widest transition-all duration-700 ease-[0.16,1,0.3,1] leading-[0.85]">
            {lang === 'es' ? 'VER TODOS LOS' : 'VIEW ALL'} <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-[#004d3e] group-hover:text-white transition-colors duration-500 block mt-1 sm:mt-2">
              {lang === 'es' ? 'PROYECTOS' : 'PROJECTS'}
            </span>
          </h3>
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-md transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:bg-white text-white group-hover:text-[#00A889] group-hover:scale-[1.3] group-hover:rotate-[360deg] shadow-lg mt-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </div>
        </div>
      </Link>
    </div>
  </div>
);

const Footer = ({ setIsHovering, lang }) => {
  const marqueeText = lang === 'es' ? "¿EMPEZAMOS ALGO? HABLEMOS" : "BE STARTING SOMETHING? LET'S TALK";

  const TextBlock = () => (
    <div className="flex items-center h-full">
      <span className="shrink-0 leading-none whitespace-pre">{marqueeText}</span>
      <span className="shrink-0 leading-none text-[0.8em] -translate-y-[0.1em] mx-4 sm:mx-8">—</span>
    </div>
  );

  return (
    <footer className="relative flex flex-col justify-end pt-2 w-full bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-md text-center px-4 mb-4 mx-auto z-10">
        <p className="text-gray-600 dark:text-gray-400 text-[11px] sm:text-sm font-light leading-relaxed">
          {lang === 'es' ? '¿Tienes una pregunta, propuesta o proyecto, o quieres que trabajemos juntos en algo? No dudes en contactarme.' : 'Got a question, proposal or project or want to work together on something? Feel free to reach out.'}
        </p>
      </div>

      <div className="w-full border-y border-[#ddd] dark:border-[#333] py-2 sm:py-4 overflow-hidden relative flex items-center h-full">
        <a href="mailto:pwn27sbx@gmail.com" className="flex cursor-none w-full items-center h-full group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="flex animate-marquee font-anton text-5xl sm:text-[7vw] uppercase transition-colors duration-300 items-center h-full text-[#00A889] sm:text-[#ccc] sm:dark:text-[#444] group-hover:text-[#00A889] hover-pause" style={{ width: "max-content" }}>
            <TextBlock /><TextBlock /><TextBlock /><TextBlock />
            <TextBlock /><TextBlock /><TextBlock /><TextBlock />
          </div>
        </a>
      </div>

      <div className="mt-8 mb-8 z-10 text-center">
        <a href="mailto:pwn27sbx@gmail.com" className="text-xl sm:text-3xl text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 relative inline-block group cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          pwn27sbx@gmail.com
          <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-0 h-[2px] bg-[#00A889] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-8 text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest border-t border-[#ddd] dark:border-[#222]">
        <p className="mb-3 sm:mb-0">Arequipa, Peru</p>
        <div className="flex gap-4 sm:gap-6 mb-3 sm:mb-0">
          <a href="https://x.com/Fs3b4S" className="hover:text-black dark:hover:text-white transition-colors">X(Twitter)</a>
          <a href="https://github.com/pwn27sbx/pwn27sbx/tree/main" className="hover:text-black dark:hover:text-white transition-colors">Github</a>
          <a href="https://www.linkedin.com/in/pwnsxb/?isSelfProfile=true" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/frappedmango/" className="hover:text-black dark:hover:text-white transition-colors">Instagram</a>

        </div>
        <p>Design by Sebastian</p>
      </div>
    </footer>
  );
};

function Portfolio({ lang }) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    applyTheme(darkModeMediaQuery);
    darkModeMediaQuery.addEventListener('change', applyTheme);
    return () => darkModeMediaQuery.removeEventListener('change', applyTheme);
  }, []);

  return (
    <div className="bg-[#f5f5f5] dark:bg-[#0a0a0a] text-[#111] dark:text-white min-h-screen font-sans md:cursor-none transition-colors duration-500 overflow-clip">
      <CustomCursor isHovering={isHovering} />
      <Header setIsHovering={setIsHovering} lang={lang} />

      <main className="w-full relative z-10">

        {/* ======================= SECCIÓN 1: HERO ======================= */}
        <div className="relative z-10 w-full h-[100dvh]">
          <Hero setIsHovering={setIsHovering} lang={lang} />
        </div>

        {/* ======================= SECCIÓN 2: EXPERTISE ======================= */}
        <div className="relative z-20 h-[200vh]">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a]">
            <ExpertiseSection setIsHovering={setIsHovering} lang={lang} />
          </div>
        </div>

        {/* ======================= SECCIÓN 3: BENTO GRID ======================= */}
        <div className="relative z-30 -mt-[100vh] h-[300vh] w-full bg-[#f5f5f5] dark:bg-[#0a0a0a]">

          <div className="absolute top-0 left-0 w-full h-32 sm:h-48 -translate-y-full bg-gradient-to-b from-transparent to-[#f5f5f5] dark:to-[#0a0a0a] pointer-events-none z-40"></div>

          <div className="w-full pt-16 sm:pt-24 pb-8 z-30 relative">
            <InteractiveBanner setIsHovering={setIsHovering} lang={lang} />
          </div>

          {/* CENTRADO PERFECTO: flex-col, justify-center e items-center se encargan de todo */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center z-20 overflow-hidden">
            <ProjectsGallery setIsHovering={setIsHovering} lang={lang} />
          </div>

        </div>

        {/* ======================= SECCIÓN 4: FOOTER ======================= */}
        <div className="relative z-40 -mt-[100vh] w-full pointer-events-none">

          <div className="absolute top-0 left-0 w-full h-32 sm:h-48 -translate-y-full bg-gradient-to-b from-transparent to-[#f5f5f5] dark:to-[#0a0a0a] pointer-events-none z-50"></div>

          <div className="w-full min-h-screen flex flex-col justify-between pt-12 pb-4 bg-[#f5f5f5] dark:bg-[#0a0a0a] pointer-events-auto shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="flex-1 flex flex-col items-center justify-center w-full mt-0 mb-8 sm:mb-16">
              <ViewAllBlock setIsHovering={setIsHovering} lang={lang} />
            </div>
            <Footer setIsHovering={setIsHovering} lang={lang} />
          </div>

        </div>

      </main>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const userLang = navigator.language || navigator.userLanguage;
      if (userLang.toLowerCase().includes('es')) {
        setLang('es');
      }
    }
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio lang={lang} />} />
          <Route path="/proyectos" element={<Archive lang={lang} />} />
        </Routes>
      </Router>
    </>
  );
}
