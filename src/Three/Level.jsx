import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const iceMaterial = new THREE.MeshStandardMaterial({ color: "aqua" })

function BlockStart({ position = [ 0, 0, 0 ] })
{
    const tux = useGLTF('./tux.glb')

    return <group position={ position }>
        <mesh geometry={ boxGeometry } material={ iceMaterial } position={ [0, -0.1, 0] } scale={ [10, 0.2, 10] } receiveShadow />

        <RigidBody type={"fixed"} colliders={"hull"} position={ [0, 0.2, 0] } restitution={ 0.2 } friction={ 0 } >
            <primitive object={ tux.scene } scale={ 0.01 } />
        </RigidBody>
    </group>
}

export default function Level()
{
    return <>
        <BlockStart />
    </>
}
