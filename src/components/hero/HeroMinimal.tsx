import VoxelCanvas from '../canvas/VoxelCanvas';

const HeroMinimal = () => {
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
