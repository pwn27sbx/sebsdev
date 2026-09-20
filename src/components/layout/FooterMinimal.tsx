import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const FooterMinimal = () => {
  const { setIsHovering } = usePortfolio();
  
  return (
    <footer className="w-full py-8 text-center text-gray-500 dark:text-gray-400 font-mono text-sm border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-4">
        <a 
          href="https://github.com/pwn27sbx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          GitHub
        </a>
        <a 
          href="https://www.linkedin.com/in/sebastiangf/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          LinkedIn
        </a>
        <a 
          href="mailto:contact@sebastian.dev" 
          className="hover:text-primary transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Email
        </a>
      </div>
      <p>© {new Date().getFullYear()} Sebastian. All rights reserved.</p>
    </footer>
  );
};

export default FooterMinimal;
