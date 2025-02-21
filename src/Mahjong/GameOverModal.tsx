// src/components/GameOverModal.tsx
import React from 'react';
import MahjongTile from './MahjongTile';
import "./GameOverModal.css"
import HomeButton from '../Home/HomeButton';
import { useNavigate } from 'react-router';

interface GameOverModalProps {
  discard: { tile: string; discardedBy: 'player' | 'robot' }[];
  onRestart: () => void;
}

    
const GameOverModal: React.FC<GameOverModalProps> = ({ discard, onRestart }) => {
    const navigate = useNavigate();

    // i
    const navigateToHome= () => {
        navigate('/');
      };
  return (
    <div className="game-over-modal">
      <div className="modal-content">
        <h2>Game Over!</h2>
        <h3>Discarded Tiles:</h3>
        <div className="tiles">
          {discard.map((discardedTile, index) => (
            <MahjongTile
              key={index}
              tile={discardedTile.tile}
              isPlayable={false}
              discardedBy={discardedTile.discardedBy}
              onClick={() => {}}
            />
          ))}
        </div>
            <div className="homebutton2">
                <div onClick={navigateToHome}>
                    🏠
                </div>
            </div>
      </div>
    </div>
  );
};

export default GameOverModal;