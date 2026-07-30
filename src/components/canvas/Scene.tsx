import React, { useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const Scene = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { darkMode } = usePortfolio();

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'theme',
        darkMode: darkMode
      }, '*');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'scroll',
          scrollY: window.scrollY,
          max: document.documentElement.scrollHeight - window.innerHeight
        }, '*');
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'mousemove',
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -((e.clientY / window.innerHeight) * 2 - 1)
        }, '*');
      }
    };

    const handleMouseLeave = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ type: 'mouseleave' }, '*');
      }
    };

    const handleLoad = () => {
      // Send initial theme once iframe loads
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'theme',
          darkMode: darkMode
        }, '*');
      }
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleLoad);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initial scroll state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <iframe 
        ref={iframeRef}
        src="/flow-wave.html" 
        className="w-full h-full border-none pointer-events-none"
        title="Flow Wave Background"
        aria-hidden="true"
      />
    </div>
  );
};

export default Scene;
