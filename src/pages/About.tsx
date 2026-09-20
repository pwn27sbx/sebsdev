import React, { Suspense } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const AboutCyberpunk = React.lazy(() => import('./AboutCyberpunk'));
const AboutMinimal = React.lazy(() => import('./AboutMinimal'));

const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-[9999]">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const About = () => {
  const { layoutMode } = usePortfolio();

  return (
    <Suspense fallback={<PageLoader />}>
      {layoutMode === 'minimal' ? <AboutMinimal /> : <AboutCyberpunk />}
    </Suspense>
  );
};

export default About;
