import React, { useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const Scene = () => {
  const { darkMode } = usePortfolio();

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-500 ${darkMode ? 'bg-[#050505]' : 'bg-[#f0f0f0]'}`}>
      {/* Engineering Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${darkMode ? '#fff' : '#000'} 1px, transparent 1px),
            linear-gradient(to bottom, ${darkMode ? '#fff' : '#000'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* CRT Scanlines */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      
      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]"></div>
    </div>
  );
};

export default Scene;
