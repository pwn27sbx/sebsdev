import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const NotFoundMinimal = () => {
  const { setIsHovering } = usePortfolio();

  return (
    <div className="bg-[#fafafa] dark:bg-[#111111] text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center font-sans">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-8">Page not found</p>
      <Link 
        to="/"
        className="text-primary hover:underline font-mono"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundMinimal;
