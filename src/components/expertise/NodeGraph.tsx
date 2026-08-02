import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

// Types
type Node = {
  id: string;
  title: string;
  desc: string;
  x: number;
  y: number;
  color: string;
};

type Edge = {
  from: string;
  to: string;
};

// Canvas Size
const CANVAS_SIZE = 3000;
const CENTER = CANVAS_SIZE / 2;

// Data Structure (Tech Tree)
const NODES: Node[] = [
  // CORE
  { id: 'core', title: 'SEBS.DEV', desc: 'Creative Developer', x: CENTER, y: CENTER, color: '#CORE' }, // Special marker
  
  // ----------------------------------------------------
  // BRANCH 1: FRONT-END (Top Left) - Color: #00A889
  // ----------------------------------------------------
  { id: 'frontend', title: 'FRONT-END', desc: 'Architecture', x: CENTER - 400, y: CENTER - 200, color: '#00A889' },
  { id: 'ts', title: 'TypeScript', desc: 'Type Safety', x: CENTER - 350, y: CENTER - 450, color: '#00A889' },
  { id: 'react', title: 'React', desc: 'UI Library', x: CENTER - 700, y: CENTER - 350, color: '#00A889' },
  { id: 'next', title: 'Next.js', desc: 'Meta Framework', x: CENTER - 700, y: CENTER - 150, color: '#00A889' },
  // Front-end sub-branches
  { id: 'zustand', title: 'Zustand', desc: 'State Management', x: CENTER - 1000, y: CENTER - 400, color: '#00A889' },
  { id: 'tailwind', title: 'Tailwind CSS', desc: 'Utility Styling', x: CENTER - 1000, y: CENTER - 200, color: '#00A889' },
  { id: 'vite', title: 'Vite', desc: 'Build Tool', x: CENTER - 950, y: CENTER - 50, color: '#00A889' },

  // ----------------------------------------------------
  // BRANCH 2: WEBGL & MOTION (Top Right) - Color: #FF2A6D
  // ----------------------------------------------------
  { id: 'motion', title: 'WEBGL & MOTION', desc: 'Interactive 3D', x: CENTER + 400, y: CENTER - 200, color: '#FF2A6D' },
  { id: 'gsap', title: 'GSAP', desc: 'Complex Timelines', x: CENTER + 350, y: CENTER - 450, color: '#FF2A6D' },
  { id: 'framer', title: 'Framer Motion', desc: 'React Animations', x: CENTER + 700, y: CENTER - 150, color: '#FF2A6D' },
  { id: 'three', title: 'Three.js', desc: '3D Graphics', x: CENTER + 700, y: CENTER - 350, color: '#FF2A6D' },
  // Motion sub-branches
  { id: 'r3f', title: 'React Three Fiber', desc: 'Declarative 3D', x: CENTER + 1050, y: CENTER - 400, color: '#FF2A6D' },
  { id: 'shaders', title: 'GLSL Shaders', desc: 'GPU Materials', x: CENTER + 1000, y: CENTER - 550, color: '#FF2A6D' },
  { id: 'lenis', title: 'Lenis', desc: 'Smooth Scroll', x: CENTER + 1000, y: CENTER - 100, color: '#FF2A6D' },

  // ----------------------------------------------------
  // BRANCH 3: BACK-END (Bottom Left) - Color: #0088FF
  // ----------------------------------------------------
  { id: 'backend', title: 'BACK-END', desc: 'Server Logic', x: CENTER - 400, y: CENTER + 200, color: '#0088FF' },
  { id: 'node', title: 'Node.js', desc: 'Runtime', x: CENTER - 700, y: CENTER + 150, color: '#0088FF' },
  { id: 'prisma', title: 'Prisma', desc: 'Modern ORM', x: CENTER - 700, y: CENTER + 350, color: '#0088FF' },
  { id: 'graphql', title: 'GraphQL', desc: 'Data Queries', x: CENTER - 450, y: CENTER + 450, color: '#0088FF' },
  // Back-end sub-branches
  { id: 'postgres', title: 'PostgreSQL', desc: 'Relational DB', x: CENTER - 1000, y: CENTER + 350, color: '#0088FF' },
  { id: 'redis', title: 'Redis', desc: 'Cache Layer', x: CENTER - 1000, y: CENTER + 150, color: '#0088FF' },

  // ----------------------------------------------------
  // BRANCH 4: DEVOPS & CLOUD (Bottom Right) - Color: #FF8800
  // ----------------------------------------------------
  { id: 'devops', title: 'DEVOPS', desc: 'Infrastructure', x: CENTER + 400, y: CENTER + 200, color: '#FF8800' },
  { id: 'docker', title: 'Docker', desc: 'Containerization', x: CENTER + 700, y: CENTER + 150, color: '#FF8800' },
  { id: 'aws', title: 'AWS / Cloud', desc: 'Serverless', x: CENTER + 700, y: CENTER + 350, color: '#FF8800' },
  // DevOps sub-branches
  { id: 'cicd', title: 'CI / CD', desc: 'Automated Pipelines', x: CENTER + 1050, y: CENTER + 150, color: '#FF8800' },
  { id: 'linux', title: 'Linux', desc: 'Server Admin', x: CENTER + 1000, y: CENTER + 350, color: '#FF8800' },

  // ----------------------------------------------------
  // BRANCH 5: DESIGN SYSTEMS (Bottom Center) - Color: #888888
  // ----------------------------------------------------
  { id: 'design', title: 'UI / UX', desc: 'Design Systems', x: CENTER, y: CENTER + 400, color: '#888888' },
  { id: 'figma', title: 'Figma', desc: 'Prototyping', x: CENTER - 200, y: CENTER + 600, color: '#888888' },
  { id: 'storybook', title: 'Storybook', desc: 'Component Isolation', x: CENTER + 200, y: CENTER + 600, color: '#888888' },
];

