import { useFrame } from '@react-three/fiber'
import { JSX, useRef } from 'react'

type Props = JSX.IntrinsicElements['shaderMaterial']

export function FloorVoidMaterial({
  ...props
}: Props) {
  const ref = useRef<any>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime()
    }
  })

  return (
    <voidShaderMaterial
      ref={ref}
      // uColor1={new THREE.Color(color1)}
      // uColor2={new THREE.Color(color2)}
      {...props}
    />
  )
}

// VoidMaterial.ts
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// 1. ShaderMaterial definition
const VoidShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color(0.0, 0.0, 0.0),
    uColor2: new THREE.Color(0.15, 0.0, 0.25)
  },
  // Vertex shader
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv - 0.5;
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
  
    // Chaotic swirl animation
    float swirlSpeed = 6.0;
    float swirlDensity = 40.0;
    float swirl = sin(angle * swirlDensity - uTime * swirlSpeed + radius * 20.0);
  
    // Sharp, chaotic bands
    float band = step(0.0, swirl);
    float glow = smoothstep(0.8, 0.2, radius);
  
    // Suck light into center
    float blackHole = smoothstep(0.1, 0.0, radius); // very dark center
  
    // Outer rim eerie purple glow
    vec3 rimColor = uColor2 * (1.0 - blackHole) * glow * band;
  
    // Combine with crushed center
    vec3 color = mix(rimColor, uColor1, blackHole);
  
    gl_FragColor = vec4(color, 1.0);
  }
  `
)

// 2. Register with R3F JSX system
extend({ VoidShaderMaterial })

// 3. Export for manual use or ref
export { VoidShaderMaterial}