/// <reference types="vite/client" />

interface Document {
  startViewTransition?: (callback: () => void) => void;
}

interface Navigator {
  userLanguage?: string;
}
