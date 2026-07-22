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
      <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-primary-dark to-bg-dark">
        <motion.div key={location.pathname} variants={pageVariants} initial={false} animate="animate" exit="exit"
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
        <Routes location={location}>
          <Route path="/" element={<Suspense fallback={<FallbackLoader />}><Home /></Suspense>} />
          <Route path="/proyectos" element={<Suspense fallback={<FallbackLoader />}><Archive /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<FallbackLoader />}><About /></Suspense>} />
          <Route path="/contacto" element={<Suspense fallback={<FallbackLoader />}><Contact /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<FallbackLoader />}><NotFound /></Suspense>} />
        </Routes>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const FallbackLoader = () => (
  <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center transition-colors duration-500">
    <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-800 border-t-brand-primary dark:border-t-brand-primary rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router basename="/">
        <ErrorBoundary>
          <PortfolioProvider>
            <AnimatedRoutes />
          </PortfolioProvider>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}
