import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/layout/Header';
import SideMarquee from './components/layout/SideMarquee';
import CyberGridBackground from './components/common/CyberGridBackground';
import { HelmetProvider } from 'react-helmet-async';
import './styles/globalStyles.css';

const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Scene = lazy(() => import('./components/canvas/Scene'));
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
  <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-[9999] pointer-events-none">
    <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

import { ReactLenis } from 'lenis/react';
import CustomCursor from './components/layout/CustomCursor';
import CustomScrollbar from './components/layout/CustomScrollbar';

export default function App() {
  useEffect(() => {
    // Bloqueo de click derecho
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Bloqueo de atajos de teclado para herramientas de desarrollador
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevenir F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Prevenir Ctrl+Shift+I (Inspeccionar)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      // Prevenir Ctrl+Shift+J (Consola)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }
      // Prevenir Ctrl+Shift+C (Inspector de elementos)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
      }
      // Prevenir Ctrl+U (Ver código fuente)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }
    };

    // Bloqueo de arrastre de imágenes (opcional pero lo tenías antes)
    const handleDragStart = (e: DragEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <HelmetProvider>
      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true, syncTouch: true, touchMultiplier: 2 }}>
        <Router basename="/">
          <ErrorBoundary>
            <PortfolioProvider>
              <CustomScrollbar />
              <CustomCursor />
              <SideMarquee />
              <Header />
              <CyberGridBackground />
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
              <AnimatedRoutes />
            </PortfolioProvider>
          </ErrorBoundary>
        </Router>
      </ReactLenis>
    </HelmetProvider>
  );
}