const EDGES: Edge[] = [
  // Core to Main Branches
  { from: 'core', to: 'frontend' },
  { from: 'core', to: 'motion' },
  { from: 'core', to: 'backend' },
  { from: 'core', to: 'devops' },
  { from: 'core', to: 'design' },
  
  // Frontend Tree
  { from: 'frontend', to: 'react' },
  { from: 'frontend', to: 'next' },
  { from: 'frontend', to: 'ts' },
  { from: 'react', to: 'zustand' },
  { from: 'react', to: 'tailwind' },
  { from: 'next', to: 'vite' },

  // Motion Tree
  { from: 'motion', to: 'three' },
  { from: 'motion', to: 'framer' },
  { from: 'motion', to: 'gsap' },
  { from: 'three', to: 'r3f' },
  { from: 'three', to: 'shaders' },
  { from: 'framer', to: 'lenis' },

  // Backend Tree
  { from: 'backend', to: 'node' },
  { from: 'backend', to: 'prisma' },
  { from: 'backend', to: 'graphql' },
  { from: 'prisma', to: 'postgres' },
  { from: 'node', to: 'redis' },

  // DevOps Tree
  { from: 'devops', to: 'docker' },
  { from: 'devops', to: 'aws' },
  { from: 'docker', to: 'cicd' },
  { from: 'docker', to: 'linux' },

  // Design Tree
  { from: 'design', to: 'figma' },
  { from: 'design', to: 'storybook' },
];

