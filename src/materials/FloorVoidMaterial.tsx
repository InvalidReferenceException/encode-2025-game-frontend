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
  
    // Animate swirl
    float swirlSpeed = 1.5;
    float swirlDensity = 20.0;
    float swirl = sin(angle * swirlDensity + radius * 10.0 - uTime * swirlSpeed);
  
    // Spiral contrast modulation (between 0–1)
    float mask = smoothstep(0.0, 0.5, swirl * 0.5 + 0.5);
  
    // Glow falloff
    float glow = smoothstep(0.4, 0.0, radius);
  
    // Blend two colors based on spiral
    vec3 spiralColor = mix(uColor1, uColor2, mask);
  
    // Fade out edges
    vec3 finalColor = spiralColor * glow;
  
    // gl_FragColor = vec4(finalColor, 1.0 - radius * 1.5);
    gl_FragColor = vec4(finalColor, 1.0);
  }
  `
)

// 2. Register with R3F JSX system
extend({ VoidShaderMaterial })

// 3. Export for manual use or ref
export { VoidShaderMaterial}