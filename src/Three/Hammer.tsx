import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';

const MouseTrack: React.FC = () => {
  const ref = useRef<Mesh>(null);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  useFrame(({ mouse }) => {
    if (ref.current) {
      ref.current.position.x = mouse.x * aspect;
      ref.current.position.y = mouse.y * aspect;
    }
  });

  return (
    <mesh ref={ref}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
};

export default function Hammer() {
    return <MouseTrack />
}
