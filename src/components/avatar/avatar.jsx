import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';

function Model() {
  const gltf = useGLTF('/robot.glb');
  const modelRef = useRef();

  // Rotate the model continuously
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={1.5}
      rotation={[Math.PI, 0, 0]}
      position={[0, -1.5, 0]}
      castShadow
      receiveShadow
    />
  );
}

const Avatar = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[2, 2, 2]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Model />
      <OrbitControls />
    </Canvas>
  );
};

export default Avatar;
