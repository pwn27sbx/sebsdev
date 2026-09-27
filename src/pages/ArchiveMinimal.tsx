import { Helmet } from 'react-helmet-async';
import { SITE_ORIGIN } from '../config/site';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import ProjectsMinimal from '../components/gallery/ProjectsMinimal';
import FooterMinimal from '../components/layout/FooterMinimal';

const ArchiveMinimal = () => {
  const { lang } = usePortfolio();

  return (
    <div className="bg-[#fafafa] dark:bg-[#111111] text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-500 pt-24 pb-10">
      <Helmet>
        <title>Archivo de Proyectos | Sebastian</title>
        <meta name="description" content="Explora mi archivo de proyectos interactivos desde 2021 a 2026. Especializado en React y UI/UX." />
        <link rel="canonical" href={`${SITE_ORIGIN}/proyectos`} />
      </Helmet>

      <main className="w-full max-w-2xl mx-auto px-6 relative">
        <h1 className="text-3xl font-bold mb-10 tracking-tight">{t('projects', lang)}</h1>
        <ProjectsMinimal />
        
        <div className="mt-20">
          <FooterMinimal />
        </div>
      </main>
    </div>
  );
};

export default ArchiveMinimal;
