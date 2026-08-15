'use client';

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";

/**
 * Decorative floating 3D shapes + sparkle field around the hero window scene.
 * World coordinates: the hero window group sits at [0, -25, 5.69].
 */
const FloatingShapes = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={1.4} floatIntensity={2.2}>
        <mesh position={[-4.4, -23.6, 4.2]}>
          <icosahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial color="white" wireframe />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={1.8} floatIntensity={1.6}>
        <mesh position={[4.3, -26.2, 5]}>
          <torusKnotGeometry args={[0.45, 0.14, 128, 24]} />
          <meshStandardMaterial color="#eaf6ff" roughness={0.25} metalness={0.35} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2.6}>
        <mesh position={[-3.9, -27, 6.4]}>
          <sphereGeometry args={[0.55, 64, 64]} />
          <MeshDistortMaterial color="#ffffff" roughness={0.15} metalness={0.1} distort={0.45} speed={2.4} />
        </mesh>
      </Float>

      <Float speed={2.4} rotationIntensity={2} floatIntensity={1.4}>
        <mesh position={[3.6, -22.8, 3.6]} rotation={[0.6, 0.4, 0]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="white" wireframe />
        </mesh>
      </Float>

      <Sparkles
        count={140}
        scale={[14, 9, 10]}
        position={[0, -25, 5]}
        size={3.2}
        speed={0.35}
        color="white"
        opacity={0.65}
      />
      <Sparkles
        count={60}
        scale={[10, 5, 6]}
        position={[0, 1, -8]}
        size={2.4}
        speed={0.25}
        color="white"
        opacity={0.5}
      />
    </>
  );
};

export default FloatingShapes;
