import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Level from './Level';
import Lights from './Lights';
import Floor from './Floor';

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <Physics>
        <Lights />
        <Level />
        <Floor />
      </Physics>
    </>
  );
}
