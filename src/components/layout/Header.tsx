import React, { Suspense } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const HeaderCyberpunk = React.lazy(() => import('./HeaderCyberpunk'));
const HeaderMinimal = React.lazy(() => import('./HeaderMinimal'));

const Header = () => {
  const { layoutMode } = usePortfolio();

  return (
    <Suspense fallback={<div className="h-16 w-full fixed top-0 z-50 bg-transparent" />}>
      {layoutMode === 'minimal' ? <HeaderMinimal /> : <HeaderCyberpunk />}
    </Suspense>
  );
};

export default Header;
