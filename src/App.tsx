import { Suspense, lazy } from 'react';
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

import { usePortfolio } from './context/PortfolioContext';

function GlobalLayoutManager() {
  const { layoutMode } = usePortfolio();

  return (
    <>
      <CustomScrollbar />
      {layoutMode === 'cyberpunk' && (
        <>
          <CustomCursor />
          <SideMarquee />
          <CyberGridBackground />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </>
      )}
      <Header />
      <AnimatedRoutes />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true, syncTouch: true, touchMultiplier: 2 }}>
        <Router basename="/">
          <ErrorBoundary>
            <PortfolioProvider>
              <GlobalLayoutManager />
            </PortfolioProvider>
          </ErrorBoundary>
        </Router>
      </ReactLenis>
    </HelmetProvider>
  );
}
