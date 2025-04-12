// Game.tsx
import { Sky} from '@react-three/drei'
import WorldMap from './WorldMap'
import WorldTile from './WorldTile'
import VoidTile from './VoidTile'
import { useGameContext } from './context/useGame'
import Player from './Player'


export default function Scene() {
  const { world, player } = useGameContext()
  return (
    <>
      {/* <OrbitControls makeDefault/> */}
      {/* <MapControls/> */}
      {/* <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial/>
      </mesh> */}
    <Player initialPosition={[player.position.x, player.position.y, 0]} />
      <Sky />
      {/* <FlyControls /> */}
      <ambientLight intensity={100.0} />
      <directionalLight color="red" position={[0, 0, 5]} />

      <WorldMap>
      {world.tiles.map(tile =>  tile.isOwned ? (
        <WorldTile
          key={tile.id}
          textureUrl={tile.textureUrl}
          tilePosition={[tile.position.x, tile.position.y]}
          isYours={tile.isYours}
          // modelUrl={tile.modelUrl}
          // isYours={tile.isYours}
        />
      ) : (
        <VoidTile
          key={tile.id}
          tilePosition={[tile.position.x, tile.position.y]}
        />
      ))}
      </WorldMap>
    </>
  )
}