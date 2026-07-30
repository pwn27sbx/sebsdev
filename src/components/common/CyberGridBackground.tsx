import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const CyberGridBackground = ({ transparent = false }: { transparent?: boolean }) => {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(1000);

  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fade out when entering ExpertiseSection (100vh -> 350vh)
  const opacity = useTransform(
    scrollY,
    [vh * 0.7, vh * 1.2, vh * 2.8, vh * 3.3],
    [1, 0, 0, 1]
  );

  return (
    <motion.div style={transparent ? {} : { opacity }} className={`${transparent ? 'sticky top-0 h-[100vh] w-full' : 'fixed inset-0'} pointer-events-none overflow-hidden transition-colors duration-500 ${transparent ? 'bg-transparent z-0' : 'bg-[#f0f0f0] dark:bg-[#030303] z-0'}`}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00A889]/10 via-transparent to-transparent dark:from-[#00A889]/20"></div>
      
      {/* The moving floor grid */}
      <div className="absolute top-1/2 left-0 right-0 bottom-0 overflow-hidden perspective-1000">
        <div className="cyber-grid absolute w-[200%] h-[200%] left-[-50%] bottom-0"></div>
      </div>
      
      {/* The moving ceiling grid (optional, but gives a tunnel vibe) */}
      <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden perspective-1000">
        <div className="cyber-grid-ceiling absolute w-[200%] h-[200%] left-[-50%] top-0"></div>
      </div>
    </motion.div>
  );
};

export default CyberGridBackground;
