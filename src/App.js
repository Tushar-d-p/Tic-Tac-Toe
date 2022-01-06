import React, { useState, useEffect } from 'react';
import './App.css';
import Square from './Components/Square';
import { Patterns } from './Components/Patterns';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", status: "none" });

  const chooseSquare = (square) => {
    if (board[square] === "") {
      setBoard(board.map((val, idx) => {
        if (idx === square && val === "") {
          return player;
        }

        return val;
      }))
    }
  }

  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];

      if (firstPlayer === "")
        return;

      let foundWinningPattern = true;

      currentPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      })

      if (foundWinningPattern) {
        setResult({ winner: player, status: "won" });
      }
    })
  }

  const checkIfTie = () => {
    let filled = true;

    board.forEach((val) => {
      if (val === "") {
        filled = false;
      }
    })

    if (filled) {
      setResult({ winner: "No one", status: "Tie" });
    }
  }

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""])
  }

  useEffect(() => {

    checkIfTie();

    checkWin();

    if (player === "X") {
      setPlayer("O");
    }
    else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.status !== "none")
      alert(`Game finished! Wininng Player: ${result.winner}`);
    setPlayer("O");
    restartGame();
  }, [result])

  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square val={board[0]} chooseSquare={() => { chooseSquare(0) }} />
          <Square val={board[1]} chooseSquare={() => { chooseSquare(1) }} />
          <Square val={board[2]} chooseSquare={() => { chooseSquare(2) }} />
        </div>
        <div className="row">
          <Square val={board[3]} chooseSquare={() => { chooseSquare(3) }} />
          <Square val={board[4]} chooseSquare={() => { chooseSquare(4) }} />
          <Square val={board[5]} chooseSquare={() => { chooseSquare(5) }} />
        </div>
        <div className="row">
          <Square val={board[6]} chooseSquare={() => { chooseSquare(6) }} />
          <Square val={board[7]} chooseSquare={() => { chooseSquare(7) }} />
          <Square val={board[8]} chooseSquare={() => { chooseSquare(8) }} />
        </div>
      </div>
    </div>
  )
}
export default App;
