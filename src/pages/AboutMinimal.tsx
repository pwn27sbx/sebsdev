import { Helmet } from 'react-helmet-async';
import { SITE_ORIGIN } from '../config/site';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import { techs } from '../data/profile';
import FooterMinimal from '../components/layout/FooterMinimal';

const AboutMinimal = () => {
  const { lang } = usePortfolio();

  return (
    <div className="bg-[#fafafa] dark:bg-[#111111] text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-500 pt-24 pb-10">
      <Helmet>
        <title>{t('aboutSeoTitle', lang)}</title>
        <meta name="description" content={t('aboutSeoDesc', lang)} />
        <link rel="canonical" href={`${SITE_ORIGIN}/about`} />
      </Helmet>

      <main className="w-full max-w-2xl mx-auto px-6 relative">
        <h1 className="text-3xl font-bold mb-8 tracking-tight">{t('aboutTitle', lang)}</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p className="mb-4">{t('aboutDesc1', lang)}</p>
          <p className="mb-4">{t('aboutDesc2', lang)}</p>
          <h2 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{t('aboutTechs', lang)}</h2>
          <ul className="list-disc pl-5 space-y-2">
            {techs.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-10">
          <FooterMinimal />
        </div>
      </main>
    </div>
  );
};

export default AboutMinimal;
