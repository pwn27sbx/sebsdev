import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, Html, useProgress } from '@react-three/drei';
import { VoxelModel } from './VoxelModel';

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="font-mono text-xs text-primary animate-pulse whitespace-nowrap">
        {progress.toFixed(0)}% LOADED
      </div>
    </Html>
  );
}

export default function VoxelCanvas() {
  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing" 
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
    >
      <Canvas gl={{ antialias: true, alpha: true }}>
        {/* Orthographic Camera for that isometric voxel look */}
        <OrthographicCamera 
          makeDefault 
          position={[15, 10, 15]} 
          zoom={30} 
          near={0.01} 
          far={50000} 
        />

        {/* Super simple lighting (no heavy shadows) */}
        <ambientLight intensity={1.5} />
        
        {/* Suspense boundary with custom HTML Loader */}
        <Suspense fallback={<CanvasLoader />}>
          {/* Posicionado un poco hacia abajo (-1.2) para que quede centrado similar al target original de Takuya */}
          <VoxelModel position={[0, -1.2, 0]} />
        </Suspense>

        {/* Camera controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.0}
          target={[0, 0, 0]}
          minZoom={15}
          maxZoom={120}
        />
      </Canvas>
    </div>
  );
}
