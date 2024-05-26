import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Level from './Level.jsx';
import Lights from './Lights.jsx';
// import CustomOrbitControls from './OrbitControls.jsx';

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug>
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
