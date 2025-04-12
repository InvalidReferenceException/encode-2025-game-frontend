import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import grassTextureURL from '../assets/textures/grass.png'
import { JSX } from 'react'

export function FloorGrassMaterial(props: JSX.IntrinsicElements['meshStandardMaterial']) {
  const texture = useLoader(TextureLoader, grassTextureURL)
//   const texture = useLoader<Texture, string>(TextureLoader, grassTextureURL)
  // Optional: wrap texture repeat if needed
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
//   texture.repeat.set(2, 2)

  return <meshStandardMaterial map={texture} {...props} />
}