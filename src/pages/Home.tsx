import React, { Suspense } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const HomeCyberpunk = React.lazy(() => import('./HomeCyberpunk'));
const HomeMinimal = React.lazy(() => import('./HomeMinimal'));

const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-[9999]">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  const { layoutMode } = usePortfolio();

  return (
    <Suspense fallback={<PageLoader />}>
      {layoutMode === 'minimal' ? <HomeMinimal /> : <HomeCyberpunk />}
    </Suspense>
  );
};

export default Home;
