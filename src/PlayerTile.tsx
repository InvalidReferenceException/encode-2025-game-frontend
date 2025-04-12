import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import Tile from './Tile'

export type AssetProps = {
  modelUrl: string
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export type PlayerTileProps = {
  textureUrl: string
  tilePosition?: [number, number]
  // tileSize?: number
  assets?: AssetProps[]
  isYours:boolean
}

export default function PlayerTile({
  textureUrl,
  tilePosition = [0, 0],
  assets = [],
}: PlayerTileProps) {
  return (
    <group>
      <Tile position={tilePosition} size={1.0} textureUrl={textureUrl} color='green' />
      {assets.map((asset, index) => (
        <AssetInstance key={index} {...asset} />
      ))}
    </group>
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