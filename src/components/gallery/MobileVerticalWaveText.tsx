import React from 'react';
interface MobileWaveProps { text: string; delay: string; }
const MobileVerticalWaveText = ({ text, delay }: MobileWaveProps) => {
  const animStyle = { animation: 'wave-fill 4s cubic-bezier(0.25, 1, 0.5, 1) infinite', animationDelay: delay, clipPath: 'inset(150% -50% -50% -50%)' };
  
  return (
    <span className="relative inline-flex whitespace-nowrap py-2 sm:py-4 leading-none">
      {/* Cyan outline layer (Always visible, glitching) */}
      <span className="absolute -top-[1.5vw] -left-[1vw] sm:-top-[1vw] sm:-left-[0.8vw] z-0 text-transparent [-webkit-text-stroke:6px_var(--color-secondary)] sm:[-webkit-text-stroke:8px_var(--color-secondary)]" style={{ animation: 'glitch-1 2.5s infinite step-end' }}>
        {text}
      </span>

      {/* Magenta outline layer (Always visible, glitching) */}
      <span className="absolute top-[1.5vw] left-[1vw] sm:top-[1vw] sm:left-[0.8vw] z-0 text-transparent [-webkit-text-stroke:6px_var(--color-primary)] sm:[-webkit-text-stroke:8px_var(--color-primary)]" style={{ animation: 'glitch-2 2s infinite step-end' }}>
        {text}
      </span>

      {/* Invisible spacer for width/height */}
      <span className="text-transparent opacity-0 block">{text}</span>
      
      {/* Solid text layer (Wipes in over the glitching outlines) */}
      <span className="absolute left-0 top-0 text-[#f5f5f5]/70 dark:text-[#0a0a0a]/70 [-webkit-text-stroke:3px_#000] dark:[-webkit-text-stroke:3px_#fff] block pointer-events-none z-20" style={animStyle}>
        {text}
      </span>
    </span>
  );
};
export default MobileVerticalWaveText;
