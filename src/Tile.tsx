
// Tile.tsx
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export type TileProps = {
  position?: [number, number]
  size?: number
  textureUrl?: string
  color?: string
  modelUrl?: string
  onPointerDown?: () => void
  onPointerUp?: () => void
} 
// & MeshProps
const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)
export default function Tile({ position = [0, 0], size = 1, textureUrl, color, onPointerDown, onPointerUp, ...props }: TileProps) {
  // const texture = useTexture(textureUrl)

  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  // texture.repeat.set(1, 1)
const finalColor = color ? color : randomColor();
  return (
    <group position={[position[0], 0, position[1]]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} {...props} onPointerDown={() => {if(onPointerDown){onPointerDown()}
      console.log('Pointer DOWN detected!')}
      
    } onPointerUp={() => {
      if(onPointerUp){onPointerUp()}
      console.log('Pointer UP detected!')}
    }>
      <planeGeometry args={[size, size]}  />
      {/* map={texture} */}
      <meshStandardMaterial  color={finalColor} />
    </mesh>
    </group>
  )
}
