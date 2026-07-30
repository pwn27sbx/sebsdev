import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import { t } from "../../data/i18n";
import DecryptedText from "../common/DecryptedText";
import GlitchText from "../common/GlitchText";

const GiantWord = ({ text }: { text: string }) => {
  return (
    <div className="mx-4 md:mx-6 relative group/word cursor-crosshair flex items-center">
      {/* Hollow default with 40% block */}
      <span className="text-[#f5f5f5]/40 dark:text-[#0a0a0a]/40 [-webkit-text-stroke:1.5px_#000] dark:[-webkit-text-stroke:1.5px_#fff] opacity-[0.85] group-hover/word:opacity-0 transition-all duration-300">
        {text}
      </span>
      
      {/* Scramble solid hover (Glitch Effect) */}
      <span className="absolute left-0 top-0 opacity-0 group-hover/word:opacity-100 transition-opacity duration-200 pointer-events-auto">
        <DecryptedText 
          text={text} 
          animateOn="hover" 
          speed={40} 
          maxIterations={12}
          className="text-[#000] dark:text-white [text-shadow:3px_0_#00A889,-3px_0_#FF2A6D]"
          encryptedClassName="text-[#00A889] [text-shadow:0_0_8px_#00A889]"
        />
      </span>
    </div>
  );
};

const HollowDashedLine = ({ className = "", style }: { className?: string, style?: any }) => {
  // Revert back to pure dashes as requested
  const dashString = Array(150).fill("—").join(" ");

  return (
    <div className={`w-full h-[30px] md:h-[40px] overflow-hidden flex items-center pointer-events-none z-20 ${className}`}>
      <motion.div style={style} className="whitespace-pre font-anton text-transparent [-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:2px_#fff] text-[55px] md:text-[75px] w-max flex items-center mt-[-12px] md:mt-[-18px]">
        <GlitchText speed={0.9} enableShadows enableOnHover={false} variant={1}>
          {dashString}
        </GlitchText>
      </motion.div>
    </div>
  );
};

const InteractiveBanner = () => {
  const { lang, setIsHovering } = usePortfolio();
  
  // Use global scroll since this is now inside a sticky horizontal container
  const { scrollYProgress } = useScroll();
  
  // Row 1 moves left, Row 2 moves right - increased range for more sensitivity
  const xMoveLeft = useTransform(scrollYProgress, [0, 1], [0, -1800]);
  const xMoveRight = useTransform(scrollYProgress, [0, 1], [-1800, 0]);

  const row1Words = [
    t("bannerExperiences", lang),
    t("bannerDigital", lang),
    t("bannerInnovation", lang)
  ];

  const row2Words = [
    t("bannerCreativity", lang),
    "DEVELOPMENT",
    "DESIGN"
  ];

  return (
    <div 
      className="w-full py-8 md:py-10 bg-transparent flex flex-col justify-center overflow-hidden relative z-30 group/banner transition-colors duration-500"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <HollowDashedLine className="absolute top-0 left-0" style={{ x: xMoveRight }} />
      <HollowDashedLine className="absolute bottom-0 left-0" style={{ x: xMoveLeft }} />
      
      {/* Row 1: Scrolling Left */}
      <motion.div
        style={{ x: xMoveLeft }}
        className="flex whitespace-nowrap items-center gpu relative z-10 mb-[-10px] md:mb-[-20px]"
      >
        <div className="flex font-anton text-[45px] sm:text-[60px] md:text-[85px] uppercase tracking-wider relative">
          {[...Array(6)].map((_, i) => (
            <div key={`r1-${i}`} className="flex items-center">
              {row1Words.map((word, wIdx) => (
                <React.Fragment key={wIdx}>
                  <GiantWord text={word} />
                  <span className="font-anton text-transparent [-webkit-text-stroke:1.5px_#000] dark:[-webkit-text-stroke:1.5px_#fff] text-[30px] md:text-[45px] mx-2">
                    <GlitchText speed={0.9} enableShadows enableOnHover={false} variant={1}>+</GlitchText>
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Row 2: Scrolling Right */}
      <motion.div
        style={{ x: xMoveRight }}
        className="flex whitespace-nowrap items-center gpu relative z-10"
      >
        <div className="flex font-anton text-[45px] sm:text-[60px] md:text-[85px] uppercase tracking-wider relative">
          {[...Array(6)].map((_, i) => (
            <div key={`r2-${i}`} className="flex items-center">
              {row2Words.map((word, wIdx) => (
                <React.Fragment key={wIdx}>
                  <GiantWord text={word} />
                  <span className="font-anton text-transparent [-webkit-text-stroke:1.5px_#000] dark:[-webkit-text-stroke:1.5px_#fff] text-[30px] md:text-[45px] mx-2">
                    <GlitchText speed={0.9} enableShadows enableOnHover={false} variant={2}>+</GlitchText>
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
export default InteractiveBanner;
