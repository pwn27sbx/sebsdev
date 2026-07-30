import React from 'react';

const CyberGridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f0f0f0] dark:bg-[#030303] transition-colors duration-500">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00A889]/10 via-transparent to-transparent dark:from-[#00A889]/20"></div>
      
      {/* The moving floor grid */}
      <div className="absolute top-1/2 left-0 right-0 bottom-0 overflow-hidden perspective-1000">
        <div className="cyber-grid absolute w-[200%] h-[200%] left-[-50%] bottom-0"></div>
      </div>
      
      {/* The moving ceiling grid (optional, but gives a tunnel vibe) */}
      <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden perspective-1000">
        <div className="cyber-grid-ceiling absolute w-[200%] h-[200%] left-[-50%] top-0"></div>
      </div>
    </div>
  );
};

export default CyberGridBackground;
