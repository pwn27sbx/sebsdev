import React from 'react';
interface MobileWaveProps { text: string; delay: string; }
const MobileVerticalWaveText = ({ text, delay }: MobileWaveProps) => (
  <span className="relative inline-flex whitespace-nowrap py-2 sm:py-4 leading-none">
    <span className="text-[#e5e5e5] dark:text-[#2a2a2a] block">{text}</span>
    <span className="absolute text-[#00A889] block pointer-events-none -top-[1.5vw] -left-[1vw] sm:-top-[1vw] sm:-left-[0.8vw]"
      style={{ animation: 'wave-fill 4s cubic-bezier(0.25, 1, 0.5, 1) infinite', animationDelay: delay, clipPath: 'inset(150% -50% -50% -50%)' }}>
      {text}
    </span>
  </span>
);
export default MobileVerticalWaveText;
