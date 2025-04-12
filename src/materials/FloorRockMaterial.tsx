import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import grassTextureURL from '../assets/textures/rock.png'
import { JSX } from 'react'

export function FloorRockMaterial(props: JSX.IntrinsicElements['meshStandardMaterial']) {
  const texture = useLoader(TextureLoader, grassTextureURL)
//   const texture = useLoader<Texture, string>(TextureLoader, grassTextureURL)
  // Optional: wrap texture repeat if needed
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
//   texture.repeat.set(2, 2)

  return <meshStandardMaterial map={texture} {...props} />
}