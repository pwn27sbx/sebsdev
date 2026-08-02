import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CustomScrollbar = () => {
  const { scrollYProgress } = useScroll();
  const [thumbHeight, setThumbHeight] = useState(50);
  const [windowHeight, setWindowHeight] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      setWindowHeight(clientHeight);
      
      if (scrollHeight > clientHeight) {
        const height = Math.max((clientHeight / scrollHeight) * clientHeight, 50);
        setThumbHeight(height);
      } else {
        setThumbHeight(clientHeight); // Page doesn't scroll
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    const observer = new ResizeObserver(updateDimensions);
    if (document.body) observer.observe(document.body);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
    };
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, windowHeight - thumbHeight]);

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const startY = e.clientY;
    const startScrollY = window.scrollY;
    
    const handleDrag = (dragEvent: MouseEvent) => {
      const deltaY = dragEvent.clientY - startY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const trackScrollableHeight = window.innerHeight - thumbHeight;
      
      if (trackScrollableHeight <= 0) return;
      
      const scrollFactor = scrollableHeight / trackScrollableHeight;
      window.scrollTo(0, startScrollY + deltaY * scrollFactor);
    };
    
    const handleDragEnd = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
    
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
  };

  // If the page doesn't need scrolling, hide the scrollbar
  if (thumbHeight >= windowHeight) return null;

  return (
    <div 
      ref={trackRef}
      className="fixed top-0 right-0 h-screen w-[6px] z-[150] hidden md:block group"
    >
      <motion.div
        style={{ height: thumbHeight, y }}
        onMouseDown={handleDragStart}
        className={`w-full bg-primary cursor-grab active:cursor-grabbing transition-colors duration-200 ${isDragging ? 'bg-[#ff4d85]' : 'group-hover:bg-[#ff4d85]'}`}
      />
    </div>
  );
};

export default CustomScrollbar;
