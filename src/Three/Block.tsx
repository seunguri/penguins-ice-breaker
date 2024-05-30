import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { Vector3 } from 'three';

// Block의 인터페이스라는 네이밍 컨벤션
interface IBlock {
  position: [number, number, number];
  args: [number, number, number, number];
  color: string;
  type: 'dynamic' | 'fixed';
}

/**
 * 육각기둥 컴퓨넌트를 생성하는 함수
 * 해당 컴포넌트를 클릭하면 아래 방향으로 힘을 가할 수 있음
 */
export default function Block({ position, args, color, type }: IBlock) {
  const ref = useRef<RapierRigidBody>(null);

  /**
   * 현재 컴포넌트의 ref를 이용하여 아래 방향으로 힘을 가하는 함수
   */
  const downwardForceHandler = () => {
    if (ref.current) {
      ref.current.applyImpulse(new Vector3(0, -10000, 0), true);
    }
  };

  return (
    <RigidBody type={type} colliders="hull" friction={1} ref={ref}>
      <mesh position={position} onClick={downwardForceHandler}>
        <cylinderGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  );
}
