import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SnakeAndLadder from './SnakeAndLadder';

// PUBLIC_INTERFACE
function TicTacToe() {
  return (
    <div className="ttt-centered">
      {/* Winner/Draw status display */}
      <div className="ttt-status" role="status">
        {/* Placeholder for winner/draw indication */}
        <span>Next Player: X</span>
      </div>

      {/* Game board */}
      <div className="ttt-board">
        {[0, 1, 2].map((row) => (
          <div className="ttt-board-row" key={row}>
            {[0, 1, 2].map((col) => (
              <button
                className="ttt-square"
                key={col}
                tabIndex={0}
                aria-label={`Cell ${row * 3 + col + 1}`}
              ></button>
            ))}
          </div>
        ))}
      </div>

      {/* Buttons for New Game / Reset */}
      <div className="ttt-action-buttons">
        <button className="btn btn-large ttt-primary-btn" type="button">
          New Game
        </button>
        <button className="btn btn-large ttt-accent-btn" type="button">
          Reset
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar" style={{ backgroundColor: 'var(--ttt-secondary)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="logo">
                <span className="logo-symbol" style={{ color: 'var(--ttt-primary)' }}>#</span>
                Tic Tac Toe
              </div>
              <div style={{ display: 'flex', gap: 18 }}>
                <Link
                  to="/"
                  className="btn"
                  style={{ background: "var(--ttt-primary)", color: "#fff" }}
                  aria-label="Tic Tac Toe page"
                >
                  Tic Tac Toe
                </Link>
                <Link
                  to="/snake"
                  className="btn"
                  style={{ background: "var(--base-light)", color: "#fff" }}
                  aria-label="Snake and Ladder page"
                >
                  Snake &amp; Ladder
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<TicTacToe />} />
              <Route path="/snake" element={<SnakeAndLadder />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;