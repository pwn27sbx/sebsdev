import { usePortfolio } from '../context/PortfolioContext';
import BentoCard from './BentoCard';

const projectsData = [
  {
    id: '01', title: 'Interactive Grid Engine', category: 'SAAS / ARCHITECTURE',
    tech: ['React', 'TypeScript', 'Algorithms'], img: '/img/MiniExcel.webp', hoverImg: '/img/MiniExcel2.webp',
    spanClass: 'md:col-span-1 md:row-span-2', slideDirection: 'top'
  },
  {
    id: '02', title: 'Transportes Premium', category: 'CORPORATE',
    tech: ['Astro', 'SVG Motion'], img: '/img/5.webp', hoverImg: '/img/13.webp',
    spanClass: 'md:col-span-1 md:row-span-1', slideDirection: 'left'
  },
  {
    id: '03', title: 'Hirbell Group', category: 'LANDING',
    tech: ['Framer', 'Design'], img: '/img/4.webp', hoverImg: '/img/12.webp',
    spanClass: 'md:col-span-1 md:row-span-1', slideDirection: 'bottom'
  },
  {
    id: '04', title: 'Tetris Arcade', category: 'GAMING / INTERACTIVE',
    tech: ['Framer', 'Logic'], img: '/img/Tetris2.webp', hoverImg: '/img/Tetris.webp',
    spanClass: 'md:col-span-1 md:row-span-2', slideDirection: 'right'
  },
  {
    id: '05', title: 'Visual Logic Editor', category: 'SAAS',
    tech: ['Next.js', 'DAG'], img: '/img/LogicEditor.webp', hoverImg: '/img/LogicEditor2.webp',
    spanClass: 'md:col-span-2 md:row-span-2', slideDirection: 'top'
  },
  {
    id: '06', title: 'Faceted Search UI', category: 'E-COMMERCE',
    tech: ['Data Structures'], img: '/img/Filtered.webp', hoverImg: '/img/Filtered2.webp',
    spanClass: 'md:col-span-1 md:row-span-2', slideDirection: 'left'
  },
  {
    id: '07', title: 'Nexus Directory', category: 'DIRECTORY / TOOLKIT',
    tech: ['React', 'Data'], img: '/img/9.webp', hoverImg: '/img/10.webp',
    spanClass: 'md:col-span-1 md:row-span-1', slideDirection: 'right'
  },
  {
    id: '08', title: 'Car Wash Setup', category: 'LANDING',
    tech: ['Tailwind', 'UI'], img: '/img/7.webp', hoverImg: '/img/14.webp',
    spanClass: 'md:col-span-1 md:row-span-1', slideDirection: 'left'
  },
  {
    id: '09', title: 'Paint Studio', category: 'CREATIVE / WEB APP',
    tech: ['Canvas', 'UI'], img: '/img/Paint2.webp', hoverImg: '/img/Paint.webp',
    spanClass: 'md:col-span-2 md:row-span-1', slideDirection: 'bottom'
  }
];

export default function ProjectsGallery() {
  const { lang, setIsHovering } = usePortfolio();

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center py-10 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none w-full">
        <div className="absolute inset-0 dots-bg opacity-[0.05]"></div>

        <div className="w-[150vw] flex flex-col gap-16 transform -rotate-3 scale-110">
          <div className="flex font-anton text-[12vw] uppercase tracking-tighter whitespace-nowrap text-sweep-lr">
            {lang === 'es' ? 'DESTACADOS — DESTACADOS — DESTACADOS — DESTACADOS —' : 'SELECTED WORKS — SELECTED WORKS — SELECTED WORKS —'}
          </div>
          <div className="flex font-anton text-[12vw] uppercase tracking-tighter whitespace-nowrap text-sweep-rl">
            {lang === 'es' ? 'TRABAJOS — TRABAJOS — TRABAJOS — TRABAJOS —' : 'SELECTED WORKS — SELECTED WORKS — SELECTED WORKS —'}
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 max-w-[1400px] mx-auto relative z-20 flex-1 flex flex-col justify-center items-center min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[350px] md:grid-rows-4 gap-2 md:gap-3 w-full h-auto md:h-full md:max-h-[85vh]">
          {projectsData.map(project => (
            <BentoCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

