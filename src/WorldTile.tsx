import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import Tile from './Tile'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

export type AssetProps = {
  modelUrl: string
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export type WorldTileProps = {
  textureUrl: string
  tilePosition?: [number, number]
  // tileSize?: number
  assets?: AssetProps[]
  isYours:boolean
  onPlayerEnter?: () => void
  onPlayerExit?: () => void
}

export default function WorldTile({
  textureUrl,
  tilePosition = [0, 0],
  assets = [],
  onPlayerEnter,
  onPlayerExit
}: WorldTileProps) {
  return (
        <RigidBody colliders="cuboid" type="fixed"
        onIntersectionEnter={()=>{
          console.log('Intersection ENTER detected!')
          if (onPlayerEnter) {
            onPlayerEnter()
          }
      }}
onIntersectionExit={()=>{
          console.log("Intersection EXIT detected");
          if (onPlayerExit) {
              onPlayerExit();
            }
          }}>
      <Tile position={tilePosition} size={1.0} textureUrl={textureUrl} color='red' />
      {assets.map((asset, index) => (
        <AssetInstance key={index} {...asset} />
      ))}
        <CuboidCollider
           args={[0.5, 1, 0.5]}
           position={[tilePosition[0], 1, tilePosition[1]]} // center of collider 1 unit tall
           sensor={true}
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