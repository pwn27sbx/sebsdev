import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { t } from '../../data/i18n';
import type { GalleryProject } from '../../data/projects';
import { GALLERY_PROJECTS } from '../../data/projects';
import DraggablePolaroid from './DraggablePolaroid';
import DesktopScrollText from './DesktopScrollText';
import MobileVerticalWaveText from './MobileVerticalWaveText';
import ProjectModal from './ProjectModal';

const ProjectsGallery = () => {
  const { lang } = usePortfolio();
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const globalZIndexCounter = useRef(100);
  const handleBringToFront = () => { globalZIndexCounter.current += 1; return globalZIndexCounter.current; };

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const xSelectedDesktop = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.75], ['100vw', '0vw', '0vw', '-100vw']);
  const xWorksDesktop = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.75], ['-100vw', '0vw', '0vw', '100vw']);
  const xSelectedMobile = useTransform(scrollYProgress, [0, 0.25], ['100vw', '0vw']);
  const xWorksMobile = useTransform(scrollYProgress, [0, 0.25], ['-100vw', '0vw']);
  const ySelectedMobile = useTransform(scrollYProgress, [0.55, 0.85], ['0vh', '-32vh']);
  const yWorksMobile = useTransform(scrollYProgress, [0.55, 0.85], ['0vh', '-36vh']);
  const yDesktop = useTransform(scrollYProgress, [0, 1], ['0vh', '0vh']);

  const xSelected = isMobile ? xSelectedMobile : xSelectedDesktop;
  const xWorks = isMobile ? xWorksMobile : xWorksDesktop;
  const ySelectedFinal = isMobile ? ySelectedMobile : yDesktop;
  const yWorksFinal = isMobile ? yWorksMobile : yDesktop;

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors duration-500 z-20 pt-8 -mt-[2vh] sm:-mt-[5vh] transform-gpu">
      <div className="h-[300vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center z-0 overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 transform-gpu">
            <motion.div style={{ x: xSelected, y: ySelectedFinal }} className="w-full flex justify-center">
              <h2 className="font-anton text-[22vw] md:text-[22vw] lg:text-[21vw] xl:text-[23vw] uppercase tracking-tighter pointer-events-auto whitespace-nowrap">
                {isMobile ? <MobileVerticalWaveText text={t('selected', lang)} delay="0s" /> : <DesktopScrollText text={t('selected', lang)} scrollYProgress={scrollYProgress} globalOffset={0} />}
              </h2>
            </motion.div>
            <motion.div style={{ x: xWorks, y: yWorksFinal }} className="w-full flex justify-center -mt-[5vw] lg:-mt-[2vw]">
              <h2 className="font-anton text-[22vw] md:text-[22vw] lg:text-[21vw] xl:text-[23vw] uppercase tracking-tighter pointer-events-auto whitespace-nowrap">
                {isMobile ? <MobileVerticalWaveText text={t('works', lang)} delay="2s" /> : <DesktopScrollText text={t('works', lang)} scrollYProgress={scrollYProgress} globalOffset={8} />}
              </h2>
            </motion.div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {GALLERY_PROJECTS.map((project, index) => (
              <DraggablePolaroid key={project.id + '-' + index} project={project} index={index} scrollYProgress={scrollYProgress} bringToFront={handleBringToFront} onProjectClick={setSelectedProject} />
            ))}
          </div>
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
export default ProjectsGallery;
