// src/utils/sortTiles.ts
export const sortTiles = (tiles: string[]): string[] => {
    const suitOrder: { [key: string]: number } = {
      m: 1, // Characters
      s: 2, // Bamboos
      p: 3, // Dots
      east: 4,
      south: 5,
      west: 6,
      north: 7,
      white: 8,
      green: 9,
      red: 10,
      f1: 11,
      f2: 12,
      f3: 13,
      f4: 14,
      s1: 15,
      s2: 16,
      s3: 17,
      s4: 18,
    };
  
    return tiles.sort((a, b) => {
      // Extract suit and number from the tile
      const aSuit = a.replace(/\d/g, ''); // Remove numbers to get the suit
      const bSuit = b.replace(/\d/g, '');
      const aNumber = parseInt(a.replace(/\D/g, ''), 10) || 0; // Extract number or default to 0
      const bNumber = parseInt(b.replace(/\D/g, ''), 10) || 0;
  
      // Compare suits first
      if (suitOrder[aSuit] !== suitOrder[bSuit]) {
        return suitOrder[aSuit] - suitOrder[bSuit];
      }
  
      // If suits are the same, compare numbers
      return aNumber - bNumber;
    });
  };