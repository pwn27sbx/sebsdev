import { useTransform, MotionValue } from 'framer-motion';

export const useGalleryAnimations = (
  scrollYProgress: MotionValue<number>,
  isMobile: boolean
) => {
  const cardsProgress = useTransform(scrollYProgress, [0, 0.75], [0, 1]);
  const slideX = useTransform(scrollYProgress, [0, 0.75, 1], ["0vw", "0vw", "-100vw"]);

  const xSelectedDesktop = useTransform(cardsProgress, [0, 0.25, 0.55, 0.75], ['100vw', '0vw', '0vw', '-100vw']);
  const xWorksDesktop = useTransform(cardsProgress, [0, 0.25, 0.55, 0.75], ['-100vw', '0vw', '0vw', '100vw']);
  const xSelectedMobile = useTransform(cardsProgress, [0, 0.25], ['100vw', '0vw']);
  const xWorksMobile = useTransform(cardsProgress, [0, 0.25], ['-100vw', '0vw']);
  const ySelectedMobile = useTransform(cardsProgress, [0.55, 0.85], ['0vh', '-32vh']);
  const yWorksMobile = useTransform(cardsProgress, [0.55, 0.85], ['0vh', '-36vh']);
  const yDesktop = useTransform(cardsProgress, [0, 1], ['0vh', '0vh']);

  const xSelected = isMobile ? xSelectedMobile : xSelectedDesktop;
  const xWorks = isMobile ? xWorksMobile : xWorksDesktop;
  const ySelectedFinal = isMobile ? ySelectedMobile : yDesktop;
  const yWorksFinal = isMobile ? yWorksMobile : yDesktop;

  return {
    cardsProgress,
    slideX,
    xSelected,
    xWorks,
    ySelectedFinal,
    yWorksFinal,
  };
};
