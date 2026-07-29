import React from 'react';
interface MobileWaveProps { text: string; delay: string; }
const MobileVerticalWaveText = ({ text, delay }: MobileWaveProps) => {
  const animStyle = { animation: 'wave-fill 4s cubic-bezier(0.25, 1, 0.5, 1) infinite', animationDelay: delay, clipPath: 'inset(150% -50% -50% -50%)' };
  
  return (
    <span className="relative inline-flex whitespace-nowrap py-2 sm:py-4 leading-none">
      {/* Cyan outline layer (Always visible, glitching) */}
      <span className="absolute -top-[1.5vw] -left-[1vw] sm:-top-[1vw] sm:-left-[0.8vw] z-0 text-transparent [-webkit-text-stroke:6px_#00A889] sm:[-webkit-text-stroke:8px_#00A889]" style={{ animation: 'glitch-1 2.5s infinite step-end' }}>
        {text}
      </span>

      {/* Magenta outline layer (Always visible, glitching) */}
      <span className="absolute top-[1.5vw] left-[1vw] sm:top-[1vw] sm:left-[0.8vw] z-0 text-transparent [-webkit-text-stroke:6px_#FF2A6D] sm:[-webkit-text-stroke:8px_#FF2A6D]" style={{ animation: 'glitch-2 2s infinite step-end' }}>
        {text}
      </span>

      {/* Invisible spacer for width/height */}
      <span className="text-transparent opacity-0 block">{text}</span>
      
      {/* Solid text layer (Wipes in over the glitching outlines) */}
      <span className="absolute left-0 top-0 text-[#111] dark:text-white block pointer-events-none z-20" style={animStyle}>
        {text}
      </span>
    </span>
  );
};
export default MobileVerticalWaveText;
