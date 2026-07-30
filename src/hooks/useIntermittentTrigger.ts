import { useState, useEffect } from 'react';
import { useIsMobile } from './useIsMobile';

export const useIntermittentTrigger = (intervalMs: number = 5000, durationMs: number = 1500) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setIsTriggered(false);
      return;
    }

    const intervalId = setInterval(() => {
      setIsTriggered(true);
      setTimeout(() => {
        setIsTriggered(false);
      }, durationMs);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [isMobile, intervalMs, durationMs]);

  return isTriggered;
};
