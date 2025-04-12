import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import Tile from './Tile'
import { RigidBody } from '@react-three/rapier'

export type AssetProps = {
  modelUrl: string
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export type VoidTileProps = {
  tilePosition?: [number, number]
}

export default function WorldTile({
  tilePosition = [0, 0],
}: VoidTileProps) {
  return (
    <RigidBody colliders="cuboid" onCollisionEnter={()=>{
        console.log('Collision ENTER detected!')
    }} onCollisionExit={()=>{
        console.log("Collision EXIT detected");
    }}>
      <Tile position={tilePosition} size={1.0} />
    </RigidBody>
  )
}

function AssetInstance({
  modelUrl,
  position = [0, 0.1, 0], // slightly above tile
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}: AssetProps) {
  const gltf = useLoader(GLTFLoader, modelUrl)

  return (
    <primitive
      object={gltf.scene.clone()}
      position={position}
      scale={scale}
      rotation={rotation}
      dispose={null}
    />
  )
}