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

  console.log(tux.scene);
  console.log(hammerGeometry);

  const Hammer: React.FC<{ geometry: THREE.BufferGeometry }> = ({ geometry }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [color, setColor] = useState('gray');
    const { camera, raycaster, mouse, scene } = useThree();

    // Rest of the code remains unchanged
    useFrame(() => {
      if (meshRef.current) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
          meshRef.current.position.copy(intersects[0].point);
        }
      }
    });

    const handleClick = () => {
      setColor(color === 'gray' ? 'red' : 'gray');
    };
  
    return (
      <mesh ref={meshRef} geometry={geometry} onClick={handleClick} scale={scale}>
        <meshStandardMaterial color={color} />
      </mesh>
    );
  };

  return (
    <group>
      <mesh
        geometry={boxGeometry}
        material={iceMaterial}
        position={[0, -0.1, 0]}
        scale={[10, 0.2, 10]}
        receiveShadow
      />

      <RigidBody
        type={'fixed'}
        colliders={'hull'}
        position={[0, 0.2, 0]}
        restitution={0.2}
        friction={0}
      >
        <primitive object={tux.scene} scale={0.01} />
      </RigidBody>
      <mesh geometry={hammerGeometry} >
        <meshStandardMaterial color="gray" />
      </mesh>
      <Hammer geometry={hammerGeometry} />
    </group>
  );
}

export default function Level() {
  return <BlockStart />;
}
