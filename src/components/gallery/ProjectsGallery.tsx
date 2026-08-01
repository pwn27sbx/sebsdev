import React, { useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { t } from '../../data/i18n';
import type { GalleryProject } from '../../data/projects';
import { GALLERY_PROJECTS } from '../../data/projects';
import DraggablePolaroid from './DraggablePolaroid';
import DesktopScrollText from './DesktopScrollText';
import MobileVerticalWaveText from './MobileVerticalWaveText';
import ProjectModal from './ProjectModal';
import { useGalleryAnimations } from '../../hooks/useGalleryAnimations';

interface ProjectsGalleryProps {
  children?: React.ReactNode;
}

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ children }) => {
  const { lang } = usePortfolio();
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const globalZIndexCounter = useRef(100);
  const handleBringToFront = () => { globalZIndexCounter.current += 1; return globalZIndexCounter.current; };

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  
  const {
    cardsProgress,
    slideX,
    xSelected,
    xWorks,
    ySelectedFinal,
    yWorksFinal,
  } = useGalleryAnimations(scrollYProgress, isMobile);

  return (
    <motion.section ref={sectionRef}
      initial={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', filter: 'blur(10px)' }}
      whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-200px' }}
      transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
      className="relative w-full bg-transparent transition-colors duration-500 z-20 pt-8 -mt-[2vh] sm:-mt-[5vh]">
      <div className="h-[400vh] w-full relative">
        <div className="sticky top-0 h-[100dvh] w-full flex flex-row overflow-visible">
          
          {/* Panel 1: The Gallery */}
          <motion.div style={{ x: slideX }} className="w-[100vw] h-full relative overflow-hidden flex-shrink-0 z-0 will-change-transform transform-gpu">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 transform-gpu mt-[8vh] md:mt-0">
              <motion.div style={{ x: xSelected, y: ySelectedFinal }} className="w-full flex justify-center will-change-transform transform-gpu">
                <h2 className="font-anton text-[22vw] md:text-[22vw] lg:text-[21vw] xl:text-[23vw] uppercase tracking-tighter pointer-events-auto whitespace-nowrap">
                  {isMobile ? <MobileVerticalWaveText text={t('selected', lang)} delay="0s" /> : <DesktopScrollText text={t('selected', lang)} scrollYProgress={cardsProgress} globalOffset={0} />}
                </h2>
              </motion.div>
              <motion.div style={{ x: xWorks, y: yWorksFinal }} className="w-full flex justify-center -mt-[5vw] lg:-mt-[2vw] will-change-transform transform-gpu">
                <h2 className="font-anton text-[22vw] md:text-[22vw] lg:text-[21vw] xl:text-[23vw] uppercase tracking-tighter pointer-events-auto whitespace-nowrap">
                  {isMobile ? <MobileVerticalWaveText text={t('works', lang)} delay="2s" /> : <DesktopScrollText text={t('works', lang)} scrollYProgress={cardsProgress} globalOffset={8} />}
                </h2>
              </motion.div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 mt-[8vh] md:mt-0">
              {GALLERY_PROJECTS.map((project, index) => (
                <DraggablePolaroid key={project.id + '-' + index} project={project} index={index} scrollYProgress={cardsProgress} bringToFront={handleBringToFront} onProjectClick={setSelectedProject} />
              ))}
            </div>
          </motion.div>

          {/* Panel 2: The Final Section (ViewAllBlock + Footer) */}
          <motion.div style={{ x: slideX }} className="w-[100vw] h-full flex flex-col justify-between bg-transparent flex-shrink-0 relative z-10 border-l border-gray-200 dark:border-gray-800 shadow-[-20px_0_50px_rgba(0,0,0,0.05)] dark:shadow-[-20px_0_50px_rgba(0,0,0,0.5)] will-change-transform transform-gpu">
            {children}
          </motion.div>

        </div>
      </div>
      <ProjectModal 
        project={selectedProject} 
        index={selectedProject ? GALLERY_PROJECTS.indexOf(selectedProject) : 0}
        onClose={() => setSelectedProject(null)} 
      />
    </motion.section>
  );
};
export default ProjectsGallery;
