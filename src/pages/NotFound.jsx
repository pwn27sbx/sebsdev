import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function NotFound() {
  const { lang } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] text-[#111] dark:text-white flex flex-col items-center justify-center px-4 transition-colors duration-500">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-anton text-[20vw] sm:text-[15vw] leading-none text-[#00A889] tracking-tighter">
          404
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-4 mb-8 font-light">
          {lang === 'es'
            ? 'Esta página no existe... aún.'
            : 'This page does not exist... yet.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A889] text-white rounded-full hover:bg-[#00c5a1] transition-all duration-300 hover:scale-105 font-mono text-sm uppercase tracking-widest"
        >
          <span>←</span>
          {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
        </Link>
      </motion.div>
    </div>
  );
}
