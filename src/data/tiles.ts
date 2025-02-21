// src/data/tiles.ts
export const MAHJONG_TILES = [
    '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', // Characters
    '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', // Bamboos
    '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', // Dots
    'east', 'south', 'west', 'north', // Winds
    'white', 'green', 'red', // Dragons
    // 'f1', 'f2', 'f3', 'f4', // Flowers
    // 's1', 's2', 's3', 's4', // Seasons
  ];
  
  // Create a full deck (4 copies of each tile)
  export const FIXED_DECK = [...MAHJONG_TILES, ...MAHJONG_TILES, ...MAHJONG_TILES, ...MAHJONG_TILES];

  // src/data/fixedHands.ts
export const FIXED_HANDS = {
  player: ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '1s', '2s', '3s', '4s', '5s'],
  robot1: ['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', 'east', 'south', 'west', 'north', 'white'],
  robot2: ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'green', 'red', 'f1', 'f2', 'f3'],
  robot3: ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', 's1', 's2', 's3', 's4', 'east'],
};