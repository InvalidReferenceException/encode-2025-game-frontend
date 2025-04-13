import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
    useCallback,
  } from 'react'
  import type { PlayerData, TileData, WorldData, WorldLocationData } from '../models/gameSchema'
import { TileTransactionState, TilePlayerAction, TileOwnership, TileFlavor } from '../models/tileFlavors'
  
  type GameContextType = {
    player: PlayerData
    world: WorldData
    movePlayer: (position: WorldLocationData) => void
    craftTile: (tile: TileData, prompt: string) => void
    rentTile: (tile: TileData) => void
    conquerTile: (tile: TileData) => void
    refreshPlayerFromBackend: () => void
    refreshWorldFromBackend: () => void
    selectedTile: TileData | null
    setSelectedTile: (tile: TileData | null) => void
    isCraftModalOpen: boolean
    setIsCraftModalOpen: (v: boolean) => void,
    isAudioEnabled: boolean
    setIsAudioEnabled: (enabled: boolean) => void
  }
  
  const GameContext = createContext<GameContextType | undefined>(undefined)
  
export function GameProvider({ children }: { children: ReactNode }) {
const [selectedTile, setSelectedTile] = useState<TileData | null>(null)
const [collidedTile, setCollidedTile] = useState<TileData | null>(null)
const [playerPositionTile, setPlayerPositionTile] = useState<TileData | null>(null)

const [isCraftModalOpen, setIsCraftModalOpen] = useState(false)
const [isAudioEnabled, setIsAudioEnabled] = useState(false)

function getTilePlayerAction(tileId: string): TilePlayerAction {
  if (tileId === selectedTile?.id) {
    return TilePlayerAction.SELECTED
  } else if (tileId === collidedTile?.id) {
    return TilePlayerAction.COLLIDED
  } else if (tileId === playerPositionTile?.id) {
    return TilePlayerAction.ENTERED
  } else {
    return TilePlayerAction.NONE
  }
}

    const [player, setPlayer] = useState<PlayerData>({
      id: 'player-1',
      balance: 100,
      rentEarned: 0,
      tilesOwned: [{
        rent: 20,
        id: "zz3hihf",
        position: {x: 0, y: 0},
        modelUrl: "",
       ownership: TileOwnership.PLAYER,
       flavor: TileFlavor.SAND,
       state: TileTransactionState.IDLE,
       playerAction: TilePlayerAction.NONE,
      }],
      currentTilePosition:{
        rent: 20,
        id: "zz3hihf",
        position: {x: 0, y: 0},
        modelUrl: "",
        ownership: TileOwnership.PLAYER,
        flavor: TileFlavor.SAND,
        state: TileTransactionState.IDLE,
        playerAction: TilePlayerAction.NONE,
       },
    },
)
  
    const [world, setWorld] = useState<WorldData>({
      tiles: [{
        rent: 20,
        id: "zz3hihf",
        position: {x: 0, y: 0},
        modelUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//SM_CommonHazel_Seedling_03_PP.glb",
        ownership: TileOwnership.PLAYER,
        flavor: TileFlavor.SAND,
        state: TileTransactionState.IDLE,
        playerAction: getTilePlayerAction("zz3hihf"),
       },
       {

        ownerId: "92u39jfo",
        rent: 20,
        id: "123h6kkf",
        position: {x: 0, y: 1},
        modelUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//SM_CommonHazel_Seedling_03_PP.glb",
        ownership: TileOwnership.WORLD,
        flavor: TileFlavor.SAND,
        state: TileTransactionState.IDLE,
        playerAction: getTilePlayerAction("123h6kkf"),
       },
       {
        ownerId: "92u39jfo",
        rent: 20,
        id: "123h644hf",
        position: {x: 1, y: 0},
        modelUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//SM_CommonHazel_Seedling_03_PP.glb",
        ownership: TileOwnership.WORLD,
        flavor: TileFlavor.GRASS,
        state: TileTransactionState.IDLE,
        playerAction: getTilePlayerAction("123h644hf"),
       },
       {
        rent: 20,
        id: "12seslihf",
        position: {x: 1, y: 1},
        modelUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//SM_CommonHazel_Seedling_03_PP.glb",
        ownership: TileOwnership.WORLD,
        flavor: TileFlavor.ROCK,
        state: TileTransactionState.IDLE,
        playerAction: getTilePlayerAction("12seslihf"),
       },
       {
        rent: 20,
        id: "12se2a4ihf",
        position: {x: 0, y: 2},
        modelUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//SM_CommonHazel_Seedling_03_PP.glb",
        ownership: TileOwnership.WORLD,
        flavor: TileFlavor.WATER,
        state: TileTransactionState.IDLE,
        playerAction: getTilePlayerAction("12se2a4ihf"),
       },
       {
        rent: 20,
        id: "12sesvihf",
        position: {x: 2, y: 0},
        modelUrl: "",
        ownership: TileOwnership.VOID,
        flavor: TileFlavor.VOID,
        state: TileTransactionState.IDLE,
        playerAction: getTilePlayerAction("12sesvihf"),
       },
       {
        rent: 20,
        id: "12se00vihf",
        position: {x: 2, y: 2},
        modelUrl: "",
        ownership: TileOwnership.VOID,
        flavor: TileFlavor.VOID,
        state: TileTransactionState.IDLE,
        playerAction: getTilePlayerAction("12se00vihf"),
       }
    ],
    })
  
    const movePlayer = useCallback((position: WorldLocationData) => {
      setPlayer(prev => ({ ...prev, position }))
    }, [])
  
    const rentTile = useCallback(async (tile: TileData) => {
      try {
        console.log("renting tile");
        if (tile.isYours == false && tile.rent){
          setPlayer(prev => ({
            ...prev,
            balance: prev.balance - tile.rent!,
          }));
        }

      } catch (err) {
        console.error('Failed to claim tile:', err)
      }
    }, [player.id])
  
    const conquerTile = useCallback(async (tile: TileData) => {
      try {
        console.log("renting tile");
        if (tile.isYours == false && tile.rent){
          player.balance -= tile.rent;
        }

      } catch (err) {
        console.error('Failed to claim tile:', err)
      }
    }, [player.id])

    const craftTile = useCallback(async (tile: TileData, prompt: string) => {
      try {
        console.log("renting tile");
        if (tile.isYours == false && tile.rent){
          player.balance -= tile.rent;
        }

      } catch (err) {
        console.error('Failed to claim tile:', err)
      }
    }, [player.id])

    const refreshPlayerFromBackend = useCallback(async () => {
      const res = await fetch(`/api/player/${player.id}`)
      const data: PlayerData = await res.json()
      setPlayer(data)
    }, [player.id])
  
    const refreshWorldFromBackend = useCallback(async () => {
      const res = await fetch(`/api/world`)
      const data: WorldData = await res.json()
      setWorld(data)
    }, [])
  
    const value: GameContextType = useMemo(
      () => ({
        player,
        world,
        movePlayer,
        rentTile,
        refreshPlayerFromBackend,
        refreshWorldFromBackend,
        craftTile,
        conquerTile,
        selectedTile,
        setSelectedTile,
        isCraftModalOpen,
        setIsCraftModalOpen,
        isAudioEnabled,
        setIsAudioEnabled,
      }),
      [player, world, movePlayer, rentTile, craftTile,conquerTile,  refreshPlayerFromBackend, refreshWorldFromBackend, selectedTile, setSelectedTile, isCraftModalOpen, setIsCraftModalOpen,   isAudioEnabled,
        setIsAudioEnabled]
    )
  
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
  }
  
  export function useReactGameContext() {
    const context = useContext(GameContext)
    if (!context) throw new Error('useGameContext must be used inside GameProvider')
    return context
  }