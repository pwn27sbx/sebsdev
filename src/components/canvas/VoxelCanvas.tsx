import { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, Html, useProgress } from '@react-three/drei';
import type { WebGLRenderer } from 'three';
import ErrorBoundary from '../common/ErrorBoundary';
import { VoxelModel } from './VoxelModel';
import { framingForCanvas } from './voxelFraming';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useCanvasVisibility } from '../../hooks/useCanvasVisibility';

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
 * Ground truth for the framing: the canvas element's own box, not R3F's `size`.
 *
 * R3F measures its container with a debounced ResizeObserver and can settle on a transient layout
 * size (observed: 205x210.60 while the element was really 285x211). `FramedCamera` derived the zoom
 * from that value, so the zoom came out at exactly half the correct one and the model rendered at
 * half scale, off centre. The element's `clientWidth`/`clientHeight` cannot disagree with itself, and
 * because the frustum and the zoom below are both derived from this one measurement, they can never
 * disagree with each other either.
 */
function useCanvasBox(gl: WebGLRenderer): { w: number; h: number } | null {
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    const el = gl.domElement;
    const read = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      // A detached or not-yet-laid-out element reports 0; keep the last good measurement instead.
      if (w <= 0 || h <= 0) return;
      setBox((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    };
    read();
    const observer = new ResizeObserver(read);
    observer.observe(el);
    window.addEventListener('resize', read);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', read);
    };
  }, [gl]);
  return box;
}

function FramedCamera() {
  const r3fSize = useThree((state) => state.size);
  const gl = useThree((state) => state.gl);
  const box = useCanvasBox(gl);
  // Fall back to R3F's size only until the element has been measured once.
  const width = box?.w ?? r3fSize.width;
  const height = box?.h ?? r3fSize.height;
  const framing = framingForCanvas(width, height);
  if (!framing) return null;
  return (
    <OrthographicCamera
      makeDefault
      position={CAMERA_POSITION}
      // Explicit frustum: these props are spread after drei's own size-derived values, so they win.
      // Derived from the same height as the zoom, keeping scale and framing consistent.
      left={framing.left}
      right={framing.right}
      top={framing.top}
      bottom={framing.bottom}
      zoom={framing.zoom}
      near={0.01}
      far={50000}
    />
  );
}

export default function VoxelCanvas() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref: visibilityRef, isVisible } = useCanvasVisibility<HTMLDivElement>();

  return (
    <div
      ref={visibilityRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing"
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Boundary en el árbol DOM: R3F relanza ahí los errores del canvas, así que un fallo al
          cargar el modelo degrada solo el hero en lugar de reemplazar toda la página por el Oops. */}
      <ErrorBoundary fallback={null}>
        {/* Pausa el render loop cuando el canvas está fuera de viewport o la pestaña está oculta,
            en vez de seguir dibujando frames que nadie ve. */}
        <Canvas gl={{ antialias: true, alpha: true }} frameloop={isVisible ? 'always' : 'never'}>
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
            autoRotate={!prefersReducedMotion}
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
