import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const SideMarquee = () => {
  const { lang } = usePortfolio();

  const TextBlock = () => (
    <div className="flex flex-col w-full items-center gap-16 py-8">
      {/* SEB - Left aligned, big */}
      <div className="[writing-mode:vertical-rl] rotate-180 font-anton text-3xl sm:text-4xl tracking-widest text-black/80 dark:text-white/90 -translate-x-2 sm:-translate-x-3">
        SEB
      </div>

      {/* Geometric Icon - Centered */}
      <div className="w-5 h-5 border-2 border-[#00A889] rotate-45 opacity-80 flex items-center justify-center">
        <div className="w-1 h-1 bg-[#FF2A6D] rounded-full"></div>
      </div>
      
      {/* 2026 - Right aligned, small mono */}
      <div className="[writing-mode:vertical-rl] rotate-180 text-[#FF2A6D] font-mono text-[10px] tracking-[0.4em] font-bold translate-x-2 sm:translate-x-3">
        2026
      </div>

      {/* Barcode-like visual */}
      <div className="flex gap-[2px] w-4 opacity-50">
         <div className="w-[1px] h-8 bg-black dark:bg-white"></div>
         <div className="w-[2px] h-8 bg-black dark:bg-white"></div>
         <div className="w-[1px] h-8 bg-black dark:bg-white"></div>
         <div className="w-[3px] h-8 bg-black dark:bg-white"></div>
         <div className="w-[1px] h-8 bg-black dark:bg-white"></div>
      </div>

      {/* DEV - Center, outline font, big */}
      <div className="[writing-mode:vertical-rl] rotate-180 font-anton text-4xl sm:text-5xl tracking-widest text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.8)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.6)] opacity-70">
        DEV
      </div>
      
      {/* Crosshair Icon */}
      <div className="relative w-5 h-5 opacity-60">
         <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-black dark:border-white"></div>
         <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-black dark:border-white"></div>
         <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#00A889]"></div>
         <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#00A889]"></div>
      </div>

      {/* Japanese Text - Left aligned */}
      <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-xs tracking-widest text-black/60 dark:text-white/60 -translate-x-1 sm:-translate-x-2">
        七転び八起き
      </div>

      {/* Vertical Dashed Line */}
      <div className="h-16 w-[1px] border-l border-dashed border-[#FF2A6D] opacity-60"></div>
      
      {/* Plus Icon - Right aligned */}
      <div className="text-[#00A889] text-xl font-bold opacity-80 translate-x-2 sm:translate-x-3">+</div>
      
      {/* SYS-01 - Center small */}
      <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[9px] font-black tracking-widest border border-black dark:border-white p-1.5 opacity-50">
        SYS.01
      </div>
    </div>
  );

  return (
    <div className="fixed left-0 top-0 h-[100dvh] w-12 sm:w-16 bg-transparent z-[100] flex flex-col items-center overflow-hidden pointer-events-none">
      {/* Animated Marquee Container */}
      {/* We need enough blocks to fill the screen twice so the 50% transform works perfectly */}
      <div 
        className="flex flex-col w-full hover:[animation-play-state:paused] pointer-events-auto"
        style={{
          animation: 'marquee-vertical 40s linear infinite',
        }}
      >
        <TextBlock />
        <TextBlock />
        <TextBlock />
        <TextBlock />
        <TextBlock />
        <TextBlock />
      </div>
    </div>
  );
};

export default SideMarquee;
