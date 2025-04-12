// Game.tsx
import { Sky} from '@react-three/drei'
import WorldMap from './WorldMap'
import WorldTile from './WorldTile'
// import WorldMap from './WorldMap'
// import WorldTile from './WorldTile'
// import tileData from './tileData'
const tileData = [
  {
    textureUrl: 'assets/tile_assets/demo_tile/floor/grass_texture.jpg',
    position: [0, 0],
    assets: [
      {
        modelUrl: 'assets/tile_assets/demo_tile/tree.glb',
        position: [0, 0.1, 0],
        scale: [0.5, 0.5, 0.5],
      },
    ],
  }
]
export default function Game() {
  return (
    <>
      {/* <OrbitControls makeDefault/> */}
      {/* <MapControls/> */}
      {/* <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial/>
      </mesh> */}
    
      <Sky />
      {/* <FlyControls /> */}
      <ambientLight intensity={100.0} />
      <directionalLight color="red" position={[0, 0, 5]} />

      <WorldMap>
        <WorldTile
          textureUrl={tileData[0].textureUrl}
          tilePosition={[tileData[0].position[0], tileData[0].position[1]]}
        />
      </WorldMap>
    </>
  )
}