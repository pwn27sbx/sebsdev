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

  /* Grano fotográfico realista */
  .film-grain {
    position: relative;
  }
  .film-grain::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.06"/%3E%3C/svg%3E');
    pointer-events: none;
    z-index: 10;
  }

  /* Reflejo de cristal al hacer hover */
  @keyframes glass-shine {
    0% { transform: translateX(-150%) skewX(-15deg); opacity: 0; }
    20% { opacity: 0.4; }
    100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
  }
  .hover-shine::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-15deg) translateX(-150%);
    pointer-events: none;
    z-index: 20;
  }
  .hover-shine:hover::before {
    animation: glass-shine 1s ease-out forwards;
  }

  @media (hover: none) and (pointer: coarse) {
    .custom-cursor {
      display: none !important;
    }

    /* FIX PARA DISPOSITIVOS TÁCTILES */
    .polaroid-img {
      filter: grayscale(0) !important;
      opacity: 1 !important;
      transform: scale(1) !important;
    }
    .polaroid-overlay {
      opacity: 0.9 !important;
    }
    .mobile-reveal {
      transform: translateY(0) !important;
    }

    /* BUCLE AUTOMÁTICO DE TINTADO VERDE PARA MÓVILES */
    .mobile-wave-1 .hover-fill-text {
      animation: wave-fill 4s cubic-bezier(0.25, 1, 0.5, 1) infinite !important;
      clip-path: inset(150% -10% -10% -10%);
    }
    .mobile-wave-2 .hover-fill-text {
      animation: wave-fill 4s cubic-bezier(0.25, 1, 0.5, 1) infinite !important;
      animation-delay: 2s !important;
      clip-path: inset(150% -10% -10% -10%);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .hover-pause:hover {
      animation-play-state: paused !important;
    }
  }

  /* HOVER PC: Rellenar texto de abajo hacia arriba */
  .hover-fill-text {
    clip-path: inset(150% -10% -10% -10%);
    transition: clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .group:hover .hover-fill-text {
    clip-path: inset(-20% -10% -10% -10%);
  }

  /* OLA MÓVIL: Animación constante en bucle */
  @keyframes wave-fill {
    0%   { clip-path: inset(150% -10% -10% -10%); }
    40%  { clip-path: inset(-20% -10% -10% -10%); }
    60%  { clip-path: inset(-20% -10% -10% -10%); }
    100% { clip-path: inset(-20% -10% 150% -10%); }
  }
  .animate-wave-text {
    animation: wave-fill 3.5s cubic-bezier(0.25, 1, 0.5, 1) infinite;
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

const HoverFillWord = ({ text, setIsHovering }) => (
  <span
    className="relative inline-flex group pointer-events-auto cursor-none whitespace-nowrap"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
  >
    <span className="text-[#e5e5e5] dark:text-[#2a2a2a] block transition-colors duration-300">
      {text}
    </span>
    <span className="absolute top-0 left-0 text-[#00A889] hover-fill-text block pointer-events-none">
      {text}
    </span>
  </span>
);


// ========================================================
// NUEVO DISEÑO: "EL MONOLITO" (Elegante, Full-Image, Edge-to-Edge)
// ========================================================
const DraggablePolaroid = ({ project, index, scrollYProgress, setIsHovering }) => {
  const startDrop = index * 0.05;
  const endDrop = startDrop + 0.25;

  const yDrop = useTransform(scrollYProgress, [startDrop, endDrop], ["-120vh", "0vh"]);

  const [zIndex, setZIndex] = useState(10);

  return (
    <motion.div
      style={{ y: yDrop, zIndex }}
      className="absolute flex items-center justify-center w-full h-full pointer-events-none"
    >
      <div
        style={{ marginLeft: project.xOffset, marginTop: project.yOffset }}
        className="pointer-events-none"
      >
        <motion.div
          drag
          dragTransition={{ power: 0.05, timeConstant: 150 }}
          initial={{ rotate: project.rot }}
          whileDrag={{ scale: 1.05, rotate: 0, cursor: "grabbing" }}
          onDragStart={() => setZIndex(100)}
          onDragEnd={() => setZIndex(10)}
          onHoverStart={() => setZIndex(50)}
          onHoverEnd={() => setZIndex(10)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}

          // Rediseño radical: Eliminamos los bordes gruesos de "papel" y ajustamos proporciones.
          className="group pointer-events-auto cursor-grab w-[55vw] sm:w-[32vw] lg:w-[22vw] aspect-[4/5] sm:aspect-[3/4]
                     bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.9)]
                     border border-gray-300/50 dark:border-white/10
                     rounded-sm transition-all duration-300 relative overflow-hidden hover-shine film-grain"
        >
          {/* Imagen Full-Bleed (Cubre toda la tarjeta) */}
          <img
            draggable="false"
            src={project.img}
            alt="Project Visual"
            className="polaroid-img absolute inset-0 w-full h-full object-cover object-top grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
          />

          {/* Gradiente oscuro inferior para dar profundidad y hacer legible el texto flotante */}
          <div className="polaroid-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

          {/* Información elegante sobreimpresa en la parte inferior */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end pointer-events-none overflow-hidden">

            <span className="text-[#00A889] font-mono text-[10px] sm:text-[11px] font-bold tracking-widest mix-blend-screen drop-shadow-md">
              {project.id}
            </span>

            {/* Contenedor con overflow-hidden para la animación de deslizamiento vertical */}
            <div className="overflow-hidden py-1">
              <span className="mobile-reveal block text-white/90 group-hover:text-white text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-light translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                {project.category}
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};


// ========================================================
// GALERÍA PRINCIPAL
// ========================================================
const ProjectsGallery = ({ setIsHovering, lang }) => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const xSelectedDesktop = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.75], ["100vw", "0vw", "0vw", "-100vw"]);
  const xWorksDesktop = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.75], ["-100vw", "0vw", "0vw", "100vw"]);

  const xSelectedMobile = useTransform(scrollYProgress, [0, 0.25], ["100vw", "0vw"]);
  const xWorksMobile = useTransform(scrollYProgress, [0, 0.25], ["-100vw", "0vw"]);

  const yTextMobile = useTransform(scrollYProgress, [0.55, 0.85], ["0vh", "-35vh"]);
  const yTextDesktop = useTransform(scrollYProgress, [0, 1], ["0vh", "0vh"]);

  const xSelected = isMobile ? xSelectedMobile : xSelectedDesktop;
  const xWorks = isMobile ? xWorksMobile : xWorksDesktop;
  const yText = isMobile ? yTextMobile : yTextDesktop;

  const projects = [
    { id: "01", category: "FRONTEND", img: "/img/1.webp", rot: -12, xOffset: "-45vw", yOffset: "-25vh" },
    { id: "02", category: "FULLSTACK", img: "/img/8.webp", rot: 15, xOffset: "40vw", yOffset: "-10vh" },
    { id: "03", category: "LANDING", img: "/img/2.webp", rot: -8, xOffset: "-20vw", yOffset: "12vh" },
    { id: "04", category: "UI/UX", img: "/img/12.webp", rot: 10, xOffset: "45vw", yOffset: "25vh" },
    { id: "05", category: "CORPORATE", img: "/img/3.webp", rot: -5, xOffset: "0vw", yOffset: "38vh" },
    { id: "06", category: "FRONTEND", img: "/img/9.webp", rot: 20, xOffset: "-55vw", yOffset: "5vh" },
    { id: "07", category: "FULLSTACK", img: "/img/13.webp", rot: -15, xOffset: "50vw", yOffset: "0vh" },
    { id: "08", category: "LANDING", img: "/img/4.webp", rot: 7, xOffset: "-30vw", yOffset: "30vh" },
    { id: "09", category: "UI/UX", img: "/img/10.webp", rot: -22, xOffset: "25vw", yOffset: "-35vh" },
    { id: "10", category: "CORPORATE", img: "/img/5.webp", rot: 12, xOffset: "-10vw", yOffset: "-35vh" },
    { id: "11", category: "FRONTEND", img: "/img/15.webp", rot: -18, xOffset: "55vw", yOffset: "35vh" },
    { id: "12", category: "FULLSTACK", img: "/img/11.webp", rot: 25, xOffset: "-60vw", yOffset: "-25vh" },
    { id: "13", category: "LANDING", img: "/img/14.webp", rot: -10, xOffset: "15vw", yOffset: "-15vh" },
    { id: "14", category: "UI/UX", img: "/img/7.webp", rot: 16, xOffset: "-35vw", yOffset: "40vh" },
    { id: "15", category: "CORPORATE", img: "/img/6.webp", rot: -5, xOffset: "45vw", yOffset: "42vh" },
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors duration-500 z-20 pt-8 -mt-[2vh] sm:-mt-[5vh]">

      <div className="h-[300vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center z-0 overflow-hidden">

          <motion.div style={{ y: yText }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
            <motion.div style={{ x: xSelected }} className="w-full flex justify-center mt-[-10vh] sm:mt-[-5vh] mobile-wave-1">
              <h2 className="font-anton text-[32vw] lg:text-[28vw] leading-[0.75] uppercase tracking-tighter pointer-events-auto">
                <HoverFillWord text={lang === 'es' ? 'TRABAJOS' : 'SELECTED'} setIsHovering={setIsHovering} />
              </h2>
            </motion.div>
            <motion.div style={{ x: xWorks }} className="w-full flex justify-center mt-2 sm:mt-6 mobile-wave-2">
              <h2 className="font-anton text-[32vw] lg:text-[28vw] leading-[0.75] uppercase tracking-tighter pointer-events-auto">
                <HoverFillWord text={lang === 'es' ? 'DESTACADOS' : 'WORKS'} setIsHovering={setIsHovering} />
              </h2>
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {projects.map((project, index) => (
              <DraggablePolaroid
                key={`${project.id}-${index}`}
                project={project}
                index={index}
                scrollYProgress={scrollYProgress}
                setIsHovering={setIsHovering}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
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
        <div className="relative z-10 w-full h-[100dvh] bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors">
          <Hero setIsHovering={setIsHovering} lang={lang} />
        </div>
        <div className="relative z-10 h-[200vh]">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
            <ExpertiseSection setIsHovering={setIsHovering} lang={lang} />
          </div>
        </div>
        <div className="relative z-20 -mt-[100vh] flex flex-col w-full transition-colors duration-300">
          <div className="w-full h-32 sm:h-48 bg-gradient-to-b from-transparent to-[#f5f5f5] dark:to-[#0a0a0a] pointer-events-none"></div>
              <div className="bg-[#f5f5f5] dark:bg-[#0a0a0a] w-full flex flex-col relative z-30">

                  <div className="-mt-32 sm:-mt-48 relative z-30">
                    <InteractiveBanner setIsHovering={setIsHovering} lang={lang} />
                  </div>

                  <ProjectsGallery setIsHovering={setIsHovering} lang={lang} />

              </div>
          </div>

          <div className="relative z-40 -mt-[100vh] w-full transition-colors duration-300 pointer-events-none">
            <div className="w-full h-[15vh] bg-gradient-to-b from-transparent to-[#f5f5f5] dark:to-[#0a0a0a]"></div>

            <div className="bg-[#f5f5f5] dark:bg-[#0a0a0a] w-full min-h-[100vh] flex flex-col justify-between relative z-50 pointer-events-auto pb-4">
              <div className="flex-1 flex flex-col items-center justify-center w-full mt-8 sm:mt-12">
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
