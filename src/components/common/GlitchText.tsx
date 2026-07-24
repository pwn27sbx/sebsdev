import { FC, CSSProperties } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 #00A889' : 'none',
    '--before-shadow': enableShadows ? '5px 0 #FF2A6D' : 'none'
  };

  const baseClasses = 'relative inline-block select-none glitch-anim';

  const pseudoClasses = !enableOnHover
    ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[4px] sm:after:left-[10px] after:text-inherit after:bg-[#f5f5f5] dark:after:bg-[#0a0a0a] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] ' +
      'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-4px] sm:before:left-[-10px] before:text-inherit before:bg-[#f5f5f5] dark:before:bg-[#0a0a0a] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)]'
    : "after:content-[''] after:absolute after:top-0 after:left-[4px] sm:after:left-[10px] after:text-inherit after:bg-[#f5f5f5] dark:after:bg-[#0a0a0a] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
      "before:content-[''] before:absolute before:top-0 before:left-[-4px] sm:before:left-[-10px] before:text-inherit before:bg-[#f5f5f5] dark:before:bg-[#0a0a0a] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
      'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] ' +
      'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)]';

  const combinedClasses = `${baseClasses} ${pseudoClasses} ${className}`;

  return (
    <div style={inlineStyles} data-text={children} className={combinedClasses}>
      {children}
    </div>
  );
};

export default GlitchText;
