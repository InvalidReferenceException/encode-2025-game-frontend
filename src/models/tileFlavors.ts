
// tileFlavors.ts

import { TileData } from '../models/gameSchema'

export enum TileType {
  VOID = 'void',
  WORLD = 'world',
  PLAYER = 'player',
}

export type TileVisualState = {
  isCurrentTile: boolean
  isSelected: boolean
  isColliding: boolean
}

export type TileFlavor = {
  textureUrl: string | null
  modelUrls: string[]
  positionalSoundUrl?: string
  soundDistance?: number
  tags?: string[]
}

export type TileFlavorData = {
  textureUrl?: string | null
  modelUrl?: string
  positionalSoundUrl?: string
  soundDistance?: number
  soundRolloffFactor?: number
  soundMaxDistance?: number
  soundRefDistance?: number
  tags?: string[]
}

enum FloorType {
    GRASS = 'grass',
    ROCK = 'rock',
    SAND = 'sand',
    WATER = 'water',
    VOID = 'void',
}

function voidFlavor(visual: TileVisualState): TileFlavor {
  return {
    textureUrl: visual.isSelected
      ? '/assets/textures/selectedTile.jpg'
      : '/assets/textures/void.png',
    modelUrls: [
      ...(visual.isCurrentTile ? ['/assets/models/indicator.glb'] : []),
    ],
    positionalSoundUrl: visual.isColliding
      ? '/assets/sound/warningBuzz.mp3'
      : '/assets/sound/voidSound.mp3',
    soundDistance: 3,
    tags: [
      'void',
      ...(visual.isCurrentTile ? ['current'] : []),
      ...(visual.isSelected ? ['selected'] : []),
      ...(visual.isColliding ? ['colliding'] : []),
    ],
  }
}

function worldFlavor(visual: TileVisualState): TileFlavor {
  return {
    textureUrl: visual.isSelected
      ? '/assets/textures/selectedTile.jpg'
      : '/assets/textures/grass.jpg',
    modelUrls: [
      '/assets/models/grass1.glb',
      '/assets/models/rock1.glb',
      ...(visual.isCurrentTile ? ['/assets/models/indicator.glb'] : []),
    ],
    positionalSoundUrl: visual.isColliding
      ? '/assets/sound/warningBuzz.mp3'
      : undefined,
    tags: [
      'world',
      ...(visual.isCurrentTile ? ['current'] : []),
      ...(visual.isSelected ? ['selected'] : []),
      ...(visual.isColliding ? ['colliding'] : []),
    ],
  }
}

function playerFlavor(visual: TileVisualState): TileFlavor {
  return {
    textureUrl: visual.isSelected
      ? '/assets/textures/selectedTile.jpg'
      : '/assets/textures/playerTile.jpg',
    modelUrls: [
      '/assets/models/torch.glb',
      ...(visual.isCurrentTile ? ['/assets/models/indicator.glb'] : []),
    ],
    positionalSoundUrl: visual.isColliding
      ? '/assets/sound/warningBuzz.mp3'
      : '/assets/sound/playerHum.mp3',
    soundDistance: 2,
    tags: [
      'player',
      ...(visual.isCurrentTile ? ['current'] : []),
      ...(visual.isSelected ? ['selected'] : []),
      ...(visual.isColliding ? ['colliding'] : []),
    ],
  }
}

export function getTileFlavor(
  tileType: TileType,
  visualState: TileVisualState
): TileFlavor {
  switch (tileType) {
    case TileType.VOID:
      return voidFlavor(visualState)
    case TileType.WORLD:
      return worldFlavor(visualState)
    case TileType.PLAYER:
      return playerFlavor(visualState)
  }
}

// Utility: determine tile type from TileData
export function classifyTile(tile: TileData): TileType {
  if (tile.isYours) return TileType.PLAYER
  if (tile.isOwned) return TileType.WORLD
  return TileType.VOID
}
