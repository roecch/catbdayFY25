// src/components/MahjongTile.tsx
import React from 'react';

interface MahjongTileProps {
  tile: string;
  isPlayable: boolean;
  isHidden?: boolean; // New prop to hide the tile
  discardedBy?: 'player' | 'robot'; // New prop to indicate who discarded the tile
  onClick: () => void;
}

const MahjongTile: React.FC<MahjongTileProps> = ({
  tile,
  isPlayable,
  isHidden,
  discardedBy,
  onClick,
}) => {
  // Map tile codes to Unicode characters or symbols
  const tileSymbols: { [key: string]: string } = {
    '1m': '🀇', '2m': '🀈', '3m': '🀉', '4m': '🀊', '5m': '🀋', '6m': '🀌', '7m': '🀍', '8m': '🀎', '9m': '🀏', // Characters
    '1s': '🀐', '2s': '🀑', '3s': '🀒', '4s': '🀓', '5s': '🀔', '6s': '🀕', '7s': '🀖', '8s': '🀗', '9s': '🀘', // Bamboos
    '1p': '🀙', '2p': '🀚', '3p': '🀛', '4p': '🀜', '5p': '🀝', '6p': '🀞', '7p': '🀟', '8p': '🀠', '9p': '🀡', // Dots
    east: '🀀', south: '🀁', west: '🀂', north: '🀃', // Winds
    white: '🀆', green: '🀅', red: '🀄', // Dragons
    f1: '🀢', f2: '🀣', f3: '🀤', f4: '🀥', // Flowers
    s1: '🀦', s2: '🀧', s3: '🀨', s4: '🀩', // Seasons
  };

  const tileSymbol = tileSymbols[tile] || tile; // Fallback to tile code if no symbol is found

  // Determine the tile's background color based on who discarded it
  const tileStyle: React.CSSProperties = {
    cursor: isPlayable ? 'pointer' : 'default',
    backgroundColor:
      discardedBy === 'player'
        ? '#aaffaa' // Light green for player's discarded tiles
        : discardedBy === 'robot'
        ? '#ffaaaa' // Light red for robot's discarded tiles
        : 'white', // Default background
    padding: '5px',
    borderRadius: '5px',
    margin: '2px',
  };

  return (
    <div
      style={tileStyle}
      className={`mahjong-tile ${isPlayable ? 'playable' : 'inactive'} ${isHidden ? 'hidden' : ''}`}
      onClick={isPlayable ? onClick : undefined}
    >
      {isHidden ? '🀫' : tileSymbol} {/* Show a placeholder for hidden tiles */}
    </div>
  );
};

export default MahjongTile;