export default function NodeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useAnimation();
  const [isDragged, setIsDragged] = useState(false);
  const { darkMode } = usePortfolio();

  const coreColor = darkMode ? '#FFFFFF' : '#000000';
  const gridColor = darkMode ? '#333' : '#ccc';

  // SVG Path Generator (Cubic Bezier for nice curves)
  const drawCurve = (x1: number, y1: number, x2: number, y2: number) => {
    // If vertical dominant
    if (Math.abs(y2 - y1) > Math.abs(x2 - x1)) {
      return `M ${x1} ${y1} C ${x1} ${y1 + (y2 - y1) / 2}, ${x2} ${y1 + (y2 - y1) / 2}, ${x2} ${y2}`;
    }
    // Horizontal dominant
    return `M ${x1} ${y1} C ${x1 + (x2 - x1) / 2} ${y1}, ${x1 + (x2 - x1) / 2} ${y2}, ${x2} ${y2}`;
  };

  const handleRecenter = () => {
    dragControls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } });
    setIsDragged(false);
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full bg-[#f0f0f0] dark:bg-[#050505] overflow-hidden cursor-grab active:cursor-grabbing transition-colors duration-700"
    >
      {/* Infinite Canvas */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.1}
        animate={dragControls}
        onDragStart={() => setIsDragged(true)}
        className="absolute"
        style={{
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          left: `calc(50% - ${CENTER}px)`,
          top: `calc(50% - ${CENTER}px)`,
          // Dotted grid background changes based on theme
          backgroundImage: `radial-gradient(circle, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        {/* SVG Connections Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {EDGES.map((edge, i) => {
            const nodeA = NODES.find((n) => n.id === edge.from);
            const nodeB = NODES.find((n) => n.id === edge.to);
            if (!nodeA || !nodeB) return null;

            const nodeBColor = nodeB.color === '#CORE' ? coreColor : nodeB.color;

            // Center of nodes for drawing
            const nodeWidth = 200;
            const nodeHeight = 80;
            const startX = nodeA.x + nodeWidth / 2;
            const startY = nodeA.y + nodeHeight / 2;
            const endX = nodeB.x + nodeWidth / 2;
            const endY = nodeB.y + nodeHeight / 2;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                {/* Thick glow/background path */}
                <path
                  d={drawCurve(startX, startY, endX, endY)}
                  fill="none"
                  stroke={nodeBColor}
                  strokeWidth="6"
                  strokeOpacity="0.1"
                />
                {/* Main path */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                  d={drawCurve(startX, startY, endX, endY)}
                  fill="none"
                  stroke={nodeBColor}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}
        </svg>

        {/* HTML Nodes Layer */}
        {NODES.map((node, i) => {
          const actualColor = node.color === '#CORE' ? coreColor : node.color;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                width: 200,
              }}
              className="group pointer-events-auto cursor-pointer"
            >
              <div 
                className={`bg-white dark:bg-[#0A0A0A] border rounded-lg p-4 shadow-xl transition-all duration-300 hover:scale-105 ${node.id === 'core' ? 'ring-2 ring-black/50 dark:ring-white/50 animate-pulse' : ''}`}
                style={{ 
                  borderColor: `${actualColor}40`,
                  boxShadow: `0 10px 30px -10px ${actualColor}30` 
                }}
              >
                {/* Node Ports (Dots) */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#f0f0f0] dark:bg-[#050505] border-2 flex items-center justify-center transition-colors group-hover:bg-black dark:group-hover:bg-white" style={{ borderColor: actualColor }}>
                  <div className="w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100" />
                </div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#f0f0f0] dark:bg-[#050505] border-2 flex items-center justify-center transition-colors group-hover:bg-black dark:group-hover:bg-white" style={{ borderColor: actualColor }}>
                  <div className="w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100" />
                </div>

                {/* Node Content */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: actualColor }} />
                  <h3 className="font-mono font-bold text-black dark:text-white text-sm tracking-wider uppercase">
                    {node.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-gray-600 dark:text-gray-400 mt-2 pl-5">
                  {node.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Interface HUD overlay */}
      <div className="absolute top-8 left-8 pointer-events-none z-10 flex flex-col gap-2">
        <h2 className="font-anton text-4xl md:text-6xl text-black dark:text-white uppercase tracking-wider drop-shadow-lg">
          EXPERTISE <span className="text-[#00A889]">GRAPH</span>
        </h2>
        <div className="flex flex-wrap gap-4 font-mono text-xs text-gray-600 dark:text-gray-400 max-w-2xl">
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#00A889] rounded-full" /> FRONT-END</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#FF2A6D] rounded-full" /> WEBGL & MOTION</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0088FF] rounded-full" /> BACK-END</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#FF8800] rounded-full" /> DEVOPS</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#888888] rounded-full" /> DESIGN SYSTEMS</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-end gap-4">
        {/* Recenter Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isDragged ? 1 : 0, y: isDragged ? 0 : 20 }}
          onClick={handleRecenter}
          className={`pointer-events-auto bg-[#FF2A6D] hover:bg-[#FF2A6D]/80 text-white px-4 py-2 rounded-full font-mono text-xs font-bold transition-colors shadow-[0_0_15px_rgba(255,42,109,0.5)] ${!isDragged && 'pointer-events-none'}`}
        >
          RECENTER MAP
        </motion.button>

        <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 px-4 py-2 rounded-full font-mono text-xs text-black dark:text-white flex items-center gap-3 pointer-events-none">
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          CLICK & DRAG TO PAN CANVAS
        </div>
      </div>
    </div>
  );
}
