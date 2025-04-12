import './App.css'
import { Canvas} from '@react-three/fiber'
// import {MapControls} from '@react-three/drei'
import WorldMap from './WorldMap'
import WorldTile from './WorldTile'
import { OrbitControls} from '@react-three/drei'
import Game from './Game'
import { useRef } from 'react'
import { Scene } from 'three'
import Hud from './Hud'

function App() {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()




  return (

      <div id="canvas-container" style={{ height: '100vh', width: '100vw' }}>
        <Hud onOpenBank={()=>{}} onOpenInventory={()=>{}} onOpenCraft={()=>{}} tileCount={1} bankBalance={10}/>
      <Canvas >

      <OrbitControls/>
          <Game/>

        </Canvas>
       </div>

  )
}

export default App
