import React from 'react';
interface HoverTextProps { text: string; }
const HoverText = ({ text }: HoverTextProps) => (
  <>{text.split('').map((char, i) => (
    <span key={i} className="inline-block transition-colors duration-150 hover:text-secondary cursor-default font-anton">{char}</span>
  ))}</>
);
export default HoverText;
