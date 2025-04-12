import { useMemo, useState } from 'react'
import { Vector3 } from 'three'
import { BoxCollider, RigidBody } from '@react-three/rapier'

type PlayerProps = {
  initialPosition?: [number, number, number]
  showModel?: boolean
}

export default function Player({ initialPosition = [0, 0.1, 0], showModel = true }: PlayerProps) {
  const [position, setPosition] = useState<Vector3>(new Vector3(...initialPosition))

  // Example of moving the player
  const moveTo = (newPos: [number, number, number]) => {
    setPosition(new Vector3(...newPos))
  }

  // Optional: Render a visual representation
  return (
    <RigidBody colliders={"cuboid"}>
    <group position={position.toArray()}>
      {showModel && (
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      )}
    </group>

    </RigidBody>
  )
}