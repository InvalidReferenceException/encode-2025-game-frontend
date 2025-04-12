import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import Tile from './Tile'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useState } from 'react'
import { SpotLight } from '@react-three/drei'

export type AssetProps = {
  modelUrl: string
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export type VoidTileProps = {
  tilePosition?: [number, number],
  onSelect?: () => void
  onDeselect?: () => void
}

export default function VoidTile({
  tilePosition = [0, 0],
  onSelect = () => {},
  onDeselect = () => {},
}: VoidTileProps) {

  const [colliding, setColliding] = useState(false); 
  
  
  return (
    <RigidBody colliders="cuboid" type="fixed" onCollisionEnter={()=>{
        console.log('Collision ENTER detected!')
    }} onCollisionExit={()=>{
        console.log("Collision EXIT detected");
      }}>
      <Tile position={tilePosition} size={1.0} color='black' onPointerUp={()=> {
        console.log('Pointer UP detected!')
        onSelect()
        
      }}/>
      <CuboidCollider
        args={[0.5, 1, 0.5]}
        position={[tilePosition[0], 1, tilePosition[1]]} // center of collider 1 unit tall
      />
        {/* <SpotLight
        position={[tilePosition[0], 3, tilePosition[1]]}
        // target={targetRef}
        angle={0.5}
        attenuation={5}
        anglePower={4}
        intensity={colliding ? 5 : 0}
        color={"red"}
      /> */}
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