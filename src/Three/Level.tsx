import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
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
      <mesh geometry={hammerGeometry} scale={[scale, scale, scale]}>
        <meshStandardMaterial color="gray" />
      </mesh>
    </group>
  );
}

export default function Level() {
  return <BlockStart />;
}
