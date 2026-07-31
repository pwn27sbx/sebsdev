import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import { t } from "../../data/i18n";
import HoverText from "./HoverText";
import GlitchText from "../common/GlitchText";
import ScrambledText from "../common/ScrambledText";
import InteractiveShape from "./InteractiveShape";
import DecryptedText from "../common/DecryptedText";

const Hero = () => {
  const { setIsHovering, lang } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["8vw", "150vw"]);
  const textParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const descParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const hEnter = () => setIsHovering(true);
  const hLeave = () => setIsHovering(false);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] flex flex-col justify-center px-4 overflow-hidden bg-transparent transition-colors duration-500"
    >
      <motion.div
        initial={{ scale: 0.1, opacity: 0, filter: "blur(20px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }} // Syncs with the ~110 frames of 3D camera lerp
        className="relative h-full w-full max-w-[100vw] mx-auto z-10"
      >
        {/* Parallax gradient accent */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 0.2], ["0%", "15%"]) }}
          className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#00A889]/5 via-transparent to-transparent blur-[100px] dark:from-[#00A889]/8 pointer-events-none"
          aria-hidden="true"
        />

        {/* Huge Interactive Mask Top Right */}
        <div className="absolute top-[14%] left-[50%] -translate-x-1/2 sm:top-[3%] sm:left-auto sm:-translate-x-0 sm:right-[0%] z-20 pointer-events-auto opacity-100 dark:opacity-100 transform scale-110 sm:scale-100">
          <InteractiveShape />
        </div>

        {/* Texts Container Bottom Left */}
        <div className="absolute bottom-[20%] sm:bottom-[15%] left-[4%] sm:left-[6%] w-full flex flex-col justify-end items-start pointer-events-none">

        <motion.div style={{ y: textParallax }} className="relative z-30 sm:z-10 pl-12 sm:pl-0">
          <div className="flex items-center justify-start flex-nowrap">
            {" "}
            <div
              className="font-anton text-[16vw] sm:text-[11vw] leading-[0.8] uppercase tracking-tighter shrink-0 text-transparent [-webkit-text-stroke:1px_#000] sm:[-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:1px_#a3a3a3] dark:sm:[-webkit-text-stroke:2px_#a3a3a3] gpu"
              onMouseEnter={hEnter}
              onMouseLeave={hLeave}
            >
              <GlitchText speed={0.9} enableShadows enableOnHover={false}>
                FRONT
              </GlitchText>
            </div>
            <motion.div
              style={
                {
                  width: lineWidth,
                  "--after-duration": "2.7s",
                  "--before-duration": "1.8s",
                } as any
              }
              className="glitch-box-anim h-[2vw] sm:h-[1.5vw] bg-transparent border-[2px] border-[#111] dark:border-[#a3a3a3] mx-2 sm:mx-4 transition-colors duration-300 hover:border-[#00A889] shrink-0 gpu"
            />
            <div
              className="font-anton text-[16vw] sm:text-[11vw] leading-[0.8] uppercase tracking-tighter shrink-0 text-transparent [-webkit-text-stroke:1px_#000] sm:[-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:1px_#a3a3a3] dark:sm:[-webkit-text-stroke:2px_#a3a3a3] gpu"
              onMouseEnter={hEnter}
              onMouseLeave={hLeave}
            >
              <GlitchText
                speed={0.9}
                enableShadows
                enableOnHover={false}
                variant={2}
              >
                END
              </GlitchText>
            </div>
          </div>
        </motion.div>
        <motion.div style={{ y: descParallax }} className="relative z-30 sm:z-10 mt-4 sm:mt-[1vw] pl-12 sm:pl-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-8 ml-0 sm:-ml-[4vw]">
            <motion.div
              initial={{ opacity: 0, y: 150, filter: 'blur(20px)', scale: 0.9 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1], delay: 0.5 }}
              className="font-anton text-[14vw] sm:text-[10vw] leading-[0.8] uppercase tracking-tighter shrink-0 text-transparent [-webkit-text-stroke:1px_#000] sm:[-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:1px_#a3a3a3] dark:sm:[-webkit-text-stroke:2px_#a3a3a3]"
              onMouseEnter={hEnter}
              onMouseLeave={hLeave}
            >
              <GlitchText
                speed={0.9}
                enableShadows
                enableOnHover={false}
                variant={3}
              >
                DEVELOPER
              </GlitchText>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="w-[70vw] sm:w-[350px] shrink-0 bg-white/5 dark:bg-black/20 backdrop-blur-md border border-[#111]/10 dark:border-white/10 p-4 sm:p-5 relative group block pointer-events-auto mt-2 sm:mt-0"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00A889] -translate-x-[1px] -translate-y-[1px]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF2A6D] translate-x-[1px] translate-y-[1px]" />
              
              <div className="font-mono text-[9px] sm:text-xs mb-2 text-[#00A889] uppercase font-bold tracking-wider">
                [01_ ABOUT]
              </div>
              <div className="font-mono text-[10px] sm:text-sm whitespace-nowrap cursor-default text-gray-600 dark:text-gray-400">
                <ScrambledText
                  radius={80}
                  duration={0.8}
                  speed={0.5}
                  scrambleChars="d/_-.:+ "
                  className="inline-block"
                  text={t("heroDesc", lang)}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mix-blend-difference"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>{t("heroScroll", lang)}</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
};
export default Hero;
