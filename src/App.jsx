import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  /* Ocultar cursor en móviles */
  @media (hover: none) and (pointer: coarse) {
    .custom-cursor {
      display: none !important;
    }
  }

  /* SOLUCIÓN CAPTURA 3: Pausa de marquesina solo en PC (evita el bug tactil de iPhone) */
  @media (hover: hover) and (pointer: fine) {
    .hover-pause:hover {
      animation-play-state: paused !important;
    }
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
    <div className="flex">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="transition-colors duration-150 hover:text-[#00A889] cursor-default font-anton shrink-0"
        >
          {char}
        </span>
      ))}
    </div>
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
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="group relative px-6 py-2 overflow-hidden rounded-full border border-white text-xs font-medium uppercase tracking-widest transition-colors bg-transparent"
        >
          <span className="relative z-10 transition-colors text-white group-hover:text-black">
            {lang === 'es' ? 'Contacto' : 'Contact'}
          </span>
          <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
        </button>
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
            className="text-[13vw] sm:text-[16vw] leading-[0.8] font-black uppercase tracking-tighter shrink-0 text-[#111] dark:text-white"
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
            className="text-[13vw] sm:text-[16vw] leading-[0.8] font-black uppercase tracking-tighter shrink-0 text-[#111] dark:text-white"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <HoverText text="END" />
          </div>
        </div>

        {/* SOLUCIÓN CAPTURA 1: Flex-col en móviles para acomodar el texto 'About' debajo de DEVELOPER */}
        <div className="flex flex-col sm:flex-row w-full items-center sm:items-end justify-between mt-8 sm:mt-10 px-4 sm:px-10 gap-8 sm:gap-0">
          <div
            className="text-[14vw] sm:text-[15vw] leading-[0.8] font-black uppercase tracking-tighter shrink-0 text-[#111] dark:text-white"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <HoverText text="DEVELOPER" />
          </div>

          {/* El texto ya no está oculto en móviles y se centra automáticamente */}
          <div className="w-full sm:w-1/4 sm:pb-8 sm:pl-8 flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light max-w-xs sm:max-w-none">
              <span className="text-xs uppercase tracking-widest text-[#00A889] font-bold block mb-2">
                {lang === 'es' ? 'Acerca de' : 'About'}
              </span>
              {lang === 'es'
                ? 'Soy un desarrollador enfocado en crear experiencias digitales interactivas, fusionando diseño de alta calidad con tecnología moderna para marcas y proyectos creativos.'
                : 'I am a developer focused on creating interactive digital experiences, merging high-quality design with modern technology for creative brands and projects.'}
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
      title: lang === 'es' ? "DESARROLLO FRONTEND" : "FRONTEND DEVELOPMENT",
      marquee: "REACT — NEXT.JS — ASTRO — TYPESCRIPT — TAILWIND CSS — JAVASCRIPT — ",
      direction: "left",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1920"
    },
    {
      id: "02",
      title: lang === 'es' ? "DISEÑO UI/UX" : "UI/UX DESIGN",
      marquee: "FIGMA — UI/UX — FRAMER — PROTOTYPING — DESIGN SYSTEMS — ACCESSIBILITY — ",
      direction: "right",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1920"
    },
    {
      id: "03",
      title: lang === 'es' ? "MOTION E INTERACCIÓN" : "MOTION & INTERACTION",
      marquee: "FRAMER MOTION — GSAP — WEBGL — THREE.JS — SVG ANIMATION — CREATIVE CODING — ",
      direction: "left",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1920"
    }
  ];

  return (
    <section className="w-full relative flex flex-col justify-center min-h-[100dvh] pt-12 pb-24 bg-[#f5f5f5] dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-700 border-t border-gray-200 dark:border-gray-800">
      {expertises.map((exp, index) => (
        <div
          key={`bg-${index}`}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-out transform grayscale ${
            hoveredIndex === index ? 'opacity-[0.03] dark:opacity-[0.05] scale-105 blur-xl' : 'opacity-0 scale-100 blur-none'
          }`}
          style={{ backgroundImage: `url(${exp.image})` }}
        >
          <div className="absolute inset-0 bg-[#f5f5f5]/95 dark:bg-[#0a0a0a]/95 transition-opacity duration-700" />
        </div>
      ))}

      <div className="relative z-10 w-full px-4 sm:px-12 md:px-24 flex flex-col gap-8 md:gap-12">
        {expertises.map((exp, index) => (
          <div
            key={`row-${index}`}
            className="flex flex-col md:flex-row md:items-center justify-between group cursor-none w-full border-b border-gray-300 dark:border-gray-800 pb-4 md:pb-8 transition-colors duration-500 hover:border-[#00A889]"
            onMouseEnter={() => { setHoveredIndex(index); setIsHovering(true); }}
            onMouseLeave={() => { setHoveredIndex(null); setIsHovering(false); }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-12 w-full">
              <span className={`font-mono text-sm md:text-base transition-colors duration-500 shrink-0 ${
                hoveredIndex === index ? 'text-[#00A889]' : 'text-gray-400 dark:text-gray-600'
              }`}>
                {exp.id}
              </span>

              {/* SOLUCIÓN CAPTURA 2 (VISTA MÓVIL): Se muestra el título y el texto deslizante apilados sin depender de "hover" */}
              <div className="flex sm:hidden flex-col w-full gap-2 mt-2">
                <h2 className="font-anton text-4xl uppercase tracking-tighter leading-[0.9] text-[#111] dark:text-[#eee]">
                  {exp.title}
                </h2>
                <div className="flex whitespace-nowrap font-anton text-2xl uppercase tracking-tighter leading-none text-[#00A889] animate-marquee" style={{ width: "max-content" }}>
                  <span className="shrink-0 pr-4">{exp.marquee.repeat(2)}</span>
                </div>
              </div>

              {/* VISTA ESCRITORIO: Animación original con posicionamiento absoluto al hacer hover */}
              <div className="hidden sm:flex flex-1 relative overflow-hidden h-[80px] md:h-[8vw] items-center w-full">
                <h2 className={`absolute left-0 w-full font-anton text-5xl sm:text-7xl md:text-[6vw] uppercase tracking-tighter leading-none transition-all duration-500 transform origin-bottom ${
                  hoveredIndex === index
                    ? '-translate-y-[120%] opacity-0'
                    : hoveredIndex !== null
                      ? 'text-gray-400/30 dark:text-gray-600/30 translate-y-0 opacity-100'
                      : 'text-[#111] dark:text-[#eee] translate-y-0 opacity-100'
                }`}>
                  {exp.title}
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

  const CustomArrow = () => (
    <span className="flex items-center justify-center mx-4 sm:mx-8 shrink-0">
      <svg
        className="w-10 h-10 sm:w-16 sm:h-16 text-[#fff]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </span>
  );

  const TextBlockFront = () => (
    <span className="shrink-0 flex items-center pr-4">
      {lang === 'es' ? 'PROYECTOS' : 'PROJECTS'}
      <CustomArrow />
      {lang === 'es' ? 'TRABAJOS' : 'WORKS'}
      <CustomArrow />
    </span>
  );

  const TextBlockBack = () => (
    <span className="shrink-0 flex items-center pr-4">
      {lang === 'es' ? 'MÁS DE 100 CLIENTES' : 'OVER 100 CUSTOMERS'}
      <CustomArrow />
      {lang === 'es' ? '8 AÑOS DE EXPERIENCIA' : '8 YEARS OF EXPERIENCE'}
      <CustomArrow />
    </span>
  );

  return (
    <div
      className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center bg-transparent shrink-0 z-30"
      onMouseEnter={() => {
        if (setIsHovering) setIsHovering(true);
      }}
      onMouseLeave={() => {
        if (setIsHovering) setIsHovering(false);
        setFocusedBand('front');
      }}
    >
      <div
        onMouseEnter={() => setFocusedBand('back')}
        className={`absolute w-[130%] bg-[#111] text-white py-4 sm:py-8 md:py-10 transform rotate-[6deg] transition-all duration-700 ease-out z-[40] pointer-events-auto ${
          focusedBand === 'back' ? 'blur-0 opacity-100' : 'blur-[5px] opacity-90'
        }`}
      >
        <div className="flex animate-marquee-reverse-slow font-anton text-4xl sm:text-6xl uppercase tracking-widest whitespace-nowrap" style={{ width: "max-content" }}>
          {[...Array(15)].map((_, i) => <TextBlockBack key={`back-${i}`} />)}
        </div>
      </div>

      <div
        onMouseEnter={() => setFocusedBand('front')}
        className={`absolute w-[130%] bg-[#00A889] text-white py-4 sm:py-8 md:py-10 transform -rotate-[6deg] transition-all duration-700 ease-out z-[50] pointer-events-auto shadow-none ${
          focusedBand === 'back' ? 'blur-[5px]' : 'blur-0 opacity-100'
        }`}
      >
        <div className="flex animate-marquee-slow font-anton text-4xl sm:text-6xl uppercase tracking-widest whitespace-nowrap" style={{ width: "max-content" }}>
          {[...Array(15)].map((_, i) => <TextBlockFront key={`front-${i}`} />)}
        </div>
      </div>
    </div>
  );
};

const ProjectsGallery = ({ setIsHovering }) => {
  const projects = [
    { id: 1, title: "Body Om", category: "Design", height: 350, img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Wokwi", category: "Productivity", height: 450, img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "123Apps", category: "Productivity", height: 250, img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "ReactBits", category: "Development", height: 400, img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "QuickRef", category: "Productivity", height: 300, img: "https://images.unsplash.com/photo-1614088267258-294726bf68fc?auto=format&fit=crop&q=80&w=800" },
    { id: 6, title: "PhetColorado", category: "Education", height: 500, img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" }
  ];

  const ProjectCard = ({ project }) => (
    <div
      className="flex flex-col group cursor-none w-full relative h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="bg-white dark:bg-[#1a1a1a] rounded-sm p-3 border border-gray-200 dark:border-gray-800 transition-colors w-full flex flex-col h-full gap-3">
        <div className="flex justify-between items-center px-1 shrink-0">
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{project.title}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{project.category}</span>
        </div>

        <div
          className="relative w-full rounded-sm overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0"
          style={{ height: `${project.height}px`, minHeight: `${project.height}px` }}
        >
          <div
            /* SOLUCIÓN: blur-0 y scale-100 por defecto (móvil). blur-[3px] y scale-105 a partir de 'sm:' (PC) */
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 blur-0 scale-100 sm:blur-[3px] sm:scale-105 group-hover:blur-[0px] group-hover:scale-100"
            style={{ backgroundImage: `url('${project.img}')` }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

      </div>
    </div>
  );

  return (
    <section className="pb-8 px-4 sm:px-8 bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors duration-300 w-full">
      <div className="max-w-[95vw] lg:max-w-[85vw] mx-auto pt-10 sm:pt-16">
        <div className="flex flex-col md:flex-row gap-6 w-full items-start">
          <div className="flex-1 flex flex-col gap-6 w-full">
            <ProjectCard project={projects[0]} />
            <ProjectCard project={projects[3]} />
          </div>
          <div className="flex-1 flex flex-col gap-6 w-full">
            <ProjectCard project={projects[1]} />
            <ProjectCard project={projects[4]} />
          </div>
          <div className="flex-1 flex flex-col gap-6 w-full">
            <ProjectCard project={projects[2]} />
            <ProjectCard project={projects[5]} />
          </div>
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
          {lang === 'es'
            ? '¿Tienes una pregunta, propuesta o proyecto, o quieres que trabajemos juntos en algo? No dudes en contactarme.'
            : 'Got a question, proposal or project or want to work together on something? Feel free to reach out.'}
        </p>
      </div>

      <div className="w-full border-y border-[#ddd] dark:border-[#333] py-4 sm:py-8 overflow-hidden relative flex items-center h-full">
        <a
          href="mailto:pwn27sbx@gmail.com"
          className="flex cursor-none w-full items-center h-full group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            /* SOLUCIÓN: text-[#00A889] por defecto (móvil). sm:text-[#ccc] para escritorio. */
            className="flex animate-marquee font-anton text-6xl sm:text-[8vw] uppercase transition-colors duration-300 items-center h-full text-[#00A889] sm:text-[#ccc] sm:dark:text-[#444] group-hover:text-[#00A889] hover-pause"
            style={{ width: "max-content" }}
          >
            <TextBlock /><TextBlock /><TextBlock /><TextBlock />
            <TextBlock /><TextBlock /><TextBlock /><TextBlock />
          </div>
        </a>
      </div>

      <div className="mt-16 mb-24 z-10 text-center">
        <a
          href="mailto:pwn27sbx@gmail.com"
          className="text-2xl sm:text-4xl text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 relative inline-block group cursor-none"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          pwn27sbx@gmail.com
          <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#00A889] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-8 text-xs text-gray-500 uppercase tracking-widest border-t border-[#ddd] dark:border-[#222]">
        <p>Arequipa, Peru</p>
        <div className="flex gap-4 my-4 sm:my-0">
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Github</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
        </div>
        <p>Design by Sebastian</p>
      </div>
    </footer>
  );
};

export default function Portfolio() {
  const [isHovering, setIsHovering] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const userLang = navigator.language || navigator.userLanguage;
      if (userLang.toLowerCase().includes('es')) {
        setLang('es');
      }
    }

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
    <>
      <style>{globalStyles}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />

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
                    <div className="-mt-32 sm:-mt-48 relative z-30">
                    <InteractiveBanner setIsHovering={setIsHovering} lang={lang} />
                    </div>
                    <ProjectsGallery setIsHovering={setIsHovering} />
                <Footer setIsHovering={setIsHovering} lang={lang} />
                </div>
            </div>
        </main>
      </div>
    </>
  );
}
