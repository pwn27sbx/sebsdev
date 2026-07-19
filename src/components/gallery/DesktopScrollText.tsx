import React from 'react';
import { MotionValue } from 'framer-motion';
import CharSpan from './CharSpan';

interface DesktopScrollTextProps {
  text: string;
  scrollYProgress: MotionValue<number>;
  globalOffset: number;
}

const DesktopScrollText = ({ text, scrollYProgress, globalOffset }: DesktopScrollTextProps) => {
  const chars = text.split('');
  const shuffleArray = [10, 2, 8, 4, 12, 1, 6, 9, 3, 11, 0, 7, 5];

  return (
    <span className="flex relative leading-none py-2 sm:py-4">
      {chars.map((char, i) => {
        const globalIdx = i + globalOffset;
        const turn = shuffleArray.indexOf(globalIdx) !== -1 ? shuffleArray.indexOf(globalIdx) : i;
        return <CharSpan key={i} char={char} scrollYProgress={scrollYProgress} turn={turn} step={0.015} />;
      })}
    </span>
  );
};
export default DesktopScrollText;
