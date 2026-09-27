import { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, Html, useProgress } from '@react-three/drei';
import ErrorBoundary from '../common/ErrorBoundary';
import { VoxelModel } from './VoxelModel';
import { zoomForCanvasHeight } from './voxelFraming';

/** Fixed viewing angle. The orthographic zoom, not this position, controls the framed size. */
const CAMERA_POSITION: [number, number, number] = [15, 10, 15];

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

/**
 * El zoom se deriva de la altura real del canvas en lugar de quedar fijo: así el sujeto ocupa la
 * misma fracción del hero en mobile (320px) y en sm+ (420px), en vez de encogerse en el más alto.
 */
function FramedCamera() {
  const height = useThree((state) => state.size.height);
  return (
    <OrthographicCamera
      makeDefault
      position={CAMERA_POSITION}
      zoom={zoomForCanvasHeight(height)}
      near={0.01}
      far={50000}
    />
  );
}

export default function VoxelCanvas() {
  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing" 
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Boundary en el árbol DOM: R3F relanza ahí los errores del canvas, así que un fallo al
          cargar el modelo degrada solo el hero en lugar de reemplazar toda la página por el Oops. */}
      <ErrorBoundary fallback={null}>
        <Canvas gl={{ antialias: true, alpha: true }}>
          <FramedCamera />

          {/* Sin shadow map: ningún mesh del glTF proyecta ni recibe sombras, la única sombra
              del hero es la de contacto que monta VoxelModel. */}
          <ambientLight intensity={1.2} />
          <directionalLight 
            position={[10, 20, 10]} 
            intensity={1.5} 
          />
          
          <Suspense fallback={<CanvasLoader />}>
            {/* Sin offset manual: VoxelModel centra el sujeto en el origen del grupo, que es
                el mismo punto que usa OrbitControls como target y como centro de zoom. */}
            <VoxelModel />
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
      </ErrorBoundary>
    </div>
  );
}
