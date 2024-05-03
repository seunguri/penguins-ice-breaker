import * as THREE from 'three'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const iceMaterial = new THREE.MeshStandardMaterial({ color: 'ice' })

function BlockStart({ position = [ 0, 0, 0 ] })
{
    return <group position={ position }>
        <mesh geometry={ boxGeometry } material={ iceMaterial } position={ [0, -0.1, 0] } scale={ [10, 0.2, 10] } receiveShadow>
        </mesh>
    </group>
}

export default function Level()
{
    return <>
        <BlockStart />
    </>
}
