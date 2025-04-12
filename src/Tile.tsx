
// Tile.tsx
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export type TileProps = {
  position?: [number, number]
  size?: number
  textureUrl?: string
} 
// & MeshProps
const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)
export default function Tile({ position = [0, 0], size = 1, textureUrl, ...props }: TileProps) {
  // const texture = useTexture(textureUrl)

  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  // texture.repeat.set(1, 1)
const color = randomColor();
  return (
    <mesh position={[...position, 0]} {...props}>
      <planeGeometry args={[size, size]} />
      {/* map={texture} */}
      <meshStandardMaterial  color={color}/>
    </mesh>
  )
}
