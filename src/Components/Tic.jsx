import React, { useState,  } from 'react';
import { RotateCcw, HelpCircle, Trophy, Sparkles, Volume2, VolumeX } from 'lucide-react';

const BlinkTacToe = () => {
  // Emoji categories
  const emojiCategories = {
    animals: { name: '🐾 Animals', emojis: ['🐶', '🐱', '🐵', '🐰', '🦁', '🐸', '🐷', '🐻'] },
    food: { name: '🍕 Food', emojis: ['🍕', '🍟', '🍔', '🍩', '🎂', '🍎', '🍊', '🍇'] },
    sports: { name: '⚽ Sports', emojis: ['⚽', '🏀', '🏈', '🎾', '🏐', '🎳', '🏓', '⚾'] },
    nature: { name: '🌿 Nature', emojis: ['🌸', '🌺', '🌻', '🌷', '🌹', '🌲', '🍄', '🌊'] },
    space: { name: '🚀 Space', emojis: ['🚀', '🛸', '⭐', '🌙', '☀️', '🪐', '🌍', '☄️'] },
    faces: { name: '😊 Faces', emojis: ['😊', '😎', '🤩', '😍', '🥳', '😋', '🤗', '😉'] }
  };

  
  const [gamePhase, setGamePhase] = useState('setup'); 
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerEmojis, setPlayerEmojis] = useState({ 1: [], 2: [] });
  const [playerCategories, setPlayerCategories] = useState({ 1: null, 2: null });
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [showHelp, setShowHelp] = useState(false);
  // const [soundEnabled, setSoundEnabled] = useState(true);
  const [animatingCells, setAnimatingCells] = useState(new Set());
  const [vanishingCell, setVanishingCell] = useState(null);

  // for winner
  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows wins
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns wins
      [0, 4, 8], [2, 4, 6] // diagonals wins
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[b] && board[c]) {
        // Check if all three belong to the same player
        const playerA = board[a].player;
        const playerB = board[b].player;
        const playerC = board[c].player;
        
        if (playerA === playerB && playerB === playerC) {
          return { winner: playerA, line };
        }
      }
    }
    return null;
  };

  // Get random emoji from player's category
  const getRandomEmoji = (player) => {
    const category = playerCategories[player];
    if (!category) return null;
    const emojis = emojiCategories[category].emojis;
    return emojis[Math.floor(Math.random() * emojis.length)];
  };


  const handleCellClick = (index) => {
    if (gamePhase !== 'playing' || board[index] || animatingCells.has(index)) return;

    const newBoard = [...board];
    const emoji = getRandomEmoji(currentPlayer);
    const newPlayerEmojis = { ...playerEmojis };


    setAnimatingCells(prev => new Set([...prev, index]));
    setTimeout(() => {
      setAnimatingCells(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 500);

    // Check if player has 3 emojis (need to remove oldest)
    if (newPlayerEmojis[currentPlayer].length >= 3) {
      const oldestEmojiIndex = newPlayerEmojis[currentPlayer][0].index;
      
      // Cannot place 4th emoji where 1st was placed
      if (index === oldestEmojiIndex) {
        // Show feedback that this move is not allowed
        return;
      }

      // Remove oldest emoji with animation
      setVanishingCell(oldestEmojiIndex);
      setTimeout(() => {
        setVanishingCell(null);
      }, 300);

      newBoard[oldestEmojiIndex] = null;
      newPlayerEmojis[currentPlayer].shift();
    }

    // Place new emoji
    newBoard[index] = { emoji, player: currentPlayer };
    newPlayerEmojis[currentPlayer].push({ emoji, index });

    setBoard(newBoard);
    setPlayerEmojis(newPlayerEmojis);

    // Check for winner
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setGamePhase('gameOver');
      setScores(prev => ({
        ...prev,
        [`player${result.winner}`]: prev[`player${result.winner}`] + 1
      }));
      return;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  // Start game
  const startGame = () => {
    if (!playerCategories[1] || !playerCategories[2]) return;
    setGamePhase('playing');
    setBoard(Array(9).fill(null));
    setPlayerEmojis({ 1: [], 2: [] });
    setCurrentPlayer(1);
    setWinner(null);
    setWinningLine([]);
  };

  // Reset game
  const resetGame = () => {
    setGamePhase('setup');
    setBoard(Array(9).fill(null));
    setPlayerEmojis({ 1: [], 2: [] });
    setPlayerCategories({ 1: null, 2: null });
    setCurrentPlayer(1);
    setWinner(null);
    setWinningLine([]);
  };

  // Play again
  const playAgain = () => {
    setGamePhase('playing');
    setBoard(Array(9).fill(null));
    setPlayerEmojis({ 1: [], 2: [] });
    setCurrentPlayer(1);
    setWinner(null);
    setWinningLine([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-300" />
            Blink Tac Toe
            <Sparkles className="text-yellow-300" />
          </h1>
          <p className="text-white/80 text-lg">The emoji tic-tac-toe with a twist!</p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <HelpCircle size={20} />
            Help
          </button>
          {/*<button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            Sound
          </button>*/}
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <RotateCcw size={20} />
            New Game
          </button>
        </div>

        {/* Scores */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-white/80 text-sm">Player 1</div>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="text-yellow-300" size={20} />
              {scores.player1}
            </div>
            {playerCategories[1] && (
              <div className="text-white/60 text-sm">{emojiCategories[playerCategories[1]].name}</div>
            )}
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-white/80 text-sm">Player 2</div>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="text-yellow-300" size={20} />
              {scores.player2}
            </div>
            {playerCategories[2] && (
              <div className="text-white/60 text-sm">{emojiCategories[playerCategories[2]].name}</div>
            )}
          </div>
        </div>

        {/* Game Setup */}
        {gamePhase === 'setup' && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Choose Your Emoji Categories</h2>
            
            {/* Player 1 Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Player 1 - Choose Category:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(emojiCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setPlayerCategories(prev => ({ ...prev, 1: key }))}
                    disabled={playerCategories[2] === key}
                    className={`p-3 rounded-lg transition-all ${
                      playerCategories[1] === key
                        ? 'bg-blue-500 text-white scale-105'
                        : playerCategories[2] === key
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-white/30 text-white hover:bg-white/40'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Player 2 Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Player 2 - Choose Category:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(emojiCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setPlayerCategories(prev => ({ ...prev, 2: key }))}
                    disabled={playerCategories[1] === key}
                    className={`p-3 rounded-lg transition-all ${
                      playerCategories[2] === key
                        ? 'bg-green-500 text-white scale-105'
                        : playerCategories[1] === key
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-white/30 text-white hover:bg-white/40'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startGame}
              disabled={!playerCategories[1] || !playerCategories[2]}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Game! 🚀
            </button>
          </div>
        )}

        {/* Game Board */}
        {(gamePhase === 'playing' || gamePhase === 'gameOver') && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            {/* Current Player Indicator */}
            {gamePhase === 'playing' && (
              <div className="text-center mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold ${
                  currentPlayer === 1 ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  Player {currentPlayer}'s Turn
                  {playerCategories[currentPlayer] && (
                    <span className="text-2xl">
                      {emojiCategories[playerCategories[currentPlayer]].emojis[0]}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Winner Message */}
            {gamePhase === 'gameOver' && (
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full inline-flex items-center gap-2 text-xl font-bold">
                  <Trophy size={24} />
                  Player {winner} Wins! 🎉
                </div>
              </div>
            )}

            {/* Game Grid */}
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-6">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className={`aspect-square bg-white/30 rounded-xl flex items-center justify-center text-4xl md:text-5xl transition-all duration-300 hover:scale-105 hover:bg-white/40 ${
                    winningLine.includes(index) ? 'bg-yellow-400/50 animate-pulse' : ''
                  } ${
                    animatingCells.has(index) ? 'animate-bounce' : ''
                  } ${
                    vanishingCell === index ? 'animate-ping' : ''
                  } ${
                    gamePhase === 'gameOver' ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  disabled={gamePhase === 'gameOver'}
                >
                  {cell && (
                    <span className={`${vanishingCell === index ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                      {cell.emoji}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Player Status */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-white/80 text-sm mb-1">Player 1 Emojis</div>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-blue-400 flex items-center justify-center text-sm ${
                        playerEmojis[1][i] ? 'bg-blue-400' : 'bg-transparent'
                      }`}
                    >
                      {playerEmojis[1][i]?.emoji}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-white/80 text-sm mb-1">Player 2 Emojis</div>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-green-400 flex items-center justify-center text-sm ${
                        playerEmojis[2][i] ? 'bg-green-400' : 'bg-transparent'
                      }`}
                    >
                      {playerEmojis[2][i]?.emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Play Again Button */}
            {gamePhase === 'gameOver' && (
              <div className="text-center">
                <button
                  onClick={playAgain}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:scale-105 transition-transform"
                >
                  Play Again! 🎮
                </button>
              </div>
            )}
          </div>
        )}

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">How to Play Blink Tac Toe</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>🎯 Objective:</strong> Get 3 of your emojis in a row (horizontal, vertical, or diagonal)</p>
                <p><strong>🎮 Setup:</strong> Each player chooses a different emoji category</p>
                <p><strong>🔄 Turns:</strong> Players take turns placing random emojis from their category</p>
                <p><strong>✨ Vanishing Rule:</strong> You can only have 3 emojis on the board. When you place a 4th, your oldest emoji disappears!</p>
                <p><strong>🚫 Restriction:</strong> You cannot place your 4th emoji where your 1st emoji was</p>
                <p><strong>🏆 Winning:</strong> First to get 3 in a row wins!</p>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Got it! 👍
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlinkTacToe;