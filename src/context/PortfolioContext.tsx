/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { Lang } from '../data/i18n';

interface PortfolioContextType {
  isHovering: boolean;
  setIsHovering: (v: boolean) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  lang: Lang;
  setLang: (v: Lang) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [isHovering, setIsHovering] = useState(false);
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof navigator !== 'undefined') {
      const userLang: string = navigator.language || (navigator as any).userLanguage || 'en';
      return userLang.toLowerCase().includes('es') ? 'es' as Lang : 'en' as Lang;
    }
    return 'en' as Lang;
  });

  // Dark mode: empieza siguiendo al sistema, pero un toggle manual gana prioridad
  const [darkMode, setDarkModeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const userToggled = useRef(false);

  const setDarkMode = useCallback((value: boolean) => {
    userToggled.current = true;
    setDarkModeState(value);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Solo sigue al sistema si el usuario nunca hizo toggle manual
      if (!userToggled.current) {
        setDarkModeState(e.matches);
      }
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <PortfolioContext.Provider value={{ isHovering, setIsHovering, darkMode, setDarkMode, lang, setLang }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextType {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
