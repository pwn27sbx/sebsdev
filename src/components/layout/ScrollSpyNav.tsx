import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import DecryptedText from '../common/DecryptedText';
import KatanaIcon from '../icons/KatanaIcon';
import { usePortfolio } from '../../context/PortfolioContext';
import { t } from '../../data/i18n';

const navItems = [
  { id: 'section-about', labelKey: 'spyAbout', color: '#FF2A6D' },
  { id: 'section-expertise', labelKey: 'spyExpertise', color: '#FF2A6D' },
  { id: 'section-projects', labelKey: 'spyProjects', color: '#FF2A6D' },
  { id: 'section-contact', labelKey: 'spyContact', color: '#FF2A6D' }
] as const;

const ActiveKatanaIndicator = ({ item }: { item: { id: string, labelKey: string, color: string } }) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // If it's contact, target projects because contact slides inside it
    const targetId = item.id === 'section-contact' ? 'section-projects' : item.id;
    const el = document.getElementById(targetId);
    setElement(el);
  }, [item.id]);

  let scrollOffset: any = ["start center", "end center"];
  if (item.id === 'section-about') {
    scrollOffset = ["start start", "end center"];
  } else if (item.id === 'section-projects' || item.id === 'section-contact') {
    scrollOffset = ["start start", "end end"];
  }

  const { scrollYProgress } = useScroll({
    target: element ? { current: element } : undefined,
    offset: scrollOffset
  });

  // Map progress based on the internal timeline of ProjectsGallery and Expertise
  const progressProjects = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const progressContact = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const progressExpertise = useTransform(scrollYProgress, [0, 0.6], [0, 1]); // Finishes filling right before overlapping projects section

  let mappedProgress = scrollYProgress;
  if (item.id === 'section-projects') {
    mappedProgress = progressProjects;
  } else if (item.id === 'section-contact') {
    mappedProgress = progressContact;
  } else if (item.id === 'section-expertise') {
    mappedProgress = progressExpertise;
  }

  // Convert progress (0 to 1) into a clip-path inset percentage (100% to 0%)
  const clipHeight = useTransform(mappedProgress, [0, 1], ["100%", "0%"]);
  const clipPathStyle = useTransform(clipHeight, (h) => `inset(${h} 0 0 0)`);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none flex items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className="relative w-10 h-10 flex items-center justify-center"
        style={{ filter: `drop-shadow(0px 0px 6px ${item.color}80)` }}
      >
        {/* Colored Active Katana with scroll-based clip-path */}
        <KatanaIcon color={item.color} isActive={true} clipPathStyle={clipPathStyle} />
      </div>
    </motion.div>
  );
};

const ScrollSpyNav = () => {
  const { lang } = usePortfolio();
  const [activeSection, setActiveSection] = useState<string>(navItems[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      let currentActive: string = navItems[0].id;
      
      // 1. Check normal sections
      for (const item of navItems) {
        if (item.id === 'section-contact') continue; 
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the center of the screen is between the top and bottom of the element
          if (rect.top <= viewportHeight * 0.5 && rect.bottom >= viewportHeight * 0.5) {
            currentActive = item.id;
          }
        }
      }

      // 2. Check if we are in the contact part of the projects gallery
      const projectsEl = document.getElementById('section-projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        // If projects gallery is fully covering the screen (or mostly)
        if (rect.top <= 0) {
           const progress = -rect.top / (rect.height - viewportHeight);
           if (progress >= 0.7) { // 0.7 matches the slideX trigger in ProjectsGallery
             currentActive = 'section-contact';
           }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    if (id === 'section-contact') {
      const projectsEl = document.getElementById('section-projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + rect.bottom - window.innerHeight,
          behavior: 'smooth'
        });
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const content = (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden xl:flex flex-col gap-2">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        
        return (
          <div 
            key={item.id}
            className="group flex items-center justify-end gap-4 cursor-pointer pointer-events-auto"
            onClick={() => handleClick(item.id)}
          >
            {/* Label */}
            <div 
              className={`font-mono text-[10px] tracking-widest uppercase transition-opacity duration-300 min-w-[100px] text-right ${isActive ? 'opacity-100 font-bold' : 'opacity-0 group-hover:opacity-50 text-gray-500 dark:text-gray-400'}`}
              style={{ color: isActive ? '#00A889' : undefined }}
            >
              {isActive ? (
                <DecryptedText 
                  text={t(item.labelKey, lang)} 
                  speed={80} 
                  maxIterations={15} 
                  animateOn="view"
                  encryptedClassName="opacity-80" 
                  style={{ textShadow: `0 0 8px #00A889` }}
                />
              ) : (
                t(item.labelKey, lang)
              )}
            </div>

            {/* Indicator Container */}
            <div className="relative flex items-center justify-center w-10 h-10">
              {/* Glowing Crossed Katanas for Active State */}
              {isActive && (
                <ActiveKatanaIndicator item={item} />
              )}
              
              {/* Inactive State Line */}
              {!isActive && (
                <div className="w-6 h-[1.5px] bg-gray-400 dark:bg-gray-500 group-hover:bg-[#00A889] group-hover:w-8 transition-all duration-300" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(content, document.body);
};

export default ScrollSpyNav;
