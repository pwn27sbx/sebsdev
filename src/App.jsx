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

  @media (hover: none) and (pointer: coarse) {
    .custom-cursor {
      display: none !important;
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

const HoverFillWord = ({ text, setIsHovering }) => (
  <span
    className="relative inline-flex group pointer-events-auto cursor-none whitespace-nowrap"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
  >
    <span className="text-[#e5e5e5] dark:text-[#131313] block">
      {text}
    </span>
    <span className="absolute top-0 left-0 text-[#00A889] hover-fill-text block pointer-events-none">
      {text}
    </span>
  </span>
);

const WaveFillWord = ({ text, delay = '0s' }) => (
  <span className="relative inline-flex whitespace-nowrap">
    <span className="text-[#e5e5e5] dark:text-[#131313] block">
      {text}
    </span>
    <span
      className="absolute top-0 left-0 text-[#00A889] animate-wave-text block pointer-events-none"
      style={{ animationDelay: delay }}
    >
      {text}
    </span>
  </span>
);

// COMPONENTE INTERNO: LA POLAROID ARRASTRABLE QUE CAE CON EL SCROLL
const DraggablePolaroid = ({ project, index, scrollYProgress, setIsHovering }) => {
  // Calculamos el inicio y fin de la caída basado en el índice (caen en cascada)
  const startDrop = index * 0.12;
  const endDrop = startDrop + 0.25;

  // Transformación del Scroll a la posición Y de la tarjeta
  // Empieza a -150vh (fuera de la pantalla arriba) y cae suavemente al centro (0vh)
  const yDrop = useTransform(scrollYProgress, [startDrop, endDrop], ["-150vh", "0vh"]);
  const opacityFade = useTransform(scrollYProgress, [startDrop, startDrop + 0.05], [0, 1]);

  return (
    <motion.div
      style={{ y: yDrop, opacity: opacityFade }}
      className={`absolute flex items-center justify-center w-full h-full pointer-events-none z-10`}
    >
      <motion.div
        drag
        // Límites elásticos para que no se pierdan fuera de la pantalla
        dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
        dragElastic={0.2}
        initial={{ rotate: project.rot, x: project.xOffset, y: project.yOffset }}
        // Al arrastrar o hacer hover, la tarjeta salta al frente (z-index gigante)
        whileDrag={{ scale: 1.05, zIndex: 100, cursor: "grabbing" }}
        whileHover={{ zIndex: 50 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="pointer-events-auto cursor-grab w-[75vw] sm:w-[50vw] lg:w-[28vw] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-gray-200 dark:border-gray-800 bg-[#fdfdfd] dark:bg-[#111] p-3 pb-8 sm:p-5 sm:pb-12 transition-transform duration-300"
      >
        <a
          draggable="false" // Desactiva el drag nativo del navegador para links
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full h-full"
        >
          {/* Contenedor de Imagen Polaroid */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#050505] rounded-sm pointer-events-none">
            <img
              draggable="false" // Desactiva el drag nativo de la imagen
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover object-top grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            {/* Tinte oscuro sutil */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>

          {/* Textos inferirores de la Polaroid */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between w-full mt-4 sm:mt-6 px-1 sm:px-2 gap-2 pointer-events-none">
            <h3 className="font-anton text-3xl sm:text-4xl xl:text-5xl uppercase leading-[0.8] text-[#111] dark:text-[#eee] group-hover:text-[#00A889] transition-colors duration-400 break-normal">
              {project.title}
            </h3>
            <div className="flex items-center xl:flex-col xl:items-end gap-3 xl:gap-1 shrink-0">
              <span className="text-[#00A889] font-mono text-[10px] sm:text-xs border border-[#00A889]/40 px-2 py-0.5 rounded-full">
                {project.id}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-[10px] tracking-widest uppercase hidden sm:block">
                {project.category}
              </span>
            </div>
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
};


// ========================================================
// GALERÍA PRINCIPAL ACTUALIZADA (PINNING + DRAG POLAROIDS)
// ========================================================
const ProjectsGallery = ({ setIsHovering, lang }) => {
  const sectionRef = useRef(null);

  // La sección es muy alta (300vh) para permitir que el scroll alimente la caída de todas las cartas
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Animación del texto de fondo
  const xSelected = useTransform(scrollYProgress, [0, 1], ["0vw", "-100vw"]);
  const xWorks = useTransform(scrollYProgress, [0, 1], ["0vw", "100vw"]);

  // Proyectos desordenados matemáticamente (xOffset, yOffset y Rotación caótica)
  const projects = [
    { id: "01", title: "NEXUS", category: "FRONTEND", img: "/img/Nexus.webp", link: "https://nexus-drab-one.vercel.app/", rot: -6, xOffset: "-15vw", yOffset: "-15vh" },
    { id: "02", title: "SERVICIOS GENERALES", category: "FULLSTACK", img: "/img/Servicios.webp", link: "https://roi-servicios.vercel.app/", rot: 8, xOffset: "18vw", yOffset: "-5vh" },
    { id: "03", title: "FUXION OPORTUNIDAD", category: "LANDING PAGE", img: "/img/Fuxion.webp", link: "https://fuxionoportunidad.vercel.app/", rot: -4, xOffset: "-8vw", yOffset: "12vh" },
    { id: "04", title: "TRANSPORTES PREMIUM", category: "UI/UX", img: "/img/TransPremium.webp", link: "https://trasnportesjuan.vercel.app/", rot: 5, xOffset: "22vw", yOffset: "20vh" },
    { id: "05", title: "GRUPO HIRBELL", category: "CORPORATE", img: "/img/Hirbell.webp", link: "https://grupohirbell.vercel.app/", rot: -2, xOffset: "5vw", yOffset: "30vh" }
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors duration-500 z-20 pt-8">

      {/* CONTENEDOR MÁGICO DE 300VH */}
      <div className="h-[300vh] w-full relative">

        {/* LA CÁMARA SE DETIENE AQUÍ MIENTRAS HACES SCROLL (Sticky) */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center z-0 overflow-hidden">

          {/* TEXTO GIGANTE DE FONDO (Mobile y PC) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 dark:opacity-30">
            <motion.div style={{ x: xSelected }} className="w-full flex justify-center mt-[-10vh] sm:mt-[-5vh]">
              <h2 className="font-anton text-[32vw] lg:text-[28vw] leading-[0.75] uppercase tracking-tighter">
                <span className="text-[#111] dark:text-[#eee]">{lang === 'es' ? 'TRABAJOS' : 'SELECTED'}</span>
              </h2>
            </motion.div>
            <motion.div style={{ x: xWorks }} className="w-full flex justify-center mt-2 sm:mt-6">
              <h2 className="font-anton text-[32vw] lg:text-[28vw] leading-[0.75] uppercase tracking-tighter">
                <span className="text-[#111] dark:text-[#eee]">{lang === 'es' ? 'DESTACADOS' : 'WORKS'}</span>
              </h2>
            </motion.div>
          </div>

          {/* CAPA DE POLAROIDS CAYENDO Y ARRASTRABLES */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {projects.map((project, index) => (
              <DraggablePolaroid
                key={project.id}
                project={project}
                index={index}
                scrollYProgress={scrollYProgress}
                setIsHovering={setIsHovering}
              />
            ))}
          </div>

        </div>
      </div>

      {/* LA ÚLTIMA CARD VERDE INTACTA (Aparece al terminar los 300vh de caída libre) */}
      <div className="relative z-50 w-full flex justify-center pb-24 pt-12">
        <div className="w-[90vw] sm:w-[80%] lg:w-[60%] flex flex-col pointer-events-auto">
          <Link
            to="/proyectos"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative w-full aspect-[2/1] rounded-md overflow-hidden flex flex-col items-center justify-center cursor-none transform transition-all duration-700 ease-[0.16,1,0.3,1] bg-[#00A889] hover:-translate-y-8 hover:scale-[1.03] hover:rotate-1 hover:shadow-[0_0_100px_-20px_rgba(0,168,137,0.8)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00A889] via-[#00c5a1] to-[#00A889] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

            <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 text-center px-4">
              <h3 className="font-anton text-5xl sm:text-6xl md:text-8xl text-white uppercase tracking-widest group-hover:-translate-y-6 group-hover:scale-110 transition-all duration-700 ease-[0.16,1,0.3,1] leading-[0.85]">
                {lang === 'es' ? 'VER TODOS' : 'VIEW ALL'} <br />
                <span className="text-3xl sm:text-4xl md:text-6xl text-[#004d3e] group-hover:text-white transition-colors duration-500">
                  {lang === 'es' ? 'LOS PROYECTOS' : 'PROJECTS'}
                </span>
              </h3>

              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-md transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:bg-white text-white group-hover:text-[#00A889] group-hover:scale-[1.5] group-hover:rotate-[360deg] shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

    </section>
  );
};

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
      <div className="max-w-md text-center px-4 mb-8 mx-auto z-10">
        <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
          {lang === 'es' ? '¿Tienes una pregunta, propuesta o proyecto, o quieres que trabajemos juntos en algo? No dudes en contactarme.' : 'Got a question, proposal or project or want to work together on something? Feel free to reach out.'}
        </p>
      </div>

      <div className="w-full border-y border-[#ddd] dark:border-[#333] py-4 sm:py-8 overflow-hidden relative flex items-center h-full">
        <a href="mailto:pwn27sbx@gmail.com" className="flex cursor-none w-full items-center h-full group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="flex animate-marquee font-anton text-6xl sm:text-[8vw] uppercase transition-colors duration-300 items-center h-full text-[#00A889] sm:text-[#ccc] sm:dark:text-[#444] group-hover:text-[#00A889] hover-pause" style={{ width: "max-content" }}>
            <TextBlock /><TextBlock /><TextBlock /><TextBlock />
            <TextBlock /><TextBlock /><TextBlock /><TextBlock />
          </div>
        </a>
      </div>

      <div className="my-8 z-10 text-center">
        <a href="mailto:pwn27sbx@gmail.com" className="text-2xl sm:text-4xl text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 relative inline-block group cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          pwn27sbx@gmail.com
          <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#00A889] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-8 text-xs text-gray-500 uppercase tracking-widest border-t border-[#ddd] dark:border-[#222]">
        <p>Arequipa, Peru</p>
        <div className="flex gap-4 my-4 sm:my-0">
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
              <div className="bg-[#f5f5f5] dark:bg-[#0a0a0a] w-full flex flex-col relative">

                  {/* SECCIÓN GALERÍA POLAROID CAÓTICA */}
                  <ProjectsGallery setIsHovering={setIsHovering} lang={lang} />

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
