import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

export function VoxelModel(props: any) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/dog.glb');

  // Pequeña animación flotante estilo craftz.dog
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} />
    </group>
  );
}

// Precargar el modelo para evitar tiempos de espera
useGLTF.preload('/models/dog.glb');
