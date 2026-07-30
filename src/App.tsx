import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/common/ErrorBoundary';







import { HelmetProvider } from 'react-helmet-async';
import './styles/globalStyles.css';

const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(10px)', y: 40, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  exit: { opacity: 0, filter: 'blur(10px)', y: -40, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
};

import Scene from './components/canvas/Scene';
import Transition from './components/layout/Transition';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div className="min-h-screen relative z-10" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Suspense fallback={<FallbackLoader />}><Transition><Home /></Transition></Suspense>} />
          <Route path="/proyectos" element={<Suspense fallback={<FallbackLoader />}><Transition><Archive /></Transition></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<FallbackLoader />}><Transition><About /></Transition></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<FallbackLoader />}><Transition><Contact /></Transition></Suspense>} />
          <Route path="*" element={<Suspense fallback={<FallbackLoader />}><Transition><NotFound /></Transition></Suspense>} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

const FallbackLoader = () => (
  <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center transition-colors duration-500">
    <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-800 border-t-brand-primary dark:border-t-brand-primary rounded-full animate-spin"></div>
  </div>
);

import { ReactLenis } from 'lenis/react';

import CustomCursor from './components/layout/CustomCursor';

export default function App() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    const handleDragStart = (e: DragEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <HelmetProvider>
      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
        <Router basename="/">
          <ErrorBoundary>
            <PortfolioProvider>
              <CustomCursor />
              <Scene />
              <AnimatedRoutes />
            </PortfolioProvider>
          </ErrorBoundary>
        </Router>
      </ReactLenis>
    </HelmetProvider>
  );
}
