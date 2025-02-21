// src/components/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import MahjongTile from './MahjongTile';
import { sortTiles } from '../utils/sortTiles';
import GameOverModal from './GameOverModal';
import HomeButton from '../Home/HomeButton';

interface DiscardedTile {
  tile: string;
  discardedBy: 'player' | 'robot';
}

const LandingPage: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [robotHands, setRobotHands] = useState<string[][]>([[], [], []]); // Hands for 3 robots
  const [discard, setDiscard] = useState<DiscardedTile[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0); // 0 = user, 1 = robot 1, 2 = robot 2, 3 = robot 3
  const [deck, setDeck] = useState<string[]>([]); // Fixed deck for drawing tiles
  const [morseIndex, setMorseIndex] = useState<number>(0);

  // Morse code for "ENDO" with wind tiles as gap fillers
  const MORSE_ENDO = [
    '3p', 'east', 'south', // E (.)
    '5s', '3p', 'west',    // N (-.)
    '2s', '4p', '9p',      // D (-..)
    '6s', '8s', '7s',      // O (---)
  ];

  // Initialize the game with fixed hands and deck
  const initializeGame = () => {
    // Player's hand (13 tiles)
    setPlayerHand(sortTiles(['1m', '3m', '4m', '8m', '9m', '1s', '7s', '3s', '2p', '8p', 'east', 'white', 'green']));

    // Robot hands (13 tiles each)
    setRobotHands([
      sortTiles(['1p', '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'east', 'south', 'west']), // Robot 1
      sortTiles(['1p', '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'east', 'south', 'west']), // Robot 2
      sortTiles(['1p', '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'east', 'south', 'west']), // Robot 3
    ]);

    // Deck (remaining tiles)
    setDeck([
      '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', // Characters
      '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', // Bamboos
      '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', // Dots
      'east', 'south', 'west', 'north', // Winds
      'white', 'green', 'red', // Dragons
      'f1', 'f2', 'f3', 'f4', // Flowers
      's1', 's2', 's3', 's4', // Seasons
    ]);

    // Reset other states
    setDiscard([]);
    setCurrentPlayer(0);
    setMorseIndex(0)
  };

  // Draw a tile from the deck
  const drawTile = (playerIndex: number) => {
    // if (deck.length === 0) {
    //   setGameOver(true);
    //   alert('No more tiles to draw. Game over!');
    //   return;
    // }

    const newTile = deck[0];
    const newDeck = deck.slice(1);
    setDeck(newDeck);

    if (playerIndex === 0) {
      // Player draws a tile (temporarily increases hand size to 14)
      const newHand = [...playerHand, newTile];
      setPlayerHand(newHand);
    } else {
      // Robot draws a tile (temporarily increases hand size to 14)
      const newRobotHands = [...robotHands];
      newRobotHands[playerIndex - 1] = [...newRobotHands[playerIndex - 1], newTile];
      setRobotHands(newRobotHands);
    }
  };

  // Discard a tile from the player's hand
  const discardTile = (playerIndex: number, tileIndex: number) => {
    let discardedTile: DiscardedTile;

    if (playerIndex === 0) {
      // Player discards a tile (returns hand size to 13)
      discardedTile = {
        tile: playerHand[tileIndex],
        discardedBy: 'player',
      };
      const newHand = [...playerHand];
      newHand.splice(tileIndex, 1);
      setPlayerHand(sortTiles(newHand));
    } else {
      // Robot discards a tile (returns hand size to 13)
      const newRobotHands = [...robotHands];
      discardedTile = {
        tile: newRobotHands[playerIndex - 1][tileIndex],
        discardedBy: 'robot',
      };
      newRobotHands[playerIndex - 1].splice(tileIndex, 1);
      setRobotHands(newRobotHands);
    }

    setDiscard((prevDiscard) => [...prevDiscard, discardedTile]);

    // Move to the next player
    setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % 4);
  };

  const discardMorseTile = () => {
    let discardedTile: DiscardedTile;
    discardedTile = {
      tile: MORSE_ENDO[morseIndex],
      discardedBy: 'robot',
    };
    const newDeck = deck.slice(1);
    setDeck(newDeck);
    setDiscard((prevDiscard) => [...prevDiscard, discardedTile]);
    setMorseIndex(morseIndex + 1)
    setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % 4);
  }

  // Handle user's discard
  const handleUserDiscard = (tileIndex: number) => {
    discardTile(0, tileIndex);
  };

  // Automatically handle turns
  useEffect(() => {
    if (morseIndex > MORSE_ENDO.length - 1) {
      setGameOver(true);
    }

    if(!gameOver) {
      if (currentPlayer === 0) {
        // Player's turn: draw a tile
        drawTile(0);
      } else {
  
        setTimeout(() => {
          discardMorseTile();
        }, 1000); // Wait 1 second before discarding
      }
    }

    
  }, [currentPlayer, gameOver]);

  // Initialize the game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="landing-page">

      {/* Tile Counter */}
      <div className="tile-counter">
        <h2>Tiles Left: {deck.length}</h2>
      </div>

      <>
        {/* User's Hand */}
        <div className="tiles-container">
          <h2>Your Hand</h2>
          <div className="tiles">
            {playerHand.map((tile, index) => (
              <MahjongTile
                key={index}
                tile={tile}
                isPlayable={currentPlayer === 0} // Only playable on user's turn
                onClick={() => handleUserDiscard(index)}
              />
            ))}
          </div>
        </div>

        {/* Discard Area */}
        <div className="tiles-container">
          <h2>Discard</h2>
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
        </div>

        {/* Robot Hands (for debugging) */}
        <div className="robot-hands">
        <h3>Other players</h3>
          {robotHands.map((hand, robotIndex) => (
            <div key={robotIndex}>
              <img
                  src="/images/bonnyclosed.png"
                  height={30}
                  alt="Bonny Mahjong"
                  style={{ position: 'relative', top: '5px' }} />
              <div className="tiles">
                {hand.map((tile, index) => (
                  <MahjongTile
                    key={index}
                    tile={tile}
                    isPlayable={false}
                    isHidden={true}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <br></br>
      </>
      {gameOver && (
        <GameOverModal discard={discard} onRestart={initializeGame} />
      )}
      <HomeButton/>
    </div>
  );
};

export default LandingPage;