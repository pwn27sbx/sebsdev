const es = {
  // Hero
  heroAbout: 'Acerca de',
  heroDesc: 'Soy un desarrollador enfocado en crear experiencias digitales interactivas, fusionando diseño de alta calidad con tecnología moderna para marcas y proyectos creativos.',
  heroScroll: 'Hacer Scroll',
  // Header
  langSwitch: 'Cambiar a Español',
  darkModeLabel: 'Activar modo claro',
  lightModeLabel: 'Activar modo oscuro',
  // Expertise
  expertise1Title: 'DESARROLLO\nFRONTEND',
  expertise2Title: 'DISEÑO UI/UX',
  expertise3Title: 'MOTION &\nINTERACCIÓN',
  expertise1Marquee: 'REACT \u2014 NEXT.JS \u2014 ASTRO \u2014 TYPESCRIPT \u2014 TAILWIND CSS \u2014 JAVASCRIPT \u2014 ',
  expertise2Marquee: 'FIGMA \u2014 UI/UX \u2014 FRAMER \u2014 PROTOTYPING \u2014 DESIGN SYSTEMS \u2014 ACCESSIBILITY \u2014 ',
  expertise3Marquee: 'FRAMER MOTION \u2014 GSAP \u2014 WEBGL \u2014 THREE.JS \u2014 SVG ANIMATION \u2014 CREATIVE CODING \u2014 ',
  // InteractiveBanner
  bannerExperiences: 'EXPERIENCIAS',
  bannerDigital: 'DIGITALES',
  bannerInnovation: 'INNOVACIÓN',
  bannerCreativity: 'CREATIVIDAD',
  // Gallery
  selected: 'TRABAJOS',
  works: 'DESTACADOS',
  // ViewAll
  viewAll: 'VER TODOS LOS',
  projects: 'PROYECTOS',
  // Footer
  footerCta: '¿EMPEZAMOS ALGO? HABLEMOS',
  footerDesc: '¿Tienes una pregunta, propuesta o proyecto, o quieres que trabajemos juntos en algo? No dudes en contactarme.',
  // Archive
  back: 'Volver',
  archiveYear: 'AÑO',
  archiveProject: 'PROYECTO',
  archiveCategory: 'CATEGORÍA',
  archiveDesc: 'Una selección curada de trabajos, experimentos y colaboraciones. Desde interfaces de usuario precisas hasta experiencias web interactivas completas.',
  backToTop: 'Volver arriba',
  // 404
  notFoundTitle: 'PÁGINA NO ENCONTRADA',
  notFoundDesc: 'La página que buscas no existe o fue movida.',
  goHome: 'Volver al Inicio',
  // About
  aboutTitle: 'SOBRE MÍ',
  aboutDesc1: 'Soy un desarrollador frontend de Arequipa, Perú, apasionado por crear experiencias digitales que combinan diseño de alta calidad con tecnología moderna.',
  aboutDesc2: 'Me especializo en React, animaciones web con Framer Motion, y diseño UI/UX. Disfruto trabajar en proyectos creativos que desafían los límites de lo que es posible en la web.',
  aboutTechs: 'TECNOLOGÍAS',
  aboutContact: 'Contáctame',
  // Contact
  contactTitle: 'CONTACTO',
  contactName: 'Nombre',
  contactEmail: 'Email',
  contactMsg: 'Mensaje',
  contactSend: 'Enviar',
  contactSuccess: '¡Mensaje enviado con éxito!',
  contactError: 'Error al enviar el mensaje. Intenta de nuevo.',
  contactPlaceholder: 'Tu nombre',
  emailPlaceholder: 'tu@email.com',
  msgPlaceholder: 'Cuéntame sobre tu proyecto...',
};

const en = {
  // Hero
  heroAbout: 'About',
  heroDesc: 'I am a developer focused on creating interactive digital experiences, merging high-quality design with modern technology for creative brands and projects.',
  heroScroll: 'Scroll down',
  // Header
  langSwitch: 'Switch to English',
  darkModeLabel: 'Switch to light mode',
  lightModeLabel: 'Switch to dark mode',
  // Expertise
  expertise1Title: 'FRONTEND\nDEVELOPMENT',
  expertise2Title: 'UI/UX DESIGN',
  expertise3Title: 'MOTION &\nINTERACTION',
  expertise1Marquee: 'REACT \u2014 NEXT.JS \u2014 ASTRO \u2014 TYPESCRIPT \u2014 TAILWIND CSS \u2014 JAVASCRIPT \u2014 ',
  expertise2Marquee: 'FIGMA \u2014 UI/UX \u2014 FRAMER \u2014 PROTOTYPING \u2014 DESIGN SYSTEMS \u2014 ACCESSIBILITY \u2014 ',
  expertise3Marquee: 'FRAMER MOTION \u2014 GSAP \u2014 WEBGL \u2014 THREE.JS \u2014 SVG ANIMATION \u2014 CREATIVE CODING \u2014 ',
  // InteractiveBanner
  bannerExperiences: 'EXPERIENCES',
  bannerDigital: 'DIGITAL',
  bannerInnovation: 'INNOVATION',
  bannerCreativity: 'CREATIVITY',
  // Gallery
  selected: 'SELECTED',
  works: 'WORKS',
  // ViewAll
  viewAll: 'VIEW ALL',
  projects: 'PROJECTS',
  // Footer
  footerCta: "LET'S TALK",
  footerDesc: 'Got a question, proposal or project or want to work together on something? Feel free to reach out.',
  // Archive
  back: 'Back',
  archiveYear: 'YEAR',
  archiveProject: 'PROJECT',
  archiveCategory: 'CATEGORY',
  archiveDesc: 'A curated selection of works, experiments, and collaborations. From precise user interfaces to full interactive web experiences.',
  backToTop: 'Back to top',
  // 404
  notFoundTitle: 'PAGE NOT FOUND',
  notFoundDesc: 'The page you are looking for does not exist or has been moved.',
  goHome: 'Go Back Home',
  // About
  aboutTitle: 'ABOUT ME',
  aboutDesc1: 'I am a frontend developer from Arequipa, Peru, passionate about creating digital experiences that blend high-quality design with modern technology.',
  aboutDesc2: 'I specialize in React, web animations with Framer Motion, and UI/UX design. I enjoy working on creative projects that push the boundaries of what is possible on the web.',
  aboutTechs: 'TECHNOLOGIES',
  aboutContact: 'Contact Me',
  // Contact
  contactTitle: 'CONTACT',
  contactName: 'Name',
  contactEmail: 'Email',
  contactMsg: 'Message',
  contactSend: 'Send',
  contactSuccess: 'Message sent successfully!',
  contactError: 'Error sending message. Please try again.',
  contactPlaceholder: 'Your name',
  emailPlaceholder: 'your@email.com',
  msgPlaceholder: 'Tell me about your project...',
};

export type Lang = 'es' | 'en';
export type TranslationKey = keyof typeof es;

export const langs: Record<Lang, typeof es> = { es, en };

export function t(key: TranslationKey, lang: Lang): string {
  return langs[lang]?.[key] ?? langs.en[key] ?? key;
}
