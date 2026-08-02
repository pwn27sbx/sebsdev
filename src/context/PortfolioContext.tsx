/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { Lang } from '../data/i18n';

export type ColorTheme = 'default' | 'holonoir' | 'metrovapor' | 'biohazard' | 'dataheist' | 'tealnight' | 'laserlime' | 'circuitgarden';
export type ImmersionMode = 'relax' | 'full';

interface PortfolioContextType {
  isHovering: boolean;
  setIsHovering: (v: boolean) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  lang: Lang;
  setLang: (v: Lang) => void;
  colorTheme: ColorTheme;
  setColorTheme: (v: ColorTheme) => void;
  immersionMode: ImmersionMode;
  setImmersionMode: (v: ImmersionMode) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [isHovering, setIsHovering] = useState(false);
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('portfolio_lang');
      if (savedLang === 'es' || savedLang === 'en') return savedLang as Lang;
      const userLang = navigator.language || navigator.userLanguage || 'en';
      return userLang.toLowerCase().includes('es') ? 'es' as Lang : 'en' as Lang;
    }
    return 'en' as Lang;
  });

  const setLang = useCallback((value: Lang) => {
    localStorage.setItem('portfolio_lang', value);
    setLangState(value);
  }, []);

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_color_theme') as ColorTheme;
      const validThemes = ['default', 'holonoir', 'metrovapor', 'biohazard', 'dataheist', 'tealnight', 'laserlime', 'circuitgarden'];
      if (validThemes.includes(saved)) return saved;
    }
    return 'default';
  });

  const setColorTheme = useCallback((value: ColorTheme) => {
    localStorage.setItem('portfolio_color_theme', value);
    setColorThemeState(value);
  }, []);

  const [immersionMode, setImmersionModeState] = useState<ImmersionMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_immersion_mode') as ImmersionMode;
      return saved === 'full' ? 'full' : 'relax';
    }
    return 'relax';
  });

  const setImmersionMode = useCallback((value: ImmersionMode) => {
    localStorage.setItem('portfolio_immersion_mode', value);
    setImmersionModeState(value);
  }, []);

  // Dark mode: empieza leyendo de localStorage, luego del sistema
  const [darkMode, setDarkModeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio_theme');
      if (savedTheme !== null) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const userToggled = useRef(typeof window !== 'undefined' && localStorage.getItem('portfolio_theme') !== null);

  const setDarkMode = useCallback((value: boolean) => {
    userToggled.current = true;
    localStorage.setItem('portfolio_theme', value ? 'dark' : 'light');
    setDarkModeState(value);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const applyClasses = () => {
      root.classList.toggle('dark', darkMode);
      root.classList.remove(
        'theme-holonoir', 'theme-metrovapor', 'theme-biohazard', 
        'theme-dataheist', 'theme-tealnight', 'theme-laserlime', 
        'theme-circuitgarden', 'immersion-full'
      );
      if (colorTheme !== 'default') {
        root.classList.add(`theme-${colorTheme}`);
      }
      if (immersionMode === 'full') {
        root.classList.add('immersion-full');
      }
    };

    // View Transition API: transición nativa (Chrome 111+, Firefox 125+)
    if (document.startViewTransition) {
      try {
        const transition = document.startViewTransition(() => {
          applyClasses();
        });
        
        // Catch unhandled promise rejections that occur in React 18 Strict Mode
        // when transitions overlap or are cancelled instantly.
        if (transition.finished) transition.finished.catch(() => {});
        if (transition.ready) transition.ready.catch(() => {});
        if (transition.updateCallbackDone) transition.updateCallbackDone.catch(() => {});
      } catch (e) {
        applyClasses();
      }
      return;
    }

    // Fallback: CSS transition para Firefox viejo y otros navegadores
    root.classList.add('theme-switching');
    void getComputedStyle(root).backgroundColor;
    applyClasses();
    const timer = setTimeout(() => root.classList.remove('theme-switching'), 500);
    return () => clearTimeout(timer);
  }, [darkMode, colorTheme, immersionMode]);

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
    <PortfolioContext.Provider value={{ isHovering, setIsHovering, darkMode, setDarkMode, lang, setLang, colorTheme, setColorTheme, immersionMode, setImmersionMode }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextType {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
