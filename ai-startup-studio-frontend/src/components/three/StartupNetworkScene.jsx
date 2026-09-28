import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

function NetworkNode({ position, color }) {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </mesh>

      <sprite scale={[1.2, 0.4, 1]}>
        <spriteMaterial color="white" opacity={0.75} transparent />
      </sprite>
    </group>
  );
}

function StartupNetworkScene() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/70 text-sm text-slate-400">
        Startup ecosystem visualization
      </div>
    );
  }

  return (
    <div className="h-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <Canvas dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={1.5} />
        <pointLight position={[3, 3, 3]} intensity={2} />

        <NetworkNode position={[0, 0, 0]} color="#818cf8" />
        <NetworkNode position={[-1.4, 0.8, 0]} color="#22d3ee" />
        <NetworkNode position={[1.4, 0.8, 0]} color="#34d399" />
        <NetworkNode position={[-1.2, -1, 0]} color="#f59e0b" />
        <NetworkNode position={[1.2, -1, 0]} color="#a78bfa" />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.45}
        />
      </Canvas>
    </div>
  );
}

export default StartupNetworkScene;