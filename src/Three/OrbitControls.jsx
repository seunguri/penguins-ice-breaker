import { useEffect } from 'react';
import { extend, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const CustomOrbitControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  useEffect(() => {
    const handleTouchStart = (event) => {
      event.preventDefault();
    };

    domElement.addEventListener('scroll', handleTouchStart, {
      passive: false,
    });
    return () => {
      domElement.removeEventListener('scroll', handleTouchStart);
    };
  }, [domElement]);

  return <orbitControls args={[camera, domElement]} />;
};

export default CustomOrbitControls;
