import React, { JSX } from 'react'
import { TileData } from './models/gameSchema'
import VoidTile from './tiles/VoidTile'
import WorldTile  from './tiles/WorldTile'
import  PlayerTile  from './tiles/PlayerTile'
import { TileFlavor, TileTransactionState } from './models/tileFlavors'
import { FloorVoidMaterial } from './materials/FloorVoidMaterial'
import { FloorGrassMaterial } from './materials/FloorGrassMaterial'
import { FloorWaterMaterial } from './materials/FloorWaterMaterial'
import { FloorRockMaterial } from './materials/FloorRockMaterial'
import { FloorSandMaterial } from './materials/FloorSandMaterial'
import { useGameContext } from './context/useGame'

type GameTileProps = {
    tile: TileData
}
// Helper to get material by tile flavor
function getMaterialByFlavor(flavor: TileFlavor): JSX.Element {
    switch (flavor) {
        case TileFlavor.VOID:
        return <FloorVoidMaterial />
      case TileFlavor.GRASS:
        return <FloorGrassMaterial />
     case TileFlavor.ROCK:
        return <FloorRockMaterial />
    case TileFlavor.SAND:
        return <FloorSandMaterial />
    case TileFlavor.WATER:
        return <FloorWaterMaterial />
      default:
        return <FloorRockMaterial />
    }
  }

  // Helper: Visual FX per combined mechanic+action state
function getEffectsForState(state: TileTransactionState): JSX.Element[] {
    const effects: JSX.Element[] = []
  
    // // Example: both charging and collected
    // if (state.mechanic === 'charging' && state.playerAction === 'collected') {
    //   effects.push(
    //     <mesh key="charging-ring" rotation={[-Math.PI / 2, 0, 0]}>
    //       <ringGeometry args={[0.45, 0.5, 32]} />
    //       <meshBasicMaterial color="yellow" transparent opacity={0.4} />
    //     </mesh>,
    //     <mesh key="sparkle" position={[0, 0.1, 0]}>
    //       <sphereGeometry args={[0.05, 12, 12]} />
    //       <meshBasicMaterial color="white" emissive="cyan" />
    //     </mesh>
    //   )
    // }
  
    // // Example: crafting in progress
    // if (state.mechanic === 'crafting' && state.playerAction === 'interacted') {
    //   effects.push(
    //     <mesh key="craft-shimmer" position={[0, 0.15, 0]}>
    //       <icosahedronGeometry args={[0.1, 0]} />
    //       <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={0.6} />
    //     </mesh>
    //   )
    // }
  
    // Add more combinations here...
    return effects
  }

  
const GameTile: React.FC<GameTileProps> = ({ tile }) => {
    const material = getMaterialByFlavor(tile.flavor)
    const effects = getEffectsForState(tile.state)
    // getTilePlayerAction(tile.id),
    const { world, player, rentTile, setSelectedTile, setIsCraftModalOpen} = useGameContext()

  if (tile.ownership === 'void') {
    return <VoidTile material={material} effects={effects} tilePosition={[tile.position.x, tile.position.y]} onSelect={() => { 
        setSelectedTile(tile)
        setIsCraftModalOpen(true)
    }}
    />
  }

  if (tile.ownership === 'world') {
    return <WorldTile assetUrl={tile.modelUrl} material={material} effects={effects} tilePosition={[tile.position.x, tile.position.y]}  
    onPlayerEnter={() => {
        rentTile(tile)
    }} onPlayerExit={() => {}}
    />
  }

  if (tile.ownership === 'player') {
    return <PlayerTile assetUrl={tile.modelUrl}  material={material} effects={effects} tilePosition={[tile.position.x, tile.position.y]} 
    onPlayerEnter={()=>{}} onPlayerExit={()=>{}} />
  }

  return null
}

export default GameTile