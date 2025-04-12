// types.ts or inside GameProvider.tsx
export type Tile = {
    isYours: boolean // whether the tile is owned by the player
    isOwned: boolean
    id: string // unique identifier for the tile
    ownerId?: string // optional player or wallet ID
    rent?: number // rent per use
    position: WorldLocation
    textureUrl: string // texture image
    modelUrl: string // 3D model .glb
  }

export type Player = {
    id: string // unique identifier for the player
    walletId: string // wallet address
    balance: number // in-game currency
    rentEarned: number
    tilesOwned: Tile[] // list of owned tiles
    currentTilePosition: Tile
}

export type World = {
    tiles: Tile[] // list of tiles in the world
}

export type WorldLocation = {
    x: number // x coordinate
    y: number // y coordinate
}