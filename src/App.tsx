import React, { Suspense, lazy } from 'react';
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
  initial: { opacity: 0, clipPath: 'circle(0% at 50% 50%)', scale: 0.92 },
  animate: { opacity: 1, clipPath: 'circle(100% at 50% 50%)', scale: 1 },
  exit: { opacity: 0, clipPath: 'circle(0% at 50% 50%)', scale: 0.92 },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div className="min-h-screen bg-gradient-to-br from-[#00A889] via-[#008f6b] to-[#0a0a0a]">
        <motion.div key={location.pathname} variants={pageVariants} initial={false} animate="animate" exit="exit"
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Archive />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const FallbackLoader = () => (
  <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] flex items-center justify-center transition-colors duration-500">
    <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-800 border-t-[#00A889] dark:border-t-[#00A889] rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router basename="/">
        <ErrorBoundary>
          <PortfolioProvider>
            <Suspense fallback={<FallbackLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </PortfolioProvider>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}
