// src/utils/checkWinningHand.ts
import { sortTiles } from './sortTiles';

// Helper function to count occurrences of each tile
const countTiles = (hand: string[]): { [key: string]: number } => {
  return hand.reduce((counts, tile) => {
    counts[tile] = (counts[tile] || 0) + 1;
    return counts;
  }, {} as { [key: string]: number });
};

// Helper function to check for a straight in the same suit
const isStraight = (tiles: string[]): boolean => {
  if (tiles.length !== 3) return false;

  const suits = tiles.map((tile) => tile.replace(/\d/g, ''));
  const numbers = tiles.map((tile) => parseInt(tile.replace(/\D/g, ''), 10));

  // Check if all tiles are of the same suit
  if (new Set(suits).size !== 1) return false;

  // Check if the numbers form a straight (e.g., 1-2-3, 4-5-6, etc.)
  const sortedNumbers = numbers.sort((a, b) => a - b);
  return sortedNumbers[2] - sortedNumbers[1] === 1 && sortedNumbers[1] - sortedNumbers[0] === 1;
};

// Main function to check for a winning hand
export const checkWinningHand = (hand: string[]): boolean => {
  const sortedHand = sortTiles(hand);
  const tileCounts = countTiles(sortedHand);

  // Find all possible sets of 3 (triplets or straights)
  const sets: string[][] = [];
  const remainingTiles = [...sortedHand];

  // Check for triplets
  for (const tile in tileCounts) {
    if (tileCounts[tile] >= 3) {
      sets.push([tile, tile, tile]);
      remainingTiles.splice(remainingTiles.indexOf(tile), 3);
    }
  }

  // Check for straights
  for (let i = 0; i < remainingTiles.length - 2; i++) {
    const potentialStraight = remainingTiles.slice(i, i + 3);
    if (isStraight(potentialStraight)) {
      sets.push(potentialStraight);
      remainingTiles.splice(i, 3);
      i--; // Adjust index after removing tiles
    }
  }

  // Check for a pair
  const pair = Object.entries(tileCounts).find(([tile, count]) => count === 2);

  // Winning condition: 3 sets of 3 and 1 pair
  return sets.length === 3 && !!pair;
};