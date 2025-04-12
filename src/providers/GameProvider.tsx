import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
    useCallback,
  } from 'react'
  import type { PlayerData, TileData, WorldData, WorldLocationData } from '../models/gameSchema'
  
  type GameContextType = {
    player: PlayerData
    world: WorldData
    movePlayer: (position: WorldLocationData) => void
    craftTile: (tile: TileData) => void
    rentTile: (tile: TileData) => void
    conquerTile: (tile: TileData) => void
    refreshPlayerFromBackend: () => void
    refreshWorldFromBackend: () => void
  }
  
  const GameContext = createContext<GameContextType | undefined>(undefined)
  
  export function GameProvider({ children }: { children: ReactNode }) {
    const [player, setPlayer] = useState<PlayerData>({
      id: 'player-1',
      walletId: '0xabc123',
      balance: 100,
      rentEarned: 0,
      tilesOwned: [{
       isYours: true,
       isOwned: true,
       rent: 20,
       id: "zz3hihf",
       position: {x: 0, y: 0},
       textureUrl: "",
       modelUrl: ""
      }],
      currentTilePosition:{
        isYours: true,
        isOwned: true,
        rent: 20,
        id: "zz3hihf",
        position: {x: 0, y: 0},
        textureUrl: "",
        modelUrl: ""
       },
    },
)
  
    const [world, setWorld] = useState<WorldData>({
      tiles: [{
        isYours: true,
        isOwned: true,
        rent: 20,
        id: "zz3hihf",
        position: {x: 0, y: 0},
        textureUrl: "",
        modelUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//SM_CommonHazel_Seedling_03_PP.glb"
       },
       {
        isYours: false,
        isOwned: true,
        ownerId: "92u39jfo",
        rent: 20,
        id: "123h6kkf",
        position: {x: 0, y: 1},
        textureUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//tile_1.png",
        modelUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//SM_CommonHazel_Seedling_03_PP.glb"
       },
       {
        isYours: false,
        isOwned: true,
        ownerId: "92u39jfo",
        rent: 20,
        id: "123h644hf",
        position: {x: 1, y: 0},
        textureUrl: "",
        modelUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//SM_CommonHazel_Seedling_03_PP.glb"
       },
       {
        isYours: false,
        isOwned: false,
        rent: 20,
        id: "12seslihf",
        position: {x: 1, y: 1},
        textureUrl: "",
        modelUrl: ""
       },
       {
        isYours: false,
        isOwned: false,
        rent: 20,
        id: "12se2a4ihf",
        position: {x: 0, y: 2},
        textureUrl: "",
        modelUrl: ""
       },
       {
        isYours: false,
        isOwned: false,
        rent: 20,
        id: "12sesvihf",
        position: {x: 2, y: 0},
        textureUrl: "",
        modelUrl: ""
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

    const craftTile = useCallback(async (tile: TileData) => {
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
        conquerTile
      }),
      [player, world, movePlayer, rentTile, craftTile,conquerTile,  refreshPlayerFromBackend, refreshWorldFromBackend]
    )
  
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
  }
  
  export function useReactGameContext() {
    const context = useContext(GameContext)
    if (!context) throw new Error('useGameContext must be used inside GameProvider')
    return context
  }