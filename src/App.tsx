import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import './styles/globalStyles.css';

const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -15, scale: 0.98 },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit"
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Archive />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <PortfolioProvider>
        <ErrorBoundary>
          <Suspense fallback={
            <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-[#00A889] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 animate-pulse">Cargando</span>
              </div>
            </div>
          }>
            <AnimatedRoutes />
          </Suspense>
        </ErrorBoundary>
      </PortfolioProvider>
    </Router>
  );
}
