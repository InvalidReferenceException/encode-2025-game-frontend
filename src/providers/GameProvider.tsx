import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
    useCallback,
  } from 'react'
  import type { Player, Tile, World, WorldLocation } from '../models/gameSchema'
  
  type GameContextType = {
    player: Player
    world: World
    movePlayer: (position: WorldLocation) => void
    claimTile: (tile: Tile) => void
    refreshPlayerFromBackend: () => void
    refreshWorldFromBackend: () => void
  }
  
  const GameContext = createContext<GameContextType | undefined>(undefined)
  
  export function GameProvider({ children }: { children: ReactNode }) {
    const [player, setPlayer] = useState<Player>({
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
  
    const [world, setWorld] = useState<World>({
      tiles: [{
        isYours: true,
        isOwned: true,
        rent: 20,
        id: "zz3hihf",
        position: {x: 0, y: 0},
        textureUrl: "",
        modelUrl: ""
       },
       {
        isYours: false,
        isOwned: true,
        ownerId: "92u39jfo",
        rent: 20,
        id: "123h6kkf",
        position: {x: 0, y: 1},
        textureUrl: "https://plvhqthnttjouhndvgyu.supabase.co/storage/v1/object/public/encode-assets//tile_1.png",
        modelUrl: ""
       },
       {
        isYours: false,
        isOwned: true,
        ownerId: "92u39jfo",
        rent: 20,
        id: "123h644hf",
        position: {x: 1, y: 0},
        textureUrl: "",
        modelUrl: ""
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
  
    const movePlayer = useCallback((position: WorldLocation) => {
      setPlayer(prev => ({ ...prev, position }))
    }, [])
  
    const claimTile = useCallback(async (tile: Tile) => {
      try {
        // Send claim request to backend
        await fetch(`/api/claim-tile`, {
          method: 'POST',
          body: JSON.stringify({ playerId: player.id, tileId: tile.id }),
          headers: { 'Content-Type': 'application/json' },
        })
  
        // On success, refresh world and player
        refreshPlayerFromBackend()
        refreshWorldFromBackend()
      } catch (err) {
        console.error('Failed to claim tile:', err)
      }
    }, [player.id])
  
    const refreshPlayerFromBackend = useCallback(async () => {
      const res = await fetch(`/api/player/${player.id}`)
      const data: Player = await res.json()
      setPlayer(data)
    }, [player.id])
  
    const refreshWorldFromBackend = useCallback(async () => {
      const res = await fetch(`/api/world`)
      const data: World = await res.json()
      setWorld(data)
    }, [])
  
    const value: GameContextType = useMemo(
      () => ({
        player,
        world,
        movePlayer,
        claimTile,
        refreshPlayerFromBackend,
        refreshWorldFromBackend,
      }),
      [player, world, movePlayer, claimTile, refreshPlayerFromBackend, refreshWorldFromBackend]
    )
  
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
  }
  
  export function useReactGameContext() {
    const context = useContext(GameContext)
    if (!context) throw new Error('useGameContext must be used inside GameProvider')
    return context
  }