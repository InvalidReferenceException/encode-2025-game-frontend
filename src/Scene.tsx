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
  const { world, player, rentTile} = useGameContext()
    const { setSelectedTile, setIsCraftModalOpen } = useGameContext()
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
    
{/* <Environment
  preset="sunset" // or "sunrise", "night", "dawn", "warehouse", "forest", "apartment", etc.
  // background // sets scene.background = env map
/> */}
      {/* <Sky /> */}
      {/* <Environment /> */}
      {/* <FlyControls /> */}
      {/* <ambientLight intensity={5.0} /> */}
      {/* <directionalLight color="red" position={[0, 0, 5]} /> */}
      <color attach="background" args={['#202030']} />
      <fog attach="fog" args={['#202030', 5, 20]} />
{/* <ambientLight intensity={0.05} /> */}
<directionalLight position={[10, 100, 5]} intensity={0.5} castShadow />
      {/* <Sky
  sunPosition={[10, 20, 10]}
  turbidity={6}
  rayleigh={1}
  mieCoefficient={0.005}
  mieDirectionalG={0.8}
/> */}
      <WorldMap>
      {world.tiles.map(tile =>  tile.isOwned ? tile.isYours ?
              (
                <PlayerTile
                  key={tile.id}
                  textureUrl={tile.textureUrl}
                  tilePosition={[tile.position.x, tile.position.y]}
                  isYours={tile.isYours}
                  assetUrl={tile.modelUrl}
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
          assetUrl={tile.modelUrl}
          onPlayerEnter={() => {
            console.log("player enter on scene")
            rentTile(tile);
          }}
          // modelUrl={tile.modelUrl}
        />
      ) : (
        <VoidTile
          key={tile.id}
          tilePosition={[tile.position.x, tile.position.y]}
          onSelect={() => {
            console.log("tile selected on scene")
            setSelectedTile(tile);
            setIsCraftModalOpen(true);
          }}
        />
      ))}
      </WorldMap>
    </>
  )
}