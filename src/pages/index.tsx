import ForceController from '@/Components/ForceController';
import Experience from '@/Three/Experience';
import { Canvas } from '@react-three/fiber';
import Head from 'next/head';
import { Suspense } from 'react';


export default function Home() {
  return (
    <>
      <Head>
        <title>🐧🧊🔨</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <Suspense fallback={<div style={{backgroundColor: 'red', width:"100vw", height:"100vh"}}>Loading...</div>}> */}
      <ForceController />
      <Canvas
        style={{ cursor: 'none' }}
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [25, 40, 60],
        }}
      >
        <Experience />
      </Canvas>
      {/* </Suspense> */}
    </>
  );
}
