import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  text: string;
}

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  text
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // Manually set text to avoid React reconciliation conflicts with GSAP
    const p = rootRef.current.querySelector('p');
    if (p) p.innerText = text;

    const split = SplitText.create(p, {
      type: 'words,chars',
      charsClass: 'inline-block will-change-transform',
      wordsClass: 'inline-block'
    });

    split.chars.forEach(el => {
      const c = el as HTMLElement;
      gsap.set(c, { attr: { 'data-content': c.innerText } });
    });

    const handleMove = (e: PointerEvent) => {
      split.chars.forEach(el => {
        const c = el as HTMLElement;
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || '',
              chars: scrambleChars,
              speed,
              tweenLength: false
            },
            ease: 'none'
          });
        }
      });
    };

    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars, text]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={style}
    >
      <p></p>
    </div>
  );
}

