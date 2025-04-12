// Game.tsx
import { Canvas} from '@react-three/fiber'
import { OrbitControls, Sky} from '@react-three/drei'
import WorldMap from './WorldMap'
import WorldTile from './WorldTile'
import Hud from './Hud'
import Scene from './Scene'
// import WorldMap from './WorldMap'
// import WorldTile from './WorldTile'
// import tileData from './tileData'
import { useGameContext } from '../providers/GameProvider'
import { Suspense } from 'react'
import { Physics } from '@react-three/rapier'

export default function Game() {

  return (
    <div id="canvas-container" style={{ height: '100vh', width: '100vw' }}>
      <Hud/>
      <Canvas>
        {/* <OrbitControls/> */}
        <Suspense>
          <Physics gravity={[0, 0.0, 0]}>
            
              <Scene/>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}