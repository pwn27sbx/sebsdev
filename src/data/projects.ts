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

interface MasterProject {
  id: string;
  title: string;
  year: string;
  link: string;
  img: string;
  archive?: {
    id: string;
    category: string;
    title: string;
    video?: string;
  };
  gallery?: {
    id: string;
    title: string;
    category: string;
    rot: number;
    xOffset: string;
    yOffset: string;
  };
}

const ALL_PROJECTS: MasterProject[] = [
  {
    id: 'nexus',
    title: 'Nexus',
    year: '2024',
    link: 'https://nexus-drab-one.vercel.app/',
    img: '/img/9.webp',
    archive: { id: '04', category: 'Frontend', title: 'NEXUS' },
    gallery: { id: '04', category: 'FRONTEND', title: 'Nexus App', rot: 20, xOffset: '-55vw', yOffset: '5vh' }
  },
  {
    id: 'nexus-brand',
    title: 'Nexus Brand',
    year: '2024',
    link: 'https://nexus-drab-one.vercel.app/',
    img: '/img/1.webp',
    gallery: { id: '01', category: 'FRONTEND', title: 'Nexus Brand', rot: -12, xOffset: '-45vw', yOffset: '-25vh' }
  },
  {
    id: 'fuxion',
    title: 'Fuxion Oportunidad',
    year: '2024',
    link: 'https://fuxionoportunidad.vercel.app/',
    img: '/img/7.webp',
    archive: { id: '08', category: 'Landing Page', title: 'FUXION OPORTUNIDAD' },
    gallery: { id: '14', category: 'UI/UX', title: 'UI Concepts', rot: 16, xOffset: '-35vw', yOffset: '40vh' }
  },
  {
    id: 'fuxion-dash',
    title: 'UI Dashboard',
    year: '2024',
    link: 'https://fuxionoportunidad.vercel.app/',
    img: '/img/12.webp',
    gallery: { id: '02', category: 'UI/UX', title: 'UI Dashboard', rot: 10, xOffset: '45vw', yOffset: '25vh' }
  },
  {
    id: 'fuxion-landing',
    title: 'Landing Page',
    year: '2024',
    link: 'https://fuxionoportunidad.vercel.app/',
    img: '/img/14.webp',
    gallery: { id: '06', category: 'LANDING', title: 'Landing Page', rot: -10, xOffset: '15vw', yOffset: '-15vh' }
  },
  {
    id: 'hirbell',
    title: 'Grupo Hirbell',
    year: '2024',
    link: 'https://grupohirbell.vercel.app/',
    img: '/img/8.webp',
    archive: { id: '10', category: 'Landing Page', title: 'GRUPO HIRBELL' }
  },
  {
    id: 'hirbell-corp',
    title: 'Corporate Site',
    year: '2024',
    link: 'https://grupohirbell.vercel.app/',
    img: '/img/3.webp',
    gallery: { id: '03', category: 'CORPORATE', title: 'Corporate Site', rot: -5, xOffset: '0vw', yOffset: '38vh' }
  },
  {
    id: 'hirbell-brand',
    title: 'Brand Identity',
    year: '2024',
    link: 'https://grupohirbell.vercel.app/',
    img: '/img/6.webp',
    gallery: { id: '15', category: 'CORPORATE', title: 'Brand Identity', rot: -5, xOffset: '45vw', yOffset: '42vh' }
  },
  {
    id: 'transportes',
    title: 'Transportes Premium',
    year: '2023',
    link: 'https://trasnportesjuan.vercel.app/',
    img: '/img/13.webp',
    archive: { id: '09', category: 'Landing Page', title: 'TRANSPORTES PREMIUM' },
    gallery: { id: '07', category: 'FULLSTACK', title: 'Transport App', rot: -15, xOffset: '50vw', yOffset: '0vh' }
  },
  {
    id: 'transportes-brand',
    title: 'Brand Platform',
    year: '2023',
    link: 'https://trasnportesjuan.vercel.app/',
    img: '/img/5.webp',
    gallery: { id: '05', category: 'CORPORATE', title: 'Brand Platform', rot: 12, xOffset: '-10vw', yOffset: '-35vh' }
  },
  {
    id: 'mini-excel',
    title: 'Mini-Excel',
    year: '2023',
    link: 'https://mini-excel-three.vercel.app/',
    img: '/img/MiniExcel.webp',
    archive: { id: '01', category: 'Productivity Tool / Web Application', title: 'MINI-EXCEL' },
    gallery: { id: '08', category: 'LANDING', title: 'Mini-Excel', rot: 7, xOffset: '-30vw', yOffset: '30vh' }
  },
  {
    id: 'logic-editor',
    title: 'Logic Editor',
    year: '2023',
    link: 'https://visual-logic-editor.vercel.app/',
    img: '/img/LogicEditor.webp',
    archive: { id: '02', category: 'SaaS Interface / Visual Programming', title: 'VISUAL LOGIC EDITOR' },
    gallery: { id: '11', category: 'FULLSTACK', title: 'Logic Editor', rot: 25, xOffset: '-60vw', yOffset: '-25vh' }
  },
  {
    id: 'filtered',
    title: 'Filter UI',
    year: '2023',
    link: 'https://faceted-filters-ui.vercel.app/',
    img: '/img/Filtered.webp',
    archive: { id: '03', category: 'E-commerce Search Engine', title: 'FACETED FILTERS UI' },
    gallery: { id: '12', category: 'FULLSTACK', title: 'Filter UI', rot: 15, xOffset: '40vw', yOffset: '-10vh' }
  },
  {
    id: 'tetris',
    title: 'Tetris Arcade',
    year: '2023',
    link: '/tetris/index.html',
    img: '/img/Tetris.webp',
    archive: { id: '05', category: 'JavaScript / HTML', title: 'TETRIS ARCADE' },
    gallery: { id: '10', category: 'LANDING', title: 'Tetris Arcade', rot: -8, xOffset: '-20vw', yOffset: '12vh' }
  },
  {
    id: 'paint',
    title: 'Paint',
    year: '2022',
    link: '/paint/index.html',
    img: '/img/Paint.webp',
    archive: { id: '06', category: 'JavaScript / HTML', title: 'PAINT' },
    gallery: { id: '09', category: 'UI/UX', title: 'Paint App', rot: -22, xOffset: '25vw', yOffset: '-35vh' }
  },
  {
    id: 'roi-servicios',
    title: 'Servicios Generales',
    year: '2024',
    link: 'https://roi-servicios.vercel.app/',
    img: '/img/4.webp',
    archive: { id: '07', category: 'Landing Page', title: 'SERVICIOS GENERALES' },
  },
  {
    id: 'roi-servicios-web',
    title: 'Web Experience',
    year: '2024',
    link: 'https://roi-servicios.vercel.app/',
    img: '/img/15.webp',
    gallery: { id: '13', category: 'FRONTEND', title: 'Web Experience', rot: -18, xOffset: '55vw', yOffset: '35vh' }
  }
];

export const GALLERY_PROJECTS: GalleryProject[] = ALL_PROJECTS
  .filter((p) => p.gallery)
  .map((p) => {
    const g = p.gallery!;
    return {
      id: g.id,
      category: g.category,
      img: import.meta.env.BASE_URL + p.img.replace(/^\//, ''),
      rot: g.rot,
      xOffset: g.xOffset,
      yOffset: g.yOffset,
      title: g.title,
      year: p.year,
      link: p.link.startsWith('/') ? import.meta.env.BASE_URL + p.link.replace(/^\//, '') : p.link,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

export const ARCHIVE_PROJECTS: ArchiveProject[] = ALL_PROJECTS
  .filter((p) => p.archive)
  .map((p) => {
    const a = p.archive!;
    return {
      id: a.id,
      year: p.year,
      title: a.title,
      category: a.category,
      img: import.meta.env.BASE_URL + p.img.replace(/^\//, ''),
      link: p.link.startsWith('/') ? import.meta.env.BASE_URL + p.link.replace(/^\//, '') : p.link,
      video: a.video ? import.meta.env.BASE_URL + a.video.replace(/^\//, '') : undefined,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));
