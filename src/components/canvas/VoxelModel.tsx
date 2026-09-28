import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { ContactShadows, useGLTF } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import {
  FLOAT_AMPLITUDE,
  SHADOW_FAR,
  SUBJECT_HEIGHT,
  SUBJECT_YAW,
  compositionAim,
  compositionShift,
  deriveLayout,
  measureComposition,
} from './voxelFraming';

const MODEL_URL = '/models/kitty.glb';

/** Identity pivot used when the measurement is unusable, so no non-finite value reaches a matrix. */
const NO_PIVOT = new Vector3(0, 0, 0);

export function VoxelModel(props: ThreeElements['group']) {
  const floatRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  // Una sola medición define todo el montaje: corrección de pivote, escala, altura del piso y el
  // desplazamiento de composición que centra lo que el ojo lee, no el bounding box del sujeto.
  const { layout, shift } = useMemo(() => {
    const { subject, body, assembly, missing } = measureComposition(scene);
    const derived = deriveLayout(subject, SUBJECT_HEIGHT, missing);
    if (!derived.ok) {
      // Un nodo renombrado o ausente producía escala y pivote Infinity/NaN, que envenenan todas las
      // matrices del canvas. Se registra y se renderiza la escena sin mover en lugar de aplicarlo.
      console.error(`[VoxelModel] la medición del sujeto quedó ${derived.reason}; se renderiza ${MODEL_URL} sin escala.`);
      return { layout: derived, shift: null };
    }
    if (derived.missing.length > 0) {
      console.warn(`[VoxelModel] nodos del sujeto ausentes en ${MODEL_URL}: ${derived.missing.join(', ')}`);
    }
    // Mismo `layout.ok` que gobierna pivote y escala: sin medición usable no se desplaza nada.
    const aim = compositionAim(body, assembly);
    const composed = aim ? compositionShift(aim, derived.center, derived.scale, SUBJECT_YAW) : null;
    if (!composed) {
      // Mejor sin desplazamiento que con un NaN entrando a la matriz del grupo.
      console.warn(`[VoxelModel] no se pudo medir la composición en ${MODEL_URL}; se renderiza sin desplazamiento.`);
    }
    return { layout: derived, shift: composed };
  }, [scene]);

  useFrame((state) => {
    if (floatRef.current) {
      floatRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * FLOAT_AMPLITUDE;
    }
  });

  const pivot = layout.ok ? layout.center : NO_PIVOT;
  const shiftVec = shift ?? NO_PIVOT;

  return (
    <group {...props}>
      {/* Desplazamiento de composición en el marco padre: es una traslación pura, fuera del grupo
          rotado y escalado, así que mueve juntos al modelo entero y a su sombra de contacto. */}
      <group position={[shiftVec.x, shiftVec.y, shiftVec.z]}>
        <group ref={floatRef}>
          {/* La traslación va DENTRO del grupo rotado y escalado, así que la corrección de pivote
              se escala y gira junto al modelo: el centro del sujeto cae exactamente en el origen
              del grupo, que es también el target de OrbitControls y el centro del zoom. */}
          <group rotation={[0, SUBJECT_YAW, 0]} scale={layout.ok ? layout.scale : 1}>
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
    </group>
  );
}

// Precargar el modelo
useGLTF.preload(MODEL_URL);
