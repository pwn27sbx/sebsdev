import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PointMaterial, Points } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { usePortfolio } from '../../context/PortfolioContext';



// High-End Floating Monoliths
function FloatingGeometry() {
  const { darkMode } = usePortfolio();
  const groupRef = useRef<THREE.Group>(null);
  const count = 150; // Massively increased density

  // Generate deterministic random positions along the Z-axis tunnel
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const z = 500 - i * 5; // Spread from Z=500 down to Z=-250 to fill the intro flight path
      // Randomly position them around the camera path, some very close, some far
      const radius = 1 + Math.random() * 8; 
      const angle = Math.random() * Math.PI * 2;
      return {
        position: [Math.cos(angle) * radius, (Math.random() - 0.5) * 10, z] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: 0.8 + Math.random() * 2.5 // Larger objects
      };
    });
  }, [count]);

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <Float key={i} speed={2} rotationIntensity={3} floatIntensity={3}>
          <mesh position={item.position} rotation={item.rotation} scale={item.scale}>
            {/* Wireframe Icosahedrons look highly technical/modern */}
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color={darkMode ? '#ffffff' : '#00A889'}
              wireframe
              wireframeLinewidth={2}
              transparent
              opacity={darkMode ? 0.3 : 0.8} // Much more opaque in light mode to stand out against white
              emissive={darkMode ? '#ffffff' : '#00A889'}
              emissiveIntensity={darkMode ? 0.5 : 0.2} // Less emission in light mode so it doesn't wash out
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Procedural Particle Field (Kept for depth)
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { darkMode } = usePortfolio();

  const [positions] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 20;
      const theta = Math.random() * 2 * Math.PI;
      const z = 500 - Math.random() * 750; // Z from 500 to -250
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = z;
    }
    return [positions];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.02;
      // Hyperdrive scale effect: stretch the particle field on Z when scrolling fast
      const targetScaleZ = 1 + scrollState.speed * 0.2;
      ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, targetScaleZ, 0.1);
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={darkMode ? '#ffffff' : '#00A889'}
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

const scrollState = { speed: 0 };

// Camera controller that reacts to scroll
function ScrollCamera({ chromaticOffset }: { chromaticOffset: THREE.Vector2 }) {
  const vec = new THREE.Vector3();
  const lastScrollY = useRef(0);
  const isIntro = useRef(true);
  const introZ = useRef(500); // Start super far away for the reveal
  const introTime = useRef(0);
  const introDuration = 1.8;

  // Easing function approximating cubic-bezier(0.16, 1, 0.3, 1)
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  useFrame((state, delta) => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Calculate scroll speed for Warp Effect
    const deltaScroll = Math.abs(scrollY - lastScrollY.current);
    lastScrollY.current = scrollY;
    
    // Update global scroll state for other components
    scrollState.speed = THREE.MathUtils.lerp(scrollState.speed, deltaScroll, 0.1);

    // Chromatic Aberration Spike
    if (chromaticOffset) {
      const baseOffset = 0; // Set to 0 so the cursor doesn't look like 3 dots when standing still
      const speedOffset = Math.min(deltaScroll * 0.0002, 0.02);
      const targetOffset = baseOffset + speedOffset;
      
      chromaticOffset.x = THREE.MathUtils.lerp(chromaticOffset.x, targetOffset, 0.1);
      chromaticOffset.y = THREE.MathUtils.lerp(chromaticOffset.y, targetOffset, 0.1);
    }

    // Camera flies forward from Z=5 to Z=-180 based on scroll
    let targetZ = 5 - progress * 185;
    
    // Mouse Parallax (X and Y movement based on mouse pointer)
    // state.pointer.x and y go from -1 to 1
    const targetX = state.pointer.x * 2.5; 
    const targetY = state.pointer.y * 2.5;
    
    // Add a slight rotation based on scroll to make it dynamic
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, progress * Math.PI * 0.2, 0.05);
    
    // Also slightly tilt the camera based on mouse position for extra 3D feel
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, -state.pointer.y * 0.1, 0.05);
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, -state.pointer.x * 0.1, 0.05);

    // Speed Warp Effect: Stretch FOV based on scroll speed
    const targetFov = 60 + Math.min(scrollState.speed * 0.5, 50); // Cap max FOV warp
    const camera = state.camera as THREE.PerspectiveCamera;
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1);
    camera.updateProjectionMatrix();

    // The Reveal Animation - Exact sync with Framer Motion (1.8s)
    if (isIntro.current) {
      introTime.current += delta; 
      let t = introTime.current / introDuration;
      
      if (t >= 1) {
        t = 1;
        isIntro.current = false;
      }
      
      const easedT = easeOutQuart(t);
      introZ.current = 500 - (500 - targetZ) * easedT;
      targetZ = introZ.current;
    }

    vec.set(targetX, targetY, targetZ);
    state.camera.position.lerp(vec, isIntro.current ? 1 : 0.08);
  });

  return null;
}

export default function Scene() {
  const { darkMode } = usePortfolio();
  const chromaticOffset = useMemo(() => new THREE.Vector2(0.002, 0.002), []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 500], fov: 60 }}>
        <color attach="background" args={[darkMode ? '#0a0a0a' : '#f5f5f5']} />
        <fog attach="fog" args={[darkMode ? '#0a0a0a' : '#f5f5f5', 5, 80]} />
        <ambientLight intensity={1} />
        
        <ScrollCamera chromaticOffset={chromaticOffset} />
        <FloatingGeometry />
        <ParticleField />

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={darkMode ? 1.5 : 0} 
          />
          <ChromaticAberration 
            offset={chromaticOffset}
            blendFunction={BlendFunction.NORMAL} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
