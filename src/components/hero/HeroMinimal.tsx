import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';
import VoxelCanvas from '../canvas/VoxelCanvas';

const HeroMinimal = () => {
  const { lang } = usePortfolio();

  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-visible transition-colors duration-500 z-10">
      {/* 3D Voxel Dog Canvas */}
      <div className="w-full max-w-[650px] h-[320px] sm:h-[420px] flex items-center justify-center relative">
        <VoxelCanvas />
      </div>

    </section>
  );
};

export default HeroMinimal;
