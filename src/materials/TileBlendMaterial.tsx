/* eslint-disable @typescript-eslint/no-namespace */
import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber, useLoader } from '@react-three/fiber'
type Props = JSX.IntrinsicElements['shaderMaterial']

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import grassTextureURL from '../assets/textures/grass.png'
import sandTextureURL from '../assets/textures/sand.png'
import rockTextureURL from '../assets/textures/rock.png'

export const enum TextureType {
    Grass = 0,
    Sand = 1,
    Rock = 2,
    Water = 3,
    Void = 4,
    }
const textureUrls = {
    [TextureType.Grass]: grassTextureURL,
    [TextureType.Sand]: sandTextureURL,
    [TextureType.Rock]: rockTextureURL,
    [TextureType.Water]: null,
    [TextureType.Void]: null,
  }


  export type TileBlendShaderMaterial = ReactThreeFiber.Object3DNode<typeof TileBlendShaderMaterial, typeof TileBlendShaderMaterial>
  // Extend the shader material to be used in JSX
  // This allows us to use <tileBlendShaderMaterial /> in our components
  // and have TypeScript recognize it as a valid element

export type TileMaterialProps = JSX.IntrinsicElements['tileBlendShaderMaterial'] & {
    isSelected?: boolean
    isCollided?: boolean
    isForeign?: boolean
    textureType: TextureType
  }

  export function TileBlendMaterial({
    isSelected = false,
    isCollided = false,
    isForeign = false,
    textureType,
    ...props
  }: TileMaterialProps) {
    const ref = useRef<any>(null)

    const textures = {
      [TextureType.Grass]: useLoader(THREE.TextureLoader, textureUrls[TextureType.Grass]),
      [TextureType.Sand]: useLoader(THREE.TextureLoader, textureUrls[TextureType.Sand]),
      [TextureType.Rock]: useLoader(THREE.TextureLoader, textureUrls[TextureType.Rock]),
    }
  
    useFrame(({ clock }) => {
      if (ref.current) {
        ref.current.uniforms.uTime.value = clock.getElapsedTime();
        ref.current.uniforms.uIsSelected = isSelected ? 1.0 : 0.0;
        ref.current.uniforms.uIsCollided = isCollided ? 1.0 : 0.0;
        // ref.current.uniforms.uIsForeign = isForeign ? 1.0 : 0.0;
        ref.current.uniforms.uTextureTypeIndex.value = textureType;
        // console.log("isForeign ", isForeign );
      }
    });
  
    console.log("isForeignInside ", isForeign );
    return (
      <tileBlendShaderMaterial
        ref={ref}
        uTextureTypeIndex={textureType}
        uTextures0={textures[TextureType.Grass]}
        uTextures1={textures[TextureType.Sand]}
        uTextures2={textures[TextureType.Rock]}
        uIsSelected={isSelected ? 1.0 : 0.0}
        uIsCollided={isCollided ? 1.0 : 0.0}
        uIsForeign={isForeign ? 1.0 : 0.0}
        {...props}
      />
    )
  }

const TileBlendShaderMaterial = shaderMaterial(
    {
      uTime: { value: 0 },
      uTextureTypeIndex: { value: 0 },
      uTextures0: { value: null },
      uTextures1: { value: null },
      uTextures2: { value: null },
      uIsSelected: { value: 0.0 },
      uIsCollided: { value: 0.0 },
      uIsForeign: { value: 0.0 },
      uNeighborColors: {
        value: [
          new THREE.Color(),
          new THREE.Color(),
          new THREE.Color(),
          new THREE.Color()
        ]
      },
    },
    /* vertex shader */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    /* fragment shader */ `
      uniform float uTime;
      uniform int uTextureTypeIndex;
      uniform sampler2D uTextures0;
      uniform sampler2D uTextures1;
      uniform sampler2D uTextures2;
      uniform vec3 uNeighborColors[4];
      uniform float uIsSelected;
      uniform float uIsCollided;
      uniform float uIsForeign;
      varying vec2 vUv;
  
      void main() {
        vec4 baseColor;
  
        if (uTextureTypeIndex == 0) {
        baseColor = texture2D(uTextures0, vUv);
        } else if (uTextureTypeIndex == 1) {
        baseColor = texture2D(uTextures1, vUv);
        } else {
        baseColor = texture2D(uTextures2, vUv);
        }
  
        vec3 blended = baseColor.rgb;
  
        // if (uIsCollided > 0.5) {
        //   blended += 0.2;
        // }
  
        float luminance = dot(baseColor.rgb, vec3(0.299, 0.587, 0.114));
        float darkness = 1.0 - luminance;
        
        if (uIsForeign > 0.5) {
          float flatten = (luminance - 0.5) * 0.6; // shrink contrast around mid-gray
          blended -= vec3(flatten);
          // blended.r -= darkness * 0.3;
          // blended.g -= darkness * 0.5;
          // blended.b -= darkness * 0.5;
        } 
  
        // if (uIsSelected > 0.5) {
        //   blended.b += darkness * 0.3;
        //   blended.r -= darkness * 0.1;
        //   blended.g -= darkness * 0.1;
        // }
  
        gl_FragColor = vec4(blended, baseColor.a);
      }
    `
  )

extend({ TileBlendShaderMaterial })

export { TileBlendShaderMaterial}

declare global {
    namespace JSX {
      interface IntrinsicElements {
        tileBlendShaderMaterial: Object3DNode<typeof TileBlendShaderMaterial, typeof TileBlendShaderMaterial>
      }
    }
  }