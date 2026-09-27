import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { ContactShadows, useGLTF } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import {
  FLOAT_AMPLITUDE,
  SHADOW_FAR,
  SUBJECT_HEIGHT,
  SUBJECT_NODES,
  deriveLayout,
  measureSubject,
} from './voxelFraming';

const MODEL_URL = '/models/kitty.glb';

/** Identity pivot used when the measurement is unusable, so no non-finite value reaches a matrix. */
const NO_PIVOT = new Vector3(0, 0, 0);

export function VoxelModel(props: ThreeElements['group']) {
  const floatRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  // Una sola medición define todo el montaje: corrección de pivote, escala y altura del piso.
  const layout = useMemo(() => {
    const { box, missing } = measureSubject(scene, SUBJECT_NODES);
    const derived = deriveLayout(box, SUBJECT_HEIGHT, missing);
    if (!derived.ok) {
      // Un nodo renombrado o ausente producía escala y pivote Infinity/NaN, que envenenan todas las
      // matrices del canvas. Se registra y se renderiza la escena sin mover en lugar de aplicarlo.
      console.error(`[VoxelModel] la medición del sujeto quedó ${derived.reason}; se renderiza ${MODEL_URL} sin escala.`);
    } else if (derived.missing.length > 0) {
      console.warn(`[VoxelModel] nodos del sujeto ausentes en ${MODEL_URL}: ${derived.missing.join(', ')}`);
    }
    return derived;
  }, [scene]);

  useFrame((state) => {
    if (floatRef.current) {
      floatRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * FLOAT_AMPLITUDE;
    }
  });

  const pivot = layout.ok ? layout.center : NO_PIVOT;

  return (
    <group {...props}>
      <group ref={floatRef}>
        {/* La traslación va DENTRO del grupo rotado y escalado, así que la corrección de pivote
            se escala y gira junto al modelo: el centro del sujeto cae exactamente en el origen
            del grupo, que es también el target de OrbitControls y el centro del zoom. */}
        <group rotation={[0, -Math.PI / 2, 0]} scale={layout.ok ? layout.scale : 1}>
          <group position={[-pivot.x, -pivot.y, -pivot.z]}>
            <primitive object={scene} />
          </group>
        </group>
      </group>

      {/* Hermano del grupo flotante: la sombra se queda fija en el piso mientras el modelo flota. */}
      {layout.ok && (
        <ContactShadows
          position={[0, layout.floorY, 0]}
          opacity={0.7}
          scale={10}
          blur={2}
          far={SHADOW_FAR}
          color="#000000"
        />
      )}
    </group>
  );
}

// Precargar el modelo
useGLTF.preload(MODEL_URL);
