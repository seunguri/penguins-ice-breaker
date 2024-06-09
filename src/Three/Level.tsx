import { useGLTF } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const iceMaterial = new THREE.MeshStandardMaterial({ color: 'aqua' });

function BlockStart() {
  const tux = useGLTF('./models/tux.glb');
  const hammerGeometry = useLoader(STLLoader, './models/hammer.stl');

  // 모델의 크기를 조정하기 위한 BoundingBox 계산
  const boundingBox = new THREE.Box3().setFromObject(
    new THREE.Mesh(hammerGeometry)
  );
  const size = new THREE.Vector3();
  boundingBox.getSize(size);
  const maxSize = Math.max(size.x, size.y, size.z);
  const desiredSize = 1; // 원하는 크기
  const scale = desiredSize / maxSize;

  const Hammer: React.FC<{ geometry: THREE.BufferGeometry }> = ({ geometry }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [color, setColor] = useState('chocolate');
    const { camera, raycaster, mouse, scene } = useThree();

    useFrame(() => {
      if (meshRef.current) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0 && intersects[0].object !== meshRef.current) {
          const point = intersects[0].point;
          point.x -= size.x * 0.15;
          point.y -= size.y * 0.05;
          meshRef.current.position.copy(point);
        }
      }
    });

    return (
      <mesh ref={meshRef} geometry={geometry} scale={0.1}>
        <meshStandardMaterial color={color} />
      </mesh>
    );
  };

  return (
    <group>
      {/* <mesh
        geometry={boxGeometry}
        material={iceMaterial}
        position={[0, -0.1, 0]}
        scale={[10, 0.2, 10]}
        receiveShadow
      /> */}

      <RigidBody
        type={'dynamic'}
        colliders={'hull'}
        position={[0, -0.5, 0]}
        mass={1}
      >
        <primitive object={tux.scene} scale={0.15} />
      </RigidBody>

      <Hammer geometry={hammerGeometry} />
    </group>
  );
}

export default function Level() {
  return <BlockStart />;
}
