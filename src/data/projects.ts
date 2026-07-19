export interface GalleryProject {
  id: string;
  category: string;
  img: string;
  rot: number;
  xOffset: string;
  yOffset: string;
  title: string;
  year: string;
  link: string;
}

export interface ArchiveProject {
  id: string;
  year: string;
  title: string;
  category: string;
  img: string;
  link: string;
  video?: string;
}

export const GALLERY_PROJECTS: GalleryProject[] = [
  { id: '01', category: 'FRONTEND', img: '/img/1.webp', rot: -12, xOffset: '-45vw', yOffset: '-25vh', title: 'Nexus Brand', year: '2024', link: 'https://nexus-drab-one.vercel.app/' },
  { id: '02', category: 'UI/UX', img: '/img/12.webp', rot: 10, xOffset: '45vw', yOffset: '25vh', title: 'UI Dashboard', year: '2024', link: 'https://fuxionoportunidad.vercel.app/' },
  { id: '03', category: 'CORPORATE', img: '/img/3.webp', rot: -5, xOffset: '0vw', yOffset: '38vh', title: 'Corporate Site', year: '2024', link: 'https://grupohirbell.vercel.app/' },
  { id: '04', category: 'FRONTEND', img: '/img/9.webp', rot: 20, xOffset: '-55vw', yOffset: '5vh', title: 'Nexus App', year: '2024', link: 'https://nexus-drab-one.vercel.app/' },
  { id: '05', category: 'CORPORATE', img: '/img/5.webp', rot: 12, xOffset: '-10vw', yOffset: '-35vh', title: 'Brand Platform', year: '2023', link: 'https://trasnportesjuan.vercel.app/' },
  { id: '06', category: 'LANDING', img: '/img/14.webp', rot: -10, xOffset: '15vw', yOffset: '-15vh', title: 'Landing Page', year: '2024', link: 'https://fuxionoportunidad.vercel.app/' },
  { id: '07', category: 'FULLSTACK', img: '/img/13.webp', rot: -15, xOffset: '50vw', yOffset: '0vh', title: 'Transport App', year: '2023', link: 'https://trasnportesjuan.vercel.app/' },
  { id: '08', category: 'LANDING', img: '/img/MiniExcel.webp', rot: 7, xOffset: '-30vw', yOffset: '30vh', title: 'Mini-Excel', year: '2023', link: 'https://mini-excel-three.vercel.app/' },
  { id: '09', category: 'UI/UX', img: '/img/Paint.webp', rot: -22, xOffset: '25vw', yOffset: '-35vh', title: 'Paint App', year: '2022', link: '/paint/index.html' },
  { id: '10', category: 'LANDING', img: '/img/Tetris.webp', rot: -8, xOffset: '-20vw', yOffset: '12vh', title: 'Tetris Arcade', year: '2023', link: '/tetris/index.html' },
  { id: '11', category: 'FULLSTACK', img: '/img/LogicEditor.webp', rot: 25, xOffset: '-60vw', yOffset: '-25vh', title: 'Logic Editor', year: '2023', link: 'https://visual-logic-editor.vercel.app/' },
  { id: '12', category: 'FULLSTACK', img: '/img/Filtered.webp', rot: 15, xOffset: '40vw', yOffset: '-10vh', title: 'Filter UI', year: '2023', link: 'https://faceted-filters-ui.vercel.app/' },
  { id: '13', category: 'FRONTEND', img: '/img/15.webp', rot: -18, xOffset: '55vw', yOffset: '35vh', title: 'Web Experience', year: '2024', link: 'https://roi-servicios.vercel.app/' },
  { id: '14', category: 'UI/UX', img: '/img/7.webp', rot: 16, xOffset: '-35vw', yOffset: '40vh', title: 'UI Concepts', year: '2024', link: 'https://fuxionoportunidad.vercel.app/' },
  { id: '15', category: 'CORPORATE', img: '/img/6.webp', rot: -5, xOffset: '45vw', yOffset: '42vh', title: 'Brand Identity', year: '2024', link: 'https://grupohirbell.vercel.app/' },
];

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  { id: '01', year: '2023', title: 'MINI-EXCEL', category: 'Productivity Tool / Web Application', img: '/img/MiniExcel.webp', link: 'https://mini-excel-three.vercel.app/' },
  { id: '02', year: '2023', title: 'VISUAL LOGIC EDITOR', category: 'SaaS Interface / Visual Programming', img: '/img/LogicEditor.webp', link: 'https://visual-logic-editor.vercel.app/' },
  { id: '03', year: '2023', title: 'FACETED FILTERS UI', category: 'E-commerce Search Engine', img: '/img/Filtered.webp', link: 'https://faceted-filters-ui.vercel.app/' },
  { id: '04', year: '2024', title: 'NEXUS', category: 'Frontend', img: '/img/9.webp', link: 'https://nexus-drab-one.vercel.app/' },
  { id: '05', year: '2023', title: 'TETRIS ARCADE', category: 'JavaScript / HTML', img: '/img/Tetris.webp', link: '/tetris/index.html' },
  { id: '06', year: '2022', title: 'PAINT', category: 'JavaScript / HTML', img: '/img/Paint.webp', link: '/paint/index.html' },
  { id: '07', year: '2024', title: 'SERVICIOS GENERALES', category: 'Landing Page', img: '/img/4.webp', link: 'https://roi-servicios.vercel.app/' },
  { id: '08', year: '2024', title: 'FUXION OPORTUNIDAD', category: 'Landing Page', img: '/img/7.webp', link: 'https://fuxionoportunidad.vercel.app/' },
  { id: '09', year: '2023', title: 'TRANSPORTES PREMIUM', category: 'Landing Page', img: '/img/13.webp', link: 'https://trasnportesjuan.vercel.app/' },
  { id: '10', year: '2024', title: 'GRUPO HIRBELL', category: 'Landing Page', img: '/img/8.webp', link: 'https://grupohirbell.vercel.app/' },
];
