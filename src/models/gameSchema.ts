// types.ts or inside GameProvider.tsx
export type TileData = {
    isYours: boolean // whether the tile is owned by the player
    isOwned: boolean
    id: string // unique identifier for the tile
    ownerId?: string // optional player or wallet ID
    rent?: number // rent per use
    position: WorldLocationData
    textureUrl: string // texture image
    modelUrl: string // 3D model .glb
  }

export type PlayerData = {
    id: string // unique identifier for the player address
    balance: number // in-game currency
    rentEarned: number
    tilesOwned: TileData[] // list of owned tiles
    currentTilePosition: TileData
}

export type WorldData = {
    tiles: TileData[] // list of tiles in the world
}

export type WorldLocationData = {
    x: number // x coordinate
    y: number // y coordinate
}