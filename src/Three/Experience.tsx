import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Level from './Level';
import Lights from './Lights';

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <Physics
      // debug
      >
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
