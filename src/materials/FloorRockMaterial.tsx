import { useLoader } from '@react-three/fiber'
import { Color, TextureLoader } from 'three'
import { JSX } from 'react'
import { TextureType, TileBlendMaterial, TileMaterialProps } from './TileBlendMaterial'
import { Texture } from '@react-three/drei'

export function FloorRockMaterial(props: TileMaterialProps) {
//   const texture = useLoader<Texture, string>(TextureLoader, grassTextureURL)
  // Optional: wrap texture repeat if needed
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
//   texture.repeat.set(2, 2)

  // return <meshStandardMaterial map={texture} {...props} />
  return <TileBlendMaterial
    textureType={TextureType.Rock}
    uNeighborColors={[
      new Color('#ccc'),
      new Color('#bbb'),
      new Color('#aaa'),
      new Color('#999')
    ]}
    uIsSelected={props.isSelected ? 1 : 0}
    uIsCollided={props.isColliding ? 1 : 0}
    uIsForeign={props.isForeign ? 1 : 0}
  />
}