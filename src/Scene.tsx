// Game.tsx
import { Environment, Sky} from '@react-three/drei'
import WorldMap from './WorldMap'
import WorldTile from './WorldTile'
import VoidTile from './VoidTile'
import { useGameContext } from './context/useGame'
import { Player } from './Player'
import { useInputControl } from './useInputControl'
import PlayerTile from './PlayerTile'


export default function Scene() {
  const { world, player } = useGameContext()
  const getInput = useInputControl();
  return (
    <>
      {/* <OrbitControls makeDefault/> */}
      {/* <MapControls/> */}
      {/* <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial/>
      </mesh> */}
    <Player  input={getInput}/>
    
      {/* <Sky /> */}
      {/* <Environment /> */}
      {/* <FlyControls /> */}
      <ambientLight intensity={5.0} />
      <directionalLight color="red" position={[0, 0, 5]} />

      <WorldMap>
      {world.tiles.map(tile =>  tile.isOwned ? tile.isYours ?
              (
                <PlayerTile
                  key={tile.id}
                  textureUrl={tile.textureUrl}
                  tilePosition={[tile.position.x, tile.position.y]}
                  isYours={tile.isYours}
                  // modelUrl={tile.modelUrl}
                  // isYours={tile.isYours}
                />
              ) :
       (
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