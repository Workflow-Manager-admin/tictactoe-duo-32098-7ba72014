import React, { useState } from 'react';
import './App.css';

// Helper for generating simple board layout
const BOARD_SIZE = 10;
const TOTAL_SQUARES = BOARD_SIZE * BOARD_SIZE;

// Example snakes/ladders: format { start: xx, end: xx }
const SNAKES = [
  { start: 16, end: 6 },
  { start: 49, end: 11 },
  { start: 62, end: 19 },
  { start: 87, end: 24 },
  { start: 93, end: 73 },
  { start: 95, end: 75 },
  { start: 98, end: 78 },
];
const LADDERS = [
  { start: 1, end: 38 },
  { start: 4, end: 14 },
  { start: 9, end: 31 },
  { start: 21, end: 42 },
  { start: 28, end: 84 },
  { start: 36, end: 44 },
  { start: 51, end: 67 },
  { start: 71, end: 91 },
  { start: 80, end: 100 }
];

function getSpecialDestination(pos) {
  for (const l of LADDERS) if (l.start === pos) return l.end;
  for (const s of SNAKES) if (s.start === pos) return s.end;
  return null;
}

function getBoardGrid() {
  // Snake and Ladder boards reverse direction on every row
  const rows = [];
  let num = TOTAL_SQUARES;
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push(num--);
    }
    if ((i % 2) === 1) row.reverse();
    rows.push(row);
  }
  return rows;
}

// PUBLIC_INTERFACE
function SnakeAndLadder() {
  // State: two players, their positions, turn, lastDice
  const [positions, setPositions] = useState([1, 1]);
  const [player, setPlayer] = useState(0);
  const [dice, setDice] = useState(null);
  const [status, setStatus] = useState('Game on! Player 1 starts.');
  const [winner, setWinner] = useState(null);

  // Handle dice roll and move
  const handleRollDice = () => {
    if (winner) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);
    let newPositions = [...positions];
    let current = newPositions[player];

    // Only move if not exceeding 100
    if (current + roll <= TOTAL_SQUARES) {
      current += roll;
      // Check for snake/ladder
      const slideTo = getSpecialDestination(current);
      if (slideTo) current = slideTo;
    }
    newPositions[player] = current;
    setPositions(newPositions);

    // Win check
    if (current === TOTAL_SQUARES) {
      setWinner(player);
      setStatus(`Player ${player + 1} wins!`);
      return;
    }
    setPlayer(1 - player);
    setStatus(`Player ${1 - player + 1}'s turn.`);
  };

  const handleReset = () => {
    setPositions([1, 1]);
    setPlayer(0);
    setDice(null);
    setStatus('Game on! Player 1 starts.');
    setWinner(null);
  };

  // Board: highlight player positions & special cells
  const boardGrid = getBoardGrid();

  function renderSquare(number) {
    const isPlayer1 = positions[0] === number;
    const isPlayer2 = positions[1] === number;
    const isSnake = SNAKES.some(s => s.start === number);
    const isLadder = LADDERS.some(l => l.start === number);
    const squareStyles = {
      background: isPlayer1 && isPlayer2
        ? "linear-gradient(135deg, var(--ttt-primary) 60%, var(--ttt-accent) 100%)"
        : isPlayer1
        ? "var(--ttt-primary)"
        : isPlayer2
        ? "var(--ttt-accent)"
        : isLadder
        ? "#c9f8aa"
        : isSnake
        ? "#ffd4d4"
        : "#f8f9fa",
      color: (isPlayer1 || isPlayer2) ? "#fff" : isSnake ? "#e53935" : isLadder ? "#219151" : "",
      fontWeight: isPlayer1 || isPlayer2 ? 700 : isSnake || isLadder ? 600 : 500,
      position: 'relative'
    };

    // Overlay player token, snake, ladder
    return (
      <div
        key={number}
        className="snl-board-cell"
        style={squareStyles}
        aria-label={`Square ${number}`}
      >
        <span style={{ fontSize: "0.92em" }}>{number}</span>
        <span style={{
          position: 'absolute',
          right: 3,
          top: 3,
          fontSize: 12,
        }}>
          {isLadder && "🪜"}
          {isSnake && "🐍"}
        </span>
        <span style={{
          position: 'absolute',
          left: 3,
          bottom: 3,
          fontWeight: 900,
          letterSpacing: '-0.05em',
        }}>
          {isPlayer1 && <span title="Player 1" style={{fontSize: '1.3em'}}>①</span>}
          {isPlayer2 && <span title="Player 2" style={{fontSize: '1.3em'}}>②</span>}
        </span>
      </div>
    );
  }

  return (
    <div className="ttt-centered" style={{paddingTop: 100, gap: 24}}>
      <div className="snl-title title">Snake and Ladder</div>
      <div className="ttt-status" role="status">
        {winner !== null ? (
          <span style={{color:'var(--ttt-accent)', fontWeight:700}}>Player {winner + 1} wins!</span>
        ) : (
          status
        )}
      </div>

      {/* Board Visual */}
      <div className="snl-board">
        {boardGrid.map((row, idx) => (
          <div className="snl-board-row" key={idx}>
            {row.map((n) => renderSquare(n))}
          </div>
        ))}
      </div>

      <div className="ttt-action-buttons">
        <button
          className="btn ttt-primary-btn btn-large"
          onClick={handleRollDice}
          disabled={winner !== null}
          type="button"
        >
          {winner == null ? `Roll Dice (P${player+1})` : "Game Over"}
        </button>
        <button
          className="btn ttt-accent-btn btn-large"
          onClick={handleReset}
          type="button"
        >
          Reset
        </button>
      </div>
      <div
        className="snl-dice-status"
        style={{
          fontSize: "1.14em", minHeight: 32, 
          color: 'var(--ttt-secondary)',
          fontWeight: 500
        }}
        aria-live="polite"
      >
        {dice !== null && (
          <span>
            Player {player === 0 ? 1 : 2} rolled a <span style={{fontWeight: 700}}>{dice}</span>.
          </span>
        )}
        {!dice && <span>No dice rolled yet.</span>}
      </div>
    </div>
  );
}

export default SnakeAndLadder;
