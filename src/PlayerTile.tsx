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

export type PlayerTileProps = {
  textureUrl: string
  tilePosition?: [number, number]
  assetUrl?:string
  isYours:boolean,
  onPlayerEnter?: () => void
  onPlayerExit?: () => void
}

export default function PlayerTile({
  textureUrl,
  assetUrl,
  tilePosition = [0, 0],
  onPlayerEnter,
  onPlayerExit
}: PlayerTileProps) {
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
      <Tile position={tilePosition} size={1.0} textureUrl={textureUrl} color='green' />
      {assetUrl && (
        <AssetInstance
          modelUrl={assetUrl}
          position={[tilePosition[0], 0.1, tilePosition[1]]} // Centered on tile
        />
      )}
    </RigidBody>
  )
}

function AssetInstance({
  modelUrl,
  position = [0, 0.1, 0], // Centered by default
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